import tw, { styled } from 'twin.macro';

import ThumbUpIcon from '@/assets/icon/icon-thumb-up.svg';
import debounce from '@/lib/ui/debounce';
import { ReviewService } from '@/service/review';

interface ReviewLikeButtonProps {
  reviewId: number;
  isActive?: boolean;
}

function ReviewLikeButton({ reviewId, isActive = false, ...props }: ReviewLikeButtonProps) {
  const activeReviewLike = async () => {
    try {
      const isSuccess = await ReviewService.createReviewLike(reviewId);
      if (isSuccess) {
        // eslint-disable-next-line no-alert -- required
        alert('좋아요가 정상적으로 등록되었어요');
      } else {
        throw new Error('좋아요 등록이 이루어지지 않았어요');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert -- required
      alert(error);
    }
  };

  const cancelReviewLike = async () => {
    try {
      const isSuccess = await ReviewService.deleteReviewLike(reviewId);
      if (isSuccess) {
        // eslint-disable-next-line no-alert -- required
        alert('좋아요가 정상적으로 취소되었어요');
      } else {
        throw new Error('좋아요 취소가 이루어지지 않았어요');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert -- required
      alert(error);
    }
  };

  return (
    <StyledButton
      type="button"
      isActive={isActive}
      {...props}
      onClick={debounce(() => {
        void (isActive ? cancelReviewLike() : activeReviewLike());
      }, 200)}
    >
      <ThumbUpIcon />
      <span>{isActive ? '좋아요 취소' : '좋아요'}</span>
    </StyledButton>
  );
}

export default ReviewLikeButton;

const StyledButton = styled.button<{ isActive: boolean }>(({ isActive, theme }) => [
  tw`flex gap-2 items-center border-[1px] px-4 py-2 text-sm rounded-md`,
  isActive ? tw`border-main-primary bg-main-primary text-white` : tw`border-main-primary bg-white text-main-primary`,
  `
    & svg path {
      fill: ${isActive ? theme.colors.white : theme.colors.main.primary};
    }

    & span {
      color: ${isActive ? theme.colors.white : theme.colors.main.primary};  
    }
  `,
]);
