'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { Textform } from '@/components/review/textform.tsx';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import type { CreateReviewItemRequest } from '@/services/api-types/review';
import { useReviewService } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  reviewID: string;
};

export default function ReviewEditPage() {
  const params = useParams<PageParams>();
  const shop = useShop();

  useReviewCanvasReady('edit-review');
  const reviewService = useReviewService();

  const reviewDetailQuery = useQuery({
    queryKey: ['review-detail', { id: params?.reviewID }],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- controlled by react-query
    queryFn: () => reviewService.get(params!.reviewID),
    enabled: Boolean(shop.connected && params?.reviewID),
  });

  const updateReviewMutation = useMutation({
    mutationFn: async ({ content, score }: CreateReviewItemRequest) => {
      await reviewService.update(params?.reviewID, { content, score });
    },
    onSuccess: () => {
      refresh();
    },
    onError: () => {
      throw new Error('수정에 실패했습니다');
    },
  });

  if (!shop.connected) return <div>connecting...</div>;
  if (!reviewDetailQuery.data) return <div>loading...</div>;

  const reviewDetail = reviewDetailQuery.data.data;
  if (reviewDetail.nickname !== shop.userID) notFound();

  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };

  const refresh = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.REFRESH_PAGE);
  };

  const submit = (content: string, star: number) => {
    updateReviewMutation.mutate({ content, score : star });
  };

  return (
    <div className="relative p-4 flex flex-col gap-8">
      <button
        className="absolute top-4 right-4 z-10"
        onClick={close}
        type="button"
      >
        X
      </button>
      <Textform
        reviewDetail={reviewDetail}
        submit={submit}
      />
    </div>
  );
}
