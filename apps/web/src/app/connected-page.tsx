'use client';

import { Fragment } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useReviewService } from '@/services/review.tsx';

interface ConnectedPageProps {
  productId: string;
  shopId: string;
  domain: string;
}

export default function ConnectedPage({ shopId, domain, productId }: ConnectedPageProps) {
  const reviewService = useReviewService();

  const reviewListQuery = useSuspenseQuery({
    queryKey: ['review', { shopId, domain, productId }],
    queryFn: () => reviewService.list({ shopId, domain, productId, page: 0, limit: 10 }),
  });

  return (
    <ul>
      {reviewListQuery.data.map((it) => (
        <Fragment key={it.id}>
          <li key={it.id}>
            <p>comment: {it.comment}</p>
            <p>rate: {it.rating}</p>
            <p>reviewer: {it.reviewer}</p>
          </li>
          <hr />
        </Fragment>
      ))}
    </ul>
  );
}
