import type { CommonResponse } from './api-common';
import type * as API from './api-types';
import type { HttpClient } from './http-client';

import httpClient from './http-client-setup';

class ApiService {
  private httpClient: HttpClient;

  constructor(_httpClient: HttpClient) {
    this.httpClient = _httpClient;
  }

  public async postAuthLogin(request: API.PostAuthLoginRequest): Promise<API.PostAuthLoginResponse> {
    const response = await this.httpClient.post<API.PostAuthLoginResponse>('/api/v1/shop-admin/login', {
      email: request.email,
      password: request.password,
    });

    return response.data;
  }

  public async postAuthLogout() {
    const response = await this.httpClient.post('/api/v1/logout');
    return response.data;
  }

  public async getAuthCheck() {
    const response = await this.httpClient.get('/api/v1/auth/check');
    return response;
  }

  public async getShopAdminInfo(): Promise<CommonResponse<API.GetShopAdminInfoResponse>> {
    const response = await this.httpClient.get<API.GetShopAdminInfoResponse>('/api/v1/shop-admin');
    return response;
  }

  public async patchShopAdminInfo(
    request: API.PatchShopAdminInfoRequest,
  ): Promise<CommonResponse<API.PatchShopAdminInfoResponse>> {
    const response = await this.httpClient.patch<API.PatchShopAdminInfoResponse>('/api/v1/shop-admin', request);
    return response;
  }

  public async postCafe24AuthentaicationProcess(
    request: API.PostCafe24AuthenticationProcessRequest,
  ): Promise<CommonResponse<API.PostCafe24AuthenticationProcessResponse>> {
    const response = await this.httpClient.post<API.PostCafe24AuthenticationProcessResponse>(
      `/api/v1/cafe24/${request.mallId}/authentication-process?authCode=${request.code}`,
    );

    return response;
  }

  public async getEmailCheck(request: API.GetEmailCheckRequest): Promise<API.GetEmailCheckResponse> {
    const email = request.email;
    const params = new URLSearchParams();
    params.set('email', email);

    const response = await this.httpClient.get<API.GetEmailCheckResponse>('/api/v1/shop-admin/email-check', params);

    return response.data;
  }

  public async postShopAdminSignUp(
    request: API.PostShopAdminSignUpRequest,
  ): Promise<CommonResponse<API.PostShopAdminSignUpResponse>> {
    const response = await this.httpClient.post<CommonResponse<API.PostShopAdminSignUpResponse>>(
      '/api/v1/shop-admin/sign-up',
      request,
    );

    return response;
  }

  public async deleteShopAdminQuit(): Promise<CommonResponse<API.DeleteShopAdminQuitResponse>> {
    const response =
      await this.httpClient.delete<CommonResponse<API.DeleteShopAdminQuitResponse>>('/api/v1/shop-admin/quit');

    return response;
  }

  public async getReviewLayout(): Promise<API.GetReviewLayoutResponse> {
    const response = await this.httpClient.get<API.GetReviewLayoutResponse>('/api/v1/shop-admin/review-layout');
    return response.data;
  }

  public async patchReviewLayout(
    request: API.PatchReviewLayoutRequest,
  ): Promise<CommonResponse<API.PatchReviewLayoutResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewLayoutResponse>>(
      '/api/v1/shop-admin/review-layout',
      request,
    );

    return response;
  }

  public async patchReviewLayoutInitialize(): Promise<CommonResponse<API.PatchReviewLayoutInitializeResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewLayoutInitializeResponse>>(
      '/api/v1/shop-admin/review-layout/initialize',
    );
    return response;
  }

  public async getReviewContainer(): Promise<API.GetReviewContainerResponse> {
    const response = await this.httpClient.get<API.GetReviewContainerResponse>('/api/v1/shop-admin/review-container');
    return response.data;
  }

  public async patchReviewContainer(
    request: API.PatchReviewContainerRequest,
  ): Promise<CommonResponse<API.PatchReviewContainerResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewContainerResponse>>(
      '/api/v1/shop-admin/review-container',
      request,
    );

    return response;
  }

  public async patchReviewContainerInitialize(): Promise<CommonResponse<API.PatchReviewContainerInitializeResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewContainerInitializeResponse>>(
      '/api/v1/shop-admin/review-container/reset',
    );
    return response;
  }

  public async getReviewColumn(): Promise<API.GetReviewColumnResponse> {
    const response = await this.httpClient.get<API.GetReviewColumnResponse>('/api/v1/shop-admin/review-column');
    return response.data;
  }

  public async patchReviewColumn(
    request: API.PatchReviewColumnRequest,
  ): Promise<CommonResponse<API.PatchReviewColumnResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewColumnResponse>>(
      '/api/v1/shop-admin/review-column',
      request,
    );

    return response;
  }

  public async patchReviewColumnInitialize(): Promise<CommonResponse<API.PatchReviewColumnInitializeResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewColumnInitializeResponse>>(
      '/api/v1/shop-admin/review-column/reset',
    );
    return response;
  }

  public async getReviewTitle(): Promise<API.GetReviewTitleResponse> {
    const response = await this.httpClient.get<API.GetReviewTitleResponse>('/api/v1/shop-admin/review-title');
    return response.data;
  }

  public async patchReviewTitle(
    request: API.PatchReviewTitleRequest,
  ): Promise<CommonResponse<API.PatchReviewTitleResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewTitleResponse>>(
      '/api/v1/shop-admin/review-title',
      request,
    );

    return response;
  }

  public async patchReviewTitleInitialize(): Promise<CommonResponse<API.PatchReviewTitleInitializeResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewTitleInitializeResponse>>(
      '/api/v1/shop-admin/review-title/reset',
    );
    return response;
  }

  public async getReviewDesignView(): Promise<API.GetReviewDesignViewRequest> {
    const response = await this.httpClient.get<API.GetReviewDesignViewResponse>(
      '/api/v1/shop-admin/review-design-view',
    );
    return response.data;
  }

  public async patchReviewDesignView(
    request: API.PatchReviewDesignViewRequest,
  ): Promise<CommonResponse<API.PatchReviewDesignViewResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewDesignViewResponse>>(
      '/api/v1/shop-admin/review-design-view',
      request,
    );

    return response;
  }

  public async patchReviewDesignViewInitialize(): Promise<CommonResponse<API.PatchReviewDesignViewInitializeResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewDesignViewInitializeResponse>>(
      '/api/v1/shop-admin/review-design-view/reset',
    );
    return response;
  }

  public async getReviewDesignWrite(): Promise<API.GetReviewDesignWriteRequest> {
    const response = await this.httpClient.get<API.GetReviewDesignWriteResponse>(
      '/api/v1/shop-admin/review-design-write',
    );
    return response.data;
  }

  public async patchReviewDesignWrite(
    request: API.PatchReviewDesignWriteRequest,
  ): Promise<CommonResponse<API.PatchReviewDesignWriteResponse>> {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewDesignWriteResponse>>(
      '/api/v1/shop-admin/review-design-write',
      request,
    );

    return response;
  }

  public async patchReviewDesignWriteInitialize(): Promise<
    CommonResponse<API.PatchReviewDesignWriteInitializeResponse>
  > {
    const response = await this.httpClient.patch<CommonResponse<API.PatchReviewDesignWriteInitializeResponse>>(
      '/api/v1/shop-admin/review-design-write/reset',
    );
    return response;
  }

  public async getFontInfo(): Promise<API.GetFontInfoResponse> {
    const response = await this.httpClient.get<API.GetFontInfoResponse>('/api/v1/font-info');
    return response.data;
  }

  public async getProductReviews(request: API.GetProductReviewRequest): Promise<API.GetProductReviewResponse> {
    const { productId, size, page, sort, period, reviewFilters, score, replyFilters } = request;

    const params = new URLSearchParams();
    params.set('size', String(size));
    params.set('page', String(page));
    params.set('sort', String(sort));
    period && params.set('period', period);
    reviewFilters && params.set('reviewFilters', reviewFilters);
    score && params.set('score', score);
    replyFilters && params.set('replyFilters', replyFilters);

    const response = await this.httpClient.get<API.GetProductReviewResponse>(
      `/api/v1/products/${productId}/reviews`,
      params,
    );

    return response.data;
  }

  public async getShopProducts(request: API.GetShopProductsRequest): Promise<API.GetShopProductsResponse> {
    const { shopAdminId, page, size } = request;

    const params = new URLSearchParams();
    params.set('size', String(size));
    params.set('page', String(page));

    const response = await this.httpClient.get<API.GetShopProductsResponse>(
      `/api/v1/shops/${shopAdminId}/products`,
      params,
    );

    return response.data;
  }

  public async deleteShopAdminReview(
    request: API.DeleteShopAdminReviewRequest,
  ): Promise<CommonResponse<API.DeleteShopAdminReviewResponse>> {
    const response = await this.httpClient.delete<CommonResponse<API.DeleteShopAdminReviewResponse>>(
      `/api/v1/shop-admin/reviews/${request.reviewId}`,
    );

    return response;
  }
}

export const apiService = new ApiService(httpClient);
