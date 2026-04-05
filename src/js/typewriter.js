const phrases = [
    'Senior QA Engineer available.',
    'Bug hunter. Test architect.',
    'Breaking things professionally.',
    'Currently: open to opportunities.',
  ];
  
  const el = document.getElementById('typewriter');
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  
  function type() {
    const current = phrases[phraseIndex];
  
    if (!deleting) {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  
  type();