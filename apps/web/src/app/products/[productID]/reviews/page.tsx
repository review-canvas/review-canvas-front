'use client';

import { Suspense } from 'react';

import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import { ReviewServiceProvider } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';

import ConnectedPage from './connected-page.tsx';
import DisconnectedPage from './disconnected-page.tsx';

export default function Page() {
  const shop = useShop();

  useReviewCanvasReady('list');

  if (!shop.connected) return <DisconnectedPage />;

  return (
    <ReviewServiceProvider>
      <Suspense fallback={<div>loading...</div>}>
        <ConnectedPage productID="1" />
      </Suspense>
    </ReviewServiceProvider>
  );
}
