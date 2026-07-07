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
            <div class="text-[28px] font-extrabold">
              {{ previewData ? previewData.final_price.toLocaleString() : totalPrice.toLocaleString() }} ₽
            </div>

            <div v-if="useBonusToggle && previewData?.bonus_to_use" class="text-right top-[5px] relative">
              <div class="text-[15px] text-green-600">− {{ previewData.bonus_to_use.toLocaleString() }} ₽ бонусами</div>
              <div class="text-[12px] text-[#999] line-through">{{ previewData.total_price.toLocaleString() }} ₽</div>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button
                @click="handleToggleBonus"
                :disabled="isLoadingPreview"
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
            <div class="text-[20px] font-extrabold">
              {{ previewData ? previewData.final_price.toLocaleString() : totalPrice.toLocaleString() }} ₽
            </div>

            <div v-if="useBonusToggle && previewData?.bonus_to_use" class="text-right">
              <div class="text-[14px] text-green-600">− {{ previewData.bonus_to_use.toLocaleString() }} ₽</div>
              <div v-if="!isMobile" class="text-[11px] text-[#999] line-through">
                {{ previewData.total_price.toLocaleString() }} ₽
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-2">
              <button
                @click="handleToggleBonus"
                :disabled="isLoadingPreview"
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

  <AuthRequiredModal
    :show="authModalVisible"
    @close="authModalVisible = false"
    @login="goToAuth"
    @guest="continueAsGuest"
  />

  <PopupUI
    :message="popupMessage"
    :type="popupType"
    :show="popupVisible"
    :duration="2000"
    @close="popupVisible = false"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useBasket } from '~/src/composables/AddBasket';
import { globalRouting } from '~/src/composables/globbal';
import { useAuth } from '~/src/composables/useAuth';
import { useBonus } from '~/src/composables/useBonus';
import { useBonusState } from '~/src/composables/useBonusState';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';
import useWindowSizes from '~/src/composables/window_size.js';
import AuthRequiredModal from '~/src/UI/AuthRequiredModal.vue';
import PopupUI from '~/src/UI/PopupUI/PopupUI.vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const { basket, getBasket, addToBasket, removeFromBasket } = useBasket();
const { show, hide } = useGlobalLoader();
const { redirectDelivery } = globalRouting();
const { isMobile } = useWindowSizes();
const { bonus, fetchBonus } = useBonus();
const { useBonusToggle, toggleBonus } = useBonusState();
const { user, init: initAuth } = useAuth();
const router = useRouter();

const popupVisible = ref(false);
const popupMessage = ref('');
const popupType = ref<'success' | 'error' | 'warning'>('success');

const isLoadingPreview = ref(false);
const previewData = ref<any>(null);

const authModalVisible = ref(false);

const API_URL = 'https://saakianwatches-lilexport.amvera.io';

const normalizeImage = (path?: string) => {
  if (!path) return '/watch.png';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

const isAuthenticated = computed(() => {
  if (user.value) return true;
  if (import.meta.client) return !!localStorage.getItem('token');
  return false;
});

const bonusBalance = computed(() => bonus.value?.balance ?? 0);

const totalPrice = computed(() => {
  return basket.value.reduce((acc, i) => acc + i.watch.price * i.quantity, 0);
});

// Запрос предпросмотра с бэка
const fetchPreview = async () => {
  if (basket.value.length === 0) {
    previewData.value = null;
    return;
  }

  isLoadingPreview.value = true;
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const response = await fetch(`${API_URL}/orders/preview`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        delivery_type: 'cdek',
        address: 'preview',
        phone: '+70000000000',
        fio: 'preview',
        use_bonus: useBonusToggle.value,
      }),
    });

    if (response.ok) {
      previewData.value = await response.json();
    }
  } catch (error) {
    console.error('Preview error:', error);
  } finally {
    isLoadingPreview.value = false;
  }
};

// Новая функция-обертка для toggleBonus с лоадером
const handleToggleBonus = async () => {
  show(); // Показываем лоадер
  toggleBonus(); // Переключаем тумблер
  await fetchPreview(); // Ждем загрузки предпросмотра
  hide(); // Скрываем лоадер
};

// Следим за изменением корзины (тумблер теперь обновляется через handleToggleBonus)
watch(
  () => basket.value.length,
  () => {
    fetchPreview();
  },
);

const refresh = async () => {
  show();
  try {
    await getBasket();
    await fetchPreview();
  } finally {
    hide();
  }
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

// Если пользователь не авторизован — показываем модалку вместо перехода к оформлению
const goNext = () => {
  if (!isAuthenticated.value) {
    authModalVisible.value = true;
    return;
  }
  redirectDelivery?.();
};

const goToAuth = () => {
  authModalVisible.value = false;
  router.push('/auth');
};

// Оформление заказа без регистрации — бонусы копиться не будут,
// т.к. они привязаны к аккаунту пользователя
const continueAsGuest = () => {
  authModalVisible.value = false;
  redirectDelivery?.();
};

onMounted(async () => {
  initAuth();

  show();
  try {
    // getBasket теперь сам умеет работать и как гость (localStorage),
    // и как авторизованный пользователь (сервер)
    await getBasket();

    if (isAuthenticated.value) {
      await fetchBonus();
      await fetchPreview();
    }
  } finally {
    hide();
  }
});
</script>
