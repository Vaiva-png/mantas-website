/* MANTAS Bauleistungen — landing page behaviour */
(function () {
  'use strict';

  /* ---- mobile navigation ------------------------------------------------ */
  var toggle = document.getElementById('navToggle');
  var nav    = document.getElementById('hauptnavigation');

  function setNav(open) {
    nav.dataset.open = open ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }

  if (toggle && nav) {
    setNav(false);

    toggle.addEventListener('click', function () {
      setNav(nav.dataset.open !== 'true');
    });

    /* close after picking a destination */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.dataset.open === 'true') {
        setNav(false);
        toggle.focus();
      }
    });

    /* reset state when leaving the mobile breakpoint */
    var mq = window.matchMedia('(min-width: 981px)');
    var onChange = function (e) { if (e.matches) setNav(false); };
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
  }

  /* ---- decorative house field in the footer ----------------------------- */
  var field = document.getElementById('footerPattern');
  if (field) {
    var COLORS = ['#F7921E', '#FCB715', '#5586A6', '#ffffff'];
    var svgNS  = 'http://www.w3.org/2000/svg';
    var markup = '';

    for (var i = 0; i < 14; i++) {
      var size = 40 + (i % 3) * 20;
      markup +=
        '<svg viewBox="0 0 100 100" style="' +
          'top:' + ((i * 37) % 100) + '%;' +
          'left:' + ((i * 53) % 100) + '%;' +
          'width:' + size + 'px;height:' + size + 'px;' +
          'color:' + COLORS[i % COLORS.length] + ';' +
          'transform:rotate(' + (((i * 17) % 40) - 20) + 'deg);' +
        '">' +
          '<use href="' + (i % 2 === 0 ? '#mHouse' : '#mHouseFill') + '"/>' +
        '</svg>';
    }
    field.innerHTML = markup;
    void svgNS;
  }

  /* ---- start the showreel only once it is on screen --------------------- */
  var video = document.querySelector('.gallery__video');
  if (video && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!video.getAttribute('src')) return;
          video.load();
          var p = video.play();
          if (p && p.catch) p.catch(function () { /* autoplay blocked — poster stays */ });
          io.unobserve(video);
        }
      });
    }, { rootMargin: '200px' });
    io.observe(video);
  }
})();
