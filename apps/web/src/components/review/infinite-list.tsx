import { useEffect } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import IntersectionBoundary from '@/components/intersection-boundary.tsx';
import ReviewItem from '@/components/review/item.tsx';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import type { ReviewListFilter, ReviewListSort } from '@/services/api-types/review.tsx';
import { useReviewService } from '@/services/review.tsx';
import { useConnectedShop } from '@/state/shop.ts';
import { MESSAGE_TYPES } from '@/utils/message';

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
    message(MESSAGE_TYPES.ADJUST_HEIGHT, window.getComputedStyle(document.body).height);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional
  }, [reviewListQuery.status]);

  useEffect(() => {
    const handleMessage = (event: { data: string }) => {
      if (event.data === 'refresh') {
        void reviewListQuery.refetch();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const reviews = reviewListQuery.data.pages.flatMap((it) => it.data.content.filter((review) => !review.deleted));

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
      <IntersectionBoundary loadMore={reviewListQuery.fetchNextPage} />
    </>
  );
}
