import './typewriter.js';
import './scroll.js';
import './game.js';
import './counters.js';
import './filter.js';

// Theme toggle

const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Load saved preference or default to dark

const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
updateToggleLabel(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleLabel(next);
});

function updateToggleLabel(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀ Light mode' : '🌙 Dark mode';
}

// Cursor

const bug = document.getElementById('cursorBug');
const criticalEls = '[data-cursor="critical"], #easterEggTrigger';

document.addEventListener('mousemove', e => {
  bug.style.left = e.clientX + 'px';
  bug.style.top  = e.clientY + 'px';
});

document.addEventListener('mouseover', e => {
  if (e.target.closest('a, button, input, textarea, [role="button"]')) {
    bug.classList.add('hovering');
  }
  if (e.target.closest(criticalEls)) {
    bug.src = 'assets/cursor-bug-critical.svg';
  }
});

document.addEventListener('mouseout', e => {
  if (e.target.closest('a, button, input, textarea, [role="button"]')) {
    bug.classList.remove('hovering');
  }
  if (e.target.closest(criticalEls)) {
    bug.src = 'assets/cursor-bug.svg';
  }
});

// Contact

const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const fields = [
    { id: 'reporter',    msg: 'Reporter name is required' },
    { id: 'email',       msg: 'A valid email is required' },
    { id: 'subject',     msg: 'Summary is required' },
    { id: 'description', msg: 'Description is required' },
  ];

  fields.forEach(({ id, msg }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    const empty = !input.value.trim();
    const emailInvalid = id === 'email' && input.value && !/\S+@\S+\.\S+/.test(input.value);

    if (empty || emailInvalid) {
      input.classList.add('error');
      error.textContent = emailInvalid ? 'Please enter a valid email' : msg;
      valid = false;
    } else {
      input.classList.remove('error');
      error.textContent = '';
    }
  });

  if (valid) {
    successMsg.hidden = false;
    form.querySelector('button[type="submit"]').disabled = true;
    // Replace with your actual form submission logic (Formspree, EmailJS, etc.)
  }
});