'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { Review } from '@/models/review.ts';
import { useReviewService } from '@/services/review.tsx';
import { useConnectedShop } from '@/state/shop.ts';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';

interface ConnectedPageProps {
  productId: string;
}

export default function ConnectedPage({ productId }: ConnectedPageProps) {
  const { accessToken, id, domain } = useConnectedShop();
  const sendMessage = useMessageToShop();
  const reviewService = useReviewService();

  const reviewListQuery = useSuspenseInfiniteQuery({
    queryKey: ['review', { accessToken, productId }],
    queryFn: () => reviewService.list({ accessToken, productId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
  });

  const reviews = reviewListQuery.data.pages.flatMap((it) => it.content);

  const openReviewDetail = (review: Review) => {
    sendMessage('open-review-detail', `${location.origin}/reviews/${review.id}`);
  };

  return (
    <main>
      <h1>
        Reviews for product {productId} from shop {id} at {domain}
      </h1>
      <ul>
        {reviews.map((it) => (
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
