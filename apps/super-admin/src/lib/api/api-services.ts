import type * as API from './api-types';

import type { HttpClient } from '@review-canvas/http-client';

import httpClient from './http-client-setup';

class ApiService {
  private httpClient: HttpClient;

  constructor(_httpClient: HttpClient) {
    this.httpClient = _httpClient;
  }

  public async postAuthLogin(request: API.PostAuthLoginRequest): Promise<API.PostAuthLoginResponse> {
    const response = await this.httpClient.post<API.PostAuthLoginResponse>('/api/v1/super-admin/login', {
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

  public async getSuperAdminShops(request: API.GetSuperAdminShopsRequest): Promise<API.GetSuperAdminShopsResponse> {
    const { page, size } = request;

    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));

    const response = await this.httpClient.get<API.GetSuperAdminShopsResponse>('/api/v1/super-admin/shops', params);

    return response.data;
  }
}

export const apiService = new ApiService(httpClient);
