import { useEffect } from 'react';

import useShop from '@/state/shop.ts';

const useShopConnected = (type: 'list' | 'detail') => {
  const shop = useShop();
  useEffect(() => {
    if (!shop.connected) return;
    window.parent.postMessage({ type: 'review-canvas-connected', payload: type }, shop.domain);
  }, [shop.connected, shop.domain, type]);
};

export default useShopConnected;
