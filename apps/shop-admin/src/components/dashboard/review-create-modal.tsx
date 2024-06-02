import ReviewModal from './review-modal-layout';

function ReviewCreateModal() {
  return (
    <ReviewModal>
      <ReviewModal.Title>리뷰 생성</ReviewModal.Title>
      <ReviewModal.Caption>상품의 리뷰를 직접 생성할 수 있어요</ReviewModal.Caption>

      <ReviewModal.Table>
        <ReviewModal.Row>상품</ReviewModal.Row>
      </ReviewModal.Table>
    </ReviewModal>
  );
}

export default ReviewCreateModal;
