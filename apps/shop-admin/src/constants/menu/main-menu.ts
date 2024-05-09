import type { FunctionComponent, SVGProps } from 'react';

import ColumnIcon from '@/assets/icon/icon-column.svg';
import ContainerIcon from '@/assets/icon/icon-container.svg';
import DashboardOptionIcon from '@/assets/icon/icon-dashboard-option.svg';
import DashboardIcon from '@/assets/icon/icon-dashboard.svg';
import LayoutIcon from '@/assets/icon/icon-layout.svg';
import ReviewOptionIcon from '@/assets/icon/icon-review-option.svg';
import TitleIcon from '@/assets/icon/icon-title.svg';

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
    name: '대시보드 옵션',
    pathname: '/dashboard/option',
    caption: '대시보드 화면의 요소들을 활성화 또는 비활성화 할 수 있습니다.',
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
    caption: '리뷰 전체 영역을 설정합니다.',
    icon: ContainerIcon as SVGIcon,
  },
  {
    name: 'Column',
    pathname: '/setting/design/column',
    caption: '베스트리뷰, 통계, 이미지/동영상, 리뷰 영역을 설정합니다.',
    icon: ColumnIcon as SVGIcon,
  },
  {
    name: 'Title',
    pathname: '/setting/design/title',
    caption: '리뷰 전체 영역 상단의 타이틀 및 설명글을 설정합니다.',
    icon: TitleIcon as SVGIcon,
  },
  {
    name: '리뷰 쓰기 디자인',
    pathname: '/setting/design/review-write',
    caption: '리뷰 쓰기 영역의 디자인을 원하는대로 정할 수 있어요.',
    icon: ReviewOptionIcon as SVGIcon,
  },
  {
    name: '리뷰 보기 디자인',
    pathname: '/setting/design/review-list',
    caption: '리뷰 보기 영역의 디자인을 원하는대로 정할 수 있어요.',
    icon: ReviewOptionIcon as SVGIcon,
  },
  // {
  //   name: 'Custom Font',
  //   pathname: '/setting/design/font',
  //   icon: CustomFontIcon as SVGIcon,
  // },
  // {
  //   name: 'Custom CSS',
  //   pathname: '/setting/design/css',
  //   icon: CustomCSSIcon as SVGIcon,
  // },
  // {
  //   name: 'Naver API',
  //   pathname: '/setting/naver-api',
  //   icon: NaverApiIcon as SVGIcon,
  // },
];
