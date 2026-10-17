/* Keep original text nodes so switching languages preserves links and formatting. */
(function () {
  'use strict';
  var translations = window.portfolioEnglish || {};
  var textEntries = [];
  var attributeEntries = [];
  var walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  var node;
  while ((node = walker.nextNode())) {
    if (node.parentElement.closest('script, style, .language-switcher')) continue;
    var key = node.nodeValue.trim();
    if (Object.prototype.hasOwnProperty.call(translations, key)) {
      textEntries.push({node: node, original: node.nodeValue, key: key});
    }
  }
  document.querySelectorAll('[alt], [title], [aria-label], [placeholder], meta[name="description"]').forEach(function (element) {
    ['alt', 'title', 'aria-label', 'placeholder', 'content'].forEach(function (attribute) {
      var original = element.getAttribute(attribute);
      if (Object.prototype.hasOwnProperty.call(translations, original)) {
        attributeEntries.push({element: element, attribute: attribute, original: original});
      }
    });
  });
  var buttons = document.querySelectorAll('[data-language]');
  var switcher = document.querySelector('.language-switcher');
  var language = 'es';
  try { language = localStorage.getItem('portfolio-language') || 'es'; } catch (error) { /* Storage may be disabled. */ }
  var requested = new URLSearchParams(window.location.search).get('lang');
  if (requested === 'es' || requested === 'en') language = requested;

  function setLanguage(selected) {
    language = selected === 'en' ? 'en' : 'es';
    document.documentElement.lang = language;
    textEntries.forEach(function (entry) {
      entry.node.nodeValue = language === 'en'
        ? entry.original.replace(entry.key, function () { return translations[entry.key]; })
        : entry.original;
    });
    attributeEntries.forEach(function (entry) {
      entry.element.setAttribute(entry.attribute, language === 'en' ? translations[entry.original] : entry.original);
    });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    switcher.setAttribute('aria-label', language === 'en' ? 'Select language' : 'Seleccionar idioma');
    // Carry the selection through links even when local storage is unavailable.
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!/^[^:?#]*\.html(?:[?#]|$)/i.test(href)) return;
      var target = new URL(href, window.location.href);
      target.searchParams.set('lang', language);
      link.setAttribute('href', target.pathname.split('/').pop() + target.search + target.hash);
    });
    try { localStorage.setItem('portfolio-language', language); } catch (error) { /* Navigation links retain the selection. */ }
  }
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      setLanguage(button.dataset.language);
      // Keep reloads consistent with an explicit language in the current URL.
      try {
        var current = new URL(window.location.href);
        current.searchParams.set('lang', language);
        history.replaceState(null, '', current.href);
      } catch (error) { /* Local files may disallow history changes. */ }
    });
  });
  setLanguage(language);
})();
