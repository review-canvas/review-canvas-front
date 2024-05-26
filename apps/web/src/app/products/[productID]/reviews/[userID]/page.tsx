'use client';

import { notFound, useParams } from 'next/navigation';

import { ImageUploader } from '@/components/review/image-uploder';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  productID : string;
  userID: string;
};

export default function MyReviewsPage() {
  useReviewCanvasReady('craete_review');
  const shop = useShop();
  const params = useParams<PageParams>();
  if (!params?.userID) notFound();

  if (!shop.connected) return <div>connecting...</div>;

  const close = () => {
    sendMessageToShop(shop.domain, 'close-modal');
  };

  return (
    <main className="relative">
      <button
        className="absolute top-4 right-4"
        onClick={close}
        type="button"
      >
        X
      </button>
      <h1>My Reviews</h1>
      <p>Hello, {params.userID}!</p>
      <ImageUploader/>
      
    </main>
  );
}
