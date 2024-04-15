import type { FunctionComponent, SVGProps } from 'react';

import ColumnIcon from '@/assets/icon/icon-column.svg';
import ContainerIcon from '@/assets/icon/icon-container.svg';
import CustomCSSIcon from '@/assets/icon/icon-custom-css.svg';
import CustomFontIcon from '@/assets/icon/icon-custom-font.svg';
import DashboardOptionIcon from '@/assets/icon/icon-dashboard-option.svg';
import DashboardIcon from '@/assets/icon/icon-dashboard.svg';
import LayoutIcon from '@/assets/icon/icon-layout.svg';
import NaverApiIcon from '@/assets/icon/icon-naver-api.svg';
import ReviewOptionIcon from '@/assets/icon/icon-review-option.svg';
import TitleIcon from '@/assets/icon/icon-title.svg';

type SVGIcon = FunctionComponent<SVGProps<SVGSVGElement>>;

interface AdminMenuItem {
  name: string;
  pathname: string;
  icon: SVGIcon;
}

export const ADMIN_MENU_MAP: AdminMenuItem[] = [
  {
    name: '대시보드',
    pathname: '/',
    icon: DashboardIcon as SVGIcon,
  },
  {
    name: '대시보드 옵션',
    pathname: '/dashboard/option',
    icon: DashboardOptionIcon as SVGIcon,
  },
  {
    name: '레이아웃',
    pathname: '/setting/design/layout',
    icon: LayoutIcon as SVGIcon,
  },
  {
    name: 'Container',
    pathname: '/setting/design/container',
    icon: ContainerIcon as SVGIcon,
  },
  {
    name: 'Column',
    pathname: '/setting/design/column',
    icon: ColumnIcon as SVGIcon,
  },
  {
    name: 'Title',
    pathname: '/setting/design/title',
    icon: TitleIcon as SVGIcon,
  },
  {
    name: 'ReviewOption',
    pathname: '/setting/option',
    icon: ReviewOptionIcon as SVGIcon,
  },
  {
    name: 'Custom Font',
    pathname: '/setting/design/font',
    icon: CustomFontIcon as SVGIcon,
  },
  {
    name: 'Custom CSS',
    pathname: '/setting/design/css',
    icon: CustomCSSIcon as SVGIcon,
  },
  {
    name: 'Naver API',
    pathname: '/setting/naver-api',
    icon: NaverApiIcon as SVGIcon,
  },
];
