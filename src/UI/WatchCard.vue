<script lang="ts" setup>
import type { Watch } from '../composables/GetWatch';

defineProps<{ watch: Watch }>();

const getImageUrl = (path?: string) => {
  if (!path) return '/watch.png';
  if (path.startsWith('http')) return path;
  return `https://watches-api-c9i5.onrender.com${path}`;
};
</script>

<template>
  <NuxtLink :to="`/watch/${watch.id}`" class="w-full block">
    <div class="bg-[#F0EEED] w-full aspect-square flex items-center justify-center">
      <img :src="getImageUrl(watch.images?.[0])" class="w-full h-full object-contain" />
    </div>

    <div class="flex justify-between items-center px-4 mt-[clamp(10px,1.2vw,16px)]">
      <div>
        <h1 class="text-black font-medium text-[clamp(14px,1.2vw,20px)] h-[clamp(16px,1.2vw,24px)]">
          {{ watch.title }}
        </h1>

        <h2 class="text-black font-bold text-[clamp(14px,1.2vw,20px)]">{{ watch.price.toLocaleString() }} ₽</h2>
      </div>

      <img class="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]" src="/icons/basket_add.svg" />
    </div>
  </NuxtLink>
</template>
