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

async function isEmailDuplicate(email: string): Promise<boolean> {
  try {
    const response = await apiService.getEmailCheck({ email });
    return response.duplicate;
  } catch (error) {
    throw new Error('이메일 중복 체크에 실패했습니다', error as ErrorOptions);
  }
}

export const AuthService = {
  login,
  isEmailDuplicate,
};
