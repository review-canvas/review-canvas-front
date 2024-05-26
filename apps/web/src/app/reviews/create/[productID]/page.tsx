'use client';

import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import CloseButton from '@/components/close-button';
import { ImageUploader } from '@/components/review/image-uploder';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import type { CreateReivewPathInfo } from '@/services/api-types/review';
import { useReviewService } from '@/services/review';
import useShop from '@/state/shop.ts';
import { MESSAGE_TYPES, sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  productId: string;
};

export default function MyReviewsPage() {
  const [content, setContent] = useState('');
  const [score, setScore] = useState(1);
  const shop = useShop();
  const params = useParams<PageParams>();

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  useReviewCanvasReady('craete_review');
  const reviewService = useReviewService();

  const createReviewMutation = useMutation({
    mutationFn: async () => {
      await reviewService.create(pathInfo, {
        content,
        score,
        memberId: '',
      });
    },
    onSuccess: () => {
      refresh();
      close();
    },
    onError: () => {
      throw new Error('생성에 실패했습니다');
    },
  });
  if (!shop.connected) return <div>connecting...</div>;

  const pathInfo: CreateReivewPathInfo = {
    mallId: shop.id,
    productId: params?.productId,
  };
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const close = () => {
    sendMessageToShop(shop.domain, 'close-modal');
  };
  const refresh = () => {
    sendMessageToShop(shop.domain, MESSAGE_TYPES.REFRESH_PAGE);
  };

  const submit = () => {
    if (content.length >= 10) {
      createReviewMutation.mutate();
    }
  };

  return (
    <main className="relative">
      <div className="flex justify-center text-lg font-medium p-2">리뷰쓰기</div>
      <CloseButton close={close} />
      <BigStar
        setStar={setScore}
        star={score}
      />
      <div className="relative flex flex-col gap-8 px-4 pt-4">
        <textarea
          className="border-2 overflow-hidden resize-none"
          maxLength={2000}
          onChange={handleChange}
          placeholder="리뷰를 작성해주세요. (최소 10자 이상)"
          rows={6}
          value={content}
        />
        <div className="absolute right-1 bottom-0 pr-4 text-gray-400">{content.length}/2000</div>
      </div>
      {content.length < 10 && content.length !== 0 ? (
        <div className="flex flex-row-reverse pr-4 text-xs text-gray-400">최소 10자 이상 입력해주세요!</div>
      ) : (
        <p> </p>
      )}
      <ImageUploader />

      <div className="grid grid-cols-2 justify-center text-lg font-medium place-content-around p-3 w-100% mb-4">
        <button
          className="border-2 border-gray-400/85 text-gray-400 p-2 m-2"
          onClick={close}
          type="button"
        >
          취소
        </button>
        <button
          className="border-2 border-indigo-500/60 text-white bg-blue-500 m-2"
          onClick={submit}
          type="button"
        >
          <div className="bg-blue-500 p-2">등록하기</div>
        </button>
      </div>
    </main>
  );
}

interface StarProps {
  star: number;
  setStar: (star: number) => void;
}

function BigStar({ star, setStar }: StarProps) {
  const StarArray = [1, 2, 3, 4, 5];

  return (
    <div className="border-y-2">
      <div className="flex justify-center text-lg font-medium pt-8">상품이 마음에 드셨나요?</div>
      <div className="flex flex-row justify-center p-6">
        {StarArray.map((it) => (
          <div key={it}>
            <button
              onClick={() => {
                setStar(it);
              }}
              type="button"
            >
              <svg
                fill="none"
                height="50"
                viewBox="0 0 16 16"
                width="50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.56795 14.943C3.18652 15.141 2.7537 14.794 2.83077 14.351L3.65096 9.62118L0.169623 6.26529C-0.155486 5.9513 0.0134919 5.37732 0.449276 5.31532L5.28935 4.61935L7.44752 0.29249C7.64219 -0.0974968 8.16888 -0.0974968 8.36355 0.29249L10.5217 4.61935L15.3618 5.31532C15.7976 5.37732 15.9666 5.9513 15.6405 6.26529L12.1601 9.62118L12.9803 14.351C13.0574 14.794 12.6246 15.141 12.2431 14.943L7.90405 12.6871L3.56795 14.943Z"
                  fill={it <= star ? '#FBB230' : '#E1E1E1'}
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
