(function () {
  'use strict';
  var images = document.querySelectorAll('[data-preview-src]');
  var button = document.getElementById('project-preview-toggle');
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var paused = preference.matches;
  function update() {
    images.forEach(function (image) {
      image.src = paused ? image.dataset.staticSrc : image.dataset.previewSrc;
    });
    button.setAttribute('aria-pressed', String(paused));
    var english = document.documentElement.lang === 'en';
    button.textContent = paused
      ? (english ? 'Resume animations' : 'Reanudar animaciones')
      : (english ? 'Pause animations' : 'Pausar animaciones');
  }
  button.hidden = false;
  button.addEventListener('click', function () { paused = !paused; update(); });
  preference.addEventListener('change', function (event) { paused = event.matches; update(); });
  new MutationObserver(update).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  // Run after the deferred language selector has applied the saved language.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', update);
  else update();
})();
