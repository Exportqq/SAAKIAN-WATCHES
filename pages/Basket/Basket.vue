<template>
  <DesktopHeader />

  <div class="max-w-[1400px] mx-auto px-4 py-10 pb-[90px] md:pb-10">
    <h1 class="text-[42px] font-extrabold mb-10">Корзина</h1>

    <div v-if="basket.length" class="space-y-3">
      <div
        v-for="item in basket"
        :key="item.cart_item_id"
        class="border border-[#E5E5E5] rounded-[16px] p-4 flex gap-4 items-center"
      >
        <div class="w-[72px] h-[72px] bg-[#F0EEED] rounded-[12px] overflow-hidden shrink-0">
          <img :src="normalizeImage(item.watch.images?.[0])" class="w-full h-full object-contain" />
        </div>

        <div class="flex-1 min-w-0">
          <h2 class="text-[15px] font-semibold truncate">{{ item.watch.title }}</h2>
          <p class="text-[13px] text-[#888] mt-0.5 mb-2">{{ item.watch.brand }} · {{ item.watch.mechanism }}</p>

          <div class="flex items-center justify-between">
            <span class="text-[16px] font-semibold"> {{ item.watch.price.toLocaleString() }} ₽ </span>

            <div class="flex items-center gap-1.5">
              <button
                v-if="item.quantity > 1"
                class="w-7 h-7 rounded-full border border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center"
                @click="decrease(item)"
              >
                <img src="/icons/minus.svg" class="w-3.5 h-3.5" />
              </button>

              <span class="text-[14px] font-semibold min-w-[18px] text-center">
                {{ item.quantity }}
              </span>

              <button
                class="w-7 h-7 rounded-full border border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center"
                @click="increase(item)"
              >
                <img src="/icons/plus.svg" class="w-3.5 h-3.5" />
              </button>

              <button
                class="w-7 h-7 rounded-full border border-[#E5E5E5] flex items-center justify-center ml-1"
                @click="remove(item.watch.custom_id)"
              >
                <img src="/icons/trash.svg" class="w-3.5 h-3.5 opacity-40" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- DESKTOP TOTAL -->
      <div class="mt-8 border-t pt-5 flex items-center justify-between max-md:hidden">
        <div>
          <p class="text-[13px] text-[#888]">Итого</p>

          <div class="flex items-center gap-3">
            <div class="text-[28px] font-extrabold">{{ finalPrice.toLocaleString() }} ₽</div>

            <div v-if="useBonusToggle" class="text-right top-[5px] relative">
              <div class="text-[15px] text-green-600">− {{ bonusToUse.toLocaleString() }} ₽ бонусами</div>

              <div class="text-[12px] text-[#999] line-through">{{ totalPrice.toLocaleString() }} ₽</div>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button
                @click="toggleBonus"
                class="relative w-12 h-7 flex items-center rounded-full transition-all duration-300"
                :class="useBonusToggle ? 'bg-black' : 'bg-gray-300'"
              >
                <span
                  class="absolute w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                  :class="useBonusToggle ? 'right-1' : 'left-1'"
                />
              </button>

              <span class="text-[15px] text-[#666]"> Списать бонусы: {{ bonusBalance.toLocaleString() }} ₽ </span>
            </div>
          </div>
        </div>

        <button class="bg-black text-white px-8 py-3 rounded-full font-semibold hover:opacity-80" @click="goNext">
          Далее
        </button>
      </div>

      <!-- MOBILE -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between md:hidden z-50">
        <div class="w-full">
          <div class="flex items-end gap-[10px]">
            <div class="text-[18px] font-extrabold">{{ finalPrice.toLocaleString() }} ₽</div>

            <div v-if="useBonusToggle" class="text-right">
              <div class="text-[12px] text-green-600">− {{ bonusToUse.toLocaleString() }} ₽</div>

              <div class="text-[11px] text-[#999] line-through">{{ totalPrice.toLocaleString() }} ₽</div>
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-2">
              <button
                @click="toggleBonus"
                class="relative w-11 h-6 flex items-center rounded-full transition-all duration-300"
                :class="useBonusToggle ? 'bg-black' : 'bg-gray-300'"
              >
                <span
                  class="absolute w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                  :class="useBonusToggle ? 'right-0.5' : 'left-0.5'"
                />
              </button>

              <span class="text-[12px] text-[#666]"> Списать бонусы: {{ bonusBalance.toLocaleString() }} ₽ </span>
            </div>
          </div>
        </div>

        <button class="bg-black text-white px-6 py-3 rounded-full font-semibold ml-3" @click="goNext">Далее</button>
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
import { useBonus } from '~/src/composables/useBonus';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

import PopupUI from '~/src/UI/PopupUI/PopupUI.vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const { basket, getBasket, addToBasket, removeFromBasket } = useBasket();
const { show, hide } = useGlobalLoader();
const { redirectDelivery } = globalRouting();

const { bonus, fetchBonus } = useBonus();

const popupVisible = ref(false);
const popupMessage = ref('');
const popupType = ref<'success' | 'error' | 'warning'>('success');

const useBonusToggle = ref(false);

const API_URL = 'https://watches-api-c9i5.onrender.com';

const normalizeImage = (path?: string) => {
  if (!path) return '/watch.png';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

/* ===== FIXED LOGIC ===== */

const bonusBalance = computed(() => bonus.value?.balance ?? 0);

const totalPrice = computed(() => {
  return basket.value.reduce((acc, i) => acc + i.watch.price * i.quantity, 0);
});

const maxBonusUse = computed(() => totalPrice.value * 0.3);

const bonusToUse = computed(() => {
  if (!useBonusToggle.value) return 0;
  return Math.min(bonusBalance.value, maxBonusUse.value);
});

const finalPrice = computed(() => {
  return totalPrice.value - bonusToUse.value;
});

const toggleBonus = () => {
  useBonusToggle.value = !useBonusToggle.value;
};

/* ===== ACTIONS ===== */

const refresh = async () => {
  await getBasket();
};

const increase = async (item: any) => {
  show();
  try {
    await addToBasket(item.watch.custom_id, 1);
    await refresh();
  } finally {
    hide();
  }
};

const decrease = async (item: any) => {
  show();
  try {
    await addToBasket(item.watch.custom_id, -1);
    await refresh();
  } finally {
    hide();
  }
};

const remove = async (id: string) => {
  show();
  try {
    await removeFromBasket(id);
    await refresh();
  } finally {
    hide();
  }
};

const goNext = () => {
  redirectDelivery?.();
};

onMounted(async () => {
  show();
  try {
    await Promise.all([getBasket(), fetchBonus()]);
  } finally {
    hide();
  }
});
</script>
