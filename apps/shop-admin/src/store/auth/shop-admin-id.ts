import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { ShopAdminIdStore } from '@/types/auth/shop-admin-id';

const useShopAdminIdStore = create(
  persist<ShopAdminIdStore>(
    (set) => ({
      shopAdminId: null,
      setShopAdminId: (_shopAdminId) => {
        set({ shopAdminId: _shopAdminId });
      },
    }),
    {
      name: 'shop-admin-id',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useShopAdminIdStore;
