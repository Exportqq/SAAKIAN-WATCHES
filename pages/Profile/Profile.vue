<template>
  <DesktopHeader />

  <div class="min-h-[400px] px-4 pt-[40px] flex justify-center">
    <div
      class="w-full max-w-[560px] max-h-[calc(100vh-40px)] bg-white rounded-[32px] border border-[#E7E7E7] shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-y-auto"
    >
      <!-- TOP BANNER -->
      <div class="h-[140px] bg-gradient-to-r from-black via-[#1A1A1A] to-[#333] relative">
        <!-- AVATAR -->
        <div
          class="absolute -bottom-[42px] left-1/2 -translate-x-1/2 w-[84px] h-[84px] rounded-full bg-white border-[5px] border-white shadow-md flex items-center justify-center"
        >
          <span class="text-[30px] font-extrabold text-black">
            {{ user?.username?.charAt(0)?.toUpperCase() || '?' }}
          </span>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="pt-[58px] px-[30px] pb-[30px] text-center">
        <!-- USERNAME -->
        <h1 class="text-[30px] font-extrabold text-black leading-none">
          {{ user?.username || 'Пользователь' }}
        </h1>

        <p class="text-[14px] text-[#777] mt-[10px]">Добро пожаловать в ваш профиль</p>

        <!-- INFO CARDS -->
        <div class="grid grid-cols-2 gap-[14px] mt-[30px]">
          <div class="bg-[#F7F7F7] rounded-[22px] p-[18px] text-left border border-[#EFEFEF]">
            <p class="text-[13px] text-[#888] mb-[6px]">Статус</p>

            <p class="text-[16px] font-bold text-black">Активен</p>
          </div>

          <div class="bg-[#F7F7F7] rounded-[22px] p-[18px] text-left border border-[#EFEFEF]">
            <p class="text-[13px] text-[#888] mb-[6px]">Аккаунт</p>

            <p class="text-[16px] font-bold text-black">Пользователь</p>
          </div>
        </div>

        <!-- LOGOUT BUTTON -->
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

import { globalRouting } from '~/src/composables/globbal';
import { useAuth } from '~/src/composables/useAuth';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

import DesktopHeader from '../Header/DesktopHeader.vue';

const router = useRouter();

const { getMe, logout } = useAuth();
const { show, hide } = useGlobalLoader();
const { redirectAuth } = globalRouting();

const user = ref<any>(null);

const logoutHandler = () => {
  logout();
  redirectAuth();
};

onMounted(async () => {
  try {
    show();

    user.value = await getMe();
  } finally {
    hide();
  }
});
</script>
