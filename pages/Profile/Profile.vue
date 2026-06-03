<template>
  <DesktopHeader />

  <div class="min-h-[400px] px-4 pt-[40px] flex justify-center">
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useBasket } from '~/src/composables/AddBasket';
import { globalRouting } from '~/src/composables/globbal';
import { useAuth } from '~/src/composables/useAuth';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

import DesktopHeader from '../Header/DesktopHeader.vue';

const router = useRouter();

const { getMe, logout } = useAuth();
const { show, hide } = useGlobalLoader();
const { redirectAuth, redirectOrder } = globalRouting();

const user = ref<any>(null);

const { basket } = useBasket();

const bonus = ref<any>(null);

const logoutHandler = () => {
  logout();
  redirectAuth();
};

onMounted(async () => {
  try {
    show();

    user.value = await getMe();

    bonus.value = {
      balance: 0,
    };
  } finally {
    hide();
  }
});
</script>
