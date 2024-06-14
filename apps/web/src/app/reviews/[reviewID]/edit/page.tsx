'use client';

import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import CloseButton, { SumitButton } from '@/components/custom-button';
import { ImageUploader } from '@/components/review/image-uploder';
import { Star } from '@/components/review/star';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import type { ImageVideoUrl, PathInfo } from '@/services/api-types/review';
import { useReviewService } from '@/services/review.tsx';
import useShop from '@/state/shop.ts';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  reviewID: string;
};

export default function ReviewEditPage() {
  const params = useParams<PageParams>();
  const shop = useShop();
  const [uploadImages, setUploadImages] = useState<ImageVideoUrl>({
    reviewFileUrls: [],
    reviewResizeImageUrls: [],
  });
  const [content, setContent] = useState('');
  const [score, setScore] = useState(5);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useReviewCanvasReady('edit');
  const reviewService = useReviewService();

  const reviewDetailQuery = useQuery({
    queryKey: ['review-detail', { id: params?.reviewID, mallId: shop.id }],
    queryFn: () => reviewService.get({ requestId: params?.reviewID, mallId: shop.id }),
    enabled: Boolean(shop.connected && params?.reviewID),
  });

  const updateReviewMutation = useMutation({
    mutationFn: async () => {
      await reviewService.update(pathInfo, { content, score });
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
  }, [content]);

  if (!shop.connected) return <div>connecting...</div>;
  if (!reviewDetailQuery.data) return <div>loading...</div>;

  const reviewDetail = reviewDetailQuery.data.data;

  const isReviewWrittenByLoginUser = typeof shop.userID === 'string' && reviewDetail.nickname === shop.userID;
  if (!isReviewWrittenByLoginUser) notFound();

  const pathInfo: PathInfo = {
    requestId: params?.reviewID,
    mallId: shop.id,
    memberId: shop.userID,
  };
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const close = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.CLOSE_MODAL);
  };

  const submit = () => {
    updateReviewMutation.mutate();
  };

  return (
    <div className="relative p-4 flex flex-col">
      <CloseButton onClose={close} />
      <div className="flex gap-0.5 items-center w-fit">
        <Star
          setStar={setScore}
          size="small"
          star={score}
        />
      </div>
      <div className="relative flex flex-col gap-8 px-4 pt-4">
        <textarea
          className="border-2 overflow-hidden resize-none p-1"
          maxLength={2000}
          onChange={handleChange}
          placeholder="리뷰를 작성해주세요. 10자 이상 작성해주세요!"
          ref={textareaRef}
          rows={6}
          value={content}
        />
        <div className="absolute right-1 bottom-0 pr-4 text-gray-400">{content.length}/2000</div>
      </div>
      <div
        className="flex flex-row-reverse pr-4"
        hidden={content.length >= 10 || content.length === 0}
      >
        <div className="text-gray-500">*10자 이상 입력하시면 댓글 등록이 가능합니다!</div>
      </div>
      <ImageUploader
        setUploadImages={setUploadImages}
        uploadImages={uploadImages}
      />
      <div className="grid grid-cols-2 justify-center text-lg p-3 w-100%">
        <button
          className="border-2 border-gray-400/85 text-gray-400 p-2 m-2"
          onClick={close}
          type="button"
        >
          취소
        </button>
        <SumitButton
          isActive={content.length >= 10}
          onClick={submit}
          type="button"
        >
          등록하기
        </SumitButton>
      </div>
    </div>
  );
}
// export const SumitButton = styled.button<SubmitButtonProps>`
//   ${tw`m-2 p-2`}
//   border: 2px solid ${({ isActive }) => (isActive ? '#5C6BC0' : '#9E9E9E')};
//   background-color: ${({ isActive }) => (isActive ? '#1E88E5' : '#BEBEBE')};
//   color: white;
// `;
