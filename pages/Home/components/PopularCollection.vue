<script lang="ts" setup>
import { onMounted } from 'vue';
import { useWatch } from '~/src/composables/GetWatch';
import WatchCard from '~/src/UI/WatchCard.vue';

const { getHotWatches, hotWatches, hotWatchesLoading } = useWatch();

onMounted(() => {
  getHotWatches(100);
});
</script>

<template>
  <h1 class="font-extrabold text-[48px] max-md:text-[28px] h-[59px] max-md:h-[34px]">ПОПУЛЯРНЫЕ МОДЕЛИ</h1>

  <div v-if="hotWatchesLoading">Loading...</div>

  <div
    v-else-if="hotWatches.length"
    class="grid grid-cols-4 max-md:grid-cols-2 gap-x-[5px] gap-y-[16px] w-full mt-[20px] max-md:mt-[10px]"
  >
    <WatchCard v-for="watch in hotWatches" :key="watch.custom_id" :watch="watch" />
  </div>

  <div v-else class="text-[#888] text-[16px] mt-[20px]">Сейчас нет товаров со статусом «Hot»</div>
</template>
