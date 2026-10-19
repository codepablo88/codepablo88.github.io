// Shared carousel controls for the section pages.
['prototype', 'works'].forEach(function (name) {
  var track = document.getElementById(name + '-track');
  if (!track) return;
  var viewport = track.parentElement;
  function updateEdges() {
    viewport.classList.toggle('is-scrolled', track.scrollLeft > track.clientWidth * .08);
    viewport.classList.toggle('is-at-end', track.scrollLeft + track.clientWidth >= track.scrollWidth - 8);
  }
  document.querySelectorAll('[data-' + name + '-direction]').forEach(function (button) {
    button.addEventListener('click', function () {
      var card = track.firstElementChild;
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollBy({left: (card.offsetWidth + gap) * Number(button.getAttribute('data-' + name + '-direction')), behavior: reducedMotion ? 'auto' : 'smooth'});
    });
  });
  track.addEventListener('scroll', updateEdges, {passive: true});
  window.addEventListener('resize', updateEdges);
  updateEdges();
});
