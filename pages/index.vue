<template>
  <Header />

  <Greetings />

  <div class="flex flex-col px-[100px] max-md:px-[10px]">
    <div class="mt-[72px] max-md:mt-[60px]">
      <PopularCollection />
    </div>

    <div class="mt-[72px] max-md:mt-[60px]">
      <NewCollection />
    </div>
  </div>

  <Contacts />
</template>

<script lang="ts" setup>
import Header from '~/src/components/Header.vue';
import Contacts from '~/src/components/home/Contacts.vue';
import Greetings from '~/src/components/home/Greetings.vue';
import NewCollection from '~/src/components/home/NewCollection.vue';
import PopularCollection from '~/src/components/home/PopularCollection.vue';
import { useCanonical } from '~/src/composables/useCanonical';

useCanonical('/');

useSeoMeta({
  title: 'Оригинальные наручные часы',
  description:
    'Saakian Watches — каталог оригинальных наручных часов с гарантией подлинности. Проверенные бренды, бесплатная доставка по всей России.',
  ogTitle: 'Saakian Watches — оригинальные наручные часы',
  ogDescription: 'Каталог оригинальных наручных часов с гарантией подлинности и бесплатной доставкой по России.',
  ogImage: 'https://saakian-watches.ru/logo.webp',
});
</script>

<style scoped></style>
