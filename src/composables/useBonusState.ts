// src/composables/useBonusState.ts
import { ref } from 'vue';

// Восстанавливаем состояние из localStorage при инициализации
const savedState = localStorage.getItem('useBonusToggle');
const useBonusToggle = ref(savedState === 'true');

export function useBonusState() {
  const toggleBonus = () => {
    useBonusToggle.value = !useBonusToggle.value;
    // Сохраняем состояние в localStorage
    localStorage.setItem('useBonusToggle', useBonusToggle.value.toString());
  };

  return {
    useBonusToggle,
    toggleBonus,
  };
}
