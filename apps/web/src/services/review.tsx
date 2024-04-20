import { createContext, type PropsWithChildren, useContext } from 'react';

import { createStore, useStore } from 'zustand';

import type { Review } from '@/models/review.ts';
import createAuthHeader from '@/utils/auth.ts';
import { createDummyReview, delayedData } from '@/utils/faker.ts';

class ReviewService {
  list(payload: { shopId: string; domain: string; productId: string; page: number; limit: number }) {
    const header = createAuthHeader(payload.shopId, payload.domain);
    // eslint-disable-next-line no-console -- This is a dummy service
    console.log(header);
    return delayedData(Array.from({ length: payload.limit }, (_, i) => createDummyReview(String(i))));
  }

  create() {}

  update() {}

  delete() {}

  get() {}
}

interface ReviewServiceStore {
  service: ReviewService;
}

const reviewServiceStore = createStore<ReviewServiceStore>(() => ({
  service: new ReviewService(),
}));
const ReviewServiceContext = createContext<typeof reviewServiceStore | null>(null);

export function ReviewServiceProvider({ children }: Readonly<PropsWithChildren>) {
  return <ReviewServiceContext.Provider value={reviewServiceStore}>{children}</ReviewServiceContext.Provider>;
}

export const useReviewService = (): ReviewService => {
  const service = useContext(ReviewServiceContext);
  if (!service) throw new Error('useReviewService must be used within a ReviewServiceProvider');
  return useStore(service, (state) => state.service);
};
