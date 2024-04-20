let $iframe;
const reviewCanvasURL = 'http://localhost:3000';

window.addEventListener('load', () => {
  const $container = document.querySelector('#review-canvas-container');
  // eslint-disable-next-line no-console -- 샵에게 알림을 보내기 위해 console.error 사용
  if (!$container) return console.error('No container found');

  $iframe = document.createElement('iframe');
  $iframe.src = reviewCanvasURL;
  $iframe.style.width = '100%';
  $iframe.style.height = '100%';
  $iframe.style.border = 'none';

  $container.appendChild($iframe);
});
window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'review-canvas-ready') return;

  const shopId = new URLSearchParams(window.location.search).get('id');
  $iframe.contentWindow.postMessage({ type: 'connect', payload: { shopId } }, evt.origin);
});
