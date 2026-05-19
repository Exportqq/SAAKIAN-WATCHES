<template>
  <h1 class="font-extrabold text-[48px] max-md:text-[28px] h-[59px] max-md:h-[34px]">ПОПУЛЯРНОЕ</h1>

  <div class="grid grid-cols-4 max-md:grid-cols-2 gap-x-[5px] gap-y-[16px] w-full mt-[20px] max-md:mt-[10px]">
    <WatchCard v-for="i in 4" :key="i" />
  </div>
</template>

<script lang="ts" setup>
import WatchCard from '~/src/UI/WatchCard.vue';
</script>
