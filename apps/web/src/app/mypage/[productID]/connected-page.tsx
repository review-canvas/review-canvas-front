'use client';

import { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import CloseButton from '@/components/button/close';
import MyReviewListOnProduct from '@/components/review/my-review/list';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item-style';
import { ReviewListStyleProvider } from '@/contexts/style/review-list-style';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import { useDesignPropertyService } from '@/services/design-property';
import { useConnectedShop } from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

interface ConnectedPageProps {
  productID: string;
}
export default function MyReviewsPage({ productID }: ConnectedPageProps) {
  const { id, domain } = useConnectedShop();
  const designPropertyService = useDesignPropertyService();

  useReviewCanvasReady('mypage');
  const designPropertyQuery = useSuspenseQuery({
    queryKey: ['design-property', id],
    queryFn: () => designPropertyService.get(id),
  });

  const close = () => {
    sendMessageToShop(domain, 'close-modal');
  };

  return (
    <main className="relative">
      <CloseButton onClose={close} />
      <div className="py-2 pl-4 border-b font-medium text-lg">My Reviews</div>
      <div className="p-2">
        <ReviewListStyleProvider
          value={designPropertyService.convertDesignPropertyResponseToReviewListStyle(designPropertyQuery.data)}
        >
          <ReviewItemStyleProvider
            value={designPropertyService.convertDesignPropertyToReviewItemStyle(designPropertyQuery.data)}
          >
            <Suspense fallback={<div>loading...</div>}>
              <MyReviewList productID={productID} />
            </Suspense>
          </ReviewItemStyleProvider>
        </ReviewListStyleProvider>
      </div>
    </main>
  );
}
