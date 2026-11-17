// Preserve bookmarks to sections that now have their own page.
(function () {
  var sections = {proyectos: 'projects.html', trabajos: 'works.html', prototyping: 'prototyping.html'};
  var section = window.location.hash.slice(1);
  if (sections[section]) window.location.replace(sections[section] + window.location.search + '#' + section);
})();
