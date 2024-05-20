import { apiService } from '@/lib/api/api-services';
import type { PatchShopAdminInfoRequest } from '@/lib/api/api-types';
import useTokenStore from '@/store/auth/token';
import type { SignupFormData } from '@/types/signup';

async function login(email: string, password: string): Promise<void> {
  try {
    const response = await apiService.postAuthLogin({ email, password });
    useTokenStore.getState().setAccessToken(response.accessToken);
  } catch (error) {
    throw new Error('로그인에 실패했습니다.', error as ErrorOptions);
  }
}

async function logout(): Promise<void> {
  try {
    await apiService.postAuthLogout();
    window.location.href = '/auth/login';
  } catch (error) {
    throw new Error('로그아웃에 실패했습니다.', error as ErrorOptions);
  }
}

async function checkAuth() {
  try {
    const { success } = await apiService.getAuthCheck();
    return success;
  } catch (error) {
    throw new Error('로그인 여부 확인에 실패했습니다', error as ErrorOptions);
  }
}

async function getShopAdminInfo() {
  try {
    const { success, data } = await apiService.getShopAdminInfo();

    return {
      success,
      info: data,
    };
  } catch (error) {
    throw new Error('로그인 되어 있는 어드민 정보 확인에 실패했습니다', error as ErrorOptions);
  }
}

async function modifyShopAdminInfo(request: PatchShopAdminInfoRequest): Promise<boolean> {
  try {
    const response = await apiService.patchShopAdminInfo(request);
    return response.success;
  } catch (error) {
    throw new Error('Shop Admin 정보 수정에 실패했습니다', error as ErrorOptions);
  }
}

async function isEmailDuplicate(email: string): Promise<boolean> {
  try {
    const response = await apiService.getEmailCheck({ email });
    return response.duplicate;
  } catch (error) {
    throw new Error('이메일 중복 체크에 실패했습니다', error as ErrorOptions);
  }
}

async function signup(formData: SignupFormData): Promise<void> {
  try {
    await apiService.postShopAdminSignUp(formData);
  } catch (error) {
    throw new Error('회원가입에 실패했습니다', error as ErrorOptions);
  }
}

async function unregister(): Promise<void> {
  try {
    await apiService.deleteShopAdminQuit();
  } catch (error) {
    throw new Error('회원 탈퇴에 실패했습니다', error as ErrorOptions);
  }
}

export const AuthService = {
  login,
  logout,
  checkAuth,
  getShopAdminInfo,
  modifyShopAdminInfo,
  isEmailDuplicate,
  signup,
  unregister,
};
