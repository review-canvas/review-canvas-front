import { useEffect, useState } from 'react';

import { useReviewItemStyle } from '@/contexts/style/review-item-style.ts';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import type { ReviewItem as ReviewType } from '@/models/api-type';
import { useReviewService } from '@/services/review.tsx';
import { useConnectedShop } from '@/state/shop.ts';
import { MESSAGE_TYPES } from '@/utils/message.ts';

interface ReviewItemProps {
  review: ReviewType;
}

export const useReviewItem = (props: ReviewItemProps) => {
  const style = useReviewItemStyle();
  const { id, userID } = useConnectedShop();
  const message = useMessageToShop();
  const reviewService = useReviewService();
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setLiked] = useState(false);

  useEffect(() => {
    reviewService.retrieveReviewLikeCount(props.review.reviewId).then((response) => {
      setLikeCount(response.data.count);
    });
    setLiked(props.review.isLiked);
  }, [props.review.reviewId, props.review.isLiked]);

  const edit = () => {
    message(MESSAGE_TYPES.OPEN_MODAL, {
      type: 'edit',
      url: `/reviews/${props.review.reviewId}/edit`,
    });
  };

  const deleteReview = () => {
    message(MESSAGE_TYPES.OPEN_SELECTING_MODAL, {
      type: 'delete',
      url: `/reviews/${props.review.reviewId}/delete`,
    });
  };

  const showReviewDetail = () => {
    message(MESSAGE_TYPES.OPEN_MODAL, {
      type: 'detail',
      url: `/reviews/${props.review.reviewId}`,
    });
  };

  const onClickLikeButton = async (event: MouseEvent) => {
    event.stopPropagation();
    if (props.review.isMine) {
      alert('자신의 리뷰에는 좋아요를 누를 수 없어요!');
      return;
    }
    let response;
    if (isLiked) {
      response = await reviewService.deleteUserLike({
        reviewId: props.review.reviewId,
        mallId: id,
        memberId: userID,
      });
    } else {
      response = await reviewService.createUserLike({
        reviewId: props.review.reviewId,
        mallId: id,
        memberId: userID,
      });
    }
    if (!response.success) {
      alert('다음에 다시 시도해주세요!');
    }
    reviewService.retrieveReviewLikeCount(props.review.reviewId).then((response) => {
      setLikeCount(response.data.count);
      setLiked(!isLiked);
    });
  };
  style.reviewLike.buttonType = 'THUMB_UP_WITH_TEXT';
  return {
    style,
    id,
    userID,
    message,
    reviewService,
    likeCount,
    setLikeCount,
    isLiked,
    setLiked,
    edit,
    deleteReview,
    showReviewDetail,
    onClickLikeButton,
  };
};
