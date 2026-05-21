import { useState } from "#app";

export const useGlobalLoader = () => {
  const loading = useState<boolean>("global-loading", () => false);

  const show = () => {
    loading.value = true;
  };

  const hide = () => {
    loading.value = false;
  };

  return {
    loading,
    show,
    hide,
  };
};
