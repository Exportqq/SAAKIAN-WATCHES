import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const globalRouting = () => {
  const router = useRouter();
  const route = useRoute();

  const isMainActive = computed(() => route.path === '/');

  const isBasketPVZ = computed(() => route.path === '/Basket/PickUpDelivery');

  const isCatalogActive = computed(() => route.path === '/Catalog/Catalog');

  const redirectMain = () => {
    router.push('/');
  };

  const redirectDelivery = () => {
    router.push('/Basket/PickUpDelivery');
  };

  const redirectBasket = () => {
    router.push('/Basket');
  };

  const redirectCatalog = () => {
    router.push('/Catalog');
  };

  const redirectAboutUs = () => {
    router.push('/about-us');
  };

  const redirectProfile = () => {
    router.push('/Profile');
  };

  const redirectAuth = () => {
    router.push('/Auth');
  };

  const redirectHome = () => {
    router.push('/Home');
  };

  const redirectAdmin = () => {
    router.push('/Admin');
  };

  const redirectOrder = () => {
    router.push('/Profile/Orders');
  };

  const redirectDeliveryInfo = () => {
    router.push('/Home/components/Contacts/components/Delivery');
  };

  const redirectPrivacyPolicy = () => {
    router.push('/Home/components/Contacts/components/PrivacyPolicy');
  };

  const redirectReturnPolicy = () => {
    router.push('/Home/components/Contacts/components/ReturnPolicy');
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
