const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const year = document.querySelector('#year');
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
const form = document.querySelector('#contactForm');
const formNote = document.querySelector('#formNote');
const counters = document.querySelectorAll('[data-counter]');

if (year) year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    panels.forEach((panel) => panel.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.counter);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 80));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString('id-ID') + (target >= 100 ? '+' : '');
        clearInterval(timer);
      } else {
        counter.textContent = current.toLocaleString('id-ID');
      }
    }, 18);
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  formNote.textContent = `Terima kasih, ${name}. Pesan Anda sudah tercatat sebagai simulasi. Hubungkan form ini ke email atau backend saat website dipublikasikan.`;
  form.reset();
});