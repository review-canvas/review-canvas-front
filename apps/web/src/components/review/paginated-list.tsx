import { useEffect, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import ReviewItem from '@/components/review/item.tsx';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import { type ReviewListFilter, type ReviewListSort } from '@/services/api-types/review.tsx';
import { useReviewService } from '@/services/review.tsx';
import { useConnectedShop } from '@/state/shop.ts';
import { MESSAGE_TYPES } from '@/utils/message';

interface PaginatedListProps {
  productID: string;
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function PaginatedList({ productID, filter, sort }: PaginatedListProps) {
  const { id } = useConnectedShop();
  const reviewService = useReviewService();
  const message = useMessageToShop();

  const [page, setPage] = useState(0);

  const reviewListQuery = useSuspenseQuery({
    queryKey: ['review-list', { id, productID, filter, sort, page }],
    queryFn: () => {
      return reviewService.list({ mallId: id, productNo: Number(productID), page, sort, filter });
    },
  });

  useEffect(() => {
    if (reviewListQuery.status !== 'success') return;
    message(MESSAGE_TYPES.ADJUST_HEIGHT, window.getComputedStyle(document.body).height);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional
  }, [reviewListQuery.status]);

  const reviews = reviewListQuery.data.data.content.filter(review => !review.deleted);

  return (
    <>
      <ul>
        {reviews.map((it) => (
          <ReviewItem
            content={it.content}
            id={it.reviewId}
            key={it.reviewId}
            rate={it.score}
            replies={it.replies}
            reviewer={it.nickname}
            reviewerID={it.nickname}
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
