<script lang="ts" setup>
import { onMounted } from 'vue';
import { useWatch } from '~/src/composables/GetWatch';
import WatchCard from '~/src/UI/WatchCard.vue';

const { getWatches, watches, watchesLoading } = useWatch();

onMounted(() => {
  getWatches();
});
</script>

<template>
  <h1 class="font-extrabold text-[48px] max-md:text-[28px] h-[59px] max-md:h-[34px]">НОВЫЕ КОЛЛЕКЦИИ</h1>

  <div v-if="watchesLoading">Loading...</div>

  <div v-else class="grid grid-cols-4 max-md:grid-cols-2 gap-x-[5px] gap-y-[16px] w-full mt-[20px] max-md:mt-[10px]">
    <WatchCard v-for="watch in watches" :key="watch.id" :watch="watch" />
  </div>
</template>
