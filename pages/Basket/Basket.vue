<template>
  <DesktopHeader />

  <div class="max-w-[1400px] mx-auto px-4 py-10">
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
            <h2 class="text-[28px] font-bold">
              {{ item.watch.title }}
            </h2>

            <p class="text-[18px] text-[#666] mt-2">
              {{ item.watch.brand }}
            </p>

            <p class="text-[18px] text-[#666]">
              {{ item.watch.mechanism }}
            </p>

            <div class="mt-5">
              <span class="text-[30px] font-bold"> {{ item.watch.price.toLocaleString() }} ₽ </span>
            </div>
          </div>

          <div class="flex items-center justify-between mt-6">
            <div class="h-[52px] px-5 bg-[#F0F0F0] rounded-[62px] flex items-center gap-4">
              <button v-if="item.quantity > 1" class="w-6 h-6 flex items-center justify-center" @click="decrease(item)">
                <img src="/icons/minus.svg" class="w-full h-full" />
              </button>

              <span class="text-[18px] font-semibold"> {{ item.quantity }} шт. </span>

              <button class="w-6 h-6 flex items-center justify-center" @click="increase(item)">
                <img src="/icons/plus.svg" class="w-full h-full" />
              </button>
            </div>

            <button
              v-if="item.quantity === 1"
              class="bg-black text-white px-6 py-3 rounded-full font-semibold hover:opacity-80 transition-all"
              @click="remove(item.watch.custom_id)"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t pt-6 flex items-center justify-between max-md:flex-col max-md:gap-4">
        <h2 class="text-[32px] font-bold">Итого:</h2>

        <span class="text-[36px] font-extrabold"> {{ totalPrice.toLocaleString() }} ₽ </span>
      </div>
    </div>

    <div v-else class="text-[22px] text-[#666]">Корзина пустая</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useBasket } from '~/src/composables/AddBasket';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';
import DesktopHeader from '../Header/DesktopHeader.vue';

const { basket, getBasket, addToBasket, removeFromBasket } = useBasket();
const { show, hide } = useGlobalLoader();

const API_URL = 'https://watches-api-c9i5.onrender.com';

const normalizeImage = (path?: string) => {
  if (!path) return '/watch.png';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

const increase = async (item: any) => {
  show();

  try {
    await addToBasket(item.watch.custom_id, 1);
    await getBasket();
  } finally {
    hide();
  }
};

const decrease = async (item: any) => {
  show();

  try {
    if (item.quantity > 2) {
      await removeFromBasket(item.watch.custom_id);
      await addToBasket(item.watch.custom_id, item.quantity - 1);
    } else {
      await removeFromBasket(item.watch.custom_id);
    }

    await getBasket();
  } finally {
    hide();
  }
};

const remove = async (custom_id: string) => {
  show();

  try {
    await removeFromBasket(custom_id);
    await getBasket();
  } finally {
    hide();
  }
};

const totalPrice = computed(() => {
  return basket.value.reduce((acc, item) => {
    return acc + item.watch.price * item.quantity;
  }, 0);
});

onMounted(async () => {
  show();

  try {
    await getBasket();
  } finally {
    hide();
  }
});
</script>
