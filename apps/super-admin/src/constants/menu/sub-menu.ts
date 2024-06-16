import { AuthService } from '@/service/auth';

interface AdminSubMenuItem {
  key: string;
  name: string;
  pathname?: string;
  action?: () => void;
}

export const ADMIN_SUB_MENU_MAP: AdminSubMenuItem[] = [
  {
    key: 'logout',
    name: '로그아웃',
    action: () => {
      void AuthService.logout();
    },
  },
];
