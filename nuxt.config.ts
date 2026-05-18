import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  css: ["~/assets/css/global.css", "aos/dist/aos.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  devtools: { enabled: true },

  plugins: [{ src: "~/plugins/aos", mode: "client" }],
});
