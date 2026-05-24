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

export const watches = ref<Watch[]>([]);
export const currentWatch = ref<Watch | null>(null);
export const watchesLoading = ref(false);
export const watchesError = ref<string | null>(null);

export const useWatch = () => {
  const { request } = useApi();

  const getWatches = async (filters?: { search?: string; minPrice?: number | null; maxPrice?: number | null }) => {
    watchesLoading.value = true;
    watchesError.value = null;

    try {
      const params = new URLSearchParams();

      const search = filters?.search?.trim();

      if (search) {
        params.append('search', search);
      }

      // ВАЖНО: поддержка разных backend naming (частая причина бага)
      if (filters?.minPrice !== null && filters?.minPrice !== undefined) {
        params.append('min_price', String(filters.minPrice));
        params.append('minPrice', String(filters.minPrice)); // fallback
      }

      if (filters?.maxPrice !== null && filters?.maxPrice !== undefined) {
        params.append('max_price', String(filters.maxPrice));
        params.append('maxPrice', String(filters.maxPrice)); // fallback
      }

      const url = params.toString() ? `/watches?${params.toString()}` : '/watches';

      const res = await request<Watch[]>(url);

      watches.value = res || [];

      return res;
    } catch (e: any) {
      watchesError.value = e?.message || 'Error loading watches';
      watches.value = [];
    } finally {
      watchesLoading.value = false;
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

  return {
    getWatches,
    getWatchById,
    watches,
    currentWatch,
    watchesLoading,
    watchesError,
  };
};
