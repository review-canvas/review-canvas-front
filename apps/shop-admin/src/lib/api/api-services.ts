import type { CommonResponse } from './api-common';
import type * as API from './api-types';

import useTokenStore from '@/store/auth/token';

import { HttpClient } from './http-client';

class ApiService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
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
}

const httpClient = HttpClient.getInstance();

const { accessToken } = useTokenStore.getState();
if (accessToken) {
  httpClient.setAccessToken(accessToken);
}

export const apiService = new ApiService(httpClient);
