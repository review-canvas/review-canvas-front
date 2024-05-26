import { css } from 'twin.macro';

import {
  generateBorderCSS,
  generateBorderRadiusCSS,
  generateFontCSS,
  generateMarginCSS,
  generatePaddingCSS,
  generateShadowCSS,
} from '@review-canvas/theme';

import { Star } from '@/components/review/star.tsx';
import { useReviewItemStyle } from '@/contexts/style/review-item.ts';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import type { ReplyItem } from '@/services/api-types/review';
import { useConnectedShop } from '@/state/shop.ts';
import { MESSAGE_TYPES } from '@/utils/message';

import Reply from './reply';

interface ReviewItemProps {
  id: number;
  rate: number;
  content: string;
  reviewerID: string;
  reviewer: string;
  replies: ReplyItem[];
}

export default function ReviewItem(props: ReviewItemProps) {
  const style = useReviewItemStyle();
  const { userID } = useConnectedShop();
  const message = useMessageToShop();

  const edit = () => {
    message(MESSAGE_TYPES.OPEN_MODAL, {
      type: 'edit_review',
      url: `/reviews/${props.id}/edit`,
    });
  };

  const deleteReview = () => {
    message(MESSAGE_TYPES.OPEN_SELECTING_MODAL, {
      type: 'delete',
      url: `/reviews/${props.id}/delete`,
    });
  };

  const showReviewDetail = () => {
    message(MESSAGE_TYPES.OPEN_MODAL, {
      type: 'detail',
      url: `/reviews/${props.id}`,
    });
  };

  return (
    <li
      css={[
        generateMarginCSS(style.margin),
        generatePaddingCSS(style.padding),
        generateBorderCSS(style.border, style.borderColor),
        generateBorderRadiusCSS(style.borderRadius),
        generateFontCSS(style.font),
        generateShadowCSS(style.shadow, style.shadowColor),
        css`
          background-color: ${style.backgroundColor};
          display: flex;
          flex-direction: column;
          gap: 8px;
        `,
      ]}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- require */}
      <div
        aria-haspopup
        onClick={showReviewDetail}
        onKeyUp={(evt) => {
          if (evt.key === 'Enter' || evt.key === 'Spacebar') showReviewDetail();
        }}
      >
        <div className="flex gap-0.5 items-center w-fit">
          <Star
            setStar={() => {}}
            star={props.rate}
          />
        </div>
        <div className="w-fit">
          작성자 <span>{props.reviewer}</span>
        </div>
        <p className="text-left">{props.content}</p>
        {userID === props.reviewerID ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- This is intentional
          <div
            className="flex gap-2"
            onClick={(evt) => {
              evt.stopPropagation();
            }}
          >
            <button
              onClick={edit}
              type="button"
            >
              수정
            </button>
            <button
              onClick={deleteReview}
              type="button"
            >
              삭제
            </button>
          </div>
        ) : null}
        {props.replies.length === 0
          ? props.replies.map((it) => (
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
    </li>
  );
}
