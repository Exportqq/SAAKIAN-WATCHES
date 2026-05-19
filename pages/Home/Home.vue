<template>
  <DesktopHeader />

  <Greetings />

  <div class="flex flex-col px-[100px] max-md:px-[10px]">
    <div class="mt-[72px] max-md:mt-[60px]">
      <NewCollection />
    </div>

    <div class="mt-[72px] max-md:mt-[60px]">
      <PopularCollection />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DesktopHeader from '../Header/DesktopHeader.vue';
import Greetings from './components/Greetings.vue';
import NewCollection from './components/NewCollection.vue';
import PopularCollection from './components/PopularCollection.vue';
</script>

<style scoped></style>
