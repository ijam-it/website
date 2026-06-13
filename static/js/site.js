document.documentElement.classList.add('js');

document.querySelectorAll('.cloaked-email').forEach(span => {
  const user = span.dataset.user.split('').reverse().join('');
  const domain = span.dataset.domain.split('').reverse().join('');
  const address = `${user}@${domain}`;
  const link = document.createElement('a');
  link.href = `${span.dataset.protocol}:${address}`;
  link.textContent = address;
  if (span.dataset.class) link.className = span.dataset.class;
  span.replaceWith(link);
});

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open');
  });
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
