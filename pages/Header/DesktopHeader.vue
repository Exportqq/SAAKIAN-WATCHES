<template>
  <div class="relative w-full flex items-center justify-center h-[96px] max-md:h-[64px] overflow-hidden">
    <!-- MOBILE BURGER -->
    <button
      v-if="isMobile"
      class="absolute left-4 z-50 w-6 h-6 flex items-center justify-center"
      @click="isMenuOpen = !isMenuOpen"
    >
      <!-- burger -->
      <div
        class="absolute transition-all duration-300"
        :class="isMenuOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'"
      >
        <div class="w-6 h-[2px] bg-black mb-1"></div>
        <div class="w-6 h-[2px] bg-black mb-1"></div>
        <div class="w-6 h-[2px] bg-black"></div>
      </div>

      <!-- cross -->
      <div
        class="absolute w-6 h-6 transition-all duration-300"
        :class="isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'"
      >
        <span class="absolute top-1/2 left-0 w-6 h-[2px] bg-black rotate-45"></span>
        <span class="absolute top-1/2 left-0 w-6 h-[2px] bg-black -rotate-45"></span>
      </div>
    </button>

    <!-- DESKTOP -->
    <div v-if="!isMobile" class="flex gap-[68px] items-center">
      <div class="flex gap-[35px]">
        <a class="relative text-[16px] cursor-pointer">КАТАЛОГ</a>
        <a class="relative text-[16px] cursor-pointer">ОПТОВАЯ ПОКУПКА</a>
      </div>

      <img class="w-[184px] h-[46px] cursor-pointer" src="/logo.svg" />

      <div class="flex gap-[35px]">
        <a class="relative text-[16px] cursor-pointer">РАСПРОДАЖА</a>
        <a class="relative text-[16px] cursor-pointer">ПРОФИЛЬ</a>
      </div>
    </div>

    <!-- MOBILE HEADER -->
    <div v-else class="w-full flex items-center justify-center">
      <img class="w-[140px] h-[36px]" src="/logo.svg" />
    </div>

    <!-- BASKET -->
    <img class="absolute right-[200px] max-md:right-4 w-[28px] h-[28px] cursor-pointer z-50" src="/icons/basket.svg" />

    <!-- MOBILE MENU -->
    <div
      v-if="isMobile"
      class="fixed top-0 left-0 h-full w-full bg-white z-40 flex flex-col items-center justify-center gap-6 transform transition-all duration-500 ease-out"
      :class="isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'"
    >
      <a class="text-lg">КАТАЛОГ</a>
      <a class="text-lg">ОПТОВАЯ ПОКУПКА</a>
      <a class="text-lg">РАСПРОДАЖА</a>
      <a class="text-lg">ПРОФИЛЬ</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useWindowSizes from '~/src/composables/window_size';

const { isMobile } = useWindowSizes();
const isMenuOpen = ref(false);
</script>
