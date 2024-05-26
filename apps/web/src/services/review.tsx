import { createContext, type PropsWithChildren, useContext } from 'react';

import { createStore, useStore } from 'zustand';

import type * as TYPE from '@/services/api-types/review.tsx';
import API from '@/utils/api.ts';

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

  async create(Id: TYPE.CreateReivewPathInfo, request: TYPE.CreateReviewItemRequest, reviewImages?: File[]) {
    const formData = new FormData();
    if (reviewImages) {
      reviewImages.forEach(file => {
        formData.append('reviewImages', file, file.name);
      });
    }

    const jsonBlob = new Blob([JSON.stringify(request)], { type: 'application/json' });
    formData.append('createReviewRequest', jsonBlob, 'createReviewRequest.json');

    await API.post<TYPE.CommonResponse>(`/api/v1/shop/${Id.mallId}/products/${Id.productId}/review`, formData);
  }

  async update(id: TYPE.ReivewPathInfo, request: TYPE.UpdateReviewItemRequest, reviewImages?: File[]) {
    const formData = new FormData();

    if (reviewImages) {
      reviewImages.forEach(file => {
        formData.append('reviewImages', file, file.name);
      });
    }

    const jsonBlob = new Blob([JSON.stringify(request)], { type: 'application/json' });
    formData.append('updateReviewRequest', jsonBlob, 'updateReviewRequest.json');

    await API.patch<TYPE.CommonResponse>(
      `/api/v1/shop/${id.mallId}/users/${id.memberId}/reviews/${id.reviewId}`,
      formData,
    );
  }

  async delete(id: TYPE.ReivewPathInfo) {
    await API.delete<TYPE.CommonResponse>(`/api/v1/shop/${id.mallId}/users/${id.memberId}/reviews/${id.reviewId}`);
  }

  async get(id: string) {
    const response = await API.get<TYPE.RetrieveReviewItemResponse>(`/api/v1/reviews/${id}`);
    return response.data;
  }

  async createReply(Id: string, request: TYPE.CreateReplyItemRequest) {
    await API.post<TYPE.CommonResponse>(`/api/v1/reviews/${Id}/reply`, request);
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
