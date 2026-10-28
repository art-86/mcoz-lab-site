/* Adapted from the user-provided Yandex widget cropping script.
   The existing responsive map container is the clipping wrapper. */
(function () {
  const container = document.querySelector('#contacts .clinic-map');
  if (!container) return;
  const CUT = 130;
  function cropYandexMap() {
    const iframe = container.querySelector('iframe');
    if (!iframe || !/https:\/\/[^/]*yandex\.[^/]+\//.test(iframe.src)) return;
    const height = container.clientHeight;
    if (!height) return;
    const target = (height + CUT) + 'px';
    if (iframe.style.height !== target) iframe.style.setProperty('height', target, 'important');
    iframe.style.setProperty('width', '100%', 'important');
    iframe.style.setProperty('display', 'block');
    iframe.title = 'Карта проезда к Международному центру охраны здоровья';
  }
  new MutationObserver(cropYandexMap).observe(container, {childList:true, subtree:true});
  new ResizeObserver(cropYandexMap).observe(container);
  window.addEventListener('load', cropYandexMap);
  cropYandexMap();
})();
