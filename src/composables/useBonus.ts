import { ref } from 'vue';
import { useApi } from './useApi';

export const bonus = ref<{ balance: number } | null>(null);
export const bonusError = ref<string | null>(null);

export const useBonus = () => {
  const { request } = useApi();

  const fetchBonus = async () => {
    try {
      const res = await request<{ balance: number }>('/bonus/me');
      bonus.value = res;
      return res;
    } catch (e: any) {
      bonusError.value = e.message;
      bonus.value = { balance: 0 };
    }
  };

  return {
    bonus,
    bonusError,
    fetchBonus,
  };
};
