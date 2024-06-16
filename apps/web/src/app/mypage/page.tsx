'use client';

import { Suspense } from 'react';

import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import DisconnectedPage from '@/pages/disconnected-page.tsx';
import { ReviewServiceProvider } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';

import ConnectedPage from './connected-page';

export default function Page() {
  const shop = useShop();

  useReviewCanvasReady('mypage');

  if (!shop.connected) return <DisconnectedPage />;

  return (
    <ReviewServiceProvider>
      <Suspense fallback={<div>loading...</div>}>
        <ConnectedPage />
      </Suspense>
    </ReviewServiceProvider>
  );
}
