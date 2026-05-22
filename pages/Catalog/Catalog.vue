<template>
  <DesktopHeader />

  <div class="max-w-[1400px] mx-auto px-4 py-10 pb-[120px]">
    <h1 class="font-extrabold text-[48px] max-md:text-[28px]">Каталог часов</h1>

    <!-- FILTERS -->
    <div class="flex flex-col md:flex-row gap-3 mt-5">
      <input
        v-model="search"
        placeholder="Поиск по названию или бренду"
        class="h-[48px] border rounded-[12px] px-4 w-full outline-none focus:border-black transition"
      />

      <input
        v-model.number="minPrice"
        type="number"
        placeholder="Мин. цена"
        class="h-[48px] border rounded-[12px] px-4 w-full md:w-[180px] outline-none focus:border-black transition"
      />

      <input
        v-model.number="maxPrice"
        type="number"
        placeholder="Макс. цена"
        class="h-[48px] border rounded-[12px] px-4 w-full md:w-[180px] outline-none focus:border-black transition"
      />
    </div>

    <!-- LOADING -->
    <div v-if="watchesLoading" class="mt-10 text-[#666] text-[16px]">Loading...</div>

    <!-- EMPTY -->
    <div v-else-if="filteredWatches.length === 0" class="mt-10 text-[#666] text-[16px]">Ничего не найдено</div>

    <!-- GRID -->
    <div v-else class="grid grid-cols-4 max-md:grid-cols-2 gap-x-[5px] gap-y-[16px] w-full mt-[20px]">
      <WatchCard v-for="watch in filteredWatches" :key="watch.custom_id" :watch="watch" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useWatch } from '~/src/composables/GetWatch';
import WatchCard from '~/src/UI/WatchCard.vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const { getWatches, watches, watchesLoading } = useWatch();

const search = ref('');
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);

onMounted(() => {
  getWatches();
});

const filteredWatches = computed(() => {
  return (watches.value || []).filter((w: any) => {
    const matchSearch =
      w.title?.toLowerCase().includes(search.value.toLowerCase()) ||
      w.brand?.toLowerCase().includes(search.value.toLowerCase());

    const matchMin = minPrice.value ? w.price >= minPrice.value : true;
    const matchMax = maxPrice.value ? w.price <= maxPrice.value : true;

    return matchSearch && matchMin && matchMax;
  });
});
</script>

<style scoped></style>
