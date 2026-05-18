import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { BREAKPOINTS } from "../constants/breakpoints";

const { width, height } = useWindowSize();

const isDesktop = computed<boolean>((oldValue) =>
  oldValue === width.value >= BREAKPOINTS.DESKTOP
    ? oldValue
    : width.value >= BREAKPOINTS.DESKTOP,
);
const isTablet = computed<boolean>((oldValue) =>
  oldValue === (width.value >= BREAKPOINTS.TABLET && !isDesktop.value)
    ? oldValue
    : width.value >= BREAKPOINTS.TABLET && !isDesktop.value,
);
const isMobile = computed<boolean>((oldValue) =>
  oldValue === width.value < BREAKPOINTS.TABLET
    ? oldValue
    : width.value < BREAKPOINTS.TABLET,
);

export default function useWindowSizes() {
  return {
    isDesktop,
    isTablet,
    isMobile,
    windowWidth: width,
    windowHeight: height,
  };
}
