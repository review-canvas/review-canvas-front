'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { Shadow } from '@review-canvas/theme';

import ReviewItem from '@/components/review/item.tsx';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item.ts';
import { useReviewService } from '@/services/review.tsx';
import { useConnectedShop } from '@/state/shop.ts';

interface ConnectedPageProps {
  productId: string;
}

export default function ConnectedPage({ productId }: ConnectedPageProps) {
  const { accessToken, id, domain } = useConnectedShop();
  const reviewService = useReviewService();

  const reviewListQuery = useSuspenseInfiniteQuery({
    queryKey: ['review', { accessToken, productId }],
    queryFn: () => reviewService.list({ accessToken, productId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
  });

  const reviews = reviewListQuery.data.pages.flatMap((it) => it.content);

  return (
    <main>
      <h1>
        Reviews for product {productId} from shop {id} at {domain}
      </h1>
      <ul>
        <ReviewItemStyleProvider
          value={{
            width: '70%',
            margin: {
              top: '12px',
              right: '0',
              bottom: '0',
              left: '4px',
            },
            padding: {
              top: '4px',
              right: '0',
              bottom: '4px',
              left: '12px',
            },
            font: {
              color: '#000000',
              size: '14px',
              weight: 'normal',
              name: 'noto-sans-kr',
            },
            border: {
              top: '0',
              right: '0',
              bottom: '0',
              left: '3px',
            },
            borderColor: '#777777',
            borderRadius: {
              topLeft: '2px',
              topRight: '0',
              bottomRight: '0',
              bottomLeft: '2px',
            },
            shadow: Shadow.NONE,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          }}
        >
          {reviews.map((it) => (
            <ReviewItem
              content={it.comment}
              key={it.id}
              rate={it.rating}
              reviewer={it.reviewer}
            />
          ))}
        </ReviewItemStyleProvider>
      </ul>
    </main>
  );
}
