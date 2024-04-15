'use client';

import '@review-canvas/admin-ui/styles.css';
import './globals.css';

import React from 'react';

import { ThemeProvider } from '@emotion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import tw from 'twin.macro';

import theme from '@review-canvas/admin-ui/theme';

import GlobalStyles from '@/components/global-styles.tsx';
import { ADMIN_MENU_MAP } from '@/constants/menu';
import { notoSansKR, roboto } from '@/theme/font.ts';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentPathname = usePathname();
  const currentPathInfo = ADMIN_MENU_MAP.filter((menu) => menu.pathname === currentPathname)[0] || ADMIN_MENU_MAP[0];

  const isActive = (path: string) => {
    return currentPathname === path;
  };

  return (
    <html
      className={`${roboto.className} ${notoSansKR.className}`}
      lang="ko"
    >
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyles />

          <div tw="flex h-screen">
            <aside
              tw="w-64"
              aria-label="Sidebar"
            >
              <div tw="px-3 bg-white">
                <div tw="flex justify-center items-end h-24 ml-3 mb-3 border-b-[1px] border-b-main-quaternary">
                  {/* <Image
                    src={''}
                    alt={''}
                    width={20}
                    height={20}
                    layout="fill"
                  /> */}
                  <div tw="flex w-full gap-[11px] items-center mb-7">
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
              </div>
            </aside>

            <main tw="flex-1 bg-sub-secondary px-[15px]">
              <header tw="flex items-end h-24 mb-3 border-b-[2px] border-b-black">
                <span tw="ml-3 mb-3 text-xl">{currentPathInfo.name}</span>
              </header>
              <div tw="">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
