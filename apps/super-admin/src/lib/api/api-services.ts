import type * as API from './api-types';

import useTokenStore from '@/store/auth/token';

import { HttpClient } from './http-client';

class ApiService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async postAuthLogin(request: API.PostAuthLoginRequest): Promise<API.PostAuthLoginResponse> {
    const response = await this.httpClient.post<API.PostAuthLoginResponse>('/api/v1/super-admin/login', {
      email: request.email,
      password: request.password,
    });

    return response.data;
  }
}

const httpClient = new HttpClient();

const { accessToken } = useTokenStore.getState();
if (accessToken) {
  httpClient.setAccessToken(accessToken);
}

export const apiService = new ApiService(httpClient);
