'use client';

import type { TableCellProps } from '@ui/components/table';

import { useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Select } from '@ui/components';
import Table from '@ui/components/table';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import tw, { styled } from 'twin.macro';

import { SHOP_DASHBOARD_PAGE_SIZE } from '@/constants/shop';
import useAuthCheck from '@/hooks/use-auth-check';
import { AuthService } from '@/service/auth';
import type { GetShopListParam } from '@/service/shop';
import { ShopService } from '@/service/shop';
import type { ShopDataType, ShopPageSizeType } from '@/types/shop';

function DashboardPage() {
  const router = useRouter();

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<ShopPageSizeType>(SHOP_DASHBOARD_PAGE_SIZE[0]);

  useAuthCheck();

  const getShopList = async (params: Readonly<GetShopListParam>) => {
    try {
      return await ShopService.getShopList(params);
    } catch (error) {
      // eslint-disable-next-line no-console -- track error
      console.error('리뷰캔버스 가입 Shop List 조회에 실패했습니다 : ', error);

      const isAuthExist = await AuthService.checkAuth();
      if (isAuthExist) {
        // eslint-disable-next-line no-alert -- required alert
        alert('일시적으로 데이터를 조회하지 못하고 있습니다. 잠시 후 다시 시도해 주세요.');
        router.push('/dashboard');
      }
    }
  };

  const { data, isPending } = useQuery({
    queryKey: [
      'shop-list',
      {
        page: pageIndex,
        size: pageSize,
      },
    ] as const,
    queryFn: ({ queryKey }) => {
      return getShopList(queryKey[1]);
    },
    placeholderData: keepPreviousData,
  });

  const pageCount = data?.total ? Math.ceil(data.total / pageSize) : 0;

  return (
    <div tw="flex flex-col gap-4 p-3">
      <div tw="flex flex-col gap-8">
        <div tw="flex flex-col gap-1">
          <Title>리뷰캔버스 가입 샵 리스트</Title>
          <Caption>리뷰캔버스에 가입되어 있는 모든 샵의 정보를 확인할 수 있어요</Caption>
        </div>

        <div tw="flex flex-col gap-4">
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
                      <div></div>
                      <div>
                        <Select
                          selectedKey={pageSize}
                          defaultSelectedKey={pageSize}
                          onSelectionChange={(key) => {
                            setPageSize(key as ShopPageSizeType);
                          }}
                          tw="min-w-[110px] [& .react-aria-Button]:py-[8px]"
                        >
                          {SHOP_DASHBOARD_PAGE_SIZE.map((_size) => {
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
                  <div>조회되는 Shop List가 없습니다</div>
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

    .table-cell[data-column-id='mallId'],
    .table-cell[data-column-id='createAt'],
    .table-cell[data-column-id='reviewsAmount'],
    .table-cell[data-column-id='approveStatus'],
    .table-cell[data-column-id='reviewLayoutDesign'],
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

const columns = [
  {
    accessorKey: 'mallId',
    header: 'Shop No',
  },
  {
    accessorKey: 'mallName',
    header: 'Shop 이름',
  },
  {
    accessorKey: 'mallNumber',
    header: '사업자 등록 번호',
  },
  {
    accessorKey: 'reviewsAmount',
    header: '등록된 리뷰 개수',
    cell: ReviewsAmountCell,
  },
  {
    accessorKey: 'reviewLayoutDesign',
    header: '게시판 디자인 유형',
    cell: ReviewLayoutDesignCell,
  },
  {
    accessorKey: 'approveStatus',
    header: '리뷰 승인 게시 여부',
    cell: ApproveStatusCell,
  },
  {
    accessorKey: 'createdAt',
    header: 'Shop 생성 일시',
    cell: CreatedAtCell,
  },
  // {
  //   id: 'control',
  //   header: '리뷰 관리',
  //   cell: ReviewDetailCell,
  // },
];

function ReviewsAmountCell({ cell }: TableCellProps<ShopDataType, number>) {
  const initialValue = cell.getValue() || 0;
  return <span>{initialValue}개</span>;
}

function ReviewLayoutDesignCell({ cell }: TableCellProps<ShopDataType, string>) {
  const initialValue = cell.getValue();
  const convertedValue = (value?: string) => {
    switch (value) {
      case 'BOARD':
        return '게시판형';

      case 'CARD':
        return '카드형';

      case 'TALK':
        return '채팅형';

      default:
        return null;
    }
  };
  return initialValue ? <span>{convertedValue(initialValue)}</span> : null;
}

function ApproveStatusCell({ cell }: TableCellProps<ShopDataType, boolean>) {
  const initialValue = cell.getValue();
  return <span>{initialValue ? 'O' : 'X'}</span>;
}

function CreatedAtCell({ cell }: TableCellProps<ShopDataType, string | undefined>) {
  const initialValue = cell.getValue();
  return initialValue ? <span>{dayjs(initialValue).format('YYYY/MM/DD HH:mm')}</span> : null;
}

const SelectItemStyles = {
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  backgroundColor: '#FFFFFF',
};
