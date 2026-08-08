import { ref } from 'vue';
import { useApi } from './useApi';
import { useAuth } from './useAuth';

export interface BonusData {
  balance: number;
}

export const bonus = ref<BonusData | null>(null);
export const bonusError = ref<string | null>(null);
export const bonusLoading = ref(false);

export const useBonus = () => {
  const { request } = useApi();
  const { user } = useAuth();

  const fetchBonus = async () => {
    const userId = user.value?.id;

    // У гостя бонусного счёта нет — сбрасываем и не ходим на бэк
    if (!userId) {
      bonus.value = null;
      return null;
    }

    bonusLoading.value = true;
    bonusError.value = null;

    try {
      // GET /bonus/me требует user_id как обязательный query-параметр
      const res = await request<BonusData>(`/bonus/me?user_id=${encodeURIComponent(userId)}`);
      bonus.value = res;
      return res;
    } catch (e: any) {
      bonusError.value = e?.message || 'Ошибка загрузки бонусов';
      bonus.value = null;
      return null;
    } finally {
      bonusLoading.value = false;
    }
  };

  const resetBonus = () => {
    bonus.value = null;
  };

  return {
    bonus,
    bonusError,
    bonusLoading,
    fetchBonus,
    resetBonus,
  };
};
