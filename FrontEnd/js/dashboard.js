// ============================================
// STUDENT DASHBOARD — SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    setTimeout(function () { loader.classList.add('loaded'); }, 350);
  });
  setTimeout(function () { if (loader) loader.classList.add('loaded'); }, 1200);

  // ---- FOOTER YEAR ----
  const yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // ---- SIDEBAR TOGGLE (mobile) ----
  const sidebar = document.getElementById('appSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('sidebarToggle');
  const closeBtn = document.getElementById('sidebarClose');

  function openSidebar() {
    sidebar.classList.add('show');
    overlay.classList.add('show');
  }
  function closeSidebar() {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      if (window.innerWidth <= 991) {
        sidebar.classList.contains('show') ? closeSidebar() : openSidebar();
      } else {
        document.querySelector('.app-shell').classList.toggle('sidebar-collapsed');
      }
    });
  }
  if (closeBtn) { closeBtn.addEventListener('click', closeSidebar); }
  if (overlay) { overlay.addEventListener('click', closeSidebar); }

  // close sidebar when a link is tapped on mobile
  document.querySelectorAll('.sidebar-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 991) { closeSidebar(); }
    });
  });

  // ---- DARK MODE TOGGLE ----
  const darkToggle = document.getElementById('darkModeToggle');
  const darkIcon = darkToggle ? darkToggle.querySelector('i') : null;

  function applyDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    if (darkIcon) {
      darkIcon.classList.toggle('bi-moon-stars', !isDark);
      darkIcon.classList.toggle('bi-sun', isDark);
    }
  }

  // Note: no localStorage available in this environment — defaults to light each load.
  applyDarkMode(false);

  if (darkToggle) {
    darkToggle.addEventListener('click', function () {
      const isDark = !document.body.classList.contains('dark-mode');
      applyDarkMode(isDark);
    });
  }

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

});
