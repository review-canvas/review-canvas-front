import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import tw, { styled } from 'twin.macro';

interface CodeClipboardProps {
  contentToCopy: string;
  label?: string;
  rows?: number;
}

const ReadOnlyTextarea = styled.textarea`
  ${tw`w-full p-2 border border-gray-300 text-sm rounded-5`}
  font-family: var(--roboto);
  resize: none;
  background-color: transparent;
`;

const CopyButton = styled.button`
  ${tw`absolute bg-gray-700 text-white text-sm border-none py-1 px-3 cursor-pointer rounded-5`}

  font-family: var(--noto-sans-kr);
  top: 10px;
  right: 10px;

  &:hover {
    ${tw`bg-gray-900`}
  }
`;

function CodeClipboard({ contentToCopy, label, rows = 4 }: CodeClipboardProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div tw="flex flex-col">
      {label ? <label tw="text-[#9692A7] text-sm mb-2">{label}</label> : null}

      <div tw="relative">
        <ReadOnlyTextarea
          readOnly
          value={contentToCopy}
          rows={rows}
        />

        <CopyToClipboard
          text={contentToCopy}
          onCopy={() => {
            setCopied(true);
          }}
        >
          <CopyButton>{copied ? '복사 완료' : '복사'}</CopyButton>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default CodeClipboard;
