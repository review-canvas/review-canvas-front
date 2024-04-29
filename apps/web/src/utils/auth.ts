import { toBase64 } from '@/utils/base64.ts';

export const createAccessToken = (shopId: string, domain: string) => {
  return toBase64(`${shopId}:${domain}`);
};

export const createBasicAuthHeader = (token: string) => {
  return {
    Authorization: `Basic ${token}`,
  };
};
