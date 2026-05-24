<template>
  <DesktopHeader />

  <div class="max-w-[1400px] mx-auto px-4 py-10 pb-[90px] md:pb-10">
    <h1 class="text-[42px] font-extrabold mb-10">Корзина</h1>

    <div v-if="basket.length" class="space-y-5">
      <div
        v-for="item in basket"
        :key="item.cart_item_id"
        class="border border-[#E5E5E5] rounded-[24px] p-5 flex gap-5 max-md:flex-col"
      >
        <div
          class="w-full max-w-[220px] aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden shrink-0 max-md:max-w-full"
        >
          <img :src="normalizeImage(item.watch.images?.[0])" class="w-full h-full object-contain" />
        </div>

        <div class="flex-1 flex flex-col justify-between">
          <div>
            <h2 class="text-[28px] font-bold">{{ item.watch.title }}</h2>
            <p class="text-[18px] text-[#666] mt-2">{{ item.watch.brand }}</p>
            <p class="text-[18px] text-[#666]">{{ item.watch.mechanism }}</p>

            <div class="mt-5">
              <span class="text-[30px] font-bold">{{ item.watch.price.toLocaleString() }} ₽</span>
            </div>
          </div>

          <div class="flex items-center justify-between mt-6">
            <div class="h-[52px] px-5 bg-[#F0F0F0] rounded-[62px] flex items-center gap-4">
              <button v-if="item.quantity > 1" class="w-6 h-6 flex items-center justify-center" @click="decrease(item)">
                <img src="/icons/minus.svg" class="w-full h-full" />
              </button>

              <span class="text-[18px] font-semibold">{{ item.quantity }} шт.</span>

              <button class="w-6 h-6 flex items-center justify-center" @click="increase(item)">
                <img src="/icons/plus.svg" class="w-full h-full" />
              </button>
            </div>

            <button
              class="bg-black text-white px-6 py-3 rounded-full font-semibold hover:opacity-80 transition-all"
              @click="remove(item.watch.custom_id)"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t pt-6 flex items-center justify-between max-md:hidden">
        <span class="text-[36px] font-extrabold">{{ totalPrice.toLocaleString() }} ₽</span>

        <button
          class="bg-black text-white px-8 py-4 rounded-full font-semibold hover:opacity-80 transition-all"
          @click="goNext"
        >
          Далее
        </button>
      </div>

      <div class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between md:hidden z-50">
        <span class="text-[22px] font-extrabold">{{ totalPrice.toLocaleString() }} ₽</span>

        <button class="bg-black text-white px-6 py-3 rounded-full font-semibold" @click="goNext">Далее</button>
      </div>
    </div>

    <div v-else class="text-[22px] text-[#666]">Корзина пустая</div>
  </div>

  <PopupUI
    :message="popupMessage"
    :type="popupType"
    :show="popupVisible"
    :duration="2000"
    @close="popupVisible = false"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useBasket } from '~/src/composables/AddBasket';
import { globalRouting } from '~/src/composables/globbal';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

import PopupUI from '~/src/UI/PopupUI/PopupUI.vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const { basket, getBasket, addToBasket, removeFromBasket } = useBasket();
const { show, hide } = useGlobalLoader();
const { redirectDelivery } = globalRouting();

const API_URL = 'https://watches-api-c9i5.onrender.com';

const popupVisible = ref(false);
const popupMessage = ref('');
const popupType = ref<'success' | 'error' | 'warning'>('success');

const showPopup = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
  popupMessage.value = message;
  popupType.value = type;
  popupVisible.value = true;
};

const normalizeImage = (path?: string) => {
  if (!path) return '/watch.png';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

const refresh = async () => {
  await getBasket();
};

const increase = async (item: any) => {
  show();
  try {
    await addToBasket(item.watch.custom_id, 1);
    await refresh();
    showPopup('Количество увеличено', 'success');
  } finally {
    hide();
  }
};

const decrease = async (item: any) => {
  show();
  try {
    if (item.quantity > 1) {
      await addToBasket(item.watch.custom_id, -1);
      await refresh();
      showPopup('Количество уменьшено', 'success');
    } else {
      await removeFromBasket(item.watch.custom_id);
      await refresh();
      showPopup('Товар удалён', 'warning');
    }
  } finally {
    hide();
  }
};

const remove = async (custom_id: string) => {
  show();
  try {
    await removeFromBasket(custom_id);
    await refresh();
    showPopup('Товар удалён', 'warning');
  } finally {
    hide();
  }
};

const totalPrice = computed(() => {
  return basket.value.reduce((acc, item) => acc + item.watch.price * item.quantity, 0);
});

const goNext = () => {
  redirectDelivery?.();
};

onMounted(async () => {
  show();
  try {
    await getBasket();
  } finally {
    hide();
  }
});
</script>
