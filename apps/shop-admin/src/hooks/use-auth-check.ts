import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { AuthService } from '@/service/auth';

function useAuthCheck() {
  const router = useRouter();

  function checkAuthState() {
    try {
      return AuthService.checkAuth();
    } catch (err) {
      // eslint-disable-next-line no-alert -- required alert
      alert('일시적으로 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      return false;
    }
  }

  useEffect(() => {
    if (!checkAuthState()) {
      router.replace('/auth/login');
    }
  }, []);
}

export default useAuthCheck;
