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
