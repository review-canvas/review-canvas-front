'use client';

import { useParams } from 'next/navigation';

import useReviewCanvasReady, { ReviewCanvasType } from '@/hooks/use-review-canvas-ready.ts';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  reviewID: string;
};

export default function ReviewDetailPage() {
  const params = useParams<PageParams>();
  const shop = useShop();
  useReviewCanvasReady(ReviewCanvasType.Detail);

  if (!shop.connected) return null;

  const close = () => {
    sendMessageToShop(shop.domain, 'close-review-detail');
  };

  return (
    <main>
      <button
        onClick={close}
        type="button"
      >
        close
      </button>
      This is my review detail for {params?.reviewID}
    </main>
  );
}
