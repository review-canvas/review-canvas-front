const ADJUST_HEIGHT = 'adjust-height';
const READY = 'ready';
const OPEN_MODAL = 'open-modal';
const OPEN_SELECTING_MODAL = 'open-selecting-modal';
const CLOSE_MODAL = 'close-modal';

export const MESSAGE_TYPES = {
  ADJUST_HEIGHT,
  READY,
  OPEN_MODAL,
  OPEN_SELECTING_MODAL,
  CLOSE_MODAL,
};

export const sendMessageToShop = (
  shopDomain: string,
  type: (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES],
  payload?: unknown,
) => {
  window.parent.postMessage({ type, payload }, shopDomain);
};

export const broadcastMessageToParent = (
  type: (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES],
  payload?: unknown,
) => {
  window.parent.postMessage({ type, payload }, '*');
};
