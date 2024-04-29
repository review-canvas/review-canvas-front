import { create } from 'zustand';
import { createAccessToken } from '@/utils/auth.ts';

export interface ConnectedShop {
  connected: true;
  id: string;
  domain: string;
  accessToken: string;
}

export interface DisconnectedShop {
  connected: false;
  id?: never;
  domain?: never;
  accessToken?: never;
}

export type ShopConnectionState = ConnectedShop | DisconnectedShop;

export interface ShopConnectionActions {
  connect: (id: string, domain: string) => void;
}

type ShopConnectionStore = ShopConnectionState & ShopConnectionActions;

const useShop = create<ShopConnectionStore>((set) => ({
  connected: false,
  connect: (id, domain) => {
    set({ connected: true, id, domain, accessToken: createAccessToken(id, domain) });
  },
}));

export const useConnectedShop = () => {
  const shop = useShop();
  if (!shop.connected) throw new Error('useConnectedShop must be used with a connected shop');
  return shop;
};

export default useShop;
