'use client';

import React from 'react';

import { Global } from '@emotion/react';
import { css, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css({});

function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <Global styles={customStyles} />
    </>
  );
}

export default GlobalStyles;
