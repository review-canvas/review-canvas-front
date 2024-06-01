import type { CommonResponse } from './api-common';

import useTokenStore from '@/store/auth/token';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface FetchOptions {
  method: HttpMethod;
  body?: BodyInit | null;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: RequestInit['next'];
}

interface HttpClientConfig {
  baseUrl: string;
  accessToken?: string;
  onRequest?: (url: string, options: FetchOptions) => void;
  onResponse?: (response: Response) => void;
}

export class HttpClient {
  private static instance: HttpClient | undefined = undefined;
  private config: HttpClientConfig;

  constructor(config?: HttpClientConfig) {
    const defaultConfig: HttpClientConfig = {
      baseUrl: config?.baseUrl || process.env.NEXT_PUBLIC_API_DOMAIN || '',
      onRequest: this.handleRequestInterceptor.bind(this),
      onResponse: this.handleResponseInterceptor.bind(this),
    };

    this.config = { ...defaultConfig, ...config };
  }

  public static getInstance(config?: HttpClientConfig): HttpClient {
    if (HttpClient.instance === undefined) {
      HttpClient.instance = new HttpClient(config);
    }

    return HttpClient.instance;
  }

  private handleRequestInterceptor(url: string, options: FetchOptions): void {
    const { accessToken } = this.config;
    const headers = new Headers(options.headers || {});

    if (typeof window !== 'undefined') {
      // Client Side
      const clientAccessToken = useTokenStore.getState().accessToken;

      if (clientAccessToken) {
        headers.set('Authorization', `Bearer ${clientAccessToken}`);
      }
    } else if (accessToken) {
      // Server Side
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    options.headers = headers;
  }

  private handleResponseInterceptor(response: Response): void {
    if (response.status === 401 || response.status === 403) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
  }

  public setAccessToken(token: string): void {
    this.config.accessToken = token;
  }

  private async fetch<T>(url: string, options: FetchOptions): Promise<CommonResponse<T>> {
    const { baseUrl, onRequest, onResponse } = this.config;

    const finalUrl = `${baseUrl}${url}`;
    const headers = new Headers(options.headers || {});

    const accessToken = useTokenStore.getState().accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    options.headers = headers;

    onRequest && onRequest(finalUrl, options);

    const response = await fetch(finalUrl, options);
    onResponse && onResponse(response);

    const jsonResponse = (await response.json()) as CommonResponse<T>;
    if (!jsonResponse.success) {
      // eslint-disable-next-line no-console -- check error response
      console.error(jsonResponse);
      throw new Error('API Fail');
    }

    return jsonResponse;
  }

  public async get<T>(url: string, params?: URLSearchParams, cache?: RequestCache): Promise<CommonResponse<T>> {
    const queryString = params ? `?${params.toString()}` : '';
    return this.fetch(`${url}${queryString}`, { method: 'GET', cache });
  }

  public async post<T>(url: string, body?: any, cache?: RequestCache): Promise<CommonResponse<T>> {
    const headers: HeadersInit = {};

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    return this.fetch(url, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers,
      cache,
    });
  }

  public async patch<T>(url: string, body?: any, cache?: RequestCache): Promise<CommonResponse<T>> {
    const headers: HeadersInit = {};

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    return this.fetch(url, {
      method: 'PATCH',
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers,
      cache,
    });
  }

  public async put<T>(url: string, body?: any, cache?: RequestCache): Promise<CommonResponse<T>> {
    const headers: HeadersInit = {};

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    return this.fetch(url, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers,
      cache,
    });
  }

  public async delete<T>(url: string, cache?: RequestCache): Promise<CommonResponse<T>> {
    return this.fetch(url, { method: 'DELETE', cache });
  }
}
