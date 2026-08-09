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
      link: [
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
    },
  },
});
