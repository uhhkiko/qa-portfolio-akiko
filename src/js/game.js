const trigger  = document.getElementById('easterEggTrigger');
const overlay  = document.getElementById('gameOverlay');
const board    = document.getElementById('gameBoard');
const scoreEl  = document.getElementById('gameScore');
const timerEl  = document.getElementById('gameTimer');
const closeBtn = document.getElementById('gameClose');

let score = 0, timeLeft = 15, gameInterval, timerInterval;

trigger.addEventListener('click', startGame);
closeBtn.addEventListener('click', endGame);

function startGame() {
  score = 0; timeLeft = 15;
  scoreEl.textContent = 0;
  timerEl.textContent = 15;
  overlay.hidden = false;
  board.innerHTML = '';

  gameInterval = setInterval(spawnBug, 800);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function spawnBug() {
  const bug = document.createElement('button');
  bug.textContent = '🐛';
  bug.className = 'bug-btn';
  bug.style.left = Math.random() * 80 + '%';
  bug.style.top  = Math.random() * 80 + '%';
  board.appendChild(bug);

  bug.addEventListener('click', () => {
    score++;
    scoreEl.textContent = score;
    bug.textContent = '💥';
    setTimeout(() => bug.remove(), 300);
  });

  setTimeout(() => bug.remove(), 1500);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  overlay.hidden = true;
  board.innerHTML = '';
  if (score >= 10) alert(`${score} bugs squashed. Hire this QA engineer.`);
}