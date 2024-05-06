import { createContext, type PropsWithChildren, useContext } from 'react';

import { createStore, useStore } from 'zustand';

import type { Page, PageRequest } from '@/models/page.ts';
import type { Review } from '@/models/review.ts';
import { createDummyReview, delayedData } from '@/utils/faker.ts';

class ReviewService {
  list({ size = 10, page = 0 }: PageRequest<{ accessToken: string; productID: string }>): Promise<Page<Review>> {
    return delayedData({
      content: Array.from({ length: size }, (_, i) => createDummyReview(String(i))),
      first: true,
      last: true,
      number: page,
      numberOfElements: size,
      size,
      sort: [],
      totalElements: size,
      totalPages: 1,
    });
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
type ReviewServiceStoreType = typeof reviewServiceStore;
const ReviewServiceContext = createContext<ReviewServiceStoreType | null>(null);

export function ReviewServiceProvider({
  children,
  service = reviewServiceStore,
}: Readonly<
  PropsWithChildren<{
    service?: ReviewServiceStoreType;
  }>
>) {
  return <ReviewServiceContext.Provider value={service}>{children}</ReviewServiceContext.Provider>;
}

export const useReviewService = (): ReviewService => {
  const service = useContext(ReviewServiceContext);
  if (!service) throw new Error('useReviewService must be used within a ReviewServiceProvider');
  return useStore(service, (state) => state.service);
};
