'use client';

import type { TableCellProps } from '@ui/components/table';

import { useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Checkbox, RadioGroup, Select, SolidButton, Table } from '@ui/components';
import CheckboxGroup from '@ui/components/checkbox-group';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import tw, { styled } from 'twin.macro';

import ReviewCreateModal from '@/components/dashboard/review-create-modal';
import ReviewDetailModal from '@/components/dashboard/review-detail-modal';
import {
  REVIEW_DASHBOARD_PAGE_SIZE,
  REVIEW_FILTER_OPTIONS_MAP,
  REVIEW_PERIOD_OPTIONS_MAP,
  REVIEW_REPLY_FILTER_OPTIONS_MAP,
  REVIEW_SCORE_OPTIONS_MAP,
} from '@/constants/review';
import useAuthCheck from '@/hooks/use-auth-check';
import { useProductList } from '@/hooks/use-product-list';
import { AuthService } from '@/service/auth';
import { type GetProductReviewListParam, ReviewService } from '@/service/review';
import { useOverlayAction } from '@/store/overlay';
import type { ReviewDataType, ReviewPageSizeType, ReviewPeriodType, ReviewReplyDataType } from '@/types/review';

function DashboardPage() {
  const router = useRouter();

  const [productId, setProductId] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<ReviewPageSizeType>(REVIEW_DASHBOARD_PAGE_SIZE[0]);
  const [reviewPeriod, setReviewPeriod] = useState<ReviewPeriodType>('ALL');
  const [reviewFilters, setReviewFilters] = useState<string[]>(defaultReviewFilters);
  const [scores, setScores] = useState<string[]>(defaultScores);
  const [replyFilters, setReplyFilters] = useState<string[]>(defaultReviewReplyFilters);

  const handleReviewFiltersChange = (newValues: string[]) => {
    if (newValues.includes('ALL')) {
      setReviewFilters(defaultReviewFilters);
    } else {
      setReviewFilters(newValues);
    }
  };

  const handleReviewScoresChange = (newValues: string[]) => {
    if (newValues.includes('ALL')) {
      setScores(defaultScores);
    } else {
      setScores(newValues);
    }
  };

  const handleReplyFiltersChange = (newValues: string[]) => {
    if (newValues.includes('ALL')) {
      setReplyFilters(defaultReviewReplyFilters);
    } else {
      setReplyFilters(newValues);
    }
  };

  useAuthCheck();

  const getReviewList = async (params: Readonly<GetProductReviewListParam>) => {
    try {
      return await ReviewService.getProductReviewList(params);
    } catch (error) {
      // eslint-disable-next-line no-console -- track error
      console.error('리뷰 리스트 데이터 조회에 실패했습니다 : ', error);

      const isAuthExist = await AuthService.checkAuth();
      if (isAuthExist) {
        // eslint-disable-next-line no-alert -- required alert
        alert('일시적으로 데이터를 조회하지 못하고 있습니다. 잠시 후 다시 시도해 주세요.');
        router.push('/dashboard');
      }
    }
  };

  const { data, isPending, refetch } = useQuery({
    queryKey: [
      'review-list',
      {
        productId,
        page: pageIndex,
        size: pageSize,
        period: reviewPeriod,
        reviewFilters,
        score: scores,
        replyFilters,
      },
    ] as const,
    queryFn: ({ queryKey }) => {
      return getReviewList(queryKey[1]);
    },
    placeholderData: keepPreviousData,
  });

  const pageCount = data?.total ? Math.ceil(data.total / pageSize) : 0;

  const { data: productListData } = useProductList();

  return (
    <div tw="flex flex-col gap-4 p-3">
      <div tw="flex flex-col gap-8">
        <div tw="flex flex-col gap-1">
          <Title>리뷰 데이터</Title>
          <Caption>원하는 설정값에 따라 리뷰를 조회하고 관리할 수 있어요</Caption>
        </div>

        <div tw="flex flex-col gap-4">
          <div tw="flex flex-col gap-4 px-8 py-6 bg-white rounded-md shadow-sm">
            <FilterTableRow>
              <FilterTableRowTitle>상품선택</FilterTableRowTitle>
              <FilterTableRowContent>
                <Select
                  selectedKey={productId}
                  defaultSelectedKey={productId}
                  onSelectionChange={(key) => {
                    setProductId(key as number);
                  }}
                  tw="min-w-[300px] [& .react-aria-Button]:py-2"
                >
                  <Select.Item
                    key={0}
                    id={0}
                    style={SelectItemStyles}
                  >
                    전체 상품
                  </Select.Item>
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
              </FilterTableRowContent>
            </FilterTableRow>

            <FilterTableRow>
              <FilterTableRowTitle>조회기간</FilterTableRowTitle>
              <FilterTableRowContent>
                <ReviewPeriodRadioGroup
                  onChange={(_value) => {
                    setReviewPeriod(_value as ReviewPeriodType);
                  }}
                  value={reviewPeriod}
                >
                  {REVIEW_PERIOD_OPTIONS_MAP.map((option) => {
                    return (
                      <ReviewPeriodRadioItem
                        isSelected={reviewPeriod === option.value}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </ReviewPeriodRadioItem>
                    );
                  })}
                </ReviewPeriodRadioGroup>
              </FilterTableRowContent>
            </FilterTableRow>

            <FilterTableRow>
              <FilterTableRowTitle>리뷰구분</FilterTableRowTitle>
              <FilterTableRowContent>
                <Checkbox
                  isSelected={reviewFilters.length === defaultReviewFilters.length}
                  onChange={(isSelected) => {
                    setReviewFilters(isSelected ? defaultReviewFilters : []);
                  }}
                  tw="mr-8"
                  value="ALL"
                >
                  전체
                </Checkbox>

                <CheckboxGroup
                  defaultValue={defaultReviewFilters}
                  onChange={handleReviewFiltersChange}
                  orientation="horizontal"
                  tw="[& > label]:mr-8"
                  value={reviewFilters}
                >
                  {REVIEW_FILTER_OPTIONS_MAP.map((option) => {
                    return (
                      <Checkbox
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
              </FilterTableRowContent>
            </FilterTableRow>

            <FilterTableRow>
              <FilterTableRowTitle>리뷰조건</FilterTableRowTitle>
              <FilterTableRowContent>
                <Checkbox
                  isSelected={scores.length === defaultScores.length}
                  onChange={(isSelected) => {
                    setScores(isSelected ? defaultScores : []);
                  }}
                  tw="mr-8"
                  value="ALL"
                >
                  전체
                </Checkbox>

                <CheckboxGroup
                  defaultValue={defaultScores}
                  onChange={handleReviewScoresChange}
                  orientation="horizontal"
                  tw="[& > label]:mr-8"
                  value={scores}
                >
                  {REVIEW_SCORE_OPTIONS_MAP.map((option) => {
                    return (
                      <Checkbox
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}점
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
              </FilterTableRowContent>
            </FilterTableRow>

            <FilterTableRow>
              <FilterTableRowTitle>답글여부</FilterTableRowTitle>
              <FilterTableRowContent>
                <Checkbox
                  isSelected={replyFilters.length === defaultReviewReplyFilters.length}
                  onChange={(isSelected) => {
                    setReplyFilters(isSelected ? defaultReviewReplyFilters : []);
                  }}
                  tw="mr-8"
                  value="ALL"
                >
                  전체
                </Checkbox>

                <CheckboxGroup
                  defaultValue={defaultReviewReplyFilters}
                  onChange={handleReplyFiltersChange}
                  orientation="horizontal"
                  tw="[& > label]:mr-8"
                  value={replyFilters}
                >
                  {REVIEW_REPLY_FILTER_OPTIONS_MAP.map((option) => {
                    return (
                      <Checkbox
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
              </FilterTableRowContent>
            </FilterTableRow>

            <FilterTableRow tw="mt-4">
              <FilterTableRowContent tw="gap-4">
                <SolidButton
                  className="review-control-button"
                  onPress={() => {
                    void refetch();
                  }}
                  size="sm"
                  variant="primary"
                >
                  검색하기
                </SolidButton>
                <SolidButton
                  onPress={() => {
                    setReviewPeriod('ALL');
                    setReviewFilters(defaultReviewFilters);
                    setScores(defaultScores);
                    setReplyFilters(defaultReviewReplyFilters);

                    void refetch();
                  }}
                  size="sm"
                  variant="gray"
                >
                  초기화
                </SolidButton>
              </FilterTableRowContent>
            </FilterTableRow>
          </div>

          <div tw="flex flex-col gap-4 px-8 py-6 bg-white rounded-md shadow-sm">
            {isPending ? (
              <div>Loading...</div>
            ) : (
              <TableContainer>
                {data?.content && data.content.length > 0 ? (
                  <>
                    <Table
                      activateSearchFilter
                      columns={columns}
                      data={data.content}
                      manualPagination
                      onPageIndexChange={setPageIndex}
                      pageCount={pageCount}
                      pageIndex={pageIndex}
                      pageSize={pageSize}
                    />

                    <div tw="flex justify-between items-center mt-4">
                      <div>
                        <ReviewCreateButton />
                      </div>

                      <div>
                        <Select
                          selectedKey={pageSize}
                          defaultSelectedKey={pageSize}
                          onSelectionChange={(key) => {
                            setPageSize(key as ReviewPageSizeType);
                          }}
                          tw="min-w-[110px] [& .react-aria-Button]:py-[8px]"
                        >
                          {REVIEW_DASHBOARD_PAGE_SIZE.map((_size) => {
                            return (
                              <Select.Item
                                key={_size}
                                id={_size}
                                style={SelectItemStyles}
                              >
                                {_size}개씩 보기
                              </Select.Item>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>조회되는 리뷰가 없습니다</div>
                )}
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

const Title = styled.div`
  ${tw`text-xl font-normal break-keep`}
`;

const Caption = styled.div`
  ${tw`text-sm text-stone-400 font-medium break-keep`}
`;

const FilterTableRow = styled.div`
  ${tw`flex gap-4`}
`;

const FilterTableRowTitle = styled.div`
  ${tw`inline-flex min-w-28 text-[#838383] text-base items-center`}
`;

const FilterTableRowContent = styled.div`
  ${tw`inline-flex`}
`;

const ReviewPeriodRadioGroup = styled(RadioGroup)`
  ${tw`gap-4`}

  .react-aria-Label {
    display: none;
  }
`;

const ReviewPeriodRadioItem = styled(RadioGroup.Item)<{ isSelected: boolean }>`
  ${tw`px-4 py-1 border-[1px] rounded-md`}

  ${({ isSelected }) =>
    isSelected ? tw`border-main-primary text-main-primary` : tw`border-sub-primary text-sub-primary`}

  svg {
    display: none;
  }
`;

const TableContainer = styled.div`
  .table-search {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1rem;
  }

  .table {
    thead tr th {
      padding: 10px 0;
    }

    .table-cell[data-column-id='reviewId'],
    .table-cell[data-column-id='score'],
    .table-cell[data-column-id='likeCount'],
    .table-cell[data-column-id='deleted'],
    .table-cell[data-column-id='replies'],
    .table-cell[data-column-id='createAt'],
    .table-cell[data-column-id='updatedAt'],
    .table-cell[data-column-id='control'] {
      text-align: center;
    }

    .review-control-button {
      width: 50px;
      margin: 0 auto;
    }
  }

  .table-pagination {
    margin-top: 1.125rem;
    justify-content: center;
  }
`;

const defaultReviewFilters = REVIEW_FILTER_OPTIONS_MAP.map((option) => option.value);
const defaultScores = REVIEW_SCORE_OPTIONS_MAP.map((option) => option.value);
const defaultReviewReplyFilters = REVIEW_REPLY_FILTER_OPTIONS_MAP.map((option) => option.value);

const columns = [
  {
    accessorKey: 'reviewId',
    header: '리뷰 No',
  },
  {
    accessorKey: 'content',
    header: '내용',
  },
  {
    accessorKey: 'nickname',
    header: '작성자',
  },
  {
    accessorKey: 'score',
    header: '점수',
    cell: ScoreCell,
  },
  {
    accessorKey: 'likeCount',
    header: '좋아요',
    cell: LikeCountCell,
  },
  {
    accessorKey: 'replies',
    header: '답변 개수',
    cell: ReplyCell,
  },
  {
    accessorKey: 'deleted',
    header: '삭제 여부',
    cell: DeleteStatusCell,
  },
  {
    accessorKey: 'updatedAt',
    header: '최종 수정 일시',
    cell: UpdatedAtCell,
  },
  {
    id: 'control',
    header: '리뷰 관리',
    cell: ReviewDetailCell,
  },
];

function ScoreCell({ cell }: TableCellProps<ReviewDataType, number>) {
  const initialValue = cell.getValue();
  return initialValue ? <span>{initialValue} / 5</span> : null;
}

function LikeCountCell({ cell }: TableCellProps<ReviewDataType, number>) {
  const initialValue = cell.getValue();
  return initialValue ? <span>{initialValue}개</span> : null;
}

function ReplyCell({ cell }: TableCellProps<ReviewDataType, ReviewReplyDataType[] | undefined>) {
  const repliesArr = cell.getValue();
  return repliesArr?.length ? <span>{repliesArr.length}개</span> : null;
}

function DeleteStatusCell({ cell }: TableCellProps<ReviewDataType, boolean>) {
  const initialValue = cell.getValue();
  return <span>{initialValue ? 'O' : 'X'}</span>;
}

function UpdatedAtCell({ cell }: TableCellProps<ReviewDataType, string | undefined>) {
  const initialValue = cell.getValue();
  return initialValue ? <span>{dayjs(initialValue).format('YYYY/MM/DD HH:mm')}</span> : null;
}

function ReviewDetailCell({ cell }: TableCellProps<ReviewDataType, any>) {
  const targetRowData = cell.row.original;
  const { openOverlay, closeOverlay } = useOverlayAction();

  return (
    <SolidButton
      className="review-control-button"
      onPress={() => {
        openOverlay(
          'review-detail',
          <ReviewDetailModal
            {...targetRowData}
            onClose={() => {
              closeOverlay('review-detail');
            }}
          />,
        );
      }}
      size="sm"
      variant="primary"
    >
      상세
    </SolidButton>
  );
}

function ReviewCreateButton() {
  const { openOverlay, closeOverlay } = useOverlayAction();

  return (
    <SolidButton
      size="sm"
      variant="primary"
      tw="bg-white text-main-primary border-main-primary border-[1px] rounded-md"
      onPress={() => {
        openOverlay(
          'review-create',
          <ReviewCreateModal
            onClose={() => {
              closeOverlay('review-create');
            }}
          />,
        );
      }}
    >
      리뷰 생성
    </SolidButton>
  );
}

const SelectItemStyles = {
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  backgroundColor: '#FFFFFF',
};
