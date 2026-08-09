import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const globalRouting = () => {
  const router = useRouter();
  const route = useRoute();

  const isMainActive = computed(() => route.path === '/');

  const isBasketPVZ = computed(() => route.path === '/Basket/PickUpDelivery');

  const isCatalogActive = computed(() => route.path === '/catalog');

  const redirectMain = () => {
    router.push('/');
  };

  const redirectDelivery = () => {
    router.push('/basket/PickUpDelivery');
  };

  const redirectBasket = () => {
    router.push('/basket');
  };

  const redirectCatalog = () => {
    router.push('/catalog');
  };

  const redirectAboutUs = () => {
    router.push('/about-us');
  };

  const redirectProfile = () => {
    router.push('/profile');
  };

  const redirectAuth = () => {
    router.push('/auth');
  };

  const redirectHome = () => {
    router.push('/');
  };

  const redirectAdmin = () => {
    router.push('/Admin');
  };

  const redirectOrder = () => {
    router.push('/profile/orders');
  };

  const redirectDeliveryInfo = () => {
    router.push('/delivery');
  };

  const redirectPrivacyPolicy = () => {
    router.push('/privacy-policy');
  };

  const redirectReturnPolicy = () => {
    router.push('/return-policy');
  };

  return {
    isMainActive,
    isBasketPVZ,
    isCatalogActive,

    redirectMain,
    redirectDelivery,
    redirectCatalog,
    redirectProfile,
    redirectAuth,
    redirectBasket,
    redirectHome,
    redirectAdmin,
    redirectOrder,
    redirectDeliveryInfo,
    redirectPrivacyPolicy,
    redirectReturnPolicy,
    redirectAboutUs,
  };
};
