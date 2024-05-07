import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { AuthService } from '@/service/auth';
import useShopAdminInfoStore from '@/store/auth/shop-admin-info';

function useAuthCheck() {
  const router = useRouter();
  const { setInfo } = useShopAdminInfoStore();

  useEffect(() => {
    async function checkAuthState() {
      try {
        const { success, info } = await AuthService.getShopAdminInfo();

        if (!success) {
          throw new Error('인증 정보 없음');
        }

        setInfo(info);
      } catch (err) {
        router.replace('/auth/login');
      }
    }

    void checkAuthState();
  }, []);
}

export default useAuthCheck;
