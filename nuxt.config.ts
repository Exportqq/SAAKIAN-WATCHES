import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  css: ['~/assets/css/global.css', 'aos/dist/aos.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      titleTemplate: (title) => (title ? `${title} — Saakian Watches` : 'Saakian Watches — оригинальные наручные часы'),
      meta: [
        { name: 'description', content: 'Saakian Watches — магазин оригинальных наручных часов с гарантией подлинности. Каталог проверенных брендов, доставка по всей России.' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:site_name', content: 'Saakian Watches' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#1C1B19' },
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/logo.webp' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  plugins: [{ src: '~/plugins/aos', mode: 'client' }],

  runtimeConfig: {
    public: {
      apiBase: 'https://imwelldev-app.online',
      siteUrl: 'https://saakian-watches.ru',
    },
  },
});
