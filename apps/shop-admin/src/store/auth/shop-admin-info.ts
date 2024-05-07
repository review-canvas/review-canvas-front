import { create } from 'zustand';

import type { ShopAdminInfoStore } from '@/types/common';

const useShopAdminInfoStore = create<ShopAdminInfoStore>((set) => ({
  info: {
    email: '',
    mallNumber: '',
    phoneNumber: '',
    mallName: '',
    businessNumber: '',
  },
  setInfo: (_info) => {
    set({ info: _info });
  },
}));

export default useShopAdminInfoStore;
