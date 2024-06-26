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
  {
    key: 'mypage',
    name: '마이페이지',
    pathname: '/mypage',
  },
  {
    key: 'serviceGuide',
    name: '서비스 가이드',
    pathname: '/guide',
  },
  {
    key: 'qna',
    name: '1:1 문의',
    pathname: '/qna',
  },
];
