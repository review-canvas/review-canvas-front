import { createContext, type PropsWithChildren, useContext } from 'react';

import { createStore, useStore } from 'zustand';

import type { Page, PageRequest } from '@/models/page.ts';
import type { Review } from '@/models/review.ts';
import { createBasicAuthHeader } from '@/utils/auth.ts';
import { createDummyReview, delayedData } from '@/utils/faker.ts';

class ReviewService {
  list({
    accessToken,
    size = 10,
    page = 0,
  }: PageRequest<{ accessToken: string; productID: string }>): Promise<Page<Review>> {
    const header = createBasicAuthHeader(accessToken);
    // eslint-disable-next-line no-console -- This is a dummy service
    console.log(header);
    return delayedData({
      content: Array.from({ length: 40 }, (_, i) => createDummyReview(String(i))).slice(page * size, (page + 1) * size),
      first: page === 0,
      last: page === 3,
      number: page,
      numberOfElements: size,
      size,
      sort: [],
      totalElements: size,
      totalPages: 4,
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
const ReviewServiceContext = createContext<typeof reviewServiceStore | null>(null);

export function ReviewServiceProvider({ children }: Readonly<PropsWithChildren>) {
  return <ReviewServiceContext.Provider value={reviewServiceStore}>{children}</ReviewServiceContext.Provider>;
}

export const useReviewService = (): ReviewService => {
  const service = useContext(ReviewServiceContext);
  if (!service) throw new Error('useReviewService must be used within a ReviewServiceProvider');
  return useStore(service, (state) => state.service);
};
