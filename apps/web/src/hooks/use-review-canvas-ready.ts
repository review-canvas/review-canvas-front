'use client';

import { useEffect } from 'react';

import { broadcastMessageToParent } from '@/utils/message.ts';

export type ReviewCanvasType = 'list' | 'detail' | 'mypage' | 'edit-review' | 'delete';

const useReviewCanvasReady = (type: ReviewCanvasType) => {
  useEffect(() => {
    broadcastMessageToParent('ready', type);
  }, [type]);
};

export default useReviewCanvasReady;
