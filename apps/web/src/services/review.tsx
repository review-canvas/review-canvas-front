import { createContext, type PropsWithChildren, useContext } from 'react';

import { createStore, useStore } from 'zustand';

import type * as TYPE from '@/models/api-type';
import API from '@/utils/api.ts';

class ReviewService {
  async retrieveReviewLikeCount(reviewId: number): Promise<TYPE.RetrieveReviewLikeCountResponse> {
    const response = await API.get<TYPE.RetrieveReviewLikeCountResponse>(`/api/v1/reviews/${reviewId}/like/count`);
    return response.data;
  }
  async createUserLike({
    reviewId,
    mallId,
    memberId,
  }: TYPE.CreateUserReviewLikeRequest): Promise<TYPE.CreateUserReviewLikeResponse> {
    const response = await API.post<TYPE.CreateUserReviewLikeResponse>(`/api/v1/reviews/${reviewId}/like/`, {
      mallId,
      memberId,
    });
    return response.data;
  }

  async deleteUserLike({
    reviewId,
    mallId,
    memberId,
  }: TYPE.DeleteUserReviewLikeRequest): Promise<TYPE.DeleteUserReviewLikeResponse> {
    const response = await API.delete<TYPE.DeleteUserReviewLikeResponse>(
      `/api/v1/shop/${mallId}/users/${memberId}/reviews/${reviewId}/like`,
    );
    return response.data;
  }

  async list({
    mallId,
    productNo,
    memberId,
    sort = 'LATEST',
    filter = 'ALL',
    size = 10,
    page = 0,
  }: TYPE.RetrieveReviewListRequest): Promise<TYPE.RetrieveReviewListResponse> {
    const search = memberId
      ? new URLSearchParams({
          memberId,
          page: page.toString(),
          size: size.toString(),
          sort,
          filter,
        })
      : new URLSearchParams({
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
      reviewImages.forEach((file) => {
        formData.append('reviewFiles', file, file.name);
      });
    }

    const jsonBlob = new Blob([JSON.stringify(request)], { type: 'application/json' });
    formData.append('createReviewRequest', jsonBlob, 'createReviewRequest.json');

    await API.post<TYPE.CommonResponse>(`/api/v1/shop/${Id.mallId}/products/${Id.productId}/review`, formData);
  }

  async update(id: TYPE.PathInfo, request: TYPE.UpdateReviewItemRequest, reviewImages?: File[]) {
    const formData = new FormData();
    if (reviewImages) {
      reviewImages.forEach((file) => {
        formData.append('reviewFiles', file, file.name);
      });
    }

    const jsonBlob = new Blob([JSON.stringify(request)], { type: 'application/json' });
    formData.append('updateReviewRequest', jsonBlob, 'updateReviewRequest.json');

    await API.patch<TYPE.CommonResponse>(
      `/api/v1/shop/${id.mallId}/users/${id.memberId}/reviews/${id.requestId}`,
      formData,
    );
  }

  async delete(id: TYPE.PathInfo) {
    await API.delete<TYPE.CommonResponse>(`/api/v1/shop/${id.mallId}/users/${id.memberId}/reviews/${id.requestId}`);
  }

  async get(id: TYPE.PathInfo) {
    const memeberPath = id.memberId ? `&memberId=${id.memberId}` : ``;
    const response = await API.get<TYPE.RetrieveReviewItemResponse>(
      `/api/v1/reviews/${id.requestId}?mallId=${id.mallId}${memeberPath}`,
    );
    return response.data;
  }
  async myReiveiwList({
    mallId,
    memberId,
    sort = 'LATEST',
    filter = 'ALL',
    size = 10,
    page = 0,
  }: TYPE.RetrieveMyReviewListRequest): Promise<TYPE.RetrieveReviewListResponse> {
    const search = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
      filter,
    });

    const response = await API.get<TYPE.RetrieveReviewListResponse>(
      `/api/v1/shop/${mallId}/users/${memberId}/mypage/reviews?${search.toString()}`,
    );
    return response.data;
  }

  async myReiveiwListOnProduct({
    mallId,
    productNo,
    memberId,
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
      `/api/v1/shop/${mallId}/users/${memberId}/mypage/${productNo}/reviews?${search.toString()}`,
    );
    return response.data;
  }

  async getReply(Id: string) {
    const response = await API.get<TYPE.RetrieveReplyItemResponse>(`/api/v1/replies/${Id}`);
    return response.data;
  }
  async createReply(Id: string, request: TYPE.CreateReplyItemRequest) {
    await API.post<TYPE.CommonResponse>(`/api/v1/reviews/${Id}/reply`, request);
  }
  async updateReply(Id: number | string, request: TYPE.CreateReplyItemRequest) {
    await API.patch<TYPE.CommonResponse>(`/api/v1/replies/${Id}`, request);
  }
  async deleteReply(id: TYPE.PathInfo) {
    await API.delete<TYPE.CommonResponse>(`/api/v1/shop/${id.mallId}/users/${id.memberId}/replies/${id.requestId}`);
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
