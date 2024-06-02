'use client';
import { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import CloseButton from '@/components/close-button';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import type { CreateReplyItemRequest } from '@/services/api-types/review';
import { useReviewService } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  replyID: string;
};

export default function ReplyEditPage() {
  const [text, setText] = useState('');
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

  const updateReplyMutation = useMutation({
    mutationFn: async (replyID: number) => {
      await reviewService.updateReply(replyID, requestInfo);
    },
    onSuccess: () => {
      close();
    },
    onError: () => {
      throw new Error('수정에 실패했습니다');
    },
  });

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  if (!shop.connected) return <div>connecting...</div>;
  if (!replyDetailQuery.data) return <div>loading...</div>;

  const replyDetail = replyDetailQuery.data.data;
  const isReplyWrittenByLoginUser = typeof shop.userID === 'string' && replyDetail.memberId === shop.userID;
  if (!isReplyWrittenByLoginUser) notFound();

  const requestInfo: CreateReplyItemRequest = {
    mallId: shop.id,
    memberId: shop.userID,
    content: text,
  };

  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(evt.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateReplyMutation.mutate(replyDetail.replyId);
  };
  return (
    <div className="relative p-4 flex flex-col gap-8">
      <CloseButton onClose={close} />
      <form
        className="relative p-4 flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        {replyDetail.nickName ? (
          <div>
            작성자 <span>{replyDetail.nickName}</span>
          </div>
        ) : null}
        <textarea
          className="relative p-4 flex flex-col gap-8 border-2 overflow-hidden resize-none"
          defaultValue={replyDetail.content}
          onChange={handleChange}
          rows={3}
        />
        <button
          className="self-end"
          type="submit"
        >
          저장
        </button>
      </form>
    </div>
  );
}
