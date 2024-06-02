import type { ReviewModalProps } from './review-modal-layout';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { SolidButton } from '@ui/components';
import dayjs from 'dayjs';
import { styled } from 'twin.macro';

import { ReviewService } from '@/service/review';

import ReviewLikeButton from '../review/review-like-button';

import ReviewModal from './review-modal-layout';

function ReviewDetailModal(props: ReviewModalProps) {
  const [isLiked, setIsLiked] = useState<boolean>(props.isLiked);
  const queryClient = useQueryClient();

  const handlePressDeleteButton = async () => {
    try {
      const isSuccess = await ReviewService.deleteReview(props.reviewId);
      if (isSuccess) {
        // eslint-disable-next-line no-alert -- required
        alert('리뷰가 삭제되었습니다.');
        await queryClient.invalidateQueries({
          queryKey: ['review-list'],
        });

        props.onClose();
      } else {
        throw new Error('Fail With Business Logic Error');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert -- required
      alert('일시적으로 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      // eslint-disable-next-line no-console -- track
      console.error(error);
    }
  };

  return (
    <ReviewModal>
      <ReviewModal.Title>리뷰 상세 정보</ReviewModal.Title>
      <ReviewModal.Caption>리뷰와 관련해 자세하게 확인하고 수정 혹은 삭제할 수 있어요</ReviewModal.Caption>

      <ReviewModal.Table>
        <ReviewModal.Row>
          <ReviewModal.RowTitle>상품</ReviewModal.RowTitle>
          <ReviewModal.RowContent>
            <span>{props.productName}</span>
            <span tw="ml-2 text-sub-primary">(상품 ID: {props.productId})</span>
          </ReviewModal.RowContent>
        </ReviewModal.Row>

        <ReviewModal.Row>
          <ReviewModal.RowTitle>리뷰 내용</ReviewModal.RowTitle>
          <ReviewModal.RowContent>{props.content}</ReviewModal.RowContent>
        </ReviewModal.Row>

        <ReviewModal.Row>
          <ReviewModal.RowTitle>리뷰 별점</ReviewModal.RowTitle>
          <ReviewModal.RowContent>{props.score}점</ReviewModal.RowContent>
        </ReviewModal.Row>

        <ReviewModal.Row>
          <ReviewModal.RowTitle>리뷰 작성자</ReviewModal.RowTitle>
          <ReviewModal.RowContent>{props.nickname}</ReviewModal.RowContent>
        </ReviewModal.Row>

        <ReviewModal.Row>
          <ReviewModal.RowTitle>리뷰 댓글</ReviewModal.RowTitle>
          <ReplyContentContainer>
            {props.replies.length > 0
              ? props.replies.map((reply) => {
                  return (
                    <div
                      tw="flex flex-col py-2 border-b-[1px] border-b-sub-secondary text-sm"
                      key={reply.replyId}
                    >
                      <div tw="flex gap-2 py-1">
                        <div tw="w-[15%]">댓글 작성자</div>
                        <div>{reply.nickname}</div>
                      </div>

                      <div tw="flex gap-2 py-1">
                        <div tw="w-[15%]">댓글 내용</div>
                        <div>{reply.content}</div>
                      </div>

                      <div tw="flex gap-2 py-1">
                        <div tw="w-[15%]">댓글 작성 일시</div>
                        <div>{dayjs(reply.updatedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
                      </div>

                      <div tw="flex gap-2 py-1">
                        <div tw="w-[15%]">댓글 삭제 여부</div>
                        <div>{reply.deleted ? 'O' : 'X'}</div>
                      </div>
                    </div>
                  );
                })
              : null}
          </ReplyContentContainer>
        </ReviewModal.Row>

        <ReviewModal.Row>
          <ReviewModal.RowTitle>리뷰 최초 작성 일시</ReviewModal.RowTitle>
          <ReviewModal.RowContent>{dayjs(props.createAt).format('YYYY/MM/DD HH:mm:ss')}</ReviewModal.RowContent>
        </ReviewModal.Row>

        <ReviewModal.Row>
          <ReviewModal.RowTitle>리뷰 최종 수정 일시</ReviewModal.RowTitle>
          <ReviewModal.RowContent>{dayjs(props.updatedAt).format('YYYY/MM/DD HH:mm:ss')}</ReviewModal.RowContent>
        </ReviewModal.Row>
      </ReviewModal.Table>

      <ReviewModal.Footer>
        <ReviewModal.FooterItem>
          <ReviewLikeButton
            reviewId={props.reviewId}
            isActive={isLiked}
            onSuccess={() => {
              setIsLiked(!isLiked);
              void queryClient.invalidateQueries({
                queryKey: ['review-list'],
              });
            }}
          />
        </ReviewModal.FooterItem>

        <ReviewModal.FooterItem>
          <SolidButton
            variant="primary"
            size="sm"
            tw="bg-red-600"
            onPress={() => {
              void handlePressDeleteButton();
            }}
          >
            삭제
          </SolidButton>
        </ReviewModal.FooterItem>
      </ReviewModal.Footer>
    </ReviewModal>
  );
}

export default ReviewDetailModal;

const ReplyContentContainer = styled(ReviewModal.RowContent)`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  max-height: 140px;
`;
