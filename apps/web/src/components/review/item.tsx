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
import { useReviewService } from '@/services/review.tsx';

interface ReviewItemProps {
  review: ReviewType;
}

export default function ReviewItem(props: ReviewItemProps) {
  const style = useReviewItemStyle();
  const { id, userID } = useConnectedShop();
  const message = useMessageToShop();
  const reviewService = useReviewService();

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

  style.reviewLike.buttonType = 'THUMB_UP';

  const onClickLikeButton = (event: SyntheticEvent) => {
    event.stopPropagation();
    if (props.review.isMine) {
      alert('자신의 리뷰에는 좋아요를 누를 수 없어요!');
      return;
    }
    let bSuccess = false;
    if (props.review.isLiked) {
      reviewService
        .deleteUserLike({
          reviewId: props.review.reviewId,
          mallId: id,
          memberId: userID,
        })
        .then((response) => (bSuccess = response.success));
    } else {
      reviewService
        .createUserLike({
          reviewId: props.review.reviewId,
          mallId: id,
          memberId: userID,
        })
        .then((response) => (bSuccess = response.success));
    }
    if (!bSuccess) {
      alert('다음에 다시 시도해주세요!');
    }
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
          {style.reviewLike.buttonType !== 'NONE' && (
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
              onClick={onClickLikeButton}
              type="button"
            >
              <ThumbUpIcon
                className="mt-1 mr-0.5"
                stroke={style.reviewLike.iconColor}
              />
              {style.reviewLike.buttonType === 'THUMB_UP_WITH_TEXT' && <div className="ml-1">좋아요</div>}
              <div className="ml-1">{props.review.likeCount}</div>
            </button>
          )}
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
