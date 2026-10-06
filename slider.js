export function initCardSliders() {
  // Tự khởi tạo mọi danh sách có class card-slider; nút liên kết qua aria-controls.
  document.querySelectorAll('.card-slider').forEach(list => {
    const controls = [...document.querySelectorAll('[data-slider-direction]')]
      .filter(button => button.getAttribute('aria-controls') === list.id);
    const previous = controls.find(button => button.dataset.sliderDirection === '-1');
    const next = controls.find(button => button.dataset.sliderDirection === '1');
    if (!previous || !next) return;
    function updateNavigation() {
      const maxScroll = Math.max(0, list.scrollWidth - list.clientWidth);
      const navigation = previous.closest('.slider-navigation');
      if (navigation?.hasAttribute('data-hide-if-fit')) navigation.hidden = maxScroll <= 2;
      previous.disabled = list.scrollLeft <= 2;
      next.disabled = list.scrollLeft >= maxScroll - 2;
    }
    function scrollCards(direction) {
      const card = list.firstElementChild;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      list.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    controls.forEach(button => button.addEventListener('click', () => scrollCards(Number(button.dataset.sliderDirection))));
    list.addEventListener('scroll', updateNavigation, { passive: true });
    list.addEventListener('keydown', event => {
      if (event.target === list && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault(); scrollCards(event.key === 'ArrowLeft' ? -1 : 1);
      }
    });
    if ('ResizeObserver' in window) new ResizeObserver(updateNavigation).observe(list);
    else window.addEventListener('resize', updateNavigation);
    new MutationObserver(updateNavigation).observe(list, { childList: true });
    updateNavigation();
  });
}
