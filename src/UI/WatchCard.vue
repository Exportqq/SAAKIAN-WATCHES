<script setup lang="ts">
import { computed, ref } from 'vue';
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
  return `https://saakianwatches-lilexport.amvera.io${path}`;
};

const isInBasket = computed(() => {
  return basket.value.some((item: any) => item.watch.custom_id === props.watch.custom_id);
});

const displayName = computed(() => {
  return props.watch.title.replace(/^наручные\s+часы\s+/i, '').trim();
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

    await getBasket();
  } catch {
    showPopup('Произошла ошибка', 'error');
  } finally {
    hide();
  }
};
</script>

<template>
  <NuxtLink :to="`/watch/${watch.id}`" class="watch-card block">
    <div class="watch-photo-bg w-full aspect-square flex items-center justify-center rounded-[20px]">
      <img :src="getImageUrl(watch.images?.[0])" class="w-full h-full object-contain p-2 bg-[#F7F7F7] rounded-[20px]" />
    </div>

    <div class="mt-[16px] flex items-center justify-between gap-3">
      <div class="min-w-0">
        <span class="watch-name block text-[11px] tracking-[0.14em] uppercase text-[#9C9C96] truncate">
          {{ displayName }}
        </span>
        <span class="mono block text-[17px] font-semibold text-[#151413] mt-[6px]">
          {{ watch.price.toLocaleString() }} ₽
        </span>
      </div>

      <button
        class="fab shrink-0 w-[34px] h-[34px] rounded-full flex items-center justify-center"
        :class="isInBasket ? 'fab-active' : ''"
        @click="addBasketHandler"
        aria-label="В корзину"
      >
        <img :src="isInBasket ? '/icons/trash.svg' : '/icons/basket_add.svg'" class="w-[42%] h-[42%] object-contain" />
      </button>
    </div>

    <span class="accent-line block h-[1px] mt-[12px]" />
  </NuxtLink>

  <PopupUI
    :message="popupMessage"
    :type="popupType"
    :show="popupVisible"
    :duration="2000"
    @close="popupVisible = false"
  />
</template>

<style scoped>
.watch-photo-bg {
  background: #f5f3ee;
}

.mono {
  font-family: 'IBM Plex Mono', monospace;
}
.watch-name {
  font-family: 'Inter', sans-serif;
}

.fab {
  background: #f7f7f7;
}
.fab-active {
  background: #151413;
}
.fab-active img {
  filter: invert(1);
}

.accent-line {
  width: 22px;
  background: #000;
}
</style>
