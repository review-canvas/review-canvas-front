import { toBase64 } from '@/utils/base64.ts';

const createAuthHeader = (shopId: string, domain: string) => {
  return {
    Authorization: `Basic ${toBase64(`${shopId}:${domain}`)}`,
  };
};

export default createAuthHeader;
