export interface PostAuthLoginRequest {
  email: string;
  password: string;
}

export interface PostAuthLoginResponse {
  shopAdminId: number;
  accessToken: string;
  refreshToken: string;
}

export interface GetSuperAdminShopsRequest {
  size: number;
  page: number;
}

export interface GetSuperAdminShopsResponse {
  page: number;
  size: number;
  total: number;
  content: {
    mallId: string;
    createdAt: string;
    mallName: string;
    mallNumber: string;
    approveStatus: boolean;
    reviewsAmount: number;
    reviewLayoutDesign: string;
  }[];
}
