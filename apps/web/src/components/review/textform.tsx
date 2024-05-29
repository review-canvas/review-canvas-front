import React, { useState, useEffect } from 'react';

import { Star } from '@/components/review/star.tsx';

interface TextformProps {
  content: string;
  score?: number;
  nickname: string;
  submit: (content: string, star: number) => void;
}

export function Textform({ content, score, nickname, submit }: TextformProps) {
  const [text, setText] = useState(content);
  const [star, setStar] = useState(score || 5);

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(text, star);
  };

  return (
    <form
      className="relative p-4 flex flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-0.5 items-center w-fit">
        <Star
          setStar={setStar}
          star={star}
        />
      </div>
      {nickname ? (
        <div>
          작성자 <span>{nickname}</span>
        </div>
      ) : null}
      <textarea
        className="relative p-4 flex flex-col gap-8 border-2 overflow-hidden resize-none"
        defaultValue={text}
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
