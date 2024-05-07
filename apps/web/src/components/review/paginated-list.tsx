import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import ReviewItem from '@/components/review/item.tsx';
import { type ReviewListFilter, type ReviewListSort, useReviewService } from '@/services/review.tsx';
import { useConnectedShop } from '@/state/shop.ts';

interface PaginatedListProps {
  productID: string;
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function PaginatedList({ productID, filter, sort }: PaginatedListProps) {
  const { id } = useConnectedShop();
  const reviewService = useReviewService();

  const [page, setPage] = useState(0);

  const reviewListQuery = useSuspenseQuery({
    queryKey: ['review', { id, productID, filter, sort, page }],
    queryFn: () => {
      return reviewService.list({ mallId: id, productNo: Number(productID), page, sort, filter });
    },
  });

  const reviews = reviewListQuery.data.data.content;

  return (
    <>
      <ul>
        {reviews.map((it) => (
          <ReviewItem
            content={it.content}
            key={it.reviewId}
            rate={it.score}
            reviewer={it.nickname}
          />
        ))}
      </ul>

      <Pagination
        onPage={setPage}
        page={page}
        totalPages={Math.ceil(reviewListQuery.data.data.total / reviewListQuery.data.data.size)}
      />
    </>
  );
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onPage: (page: number) => unknown;
}

function Pagination(props: PaginationProps) {
  const { page, totalPages, onPage } = props;

  return (
    <div className="flex gap-1 items-center">
      <button
        disabled={page === 0}
        onClick={() => {
          onPage(page - 1);
        }}
        type="button"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          aria-pressed={i === page}
          className={'text-gray-500 [&[aria-pressed="true"]]:text-black cursor-pointer'}
          key={i}
          onClick={() => {
            onPage(i);
          }}
          type="button"
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={page === totalPages - 1}
        onClick={() => {
          onPage(page + 1);
        }}
        type="button"
      >
        Next
      </button>
    </div>
  );
}
