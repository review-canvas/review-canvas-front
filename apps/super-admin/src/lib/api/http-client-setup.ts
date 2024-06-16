import { HttpClient } from '@review-canvas/http-client';

import useTokenStore from '@/store/auth/token';

const baseUrl = process.env.NEXT_PUBLIC_API_DOMAIN || '';

const getToken = (): string | undefined => {
  const token = useTokenStore.getState().accessToken;
  return token !== null ? token : undefined;
};

const onUnauthorized = () => {
  window.location.href = '/auth/login';
};

const httpClient = HttpClient.getInstance({ baseUrl, getToken, onUnauthorized });

const { accessToken } = useTokenStore.getState();
if (accessToken) {
  httpClient.setAccessToken(accessToken);
}

export default httpClient;
