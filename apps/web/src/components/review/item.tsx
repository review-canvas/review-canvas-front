import {css} from 'twin.macro';

import {
    generateBorderCSS,
    generateBorderRadiusCSS,
    generateFontCSS,
    generateMarginCSS,
    generatePaddingCSS,
    generateShadowCSS,
} from '@review-canvas/theme';

import {Star} from '@/components/review/star.tsx';
import {useReviewItemStyle} from '@/contexts/style/review-item.ts';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import type {ReplyItem} from '@/services/api-types/review';
import {useConnectedShop} from '@/state/shop.ts';
import {MESSAGE_TYPES} from '@/utils/message';

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
    const {userID} = useConnectedShop();
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
                    border-color: ${style.borderColor};
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
                        setStar={() => {
                        }}
                        star={props.rate}
                    />
                </div>
                <div className="w-fit">
                    작성자 <span>{props.reviewer}</span>
                </div>
                <p className="text-left">{props.content}</p>
                {style.reviewLike.buttonType != 'NONE' ?
                    <button onClick={(evt) => {
                        evt.stopPropagation();
                        console.log("Like!");
                    }}
                            css={[
                                generateBorderRadiusCSS(style.reviewLike.buttonRound),
                                css`
                                    border-width: 1px;
                                    padding: 2px 6px;
                                    margin-top: 15px;
                                    margin-bottom: 10px;
                                    border-color: ${style.reviewLike.buttonBorderColor};
                                    color: ${style.reviewLike.textColor};
                                    transition: background-color 0.5s ease, color 0.5s ease;
                                    display: flex;

                                    &:hover {
                                        background-color: ${style.reviewLike.textColor};
                                        color: white;
                                    }
                                `
                            ]}>
                        <svg className='mt-1' width="13" height="13" viewBox="0 0 13 13" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.8828 4.06859C11.7684 3.93896 11.6278 3.83515 11.4702 3.76406C11.3126 3.69296 11.1416 3.65622 10.9688 3.65625H8.125V2.84375C8.125 2.30503 7.91099 1.78837 7.53006 1.40744C7.14913 1.02651 6.63247 0.8125 6.09375 0.8125C6.01828 0.812446 5.94428 0.833417 5.88006 0.873063C5.81584 0.912708 5.76393 0.969459 5.73016 1.03695L3.81164 4.875H1.625C1.40951 4.875 1.20285 4.9606 1.05048 5.11298C0.898102 5.26535 0.8125 5.47201 0.8125 5.6875V10.1562C0.8125 10.3717 0.898102 10.5784 1.05048 10.7308C1.20285 10.8831 1.40951 10.9688 1.625 10.9688H10.3594C10.6563 10.9689 10.943 10.8606 11.1658 10.6642C11.3885 10.4678 11.5319 10.1969 11.569 9.90234L12.1784 5.02734C12.2 4.85571 12.1848 4.68145 12.1338 4.51615C12.0829 4.35084 11.9973 4.19827 11.8828 4.06859ZM1.625 5.6875H3.65625V10.1562H1.625V5.6875ZM11.372 4.92578L10.7626 9.80078C10.7502 9.89898 10.7024 9.98928 10.6282 10.0547C10.5539 10.1202 10.4583 10.1563 10.3594 10.1562H4.46875V5.37723L6.33293 1.64836C6.60923 1.70366 6.85782 1.85299 7.03642 2.07093C7.21502 2.28888 7.31258 2.56197 7.3125 2.84375V4.0625C7.3125 4.17024 7.3553 4.27358 7.43149 4.34976C7.50767 4.42595 7.61101 4.46875 7.71875 4.46875H10.9688C11.0264 4.46873 11.0834 4.48098 11.1359 4.50469C11.1885 4.52839 11.2354 4.56301 11.2735 4.60624C11.3117 4.64947 11.3402 4.70032 11.3571 4.75541C11.3741 4.81051 11.3792 4.86858 11.372 4.92578Z"
                                fill={style.reviewLike.iconColor}/>
                        </svg>
                        {style.reviewLike.buttonType == 'THUMB_UP_WITH_TEXT' ?
                            <div className='ml-1'>좋아요!</div> : null
                        }
                        <div className='ml-1'>0</div>
                    </button>
                    : null
                }
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
                {props.replies.length !== 0
                    ? props.replies.map((it) =>
                        !it.deleted ? (
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
                        ) : null,
                    )
                    : null}
            </div>
        </li>
    );
}
