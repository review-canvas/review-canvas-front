import { createContext, useContext } from 'react';

import type { Border, BorderRadius, Font, Margin, Padding, ReviewLikeButtonProps, Shadow } from '@review-canvas/theme';
import { ReviewLike } from '@/models/design-property.ts';

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
