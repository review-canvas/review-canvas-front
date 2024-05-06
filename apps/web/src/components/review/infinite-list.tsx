import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import IntersectionBoundary from '@/components/intersection-boundary.tsx';
import ReviewItem from '@/components/review/item.tsx';
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

  const reviewListQuery = useSuspenseInfiniteQuery({
    queryKey: ['review', { id, productID, filter, sort }],
    queryFn: ({ pageParam }) => {
      return reviewService.list({ mallId: id, productNo: Number(productID), sort, filter, page: pageParam });
    },
    getNextPageParam: ({ data }) => {
      return data.page + 1 < data.total ? data.page + 1 : undefined;
    },
    initialPageParam: 0,
  });

  const reviews = reviewListQuery.data.pages.flatMap((it) => it.data.content);

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
      <IntersectionBoundary loadMore={reviewListQuery.fetchNextPage} />
    </>
  );
}
