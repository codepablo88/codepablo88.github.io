(function () {
  'use strict';
  var iframe = document.getElementById('fingerboard-vimeo');
  if (!iframe) return;
  function fallback() {
    iframe.src = iframe.src.replace('controls=0', 'controls=1');
  }
  if (!window.Vimeo) { fallback(); return; }
  var player = new Vimeo.Player(iframe);
  var wrapper = iframe.closest('.vimeo-clean-player');
  var controls = wrapper.querySelector('.vimeo-custom-controls');
  var play = controls.querySelector('[data-video-play]');
  var seek = controls.querySelector('[data-video-seek]');
  var mute = controls.querySelector('[data-video-mute]');
  var status = wrapper.querySelector('[role="status"]');
  var paused = true;
  var muted = false;
  var duration = 0;
  function label(es, en) { return document.documentElement.lang === 'en' ? en : es; }
  function report() {
    status.textContent = label('No se ha podido completar la acción del vídeo.', 'The video action could not be completed.');
  }
  function labels() {
    play.setAttribute('aria-label', paused ? label('Reproducir', 'Play') : label('Pausar', 'Pause'));
    mute.setAttribute('aria-label', muted ? label('Activar sonido', 'Unmute') : label('Silenciar', 'Mute'));
    seek.setAttribute('aria-label', label('Posición del vídeo', 'Video position'));
    controls.querySelector('[data-video-fullscreen]').setAttribute('aria-label', label('Pantalla completa', 'Fullscreen'));
  }
  play.addEventListener('click', function () {
    (paused ? player.play() : player.pause()).catch(report);
  });
  mute.addEventListener('click', function () {
    player.setMuted(!muted).then(function (value) { muted = value; mute.textContent = muted ? '×' : '♪'; labels(); }).catch(report);
  });
  seek.addEventListener('input', function () {
    if (duration) player.setCurrentTime(Number(seek.value) * duration / 100).catch(report);
  });
  controls.querySelector('[data-video-fullscreen]').addEventListener('click', function () {
    var action = document.fullscreenElement ? document.exitFullscreen()
      : wrapper.requestFullscreen ? wrapper.requestFullscreen() : player.requestFullscreen();
    if (action && action.catch) action.catch(report);
  });
  player.on('play', function () { paused = false; play.textContent = 'Ⅱ'; labels(); });
  player.on('pause', function () { paused = true; play.textContent = '▶'; labels(); });
  player.on('ended', function () { paused = true; play.textContent = '▶'; labels(); });
  player.on('timeupdate', function (event) { duration = event.duration; seek.value = event.percent * 100; });
  player.ready().then(function () {
    controls.hidden = false;
    labels();
    player.getDuration().then(function (value) { duration = value; }).catch(report);
  }).catch(fallback);
  new MutationObserver(labels).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
})();
