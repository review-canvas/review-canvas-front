import { createContext, useContext } from 'react';

import type { Border, BorderRadius, Font, Margin, Padding, Shadow } from '@review-canvas/theme';

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
}

export const defaultReviewItemStyle: ReviewItemStyle = {
  margin: {
    top: '10px',
    right: '0',
    bottom: '0',
    left: '0',
  },
  padding: {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  },
  font: {
    color: '#000000',
    size: '14px',
    weight: 'normal',
    name: 'noto-sans-kr',
  },
  border: {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  },
  borderColor: '#ffffff',
  borderRadius: {
    topLeft: '0',
    topRight: '0',
    bottomRight: '0',
    bottomLeft: '0',
  },
  shadow: 'none',
  shadowColor: 'transparent',
  backgroundColor: '#ffffff',
};

const ReviewItemStyleContext = createContext<ReviewItemStyle | null>(null);

export const ReviewItemStyleProvider = ReviewItemStyleContext.Provider;
export const useReviewItemStyle = () => {
  const style = useContext(ReviewItemStyleContext);
  if (!style) {
    throw new Error('useReviewItemStyle must be used within a ReviewItemStyleProvider');
  }
  return style;
};
