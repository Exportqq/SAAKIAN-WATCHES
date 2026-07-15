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

    <div v-if="!isMobile" class="flex gap-[68px] items-center">
      <div class="flex gap-[35px]">
        <a @click="goHome()" class="relative text-[16px] cursor-pointer">ГЛАВНАЯ</a>
        <a @click="goCatalog()" class="relative text-[16px] cursor-pointer">КАТАЛОГ</a>
      </div>

      <img @click="goHome()" class="w-[184px] h-[46px] cursor-pointer" src="/logo.svg" />

      <div class="flex gap-[35px]">
        <a @click="redirectAboutUs()" class="relative text-[16px] cursor-pointer">РАСПРОДАЖА</a>
        <a @click="goProfile()" class="relative text-[16px] cursor-pointer">ПРОФИЛЬ</a>
      </div>
    </div>

    <div v-else class="w-full flex items-center justify-center">
      <img @click="goHome()" class="w-[140px] h-[36px]" src="/logo.svg" />
    </div>

    <div class="absolute right-[200px] max-md:right-4 z-50">
      <div class="relative cursor-pointer" @click="goToBasket">
        <img class="w-[28px] h-[28px]" src="/icons/basket.svg" />

        <div
          v-if="basketCount > 0"
          class="absolute -bottom-1 -left-2 bg-black text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full"
        >
          {{ basketCount }}
        </div>
      </div>
    </div>

    <div
      v-if="isMobile"
      class="fixed top-0 left-0 h-full w-full bg-white z-40 flex flex-col items-center justify-center gap-6 transform transition-all duration-500 ease-out"
      :class="isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'"
    >
      <a @click="goHome()" class="text-lg">ГЛАВНАЯ</a>
      <a @click="goCatalog()" class="text-lg">КАТАЛОГ</a>
      <a @click="redirectAboutUs()" class="text-lg">РАСПРОДАЖА</a>
      <a @click="goProfile()" class="text-lg">ПРОФИЛЬ</a>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useBasket } from '~/src/composables/AddBasket';
import { globalRouting } from '~/src/composables/globbal';
import useWindowSizes from '~/src/composables/window_size';

const { isMobile } = useWindowSizes();
const isMenuOpen = ref(false);

const { basket, getBasket } = useBasket();
const { redirectCatalog, redirectBasket, redirectHome, redirectProfile, redirectAboutUs } = globalRouting();

const basketCount = computed(() => {
  return basket.value.reduce((sum, item) => sum + item.quantity, 0);
});

const goToBasket = () => redirectBasket();
const goCatalog = () => redirectCatalog();
const goHome = () => redirectHome();
const goProfile = () => redirectProfile();

onMounted(() => {
  getBasket();
});
</script>
