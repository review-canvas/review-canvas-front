import useTokenStore from '@/store/auth/token';

import { HttpClient } from './http-client';

const getToken = (): string | undefined => {
  const token = useTokenStore.getState().accessToken;
  return token !== null ? token : undefined;
};

const onUnauthorized = () => {
  window.location.href = '/auth/login';
};

const httpClient = HttpClient.getInstance({ getToken, onUnauthorized });

const { accessToken } = useTokenStore.getState();
if (accessToken) {
  httpClient.setAccessToken(accessToken);
}

export default httpClient;
