import type { FunctionComponent, SVGProps } from 'react';

import DashboardIcon from '@/assets/icon/icon-dashboard.svg';
import SubscribeIcon from '@/assets/icon/icon-subscribe.svg';
import LoginUserIcon from '@/assets/icon/icon-login-user.svg';

type SVGIcon = FunctionComponent<SVGProps<SVGSVGElement>>;

interface AdminMenuItem {
  name: string;
  pathname: string;
  caption?: string;
  icon: SVGIcon;
}

export const ADMIN_MENU_MAP: AdminMenuItem[] = [
  {
    name: '대시보드',
    pathname: '/dashboard',
    icon: DashboardIcon as SVGIcon,
  },
  {
    name: '구독 관리',
    pathname: '/dashboard/subscribe',
    icon: SubscribeIcon as SVGIcon,
  },
  {
    name: '사용자 통계',
    pathname: '/dashboard/statistics',
    icon: LoginUserIcon as SVGIcon,
  }
];
