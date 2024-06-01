'use client';

import { useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import tw, { styled } from 'twin.macro';

import CloseButton from '@/components/close-button';
import type { UploadImagesState } from '@/components/review/image-uploder';
import { ImageUploader } from '@/components/review/image-uploder';
import { Star } from '@/components/review/star';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import type { CreateReivewPathInfo, CreateReviewItemRequest } from '@/services/api-types/review';
import { useReviewService } from '@/services/review';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  productID: string;
};

export default function MyReviewsPage() {
  const [uploadImages, setUploadImages] = useState<UploadImagesState>({
    imageFiles: [],
    imageUrls: [],
  });
  const [content, setContent] = useState('');
  const [score, setScore] = useState(5);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const shop = useShop();
  const params = useParams<PageParams>();

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  useReviewCanvasReady('craete');
  const reviewService = useReviewService();
  const createReviewMutation = useMutation({
    mutationFn: async () => {
      await reviewService.create(pathInfo, ReviewItemRequest, uploadImages.imageFiles);
    },
    onSuccess: () => {
      close();
    },
    onError: () => {
      throw new Error('생성에 실패했습니다');
    },
  });

  if (!shop.connected) return <div>connecting...</div>;

  const pathInfo: CreateReivewPathInfo = {
    mallId: shop.id,
    productId: params?.productID,
  };

  const ReviewItemRequest: CreateReviewItemRequest = {
    content,
    score,
    memberId: shop.userID,
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const close = () => {
    sendMessageToShop(shop.domain, 'close-modal');
  };

  const submit = () => {
    if (content.length >= 10) {
      createReviewMutation.mutate();
    } else {
      textareaRef.current?.focus();
    }
  };

  return (
    <main className="relative">
      <div className="flex justify-center text-lg font-medium p-2">리뷰쓰기</div>
      <CloseButton onClose={close} />
      <div className="border-y-2">
        <div className="flex justify-center text-lg font-medium pt-8">상품이 마음에 드셨나요?</div>
        <div className="flex flex-row justify-center p-6">
          <Star
            setStar={setScore}
            size="big"
            star={score}
          />
        </div>
      </div>
      <div className="relative flex flex-col gap-8 px-4 pt-4">
        <textarea
          className="border-2 overflow-hidden resize-none"
          maxLength={2000}
          onChange={handleChange}
          placeholder=" 리뷰를 작성해주세요. (최소 10자 이상)"
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
      <div className="grid grid-cols-2 justify-center text-lg p-3 w-100% mb-4">
        <button
          className="border-2 border-gray-400/85 text-gray-400 p-2 m-2"
          onClick={close}
          type="button"
        >
          취소
        </button>
        <SumitButton
          isActive={content.length > 10}
          onClick={submit}
          type="button"
        >
          등록하기
        </SumitButton>
      </div>
    </main>
  );
}

export interface SubmitButtonProps {
  isActive: boolean;
}

const SumitButton = styled.button<SubmitButtonProps>`
  ${tw`m-2 p-2`}
  border: 2px solid ${({ isActive }) => (isActive ? '#5C6BC0' : '#9E9E9E')};
  background-color: ${({ isActive }) => (isActive ? '#1E88E5' : '#BEBEBE')};
  color: white;
`;
