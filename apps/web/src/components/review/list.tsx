import { Suspense, useState } from 'react';

import { generateBorderCSS, generatePaddingCSS, generateShadowCSS } from '@review-canvas/theme';

import InfiniteList from '@/components/review/infinite-list.tsx';
import PaginatedList from '@/components/review/paginated-list.tsx';
import { type ReviewListStyle, useReviewListStyle } from '@/contexts/style/review-list.ts';
import type { ReviewListFilter, ReviewListSort } from '@/services/api-types/review.tsx';

interface ReviewListProps {
  productID: string;
}

export default function ReviewList({ productID }: ReviewListProps) {
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
            <PaginatedList
              filter={filter}
              productID={productID}
              sort={sort}
            />
          ) : (
            <InfiniteList
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

interface FilterProps<T extends string> {
  selectedFilter: T;
  filters: {
    value: T;
    label: string;
  }[];
  onFilter: (filter: T) => void;
}

function Filter<T extends string>({ filters, selectedFilter, onFilter }: FilterProps<T>) {
  return (
    <div className="flex gap-1 items-center">
      {filters.map((it) => (
        <label
          className="relative text-gray-500 checked:text-black has-[:checked]:text-black cursor-pointer"
          key={it.value}
        >
          <input
            checked={it.value === selectedFilter}
            className="sr-only"
            name="filter"
            onChange={(evt) => {
              onFilter(evt.currentTarget.value as T);
            }}
            type="radio"
            value={it.value}
          />
          {it.label}
        </label>
      ))}
    </div>
  );
}

interface OrderSelectorProps<T extends string> {
  orders: {
    value: T;
    label: string;
  }[];
  orderBy: T;
  type: ReviewListStyle['orderSelectorStyle'];
  onSelect: (order: T) => void;
}

function OrderSelector<T extends string>({ orders, orderBy, type, onSelect }: OrderSelectorProps<T>) {
  return (
    <div className="flex gap-1 items-center">
      {type === 'dropdown' ? (
        <select
          name="order"
          onChange={(evt) => {
            onSelect(evt.currentTarget.value as T);
          }}
          value={orderBy}
        >
          {orders.map((it) => (
            <option
              key={it.value}
              value={it.value}
            >
              {it.label}
            </option>
          ))}
        </select>
      ) : (
        orders.map((it) => (
          <label
            className="relative text-gray-500 checked:text-black has-[:checked]:text-black cursor-pointer"
            key={it.value}
          >
            <input
              checked={it.value === orderBy}
              className="sr-only"
              name="order"
              onChange={(evt) => {
                onSelect(evt.currentTarget.value as T);
              }}
              type="radio"
              value={it.value}
            />
            {it.label}
          </label>
        ))
      )}
    </div>
  );
}
