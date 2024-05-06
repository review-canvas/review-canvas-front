import { useState } from 'react';

import { generateBorderCSS, generatePaddingCSS, generateShadowCSS } from '@review-canvas/theme';

import InfiniteList from '@/components/review/infinite-list.tsx';
import PaginatedList from '@/components/review/paginated-list.tsx';
import { type ReviewListStyle, useReviewListStyle } from '@/contexts/style/review-list.ts';

interface ReviewListProps {
  productID: string;
}

export default function ReviewList({ productID }: ReviewListProps) {
  const style = useReviewListStyle();

  const [filter, setFilter] = useState('all');
  const [orderBy, setOrderBy] = useState<`${string}-${string}`>('date-desc');

  return (
    <section>
      <h3>Reviews</h3>

      <div className="m-2 flex justify-between">
        <Filter
          filters={['all', 'photo', 'text']}
          onFilter={setFilter}
          selectedFilter={filter}
        />
        <OrderSelector
          onSelect={setOrderBy}
          orderBy={orderBy}
          orders={['date-desc', 'rate-asc', 'rate-desc']}
          type={style.orderSelectorStyle}
        />
      </div>

      <hr />

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
            orderBy={orderBy}
            productID={productID}
          />
        ) : (
          <InfiniteList
            filter={filter}
            orderBy={orderBy}
            productID={productID}
          />
        )}
      </div>
    </section>
  );
}

interface FilterProps {
  selectedFilter: string;
  filters: string[];
  onFilter: (filter: string) => void;
}

function Filter({ filters, selectedFilter, onFilter }: FilterProps) {
  return (
    <div className="flex gap-1 items-center">
      {filters.map((it) => (
        <label
          className="relative text-gray-500 checked:text-black has-[:checked]:text-black cursor-pointer"
          key={it}
        >
          <input
            checked={it === selectedFilter}
            className="sr-only"
            name="filter"
            onChange={(evt) => {
              onFilter(evt.target.value);
            }}
            type="radio"
            value={it}
          />
          {it}
        </label>
      ))}
    </div>
  );
}

interface OrderSelectorProps<T extends string> {
  orders: T[];
  orderBy: string;
  type: ReviewListStyle['orderSelectorStyle'];
  onSelect: (order: T) => void;
}

function OrderSelector<T extends string>({ orders, orderBy, type, onSelect }: OrderSelectorProps<T>) {
  return (
    <div className="flex gap-1 items-center">
      {type === 'dropdown' ? (
        <select
          name="order"
          onSelect={(evt) => {
            onSelect(evt.currentTarget.value as T);
          }}
          value={orderBy}
        >
          {orders.map((it) => (
            <option key={it}>{it}</option>
          ))}
        </select>
      ) : (
        orders.map((it) => (
          <label
            className="relative text-gray-500 checked:text-black has-[:checked]:text-black cursor-pointer"
            key={it}
          >
            <input
              checked={it === orderBy}
              className="sr-only"
              name="order"
              onChange={(evt) => {
                onSelect(evt.target.value as T);
              }}
              type="radio"
              value={it}
            />
            {it}
          </label>
        ))
      )}
    </div>
  );
}
