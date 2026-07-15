<template>
  <Header />

  <div v-if="watchesLoading" class="watch-page min-h-[60vh] flex items-center justify-center">
    <div class="flex flex-col items-center gap-3">
      <div class="loader-ring" />
      <span class="mono text-[12px] tracking-[0.16em] uppercase text-[#8A8A85]">Загрузка</span>
    </div>
  </div>

  <div v-else-if="currentWatch" class="watch-page max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16 pb-[140px]">
    <!-- Хлебная крошка / eyebrow -->
    <div class="mono text-[12px] tracking-[0.16em] uppercase text-[#8A8A85] mb-6 md:mb-10">
      {{ currentWatch.brand }} <span class="text-[#D8C494]">/</span> {{ currentWatch.custom_id }}
    </div>

    <div class="grid grid-cols-2 max-md:grid-cols-1 gap-[56px] max-md:gap-[32px]">
      <!-- ГАЛЕРЕЯ -->
      <div class="space-y-5">
        <div class="relative w-full aspect-square overflow-hidden">
          <img
            :src="normalizeImage(currentWatch.images?.[activeImage])"
            class="w-full h-full object-contain transition-transform duration-500 ease-out hover:scale-[1.03]"
          />
        </div>

        <div class="flex items-center gap-4">
          <button
            v-for="(img, index) in currentWatch.images"
            :key="index"
            class="thumb-item flex-1 flex flex-col items-center gap-2"
            @click="activeImage = index"
          >
            <span class="w-full aspect-square flex items-center justify-center">
              <img
                :src="normalizeImage(img)"
                class="max-w-full max-h-full object-contain transition-opacity duration-300"
                :class="activeImage === index ? 'opacity-100' : 'opacity-35 hover:opacity-70'"
              />
            </span>
            <span class="thumb-indicator" :class="activeImage === index ? 'thumb-indicator-active' : ''" />
          </button>
        </div>
      </div>

      <!-- ИНФОРМАЦИЯ -->
      <div class="flex flex-col">
        <h1 class="watch-title font-bold text-[38px] leading-[1.15] max-md:text-[26px] tracking-[-0.01em]">
          {{ currentWatch.title }}
        </h1>

        <div class="flex items-center gap-3 mt-[20px]">
          <span class="mono watch-price text-[28px]">{{ currentWatch.price.toLocaleString() }} ₽</span>
          <span class="h-[1px] w-[28px] bg-[#C9A24B]" />
        </div>

        <p
          class="mt-[24px] text-[15.5px] leading-[26px] text-[#6B6B65] max-w-[46ch]"
          v-html="currentWatch.description"
        />

        <!-- ХАРАКТЕРИСТИКИ -->
        <div class="spec-table mt-[36px]">
          <div class="spec-row">
            <span class="spec-label">Бренд</span>
            <span class="spec-value">{{ currentWatch.brand }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Страна</span>
            <span class="spec-value">{{ currentWatch.brand_country }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Механизм</span>
            <span class="spec-value">{{ currentWatch.mechanism }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Корпус</span>
            <span class="spec-value">{{ currentWatch.case_material }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Стекло</span>
            <span class="spec-value">{{ currentWatch.glass }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Браслет</span>
            <span class="spec-value">{{ currentWatch.bracelet }}</span>
          </div>
          <div class="spec-row spec-row-last">
            <span class="spec-label">Пол</span>
            <span class="spec-value">{{ currentWatch.gender }}</span>
          </div>
        </div>

        <!-- Desktop CTA -->
        <div class="mt-[40px] hidden md:flex items-center gap-4">
          <div
            v-if="basketQuantity > 0"
            class="h-[56px] px-5 bg-[#1C1B19] rounded-[62px] flex justify-between items-center gap-[38px] min-w-[320px]"
          >
            <button
              class="w-[24px] h-[24px] flex items-center justify-center transition-all cursor-pointer"
              @click="removeOneFromBasket"
            >
              <img src="/icons/minus.svg" alt="minus" class="w-full h-full object-contain invert" />
            </button>

            <div class="flex flex-col items-center">
              <span class="mono text-white text-[18px] font-medium leading-none">{{ basketQuantity }}</span>
              <span class="text-[#C9A24B] text-[11px] leading-none mt-[2px] tracking-[0.08em] uppercase"
                >В корзине</span
              >
            </div>

            <button
              class="w-[24px] h-[24px] flex items-center justify-center transition-all cursor-pointer"
              @click="addOneToBasket"
            >
              <img src="/icons/plus.svg" alt="plus" class="w-full h-full object-contain invert" />
            </button>
          </div>

          <template v-else>
            <div class="h-[56px] px-5 bg-[#F7F7F7] rounded-[62px] flex items-center gap-[38px]">
              <button
                class="w-[24px] h-[24px] flex items-center justify-center transition-all cursor-pointer"
                @click="decreaseQuantity"
              >
                <img src="/icons/minus.svg" alt="minus" class="w-full h-full object-contain" />
              </button>

              <span class="mono text-[18px] font-medium min-w-[20px] text-center">
                {{ quantity }}
              </span>

              <button
                class="w-[24px] h-[24px] flex items-center justify-center transition-all cursor-pointer"
                @click="quantity++"
              >
                <img src="/icons/plus.svg" alt="plus" class="w-full h-full object-contain" />
              </button>
            </div>

            <button class="cta-button flex-1 h-[56px] rounded-[62px]" @click="addCurrentWatchToBasket">
              В корзину
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="p-10 text-center text-[#8A8A85]">Часы не найдены</div>

  <!-- Mobile фикс внизу -->
  <div
    v-if="currentWatch"
    class="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur border-t border-[#EDECE8] px-4 py-3 z-50"
  >
    <div class="flex items-center gap-3">
      <div
        v-if="basketQuantity > 0"
        class="h-[52px] px-5 bg-[#1C1B19] rounded-[62px] flex items-center gap-[38px] flex-1"
      >
        <button class="w-[24px] h-[24px] flex items-center justify-center" @click="removeOneFromBasket">
          <img src="/icons/minus.svg" alt="minus" class="w-full h-full object-contain invert" />
        </button>

        <div class="flex flex-col items-center flex-1">
          <span class="mono text-white text-[18px] font-medium leading-none">{{ basketQuantity }}</span>
          <span class="text-[#C9A24B] text-[11px] leading-none mt-[2px] tracking-[0.08em] uppercase">В корзине</span>
        </div>

        <button class="w-[24px] h-[24px] flex items-center justify-center" @click="addOneToBasket">
          <img src="/icons/plus.svg" alt="plus" class="w-full h-full object-contain invert" />
        </button>
      </div>

      <template v-else>
        <div class="h-[52px] px-5 bg-[#F7F7F7] rounded-[62px] flex items-center justify-between min-w-[130px]">
          <button class="w-[24px] h-[24px] flex items-center justify-center" @click="decreaseQuantity">
            <img src="/icons/minus.svg" alt="minus" class="w-full h-full object-contain" />
          </button>

          <span class="mono text-[18px] font-medium min-w-[20px] text-center">
            {{ quantity }}
          </span>

          <button class="w-[24px] h-[24px] flex items-center justify-center" @click="quantity++">
            <img src="/icons/plus.svg" alt="plus" class="w-full h-full object-contain" />
          </button>
        </div>

        <button class="cta-button flex-1 h-[52px] rounded-[62px]" @click="addCurrentWatchToBasket">В корзину</button>
      </template>
    </div>
  </div>

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

import PopupUI from '~/src/UI/PopupUI/PopupUI.vue';
import Header from '../header/header.vue';

const route = useRoute();

const { currentWatch, getWatchById, watchesLoading } = useWatch();
const { addToBasket, removeFromBasket, basket } = useBasket();
const { show, hide } = useGlobalLoader();

const API_URL = 'https://saakianwatches-lilexport.amvera.io';

const activeImage = ref(0);
const quantity = ref(1);
const basketQuantity = ref(0);

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

// Синхронизируем basketQuantity с текущей корзиной
const syncBasketQuantity = () => {
  if (!currentWatch.value) return;
  const item = basket.value?.find((i: any) => i.custom_id === currentWatch.value!.custom_id);
  basketQuantity.value = item?.quantity ?? 0;
};

// Первое добавление в корзину
const addCurrentWatchToBasket = async () => {
  if (!currentWatch.value) return;

  try {
    show();
    await addToBasket(currentWatch.value.custom_id, quantity.value);
    basketQuantity.value = quantity.value;
    showPopup('Товар добавлен в корзину', 'success');
  } catch (e) {
    console.error(e);
    showPopup('Ошибка добавления в корзину', 'error');
  } finally {
    hide();
  }
};

// +1 к уже добавленному товару
const addOneToBasket = async () => {
  if (!currentWatch.value) return;

  try {
    show();
    await addToBasket(currentWatch.value.custom_id, 1);
    basketQuantity.value++;
  } catch (e) {
    console.error(e);
    showPopup('Ошибка', 'error');
  } finally {
    hide();
  }
};

// −1 из корзины
const removeOneFromBasket = async () => {
  if (!currentWatch.value) return;

  try {
    show();
    await removeFromBasket(currentWatch.value.custom_id, 1);
    basketQuantity.value = Math.max(0, basketQuantity.value - 1);
  } catch (e) {
    console.error(e);
    showPopup('Ошибка', 'error');
  } finally {
    hide();
  }
};

onMounted(async () => {
  try {
    show();
    await getWatchById(route.params.id as string);
    syncBasketQuantity();
  } finally {
    hide();
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');

.watch-page {
  font-family: 'Inter', sans-serif;
  background: #ffffff;
}

.mono {
  font-family: 'IBM Plex Mono', monospace;
}

.watch-title {
  font-family: 'Inter', sans-serif;
  color: #1c1b19;
}

.watch-price {
  color: #1c1b19;
  font-weight: 500;
}

.thumb-item {
  background: transparent;
  border: none;
  cursor: pointer;
}

.thumb-indicator {
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: #ededea;
  transition:
    background 0.25s ease,
    width 0.25s ease;
}
.thumb-indicator-active {
  background: #000;
  width: 32px;
}

.spec-table {
  border-top: 1px solid #ededea;
}
.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 13px 0;
  border-bottom: 1px solid #ededea;
}
.spec-label {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8a8a85;
}
.spec-value {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  color: #1c1b19;
  text-align: right;
}

.cta-button {
  background: #1c1b19;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: background 0.2s ease;
}
.cta-button:hover {
  background: #33302b;
}

.loader-ring {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid #ededea;
  border-top-color: #c9a24b;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader-ring {
    animation: none;
  }
  .cta-button,
  .gallery-frame img {
    transition: none;
  }
}
</style>
