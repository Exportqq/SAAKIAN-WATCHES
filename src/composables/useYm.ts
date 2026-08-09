// composables/useYm.ts
export const YM_COUNTER_ID = 111433932;

export function useYm() {
  function reachGoal(goalId: string, params?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(YM_COUNTER_ID, 'reachGoal', goalId, params);
    }
  }

  function ecommercePush(event: Record<string, any>) {
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(event);
    }
  }

  return { reachGoal, ecommercePush };
}
