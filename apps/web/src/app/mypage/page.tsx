'use client';

import { Suspense } from 'react';

import useReviewCanvasReady from '@/hooks/use-review-canvas-ready';
import DisconnectedPage from '@/pages/disconnected-page';
import { ReviewServiceProvider } from '@/services/review';
import useShop from '@/state/shop';

import ConnectedPage from './connected-page';

export default function Page() {
  const shop = useShop();

  useReviewCanvasReady('list');

  if (!shop.connected) return <DisconnectedPage />;

  return (
    <ReviewServiceProvider>
      <Suspense fallback={<div>loading...</div>}>
        <ConnectedPage />
      </Suspense>
    </ReviewServiceProvider>
  );
}
