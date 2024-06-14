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
import { useReviewLikeButtonStyle } from '@/contexts/style/review-item-style.ts';
import type { ReviewItem as ReviewType } from '@/services/api-types/review';

import { useReviewItem } from '@/contexts/function/review-item.ts';
import TalkStyleItem from '@/components/reply/talk-style-item.tsx';

interface ReviewItemProps {
  review: ReviewType;
}

export default function TalkStyleReviewItem(props: ReviewItemProps) {
  const { style, likeCount, isLiked, edit, deleteReview, showReviewDetail, onClickLikeButton } = useReviewItem(props);
  const { baseButtonStyle, likedButtonStyle } = useReviewLikeButtonStyle();

  return (
    <li>
      {props.review.deleted ? (
        <div
          aria-haspopup
          className="relative"
        >
          <div className="w-fit text-xs text-gray-500">
            작성자 <span>{props.review.nickname}</span>
          </div>
          <div
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
                width: 40%;
              `,
            ]}
          >
            <p className="text-left">삭제된 리뷰입니다.</p>
          </div>
        </div>
      ) : (
        /* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- require */
        <div>
          <div>
            <div className="flex gap-0.5 items-center w-fit">
              <Star
                setStar={() => {}}
                size="small"
                star={props.review.score}
              />
            </div>
            <div className="w-fit text-xs text-gray-500">
              작성자 <span>{props.review.nickname}</span>
            </div>
            <div
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
                  width: 40%;
                `,
              ]}
              aria-haspopup
              className="relative"
              onClick={showReviewDetail}
              onKeyUp={(evt) => {
                if (evt.key === 'Enter' || evt.key === 'Spacebar') showReviewDetail();
              }}
            >
              <p className={`text-left ${props.review.isMine ? 'mt-7' : ''}`}>{props.review.content}</p>
              {props.review.isMine ? (
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
              <div className="grid grid-cols-1 justify-center gap-8 mx-10">
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
            </div>
            <div>
              {style.reviewLike.buttonType !== 'NONE' && (
                <button
                  css={[
                    generateBorderRadiusCSS(style.reviewLike.buttonRound),
                    generateFontCSS(style.font),
                    baseButtonStyle,
                    isLiked && likedButtonStyle,
                    css`
                      margin-bottom: 15px;
                    `,
                  ]}
                  className="ml-2"
                  onClick={onClickLikeButton}
                  type="button"
                >
                  <ThumbUpIcon
                    className="mt-1 mr-0.5"
                    stroke={style.reviewLike.iconColor}
                  />
                  {style.reviewLike.buttonType === 'THUMB_UP_WITH_TEXT' && <div className="ml-1">좋아요</div>}
                  <div className="ml-1">{likeCount}</div>
                </button>
              )}
            </div>
          </div>
          {props.review.replies.map((it) => (
            <TalkStyleItem
              key={it.replyId}
              reply={it}
            />
          ))}
        </div>
      )}
    </li>
  );
}
