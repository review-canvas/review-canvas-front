import { useEffect } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { ReviewListFilter, ReviewListSort } from '@/services/api-types/review';
import { useReviewService } from '@/services/review';
import { useConnectedShop } from '@/state/shop';

import IntersectionBoundary from '../intersection-boundary';

import BoardStyleReviewItem from '@/components/review/board-style-item.tsx';
import TalkStyleReviewItem from '@/components/review/talk-style-item.tsx';
import { ReviewLayoutDesign } from '@/models/design-property.ts';

interface MyReviewListProps {
  layoutDesign: ReviewLayoutDesign;
  productID: string;
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function MyInfiniteList({ layoutDesign, productID, filter, sort }: MyReviewListProps) {
  const { id, userID } = useConnectedShop();
  const reviewService = useReviewService();

  const myReviewListQuery = useSuspenseInfiniteQuery({
    queryKey: ['my-list', { id, productID, filter, sort }],
    queryFn: ({ pageParam }) => {
      return reviewService.myReiveiwList({
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
          } else {
            return null;
          }
        })}
      </ul>
      <IntersectionBoundary loadMore={myReviewListQuery.fetchNextPage} />
    </>
  );
}
