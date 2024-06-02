import type { ReviewModalProps } from './review-modal-layout';

import { useEffect, useState } from 'react';

import { Select, SolidButton, TextArea } from '@ui/components';

import { useProductList } from '@/hooks/use-product-list';

import { Star } from '../review/star';

import ReviewModal from './review-modal-layout';

type ReviewCreateModalProps = Pick<ReviewModalProps, 'onClose'>;

function ReviewCreateModal({ onClose }: ReviewCreateModalProps) {
  const [productId, setProductId] = useState<number>(0);
  const [score, setScore] = useState<number>(5);
  const [content, setContent] = useState<string>('');

  const { data: productListData, isLoading } = useProductList();

  useEffect(() => {
    if (productListData?.content && productListData.content.length > 0) {
      setProductId(productListData.content[0].productId);
    } else {
      // eslint-disable-next-line no-alert -- required
      alert('조회되는 상품이 존재하지 않습니다. 고객 센터에 문의해 주세요.');
      onClose();
    }
  }, [productListData]);

  return (
    <ReviewModal>
      <ReviewModal.Title>리뷰 생성</ReviewModal.Title>
      <ReviewModal.Caption>상품의 리뷰를 직접 생성할 수 있어요</ReviewModal.Caption>

      <ReviewModal.Table>
        {isLoading ? (
          <div>데이터를 불러 오는 중입니다</div>
        ) : (
          <>
            <ReviewModal.Row>
              <ReviewModal.RowTitle>상품 선택</ReviewModal.RowTitle>
              <ReviewModal.RowContent>
                <Select
                  selectedKey={productId}
                  defaultSelectedKey={productId}
                  onSelectionChange={(key) => {
                    setProductId(key as number);
                  }}
                  tw="min-w-[300px] [& .react-aria-Button]:py-2"
                >
                  {productListData?.content.map((_product) => {
                    return (
                      <Select.Item
                        key={_product.productId}
                        id={_product.productId}
                        style={SelectItemStyles}
                      >
                        {_product.productName}
                      </Select.Item>
                    );
                  })}
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
                >
                  취소
                </SolidButton>
                <SolidButton
                  variant="primary"
                  size="sm"
                >
                  저장
                </SolidButton>
              </ReviewModal.FooterItem>
            </ReviewModal.Footer>
          </>
        )}
      </ReviewModal.Table>
    </ReviewModal>
  );
}

export default ReviewCreateModal;

const SelectItemStyles = {
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  backgroundColor: '#FFFFFF',
};
