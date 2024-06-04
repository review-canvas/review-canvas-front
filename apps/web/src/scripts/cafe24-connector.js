const reviewCanvasURL = 'https://web.review-canvas.com';
let $reviewCanvasContainer;
const URL_VARIABLES = {
  userID: null,
  productID: null,
};

const initializeReviewCanvas = () => {
  if (!$reviewCanvasContainer) return;
  const url = replacePlaceholders($reviewCanvasContainer.dataset.url, URL_VARIABLES);

  const $iframe = document.createElement('iframe');
  $iframe.src = new URL(url, reviewCanvasURL).toString();
  $iframe.dataset.reviewCanvas = 'list';
  $iframe.dataset.connected = 'false';
  $iframe.style.width = '100%';
  $iframe.style.height = '100%';
  $iframe.style.border = 'none';

  $reviewCanvasContainer.appendChild($iframe);
};
const initializeDiv = (evt) => {
  const $dim = document.createElement('div');
  $dim.id = 'rvcv-modal-dim';
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
    // body scroll unlock
    document.body.style.overflow = '';
    refreshItems(evt);
    $dim.remove();
  });
  return $dim;
};

window.addEventListener('load', () => {
  $reviewCanvasContainer = document.querySelector('#rvcv-container');
  URL_VARIABLES.productID = document.querySelector('meta[property="product:productId"]')?.content;
  URL_VARIABLES.userID = document.querySelector('.xans-layout-statelogon.userId > span')?.textContent;
  initializeReviewCanvas();
});

window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'adjust-height') return;

  if (!$reviewCanvasContainer) return;
  $reviewCanvasContainer.style.height = evt.data.payload;
});

window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'ready') return;
  const $element = document.querySelector(`iframe[data-review-canvas="${evt.data.payload}"][data-connected="false"]`);
  const mallID = CAFE24?.SHOP?.getMallID();
  if (!$element || !($element instanceof HTMLIFrameElement) || !mallID) return;
  $element.dataset.connected = 'true';
  $element.contentWindow.postMessage(
    { type: 'connect', payload: { mallID, userID: URL_VARIABLES.userID } },
    evt.origin,
  );
});

window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'open-modal') return;
  // body scroll lock
  document.body.style.overflow = 'hidden';
  const $dim = initializeDiv(evt);
  const $iframe = document.createElement('iframe');
  $iframe.dataset.reviewCanvas = evt.data.payload.type;
  $iframe.dataset.connected = 'false';
  $iframe.src = new URL(evt.data.payload.url, reviewCanvasURL).toString();
  $iframe.style.width = '80%';
  $iframe.style.height = '80%';
  $iframe.style.border = 'none';
  $iframe.style.background = 'white';

  $dim.appendChild($iframe);
  document.body.appendChild($dim);
});

window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'open-selecting-modal') return;
  // body scroll lock
  document.body.style.overflow = 'hidden';

  const $dim = initializeDiv(evt);

  const $iframe = document.createElement('iframe');
  $iframe.dataset.reviewCanvas = evt.data.payload.type;
  $iframe.dataset.connected = 'false';
  $iframe.src = new URL(evt.data.payload.url, reviewCanvasURL).toString();
  $iframe.style.width = '40%';
  $iframe.style.height = '30%';
  $iframe.style.border = 'none';
  $iframe.style.background = 'white';

  $dim.appendChild($iframe);
  document.body.appendChild($dim);
});

window.addEventListener('message', (evt) => {
  if (evt.origin !== reviewCanvasURL || evt.data.type !== 'close-modal') return;
  // body scroll unlock
  document.body.style.overflow = '';

  refreshItems(evt);
  const elements = document.querySelectorAll('#rvcv-modal-dim');
  if (elements.length > 0) {
    const lastElement = elements[elements.length - 1];
    lastElement.parentNode.removeChild(lastElement);
  }
});

const refreshItems = (evt) => {
  $reviewCanvasContainer.firstChild.contentWindow.postMessage('refresh', evt.origin);
  document.querySelectorAll('#rvcv-modal-dim').forEach((modalDim) => {
    modalDim.querySelector('iframe')?.contentWindow.postMessage('refresh', evt.origin);
  });
};

function replacePlaceholders(str, data) {
  return str.replace(/\{([^}]+)}/g, (match, key) => {
    return data.hasOwnProperty(key) && Boolean(data[key]) ? data[key] : match;
  });
}
