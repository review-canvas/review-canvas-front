import { createContext, type PropsWithChildren, useContext } from 'react';

import { createStore, useStore } from 'zustand';

import API from '@/utils/api.ts';

import type * as TYPE from '@/services/api-types/review.ts';
import {CreateReviewItemRequest} from "@/services/api-types/review.ts";

class ReviewService {
  async list({
    mallId,
    productNo,
    sort = 'LATEST',
    filter = 'ALL',
    size = 10,
    page = 0,
  }: TYPE.RetrieveReviewListRequest): Promise<TYPE.RetrieveReviewListResponse> {
    const search = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
      filter,
    });

    const response = await API.get<TYPE.RetrieveReviewListResponse>(
      `/api/v1/shop/${mallId}/products/${productNo}/reviews?${search.toString()}`,
    );
    return response.data;
  }

  async create(id: string | undefined, request: TYPE.CreateReviewItemRequest) {
    await API.patch<TYPE.CommonResponse>(`/api/v1/products/${id}/reviews`,request);
  }

  async update(id: string | undefined, request: TYPE.CreateReviewItemRequest) {
    await API.patch<TYPE.CommonResponse>(`/api/v1/reviews/${id}`,request);
  }
  async delete(id: string | undefined) {
    await API.delete<TYPE.CommonResponse>(`/api/v1/reviews/${id}`);
  }

  async get(id: string) {
    const response = await API.get<TYPE.RetrieveReviewItemResponse>(`/api/v1/reviews/${id}`);
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
