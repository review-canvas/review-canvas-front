'use client';

import { Suspense, useEffect, useState } from 'react';

import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import CloseButton from '@/components/close-button';
import Reply from '@/components/review/reply';
import { Star } from '@/components/review/star';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item';
import { ReviewListStyleProvider } from '@/contexts/style/review-list';
import { useDesignPropertyService } from '@/services/design-property';
import { useReviewService } from '@/services/review.tsx';
import useShop, { useConnectedShop } from '@/state/shop.ts';
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
    queryKey: ['review-detail', { id: reviewID }],
    queryFn: () => reviewService.get(reviewID),
    enabled: Boolean(shop.connected && reviewID),
  });

  const createReplyMutation = useMutation({
    mutationFn: async () => {
      await reviewService.createReply(reviewID, {
        mallId: id,
        memberId: '',// TODO memberID 받아오는 방법 찾아야함
        content,
      });
    },
    onSuccess: () => {
      close();
    },
    onError: () => {
      throw new Error('생성에 실패했습니다');
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  if (!shop.connected) return <div>connecting...</div>;
  if (!reviewDetailQuery.data) return <div>loading...</div>;
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
      {userID ? ( // TODO memberID로 조건문해야함
        <div className="relative flex flex-col gap-2 px-3 mt-8">
          <div>댓글</div>
          <textarea
            className="border-2 border-gray-400/80 p-1 overflow-hidden resize-none"
            maxLength={500}
            onChange={handleChange}
            placeholder="댓글을 작성해주세요."
            rows={3}
            value={content}
          />
          {content.length > 4 ? (
            <div className="absolute right-2 bottom-2 mr-4 border-2 border-gray-300/80 rounded-md z-10 items-center bg-violet-100/40">
              <button
                className="text-sm px-3 py-1"
                onClick={submit}
                type="button"
              >
                작성
              </button>
            </div>
          ) : (
            <p> </p>
          )}
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
              {/* <Reply
                content={'it.content'}
                createAt={'it.createAt'}
                deleted={false}
                nickname={'it.nickname'}
                replyId={2}
                updatedAt={'it.updatedAt'}
                userId={2}
              /> */}
              {reviewDetail.replies.length === 0
                ? reviewDetail.replies.map((it) => (
                    <Reply
                      content={it.content}
                      createAt={it.createAt}
                      deleted={it.deleted}
                      key={it.replyId}
                      nickname={it.nickname}
                      replyId={it.replyId}
                      updatedAt={it.updatedAt}
                      userId={it.userId}
                    />
                  ))
                : null}
            </div>
          </Suspense>
        </ReviewItemStyleProvider>
      </ReviewListStyleProvider>
    </main>
  );
}
