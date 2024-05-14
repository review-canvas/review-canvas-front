'use client';

import { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import ReviewList from '@/components/review/list.tsx';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item.ts';
import { ReviewListStyleProvider } from '@/contexts/style/review-list.ts';
import useMessageToShop from '@/hooks/use-message-to-shop.ts';
import { useDesignPropertyService } from '@/services/design-property.tsx';
import { useConnectedShop } from '@/state/shop.ts';

interface ConnectedPageProps {
  productID: string;
}

export default function ConnectedPage({ productID }: ConnectedPageProps) {
  const { id, userID } = useConnectedShop();
  const message = useMessageToShop();
  const designPropertyService = useDesignPropertyService();

  const designPropertyQuery = useSuspenseQuery({
    queryKey: ['design-property', id],
    queryFn: () => designPropertyService.get(id),
  });

  const openMyPage = () => {
    message('open-modal', {
      type: 'mypage',
      url: `/mypage/${userID}`,
    });
  };

  return (
    <main>
      {userID ? (
        <div>
          <button
            onClick={openMyPage}
            type="button"
          >
            mypage
          </button>
        </div>
      ) : null}
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
