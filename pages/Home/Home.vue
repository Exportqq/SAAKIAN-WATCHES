<template>
  <div class="flex flex-col px-[100px] pt-[200px] max-md:px-[10px]">
    <Greetings />

    <div class="mt-[72px] max-md:mt-[60px]">
      <NewCollection />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Greetings from './components/Greetings.vue';
import NewCollection from './components/NewCollection.vue';
</script>

<style scoped></style>
