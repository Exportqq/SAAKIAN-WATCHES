<template>
  <DesktopHeader />

  <div class="min-h-screen bg-[#F2F0F1] flex items-center justify-center px-4">
    <div class="w-full max-w-[520px] bg-white rounded-[24px] border p-[30px] shadow-sm">
      <h1 class="text-[28px] font-extrabold mb-[20px]">Профиль</h1>

      <!-- USER INFO -->
      <div class="space-y-[14px]">
        <div class="p-[14px] rounded-[14px] bg-[#F7F7F7]">
          <p class="text-[12px] text-[#666]">Имя</p>
          <p class="text-[16px] font-semibold">
            {{ user?.username || '—' }}
          </p>
        </div>

        <div class="p-[14px] rounded-[14px] bg-[#F7F7F7]">
          <p class="text-[12px] text-[#666]">Email</p>
          <p class="text-[16px] font-semibold">
            {{ user?.email || 'Не указан' }}
          </p>
        </div>
      </div>

      <!-- LOGOUT -->
      <button
        @click="logoutHandler"
        class="w-full mt-[25px] h-[52px] rounded-[62px] bg-black text-white font-semibold hover:bg-[#222] transition"
      >
        Выйти
      </button>
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
