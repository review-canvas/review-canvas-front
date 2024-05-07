export interface ShopAdminInfo {
  email: string;
  mallNumber: string;
  phoneNumber: string;
  mallName: string;
  businessNumber: string;
}

export interface ShopAdminInfoStore {
  info: ShopAdminInfo;
  setInfo: (_info: ShopAdminInfo) => void;
}
