import { useEffect } from 'react';

import useShopConnection from '@/state/connection.ts';

const useShopConnected = (type: 'list' | 'detail') => {
  const shopConnection = useShopConnection();
  useEffect(() => {
    if (!shopConnection.connected) return;
    window.parent.postMessage({ type: 'review-canvas-connected', payload: type }, shopConnection.domain);
  }, [shopConnection.connected, shopConnection.domain, type]);
};

export default useShopConnected;
