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

export const AuthService = {
  login,
};
