import { create } from 'zustand';

interface ConnectedShop {
  connected: true;
  id: string;
  domain: string;
}
interface DisconnectedShop {
  connected: false;
  id?: never;
  domain?: never;
}

export type ShopConnectionState = ConnectedShop | DisconnectedShop;

export interface ShopConnectionActions {
  connect: (id: string, domain: string) => void;
}

type ShopConnectionStore = ShopConnectionState & ShopConnectionActions;

const useShopConnection = create<ShopConnectionStore>((set) => ({
  connected: false,
  connect: (id, domain) => {
    set({ id, domain, connected: true });
  },
}));

export default useShopConnection;
