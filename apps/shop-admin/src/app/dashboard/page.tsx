/* eslint-disable @typescript-eslint/no-unsafe-assignment -- for react table cell props */
/* eslint-disable react/no-unstable-nested-components -- for react table cell props */
'use client';

import type { TableCellProps } from '@ui/components/table';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Checkbox, RadioGroup, SolidButton, Table } from '@ui/components';
import CheckboxGroup from '@ui/components/checkbox-group';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import tw, { styled } from 'twin.macro';

import {
  REVIEW_FILTER_OPTIONS_MAP,
  REVIEW_PERIOD_OPTIONS_MAP,
  REVIEW_REPLY_FILTER_OPTIONS_MAP,
  REVIEW_SCORE_OPTIONS_MAP,
} from '@/constants/review';
import useAuthCheck from '@/hooks/use-auth-check';
import { ReviewService } from '@/service/review';
import type { ReviewPageSizeType, ReviewPeriodType, ReviewReplyDataType } from '@/types/review';

function DashboardPage() {
  const router = useRouter();
  const defaultReviewFilters = REVIEW_FILTER_OPTIONS_MAP.map((option) => option.value);
  const defaultScores = REVIEW_SCORE_OPTIONS_MAP.map((option) => option.value);
  const defaultReviewReplyFilters = REVIEW_REPLY_FILTER_OPTIONS_MAP.map((option) => option.value);

  const [productId] = useState<number>(0);
  const [pageNumber] = useState<number>(1);
  const [pageSize] = useState<ReviewPageSizeType>(10);
  const [reviewPeriod, setReviewPeriod] = useState<ReviewPeriodType>('ALL');
  const [reviewFilters, setReviewFilters] = useState<string[]>(defaultReviewFilters);
  const [scores, setScores] = useState<string[]>(defaultScores);
  const [replyFilters, setReplyFilters] = useState<string[]>(defaultReviewReplyFilters);

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
      cell: ({ getValue }: TableCellProps) => {
        const initialValue = getValue();
        return initialValue ? <span>{initialValue} / 5</span> : null;
      },
    },
    {
      accessorKey: 'replies',
      header: '답변 개수',
      cell: ({ getValue }: TableCellProps) => {
        const repliesArr: ReviewReplyDataType[] | undefined = getValue();
        return repliesArr?.length ? <span>{repliesArr.length}개</span> : null;
      },
    },
    {
      accessorKey: 'deleted',
      header: '삭제 여부',
      cell: ({ getValue }: TableCellProps) => {
        const initialValue: boolean = getValue();
        return <span>{initialValue ? 'O' : 'X'}</span>;
      },
    },
    {
      accessorKey: 'createAt',
      header: '최초 작성 일시',
      cell: ({ getValue }: TableCellProps) => {
        const initialValue: string | undefined = getValue();
        return initialValue ? <span>{dayjs(initialValue).format('YYYY/MM/DD HH:mm')}</span> : null;
      },
    },
    {
      accessorKey: 'updatedAt',
      header: '최종 수정 일시',
      cell: ({ getValue }: TableCellProps) => {
        const initialValue: string | undefined = getValue();
        return initialValue ? <span>{dayjs(initialValue).format('YYYY/MM/DD HH:mm')}</span> : null;
      },
    },
  ];

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

  const getReviewList = async () => {
    try {
      const reviewList = await ReviewService.getProductReviewList({
        productId,
        page: pageNumber - 1,
        size: pageSize,
        period: reviewPeriod,
        reviewFilters,
        score: scores,
        replyFilters,
      });

      return reviewList;
    } catch (error) {
      // eslint-disable-next-line no-console -- track error
      console.error('리뷰 리스트 데이터 조회에 실패했습니다 : ', error);
      // eslint-disable-next-line no-alert -- required alert
      alert('일시적으로 데이터를 조회하지 못하고 있습니다. 잠시 후 다시 시도해 주세요.');
      router.push('/dashboard');
    }
  };

  const { data, isPending, refetch } = useQuery({
    queryKey: ['review-list'],
    queryFn: () => getReviewList(),
  });

  const pageCount = data?.total ? Math.ceil(data.total / pageSize) : 0;

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
              <FilterTableRowTitle>조회기간</FilterTableRowTitle>
              <FilterTableRowContent>
                <ReviewPeriodRadioGroup
                  value={reviewPeriod}
                  onChange={(_value) => {
                    setReviewPeriod(_value as ReviewPeriodType);
                  }}
                >
                  {REVIEW_PERIOD_OPTIONS_MAP.map((option) => {
                    return (
                      <ReviewPeriodRadioItem
                        key={option.value}
                        value={option.value}
                        isSelected={reviewPeriod === option.value}
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
                  tw="mr-8"
                  value="ALL"
                  isSelected={reviewFilters.length === defaultReviewFilters.length}
                  onChange={(isSelected) => {
                    setReviewFilters(isSelected ? defaultReviewFilters : []);
                  }}
                >
                  전체
                </Checkbox>

                <CheckboxGroup
                  tw="[& > label]:mr-8"
                  orientation="horizontal"
                  defaultValue={defaultReviewFilters}
                  value={reviewFilters}
                  onChange={handleReviewFiltersChange}
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
                  tw="mr-8"
                  value="ALL"
                  isSelected={scores.length === defaultScores.length}
                  onChange={(isSelected) => {
                    setScores(isSelected ? defaultScores : []);
                  }}
                >
                  전체
                </Checkbox>

                <CheckboxGroup
                  tw="[& > label]:mr-8"
                  orientation="horizontal"
                  defaultValue={defaultScores}
                  value={scores}
                  onChange={handleReviewScoresChange}
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
                  tw="mr-8"
                  value="ALL"
                  isSelected={replyFilters.length === defaultReviewReplyFilters.length}
                  onChange={(isSelected) => {
                    setReplyFilters(isSelected ? defaultReviewReplyFilters : []);
                  }}
                >
                  전체
                </Checkbox>

                <CheckboxGroup
                  tw="[& > label]:mr-8"
                  orientation="horizontal"
                  defaultValue={defaultReviewReplyFilters}
                  value={replyFilters}
                  onChange={handleReplyFiltersChange}
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
                  variant="primary"
                  size="sm"
                  onPress={() => {
                    void refetch();
                  }}
                >
                  검색하기
                </SolidButton>
                <SolidButton
                  variant="gray"
                  size="sm"
                  onPress={() => {
                    setReviewPeriod('ALL');
                    setReviewFilters(defaultReviewFilters);
                    setScores(defaultScores);
                    setReplyFilters(defaultReviewReplyFilters);

                    void refetch();
                  }}
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
                <Table
                  data={data?.content || []}
                  columns={columns}
                  pageSize={pageSize}
                  pageCount={pageCount}
                  activateSearchFilter
                />
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
  }

  .table-cell[data-column-id='reviewId'],
  .table-cell[data-column-id='score'],
  .table-cell[data-column-id='deleted'],
  .table-cell[data-column-id='createAt'],
  .table-cell[data-column-id='updatedAt'] {
    text-align: center;
  }

  .table-pagination {
    margin-top: 1.125rem;
    justify-content: center;
  }
`;
