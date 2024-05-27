'use client';

import { notFound, useParams } from 'next/navigation';

import CloseButton from '@/components/close-button';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  userID: string;
};

export default function MyReviewsPage() {
  useReviewCanvasReady('mypage');
  const shop = useShop();
  const params = useParams<PageParams>();
  if (!params?.userID) notFound();

  if (!shop.connected) return <div>connecting...</div>;

  const close = () => {
    sendMessageToShop(shop.domain, 'close-modal');
  };

  return (
    <main className="relative">
      <CloseButton close={close}/>
      <h1>My Reviews</h1>
      <p>Hello, {params.userID}!</p>
    </main>
  );
}
