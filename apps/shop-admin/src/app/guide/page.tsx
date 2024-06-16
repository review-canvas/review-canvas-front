'use client';

import CodeClipboard from '@/components/common/code-clipboard';
import useAuthCheck from '@/hooks/use-auth-check';

function GuidePage() {
  useAuthCheck();

  const detailProductPageCode = `<div module="Layout_stateLogon" class="userId" style="display:none;">{$id}</div>
<div id="rvcv-container" style="width:100%;height: 500px;" data-url="/products/{productID}/reviews"></div>`;

  const mypageCode = `<div module="Layout_stateLogon" class="userId" style="display:none;">{$id}</div>
<div id="rvcv-container" style="width:100%;height: 500px;" data-url="/mypage"></div>`;

  return (
    <div tw="flex flex-col w-full px-3 py-6 gap-5">
      <CodeClipboard
        contentToCopy='<script src="https://web.review-canvas.com/cafe24-connector.js" async cross></script>'
        label="공통 Head"
      />

      <CodeClipboard
        contentToCopy={detailProductPageCode}
        label="상품 상세 페이지"
      />

      <CodeClipboard
        contentToCopy={mypageCode}
        label="마이페이지"
      />
    </div>
  );
}

export default GuidePage;
