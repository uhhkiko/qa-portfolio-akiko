import './typewriter.js';
import './scroll.js';
import './game.js';

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
