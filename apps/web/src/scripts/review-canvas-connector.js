const reviewCanvasURL = 'https://web.review-canvas.com';

const initializeReviewCanvas = () => {
  const $container = document.querySelector('#review-canvas-container');
  const productID = document.querySelector('meta[property="product:productId"]')?.content;
  if (!$container || !productID) return;

  const $iframe = document.createElement('iframe');
  $iframe.src = new URL(`/products/${productID}/reviews`, reviewCanvasURL).toString();
  $iframe.dataset.reviewCanvas = 'list';
  $iframe.dataset.connected = 'false';
  $iframe.style.width = '100%';
  $iframe.style.height = '100%';
  $iframe.style.border = 'none';

  $container.appendChild($iframe);
};

window.addEventListener('load', () => {
  initializeReviewCanvas();
});

window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'ready') return;

  const $element = document.querySelector(`iframe[data-review-canvas="${evt.data.payload}"][data-connected="false"]`);
  const mallID = CAFE24?.SHOP?.getMallID();
  if (!$element || !($element instanceof HTMLIFrameElement) || !mallID) return;
  $element.dataset.connected = 'true';
  $element.contentWindow.postMessage({ type: 'connect', payload: mallID }, evt.origin);
});
//
// window.addEventListener('message', (evt) => {
//   if (evt.origin !== reviewCanvasURL || evt.data.type !== 'open-review-detail') return;
//
//   const $dim = document.createElement('div');
//   $dim.id = 'review-detail-container';
//   $dim.style.position = 'fixed';
//   $dim.style.top = '0';
//   $dim.style.left = '0';
//   $dim.style.width = '100%';
//   $dim.style.height = '100%';
//   $dim.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
//   $dim.style.display = 'flex';
//   $dim.style.justifyContent = 'center';
//   $dim.style.alignItems = 'center';
//   $dim.style.zIndex = '9999';
//   $dim.style.cursor = 'pointer';
//   $dim.addEventListener('click', () => {
//     $dim.remove();
//   });
//
//   const $iframe = document.createElement('iframe');
//   $iframe.dataset.reviewCanvas = 'detail';
//   $iframe.dataset.connected = 'false';
//   $iframe.src = evt.data.payload;
//   $iframe.style.width = '80%';
//   $iframe.style.height = '80%';
//   $iframe.style.border = 'none';
//
//   $dim.appendChild($iframe);
//   document.body.appendChild($dim);
// });
//
// window.addEventListener('message', (evt) => {
//   if (evt.origin !== reviewCanvasURL || evt.data.type !== 'close-review-detail') return;
//
//   document.querySelector('#review-detail-container')?.remove();
// });
