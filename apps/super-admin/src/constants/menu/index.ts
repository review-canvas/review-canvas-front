import type { SVGProps, FunctionComponent } from 'react';

import { ADMIN_MENU_MAP } from './main-menu';
import { ADMIN_SUB_MENU_MAP } from './sub-menu';

type SVGIcon = FunctionComponent<SVGProps<SVGSVGElement>>;

interface AdminMenuItem {
  name: string;
  pathname?: string;
  caption?: string;
  icon?: SVGIcon;
}

const transformedSubMenus: AdminMenuItem[] = ADMIN_SUB_MENU_MAP.map(({ name, pathname }) => ({
  name,
  pathname,
}));

const ADMIN_TOTAL_MENU_MAP: AdminMenuItem[] = [...ADMIN_MENU_MAP, ...transformedSubMenus];

export { ADMIN_MENU_MAP, ADMIN_SUB_MENU_MAP, ADMIN_TOTAL_MENU_MAP };
