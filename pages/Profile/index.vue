<template>
  <Header />

  <!-- НЕАВТОРИЗОВАН -->
  <div v-if="!authChecked" class="min-h-[400px] flex items-center justify-center">
    <div class="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
  </div>

  <div v-else-if="!user" class="min-h-[400px] px-4 pt-[40px] flex justify-center">
    <div
      class="w-full max-w-[560px] bg-white rounded-[32px] border border-[#E7E7E7] shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden"
    >
      <div class="pt-[52px] px-[30px] pb-[44px] text-center">
        <div
          class="w-[76px] h-[76px] mx-auto rounded-full bg-[#F7F7F7] border border-[#EFEFEF] flex items-center justify-center"
        >
          <svg class="w-8 h-8 text-black/70" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="10" width="16" height="10" rx="3" stroke="currentColor" stroke-width="1.7" />
            <path
              d="M8 10V7.5C8 5.29086 9.79086 3.5 12 3.5C14.2091 3.5 16 5.29086 16 7.5V10"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
            <circle cx="12" cy="14.5" r="1.4" fill="currentColor" />
          </svg>
        </div>

        <h1 class="text-[26px] font-extrabold text-black leading-tight mt-[22px]">Вы не авторизованы</h1>

        <p class="text-[14px] text-[#888] mt-[10px] leading-relaxed max-w-[360px] mx-auto">
          Войдите в аккаунт, чтобы видеть свои заказы и бонусный баланс
        </p>

        <button
          @click="redirectAuth()"
          class="w-full mt-[28px] h-[56px] rounded-full bg-black text-white font-semibold text-[16px] hover:bg-[#222] transition-all duration-200 active:scale-[0.98]"
        >
          Войти или зарегистрироваться
        </button>
      </div>
    </div>
  </div>

  <!-- АВТОРИЗОВАН -->
  <div v-else class="min-h-[400px] px-4 pt-[40px] flex justify-center">
    <div
      class="w-full max-w-[560px] max-h-[calc(100vh-40px)] bg-white rounded-[32px] border border-[#E7E7E7] shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-y-auto"
    >
      <div class="h-[140px] bg-gradient-to-r from-black via-[#1A1A1A] to-[#333] relative">
        <div
          class="absolute -bottom-[42px] left-1/2 -translate-x-1/2 w-[84px] h-[84px] rounded-full bg-white border-[5px] border-white shadow-md flex items-center justify-center"
        >
          <span class="text-[30px] font-extrabold text-black">
            {{ user?.username?.charAt(0)?.toUpperCase() || '?' }}
          </span>
        </div>
      </div>

      <div class="pt-[58px] px-[30px] pb-[30px] text-center">
        <h1 class="text-[30px] font-extrabold text-black leading-none">
          {{ user?.username || 'Пользователь' }}
        </h1>

        <p class="text-[14px] text-[#777] mt-[10px]">Добро пожаловать в ваш профиль</p>

        <div>
          <div
            class="mt-[24px] rounded-[24px] p-[20px] text-left text-white bg-gradient-to-r from-black via-[#1a1a1a] to-[#2a2a2a] shadow-lg"
          >
            <p class="text-[13px] text-white/70">Бонусная карта</p>

            <div class="mt-[6px] flex items-end justify-between">
              <p class="text-[28px] font-extrabold">
                {{ bonus?.balance?.toFixed(0) || 0 }}
              </p>

              <span class="text-[13px] text-white/60">баллов</span>
            </div>

            <p class="text-[12px] text-white/50 mt-[10px]">Используйте бонусы при оплате заказов</p>
          </div>

          <button
            class="cursor-pointer mt-[10px] text-[13px] text-[#888] underline underline-offset-2 hover:text-black transition"
            @click="bonusModal = true"
          >
            Подробнее о бонусах
          </button>
        </div>

        <div class="grid grid-cols-2 gap-[14px] mt-[30px]">
          <div class="bg-[#F7F7F7] rounded-[22px] p-[18px] text-left border border-[#EFEFEF]">
            <p class="text-[13px] text-[#888] mb-[6px]">Статус</p>
            <p class="text-[16px] font-bold text-black">Активен</p>
          </div>

          <div
            @click="redirectOrder()"
            class="bg-[#F7F7F7] rounded-[22px] p-[18px] text-left border border-[#EFEFEF] cursor-pointer hover:bg-[#efefef] transition"
          >
            <p class="text-[13px] text-[#888] mb-[6px]">Заказы</p>
            <p class="text-[16px] font-bold text-black">Мои заказы</p>
          </div>
        </div>

        <button
          @click="logoutHandler"
          class="w-full mt-[32px] h-[56px] rounded-full bg-black text-white font-semibold text-[16px] hover:bg-[#222] transition-all duration-200 active:scale-[0.98]"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  </div>

  <Transition name="fade">
    <div
      v-if="bonusModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      @click.self="bonusModal = false"
    >
      <div class="bg-white w-full max-w-[480px] rounded-[28px] p-7 space-y-5">
        <div class="flex items-center justify-between">
          <h2 class="text-[20px] font-extrabold">Бонусная программа</h2>
          <button
            class="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#eee] transition"
            @click="bonusModal = false"
          >
            <span class="text-[18px] leading-none text-[#555]">×</span>
          </button>
        </div>

        <div class="space-y-3">
          <div class="flex gap-3 items-start">
            <div class="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0 text-[15px]">
              1
            </div>
            <div>
              <p class="font-semibold text-[15px]">1 бонус = 1 рубль</p>
              <p class="text-[13px] text-[#777] mt-0.5">Каждый бонус равен одному рублю скидки при оплате заказа.</p>
            </div>
          </div>

          <div class="flex gap-3 items-start">
            <div class="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0 text-[15px]">
              2
            </div>
            <div>
              <p class="font-semibold text-[15px]">До 20% от суммы заказа</p>
              <p class="text-[13px] text-[#777] mt-0.5">Бонусами можно оплатить не более 20% от стоимости заказа.</p>
            </div>
          </div>

          <div class="flex gap-3 items-start">
            <div class="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0 text-[15px]">
              3
            </div>
            <div>
              <p class="font-semibold text-[15px]">Начисление за покупки</p>
              <p class="text-[13px] text-[#777] mt-0.5">
                За каждый оплаченный заказ вы получаете 1-10% от его суммы бонусами. В зависимости от купленной модели.
              </p>
            </div>
          </div>

          <div class="flex gap-3 items-start">
            <div class="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0 text-[15px]">
              4
            </div>
            <div>
              <p class="font-semibold text-[15px]">Бонусы начисляются после оплаты</p>
              <p class="text-[13px] text-[#777] mt-0.5">
                Баллы поступают на счёт только после того, как заказ переходит в статус «Оплачен».
              </p>
            </div>
          </div>
        </div>

        <button
          class="w-full h-[50px] rounded-full bg-black text-white font-semibold text-[15px] hover:opacity-80 transition"
          @click="bonusModal = false"
        >
          Понятно
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { globalRouting } from '~/src/composables/globbal';
import { useAuth } from '~/src/composables/useAuth';
import { useBonus } from '~/src/composables/useBonus';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';
import Header from '../header/header.vue';

const { user, getMe, logout } = useAuth();
const { show, hide } = useGlobalLoader();
const { redirectAuth, redirectOrder } = globalRouting();

const { bonus, fetchBonus } = useBonus();

const bonusModal = ref(false);

// Пока идёт первая проверка — показываем спиннер вместо мгновенного
// мигания "не авторизован" -> "авторизован"
const authChecked = ref(false);

const logoutHandler = () => {
  logout();
  redirectAuth();
};

onMounted(async () => {
  try {
    show();
    await getMe();

    if (user.value) {
      await fetchBonus();
    }
  } finally {
    authChecked.value = true;
    hide();
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
