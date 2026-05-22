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
    router.push('/Basket/Basket');
  };

  const redirectCatalog = () => {
    router.push('/Catalog/Catalog');
  };

  const redirectProfile = () => {
    router.push('/Profile/Profile');
  };

  const redirectAuth = () => {
    router.push('/Auth/Auth');
  };

  const redirectHome = () => {
    router.push('/Home/Home');
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
  };
};
