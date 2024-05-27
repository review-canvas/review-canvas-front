'use client';

import { Suspense } from 'react';

import { notFound, useParams } from 'next/navigation';

import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import { ReviewServiceProvider } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';

import ConnectedPage from './connected-page.tsx';
import DisconnectedPage from './disconnected-page.tsx';

type PageParams = {
  reviewID: string;
};

export default function Page() {
  const params = useParams<PageParams>();
  if (!params?.reviewID) notFound();
  useReviewCanvasReady('detail');
  const shop = useShop();
  if (!shop.connected) return <DisconnectedPage />;

  return (
    <ReviewServiceProvider>
      <Suspense fallback={<div>loading...</div>}>
        <ConnectedPage reviewID={params.reviewID} />
      </Suspense>
    </ReviewServiceProvider>
  );
}
