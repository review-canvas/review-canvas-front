import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import ReviewItem from '@/components/review/item.tsx';
import { useReviewService } from '@/services/review.tsx';
import { useConnectedShop } from '@/state/shop.ts';

interface PaginatedListProps {
  productID: string;
  filter: string;
  orderBy: `${string}-${string}`;
}

export default function PaginatedList({ productID, filter, orderBy }: PaginatedListProps) {
  const { accessToken } = useConnectedShop();
  const reviewService = useReviewService();

  const [page, setPage] = useState(0);

  const reviewListQuery = useSuspenseQuery({
    queryKey: ['review', { accessToken, productID, filter, orderBy, page }],
    queryFn: () => {
      const [property, direction] = orderBy.split('-');
      return reviewService.list({ accessToken, productID, direction, property, page });
    },
  });

  const reviews = reviewListQuery.data.content;

  return (
    <>
      <ul>
        {reviews.map((it) => (
          <ReviewItem
            content={it.comment}
            key={it.id}
            rate={it.rating}
            reviewer={it.reviewer}
          />
        ))}
      </ul>

      <Pagination
        onPage={setPage}
        page={page}
        totalPages={reviewListQuery.data.totalPages}
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
