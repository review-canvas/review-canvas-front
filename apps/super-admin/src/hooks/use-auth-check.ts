import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { AuthService } from '@/service/auth';

function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuthState() {
      try {
        const isSuccess = await AuthService.checkAuth();

        if (!isSuccess) {
          throw new Error('인증 정보 없음');
        }
      } catch (err) {
        router.replace('/auth/login');
      }
    }

    void checkAuthState();
  }, []);
}

export default useAuthCheck;
