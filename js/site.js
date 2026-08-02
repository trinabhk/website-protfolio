// Theme toggle
(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  function systemPref() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function currentTheme() {
    return root.getAttribute('data-theme') || systemPref();
  }
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  toggle.setAttribute('aria-pressed', currentTheme() === 'dark' ? 'true' : 'false');
  toggle.addEventListener('click', function () {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });
})();

// Mobile nav toggle
(function () {
  var head = document.querySelector('.site-head');
  var btn = document.querySelector('.nav-toggle');
  if (btn && head) {
    btn.addEventListener('click', function () {
      var open = head.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Scroll reveal
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();

// Drag-to-dismiss the welcome slide: press and slide up to reveal the rest of the page
(function () {
  var welcome = document.querySelector('.welcome');
  var target = document.getElementById('proof');
  if (!welcome || !target) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var dragging = false;
  var startY = 0;
  var delta = 0;

  function setTransform(y, opacity) {
    welcome.style.transform = y ? 'translateY(' + y + 'px)' : '';
    welcome.style.opacity = opacity != null ? String(opacity) : '';
  }

  function onDown(e) {
    if (e.target.closest('a, button')) return;
    dragging = true;
    startY = e.clientY;
    welcome.style.transition = 'none';
    welcome.classList.add('dragging');
  }

  function onMove(e) {
    if (!dragging) return;
    e.preventDefault();
    var raw = e.clientY - startY;
    delta = raw < 0 ? raw : raw * 0.15; // resist downward drags
    var vh = window.innerHeight;
    var opacity = Math.max(1 - Math.abs(Math.min(delta, 0)) / (vh * 0.8), .25);
    setTransform(delta, opacity);
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    welcome.classList.remove('dragging');
    welcome.style.transition = 'transform .4s var(--ease), opacity .3s var(--ease)';
    var threshold = window.innerHeight * 0.16;

    if (delta < -threshold && !reduce) {
      setTransform(-window.innerHeight, 0);
      setTimeout(function () {
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        setTimeout(function () {
          welcome.style.transition = 'none';
          setTransform(0, null);
        }, 500);
      }, 250);
    } else {
      setTransform(0, null);
    }
    delta = 0;
  }

  welcome.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
})();

// Crawl progress: scroll depth read as how far a crawler has gotten
(function () {
  var bar = document.createElement('div');
  bar.className = 'crawl-progress';
  bar.innerHTML = '<div class="crawl-progress-bar"></div>';
  document.body.appendChild(bar);
  var fill = bar.firstChild;

  function update() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    fill.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

// Tab-away easter egg: the "page" reports itself gone while you're not looking
(function () {
  var original = document.title;
  document.addEventListener('visibilitychange', function () {
    document.title = document.hidden ? '410 Gone — come back?' : original;
  });
})();

// Live Kathmandu clock in the hero terminal panel
(function () {
  var el = document.getElementById('local-time');
  if (!el) return;
  var fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  function tick() { el.textContent = fmt.format(new Date()) + ' NPT'; }
  tick();
  setInterval(tick, 1000);
})();

// For anyone reading the source
console.log('%cGET / → 200 OK', 'font-family:monospace;font-size:13px;font-weight:bold;color:#14794E');
console.log('%cLooking under the hood already - I like that. If you\'re hiring or just want to talk technical SEO: karkitrinabh30@gmail.com', 'font-family:monospace;font-size:12px;color:#868C93');
