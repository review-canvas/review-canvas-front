import { useEffect } from 'react';

import useMessage from './use-message';

const useShopConnected = (type: 'list' | 'detail') => {
  const sendMessage = useMessage();

  useEffect(() => {
    sendMessage('review-canvas-connected', type);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional
  }, [type]);
};

export default useShopConnected;
