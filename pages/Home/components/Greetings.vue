<template>
  <div class="bg-[#F2F0F1] p-[100px] max-md:px-[10px] max-md:py-[40px]">
    <div class="flex max-md:gap-0 gap-[26px] flex-col">
      <h1
        class="max-md:w-[339px] max-md:h-[84px] h-[154px] w-[679px] text-[#000000] font-extrabold max-md:text-[32px] text-[72px] max-md:leading-[28px] leading-[52px]"
      >
        Воплощение элегантности на вашем запястье
      </h1>

      <p
        class="h-[29px] max-md:w-[344px] w-[535px] max-md:mt-[3px] text-[#666666] font-medium max-md:text-[14px] text-[20px] leading-[15px]"
      >
        Откройте мир часов, созданных подчеркнуть ваш стиль и индивидуальность.
      </p>

      <ButtonUI
        @click="redirectCatalog()"
        v-if="isDesktop"
        :text="'СДЕЛАТЬ ЗАКАЗ'"
        :max-width="false"
        :rounded="62"
        :paddingX="58"
        :paddingY="16"
      />

      <ButtonUI
        @click="redirectCatalog()"
        class="mt-[25px]"
        v-if="isMobile"
        :text="'СДЕЛАТЬ ЗАКАЗ'"
        :max-width="true"
        :rounded="62"
        :paddingYMobile="16"
      />
    </div>

    <div class="flex gap-[32px] max-md:mt-[26px] mt-[48px] max-md:justify-center">
      <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" class="flex flex-col">
        <h2 class="h-[49px] text-[#000000] font-semibold text-[40px] max-md:h-[29px] max-md:text-[24px]">200+</h2>

        <p class="text-[#666666] font-regular text-[16px] max-md:text-[12px]">БРЕНДОВ</p>
      </div>

      <div class="bg-[#E5E5E5] w-[1px] h-[74px]"></div>

      <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" class="flex flex-col">
        <h2 class="h-[49px] text-[#000000] font-semibold text-[40px] max-md:h-[29px] max-md:text-[24px]">1000+</h2>

        <p class="text-[#666666] font-regular text-[16px] max-md:text-[12px]">МОДЕЛЕЙ</p>
      </div>

      <div v-if="isDesktop" class="bg-[#E5E5E5] w-[1px] h-[74px]"></div>

      <div v-if="!isMobile" data-aos="fade-up" data-aos-anchor-placement="center-bottom" class="flex flex-col">
        <h2 class="h-[49px] text-[#000000] font-semibold text-[40px] max-md:h-[29px] max-md:text-[24px]">33000+</h2>

        <p class="text-[#666666] font-regular text-[16px] max-md:text-[12px]">ОТЗЫВОВ</p>
      </div>
    </div>

    <div class="flex justify-center">
      <div v-if="isMobile" data-aos="fade-up" data-aos-anchor-placement="center-bottom" class="flex flex-col">
        <h2 class="h-[49px] text-[#000000] font-semibold text-[40px] max-md:h-[29px] max-md:text-[24px]">33000+</h2>

        <p class="text-[#666666] font-regular text-[16px] max-md:text-[12px]">ОТЗЫВОВ</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { globalRouting } from '~/src/composables/globbal';
import useWindowSizes from '~/src/composables/window_size';
import ButtonUI from '~/src/UI/ButtonUI.vue';

const { isDesktop, isMobile } = useWindowSizes();
const { redirectCatalog } = globalRouting();

</script>

<style scoped></style>
