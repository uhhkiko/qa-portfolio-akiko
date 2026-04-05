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

const ring = document.getElementById('cursorRing');
const dot  = document.getElementById('cursorDot');
const interactables = 'a, button, input, textarea, select, [role="button"]';

document.addEventListener('mousemove', e => {
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
});

document.addEventListener('mouseover', e => {
  if (e.target.closest(interactables)) {
    ring.classList.add('hovering');
    dot.classList.add('hovering');
  }
});

document.addEventListener('mouseout', e => {
  if (e.target.closest(interactables)) {
    ring.classList.remove('hovering');
    dot.classList.remove('hovering');
  }
});
