<template>
  <div class="min-h-screen bg-white px-4">
    <!-- TOP LOGO -->
    <div class="w-full flex justify-center pt-10 md:pt-14">
      <img src="/logo.svg" alt="logo" class="h-[28px] md:h-[44px] w-auto" />
    </div>

    <!-- CENTER CONTENT -->
    <div class="min-h-[calc(100vh-120px)] flex items-center justify-center">
      <div class="w-full max-w-[380px] space-y-6">
        <!-- TITLE -->
        <div class="text-center space-y-1">
          <h1 class="text-[26px] font-semibold tracking-tight">
            {{ isLogin ? 'Вход' : 'Регистрация' }}
          </h1>

          <p class="text-[13px] text-[#888]">
            {{ isLogin ? 'Добро пожаловать' : 'Создайте аккаунт' }}
          </p>
        </div>

        <!-- FORM -->
        <div class="space-y-3">
          <input
            v-model="username"
            placeholder="Username"
            class="w-full h-[50px] border-b border-[#E6E6E6] outline-none focus:border-black transition"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full h-[50px] border-b border-[#E6E6E6] outline-none focus:border-black transition"
          />
        </div>

        <!-- ERROR -->
        <p v-if="error" class="text-[12px] text-red-500 text-center">
          {{ error }}
        </p>

        <!-- BUTTON -->
        <button
          @click="handleAuth"
          :disabled="authLoading"
          class="w-full h-[48px] rounded-full text-white text-[14px] font-medium transition"
          :class="authLoading ? 'bg-gray-400' : 'bg-black hover:bg-[#222]'"
        >
          {{ authLoading ? '...' : isLogin ? 'Войти' : 'Создать' }}
        </button>

        <!-- SWITCH -->
        <div class="text-center text-[13px] text-[#777]">
          <span>
            {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
          </span>

          <button class="ml-1 text-black font-medium" @click="toggle">
            {{ isLogin ? 'Регистрация' : 'Вход' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { globalRouting } from '~/src/composables/globbal';
import { useAdminAuth } from '~/src/composables/useAdminAuth';
import { useAuth } from '~/src/composables/useAuth';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

const { redirectProfile, redirectAdmin } = globalRouting();

const { login, register, error } = useAuth();
const { adminLogin } = useAdminAuth();
const { show, hide } = useGlobalLoader();

const username = ref('');
const password = ref('');
const isLogin = ref(true);
const authLoading = ref(false);

const toggle = () => {
  isLogin.value = !isLogin.value;
  error.value = null;
};

const handleAuth = async () => {
  if (!username.value || !password.value) return;

  try {
    authLoading.value = true;
    show();

    if (isLogin.value) {
      try {
        await adminLogin(username.value, password.value);
        redirectAdmin();
        return;
      } catch {
        const res = await login(username.value, password.value);
        if (res) redirectProfile();
      }
    } else {
      const res = await register(username.value, password.value);
      if (res) redirectProfile();
    }
  } finally {
    authLoading.value = false;
    hide();
  }
};
</script>
