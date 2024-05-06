import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import IntersectionBoundary from '@/components/intersection-boundary.tsx';
import ReviewItem from '@/components/review/item.tsx';
import { useReviewService } from '@/services/review.tsx';
import { useConnectedShop } from '@/state/shop.ts';

interface InfiniteListProps {
  productID: string;
  filter: string;
  orderBy: `${string}-${string}`;
}

export default function InfiniteList({ productID, filter, orderBy }: InfiniteListProps) {
  const { accessToken } = useConnectedShop();
  const reviewService = useReviewService();

  const reviewListQuery = useSuspenseInfiniteQuery({
    queryKey: ['review', { accessToken, productID, filter, orderBy }],
    queryFn: ({ pageParam }) => {
      const [property, direction] = orderBy.split('-');
      return reviewService.list({ accessToken, productID, direction, property, page: pageParam });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    initialPageParam: 0,
  });

  const reviews = reviewListQuery.data.pages.flatMap((it) => it.content);

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
      <IntersectionBoundary loadMore={reviewListQuery.fetchNextPage} />
    </>
  );
}
