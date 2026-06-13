(() => {
  const script = document.currentScript;
  const grid = script.parentElement;
  const cards = Array.from(grid.children).filter(child => child !== script);
  for (let index = cards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
  }
  cards.forEach(card => grid.insertBefore(card, script));
})();
