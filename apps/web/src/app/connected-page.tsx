'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import type { Review } from '@/models/review.ts';
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

  const openReviewDetail = (review: Review) => {
    window.parent.postMessage(
      { type: 'open-review-detail', payload: `${location.origin}/reviews/${review.id}` },
      domain,
    );
  };

  return (
    <main>
      <h1>
        Reviews for product {productId} from shop {shopId} at {domain}
      </h1>
      <ul>
        {reviewListQuery.data.map((it) => (
          <li key={it.id}>
            <button
              className="flex flex-col justify-start"
              onClick={() => {
                openReviewDetail(it);
              }}
              type="button"
            >
              <p className="text-left">comment: {it.comment}</p>
              <p>rate: {it.rating}</p>
              <p>reviewer: {it.reviewer}</p>
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </main>
  );
}
