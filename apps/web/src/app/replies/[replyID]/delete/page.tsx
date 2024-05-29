'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

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
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center p-8">
        <div className="relative text-center">
          <p>삭제된 댓글 정보는 다시 복구할 수 없습니다.</p>
          정말 <span className="text-red-500">삭제</span>하시겠습니까?
        </div>
        <div className="flex flex-row  p-4 gap-8 mt-4">
          <button
            className="text-red-500"
            onClick={deleteReply}
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
      </div>
    </main>
  );
}
