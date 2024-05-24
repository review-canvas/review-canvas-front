'use client';

import { useOverlayAction } from '@/store/overlay.ts';

function DemoPage() {
  const { openOverlay } = useOverlayAction();

  return (
    <main className="flex flex-col gap-4">
      <button
        className="border border-gray-500 px-2 py-1"
        onClick={() => {
          openOverlay('test', <div className="bg-white">test</div>);
        }}
        type="button"
      >
        예시 1 : 모달 열기
      </button>
      <button
        className="border border-gray-500 px-2 py-1"
        onClick={() => {
          openOverlay(
            'test',
            <div className="bg-white">
              test
              <button
                className="border border-gray-500 px-2 py-1"
                onClick={() => {
                  openOverlay('test2', <div className="bg-blue-200">test2</div>, { position: 'S' });
                }}
                type="button"
              >
                다음 모달 열기
              </button>
            </div>,
          );
        }}
        type="button"
      >
        예시 2 : 모달 안에서 모달 열기
      </button>
      <button
        className="border border-gray-500 px-2 py-1"
        onClick={() => {
          openOverlay(
            'test',
            <div className="bg-white">
              test
              <button
                className="border border-gray-500 px-2 py-1"
                onClick={() => {
                  openOverlay('test', <div className="bg-blue-200">test2</div>, { position: 'S' });
                }}
                type="button"
              >
                다음 모달 열기
              </button>
            </div>,
          );
        }}
        type="button"
      >
        예시 3 : 모달 교체하기
      </button>
      <button
        className="border border-gray-500 px-2 py-1"
        onClick={() => {
          openOverlay('test', <div className="bg-blue-200">test2</div>, { disposable: false });
        }}
        type="button"
      >
        예시 4 : 모달 안닫히게 하기
      </button>
    </main>
  );
}

export default DemoPage;
