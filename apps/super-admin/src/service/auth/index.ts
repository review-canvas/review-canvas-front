import { apiService } from '@/lib/api/api-services';
import useTokenStore from '@/store/auth/token';

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
export const AuthService = {
  login,
  logout,
  checkAuth,
  getShopAdminInfo,
};