/* Słodki Chłód WHC — obsługa menu na telefonie i animacji przy przewijaniu */
(function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu-gl');

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var otwarte = menu.classList.toggle('otwarte');
      burger.setAttribute('aria-expanded', otwarte ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('otwarte');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var ruch = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var elementy = document.querySelectorAll('.reveal');

  if (ruch || !('IntersectionObserver' in window)) {
    elementy.forEach(function (el) { el.classList.add('jest'); });
    return;
  }

  var obs = new IntersectionObserver(function (wpisy) {
    wpisy.forEach(function (w) {
      if (w.isIntersecting) {
        w.target.classList.add('jest');
        obs.unobserve(w.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elementy.forEach(function (el) { obs.observe(el); });
})();
