'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import { useReviewService } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  reviewID: string;
};

export default function ReviewDeletePage() {
  const params = useParams<PageParams>();
  const shop = useShop();
  useReviewCanvasReady('delete');
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
    sendMessageToShop(shop.domain, 'close-modal');
  };
  const handleAsync = () => {
        void deleteReview();
  };

  const deleteReview = async () => {
      try {
          await reviewService.delete(params?.reviewID);
      } catch (error) {
          throw new Error('삭제에 실패했습니다', error as ErrorOptions);
      }
      sendMessageToShop(shop.domain, 'refresh-page');
      sendMessageToShop(shop.domain, 'close-modal');
  };

  return (
    <main className="relative p-8 flex flex-col gap-8">
        <div className="">
            <p>삭제된 리뷰 정보는 다시 복구할 수 없습니다.</p>
            정말 <span className="text-red-500">삭제</span>하시겠습니까?
        </div>
        <div className="relative p-8 flex flex-row gap-8">
            <button
                className="text-red-500"
                onClick={handleAsync}
                type="button"
            >
                확인
            </button>
            <button
                onClick={close}
                type="button"
            >
                취소
            </button>
        </div>

    </main>
  );
}
