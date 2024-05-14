import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { TokenStore } from '@/types/auth/token';

const useTokenStore = create(
    persist<TokenStore>(
        (set) => ({
          accessToken: null,
          setAccessToken: (_accessToken) => {
            set({ accessToken: _accessToken });
          },
        }),
        {
          name: 'access-token',
          storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

export default useTokenStore;
