const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
const targets = document.querySelectorAll<HTMLElement>('#page > h2, #page > p, #page > ul, .project');
let observer: IntersectionObserver | undefined;

function setupReveals() {
  observer?.disconnect();
  if (preference.matches) {
    targets.forEach(el => el.classList.remove('reveal-ready'));
    return;
  }
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer?.unobserve(entry.target);
      }
    }
  }, { threshold: 0.06 });
  targets.forEach(el => {
    // Keep anything already in view visible; only reveal content as it enters.
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add('reveal-ready');
      observer?.observe(el);
    }
  });
}
setupReveals();
preference.addEventListener('change', setupReveals);
document.addEventListener('focusin', event => {
  if (event.target instanceof Element) event.target.closest('.reveal-ready')?.classList.add('is-revealed');
});
