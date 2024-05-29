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
  replyID: string;
};

export default function ReplyEditPage() {
  const params = useParams<PageParams>();
  const shop = useShop();

  useReviewCanvasReady('edit');
  const reviewService = useReviewService();

  const replyDetailQuery = useQuery({
    queryKey: ['reply-detail', { id: params?.replyID }],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- controlled by react-query
    queryFn: () => reviewService.getReply(params!.replyID),
    enabled: Boolean(shop.connected && params?.replyID),
  });

  const updateReviewMutation = useMutation({
    mutationFn: async ({ content, score }: UpdateReviewItemRequest) => {
      await reviewService.update(pathInfo, { content, score });
    },
    onSuccess: () => {
      refresh();
      close();
    },
    onError: () => {
      throw new Error('수정에 실패했습니다');
    },
  });

  if (!shop.connected) return <div>connecting...</div>;
  if (!replyDetailQuery.data) return <div>loading...</div>;

  const pathInfo: PathInfo = {
    requestId: params?.replyID,
    mallId: shop.id,
    memberId: shop.userID,
  };

  const replyDetail = replyDetailQuery.data.data;
  if (replyDetail.nickname !== shop.userID) notFound();

  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };

  const refresh = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.REFRESH_PAGE);
  };

  const submit = (content: string, star: number) => {
    updateReviewMutation.mutate({ content, score: star });
  };

  return (
    <div className="relative p-4 flex flex-col gap-8">
      <CloseButton close={close} />
      <Textform
        content={replyDetail.content}
        nickname={replyDetail.nickname}
        submit={submit}
      />
    </div>
  );
}
