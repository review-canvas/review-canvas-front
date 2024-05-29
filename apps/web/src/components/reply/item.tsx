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
import useMessageToShop from '@/hooks/use-message-to-shop';
import type { ReplyItem } from '@/services/api-types/review';
import { MESSAGE_TYPES } from '@/utils/message';

interface ReplyItemProps {
  reply: ReplyItem;
}

export default function Reply(props: ReplyItemProps) {
  const style = useReviewItemStyle();
  const message = useMessageToShop();

  const edit = () => {
    message(MESSAGE_TYPES.OPEN_MODAL, {
      type: 'edit',
      url: `/replies/${props.reply.replyId}/edit`,
    });
  };

  const deleteReply = () => {};

  return (
    <ul>
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
        <div className="relative">
          <div className="w-fit">
            작성자 <span>{props.reply.nickname}</span>
          </div>
          <p className="text-left">{props.reply.content}</p>
          {/*eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions --
        This is intentional*/}
          <div
            className="absolute top-2 right-1 z-5"
            hidden={props.reply.isMine}
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
              onClick={deleteReply}
              type="button"
            >
              삭제
            </button>
          </div>
        </div>
      </li>
    </ul>
  );
}
