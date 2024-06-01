import React, { useState, useEffect } from 'react';

import { Star } from '@/components/review/star.tsx';
import type { ReviewItem } from '@/services/api-types/review.tsx';

interface TextformProps {
  reviewDetail: ReviewItem | null;
  submit: (content: string, star: number) => void;
}

export function Textform({ reviewDetail, submit }: TextformProps) {
  const [content, setContent] = useState('');
  const [star, setStar] = useState(0);

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(content, star);
  };

  useEffect(() => {
    if (reviewDetail?.nickname) {
      setStar(reviewDetail.score);
      setContent(reviewDetail.content);
    }
  }, []);

  return (
    <form
      className="relative p-4 flex flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-0.5 items-center w-fit">
        <Star
          setStar={setStar}
          size="small"
          star={star}
        />
      </div>
      {reviewDetail?.nickname ? (
        <div>
          작성자 <span>{reviewDetail.nickname}</span>
        </div>
      ) : null}
      <textarea
        className="relative p-4 flex flex-col gap-8 border-2 overflow-hidden resize-none"
        defaultValue={content}
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
