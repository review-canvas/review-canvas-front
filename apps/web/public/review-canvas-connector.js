const reviewCanvasURL = 'http://localhost:3000';

window.addEventListener('load', () => {
  const $container = document.querySelector('#review-canvas-container');
  // eslint-disable-next-line no-console -- 샵에게 알림을 보내기 위해 console.error 사용
  if (!$container) return console.error('No container found');

  const $iframe = document.createElement('iframe');
  $iframe.src = reviewCanvasURL;
  $iframe.dataset.reviewCanvas = 'list';
  $iframe.dataset.connected = 'false';
  $iframe.style.width = '100%';
  $iframe.style.height = '100%';
  $iframe.style.border = 'none';

  $container.appendChild($iframe);
});

window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'review-canvas-connected') return;
  const $element = document.querySelector(`iframe[data-review-canvas="${evt.data.payload}"]`);
  if (!$element) return;
  $element.dataset.connected = 'true';
});
window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'review-canvas-ready') return;

  const shopId = new URLSearchParams(location.search).get('id');
  document.querySelectorAll('iframe[data-review-canvas][data-connected="false"]').forEach(($reviewCanvasIframe) => {
    $reviewCanvasIframe.contentWindow.postMessage({ type: 'review-canvas-connect', payload: shopId }, evt.origin);
  });
});

window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'open-review-detail') return;

  const $dim = document.createElement('div');
  $dim.id = 'review-detail-container';
  $dim.style.position = 'fixed';
  $dim.style.top = '0';
  $dim.style.left = '0';
  $dim.style.width = '100%';
  $dim.style.height = '100%';
  $dim.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  $dim.style.display = 'flex';
  $dim.style.justifyContent = 'center';
  $dim.style.alignItems = 'center';
  $dim.style.zIndex = '9999';
  $dim.style.cursor = 'pointer';
  $dim.addEventListener('click', () => {
    $dim.remove();
  });

  const $iframe = document.createElement('iframe');
  $iframe.dataset.reviewCanvas = 'detail';
  $iframe.dataset.connected = 'false';
  $iframe.src = evt.data.payload;
  $iframe.style.width = '80%';
  $iframe.style.height = '80%';
  $iframe.style.border = 'none';

  $dim.appendChild($iframe);
  document.body.appendChild($dim);
});

window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'close-review-detail') return;

  document.querySelector('#review-detail-container')?.remove();
});
