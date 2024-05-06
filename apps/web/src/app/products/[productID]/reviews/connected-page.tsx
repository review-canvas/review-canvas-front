'use client';

import { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import ReviewList from '@/components/review/list.tsx';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item.ts';
import { ReviewListStyleProvider } from '@/contexts/style/review-list.ts';
import { useDesignPropertyService } from '@/services/design-property.tsx';
import { useConnectedShop } from '@/state/shop.ts';

interface ConnectedPageProps {
  productID: string;
}

export default function ConnectedPage({ productID }: ConnectedPageProps) {
  const { id, domain } = useConnectedShop();
  const designPropertyService = useDesignPropertyService();

  const designPropertyQuery = useSuspenseQuery({
    queryKey: ['design-property', id],
    queryFn: () => designPropertyService.get(id),
  });

  return (
    <main>
      <h1>
        Reviews for product {productID} from shop {id} at {domain}
      </h1>
      <ReviewListStyleProvider
        value={designPropertyService.convertDesignPropertyResponseToReviewListStyle(designPropertyQuery.data)}
      >
        <ReviewItemStyleProvider
          value={designPropertyService.convertDesignPropertyToReviewItemStyle(designPropertyQuery.data)}
        >
          <Suspense fallback={<div>loading...</div>}>
            <ReviewList productID={productID} />
          </Suspense>
        </ReviewItemStyleProvider>
      </ReviewListStyleProvider>
    </main>
  );
}
