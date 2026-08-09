// plugins/yandex-metrika.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  const YM_COUNTER_ID = 111433932;

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

  // отслеживание переходов между страницами в SPA-режиме
  const router = useRouter();
  router.afterEach((to) => {
    if ((window as any).ym) {
      (window as any).ym(YM_COUNTER_ID, 'hit', to.fullPath);
    }
  });

  // делаем dataLayer доступным глобально для e-commerce событий
  (window as any).dataLayer = (window as any).dataLayer || [];
});
