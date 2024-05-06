import { createContext, useContext } from 'react';

import { Shadow, type Border, type Padding } from '@review-canvas/theme';

export interface ReviewListStyle {
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

export const defaultReviewListStyle: ReviewListStyle = {
  orderSelectorStyle: 'radio',
  paginationStyle: 'page',
  selectedOrderColor: '#000000',
  padding: {
    top: '10px',
    right: '10px',
    bottom: '10px',
    left: '10px',
  },
  width: '100%',
  border: {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  },
  borderColor: '#ffffff',
  shadow: Shadow.NONE,
  shadowColor: 'transparent',
  backgroundColor: '#ffffff',
};

const ReviewListStyleContext = createContext<ReviewListStyle | null>(null);
export const ReviewListStyleProvider = ReviewListStyleContext.Provider;
export const useReviewListStyle = () => {
  const style = useContext(ReviewListStyleContext);
  if (!style) {
    throw new Error('useReviewListStyle must be used within a ReviewListStyleProvider');
  }
  return style;
};
