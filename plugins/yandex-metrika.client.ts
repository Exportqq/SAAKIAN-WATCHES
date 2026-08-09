// plugins/yandex-metrika.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  const YM_COUNTER_ID = 111433932;

  // dataLayer must exist immediately so ecommerce pushes are never lost,
  // even before the Metrika script itself has loaded.
  (window as any).dataLayer = (window as any).dataLayer || [];

  const router = useRouter();
  router.afterEach((to) => {
    if ((window as any).ym) {
      (window as any).ym(YM_COUNTER_ID, 'hit', to.fullPath);
    }
  });

  // Metrika (especially webvisor) is heavy; load it once the main thread is
  // idle instead of competing with initial render/hydration.
  const loadMetrika = () => {
    (function (m: any, e: Document, t: string, r: string, i: string, k?: any, a?: any) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * (new Date() as any);
      for (let j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) {
          return;
        }
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + YM_COUNTER_ID, 'ym');

    (window as any).ym(YM_COUNTER_ID, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      accurateTrackBounce: true,
      trackLinks: true,
    });
  };

  const requestIdle = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 2000));
  requestIdle(loadMetrika, { timeout: 4000 });
});
