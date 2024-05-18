'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import { useReviewService } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';
import {Textform} from "@/components/review/textform.tsx";

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

  if (!shop.connected) return <div>connecting...</div>;
  if (!reviewDetailQuery.data) return <div>loading...</div>;

  const reviewDetail = reviewDetailQuery.data.data;
  if (reviewDetail.nickname !== shop.userID) notFound();

  const close = () => {
    sendMessageToShop(shop.domain, 'close-modal');
  };

  const handleAsync = (content: string, star: number) => {
      void handleAsyncSubmit(content,star);
  };
    const handleAsyncSubmit = async (content: string, star: number) => {
        try {
            await reviewService.update(params?.reviewID, {content: content, score: star});
        } catch (error) {
            throw new Error('수정에 실패했습니다', error as ErrorOptions);
        }
        sendMessageToShop(shop.domain, 'refresh-page');
    };


  return (
    <div className="relative p-4 flex flex-col gap-8">
      <button
        className="absolute top-4 right-4 z-10"
        onClick={close}
        type="button"
      >
        X
      </button>
        <Textform reviewDetail={reviewDetail} handleAsync={handleAsync}/>
    </div>
  );
}
