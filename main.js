// year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// nav background on scroll
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30));

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold:.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// "coming soon" toast
const toast = document.getElementById('toast');
const defaultToastMessage = toast ? toast.textContent : '';
let toastTimer;
document.querySelectorAll('[data-soon]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    if (!toast) return;
    toast.textContent = defaultToastMessage;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  });
});

// active nav link: highlight the link that matches the current page
const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
const navAnchors = [...document.querySelectorAll('.navlinks a')];
navAnchors.forEach(a => {
  const href = (a.getAttribute('href') || '').split('#')[0].split('/').pop().toLowerCase();
  const target = href || 'index.html';
  if (target === here) a.classList.add('active');
});

// scroll-spy for same-page anchors (e.g. About on the home page)
const pairs = navAnchors
  .map(a => {
    const href = a.getAttribute('href') || '';
    const hashOnly = href.startsWith('#') && href.length > 1;
    const target = hashOnly ? document.querySelector(href) : null;
    return target ? { a, target } : null;
  })
  .filter(Boolean);
if (pairs.length){
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        pairs.forEach(p => p.a.classList.remove('active'));
        const hit = pairs.find(p => p.target === e.target);
        if (hit) hit.a.classList.add('active');
      }
    });
  }, { rootMargin:'-45% 0px -50% 0px' });
  pairs.forEach(p => spy.observe(p.target));
}
