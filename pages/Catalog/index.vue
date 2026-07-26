<template>
  <Header />

  <div class="max-w-[1400px] mx-auto px-4 py-10 pb-[120px]">
    <div class="flex items-center justify-between max-md:flex-row">
      <h1 class="font-extrabold text-[48px] max-md:text-[28px]">Каталог часов</h1>

      <button
        @click="openFilters"
        class="hidden max-md:flex h-[38px] items-center px-5 rounded-full bg-black text-white font-semibold"
      >
        Фильтры
      </button>
    </div>

    <div
      class="mt-6 bg-white border border-[#ECECEC] rounded-[32px] p-[22px] max-md:hidden shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
    >
      <div class="flex justify-between items-start mb-5">
        <div>
          <h2 class="text-[20px] font-bold">Фильтры</h2>
          <p class="text-[13px] text-[#777]">Найдите часы</p>
        </div>

        <button @click="resetFilters" class="text-[14px] text-[#666] hover:text-black transition font-medium">
          Сбросить
        </button>
      </div>

      <div class="grid grid-cols-[1fr_180px_180px_160px] gap-[14px]">
        <input
          v-model="search"
          placeholder="Поиск"
          class="h-[56px] rounded-[18px] bg-[#F7F7F7] px-5 border border-transparent focus:border-black transition outline-none"
        />

        <input
          v-model.number="minPrice"
          placeholder="Мин. цена"
          class="h-[56px] rounded-[18px] bg-[#F7F7F7] px-5 border border-transparent focus:border-black transition outline-none"
        />

        <input
          v-model.number="maxPrice"
          placeholder="Макс. цена"
          class="h-[56px] rounded-[18px] bg-[#F7F7F7] px-5 border border-transparent focus:border-black transition outline-none"
        />

        <button
          @click="applyFilters"
          class="cursor-pointer h-[56px] rounded-[18px] bg-black text-white font-semibold hover:bg-[#1f1f1f] transition active:scale-[0.99]"
        >
          Найти
        </button>
      </div>

      <div v-if="brandsLoading" class="mt-4 flex flex-wrap gap-2">
        <div v-for="i in 6" :key="i" class="h-[36px] w-[90px] rounded-full bg-[#F0F0F0] animate-pulse"></div>
      </div>
      <div v-else-if="availableBrands.length" class="mt-4 flex flex-wrap gap-2">
        <button
          v-for="brand in availableBrands"
          :key="brand"
          @click="toggleBrand(brand)"
          class="cursor-pointer h-[36px] px-4 rounded-full text-[13px] font-semibold transition border"
          :class="
            selectedBrands.includes(brand)
              ? 'bg-black text-white border-black'
              : 'bg-[#F7F7F7] text-[#555] border-transparent hover:border-black'
          "
        >
          {{ brand }}
        </button>
      </div>

      <div class="mt-5 flex justify-end relative">
        <button
          @click="sortOpen = !sortOpen"
          class="h-[44px] px-[20px] rounded-full border border-[#ECECEC] bg-[#F7F7F7] text-black text-[14px] font-semibold flex items-center gap-[8px]"
        >
          {{ currentSortLabel }}
          <span class="text-[10px] opacity-60 transition-transform" :class="sortOpen ? 'rotate-180' : ''">▼</span>
        </button>

        <div
          v-if="sortOpen"
          class="absolute top-[52px] right-0 bg-white rounded-[16px] shadow-lg border border-[#ECECEC] overflow-hidden z-20 w-[220px]"
        >
          <button
            v-for="opt in sortOptions"
            :key="opt.value"
            @click="setSort(opt.value)"
            class="w-full text-left px-[18px] py-[12px] text-[14px] hover:bg-[#F7F7F7] transition-colors"
            :class="opt.value === selectedSort ? 'font-semibold bg-[#F7F7F7]' : ''"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="filtersOpen" class="fixed inset-0 bg-black/40 z-[100]" @click.self="closeFilters">
      <div
        class="absolute bottom-0 left-0 right-0 h-[75vh] bg-white rounded-t-[32px] p-5 transition-transform duration-300 flex flex-col"
        :class="sheetOpen ? 'translate-y-0' : 'translate-y-full'"
      >
        <div class="flex justify-between px-[10px]">
          <h2 class="text-[24px] font-bold">Фильтры</h2>
          <button @click="closeFilters">✕</button>
        </div>

        <div class="mt-6 space-y-4 flex-1 overflow-y-auto">
          <input v-model="search" placeholder="Поиск" class="input" />

          <input v-model.number="minPrice" placeholder="Минимальная цена" class="input" />

          <input v-model.number="maxPrice" placeholder="Максимальная цена" class="input" />

          <div>
            <p class="text-[13px] font-semibold text-[#999] uppercase tracking-wide mb-2 px-1">Бренд</p>

            <div v-if="brandsLoading" class="flex flex-wrap gap-2">
              <div v-for="i in 6" :key="i" class="h-[36px] w-[90px] rounded-full bg-[#F0F0F0] animate-pulse"></div>
            </div>
            <div v-else-if="availableBrands.length" class="flex flex-wrap gap-2">
              <button
                v-for="brand in availableBrands"
                :key="brand"
                @click="toggleBrand(brand)"
                class="cursor-pointer h-[36px] px-4 rounded-full text-[13px] font-semibold transition border"
                :class="
                  selectedBrands.includes(brand)
                    ? 'bg-black text-white border-black'
                    : 'bg-[#F7F7F7] text-[#555] border-transparent'
                "
              >
                {{ brand }}
              </button>
            </div>
          </div>

          <div>
            <p class="text-[13px] font-semibold text-[#999] uppercase tracking-wide mb-2 px-1">Сортировка</p>
            <div class="flex flex-col gap-[6px]">
              <button
                v-for="opt in sortOptions"
                :key="opt.value"
                @click="setSort(opt.value)"
                class="w-full text-left px-[16px] py-[12px] rounded-[14px] text-[14px]"
                :class="opt.value === selectedSort ? 'bg-black text-white font-semibold' : 'bg-[#F7F7F7]'"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t">
          <button
            @click="submitMobile"
            class="cursor-pointer w-full h-[56px] bg-black text-white rounded-full font-semibold"
          >
            Найти
          </button>

          <button @click="resetFilters" class="w-full mt-3 h-[52px] bg-[#F3F3F3] text-black rounded-full font-semibold">
            Сбросить
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 max-md:grid-cols-2 gap-[16px] mt-6">
      <WatchCard v-for="watch in watches" :key="watch.custom_id" :watch="watch" />
    </div>

    <p v-if="!watchesLoadingMore && !watches.length" class="text-center text-[#888] py-[60px]">Ничего не найдено</p>

    <!-- Лоадер под товарами -->
    <div v-if="watchesLoadingMore" class="flex justify-center py-8">
      <div class="w-8 h-8 rounded-full border-4 border-[#E5E5E5] border-t-black animate-spin" />
    </div>

    <!-- Триггер для загрузки следующей страницы -->
    <div ref="loadMoreTrigger" class="h-2" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

import { useWatch, type WatchFilters, type WatchSort } from '~/src/composables/GetWatch';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

import WatchCard from '~/src/UI/WatchCard.vue';
import Header from '../header/header.vue';

const { getWatches, loadMoreWatches, getBrands, watches, watchesHasMore, watchesLoadingMore } = useWatch();

const { show, hide } = useGlobalLoader();

const search = ref('');
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);

const selectedBrands = ref<string[]>([]);

type SortValue = 'default' | WatchSort;

const sortOptions: { value: SortValue; label: string }[] = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'popular', label: 'Популярные модели' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
];

const selectedSort = ref<SortValue>('default');
const sortOpen = ref(false);

const currentSortLabel = computed(() => sortOptions.find((o) => o.value === selectedSort.value)?.label ?? 'Сортировка');

const setSort = async (value: SortValue) => {
  selectedSort.value = value;
  sortOpen.value = false;
  await applyFilters();
};

const filtersOpen = ref(false);
const sheetOpen = ref(false);

const loadMoreTrigger = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

// --- Бренды больше НЕ считаются из уже загруженных карточек (watches.value) ---
// Раньше availableBrands был computed(() => watches.value.map(w => w.brand)...),
// из-за чего показывались только бренды из первой подгруженной страницы (напр. только Casio).
// Теперь список брендов грузится отдельным запросом к /watches/meta/brands,
// который возвращает ВСЕ уникальные бренды каталога, независимо от пагинации.
const availableBrands = ref<string[]>([]);
const brandsLoading = ref(false);

const loadBrands = async () => {
  brandsLoading.value = true;
  try {
    const brands = await getBrands();
    availableBrands.value = [...new Set(brands ?? [])].sort();
  } catch {
    availableBrands.value = [];
  } finally {
    brandsLoading.value = false;
  }
};

const toggleBrand = (brand: string) => {
  const index = selectedBrands.value.indexOf(brand);

  if (index === -1) {
    selectedBrands.value.push(brand);
  } else {
    selectedBrands.value.splice(index, 1);
  }
};

const currentFilters = (): WatchFilters => ({
  search: search.value || undefined,
  minPrice: minPrice.value || undefined,
  maxPrice: maxPrice.value || undefined,
  brands: selectedBrands.value,
  sort: selectedSort.value !== 'default' ? selectedSort.value : undefined,
});

const applyFilters = async () => {
  show();

  try {
    await getWatches(currentFilters(), 16);
  } finally {
    hide();
  }
};

const loadMore = async () => {
  if (watchesLoadingMore.value) return;
  if (!watchesHasMore.value) return;

  await loadMoreWatches(currentFilters(), 16);
};

const openFilters = async () => {
  filtersOpen.value = true;

  await nextTick();

  requestAnimationFrame(() => {
    sheetOpen.value = true;
  });
};

const closeFilters = () => {
  sheetOpen.value = false;

  setTimeout(() => {
    filtersOpen.value = false;
  }, 300);
};

const submitMobile = async () => {
  await applyFilters();
  closeFilters();
};

const resetFilters = async () => {
  search.value = '';
  minPrice.value = null;
  maxPrice.value = null;
  selectedBrands.value = [];
  selectedSort.value = 'default';

  await applyFilters();
};

onMounted(async () => {
  await Promise.all([loadBrands(), applyFilters()]);

  observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0];

      if (!entry) return;
      if (!entry.isIntersecting) return;

      await loadMore();
    },
    {
      root: null,
      threshold: 1,
    },
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }

  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (sortOpen.value && !target.closest('button')) {
      sortOpen.value = false;
    }
  });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.input {
  height: 56px;
  width: 100%;
  border-radius: 18px;
  background: #f7f7f7;
  padding: 0 20px;
  outline: none;
}
</style>
