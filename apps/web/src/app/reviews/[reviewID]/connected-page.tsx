'use client';

import { Suspense, useEffect, useState } from 'react';

import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import CloseButton from '@/components/custom-button';
import Reply from '@/components/reply/item';
import ImageSlide from '@/components/review/image-slide';
import { Star } from '@/components/review/star';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item';
import { ReviewListStyleProvider } from '@/contexts/style/review-list';
import type { CreateReplyItemRequest, ReplyItem } from '@/services/api-types/review';
import { useDesignPropertyService } from '@/services/design-property';
import { useReviewService } from '@/services/review.tsx';
import useShop, { useConnectedShop } from '@/state/shop.ts';
import { isEnterKeyPressedWithoutShift } from '@/utils/keyboard';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message.ts';

interface ConnectedPageProps {
  reviewID: string;
}

export default function ReviewDetailPage({ reviewID }: ConnectedPageProps) {
  const { id, userID } = useConnectedShop();
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
    queryKey: ['review-detail', { requestId: reviewID, mallId: id, memberId: userID }],
    queryFn: () => reviewService.get({ requestId: reviewID, mallId: id, memberId: userID ? userID : undefined }),
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
    const handleMessage = (evt: { data: string }) => {
      if (evt.data === 'refresh') {
        void reviewDetailQuery.refetch();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(evt.target.value);
  };

  if (!shop.connected) return <div>connecting...</div>;
  if (!reviewDetailQuery.data) return <div>loading...</div>;

  const ReplyItemRequest: CreateReplyItemRequest = {
    mallId: id,
    memberId: userID,
    content,
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isEnterKeyPressedWithoutShift(event)) {
      event.preventDefault();
      submit();
    }
  };
  const submit = () => {
    if (content.length !== 0) createReplyMutation.mutate();
  };
  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };

  const reviewDetail = reviewDetailQuery.data.data;
  const isImage = reviewDetail.imageVideoUrls.reviewResizeImageUrls.length > 0;
  const layoutStyle = isImage ? 'grid grid-cols-2 h-full' : '';

  return (
    <main className="absolute top-0 left-0 w-full h-full">
      <CloseButton onClose={close} />
      <div className={layoutStyle}>
        <div className="relative justify-center bg-gray-100">
          <ImageSlide reviewResizeImageUrls={reviewDetail.imageVideoUrls.reviewResizeImageUrls} />
        </div>

        <div className="flex flex-col p-4">
          <div className="flex gap-0.5 m-2 items-center w-fit">
            <Star
              setStar={() => {}}
              size="small"
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
              <div className="absolute right-2 bottom-2 mr-4 border-2 border-gray-300/80 rounded-md z-10 items-center bg-violet-100/40">
                <button
                  className="text-sm px-3 py-1"
                  disabled={content.length === 0}
                  onClick={submit}
                  type="button"
                >
                  작성
                </button>
              </div>
            </div>
          ) : null}
          <div>
            <ReviewListStyleProvider
              value={designPropertyService.convertDesignPropertyResponseToReviewListStyle(designPropertyQuery.data)}
            >
              <ReviewItemStyleProvider
                value={designPropertyService.convertDesignPropertyToReviewItemStyle(designPropertyQuery.data)}
              >
                <Suspense fallback={<div>loading...</div>}>
                  <div className="mt-8">
                    {reviewDetail.replies.map((it: ReplyItem) => (
                      <Reply
                        isModal
                        key={it.replyId}
                        memberId={shop.userID}
                        reply={it}
                      />
                    ))}
                  </div>
                </Suspense>
              </ReviewItemStyleProvider>
            </ReviewListStyleProvider>
          </div>
        </div>
      </div>
    </main>
  );
}
