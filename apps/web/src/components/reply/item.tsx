import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
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
import type { CreateReplyItemRequest, ReplyItem } from '@/services/api-types/review';
import { useReviewService } from '@/services/review';
import { MESSAGE_TYPES } from '@/utils/message';

interface ReplyItemProps {
  reply: ReplyItem;
  isModal?: boolean;
  memberId?: string;
}

export default function Reply(props: ReplyItemProps) {
  const [editText, setEditText] = useState(false);
  const [content, setContent] = useState(props.reply.content);
  const style = useReviewItemStyle();
  const message = useMessageToShop();
  const reviewService = useReviewService();
  useEffect(() => {
    setContent(props.reply.content);
  }, [props.reply.content]);
  const updateReplyMutation = useMutation({
    mutationFn: async () => {
      await reviewService.updateReply(props.reply.replyId, request);
    },
    onSuccess: () => {
      close();
    },
    onError: () => {
      throw new Error('수정에 실패했습니다');
    },
  });

  const request: CreateReplyItemRequest = {
    content,
    mallId: props.reply.mallId,
    memberId: props.memberId,
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleKeyDown = (e: { key: string; shiftKey: any; preventDefault: () => void }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (content.length !== 0) submit();
    }
  };

  const submit = () => {
    updateReplyMutation.mutate();
    setEditText(false);
  };

  const edit = () => {
    if (props.isModal) {
      setEditText(true);
    } else {
      message(MESSAGE_TYPES.OPEN_MODAL, {
        type: 'edit',
        url: `/replies/${props.reply.replyId}/edit`,
      });
    }
  };

  const deleteReply = () => {
    message(MESSAGE_TYPES.OPEN_SELECTING_MODAL, {
      type: 'delete',
      url: `/replies/${props.reply.replyId}/delete`,
    });
  };

  const buttonForReply = (onClick: () => void) => {
    return (
      <div>
        <button
          className="border-b-2 border-gray-600/70 mx-1"
          onClick={onClick}
          type="button"
        >
          수정
        </button>
        <button
          className="border-b-2 border-gray-600/70 mx-1"
          onClick={deleteReply}
          type="button"
        >
          삭제
        </button>
      </div>
    );
  };

  const editingText = () => {
    return (
      <div className="flex text-left">
        <textarea
          className="border-2 border-gray-400/80 p-1 w-full resize-none"
          maxLength={500}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="댓글을 작성해주세요."
          rows={3}
          value={content}
        />
        <div
          className="absolute right-0 top-0 border-gray-600/70 text-gray-700/90"
          hidden={content.length === 0}
        >
          {buttonForReply(submit)}
        </div>
      </div>
    );
  };

  const showingText = () => {
    return (
      <div>
        <p className="text-left">{props.reply.deleted ? '삭제된 댓글입니다.' : content}</p>
        {!props.reply.deleted && props.reply.isMine ? (
          /*eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions --
This is intentional*/
          <div
            className="absolute top-2 right-1 text-gray-700/90 mt-1 z-5"
            onClick={(evt) => {
              evt.stopPropagation();
            }}
          >
            {buttonForReply(edit)}
          </div>
        ) : null}
      </div>
    );
  };

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
          <div className="w-fit mb-1">
            작성자 <span>{props.reply.nickname}</span>
          </div>
          <div>{editText ? editingText() : showingText()}</div>
        </div>
      </li>
    </ul>
  );
}
