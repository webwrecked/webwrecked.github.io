(() => {
  const slides = [...document.querySelectorAll('.hero-slide')];
  const count = document.querySelector('.current-slide');
  const track = document.querySelector('.slide-track i');
  let current = 0;
  let timer;

  function showSlide(next) {
    current = (next + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle('active', index === current));
    count.textContent = String(current + 1).padStart(2, '0');
    track.style.transform = `translateX(${current * 100}%)`;
  }
  function autoplay() { clearInterval(timer); timer = setInterval(() => showSlide(current + 1), 6500); }
  document.querySelectorAll('.slide-button').forEach(button => button.addEventListener('click', () => {
    showSlide(current + (button.dataset.direction === 'next' ? 1 : -1)); autoplay();
  }));
  document.querySelector('.hero').addEventListener('mouseenter', () => clearInterval(timer));
  document.querySelector('.hero').addEventListener('mouseleave', autoplay);
  autoplay();

  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.getElementById('year').textContent = new Date().getFullYear();
})();
