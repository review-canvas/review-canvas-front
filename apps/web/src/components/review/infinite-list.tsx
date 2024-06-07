import { useEffect } from 'react';

import { QueryClient, QueryClientProvider, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { ReviewListFilter, ReviewListSort } from '@/services/api-types/review';
import { useReviewService } from '@/services/review';
import { useConnectedShop } from '@/state/shop';

import IntersectionBoundary from '../intersection-boundary';

import ChatStyleReviewItem from './chat-style-item.tsx';

interface MyReviewListProps {
  productID: string;
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function InfiniteList({ productID, filter, sort }: MyReviewListProps) {
  const { id, userID } = useConnectedShop();
  const reviewService = useReviewService();
  const reviewListQuery = useSuspenseInfiniteQuery({
    queryKey: ['review-list', { id, productID, filter, sort }],
    queryFn: ({ pageParam }) => {
      return reviewService.list({
        mallId: id,
        memberId: userID,
        productNo: Number(productID),
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
        void reviewListQuery.refetch();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const reviews = reviewListQuery.data.pages.flatMap((it) => it.data.content);

  return (
    <>
      <ul>
        {reviews.map((it) => (
          <ChatStyleReviewItem
            key={it.reviewId}
            review={it}
          />
        ))}
      </ul>
      <IntersectionBoundary loadMore={reviewListQuery.fetchNextPage} />
    </>
  );
}
