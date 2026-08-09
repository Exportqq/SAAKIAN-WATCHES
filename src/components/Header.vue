<template>
  <div class="relative w-full flex items-center justify-center h-[96px] max-md:h-[64px] overflow-hidden">
    <button
      v-if="isMobile"
      class="absolute left-4 z-50 w-6 h-6 flex items-center justify-center"
      @click="isMenuOpen = !isMenuOpen"
    >
      <div
        class="absolute transition-all duration-300"
        :class="isMenuOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'"
      >
        <div class="w-6 h-[2px] bg-black mb-1"></div>
        <div class="w-6 h-[2px] bg-black mb-1"></div>
        <div class="w-6 h-[2px] bg-black"></div>
      </div>

      <div
        class="absolute w-6 h-6 transition-all duration-300"
        :class="isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'"
      >
        <span class="absolute top-1/2 left-0 w-6 h-[2px] bg-black rotate-45"></span>
        <span class="absolute top-1/2 left-0 w-6 h-[2px] bg-black -rotate-45"></span>
      </div>
    </button>

    <nav v-if="!isMobile" class="flex gap-[68px] items-center" aria-label="Основная навигация">
      <div class="flex gap-[35px]">
        <NuxtLink to="/" class="relative text-[16px] cursor-pointer">ГЛАВНАЯ</NuxtLink>
        <NuxtLink to="/catalog" class="relative text-[16px] cursor-pointer">КАТАЛОГ</NuxtLink>
      </div>

      <NuxtLink to="/" aria-label="Saakian Watches — на главную">
        <img class="w-[184px] h-[46px] cursor-pointer" src="/logo.webp" alt="Saakian Watches" width="184" height="46" />
      </NuxtLink>

      <div class="flex gap-[35px]">
        <NuxtLink to="/about-us" class="relative text-[16px] cursor-pointer">О НАС</NuxtLink>
        <NuxtLink to="/profile" class="relative text-[16px] cursor-pointer">ПРОФИЛЬ</NuxtLink>
      </div>
    </nav>

    <div v-else class="w-full flex items-center justify-center">
      <NuxtLink to="/" aria-label="Saakian Watches — на главную">
        <img class="w-[140px] h-[36px]" src="/logo.webp" alt="Saakian Watches" width="140" height="36" />
      </NuxtLink>
    </div>

    <div class="absolute right-[200px] max-md:right-4 z-50">
      <NuxtLink to="/basket" class="relative cursor-pointer block" aria-label="Корзина">
        <img class="w-[28px] h-[28px]" src="/icons/basket.svg" alt="" />

        <div
          v-if="basketCount > 0"
          class="absolute -bottom-1 -left-2 bg-black text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full"
        >
          {{ basketCount }}
        </div>
      </NuxtLink>
    </div>

    <nav
      v-if="isMobile"
      class="fixed top-0 left-0 h-full w-full bg-white z-40 flex flex-col items-center justify-center gap-6 transform transition-all duration-500 ease-out"
      :class="isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'"
      aria-label="Мобильная навигация"
    >
      <NuxtLink to="/" class="text-lg" @click="isMenuOpen = false">ГЛАВНАЯ</NuxtLink>
      <NuxtLink to="/catalog" class="text-lg" @click="isMenuOpen = false">КАТАЛОГ</NuxtLink>
      <NuxtLink to="/about-us" class="text-lg" @click="isMenuOpen = false">О НАС</NuxtLink>
      <NuxtLink to="/profile" class="text-lg" @click="isMenuOpen = false">ПРОФИЛЬ</NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useBasket } from '~/src/composables/AddBasket';
import useWindowSizes from '~/src/composables/window_size';

const { isMobile } = useWindowSizes();
const isMenuOpen = ref(false);

const { basket, getBasket } = useBasket();

const basketCount = computed(() => {
  return basket.value.reduce((sum, item) => sum + item.quantity, 0);
});

onMounted(() => {
  getBasket();
});
</script>
