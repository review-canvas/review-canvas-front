'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import tw from 'twin.macro';

import { ADMIN_TOTAL_MENU_MAP, ADMIN_MENU_MAP, ADMIN_SUB_MENU_MAP } from '@/constants/menu';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentPathname = usePathname();
  const currentPathInfo =
    ADMIN_TOTAL_MENU_MAP.filter((menu) => menu.pathname === currentPathname)[0] || ADMIN_TOTAL_MENU_MAP[0];

  const isActive = (path: string) => {
    return currentPathname === path;
  };

  return (
    <div tw="flex min-h-screen h-full">
      <aside
        tw="w-64"
        aria-label="Sidebar"
      >
        <div tw="px-3 bg-white">
          <div tw="flex justify-center items-end h-24 mb-3 border-b-[1px] border-b-main-quaternary">
            {/* <Image
                src={''}
                alt={''}
                width={20}
                height={20}
                layout="fill"
              /> */}
            <div tw="flex w-full gap-[11px] items-center mb-7 ml-3">
              <div tw="bg-main-secondary rounded-lg w-8 h-8" />
              <span tw="text-ml">Shop Name</span>
            </div>
          </div>

          <ul tw="space-y-2">
            {ADMIN_MENU_MAP.map(({ name, pathname, icon: Icon }) => {
              return (
                <li key={pathname}>
                  <Link
                    href={pathname}
                    tw="flex items-center p-2 text-base font-medium rounded-lg gap-2"
                    css={isActive(pathname) ? tw`text-main-primary` : tw`text-main-quaternary`}
                  >
                    <Icon css={isActive(pathname) ? tw`[&_path]:fill-main-primary` : null} />
                    <span>{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul tw="mt-10 pt-4 border-t-[1px] border-t-main-quaternary">
            {ADMIN_SUB_MENU_MAP.map(({ key, name, pathname, action }) => {
              const renderMenuItem = () => {
                if (action) {
                  return <button onClick={action}>{name}</button>;
                } else if (pathname) {
                  return <Link href={pathname}>{name}</Link>;
                }

                return null;
              };

              return (
                <li
                  tw="flex items-center px-3 py-2 text-base font-medium rounded-lg gap-2"
                  css={pathname && isActive(pathname) ? tw`text-main-primary` : tw`text-main-quaternary`}
                  key={key}
                >
                  {renderMenuItem()}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <main tw="flex-1 h-full min-h-screen bg-sub-secondary px-[15px] pb-16">
        <header tw="flex flex-col justify-end h-24 pl-3 pb-3 border-b-[2px] border-b-black">
          <span tw="text-2xl mb-1">{currentPathInfo.name}</span>
          {currentPathInfo.caption ? <span tw="text-base text-stone-400">{currentPathInfo.caption}</span> : null}
        </header>
        <div tw="h-full">{children}</div>
      </main>
    </div>
  );
}
