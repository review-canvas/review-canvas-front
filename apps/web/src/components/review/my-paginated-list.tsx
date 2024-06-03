import { useEffect, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import useMessageToShop from '@/hooks/use-message-to-shop';
import type { ReviewListFilter, ReviewListSort } from '@/services/api-types/review';
import { useReviewService } from '@/services/review';
import { useConnectedShop } from '@/state/shop';
import { MESSAGE_TYPES } from '@/utils/message';

import Pagination from '../pagination';

import ReviewItem from './item';

interface MyReviewListProps {
  productID: string;
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function MyPaginatedList({ productID, filter, sort }: MyReviewListProps) {
  const { id, userID } = useConnectedShop();
  const reviewService = useReviewService();
  const message = useMessageToShop();

  const [page, setPage] = useState(0);

  const myReviewListQuery = useSuspenseQuery({
    queryKey: ['my-list', { id, productID, filter, sort, page }],
    queryFn: () =>
      reviewService.myReiveiwList({
        mallId: id,
        memberId: userID,
        productNo: Number(productID),
        sort,
        filter,
        page,
      }),
  });

  useEffect(() => {
    if (myReviewListQuery.status !== 'success') return;
    message(MESSAGE_TYPES.ADJUST_HEIGHT, window.getComputedStyle(document.body).height);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional
  }, [myReviewListQuery.status]);

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

  const reviews = myReviewListQuery.data.data.content;

  return (
    <>
      <ul>
        {reviews.map((it) => (
          <ReviewItem
            key={it.reviewId}
            review={it}
          />
        ))}
      </ul>

      <Pagination
        onPage={setPage}
        page={page}
        totalPages={Math.ceil(myReviewListQuery.data.data.total / myReviewListQuery.data.data.size)}
      />
    </>
  );
}
