import { useEffect } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import IntersectionBoundary from '@/components/intersection-boundary';
import ReviewItem from '@/components/review/item';
import type { ReviewListFilter, ReviewListSort } from '@/services/api-types/review';
import { useReviewService } from '@/services/review';
import { useConnectedShop } from '@/state/shop';

interface MyReviewListProps {
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function MyInfiniteList({ filter, sort }: MyReviewListProps) {
  const { id, userID } = useConnectedShop();
  const reviewService = useReviewService();

  const myReviewListQuery = useSuspenseInfiniteQuery({
    queryKey: ['my-list', { id, filter, sort }],
    queryFn: ({ pageParam }) => {
      return reviewService.myReiveiwList({
        mallId: id,
        memberId: userID,
        sort,
        filter,
        page: pageParam,
      });
    },
    getNextPageParam: ({ data }) => {
      return data.page + 1 < data.total / data.size ? data.page + 1 : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    const handleMessage = (evt: { data: string }) => {
      if (evt.data === 'refresh') {
        void myReviewListQuery.refetch();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const reviews = myReviewListQuery.data.pages.flatMap((it) => it.data.content);

  return (
    <>
      <ul>
        {reviews.map((it) => (
          <div key={it.reviewId}>
            <ReviewItem
              key={it.reviewId}
              productName={it.productName}
              review={it}
            />
          </div>
        ))}
      </ul>
      <IntersectionBoundary loadMore={myReviewListQuery.fetchNextPage} />
    </>
  );
}