'use client';

import { Suspense } from 'react';

import { notFound, useParams } from 'next/navigation';

import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import DisconnectedPage from '@/pages/disconnected-page.tsx';
import { ReviewServiceProvider } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';

import ConnectedPage from './connected-page.tsx';

type PageParams = {
  reviewID: string;
};

export default function Page() {
  const params = useParams<PageParams>();
  const isCorrectPageParams = params?.reviewID;
  if (!isCorrectPageParams) notFound();

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
