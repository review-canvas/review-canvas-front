import dayjs from 'dayjs';
import tw, { styled } from 'twin.macro';

import type { ReviewDataType } from '@/types/review';

export interface ReviewDetailModalProps extends ReviewDataType {
  onClose: () => void;
}

function ReviewDetailModal(props: ReviewDetailModalProps) {
  return (
    <div tw="flex flex-col gap-8 w-[80vw] max-w-[800px] max-h-[90vh] p-10 bg-white rounded-md overflow-y-auto">
      <div tw="flex flex-col gap-1">
        <Title>리뷰 상세 정보</Title>
        <Caption>리뷰와 관련해 자세하게 확인하고 수정 혹은 삭제할 수 있어요</Caption>
      </div>

      <div tw="flex flex-col gap-2">
        <Row>
          <RowTitle>상품</RowTitle>
          <RowContent>
            <span>{props.productName}</span>
            <span tw="ml-2 text-sub-primary">(상품 ID: {props.productId})</span>
          </RowContent>
        </Row>

        <Row>
          <RowTitle>리뷰 내용</RowTitle>
          <RowContent>{props.content}</RowContent>
        </Row>

        <Row>
          <RowTitle>리뷰 별점</RowTitle>
          <RowContent>{props.score}점</RowContent>
        </Row>

        <Row>
          <RowTitle>리뷰 작성자</RowTitle>
          <RowContent>{props.nickname}</RowContent>
        </Row>

        <Row>
          <RowTitle>리뷰 댓글</RowTitle>
          <RowContent tw="flex flex-col w-full overflow-y-auto max-h-[140px]">
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
          </RowContent>
        </Row>

        <Row>
          <RowTitle>리뷰 최초 작성 일시</RowTitle>
          <RowContent>{dayjs(props.createAt).format('YYYY/MM/DD HH:mm:ss')}</RowContent>
        </Row>

        <Row>
          <RowTitle>리뷰 최종 수정 일시</RowTitle>
          <RowContent>{dayjs(props.updatedAt).format('YYYY/MM/DD HH:mm:ss')}</RowContent>
        </Row>
      </div>
    </div>
  );
}

export default ReviewDetailModal;

const Title = styled.div`
  ${tw`text-xl font-normal break-keep`}
`;

const Caption = styled.div`
  ${tw`text-sm text-stone-400 font-medium break-keep`}
`;

const Row = styled.div`
  ${tw`flex gap-4 py-2 border-t-[1px] border-t-sub-primary`}
`;

const RowTitle = styled.div`
  ${tw`inline-flex min-w-28 text-[#838383] text-base items-center`}
`;

const RowContent = styled.div`
  ${tw`inline-flex`}
`;
