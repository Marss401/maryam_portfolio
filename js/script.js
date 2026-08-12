const navToggler = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('main section[id]');
const typingElement = document.querySelector('.typing');
const form = document.querySelector('#contactForm');
const formMessage = document.querySelector('#formMessage');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

/* Mobile navigation */
if (navToggler && aside) {
  navToggler.addEventListener('click', () => {
    const isOpen = aside.classList.toggle('open');
    navToggler.setAttribute('aria-expanded', String(isOpen));
    navToggler.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    aside?.classList.remove('open');
    navToggler?.setAttribute('aria-expanded', 'false');
    navToggler?.setAttribute('aria-label', 'Open navigation');
  });
});

/* Active navigation link while scrolling */
const updateActiveLink = () => {
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav a[href="#${section.id}"]`);
      active?.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

/* Lightweight typing effect */
if (typingElement) {
  const words = [
    'modern web applications',
    'responsive user interfaces',
    'full-stack solutions',
    'practical digital products'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const current = words[wordIndex];

    if (!deleting) {
      typingElement.textContent = current.slice(0, ++charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1500);
        return;
      }
    } else {
      typingElement.textContent = current.slice(0, --charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 45 : 75);
  };

  type();
}

/* Contact form: front-end validation.
   Connect this form to Formspree, EmailJS, a backend API, etc. for real delivery. */
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    formMessage.textContent =
      'Thanks! Your message is ready to be connected to your email service or backend.';
    form.reset();
  });
}
