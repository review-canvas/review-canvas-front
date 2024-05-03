import { useEffect } from 'react';

import { broadcastMessageToParent } from '@/utils/message.ts';

const useReviewCanvasReady = (type: 'list' | 'detail') => {
  useEffect(() => {
    broadcastMessageToParent('ready', type);
  }, [type]);
};

export default useReviewCanvasReady;
