<template>
  <DesktopHeader />

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

      <div v-if="availableBrands.length" class="mt-4 flex flex-wrap gap-2">
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

          <div v-if="availableBrands.length">
            <p class="text-[13px] font-semibold text-[#999] uppercase tracking-wide mb-2 px-1">Бренд</p>
            <div class="flex flex-wrap gap-2">
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
        </div>

        <div class="pt-4 border-t">
          <button
            @click="submitMobile"
            class="cursor-pointer w-full h-[56px] bg-black text-white rounded-full font-semibold"
          >
            Найти
          </button>
          <button
            @click="resetFilters"
            class="w-full mt-3 h-[52px] bg-[#F3F3F3] text-black rounded-full font-semibold"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 max-md:grid-cols-2 gap-[16px] mt-6">
      <WatchCard v-for="watch in filteredWatches" :key="watch.custom_id" :watch="watch" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { useWatch } from '~/src/composables/GetWatch';
import WatchCard from '~/src/UI/WatchCard.vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const { getWatches, watches } = useWatch();

const search = ref('');
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);
const selectedBrands = ref<string[]>([]);

const filtersOpen = ref(false);
const sheetOpen = ref(false);

const availableBrands = computed(() => {
  const brands = watches.value.map((w) => w.brand).filter(Boolean);
  return [...new Set(brands)].sort();
});

const filteredWatches = computed(() => {
  if (!selectedBrands.value.length) return watches.value;
  return watches.value.filter((w) => selectedBrands.value.includes(w.brand));
});

const toggleBrand = (brand: string) => {
  const idx = selectedBrands.value.indexOf(brand);
  if (idx === -1) selectedBrands.value.push(brand);
  else selectedBrands.value.splice(idx, 1);
};

onMounted(() => {
  applyFilters();
});

const applyFilters = async () => {
  await getWatches({
    search: search.value || undefined,
    minPrice: minPrice.value || undefined,
    maxPrice: maxPrice.value || undefined,
  });
};

const openFilters = async () => {
  filtersOpen.value = true;
  await nextTick();
  requestAnimationFrame(() => (sheetOpen.value = true));
};

const closeFilters = () => {
  sheetOpen.value = false;
  setTimeout(() => (filtersOpen.value = false), 300);
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
  await applyFilters();
};
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
