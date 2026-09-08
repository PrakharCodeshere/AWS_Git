// ---------------------------------
// Mobile nav toggle
// ---------------------------------
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav after clicking a link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------------------------------
// Footer year
// ---------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------------------------------
// Contact form validation
// ---------------------------------
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

const fields = {
  name: {
    input: document.getElementById('name'),
    error: document.getElementById('nameError'),
    validate: (v) => v.trim().length > 0 || 'Please enter your name.'
  },
  email: {
    input: document.getElementById('email'),
    error: document.getElementById('emailError'),
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email.'
  },
  message: {
    input: document.getElementById('message'),
    error: document.getElementById('messageError'),
    validate: (v) => v.trim().length >= 10 || 'Tell me a bit more (10+ characters).'
  }
};

function validateField(key) {
  const { input, error, validate } = fields[key];
  const result = validate(input.value);
  if (result === true) {
    input.classList.remove('invalid');
    error.textContent = '';
    return true;
  } else {
    input.classList.add('invalid');
    error.textContent = result;
    return false;
  }
}

Object.keys(fields).forEach(key => {
  fields[key].input.addEventListener('blur', () => validateField(key));
  fields[key].input.addEventListener('input', () => {
    if (fields[key].input.classList.contains('invalid')) validateField(key);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const results = Object.keys(fields).map(validateField);
  const allValid = results.every(Boolean);

  if (!allValid) {
    status.textContent = '';
    return;
  }

  // No backend wired up — swap this for a real fetch() call to your endpoint.
  status.textContent = `Thanks! I'll get back to you soon.`;
  form.reset();
});
