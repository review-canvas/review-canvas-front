'use client';

import { useEffect, useState } from 'react';

import { notFound, useParams } from 'next/navigation';

import { ImageUploader } from '@/components/review/image-uploder';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import useShop from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

type PageParams = {
  productID: string;
  userID: string;
};

export default function MyReviewsPage() {
  useReviewCanvasReady('craete_review');
  const [content, setContent] = useState('');
  const [star, setStar] = useState(1);
  const shop = useShop();
  const params = useParams<PageParams>();

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto'; // 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]); // content가 변경될 때마다 실행

  if (!params?.userID) notFound();

  if (!shop.connected) return <div>connecting...</div>;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const close = () => {
    sendMessageToShop(shop.domain, 'close-modal');
  };

  return (
    <main className="relative">
      <div className="flex justify-center text-lg font-medium p-2">리뷰쓰기</div>
      
      <button
        className="absolute top-3 right-3"
        onClick={close}
        type="button"
      >
        <svg
          className="bi bi-x-lg"
          fill="black"
          height="24"
          viewBox="0 0 16 16"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </button>

      <BigStar
        setStar={setStar}
        star={star}
      />
      <div className="relative p-4 flex flex-col gap-8">
        <textarea
          className="relative p-4 flex flex-col gap-8 border-2 overflow-hidden resize-none"
          onChange={handleChange}
          placeholder="리뷰를 작성해주세요. (최소 10자 이상)"
          rows={6}
          value={content}
        />
      </div>
      <ImageUploader />
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
