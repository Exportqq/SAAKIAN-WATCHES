<script lang="ts" setup>
import { onMounted } from 'vue';
import { useWatch } from '~/src/composables/GetWatch';
import WatchCard from '~/src/UI/WatchCard.vue';

const { getNewWatches, newWatches, newWatchesLoading } = useWatch();

onMounted(() => {
  getNewWatches(100);
});
</script>

<template>
  <h1 class="font-extrabold text-[48px] max-md:text-[28px] h-[59px] max-md:h-[34px]">НОВИНКА САЙТА</h1>

  <div v-if="newWatchesLoading">Loading...</div>

  <div
    v-else-if="newWatches.length"
    class="grid grid-cols-4 max-md:grid-cols-2 gap-x-[5px] gap-y-[16px] w-full mt-[20px] max-md:mt-[10px]"
  >
    <WatchCard v-for="watch in newWatches" :key="watch.custom_id" :watch="watch" />
  </div>

  <div v-else class="text-[#888] text-[16px] mt-[20px]">Сейчас нет товаров со статусом «New»</div>
</template>
