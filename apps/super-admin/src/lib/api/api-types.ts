export interface PostAuthLoginRequest {
  email: string;
  password: string;
}

export interface PostAuthLoginResponse {
  adminId: number;
  accessToken: string;
  refreshToken: string;
}

export interface GetShopAdminInfoResponse {
  email: string;
  mallNumber: string;
  phoneNumber: string;
  mallName: string;
  businessNumber: string;
}

