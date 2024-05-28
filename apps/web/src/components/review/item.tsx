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
      type: 'edit',
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
        className="relative"
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
        {/*eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions --
        This is intentional*/}
        <div
          className="absolute top-1 right-1 z-5"
          hidden={userID !== props.reviewerID}
          onClick={(evt) => {
            evt.stopPropagation();
          }}
        >
          <button
            className="border-b-2 border-gray-600/70 text-gray-700/90 mx-1"
            onClick={edit}
            type="button"
          >
            수정
          </button>
          <button
            className="border-b-2 border-gray-600/70 text-gray-700/90 mx-1"
            onClick={deleteReview}
            type="button"
          >
            삭제
          </button>
        </div>
        {props.replies.map((it) =>
          !it.deleted ? (
            <Reply
              key={it.replyId}
              reply={it}
            />
          ) : null,
        )}
      </div>
    </li>
  );
}
