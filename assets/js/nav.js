(function () {
  function initNav() {
    var nav = document.querySelector('.main-nav');
    if (!nav) return;
    var topBar = nav.parentElement;
    if (!topBar) return;

    var btn = document.createElement('button');
    btn.className = 'nav-hamburger';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.textContent = '☰';

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      btn.textContent = open ? '✕' : '☰';
    });

    topBar.insertBefore(btn, nav);

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        btn.textContent = '☰';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
