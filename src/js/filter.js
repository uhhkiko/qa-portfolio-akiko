const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const tags = card.dataset.tags || '';
        card.classList.toggle('hidden', !tags.includes(filter));
      }
    });
  });
});