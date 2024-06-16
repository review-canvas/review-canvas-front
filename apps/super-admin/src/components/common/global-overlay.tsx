import { useEffect } from 'react';

import { css, styled } from 'twin.macro';

import { type OverlayOption, useOverlay } from '@/store/overlay.ts';

export default function GlobalOverlay() {
  const { overlays, closeOverlay } = useOverlay();

  const overlayEntries = Array.from(overlays.entries());
  const backdropDisposableKey = overlayEntries.findLast(([_, value]) => value.options.disposable)?.[0] ?? null;

  const hasOverlays = overlays.size > 0;
  useEffect(() => {
    if (!hasOverlays) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasOverlays]);

  return hasOverlays ? (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- This is background overlay
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 h-full w-full"
      onClick={(evt) => {
        if (!backdropDisposableKey || evt.target !== evt.currentTarget) return;
        closeOverlay(backdropDisposableKey);
      }}
      onKeyDown={(evt) => {
        if (!backdropDisposableKey || evt.key !== 'Escape') return;
        closeOverlay(backdropDisposableKey);
      }}
    >
      {overlayEntries.map(([key, value]) => (
        <OverlayContainer
          key={key}
          position={value.options.position}
        >
          {value.component}
        </OverlayContainer>
      ))}
    </div>
  ) : null;
}

const OverlayContainer = styled.div<Pick<Required<OverlayOption>, 'position'>>`
  position: absolute;
  ${({ position }) => {
    switch (position) {
      case 'N':
        return css`
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'NE':
        return css`
          top: 0;
          right: 0;
        `;
      case 'E':
        return css`
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        `;
      case 'SE':
        return css`
          bottom: 0;
          right: 0;
        `;
      case 'S':
        return css`
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'SW':
        return css`
          bottom: 0;
          left: 0;
        `;
      case 'W':
        return css`
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        `;
      case 'NW':
        return css`
          top: 0;
          left: 0;
        `;
      default:
        return css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `;
    }
  }}
`;
