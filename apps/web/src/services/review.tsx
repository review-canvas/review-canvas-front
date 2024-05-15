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

export interface RetrieveReviewListResponse {
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

export interface RetrieveReviewListRequest {
  mallId: string;
  productNo: number;
  page?: number;
  size?: number;
  sort?: ReviewListSort;
  filter?: ReviewListFilter;
}

export interface RetrieveReviewItemResponse {
  success: boolean;
  data: ReviewItem;
}
export interface UpdateReviewItemRequest {
  content: string;
  score: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface UpdateReviewItemResponse {}
class ReviewService {
  async list({
    mallId,
    productNo,
    sort = 'LATEST',
    filter = 'ALL',
    size = 10,
    page = 0,
  }: RetrieveReviewListRequest): Promise<RetrieveReviewListResponse> {
    const search = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
      filter,
    });

    const response = await API.get<RetrieveReviewListResponse>(
      `/api/v1/shop/${mallId}/products/${productNo}/reviews?${search.toString()}`,
    );
    return response.data;
  }

  create() {}

  async update(id: string | undefined, request: UpdateReviewItemRequest) {
    const response = await API.patch<UpdateReviewItemResponse>(`/api/v1/reviews/${id}`,request);
    return response;
  }

  delete() {}

  async get(id: string) {
    const response = await API.get<RetrieveReviewItemResponse>(`/api/v1/reviews/${id}`);
    return response.data;
  }
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
