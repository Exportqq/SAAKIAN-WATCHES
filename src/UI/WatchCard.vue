<script setup lang="ts">
import { computed } from 'vue';
import { useBasket } from '../composables/AddBasket';
import type { Watch } from '../composables/GetWatch';

import PopupUI from '~/src/UI/PopupUI/PopupUI.vue';
import { useGlobalLoader } from '../composables/useGlobalLoader';

const props = defineProps<{ watch: Watch }>();

const { basket, addToBasket, removeFromBasket, getBasket } = useBasket();
const { show, hide } = useGlobalLoader();

const popupVisible = ref(false);
const popupMessage = ref('');
const popupType = ref<'success' | 'error' | 'warning'>('success');

const showPopup = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
  popupMessage.value = message;
  popupType.value = type;
  popupVisible.value = true;
};

const getImageUrl = (path?: string) => {
  if (!path) return '/watch.png';
  if (path.startsWith('http')) return path;
  return `https://watches-api-c9i5.onrender.com${path}`;
};

const isInBasket = computed(() => {
  return basket.value.some((item: any) => item.watch.custom_id === props.watch.custom_id);
});

const addBasketHandler = async (e: Event) => {
  e.preventDefault();
  e.stopPropagation();

  show();

  try {
    if (isInBasket.value) {
      await removeFromBasket(props.watch.custom_id);
      showPopup('Товар удалён из корзины', 'warning');
    } else {
      await addToBasket(props.watch.custom_id, 1);
      showPopup('Товар добавлен в корзину', 'success');
    }

    await getBasket(); // 🔥 обновляем состояние корзины
  } catch {
    showPopup('Произошла ошибка', 'error');
  } finally {
    hide();
  }
};
</script>

<template>
  <NuxtLink :to="`/watch/${watch.id}`" class="w-full block">
    <div class="bg-[#F0EEED] w-full aspect-square flex items-center justify-center">
      <img :src="getImageUrl(watch.images?.[0])" class="w-full h-full object-contain" />
    </div>

    <div class="flex justify-between items-center px-4 mt-[clamp(10px,1.2vw,16px)]">
      <div>
        <h1 class="text-black font-medium text-[clamp(14px,1.2vw,20px)] leading-[16px]">
          {{ watch.title }}
        </h1>

        <h2 class="text-black font-bold text-[clamp(14px,1.2vw,20px)]">{{ watch.price.toLocaleString() }} ₽</h2>
      </div>

      <img
        @click="addBasketHandler"
        :src="isInBasket ? '/icons/trash.svg' : '/icons/basket_add.svg'"
        class="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)] cursor-pointer"
      />
    </div>
  </NuxtLink>

  <PopupUI
    :message="popupMessage"
    :type="popupType"
    :show="popupVisible"
    :duration="2000"
    @close="popupVisible = false"
  />
</template>
