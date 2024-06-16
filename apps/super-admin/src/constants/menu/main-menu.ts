import type { FunctionComponent, SVGProps } from 'react';

import DashboardIcon from '@/assets/icon/icon-dashboard.svg';

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
];
