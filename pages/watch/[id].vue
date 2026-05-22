<template>
  <DesktopHeader />

  <div v-if="watchesLoading" class="p-10">Loading...</div>

  <div v-else-if="currentWatch" class="max-w-[1400px] mx-auto px-4 py-10 pb-[120px]">
    <div class="grid grid-cols-2 max-md:grid-cols-1 gap-[40px]">
      <div class="space-y-4">
        <div class="bg-[#F0EEED] w-full aspect-square flex items-center justify-center rounded-[20px] overflow-hidden">
          <img
            :src="normalizeImage(currentWatch.images?.[activeImage])"
            class="w-full h-full object-contain rounded-[20px]"
          />
        </div>

        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="(img, index) in currentWatch.images"
            :key="index"
            class="bg-[#F0EEED] aspect-square cursor-pointer border-2 rounded-[20px] overflow-hidden transition-all duration-300 ease-in-out hover:border-black"
            :class="activeImage === index ? 'border-black scale-[1.03]' : 'border-transparent'"
            @click="activeImage = index"
          >
            <img :src="normalizeImage(img)" class="w-full h-full object-contain rounded-[20px]" />
          </div>
        </div>
      </div>

      <div>
        <h1 class="font-extrabold text-[40px] max-md:text-[24px]">
          {{ currentWatch.title }}
        </h1>

        <h2 class="mt-[0px] text-[32px] font-semibold">{{ currentWatch.price.toLocaleString() }} ₽</h2>

        <p class="mt-[20px] text-[16px] font-medium leading-[22px] text-[#666666]">
          {{ currentWatch.description }}
        </p>

        <div class="mt-[30px] space-y-1 text-[18px]">
          <p><b>Бренд:</b> {{ currentWatch.brand }}</p>
          <p><b>Страна:</b> {{ currentWatch.brand_country }}</p>
          <p><b>Механизм:</b> {{ currentWatch.mechanism }}</p>
          <p><b>Корпус:</b> {{ currentWatch.case_material }}</p>
          <p><b>Стекло:</b> {{ currentWatch.glass }}</p>
          <p><b>Браслет:</b> {{ currentWatch.bracelet }}</p>
          <p><b>Пол:</b> {{ currentWatch.gender }}</p>
        </div>

        <!-- Desktop -->
        <div class="mt-[40px] hidden md:flex items-center gap-4">
          <div class="h-[52px] px-5 bg-[#F0F0F0] rounded-[62px] flex items-center gap-[38px]">
            <button
              class="w-[24px] h-[24px] flex items-center justify-center transition-all cursor-pointer"
              @click="decreaseQuantity"
            >
              <img src="/icons/minus.svg" alt="minus" class="w-full h-full object-contain" />
            </button>

            <span class="text-[20px] font-semibold min-w-[20px] text-center">
              {{ quantity }}
            </span>

            <button
              class="w-[24px] h-[24px] flex items-center justify-center transition-all cursor-pointer"
              @click="quantity++"
            >
              <img src="/icons/plus.svg" alt="plus" class="w-full h-full object-contain" />
            </button>
          </div>

          <ButtonUI
            :text="'В КОРЗИНУ'"
            :max-width="true"
            :rounded="62"
            :paddingX="8"
            :paddingY="10"
            @click="addCurrentWatchToBasket"
          />
        </div>
      </div>
    </div>

    <div class="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#E5E5E5] px-4 py-3 z-50">
      <div class="flex items-center gap-3">
        <div class="h-[52px] px-5 bg-[#F0F0F0] rounded-[62px] flex items-center justify-between min-w-[130px]">
          <button class="w-[24px] h-[24px] flex items-center justify-center" @click="decreaseQuantity">
            <img src="/icons/minus.svg" alt="minus" class="w-full h-full object-contain" />
          </button>

          <span class="text-[20px] font-semibold min-w-[20px] text-center">
            {{ quantity }}
          </span>

          <button class="w-[24px] h-[24px] flex items-center justify-center" @click="quantity++">
            <img src="/icons/plus.svg" alt="plus" class="w-full h-full object-contain" />
          </button>
        </div>

        <div class="flex-1">
          <ButtonUI
            :text="'В КОРЗИНУ'"
            :max-width="true"
            :rounded="62"
            :paddingX="20"
            :paddingY="13.4"
            @click="addCurrentWatchToBasket"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="p-10">Not found</div>

  <PopupUI
    :message="popupMessage"
    :type="popupType"
    :show="popupVisible"
    :duration="2500"
    @close="popupVisible = false"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useBasket } from '~/src/composables/AddBasket';
import { useWatch } from '~/src/composables/GetWatch';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

import ButtonUI from '~/src/UI/ButtonUI.vue';
import PopupUI from '~/src/UI/PopupUI/PopupUI.vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const route = useRoute();

const { currentWatch, getWatchById, watchesLoading } = useWatch();
const { addToBasket } = useBasket();
const { show, hide } = useGlobalLoader();

const API_URL = 'https://watches-api-c9i5.onrender.com';

const activeImage = ref(0);
const quantity = ref(1);

// popup state
const popupVisible = ref(false);
const popupMessage = ref('');
const popupType = ref<'success' | 'error'>('success');

const showPopup = (message: string, type: 'success' | 'error' = 'success') => {
  popupMessage.value = message;
  popupType.value = type;
  popupVisible.value = true;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const normalizeImage = (path?: string) => {
  if (!path) return '/watch.png';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

const addCurrentWatchToBasket = async () => {
  if (!currentWatch.value) return;

  try {
    show();

    await addToBasket(currentWatch.value.custom_id, quantity.value);

    showPopup('Товар добавлен в корзину', 'success');
  } catch (e) {
    console.error(e);
    showPopup('Ошибка добавления в корзину', 'error');
  } finally {
    hide();
  }
};

onMounted(async () => {
  try {
    show();
    await getWatchById(route.params.id as string);
  } finally {
    hide();
  }
});
</script>
