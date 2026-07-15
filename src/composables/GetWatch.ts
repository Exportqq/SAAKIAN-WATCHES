import { ref } from 'vue';
import { useApi } from './useApi';

export interface Watch {
  id: string;
  custom_id: string;
  images: string[];
  title: string;
  price: number;
  description: string;

  bracelet: string;
  mechanism: string;
  case_material: string;
  case_color: string;
  dial: string;
  dial_color: string;
  glass: string;
  backlight: string;
  gender: string;
  brand_country: string;
  brand: string;

  status: string;
  in_stock: boolean;

  bonus_percent: number;
  discount_percent: number;

  rating: number;
  reviews_count: number;
}

export interface WatchesPage {
  items: Watch[];
  total: number;
  has_more: boolean;
}

export interface WatchFilters {
  search?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  brands?: string[];
}

export const watches = ref<Watch[]>([]);
export const currentWatch = ref<Watch | null>(null);

export const watchesLoading = ref(false);
export const watchesLoadingMore = ref(false);
export const watchesError = ref<string | null>(null);

export const watchesTotal = ref(0);
export const watchesHasMore = ref(false);

const buildParams = (filters: WatchFilters | undefined, offset: number, limit: number) => {
  const params = new URLSearchParams();

  if (filters?.search?.trim()) {
    params.append('search', filters.search.trim());
  }

  if (filters?.minPrice != null) {
    params.append('minPrice', String(filters.minPrice));
  }

  if (filters?.maxPrice != null) {
    params.append('maxPrice', String(filters.maxPrice));
  }

  if (filters?.brands?.length) {
    params.append('brands', filters.brands.join(','));
  }

  params.append('offset', String(offset));
  params.append('limit', String(limit));

  return params;
};

export const useWatch = () => {
  const { request } = useApi();

  const getWatches = async (filters?: WatchFilters, limit = 16) => {
    watchesLoading.value = true;
    watchesError.value = null;

    try {
      const params = buildParams(filters, 0, limit);

      const res = await request<WatchesPage>(`/watches?${params.toString()}`);

      watches.value = res.items;
      watchesTotal.value = res.total;
      watchesHasMore.value = res.has_more;

      return res;
    } catch (e: any) {
      watchesError.value = e?.message || 'Error loading watches';
      watches.value = [];
      watchesHasMore.value = false;
      watchesTotal.value = 0;
    } finally {
      watchesLoading.value = false;
    }
  };

  const loadMoreWatches = async (filters?: WatchFilters, limit = 16) => {
    if (watchesLoadingMore.value) return;
    if (!watchesHasMore.value) return;

    watchesLoadingMore.value = true;

    try {
      const params = buildParams(filters, watches.value.length, limit);

      const res = await request<WatchesPage>(`/watches?${params.toString()}`);

      watches.value.push(...res.items);

      watchesTotal.value = res.total;
      watchesHasMore.value = res.has_more;

      return res;
    } catch (e: any) {
      watchesError.value = e?.message || 'Error loading watches';
    } finally {
      watchesLoadingMore.value = false;
    }
  };

  const getWatchById = async (id: string) => {
    watchesLoading.value = true;

    try {
      const res = await request<Watch>(`/watches/${id}`);

      currentWatch.value = res;

      return res;
    } finally {
      watchesLoading.value = false;
    }
  };

  const getBrands = async () => {
    return request<string[]>('/watches/meta/brands');
  };

  return {
    getWatches,
    loadMoreWatches,
    getWatchById,
    getBrands,

    watches,
    currentWatch,

    watchesLoading,
    watchesLoadingMore,
    watchesError,

    watchesTotal,
    watchesHasMore,
  };
};
