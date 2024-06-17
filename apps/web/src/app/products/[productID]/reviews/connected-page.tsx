'use client';

import { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import ReviewList from '@/components/review/list';
import { ReviewItemStyleProvider } from '@/contexts/style/review-item-style';
import { ReviewListStyleProvider } from '@/contexts/style/review-list-style';
import useMessageToShop from '@/hooks/use-message-to-shop';
import { useDesignPropertyService } from '@/services/design-property';
import { useConnectedShop } from '@/state/shop';
import { MESSAGE_TYPES } from '@/utils/message';

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
    message(MESSAGE_TYPES.OPEN_MODAL, {
      type: 'mypage',
      url: `/mypage/${productID}`,
    });
  };

  const openCreateReviewPage = () => {
    message(MESSAGE_TYPES.OPEN_MODAL, {
      type: 'craete',
      url: `/reviews/create/${productID}`,
    });
  };

  return (
    <main>
      {userID ? (
        <div className="grid grid-cols-2 justify-center text-lg font-medium place-content-around p-3 w-100% mb-4">
          <button
            className="border-2 border-gray-400/85 text-gray-400 p-2 m-2"
            onClick={openMyPage}
            type="button"
          >
            My Page
          </button>
          <button
            className="border-2 border-indigo-500/60 text-white bg-blue-500 m-2"
            onClick={openCreateReviewPage}
            type="button"
          >
            <div className="bg-blue-500 p-2">리뷰 작성</div>
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
