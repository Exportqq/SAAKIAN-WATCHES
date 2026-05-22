<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F2F0F1] px-4">
    <!-- LOADER -->

    <div class="w-full max-w-[420px] bg-white p-[30px] rounded-[24px] border shadow-sm">
      <h1 class="text-[28px] font-extrabold mb-[6px]">
        {{ isLogin ? 'Вход' : 'Регистрация' }}
      </h1>

      <p class="text-[#666] text-[14px] mb-[25px]">
        {{ isLogin ? 'Войдите в аккаунт' : 'Создайте новый аккаунт' }}
      </p>

      <div class="space-y-[14px]">
        <input
          v-model="username"
          placeholder="username"
          class="w-full h-[52px] border rounded-[14px] px-[16px] outline-none focus:border-black transition"
        />

        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="w-full h-[52px] border rounded-[14px] px-[16px] outline-none focus:border-black transition"
        />

        <button
          @click="handleAuth"
          :disabled="authLoading"
          class="w-full h-[52px] rounded-[62px] text-white font-semibold transition"
          :class="authLoading ? 'bg-gray-400' : 'bg-black hover:bg-[#222]'"
        >
          <span v-if="authLoading">Loading...</span>
          <span v-else>
            {{ isLogin ? 'Войти' : 'Создать аккаунт' }}
          </span>
        </button>
      </div>

      <!-- ERROR -->
      <p v-if="error" class="text-red-500 text-[13px] mt-[12px]">
        {{ error }}
      </p>

      <!-- SWITCH -->
      <div class="mt-[18px] text-center text-[14px] text-[#666]">
        <span>
          {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
        </span>

        <button class="ml-[6px] text-black font-semibold" @click="toggle">
          {{ isLogin ? 'Регистрация' : 'Войти' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { globalRouting } from '~/src/composables/globbal';
import { useAuth } from '~/src/composables/useAuth';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

const router = useRouter();
const { redirectProfile } = globalRouting();

const { login, register, error } = useAuth();
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

    let res;

    if (isLogin.value) {
      res = await login(username.value, password.value);
    } else {
      res = await register(username.value, password.value);
    }

    if (res) {
      redirectProfile();
    }
  } catch (e) {
    console.error(e);
  } finally {
    authLoading.value = false;
    hide();
  }
};
</script>
