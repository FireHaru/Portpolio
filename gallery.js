export function photoSources(value, fallback = '') {
  const entries = Array.isArray(value) ? value : [value];
  const sources = [...new Set(entries.filter(item => typeof item === 'string' && item.trim()).map(item => item.trim()))];
  return sources.length ? sources : fallback ? [fallback] : [];
}
export function initPhotoGalleries(config) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-photo]').forEach(figure => {
    const image = figure.querySelector('img'); const placeholder = figure.querySelector('.photo-placeholder');
    const sources = photoSources(config[figure.dataset.photo], image.getAttribute('src'));
    if (!sources.length) { image.hidden = true; placeholder.hidden = false; return; }
    const create = (tag, className) => { const node = document.createElement(tag); node.className = className; return node; };
    const media = create('div', 'gallery-media'); figure.insertBefore(media, image);
    const track = create('div', 'gallery-track'); media.append(track);
    const baseAlt = image.alt;
    sources.forEach((source, i) => {
      const slide = create('div', 'gallery-slide'); const photo = i === 0 ? image : create('img', '');
      const fallback = i === 0 ? placeholder : placeholder.cloneNode(true);
      photo.loading = 'lazy'; photo.draggable = false; photo.alt = `${baseAlt} — ảnh ${i + 1} / ${sources.length}`;
      photo.hidden = false; fallback.hidden = true;
      photo.addEventListener('load', () => { photo.hidden = false; fallback.hidden = true; });
      photo.addEventListener('error', () => { photo.hidden = true; fallback.hidden = false; });
      photo.src = source; slide.append(photo, fallback); track.append(slide);
    });
    let index = 0; let timer = null; let hovering = false; let focused = false; let drag = null;
    let visible = !('IntersectionObserver' in window); const dots = [];
    function show(next) {
      index = (next + sources.length) % sources.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
      [...track.children].forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== index)));
    }
    function schedule() {
      clearInterval(timer);
      if (sources.length > 1 && visible && !document.hidden && !reducedMotion.matches && !hovering && !focused && !drag) timer = setInterval(() => show(index + 1), 3000);
    }
    if (sources.length > 1) {
      figure.setAttribute('role', 'region'); figure.setAttribute('aria-label', baseAlt);
      function button(className, label, action) {
        const node = create('button', className); node.type = 'button'; node.setAttribute('aria-label', label);
        node.addEventListener('click', () => { action(); schedule(); }); return node;
      }
      media.append(button('arrow-button arrow-prev gallery-arrow gallery-prev', 'Ảnh trước', () => show(index - 1)), button('arrow-button arrow-next gallery-arrow gallery-next', 'Ảnh tiếp theo', () => show(index + 1)));
      const pagination = create('div', 'gallery-dots'); pagination.setAttribute('aria-label', 'Chọn ảnh');
      sources.forEach((_, i) => { const dot = button('gallery-dot', `Xem ảnh ${i + 1}`, () => show(i)); dots.push(dot); pagination.append(dot); });
      media.append(pagination);
      figure.addEventListener('mouseenter', () => { hovering = true; schedule(); });
      figure.addEventListener('mouseleave', () => { hovering = false; schedule(); });
      figure.addEventListener('focusin', () => { focused = true; schedule(); });
      figure.addEventListener('focusout', event => { focused = figure.contains(event.relatedTarget); schedule(); });
      figure.addEventListener('keydown', event => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); show(index + (event.key === 'ArrowLeft' ? -1 : 1)); schedule(); } });
      media.addEventListener('pointerdown', event => {
        if (!event.isPrimary || event.button !== 0 || event.target.closest('button')) return;
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, delta: 0, axis: null }; media.setPointerCapture(event.pointerId); clearInterval(timer);
      });
      media.addEventListener('pointermove', event => {
        if (!drag || event.pointerId !== drag.id) return;
        const dx = event.clientX - drag.x; const dy = event.clientY - drag.y;
        if (!drag.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 8) drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (drag.axis !== 'x') return;
        drag.delta = dx; track.classList.add('is-dragging'); track.style.transform = `translateX(calc(-${index * 100}% + ${dx}px))`;
      });
      function finish(event, cancelled = false) {
        if (!drag || drag.id !== event.pointerId) return;
        const delta = drag.delta; drag = null; track.classList.remove('is-dragging');
        if (media.hasPointerCapture(event.pointerId)) media.releasePointerCapture(event.pointerId);
        show(!cancelled && Math.abs(delta) >= Math.max(35, media.clientWidth * .12) ? index + (delta < 0 ? 1 : -1) : index); schedule();
      }
      media.addEventListener('pointerup', event => finish(event));
      media.addEventListener('pointercancel', event => finish(event, true));
      media.addEventListener('lostpointercapture', event => finish(event, true));
      document.addEventListener('visibilitychange', schedule); reducedMotion.addEventListener('change', schedule);
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, { threshold: .1 }); observer.observe(figure);
      }
    }
    show(0); schedule();
  });
}
