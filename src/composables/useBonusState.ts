// src/composables/useBonusState.ts
import { ref } from 'vue';

// Безопасно получаем сохраненное состояние
const getSavedState = (): boolean => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedState = localStorage.getItem('useBonusToggle');
    return savedState === 'true';
  }
  return false;
};

const useBonusToggle = ref(getSavedState());

export function useBonusState() {
  const toggleBonus = () => {
    useBonusToggle.value = !useBonusToggle.value;

    // Сохраняем состояние только на клиенте
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('useBonusToggle', useBonusToggle.value.toString());
    }
  };

  return {
    useBonusToggle,
    toggleBonus,
  };
}
