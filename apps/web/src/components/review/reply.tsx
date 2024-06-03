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
import type { ReplyItem } from '@/services/api-types/review';

export default function Reply(props: ReplyItem) {
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
        css`
          background-color: ${style.replyBackgroundColor};
          display: flex;
          flex-direction: column;
          gap: 8px;
        `,
      ]}
    >
      <div>
        <div className="w-fit">
          작성자 <span>{props.nickname}</span>
        </div>
        <p className="text-left">{props.content}</p>
      </div>
    </li>
  );
}
