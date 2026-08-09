import { useHead, useRuntimeConfig } from '#app';
import { useRoute } from 'vue-router';

export const useCanonical = (path?: string) => {
  const route = useRoute();
  const config = useRuntimeConfig();

  useHead({
    link: [{ rel: 'canonical', href: `${config.public.siteUrl}${path ?? route.path}` }],
  });
};

export const useNoIndex = () => {
  useHead({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  });
};
