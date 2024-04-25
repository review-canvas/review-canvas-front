type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
  method: HttpMethod;
  body?: BodyInit | null;
  headers?: HeadersInit;
  cache?: RequestCache;
}

interface HttpClientConfig {
  baseUrl: string;
  accessToken?: string;
  onRequest?: (url: string, options: FetchOptions) => void;
  onResponse?: (response: Response) => void;
}

export class HttpClient {
  private config: HttpClientConfig;

  constructor(config?: HttpClientConfig) {
    const defaultConfig: HttpClientConfig = {
      baseUrl: process.env.NEXT_PUBLIC_API_DOMAIN || '',
      onRequest: this.handleRequestInterceptor.bind(this),
      onResponse: this.handleResponseInterceptor.bind(this),
    };

    this.config = { ...defaultConfig, ...config };
  }

  private handleRequestInterceptor(url: string, options: FetchOptions): void {
    const { accessToken } = this.config;
    const headers = new Headers(options.headers || {});

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    } else {
      window.location.href = '/auth/login';
    }

    options.headers = headers;
  }

  private handleResponseInterceptor(response: Response): void {
    if (response.status === 401) {
      window.location.href = '/auth/login';
    }
  }

  private setAccessToken(token: string): void {
    this.config.accessToken = token;
  }

  private async fetch(url: string, options: FetchOptions): Promise<Response> {
    const { baseUrl, onRequest, onResponse } = this.config;

    const finalUrl = `${baseUrl}${url}`;
    const headers = new Headers(options.headers || {});

    const accessToken = this.config.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    options.headers = headers;

    onRequest && onRequest(finalUrl, options);

    const response = await fetch(finalUrl, options);
    onResponse && onResponse(response);

    return response;
  }

  private async fetchWithRetry(url: string, options: FetchOptions, retries = 3, delay = 1000): Promise<Response> {
    try {
      const response = await this.fetch(url, options);
      if (!response.ok && retries > 0) {
        throw new Error('Request failed');
      }
      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => {
          setTimeout(resolve, delay);
        });
        return this.fetchWithRetry(url, options, retries - 1, delay);
      }

      throw error;
    }
  }

  public async get(url: string, params?: URLSearchParams, cache?: RequestCache): Promise<Response> {
    const queryString = params ? `?${params.toString()}` : '';
    return this.fetch(`${url}${queryString}`, { method: 'GET', cache });
  }

  public async post(url: string, body?: any, cache?: RequestCache): Promise<Response> {
    return this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      cache,
    });
  }

  public async put(url: string, body?: any, cache?: RequestCache): Promise<Response> {
    return this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      cache,
    });
  }

  public async delete(url: string, cache?: RequestCache): Promise<Response> {
    return this.fetch(url, { method: 'DELETE', cache });
  }
}
