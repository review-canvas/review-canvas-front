import { create } from 'zustand';

import type { TokenStore } from '@/types/auth/token';

const useTokenStore = create<TokenStore>((set) => ({
  accessToken: null,
  setAccessToken: (_accessToken) => {
    set({ accessToken: _accessToken });
  },
}));

export default useTokenStore;
