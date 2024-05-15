'use client';

import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import { useReviewService } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

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
  const [content, setContent] = useState('');
  const [star, setStar] = useState(0);

  if (!shop.connected) return <div>connecting...</div>;
  if (!reviewDetailQuery.data) return <div>loading...</div>;

  const reviewDetail = reviewDetailQuery.data.data;
  if (reviewDetail.nickname !== shop.userID) notFound();

  if (star === 0) setStar(reviewDetail.score);
  if (content === '') setContent(reviewDetail.content);
  const close = () => {
    sendMessageToShop(shop.domain, 'close-modal');
  };
  const handleChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
          await reviewService.update(params?.reviewID, {content: content, score: star});
      } catch (error) {
          throw new Error('수정에 실패했습니다', error as ErrorOptions);
      }
      sendMessageToShop(shop.domain, 'close-modal');
  };

  return (
    <form className="relative p-4 flex flex-col gap-8" onSubmit={handleSubmit}>
      <button
        className="absolute top-4 right-4"
        onClick={close}
        type="button"
      >
        X
      </button>
      <div className="flex gap-0.5 items-center w-fit">
        {[1, 2, 3, 4, 5].map((it) => (
          <Star
            active={it <= star}
            key={it}
            onClick={() => {
              setStar(it);
            }}
          />
        ))}
      </div>
      <div>
        작성자 <span>{reviewDetail.nickname}</span>
      </div>
      <textarea
        defaultValue={reviewDetail.content}
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
  );
}

function Star({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
    >
      <svg
        fill="none"
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.56795 14.943C3.18652 15.141 2.7537 14.794 2.83077 14.351L3.65096 9.62118L0.169623 6.26529C-0.155486 5.9513 0.0134919 5.37732 0.449276 5.31532L5.28935 4.61935L7.44752 0.29249C7.64219 -0.0974968 8.16888 -0.0974968 8.36355 0.29249L10.5217 4.61935L15.3618 5.31532C15.7976 5.37732 15.9666 5.9513 15.6405 6.26529L12.1601 9.62118L12.9803 14.351C13.0574 14.794 12.6246 15.141 12.2431 14.943L7.90405 12.6871L3.56795 14.943Z"
          fill={active ? '#FBB230' : '#E1E1E1'}
        />
      </svg>
    </button>
  );
}
