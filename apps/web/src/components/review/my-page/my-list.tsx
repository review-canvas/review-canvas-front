import { Suspense, useState } from 'react';

import { generateBorderCSS, generatePaddingCSS, generateShadowCSS } from '@review-canvas/theme';

import { Filter } from '@/components/review/filter';
import { OrderSelector } from '@/components/review/order-selector';
import { useReviewListStyle } from '@/contexts/style/review-list';
import type { ReviewListFilter, ReviewListSort } from '@/models/api-type';

import MyInfiniteList from './my-infinite-list';
import MyPaginatedList from './my-paginated-list';

export default function MyReviewList() {
  const style = useReviewListStyle();

  const [filter, setFilter] = useState<ReviewListFilter>('ALL');
  const [sort, setSort] = useState<ReviewListSort>('LATEST');

  return (
    <section>
      <div className="m-2 flex justify-between">
        <Filter
          filters={[
            {
              value: 'ALL',
              label: '전체',
            },
            {
              value: 'IMAGE_VIDEO',
              label: '포토/동영상',
            },
            {
              value: 'GENERAL',
              label: '일반',
            },
          ]}
          onFilter={setFilter}
          selectedFilter={filter}
        />
        <OrderSelector
          onSelect={setSort}
          orderBy={sort}
          orders={[
            {
              value: 'LATEST',
              label: '최신순',
            },
            {
              value: 'HIGH_SCORE',
              label: '평점높은순',
            },
            {
              value: 'LOW_SCORE',
              label: '평점낮은순',
            },
          ]}
          type={style.orderSelectorStyle}
        />
      </div>

      <hr />

      <Suspense fallback={<div>loading reviews...</div>}>
        <div
          css={[
            generatePaddingCSS(style.padding),
            generateBorderCSS(style.border, style.borderColor),
            generateShadowCSS(style.shadow, style.shadowColor),
          ]}
        >
          {style.paginationStyle === 'page' ? (
            <MyPaginatedList
              filter={filter}
              sort={sort}
            />
          ) : (
            <MyInfiniteList
              filter={filter}
              sort={sort}
            />
          )}
        </div>
      </Suspense>
    </section>
  );
}
