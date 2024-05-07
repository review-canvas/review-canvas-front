import { useEffect } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import IntersectionBoundary from '@/components/intersection-boundary.tsx';
import ReviewItem from '@/components/review/item.tsx';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import { type ReviewListFilter, type ReviewListSort, useReviewService } from '@/services/review.tsx';
import { useConnectedShop } from '@/state/shop.ts';

interface InfiniteListProps {
  productID: string;
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function InfiniteList({ productID, filter, sort }: InfiniteListProps) {
  const { id } = useConnectedShop();
  const reviewService = useReviewService();
  const message = useMessageToShop();

  const reviewListQuery = useSuspenseInfiniteQuery({
    queryKey: ['review-list', { id, productID, filter, sort }],
    queryFn: ({ pageParam }) => {
      return reviewService.list({ mallId: id, productNo: Number(productID), sort, filter, page: pageParam });
    },
    getNextPageParam: ({ data }) => {
      return data.page + 1 < data.total / data.size ? data.page + 1 : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (reviewListQuery.status !== 'success') return;
    message('adjust-height', window.getComputedStyle(document.body).height);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional
  }, [reviewListQuery.status]);

  const reviews = reviewListQuery.data.pages.flatMap((it) => it.data.content);

  return (
    <>
      <ul>
        {reviews.map((it) => (
          <ReviewItem
            content={it.content}
            id={it.reviewId}
            key={it.reviewId}
            rate={it.score}
            reviewer={it.nickname}
          />
        ))}
      </ul>
      <IntersectionBoundary loadMore={reviewListQuery.fetchNextPage} />
    </>
  );
}
