import type { SolutionCafe24InstallStatus } from '@/types/solution/cafe24';

export interface PostAuthLoginRequest {
  email: string;
  password: string;
}

export interface PostAuthLoginResponse {
  adminId: number;
  accessToken: string;
  refreshToken: string;
}

export interface PostCafe24AuthenticationProcessRequest {
  mallId: string;
  code: string;
}

export interface PostCafe24AuthenticationProcessResponse {
  shopAdminStatus: SolutionCafe24InstallStatus;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface GetShopAdminInfoRequest {}

export interface GetShopAdminInfoResponse {
  email: string;
  mallNumber: string;
  phoneNumber: string;
  mallName: string;
  businessNumber: string;
}

export interface GetEmailCheckRequest {
  email: string;
}

export interface GetEmailCheckResponse {
  duplicate: boolean;
}

export interface PostShopAdminSignUpRequest {
  email: string;
  password: string;
  phoneNumber: string;
  mallName: string;
  mallId: string;
  consentedTermsIds: number[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- no data
export interface PostShopAdminSignUpResponse {}
