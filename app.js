/* ===========================
   NAVBAR SCROLL
=========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ===========================
   MOBILE MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===========================
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ===========================
   INDUSTRY TABS
=========================== */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const pane = document.getElementById('tab-' + btn.dataset.tab);
    if (pane) pane.classList.add('active');
  });
});

/* ===========================
   CONTACT FORM
=========================== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent!';
    formSuccess.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      formSuccess.classList.add('hidden');
    }, 5000);
  }, 1200);
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealElements = document.querySelectorAll(
  '.service-card, .process-step, .testimonial-card, .team-card, .ts-item, .why-point, .ci-item, .tab-pane-inner, .cta-card, .about-left, .about-right'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

/* ===========================
   PARTICLE CANVAS
=========================== */
(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.5 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connecting lines for nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===========================
   ANIMATE STATS ON SCROLL
=========================== */
function animateCounter(el, target, duration = 1500, suffix = '') {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    animateCounter(statNumbers[0], 150, 1500, '+');
    animateCounter(statNumbers[1], 80, 1500, '+');
    statNumbers[2].textContent = '3x';
  }
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ===========================
   ACTIVE NAV HIGHLIGHT
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
