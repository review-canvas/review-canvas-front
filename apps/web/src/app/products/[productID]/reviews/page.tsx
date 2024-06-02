'use client';

import { Suspense } from 'react';

import { notFound, useParams } from 'next/navigation';

import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import DisconnectedPage from '@/pages/disconnected-page.tsx';
import { ReviewServiceProvider } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';

import ConnectedPage from './connected-page.tsx';

type PageParams = {
  productID: string;
};

export default function Page() {
  const params = useParams<PageParams>();
  const isCorrectPageParams = params?.productID;
  if (!isCorrectPageParams) notFound();

  const shop = useShop();

  useReviewCanvasReady('list');

  if (!shop.connected) return <DisconnectedPage />;

  return (
    <ReviewServiceProvider>
      <Suspense fallback={<div>loading...</div>}>
        <ConnectedPage productID={params.productID} />
      </Suspense>
    </ReviewServiceProvider>
  );
}
