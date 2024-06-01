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

export function Reply(props: ReplyItem) {
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
          background-color: ${style.backgroundColor};
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

export function ChatReply(props: ReplyItem) {
  const style = useReviewItemStyle();
  return (
    <li className="mr-5">
      <div
        className="w-fit"
        css={css`
          display: flex;
          margin-left: auto;
          font-size: 0.7rem;
        `}
      >
        작성자 <span>{props.nickname}</span>
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
            background-color: ${style.replyBackgroundColor};
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 8px;
          `,
        ]}
      >
        <p className="text-right">{props.content}</p>
      </div>
    </li>
  );
}
