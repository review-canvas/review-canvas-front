export const sendMessageToShop = (shopDomain: string, type: string, payload?: unknown) => {
  window.parent.postMessage({ type, payload }, shopDomain);
};
