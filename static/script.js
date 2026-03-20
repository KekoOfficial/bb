const flowers = document.querySelectorAll('.flower');

flowers.forEach(flower => {
  const leftPos = Math.random() * window.innerWidth;
  flower.style.left = `${leftPos}px`;
  flower.style.animationDuration = `${3 + Math.random() * 2}s`;
});