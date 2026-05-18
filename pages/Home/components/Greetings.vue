<template>
  <div class="flex gap-[26px] flex-col">
    <h1
      class="h-[154px] w-[667px] text-[#000000] font-extrabold text-[72px] leading-[52px]"
    >
      Воплощение элегантности на вашем запястье
    </h1>
    <h1
      class="h-[29px] w-[535px] text-[#666666] font-medium text-[20px] leading-[15px]"
    >
      Откройте мир часов, созданных подчеркнуть ваш стиль и индивидуальность.
    </h1>
    <ButtonUI
      :text="'СДЕЛАТЬ ЗАКАЗ'"
      :max-width="false"
      :rounded="62"
      :paddingXMobile="58"
      :paddingYMobile="16"
      :paddingX="58"
      :paddingY="16"
    />
  </div>

  <div class="flex gap-[32px] mt-[48px]">
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      class="flex flex-col"
    >
      <h1 class="h-[49px] text-[#000000] font-semibold text-[40px]">200+</h1>
      <h2 class="h-[49px] text-[#666666] font-regular text-[16px]">БРЕНДОВ</h2>
    </div>
    <div class="bg-[#E5E5E5] w-[1px] h-[74px]"></div>
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      class="flex flex-col"
    >
      <h1 class="h-[49px] text-[#000000] font-semibold text-[40px]">1000+</h1>
      <h2 class="h-[49px] text-[#666666] font-regular text-[16px]">МОДЕЛЕЙ</h2>
    </div>
    <div class="bg-[#E5E5E5] w-[1px] h-[74px]"></div>
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      class="flex flex-col"
    >
      <h1 class="h-[49px] text-[#000000] font-semibold text-[40px]">33000+</h1>
      <h2 class="h-[49px] text-[#666666] font-regular text-[16px]">ОТЗЫВОВ</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonUI from "~/UI/ButtonUI.vue";
</script>

<style scoped></style>
