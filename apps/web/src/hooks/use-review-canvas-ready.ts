'use client';

import { useEffect } from 'react';

import { MESSAGE_TYPES, broadcastMessageToParent } from '@/utils/message.ts';

export type ReviewCanvasType = 'list' | 'detail' | 'mypage' | 'edit' | 'delete' | 'craete';

const useReviewCanvasReady = (type: ReviewCanvasType) => {
  useEffect(() => {
    broadcastMessageToParent(MESSAGE_TYPES.READY, type);
  }, [type]);
};

export default useReviewCanvasReady;
