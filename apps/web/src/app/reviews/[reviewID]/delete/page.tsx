'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import DeleteConfirm from '@/components/delete-confrim';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready';
import type { PathInfo } from '@/models/api-type';
import { useReviewService } from '@/services/review';
import useShop from '@/state/shop';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message';

type PageParams = {
  reviewID: string;
};

export default function ReviewDeletePage() {
  const params = useParams<PageParams>();
  const shop = useShop();

  useReviewCanvasReady('delete');
  const reviewService = useReviewService();

  const deleteReviewMutation = useMutation({
    mutationFn: async () => {
      await reviewService.delete(pathInfo);
    },
    onSuccess: () => {
      close();
    },
    onError: () => {
      throw new Error('삭제에 실패했습니다');
    },
  });

  if (!shop.connected) return <div>connecting...</div>;

  const pathInfo: PathInfo = {
    requestId: params?.reviewID,
    mallId: shop.id,
    memberId: shop.userID,
  };

  const deleteReview = () => {
    deleteReviewMutation.mutate();
  };
  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };
  return (
    <DeleteConfirm
      deleteItem={deleteReview}
      onClose={close}
    />
  );
}
