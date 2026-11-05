// Preserve bookmarks to sections that now have their own page.
(function () {
  var sections = {proyectos: 'projects.html', trabajos: 'works.html', prototyping: 'prototyping.html'};
  var section = window.location.hash.slice(1);
  if (sections[section]) window.location.replace(sections[section] + window.location.search + '#' + section);
})();

// Play section previews only while their card is hovered or keyboard focused.
(function () {
  'use strict';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.directory-card').forEach(function (card) {
    var image = card.querySelector('[data-hover-preview-src]');
    if (!image) return;
    var staticSrc = image.getAttribute('src');
    var hovered = false;
    var focused = false;
    function update() {
      var source = !reducedMotion.matches && (hovered || focused)
        ? image.dataset.hoverPreviewSrc : staticSrc;
      if (image.getAttribute('src') !== source) image.setAttribute('src', source);
    }
    card.addEventListener('mouseenter', function () { hovered = true; update(); });
    card.addEventListener('mouseleave', function () { hovered = false; update(); });
    card.addEventListener('focusin', function () { focused = true; update(); });
    card.addEventListener('focusout', function (event) {
      if (!card.contains(event.relatedTarget)) { focused = false; update(); }
    });
    image.addEventListener('error', function () {
      if (image.getAttribute('src') !== staticSrc) image.setAttribute('src', staticSrc);
    });
    reducedMotion.addEventListener('change', update);
  });
})();
