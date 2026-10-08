// poster-preview.js
// 通用海报/静态素材放大预览：点击后弹窗居中展示单张原图（不裁剪变形），
// 左上角叠加素材标题，支持左右箭头/键盘方向键切换上一张、下一张

let modalEl = null;
let previewList = [];
let previewIndex = 0;

function ensureModal() {
  if (modalEl) return modalEl;

  modalEl = document.createElement('div');
  modalEl.id = 'posterPreviewModal';
  modalEl.className = 'fixed inset-0 z-[1000] hidden items-center justify-center bg-black/85 backdrop-blur-sm';
  modalEl.innerHTML = `
    <div class="poster-preview-close absolute inset-0 cursor-zoom-out"></div>
    <div class="relative max-w-[90vw] max-h-[86vh] pointer-events-none flex items-center justify-center">
      <img class="poster-preview-img max-w-[90vw] max-h-[86vh] object-contain rounded-[6px] shadow-2xl select-none pointer-events-auto" src="" alt="素材预览" draggable="false" />
    </div>
    <div class="poster-preview-info absolute left-4 top-4 md:left-6 md:top-6 pointer-events-none flex flex-col items-start gap-1 max-w-[70vw]">
      <span class="poster-preview-info-title text-base md:text-lg leading-6 text-white font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,.6)]"></span>
    </div>
    <button type="button" class="poster-preview-close-btn absolute right-4 top-4 md:right-6 md:top-6 pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors">
      <i class="ri-close-line text-xl"></i>
    </button>
    <button type="button" class="poster-preview-prev-btn absolute left-4 md:left-8 top-1/2 -translate-y-1/2 pointer-events-auto w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors">
      <i class="ri-arrow-left-s-line text-2xl"></i>
    </button>
    <button type="button" class="poster-preview-next-btn absolute right-4 md:right-8 top-1/2 -translate-y-1/2 pointer-events-auto w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors">
      <i class="ri-arrow-right-s-line text-2xl"></i>
    </button>
  `;
  document.body.appendChild(modalEl);

  modalEl.querySelectorAll('.poster-preview-close, .poster-preview-close-btn').forEach(el => {
    el.addEventListener('click', closePosterPreview);
  });

  modalEl.querySelector('.poster-preview-prev-btn').addEventListener('click', () => showPosterByOffset(-1));
  modalEl.querySelector('.poster-preview-next-btn').addEventListener('click', () => showPosterByOffset(1));

  document.addEventListener('keydown', (e) => {
    if (!modalEl || modalEl.classList.contains('hidden')) return;
    if (e.key === 'Escape') closePosterPreview();
    if (e.key === 'ArrowLeft') showPosterByOffset(-1);
    if (e.key === 'ArrowRight') showPosterByOffset(1);
  });

  return modalEl;
}

function renderCurrentPoster() {
  if (!modalEl) return;
  const total = previewList.length;
  const current = previewList[previewIndex] || { url: '', title: '' };

  const imgEl = modalEl.querySelector('.poster-preview-img');
  const titleEl = modalEl.querySelector('.poster-preview-info-title');

  imgEl.src = current.url || '';
  imgEl.alt = current.title || '素材预览';
  titleEl.textContent = current.title || '';

  const prevBtn = modalEl.querySelector('.poster-preview-prev-btn');
  const nextBtn = modalEl.querySelector('.poster-preview-next-btn');
  const showArrows = total > 1;
  [prevBtn, nextBtn].forEach(btn => btn.classList.toggle('hidden', !showArrows));
}

function showPosterByOffset(offset) {
  const total = previewList.length;
  if (total <= 1) return;
  previewIndex = (previewIndex + offset + total) % total;
  renderCurrentPoster();
}

// list: [{ url, title }]，activeIndex: 当前点击项在数组中的下标
export function openPosterPreview(list, activeIndex) {
  if (!Array.isArray(list) || !list.length) return;
  const modal = ensureModal();

  previewList = list;
  previewIndex = Number.isInteger(activeIndex) && activeIndex >= 0 && activeIndex < list.length ? activeIndex : 0;

  renderCurrentPoster();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
}

export function closePosterPreview() {
  if (!modalEl) return;
  modalEl.classList.add('hidden');
  modalEl.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
}

// 为容器内所有带 data-poster-preview 标记的图片元素绑定点击放大预览，
// 同一容器内的所有海报素材组成一份有序列表，支持弹窗内左右切换
export function bindPosterPreviewClick(container) {
  if (!container) return;
  const nodes = Array.from(container.querySelectorAll('[data-poster-preview]'));
  const list = [];
  const nodeIndexMap = new Map();

  nodes.forEach(el => {
    const img = el.querySelector('img');
    const url = img ? img.getAttribute('src') : '';
    if (!url) return;
    const title = el.getAttribute('data-poster-title') || '';
    nodeIndexMap.set(el, list.length);
    list.push({ url, title });
  });

  nodes.forEach(el => {
    const idx = nodeIndexMap.get(el);
    if (idx === undefined) return;
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => openPosterPreview(list, idx));
  });
}
