'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import DeleteConfirm from '@/components/delete-confrim';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import type { PathInfo } from '@/services/api-types/review';
import { useReviewService } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  replyID: string;
};

export default function ReplyDeletePage() {
  const params = useParams<PageParams>();
  const shop = useShop();

  useReviewCanvasReady('delete');
  const reviewService = useReviewService();

  const deleteReplyMutation = useMutation({
    mutationFn: async () => {
      await reviewService.deleteReply(pathInfo);
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
    requestId: params?.replyID,
    mallId: shop.id,
    memberId: shop.userID,
  };

  const deleteReply = () => {
    deleteReplyMutation.mutate();
  };
  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };

  return (
    <DeleteConfirm
      deleteItem={deleteReply}
      onClose={close}
    />
  );
}
