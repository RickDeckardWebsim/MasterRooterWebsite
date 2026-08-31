document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && header && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var sunIcon = document.getElementById('theme-icon-sun');
  var moonIcon = document.getElementById('theme-icon-moon');
  var themeColorMeta = document.getElementById('theme-color-meta');

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || systemTheme();
  }

  function applyTheme(theme) {
    var isDark = theme === 'dark';
    if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';
    if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (themeColorMeta) themeColorMeta.setAttribute('content', isDark ? '#1B1517' : '#F4F3F2');
  }

  if (themeToggle) {
    applyTheme(currentTheme());

    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      applyTheme(next);
    });
  }

  var contactForm = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = document.getElementById('name').value;
      var phone = document.getElementById('phone').value;
      var message = document.getElementById('message').value;
      var subject = 'Message from ' + name + ' via website';
      var body = 'Name: ' + name + '\nPhone: ' + phone + '\n\n' + message;
      var mailto = 'mailto:morganarchie981@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
      if (formStatus) formStatus.hidden = false;
    });
  }
});
