export interface PostAuthLoginRequest {
  email: string;
  password: string;
}

export interface PostAuthLoginResponse {
  adminId: number;
  accessToken: string;
  refreshToken: string;
}

