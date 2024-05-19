import React, {useState,useEffect} from "react";
import {Star} from "@/components/review/star.tsx";
import {ReviewItem} from '@/services/api-types/review.tsx';

export function Textform({ reviewDetail, handleAsync }:
                             { reviewDetail: ReviewItem | null; handleAsync: (content: string, star: number) => void }) {
    const [content, setContent] = useState('');
    const [star, setStar] = useState(0);

    const handleChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleAsync(content,star);
    };

    useEffect(() => {
        if (reviewDetail?.nickname) {
            setStar(reviewDetail.score);
            setContent(reviewDetail.content);
        }
    }, []);

    return (
        <form className="relative p-4 flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex gap-0.5 items-center w-fit">
                {[1, 2, 3, 4, 5].map((it) => (
                    <button
                        key={it}
                        type="button"
                        onClick={() => {
                            setStar(it);
                        }}>
                    <Star
                        active={it <= star}
                        key={it}
                    />
                    </button>
                ))}
            </div>
            {reviewDetail?.nickname ? (
                <div>
                    작성자 <span>{reviewDetail.nickname}</span>
                </div>
            ) : null}
            <textarea
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