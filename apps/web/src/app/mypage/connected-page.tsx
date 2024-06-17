'use client';

import { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import MyReviewList from '@/components/review/my-page/list.tsx';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item';
import { ReviewListStyleProvider } from '@/contexts/style/review-list';
import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';
import { useDesignPropertyService } from '@/services/design-property';
import { useConnectedShop } from '@/state/shop.ts';

export default function MyReviewsPage() {
  const { id } = useConnectedShop();
  const designPropertyService = useDesignPropertyService();

  useReviewCanvasReady('mypage');
  const designPropertyQuery = useSuspenseQuery({
    queryKey: ['design-property', id],
    queryFn: () => designPropertyService.get(id),
  });

  return (
    <main className="relative">
      <div className="p-2">
        <ReviewListStyleProvider
          value={designPropertyService.convertDesignPropertyResponseToReviewListStyle(designPropertyQuery.data)}
        >
          <ReviewItemStyleProvider
            value={designPropertyService.convertDesignPropertyToReviewItemStyle(designPropertyQuery.data)}
          >
            <Suspense fallback={<div>loading...</div>}>
              <MyReviewList />
            </Suspense>
          </ReviewItemStyleProvider>
        </ReviewListStyleProvider>
      </div>
    </main>
  );
}
