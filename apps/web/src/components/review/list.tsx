import { Suspense, useState } from 'react';

import { generateBorderCSS, generatePaddingCSS, generateShadowCSS } from '@review-canvas/theme';

import PaginatedList from '@/components/review/paginated-list.tsx';
import { useReviewListStyle } from '@/contexts/style/review-list-style.ts';
import type { ReviewListFilter, ReviewListSort } from '@/services/api-types/review.tsx';

import { Filter } from './filter';
import InfiniteList from './infinite-list';
import { OrderSelector } from './order-selector';
import { ReviewLayoutDesign } from '@/models/design-property.ts';

interface ReviewListProps {
  productID: string;
}

export default function ReviewList({ productID }: ReviewListProps) {
  const style = useReviewListStyle();
  style.reviewLayoutDesign = 'BOARD';
  const [layoutDesign, setLayoutDesign] = useState<ReviewLayoutDesign>(style.reviewLayoutDesign);
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
            <PaginatedList
              layoutDesign={layoutDesign}
              filter={filter}
              productID={productID}
              sort={sort}
            />
          ) : (
            <InfiniteList
              layoutDesign={layoutDesign}
              filter={filter}
              productID={productID}
              sort={sort}
            />
          )}
        </div>
      </Suspense>
    </section>
  );
}
