import { useEffect, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { css } from 'twin.macro';

import Pagination from '@/components/pagination.tsx';
import useMessageToShop from '@/hooks/use-message-to-shop';
import type { ReviewListFilter, ReviewListSort } from '@/models/api-type';
import type { ReviewLayoutDesign } from '@/models/design-property.ts';
import { useReviewService } from '@/services/review';
import { useConnectedShop } from '@/state/shop';
import { MESSAGE_TYPES } from '@/utils/message';

import BoardStyleReviewItem from './board-style-item.tsx';
import CardStyleReviewItem from './card-style-item.tsx';
import TalkStyleReviewItem from './talk-style-item.tsx';

interface ReviewListProps {
  layoutDesign: ReviewLayoutDesign;
  productID: string;
  filter: ReviewListFilter;
  sort: ReviewListSort;
}

export default function ReviewList({ layoutDesign, productID, filter, sort }: ReviewListProps) {
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
      <ul
        css={
          layoutDesign === 'CARD'
            ? css`
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-auto-rows: auto;
                gap: 16px;
              `
            : null
        }
      >
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
              <CardStyleReviewItem
                key={it.reviewId}
                review={it}
              />
            );
          }
        })}
      </ul>
      <Pagination
        onPage={setPage}
        page={page}
        totalPages={Math.ceil(reviewListQuery.data.data.total / reviewListQuery.data.data.size)}
      />
    </>
  );
}
