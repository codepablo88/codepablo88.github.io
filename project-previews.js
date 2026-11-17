(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(hover: none), (pointer: coarse)');
  var entries = [];
  document.querySelectorAll('[data-preview-src], [data-hover-preview-src]').forEach(function (image) {
    var card = image.closest('.directory-card, .case-study, .work-development-row, .contact-call-media') || image;
    var still = image.dataset.staticSrc || image.getAttribute('src');
    var preview = image.dataset.previewSrc || image.dataset.hoverPreviewSrc;
    var hoverOnly = image.hasAttribute('data-hover-preview-src');
    var state = {pointer: null, hovered: false, focused: false, touch: false};
    function update() {
      var active = mobile.matches || state.touch
        ? state.pointer !== null : !hoverOnly || state.hovered || state.focused;
      var source = !reduced.matches && active ? preview : still;
      if (image.getAttribute('src') !== source) image.setAttribute('src', source);
    }
    state.update = update;
    entries.push(state);
    card.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') {
        state.touch = true;
        state.pointer = event.pointerId;
        update();
      }
    }, {passive: true});
    card.addEventListener('pointerenter', function (event) {
      if (event.pointerType === 'mouse') { state.touch = false; state.hovered = true; update(); }
    });
    card.addEventListener('pointerleave', function () {
      state.pointer = null; state.hovered = false; update();
    });
    card.addEventListener('focusin', function () { state.focused = true; update(); });
    card.addEventListener('focusout', function (event) {
      if (!card.contains(event.relatedTarget)) { state.focused = false; update(); }
    });
    image.addEventListener('error', function () {
      if (image.getAttribute('src') !== still) image.setAttribute('src', still);
    });
    update();
  });
  function release(event) {
    entries.forEach(function (state) {
      if (event && event.pointerId !== undefined && state.pointer !== event.pointerId) return;
      state.pointer = null; state.hovered = false; state.focused = false; state.update();
    });
  }
  window.addEventListener('pointerup', release, {passive: true});
  window.addEventListener('pointercancel', release, {passive: true});
  window.addEventListener('blur', function () { release(); });
  window.addEventListener('pagehide', function () { release(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) release(); });
  reduced.addEventListener('change', function () { release(); });
  mobile.addEventListener('change', function () { release(); });
})();
