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
});
</script>
