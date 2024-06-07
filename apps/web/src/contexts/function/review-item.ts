import { SyntheticEvent, useEffect, useState } from 'react';
import { useConnectedShop } from '@/state/shop.ts';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import { useReviewService } from '@/services/review.tsx';
import { useReviewItemStyle } from '@/contexts/style/review-item-style.ts';
import { MESSAGE_TYPES } from '@/utils/message.ts';
import type { ReviewItem as ReviewType } from '@/services/api-types/review.tsx';

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

  const isReviewWrittenByLoginUser = userID === props.review.nickname;

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

  const onClickLikeButton = async (event: SyntheticEvent) => {
    event.stopPropagation();
    if (props.review.isMine) {
      alert('자신의 리뷰에는 좋아요를 누를 수 없어요!');
      return;
    }
    let bSuccess = false;
    if (isLiked) {
      const response = await reviewService.deleteUserLike({
        reviewId: props.review.reviewId,
        mallId: id,
        memberId: userID,
      });
      bSuccess = response.success;
    } else {
      const response = await reviewService.createUserLike({
        reviewId: props.review.reviewId,
        mallId: id,
        memberId: userID,
      });
      bSuccess = response.success;
    }
    if (!bSuccess) {
      alert('다음에 다시 시도해주세요!');
    }
    reviewService.retrieveReviewLikeCount(props.review.reviewId).then((response) => {
      setLikeCount(response.data.count);
      setLiked(!isLiked);
    });
  };

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
