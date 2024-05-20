'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { Star } from '@/components/review/star';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import { useReviewService } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  reviewID: string;
};

export default function ReviewDetailPage() {
  const params = useParams<PageParams>();
  const shop = useShop();
  useReviewCanvasReady('detail');
  const reviewService = useReviewService();

  const reviewDetailQuery = useQuery({
    queryKey: ['review-detail', { id: params?.reviewID }],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- controlled by react-query
    queryFn: () => reviewService.get(params!.reviewID),
    enabled: Boolean(shop.connected && params?.reviewID),
  });

  if (!shop.connected) return <div>connecting...</div>;
  if (!reviewDetailQuery.data) return <div>loading...</div>;

  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };

  const reviewDetail = reviewDetailQuery.data.data;

  return (
    <main className="relative p-4 flex flex-col gap-8">
      <button
        className="absolute top-4 right-4"
        onClick={close}
        type="button"
      >
        X
      </button>
      <div className="flex gap-0.5 items-center w-fit">
        <Star
          setStar={() => {}}
          star={reviewDetail.score}
        />
      </div>
      <div>
        작성자 <span>{reviewDetail.nickname}</span>
      </div>
      <p>{reviewDetail.content}</p>
    </main>
  );
}
