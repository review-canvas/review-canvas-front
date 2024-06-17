import { useEffect } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import IntersectionBoundary from '@/components/intersection-boundary.tsx';
import type { ReviewListFilter, ReviewListSort } from '@/models/api-type';
import type { ReviewLayoutDesign } from '@/models/design-property.ts';
import { useReviewService } from '@/services/review';
import { useConnectedShop } from '@/state/shop';

import BoardStyleReviewItem from './board-style-item.tsx';
import TalkStyleReviewItem from './talk-style-item.tsx';

interface MyReviewListProps {
  layoutDesign: ReviewLayoutDesign;
  productID: string;
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function InfiniteList({ layoutDesign, productID, filter, sort }: MyReviewListProps) {
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
        {reviews.map((it) => {
          if (layoutDesign === 'BOARD') {
            return (
              <BoardStyleReviewItem
                key={it.reviewId}
                review={it}
              />
            );
          } else if (layoutDesign === 'TALK') {
            return (
              <TalkStyleReviewItem
                key={it.reviewId}
                review={it}
              />
            );
          } else if (layoutDesign === 'CARD') {
            return (
              <TalkStyleReviewItem
                key={it.reviewId}
                review={it}
              />
            );
          }
        })}
      </ul>
      <IntersectionBoundary loadMore={reviewListQuery.fetchNextPage} />
    </>
  );
}
