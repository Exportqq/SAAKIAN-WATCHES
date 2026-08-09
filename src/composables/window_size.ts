import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { BREAKPOINTS } from "../constants/breakpoints";

// initialWidth/Height matter for SSR: without them vueuse defaults to Infinity,
// so the server always renders the desktop branch and mobile visitors get a
// full re-render (layout shift + wasted JS work) right after hydration.
const { width, height } = useWindowSize({ initialWidth: 390, initialHeight: 844 });

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
