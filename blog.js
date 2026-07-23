const tagLinks = document.querySelectorAll('.tags a');
const cards = document.querySelectorAll('.article-card');

tagLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tag = link.dataset.tag;

    cards.forEach(card => {
      const cardTags = card.querySelectorAll('.tags a');
      const hasTag = Array.from(cardTags).some(t => t.dataset.tag === tag);
      card.style.display = hasTag ? '' : 'none';
    });
  });
});

document.getElementById('reset-filter').addEventListener('click', (e) => {
  e.preventDefault();
  cards.forEach(card => card.style.display = '');
});