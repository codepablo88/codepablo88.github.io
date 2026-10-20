(function () {
  'use strict';
  var images = document.querySelectorAll('[data-preview-src]');
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  function update() {
    images.forEach(function (image) {
      image.src = preference.matches ? image.dataset.staticSrc : image.dataset.previewSrc;
    });
  }
  preference.addEventListener('change', update);
  update();
})();
