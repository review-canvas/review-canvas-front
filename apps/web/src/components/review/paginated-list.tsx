import { useEffect, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import useMessageToShop from '@/hooks/use-message-to-shop';
import type { ReviewListFilter, ReviewListSort } from '@/models/api-type';
import { useReviewService } from '@/services/review';
import { useConnectedShop } from '@/state/shop';
import { MESSAGE_TYPES } from '@/utils/message';

import Pagination from '../pagination';

import ReviewItem from './item';

interface ReviewListProps {
  productID: string;
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function ReviewList({ productID, filter, sort }: ReviewListProps) {
  const { id, userID } = useConnectedShop();
  const reviewService = useReviewService();
  const message = useMessageToShop();

  const [page, setPage] = useState(0);

  const reviewListQuery = useSuspenseQuery({
    queryKey: ['review-list', { id, productID, filter, sort, page }],
    queryFn: () =>
      reviewService.list({ mallId: id, memberId: userID, productNo: Number(productID), page, sort, filter }),
  });

  useEffect(() => {
    if (reviewListQuery.status !== 'success') return;
    message(MESSAGE_TYPES.ADJUST_HEIGHT, window.getComputedStyle(document.body).height);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional
  }, [reviewListQuery.status]);

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

  const reviews = reviewListQuery.data.data.content;

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
        totalPages={Math.ceil(reviewListQuery.data.data.total / reviewListQuery.data.data.size)}
      />
    </>
  );
}
