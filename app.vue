<template>
  <div>
    <noscript>
      <div><img src="https://mc.yandex.ru/watch/111433932" style="position: absolute; left: -9999px" alt="" /></div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
      />
    </noscript>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (title) => (title ? `${title} — Saakian Watches` : 'Saakian Watches — оригинальные наручные часы'),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Saakian Watches',
        url: 'https://saakian-watches.ru',
        logo: 'https://saakian-watches.ru/logo.webp',
        sameAs: ['https://t.me/lilexport'],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Saakian Watches',
        url: 'https://saakian-watches.ru',
      }),
    },
  ],
});
</script>
