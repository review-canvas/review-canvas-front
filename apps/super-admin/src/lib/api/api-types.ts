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
