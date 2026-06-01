<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3f4] via-[#e8e6e7] to-[#dfdbdc] px-4 relative overflow-hidden">
    <!-- Декоративные элементы -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-100/30 to-pink-100/20 blur-3xl"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-blue-100/30 to-indigo-100/20 blur-3xl"></div>
      <div class="absolute top-[40%] left-[50%] w-[250px] h-[250px] rounded-full bg-gradient-to-br from-orange-50/20 to-yellow-50/10 blur-2xl"></div>
    </div>

    <!-- LOADER -->
    <div v-if="authLoading" class="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
        <svg class="animate-spin w-10 h-10 text-black" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <span class="text-sm font-medium">Загрузка...</span>
      </div>
    </div>

    <div class="w-full max-w-[440px] bg-white/80 backdrop-blur-xl p-[40px] rounded-[32px] border border-white/50 shadow-2xl shadow-black/5 relative z-10 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
      <!-- Иконка/лого -->
      <div class="flex justify-center mb-[30px]">
        <div class="w-[56px] h-[56px] rounded-2xl bg-black flex items-center justify-center shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105">
          <svg class="w-[28px] h-[28px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
      </div>

      <h1 class="text-[32px] font-black mb-[4px] text-center tracking-tight">
        {{ isLogin ? 'С возвращением' : 'Присоединяйтесь' }}
      </h1>

      <p class="text-[#86868b] text-[15px] mb-[32px] text-center leading-relaxed">
        {{ isLogin ? 'Войдите, чтобы продолжить' : 'Создайте аккаунт за минуту' }}
      </p>

      <div class="space-y-[16px]">
        <!-- Username -->
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none">
            <svg class="w-[20px] h-[20px] text-[#86868b] group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <input
            v-model="username"
            placeholder="Имя пользователя"
            class="w-full h-[56px] border-2 border-transparent bg-[#f5f5f7] rounded-[18px] pl-[48px] pr-[16px] outline-none transition-all duration-200 focus:bg-white focus:border-black focus:shadow-lg focus:shadow-black/5 hover:bg-[#e8e8ed] text-[15px]"
            @keyup.enter="handleAuth"
          />
        </div>

        <!-- Password -->
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none">
            <svg class="w-[20px] h-[20px] text-[#86868b] group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            class="w-full h-[56px] border-2 border-transparent bg-[#f5f5f7] rounded-[18px] pl-[48px] pr-[16px] outline-none transition-all duration-200 focus:bg-white focus:border-black focus:shadow-lg focus:shadow-black/5 hover:bg-[#e8e8ed] text-[15px]"
            @keyup.enter="handleAuth"
          />
        </div>

        <button
          @click="handleAuth"
          :disabled="authLoading"
          class="w-full h-[56px] rounded-[18px] text-white font-semibold transition-all duration-300 relative overflow-hidden group disabled:cursor-not-allowed text-[15px]"
          :class="authLoading ? 'bg-gray-400' : 'bg-black hover:shadow-lg hover:shadow-black/20 active:scale-[0.98]'"
        >
          <span v-if="authLoading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Загрузка...
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            {{ isLogin ? 'Войти' : 'Создать аккаунт' }}
            <svg class="w-[20px] h-[20px] transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </span>
        </button>
      </div>

      <!-- ERROR -->
      <div v-if="error" class="mt-[16px] p-[14px] bg-red-50 border border-red-200 rounded-[14px] flex items-start gap-[10px] animate-fadeIn">
        <svg class="w-[18px] h-[18px] text-red-500 mt-[1px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-600 text-[13px] leading-relaxed">{{ error }}</p>
      </div>

      <!-- Разделитель -->
      <div class="mt-[28px] mb-[24px] flex items-center gap-[14px]">
        <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#e0e0e0]"></div>
        <span class="text-[12px] text-[#86868b] uppercase tracking-wider font-medium">или</span>
        <div class="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#e0e0e0]"></div>
      </div>

      <!-- SWITCH -->
      <div class="text-center text-[14px]">
        <span class="text-[#86868b]">
          {{ isLogin ? 'Впервые здесь?' : 'Уже с нами?' }}
        </span>
        <button 
          class="ml-[8px] text-black font-semibold hover:underline underline-offset-4 decoration-2 transition-all duration-200" 
          @click="toggle"
        >
          {{ isLogin ? 'Регистрация' : 'Войти' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/src/composables/useAuth';

const router = useRouter();
const { login, register, error, user, init } = useAuth();

const username = ref('');
const password = ref('');

const isLogin = ref(true);
const authLoading = ref(false);

onMounted(() => {
  init();
  
  // Редирект если уже авторизован
  if (user.value) {
    router.push('/Profile/Profile');
  }
});

const toggle = () => {
  isLogin.value = !isLogin.value;
  error.value = null;
};

const handleAuth = async () => {
  if (!username.value || !password.value) {
    error.value = 'Заполните все поля';
    return;
  }

  try {
    authLoading.value = true;
    error.value = null;

    let res;

    if (isLogin.value) {
      res = await login(username.value, password.value);
    } else {
      res = await register(username.value, password.value);
    }

    if (res) {
      await router.push('/Profile/Profile');
    }
  } catch (e: any) {
    console.error('Auth error:', e);
    error.value = e?.data?.detail || 'Произошла ошибка';
  } finally {
    authLoading.value = false;
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>