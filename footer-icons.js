(function () {
  'use strict';
  var email = 'artpablo88@gmail.com';
  document.querySelectorAll('.footer-copy-email').forEach(function (button) {
    var status = button.closest('footer').querySelector('.footer-copy-status');
    var timer;
    button.addEventListener('click', async function () {
      var copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try { await navigator.clipboard.writeText(email); copied = true; } catch (error) { /* Try local fallback. */ }
      }
      if (!copied) {
        var field = document.createElement('textarea');
        field.value = email;
        field.style.cssText = 'position:fixed;top:0;left:-9999px';
        document.body.appendChild(field);
        field.select();
        try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
        field.remove();
        button.focus({preventScroll: true});
      }
      var english = document.documentElement.lang === 'en';
      status.textContent = copied
        ? (english ? 'Email copied' : 'Correo copiado')
        : (english ? 'Copy manually: ' : 'Copia manualmente: ') + email;
      clearTimeout(timer);
      if (copied) timer = setTimeout(function () { status.textContent = ''; }, 3500);
    });
  });
})();
