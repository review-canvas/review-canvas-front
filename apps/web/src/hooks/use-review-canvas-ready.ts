import { useEffect } from 'react';

import { broadcastMessageToParent } from '@/utils/message.ts';

export const enum ReviewCanvasType {
  List = 'list',
  Detail = 'detail',
  MyReviews = 'my-reviews',
}

const useReviewCanvasReady = (type: ReviewCanvasType) => {
  useEffect(() => {
    broadcastMessageToParent('ready', type);
  }, [type]);
};

export default useReviewCanvasReady;
