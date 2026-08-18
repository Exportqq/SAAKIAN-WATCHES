import { useState } from '#app';
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
  gender: string;
  brand: string;

  status: string;

  bonus_percent: number;
}

export interface WatchesPage {
  items: Watch[];
  total: number;
  has_more: boolean;
}

// Цены Tissot в API приходят в долларах — приводим к рублям по фиксированному курсу с наценкой
const TISSOT_PRICE_MULTIPLIER = 90 * 1.5;

export const applyBrandPricing = <T extends Watch>(watch: T): T =>
  watch.brand?.trim().toLowerCase() === 'tissot' ? { ...watch, price: watch.price * TISSOT_PRICE_MULTIPLIER } : watch;

export type WatchSort = 'price_asc' | 'price_desc' | 'popular';

export interface WatchFilters {
  search?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  brands?: string[];
  sort?: WatchSort;
}

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

  if (filters?.sort) {
    params.append('sort', filters.sort);
  }

  params.append('offset', String(offset));
  params.append('limit', String(limit));

  return params;
};

// useState вместо голого ref() — состояние живёт в SSR-контексте конкретного
// запроса и сериализуется в payload для гидратации, а не шарится между
// параллельными запросами разных пользователей на сервере (как было раньше).
export const useWatch = () => {
  const { request } = useApi();

  const watches = useState<Watch[]>('watches-list', () => []);
  const currentWatch = useState<Watch | null>('watch-current', () => null);

  const watchesLoading = useState<boolean>('watches-loading', () => false);
  const watchesLoadingMore = useState<boolean>('watches-loading-more', () => false);
  const watchesError = useState<string | null>('watches-error', () => null);

  const watchesTotal = useState<number>('watches-total', () => 0);
  const watchesHasMore = useState<boolean>('watches-has-more', () => false);

  const newWatches = useState<Watch[]>('watches-new', () => []);
  const newWatchesLoading = useState<boolean>('watches-new-loading', () => false);

  const hotWatches = useState<Watch[]>('watches-hot', () => []);
  const hotWatchesLoading = useState<boolean>('watches-hot-loading', () => false);

  // =========================
  // Обычный список
  // GET /watches
  // =========================
  const getWatches = async (filters?: WatchFilters, limit = 16) => {
    watchesLoading.value = true;
    watchesError.value = null;

    try {
      const params = buildParams(filters, 0, limit);

      const res = await request<WatchesPage>(`/watches?${params.toString()}`);
      res.items = res.items.map(applyBrandPricing);

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

  // =========================
  // Подгрузка обычного списка
  // GET /watches
  // =========================
  const loadMoreWatches = async (filters?: WatchFilters, limit = 16) => {
    if (watchesLoadingMore.value) return;
    if (!watchesHasMore.value) return;

    watchesLoadingMore.value = true;

    try {
      const params = buildParams(filters, watches.value.length, limit);

      const res = await request<WatchesPage>(`/watches?${params.toString()}`);
      res.items = res.items.map(applyBrandPricing);

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

  // =========================
  // Новинки
  // GET /watches/new
  // =========================
  const getNewWatches = async (limit = 100) => {
    newWatchesLoading.value = true;
    watchesError.value = null;

    try {
      const params = new URLSearchParams();

      params.append('offset', '0');
      params.append('limit', String(limit));

      const res = await request<WatchesPage>(`/watches/new?${params.toString()}`);
      res.items = res.items.map(applyBrandPricing);

      newWatches.value = res.items;

      return res;
    } catch (e: any) {
      watchesError.value = e?.message || 'Error loading new watches';

      newWatches.value = [];
    } finally {
      newWatchesLoading.value = false;
    }
  };

  // =========================
  // Популярные
  // GET /watches/hot
  // =========================
  const getHotWatches = async (limit = 100) => {
    hotWatchesLoading.value = true;
    watchesError.value = null;

    try {
      const params = new URLSearchParams();

      params.append('offset', '0');
      params.append('limit', String(limit));

      const res = await request<WatchesPage>(`/watches/hot?${params.toString()}`);
      res.items = res.items.map(applyBrandPricing);

      hotWatches.value = res.items;

      return res;
    } catch (e: any) {
      watchesError.value = e?.message || 'Error loading hot watches';

      hotWatches.value = [];
    } finally {
      hotWatchesLoading.value = false;
    }
  };

  // =========================
  // Один товар
  // GET /watches/:id
  // =========================
  const getWatchById = async (id: string) => {
    watchesLoading.value = true;

    try {
      const res = applyBrandPricing(await request<Watch>(`/watches/${id}`));

      currentWatch.value = res;

      return res;
    } catch (e: any) {
      currentWatch.value = null;
      watchesError.value = e?.message || 'Error loading watch';
    } finally {
      watchesLoading.value = false;
    }
  };

  // =========================
  // Бренды
  // GET /watches/meta/brands
  // =========================
  const getBrands = async () => {
    return request<string[]>('/watches/meta/brands');
  };

  return {
    getWatches,
    loadMoreWatches,

    getNewWatches,
    getHotWatches,

    getWatchById,
    getBrands,

    watches,
    currentWatch,

    watchesLoading,
    watchesLoadingMore,
    watchesError,

    watchesTotal,
    watchesHasMore,

    newWatches,
    newWatchesLoading,
    hotWatches,
    hotWatchesLoading,
  };
};
