import type { ReviewModalProps } from './review-modal-layout';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Select, SolidButton, TextArea } from '@ui/components';

import { ReviewService } from '@/service/review';
import { useOverlayAction } from '@/store/overlay';

import { Star } from '../review/star';

// eslint-disable-next-line import/no-cycle -- required
import ReviewDetailModal from './review-detail-modal';
import ReviewModal from './review-modal-layout';

function ReviewUpdateModal({ onClose, ...props }: ReviewModalProps) {
  const [score, setScore] = useState<number>(props.score);
  const [content, setContent] = useState<string>(props.content);

  const queryClient = useQueryClient();
  const { openOverlay, closeOverlay } = useOverlayAction();

  const handleSubmitButton = async () => {
    try {
      const isSuccess = await ReviewService.updateReview({
        reviewId: props.reviewId,
        review: {
          score,
          content,
        },
        reviewFiles: [],
      });

      if (isSuccess) {
        await queryClient.invalidateQueries({
          queryKey: ['review-list'],
        });
        // eslint-disable-next-line no-alert -- required
        alert('리뷰가 정상적으로 수정되었습니다');
        onClose();
      }
    } catch (error) {
      // eslint-disable-next-line no-alert -- required
      alert(error);
    }
  };

  return (
    <ReviewModal>
      <ReviewModal.Title>리뷰 수정</ReviewModal.Title>
      <ReviewModal.Caption>상품의 리뷰를 원하는 대로 수정할 수 있어요</ReviewModal.Caption>

      <ReviewModal.Table>
        <ReviewModal.Row>
          <ReviewModal.RowTitle>상품 선택</ReviewModal.RowTitle>
          <ReviewModal.RowContent>
            <Select
              selectedKey={props.productId}
              defaultSelectedKey={props.productId}
              tw="min-w-[300px] [& .react-aria-Button]:py-2"
            >
              <Select.Item
                key={props.productId}
                id={props.productId}
                style={SelectItemStyles}
              >
                {props.productName}
              </Select.Item>
            </Select>
          </ReviewModal.RowContent>
        </ReviewModal.Row>

        <ReviewModal.Row>
          <ReviewModal.RowTitle>별점 선택</ReviewModal.RowTitle>
          <ReviewModal.RowContent tw="h-full items-center">
            <Star
              star={score}
              setStar={setScore}
            />
          </ReviewModal.RowContent>
        </ReviewModal.Row>

        <ReviewModal.Row>
          <ReviewModal.RowTitle>내용 작성</ReviewModal.RowTitle>
          <ReviewModal.RowContent tw="w-full">
            <TextArea
              value={content}
              onChange={setContent}
              rows={6}
              placeholder="효과적인 리뷰를 위해 10자 이상 작성해 주세요"
              tw="w-full"
            />
          </ReviewModal.RowContent>
        </ReviewModal.Row>

        <ReviewModal.Footer>
          <div />
          <ReviewModal.FooterItem tw="gap-4">
            <SolidButton
              variant="gray"
              size="sm"
              onPress={() => {
                onClose();
                openOverlay(
                  'review-modal',
                  <ReviewDetailModal
                    {...props}
                    onClose={() => {
                      closeOverlay('review-modal');
                    }}
                  />,
                );
              }}
            >
              취소
            </SolidButton>
            <SolidButton
              variant="primary"
              size="sm"
              onPress={() => {
                void handleSubmitButton();
              }}
            >
              저장
            </SolidButton>
          </ReviewModal.FooterItem>
        </ReviewModal.Footer>
      </ReviewModal.Table>
    </ReviewModal>
  );
}

export default ReviewUpdateModal;

const SelectItemStyles = {
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  backgroundColor: '#FFFFFF',
};
