'use client';

import { Suspense, useEffect, useState } from 'react';

import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import CloseButton from '@/components/close-button';
import Reply from '@/components/reply/item';
import { Star } from '@/components/review/star';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item';
import { ReviewListStyleProvider } from '@/contexts/style/review-list';
import type { CreateReplyItemRequest } from '@/services/api-types/review';
import { useDesignPropertyService } from '@/services/design-property';
import { useReviewService } from '@/services/review.tsx';
import useShop, { useConnectedShop } from '@/state/shop.ts';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message.ts';

interface ConnectedPageProps {
  reviewID: string;
}

export default function ReviewDetailPage({ reviewID }: ConnectedPageProps) {
  const { id } = useConnectedShop();
  const [content, setContent] = useState('');
  const shop = useShop();

  const reviewService = useReviewService();
  const designPropertyService = useDesignPropertyService();

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  const designPropertyQuery = useSuspenseQuery({
    queryKey: ['design-property', id],
    queryFn: () => designPropertyService.get(id),
  });

  const reviewDetailQuery = useQuery({
    queryKey: ['review-detail', { id: reviewID }],
    queryFn: () => reviewService.get(reviewID),
    enabled: Boolean(shop.connected && reviewID),
  });

  const createReplyMutation = useMutation({
    mutationFn: async () => {
      await reviewService.createReply(reviewID, ReplyItemRequest);
    },
    onSuccess: () => {
      void reviewDetailQuery.refetch();
    },
    onError: () => {
      throw new Error('생성에 실패했습니다');
    },
  });
  useEffect(() => {
    const handleMessager = (event: { data: string }) => {
      if (event.data === 'refresh') {
        void reviewDetailQuery.refetch();
      }
    };

    window.addEventListener('message', handleMessager);

    return () => {
      window.removeEventListener('message', handleMessager);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  if (!shop.connected) return <div>connecting...</div>;
  if (!reviewDetailQuery.data) return <div>loading...</div>;

  const ReplyItemRequest: CreateReplyItemRequest = {
    mallId: id,
    memberId: shop.userID,
    content,
  };
  const handleKeyDown = (e: { key: string; shiftKey: any; preventDefault: () => void }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 기본 Enter 키 이벤트를 막습니다.
      if (content.length !== 0) submit();
    }
  };
  const submit = () => {
    createReplyMutation.mutate();
  };
  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };

  const reviewDetail = reviewDetailQuery.data.data;

  return (
    <main className="relative p-4 ">
      <CloseButton close={close} />
      <div className="flex gap-0.5 m-2 items-center w-fit">
        <Star
          setStar={() => {}}
          star={reviewDetail.score}
        />
      </div>
      <div className="flex flex-col gap-2 m-2">
        <div>
          작성자 <span>{reviewDetail.nickname}</span>
        </div>
        <p>{reviewDetail.content}</p>
      </div>
      {shop.userID ? (
        <div className="relative flex flex-col gap-2 px-3 mt-8">
          <div>댓글</div>
          <textarea
            className="border-2 border-gray-400/80 p-1 overflow-hidden resize-none"
            maxLength={500}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="댓글을 작성해주세요."
            rows={3}
            value={content}
          />
          {content.length !== 0 ? (
            <div
              className="absolute right-2 bottom-2 mr-4 border-2 border-gray-300/80 rounded-md z-10 items-center bg-violet-100/40"
            >
              <button
                className="text-sm px-3 py-1"
                onClick={submit}
                type="button"
              >
                작성
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <ReviewListStyleProvider
        value={designPropertyService.convertDesignPropertyResponseToReviewListStyle(designPropertyQuery.data)}
      >
        <ReviewItemStyleProvider
          value={designPropertyService.convertDesignPropertyToReviewItemStyle(designPropertyQuery.data)}
        >
          <Suspense fallback={<div>loading...</div>}>
            <div className="mt-8">
              {reviewDetail.replies.map((it) =>
                !it.deleted ? (
                  <Reply
                    isModal
                    key={it.replyId}
                    memberId={shop.userID}
                    reply={it}
                  />
                ) : null,
              )}
            </div>
          </Suspense>
        </ReviewItemStyleProvider>
      </ReviewListStyleProvider>
    </main>
  );
}
