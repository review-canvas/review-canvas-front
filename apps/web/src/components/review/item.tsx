import Image from 'next/image';
import { css } from 'twin.macro';

import {
  generateBorderCSS,
  generateBorderRadiusCSS,
  generateFontCSS,
  generateMarginCSS,
  generatePaddingCSS,
  generateShadowCSS,
} from '@review-canvas/theme';

import ThumbUpIcon from '@/assets/icon/icon-thumb-up.svg';
import { Star } from '@/components/review/star.tsx';
import { useReviewItemStyle } from '@/contexts/style/review-item.ts';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import type { ReviewItem as ReviewType } from '@/services/api-types/review';
import { useConnectedShop } from '@/state/shop.ts';
import { MESSAGE_TYPES } from '@/utils/message';

import Reply from '../reply/item';
import { SyntheticEvent } from 'react';

interface ReviewItemProps {
  review: ReviewType;
}

export default function ReviewItem(props: ReviewItemProps) {
  const style = useReviewItemStyle();
  const { userID } = useConnectedShop();
  const message = useMessageToShop();

  const isReviewWrittenByLoginUser = userID === props.review.nickname;
  const edit = () => {
    message(MESSAGE_TYPES.OPEN_MODAL, {
      type: 'edit',
      url: `/reviews/${props.review.reviewId}/edit`,
    });
  };

  const deleteReview = () => {
    message(MESSAGE_TYPES.OPEN_SELECTING_MODAL, {
      type: 'delete',
      url: `/reviews/${props.review.reviewId}/delete`,
    });
  };

  const showReviewDetail = () => {
    message(MESSAGE_TYPES.OPEN_MODAL, {
      type: 'detail',
      url: `/reviews/${props.review.reviewId}`,
    });
  };

  const createLike = (event: SyntheticEvent) => {
    event.stopPropagation();
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
          border-color: ${style.borderColor};
          background-color: ${style.backgroundColor};
          display: flex;
          flex-direction: column;
          gap: 8px;
        `,
      ]}
    >
      {props.review.deleted ? (
        <div
          aria-haspopup
          className="relative"
        >
          <div className="w-fit">
            작성자 <span>{props.review.nickname}</span>
          </div>
          <p className="text-left">삭제된 리뷰입니다.</p>
        </div>
      ) : (
        /* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- require */
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
              size="small"
              star={props.review.score}
            />
          </div>
          <div className="w-fit">
            작성자 <span>{props.review.nickname}</span>
          </div>
          <p className="text-left">{props.review.content}</p>
          <button
            css={[
              generateBorderRadiusCSS(style.reviewLike.buttonRound),
              css`
                border-width: 1px;
                padding: 2px 6px;
                margin-top: 15px;
                margin-bottom: 10px;
                border-color: ${style.reviewLike.buttonBorderColor};
                color: ${style.reviewLike.textColor};

                transition:
                  background-color 0.5s ease,
                  color 0.5s ease;
                display: flex;

                &:hover {
                  background-color: ${style.reviewLike.textColor};
                  color: white;
                }
              `,
            ]}
            onClick={createLike}
            type="button"
          >
            {/*<ThumbUpIcon />*/}
            <div className="ml-1">좋아요</div>
            <div className="ml-1">0</div>
          </button>
          {isReviewWrittenByLoginUser ? (
            /*eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions --
      This is intentional*/
            <div
              className="absolute top-1 right-1 z-5"
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
          ) : null}
          <div className="grid grid-cols-5 justify-center gap-8 mx-10">
            {props.review.imageVideoUrls.reviewResizeImageUrls.map((imageUrl: string, index: number) => (
              <div
                className="my-5"
                key={index}
              >
                <Image
                  alt={`upload-img-${index}`}
                  height={0}
                  src={imageUrl}
                  width={500}
                />
              </div>
            ))}
          </div>
          {props.review.replies.map((it) => (
            <Reply
              key={it.replyId}
              reply={it}
            />
          ))}
        </div>
      )}
    </li>
  );
}
