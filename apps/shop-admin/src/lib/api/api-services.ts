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

  public async postCafe24AuthentaicationProcess(
    request: API.PostCafe24AuthenticationProcessRequest,
  ): Promise<API.PostCafe24AuthenticationProcessResponse> {
    const response = await this.httpClient.post<API.PostCafe24AuthenticationProcessResponse>(
      `/api/v1/cafe24/${request.mallId}/authentication-process?authCode=${request.code}`,
    );

    return response;
  }
}

const httpClient = new HttpClient();

const { accessToken } = useTokenStore.getState();
if (accessToken) {
  httpClient.setAccessToken(accessToken);
}

export const apiService = new ApiService(httpClient);
