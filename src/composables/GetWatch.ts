import { ref } from 'vue';
import { useApi } from './useApi';

export interface Watch {
  id: string;
  image: string;
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
  reviews: any[];
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

  const getWatches = async () => {
    watchesLoading.value = true;

    try {
      const res = await request<Watch[]>('/watches');
      watches.value = res;
      return res;
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
