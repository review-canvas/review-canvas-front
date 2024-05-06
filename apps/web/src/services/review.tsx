import { createContext, type PropsWithChildren, useContext } from 'react';

import { createStore, useStore } from 'zustand';

import API from '@/utils/api.ts';

export interface ReviewItem {
  reviewId: number;
  content: string;
  score: number;
  userId: number;
  nickname: string;
}

export interface ReviewListResponse {
  success: boolean;
  data: {
    page: number;
    size: number;
    total: number;
    content: ReviewItem[];
  };
}

export type ReviewListSort = 'LATEST' | 'HIGH_SCORE' | 'LOW_SCORE';
export type ReviewListFilter = 'ALL' | 'IMAGE_VIDEO' | 'GENERAL';

export interface ReviewListRequest {
  mallId: string;
  productNo: number;
  page?: number;
  size?: number;
  sort?: ReviewListSort;
  filter?: ReviewListFilter;
}

class ReviewService {
  async list({
    mallId,
    productNo,
    sort = 'LATEST',
    filter = 'ALL',
    size = 10,
    page = 0,
  }: ReviewListRequest): Promise<ReviewListResponse> {
    const search = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
      filter,
    });

    const response = await API.get<ReviewListResponse>(
      `/api/v1/shop/${mallId}/products/${productNo}/reviews?${search.toString()}`,
    );
    return response.data;
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
