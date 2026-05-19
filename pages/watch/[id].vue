<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWatch } from '~/src/composables/GetWatch';

const route = useRoute();

const { currentWatch, getWatchById, watchesLoading } = useWatch();

const API_URL = 'https://watches-api-c9i5.onrender.com';

const normalizeImage = (path?: string) => {
  if (!path) return '/watch.png';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

onMounted(() => {
  getWatchById(route.params.id as string);
});
</script>

<template>
  <div v-if="watchesLoading" class="p-10">Loading...</div>

  <div v-else-if="currentWatch" class="max-w-[1400px] mx-auto px-4 py-10">
    <div class="grid grid-cols-2 max-md:grid-cols-1 gap-[40px]">
      <!-- IMAGE -->
      <div class="bg-[#F0EEED] w-full aspect-square flex items-center justify-center">
        <img :src="normalizeImage(currentWatch.image)" class="w-full h-full object-contain" />
      </div>

      <!-- INFO -->
      <div>
        <h1 class="font-extrabold text-[40px] max-md:text-[28px]">
          {{ currentWatch.title }}
        </h1>

        <h2 class="mt-[10px] text-[28px] font-bold">{{ currentWatch.price.toLocaleString() }} ₽</h2>

        <p class="mt-[20px] text-[16px] leading-[26px] text-black/70">
          {{ currentWatch.description }}
        </p>

        <div class="mt-[30px] space-y-2 text-[14px]">
          <p><b>Бренд:</b> {{ currentWatch.brand }}</p>
          <p><b>Страна:</b> {{ currentWatch.brand_country }}</p>
          <p><b>Механизм:</b> {{ currentWatch.mechanism }}</p>
          <p><b>Корпус:</b> {{ currentWatch.case_material }}</p>
          <p><b>Стекло:</b> {{ currentWatch.glass }}</p>
          <p><b>Браслет:</b> {{ currentWatch.bracelet }}</p>
          <p><b>Пол:</b> {{ currentWatch.gender }}</p>
        </div>

        <button class="mt-[40px] bg-black text-white px-10 h-[56px] rounded-full">Добавить в корзину</button>
      </div>
    </div>
  </div>

  <div v-else class="p-10">Not found</div>
</template>
