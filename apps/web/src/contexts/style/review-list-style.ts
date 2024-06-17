import { createContext, useContext } from 'react';

import type { Border, Padding, Shadow } from '@review-canvas/theme';

import type { FocusAreaLayout, ReviewAreaLayout, ReviewLayoutDesign } from '@/models/design-property.ts';

export interface ReviewListStyle {
  bestReviewAreaActivation: boolean;
  reviewStatisticsAreaActivation: boolean;
  imageReviewAreaActivation: boolean;
  focusAreaLayout: FocusAreaLayout;
  imageReviewAreaLayout: ReviewAreaLayout;
  reviewLayoutDesign: ReviewLayoutDesign;
  orderSelectorStyle: 'dropdown' | 'radio';
  paginationStyle: 'page' | 'scroll';
  selectedOrderColor: string;
  padding: Padding;
  width: string;
  border: Border;
  borderColor: string;
  shadow: Shadow;
  shadowColor: string;
  backgroundColor: string;
}

const ReviewListStyleContext = createContext<ReviewListStyle | null>(null);
export const ReviewListStyleProvider = ReviewListStyleContext.Provider;
export const useReviewListStyle = () => {
  const style = useContext(ReviewListStyleContext);
  if (!style) {
    throw new Error('useReviewListStyle must be used within a ReviewListStyleProvider');
  }
  return style;
};
