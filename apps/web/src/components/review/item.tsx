import { css } from 'twin.macro';

import {
  generateBorderCSS,
  generateBorderRadiusCSS,
  generateFontCSS,
  generateMarginCSS,
  generatePaddingCSS,
  generateShadowCSS,
} from '@review-canvas/theme';

import { useReviewItemStyle } from '@/contexts/style/review-item.ts';

interface ReviewItemProps {
  rate: number;
  content: string;
  reviewer: string;
}

export default function ReviewItem(props: ReviewItemProps) {
  const style = useReviewItemStyle();

  return (
    <li
      css={[
        generateMarginCSS(style.margin),
        generatePaddingCSS(style.padding),
        generateBorderCSS(style.border, style.borderColor),
        generateBorderRadiusCSS(style.borderRadius),
        generateFontCSS(style.font),
        generateShadowCSS(style.shadow, style.shadowColor),
      ]}
    >
      <div>
        <span>{props.rate}</span>
      </div>
      <div>
        <span>{props.content}</span>
      </div>
      <div>
        <span>{props.reviewer}</span>
      </div>
    </li>
  );
}
