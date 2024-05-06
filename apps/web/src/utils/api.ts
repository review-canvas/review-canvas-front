import axios from 'axios';

import useShop from '@/state/shop.ts';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use((config) => {
  const { accessToken } = useShop.getState();
  if (accessToken) {
    // TODO: Fix this
    // Object.assign(config.headers, createBasicAuthHeader(accessToken));
  }
  return config;
});

export default API;
