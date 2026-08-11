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

  /* ---- Lightbox for the project gallery --------------------------------- */
  var box = document.getElementById('lightbox');
  var items = [].slice.call(document.querySelectorAll('.gallery__item'));

  if (box && items.length) {
    var img      = document.getElementById('lightboxImg');
    var counter  = document.getElementById('lightboxCounter');
    var text     = document.getElementById('lightboxText');
    var current  = 0;
    var opener   = null;   /* element to restore focus to on close */

    function show(i) {
      current = (i + items.length) % items.length;   /* wraps around */
      var el = items[current];
      img.src = el.dataset.full;
      img.alt = el.dataset.alt || '';
      text.textContent = el.dataset.alt || '';
      counter.textContent = (current + 1) + ' / ' + items.length;

      /* warm up the neighbours so arrow-clicks feel instant */
      [current + 1, current - 1].forEach(function (n) {
        var nb = items[(n + items.length) % items.length];
        if (nb) { var pre = new Image(); pre.src = nb.dataset.full; }
      });
    }

    function open(i, from) {
      opener = from || null;
      show(i);
      box.hidden = false;
      document.body.style.overflow = 'hidden';   /* stop the page scrolling behind */
      box.querySelector('.lightbox__close').focus();
    }

    function close() {
      box.hidden = true;
      document.body.style.overflow = '';
      img.src = '';
      if (opener) opener.focus();
    }

    items.forEach(function (el, i) {
      el.addEventListener('click', function () { open(i, el); });
    });

    box.addEventListener('click', function (e) {
      var action = e.target.closest('[data-lb]');
      if (action) {
        var what = action.dataset.lb;
        if (what === 'close') close();
        if (what === 'next')  show(current + 1);
        if (what === 'prev')  show(current - 1);
        return;
      }
      /* clicking the backdrop (not the picture or caption) closes it */
      if (!e.target.closest('.lightbox__stage')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape')     { close(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); show(current - 1); }
      /* keep Tab inside the dialog */
      if (e.key === 'Tab') {
        var focusable = box.querySelectorAll('button');
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    /* swipe on touch devices */
    var startX = null;
    box.addEventListener('touchstart', function (e) { startX = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });
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
