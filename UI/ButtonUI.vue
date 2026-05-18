<template>
  <button
    class="group relative overflow-hidden flex justify-center items-center gap-2 py-[20px] max-md:py-[16px] px-[42px] max-md:px-[10px] text-[20px] max-md:text-[16px] cursor-pointer font-medium disabled:cursor-not-allowed bg-black text-white border border-black transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] active:scale-[0.98]"
    :class="[fullWidth ? 'w-full' : 'w-fit']"
    :style="buttonStyles"
    :disabled="disabled"
  >
    <span
      class="absolute inset-0 translate-y-full bg-white/5 transition-transform duration-500 ease-out group-hover:translate-y-0"
    />

    <span class="relative z-10 flex items-center gap-2">
      <slot name="icon" />
      <span>{{ text }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, type CSSProperties } from "vue";

const props = defineProps<{
  text: string;
  rounded?: number;
  maxWidth?: boolean;
  disabled?: boolean;
  paddingY?: number;
  paddingX?: number;
  paddingYMobile?: number;
  paddingXMobile?: number;
  fontSize?: number;
  fontSizeMobile?: number;
}>();

const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

const fullWidth = computed(() => props.maxWidth ?? false);

const buttonStyles = computed(() => {
  const styles: CSSProperties = {};

  const yPadding =
    isMobile.value && props.paddingYMobile !== undefined
      ? props.paddingYMobile
      : props.paddingY;

  const xPadding =
    isMobile.value && props.paddingXMobile !== undefined
      ? props.paddingXMobile
      : props.paddingX;

  const fontSize =
    isMobile.value && props.fontSizeMobile !== undefined
      ? props.fontSizeMobile
      : props.fontSize;

  if (yPadding !== undefined) {
    styles.paddingTop = `${yPadding}px`;
    styles.paddingBottom = `${yPadding}px`;
  }

  if (xPadding !== undefined) {
    styles.paddingLeft = `${xPadding}px`;
    styles.paddingRight = `${xPadding}px`;
  }

  if (fontSize !== undefined) {
    styles.fontSize = `${fontSize}px`;
  }

  if (props.rounded !== undefined) {
    styles.borderRadius = `${props.rounded}px`;
  }

  styles.transition = "all 0.3s ease";
  styles.opacity = props.disabled ? "0.3" : "1";

  return styles;
});
</script>
