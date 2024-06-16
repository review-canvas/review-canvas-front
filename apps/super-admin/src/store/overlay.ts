import { create } from 'zustand';

export interface OverlayOption {
  /** 기본값은 true
   * true: backdrop 클릭시 overlay 닫힘 <br>
   * false: backdrop 클릭시 overlay 닫히지 않음
   *  */
  disposable?: boolean;
  /** 기본값은 C <br>
   * N: top <br>
   * NE: top right <br>
   * E: right <br>
   * SE: bottom right <br>
   * S: bottom <br>
   * SW: bottom left <br>
   * W: left <br>
   * NW: top left <br>
   * C: center
   *  */
  position?: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'C';
}

export interface Overlay {
  component: React.ReactElement | null;
  options: Required<OverlayOption>;
}

interface OverlayStore {
  overlays: Map<string, Overlay>;
}

interface OverlayAction {
  openOverlay: (key: string, component: Overlay['component'], options?: OverlayOption) => void;
  closeOverlay: (...keys: string[]) => void;
}

export const useOverlay = create<OverlayStore & OverlayAction>((set, get) => ({
  overlays: new Map(),
  openOverlay: (key, component, options) => {
    const overlays = get().overlays;
    overlays.set(key, {
      component,
      options: {
        position: options?.position ?? 'C',
        disposable: options?.disposable ?? true,
      },
    });
    set({ overlays: new Map(overlays) });
  },
  closeOverlay: (...keys) => {
    const overlays = get().overlays;
    keys.forEach((key) => {
      overlays.delete(key);
    });
    set({ overlays: new Map(overlays) });
  },
}));

export const useOverlayAction = () => {
  return useOverlay((state) => ({
    openOverlay: state.openOverlay,
    closeOverlay: state.closeOverlay,
  }));
};

export const useOverlayObserver = () => {
  return useOverlay((state) => ({ overlays: state.overlays }));
};
