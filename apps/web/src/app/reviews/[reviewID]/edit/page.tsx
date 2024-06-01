'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import CloseButton from '@/components/close-button';
import { Textform } from '@/components/review/textform.tsx';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import type { PathInfo, UpdateReviewItemRequest } from '@/services/api-types/review';
import { useReviewService } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  reviewID: string;
};

export default function ReviewEditPage() {
  const params = useParams<PageParams>();
  const shop = useShop();

  useReviewCanvasReady('edit');
  const reviewService = useReviewService();

  const reviewDetailQuery = useQuery({
    queryKey: ['review-detail', { id: params?.reviewID, mallId: shop.id }],
    queryFn: () => reviewService.get({ requestId: params?.reviewID, mallId: shop.id }),
    enabled: Boolean(shop.connected && params?.reviewID),
  });

  const updateReviewMutation = useMutation({
    mutationFn: async ({ content, score }: UpdateReviewItemRequest) => {
      await reviewService.update(pathInfo, { content, score });
    },
    onSuccess: () => {
      close();
    },
    onError: () => {
      throw new Error('수정에 실패했습니다');
    },
  });

  if (!shop.connected) return <div>connecting...</div>;
  if (!reviewDetailQuery.data) return <div>loading...</div>;

  const reviewDetail = reviewDetailQuery.data.data;
  if (reviewDetail.nickname !== shop.userID) notFound();

  const pathInfo: PathInfo = {
    requestId: params?.reviewID,
    mallId: shop.id,
    memberId: shop.userID,
  };

  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };

  const submit = (content: string, star: number) => {
    updateReviewMutation.mutate({ content, score: star });
  };

  return (
    <div className="relative p-4 flex flex-col gap-8">
      <CloseButton close={close} />
      <Textform
        content={reviewDetail.content}
        nickname={reviewDetail.nickname}
        score={reviewDetail.score}
        submit={submit}
      />
    </div>
  );
}
