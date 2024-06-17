import { createContext, useContext } from 'react';

import { css } from 'twin.macro';

import type { Border, BorderRadius, Font, Margin, Padding, ReviewLikeButtonProps, Shadow } from '@review-canvas/theme';

export interface ReviewItemStyle {
  margin: Margin;
  padding: Padding;
  font: Font;
  border: Border;
  borderColor: string;
  borderRadius: BorderRadius;
  shadow: Shadow;
  shadowColor: string;
  backgroundColor: string;
  replyBackgroundColor: string;
  reviewLike: ReviewLikeButtonProps;
}

const ReviewItemStyleContext = createContext<ReviewItemStyle | null>(null);

export const ReviewItemStyleProvider = ReviewItemStyleContext.Provider;
export const useReviewItemStyle = () => {
  const style = useContext(ReviewItemStyleContext);
  if (!style) {
    throw new Error('useReviewItemStyle must be used within a ReviewItemStyleProvider');
  }
  return style;
};

export const useReviewLikeButtonStyle = () => {
  const style = useReviewItemStyle();

  const baseButtonStyle = css`
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
  `;

  const likedButtonStyle = css`
    background-color: ${style.reviewLike.textColor};
    color: white;
    &:hover {
      background-color: white;
      color: ${style.reviewLike.textColor};
    }
  `;

  return { baseButtonStyle, likedButtonStyle };
};
