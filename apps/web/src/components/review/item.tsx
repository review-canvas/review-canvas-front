import { useState } from 'react';

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

import LoadingIcon from '@/assests/icon/icon-loading.svg';
import Reply from '@/components/reply/item';
import { Star } from '@/components/review/star';
import { useReviewItemStyle } from '@/contexts/style/review-item';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import type { ReviewItem as ReviewType } from '@/models/api-type';
import { useConnectedShop } from '@/state/shop';
import { MESSAGE_TYPES } from '@/utils/message';

interface ReviewItemProps {
  review: ReviewType;
  productName?: string;
}

export default function ReviewItem(props: ReviewItemProps) {
  const style = useReviewItemStyle();
  const { userID } = useConnectedShop();
  const message = useMessageToShop();

  const [isImageValid, setIsImageValid] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const ImageUrls = props.review.imageVideoUrls.reviewResizeImageUrls;
  const isReviewWrittenByLoginUser = userID === props.review.nickname;
  const maxRetries = 10;

  const handleImageError = () => {
    setRetryCount(retryCount + 1);
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setIsImageValid(true);
      }, 4000);
    } else {
      setIsImageValid(false);
    }
  };

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
      {props.review.deleted ? (
        <div
          aria-haspopup
          className="relative"
        >
          {props.productName ? <div className="pb-2">상품명 : {props.productName}</div> : null}
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
          {props.productName ? <div className="pb-2">상품명 : {props.productName}</div> : null}
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
          <div className="grid grid-cols-5 justify-center mx-10 items-center">
            {isImageValid ? (
              ImageUrls.map((imageUrl: string, index: number) => (
                <div
                  className="my-5"
                  key={index}
                >
                  <Image
                    alt={`upload-img-${index}`}
                    className="max-w-[60%] max-h-[60%] object-contain"
                    height={0}
                    onError={handleImageError}
                    src={imageUrl}
                    width={500}
                  />
                </div>
              ))
            ) : (
              <LoadingIcon />
            )}
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
