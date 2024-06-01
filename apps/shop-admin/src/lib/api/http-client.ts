import type { CommonResponse } from './api-common';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface FetchOptions {
  method: HttpMethod;
  body?: BodyInit | null;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: RequestInit['next'];
}

interface HttpClientConfig {
  baseUrl?: string;
  accessToken?: string;
  onRequest?: (url: string, options: FetchOptions) => void;
  onResponse?: (response: Response) => void;
  getToken?: () => string | undefined;
  onUnauthorized?: () => void;
}

export class HttpClient {
  private static instance: HttpClient | undefined = undefined;
  private config: HttpClientConfig;

  constructor(config?: HttpClientConfig) {
    const defaultConfig: HttpClientConfig = {
      baseUrl: config?.baseUrl || process.env.NEXT_PUBLIC_API_DOMAIN || '',
      onRequest: this.handleRequestInterceptor.bind(this),
      onResponse: this.handleResponseInterceptor.bind(this),
      getToken: config?.getToken,
      onUnauthorized: config?.onUnauthorized,
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
    const { accessToken, getToken } = this.config;
    const headers = new Headers(options.headers || {});

    const token = typeof window !== 'undefined' ? getToken?.() : accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    options.headers = headers;
  }

  private handleResponseInterceptor(response: Response): void {
    if (response.status === 401 || response.status === 403) {
      this.config.onUnauthorized?.();
    }
  }

  public setAccessToken(token: string): void {
    this.config.accessToken = token;
  }

  private async fetch<T>(url: string, options: FetchOptions): Promise<CommonResponse<T>> {
    const { baseUrl, onRequest, onResponse } = this.config;

    const finalUrl = `${baseUrl}${url}`;
    const headers = new Headers(options.headers || {});

    const token = this.config.getToken?.();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    options.headers = headers;

    onRequest && onRequest(finalUrl, options);

    const response = await fetch(finalUrl, options);
    onResponse && onResponse(response);

    const jsonResponse = (await response.json()) as CommonResponse<T>;
    if (!jsonResponse.success) {
      // eslint-disable-next-line no-console -- trace stack
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
