import { projects } from './data.js';
import { portfolioPhotos } from './photos.js';
import { initPhotoGalleries } from './gallery.js';
import { initCardSliders } from './slider.js';
const $ = (selector) => document.querySelector(selector);
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } },
  remove(key) { try { localStorage.removeItem(key); } catch { /* Storage may be disabled. */ } },
};
const themeToggle = $('#theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Bật chế độ sáng' : 'Bật chế độ tối');
  themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
}
const savedTheme = storage.get('theme');
applyTheme(['light', 'dark'].includes(savedTheme) ? savedTheme : systemTheme.matches ? 'dark' : 'light');
themeToggle.addEventListener('click', () => { const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; applyTheme(theme); storage.set('theme', theme); });
systemTheme.addEventListener('change', (event) => { if (!storage.get('theme')) applyTheme(event.matches ? 'dark' : 'light'); });
const menuToggle = $('#menu-toggle');
function closeMenu() { $('#site-nav').classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Mở menu'); }
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; $('#site-nav').classList.toggle('is-open', open); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu'); });
$('#site-nav').addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !document.querySelector('dialog[open]') && !event.target.closest('input, textarea, select, [contenteditable]')) { event.preventDefault(); $('#project-search').focus(); } });
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLocaleLowerCase('vi');
let activeTag = 'all';
function element(tag, className, text) { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; }
function tagList(tags) { const list = element('ul', 'tags'); tags.forEach(tag => list.append(element('li', '', tag))); return list; }
const dialog = $('#project-dialog');
dialog.setAttribute('aria-labelledby', 'dialog-title');
function showProject(project) { $('#dialog-title').textContent = project.title; $('#dialog-description').textContent = project.description; $('#dialog-tags').replaceChildren(...tagList(project.tag).children); dialog.showModal(); }
$('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); });
function render(list) {
  $('#project-list').replaceChildren(...list.map(project => {
    const card = element('li', 'card surface-card'); const art = element('div', 'card-art'); art.setAttribute('aria-hidden', 'true'); art.append(element('span', 'card-index', String(project.id).padStart(2, '0')), element('span', 'card-symbol', project.symbol));
    const body = element('div', 'card-body'); const button = element('button', 'detail-button'); button.type = 'button'; button.setAttribute('aria-label', `Xem chi tiết ${project.title}`); button.append(element('span', '', 'Khám phá dự án'), element('span', '', '↗')); button.addEventListener('click', () => showProject(project));
    body.append(element('p', 'card-category', project.category), element('h3', '', project.title), element('p', 'card-description', project.description), tagList(project.tag), button); card.append(art, body); return card;
  }));
  $('#project-list').scrollLeft = 0;
  $('#project-count').textContent = `Hiển thị ${list.length} / ${projects.length} dự án`;
  $('#empty-state').hidden = list.length !== 0;
}
function updateProjects() {
  const query = normalize($('#project-search').value.trim());
  const filtered = projects.filter(project => (activeTag === 'all' || project.tag.includes(activeTag)) && normalize([project.title, project.description, project.category, ...project.tag].join(' ')).includes(query));
  if ($('#project-sort').value === 'name') filtered.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
  render(filtered);
}
['all', ...new Set(projects.flatMap(project => project.tag))].forEach(tag => { const button = element('button', 'filter-button', tag === 'all' ? 'Tất cả' : tag); button.type = 'button'; button.dataset.tag = tag; button.setAttribute('aria-pressed', String(tag === 'all')); $('#filters').append(button); });
$('#filters').addEventListener('click', event => { const button = event.target.closest('button[data-tag]'); if (!button) return; activeTag = button.dataset.tag; $('#filters').querySelectorAll('button').forEach(filter => filter.setAttribute('aria-pressed', String(filter === button))); updateProjects(); });
$('#project-search').addEventListener('input', updateProjects);
$('#project-sort').addEventListener('change', updateProjects);
$('#reset-filters').addEventListener('click', () => { $('#project-search').value = ''; $('#project-sort').value = 'default'; $('#filters').querySelector('button').click(); $('#project-search').focus(); });
updateProjects();
const form = $('#contact-form');
const fields = ['name', 'email', 'msg'];
// Xóa dữ liệu nháp từ phiên bản trước, không tiếp tục lưu thông tin liên hệ.
storage.remove('portfolio-contact-draft');
function updateCount() { $('#message-count').textContent = `${$('#msg').value.length} / 3000`; }
updateCount();
form.addEventListener('input', updateCount);
function validate() {
  fields.forEach(key => { const input = $(`#${key}`); input.setCustomValidity(input.value.trim() ? '' : 'Vui lòng điền nội dung.'); });
  if ($('#msg').value.trim() && $('#msg').value.trim().length < 10) $('#msg').setCustomValidity('Lời nhắn cần ít nhất 10 ký tự.');
  return form.reportValidity();
}
fields.forEach(key => $(`#${key}`).addEventListener('input', () => $(`#${key}`).setCustomValidity('')));
let sendingMessage = false;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sendingMessage || !validate()) return;
  sendingMessage = true;
  const button = form.querySelector('[type="submit"]');
  const status = $('#form-status');
  const originalLabel = button.textContent;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  const payload = Object.fromEntries(new FormData(form));
  fields.forEach(key => { payload[key] = $(`#${key}`).value.trim(); });
  button.disabled = true;
  button.textContent = 'Đang gửi…';
  fields.forEach(key => { $(`#${key}`).readOnly = true; });
  form.setAttribute('aria-busy', 'true');
  status.textContent = 'Đang gửi lời nhắn…';
  try {
    const response = await fetch('https://formsubmit.co/ajax/nguyennhatdang89@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || ![true, 'true'].includes(result.success)) throw new Error('Submission rejected');
    form.reset();
    fields.forEach(key => $(`#${key}`).setCustomValidity(''));
    updateCount();
    status.textContent = 'Lời nhắn đã được dịch vụ tiếp nhận. Cảm ơn bạn đã liên hệ!';
  } catch (error) {
    status.textContent = error.name === 'AbortError'
      ? 'Chưa xác nhận được kết quả gửi do chờ quá lâu. Nội dung vẫn được giữ; vui lòng kiểm tra trước khi gửi lại.'
      : 'Chưa gửi được lời nhắn. Nội dung vẫn được giữ, bạn có thể thử lại sau.';
  } finally {
    clearTimeout(timeout);
    sendingMessage = false;
    button.disabled = false;
    button.textContent = originalLabel;
    fields.forEach(key => { $(`#${key}`).readOnly = false; });
    form.removeAttribute('aria-busy');
  }
});
$('#year').textContent = new Date().getFullYear();
const backToTop = $('#back-to-top');
window.addEventListener('scroll', () => { backToTop.hidden = window.scrollY < 500; }, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { $('#site-nav').querySelectorAll('a').forEach(link => { if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-15% 0px -55% 0px' }); document.querySelectorAll('main section[id]').forEach(section => observer.observe(section)); }

initPhotoGalleries(portfolioPhotos);

initCardSliders();
