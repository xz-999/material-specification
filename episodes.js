// episodes.js
// APP内素材：整合预热期素材与开播期素材，左侧分组目录与右侧素材展示联动
// 素材缩略图 hover 时原地放大预览，视频 hover 自动起播

import { getCurrentDrama } from './data.js';
import { bindPointPreviewClick, bindVideoPreviewClick } from './point-preview.js';
import { bindPosterPreviewClick } from './poster-preview.js';
import { renderVideoProgressBarHtml, bindVideoHoverAll } from './video-hover.js';

function getPreheatSections() {
  return getCurrentDrama().preheatSections;
}

function getEpisodes() {
  return getCurrentDrama().episodes;
}

function getLiveBrandSections() {
  return getCurrentDrama().brandSections.filter(section => section.id !== 'brand-logo');
}

function getInitialSectionId() {
  return getPreheatSections()[0]?.id || getLiveBrandSections()[0]?.id || getEpisodes()[0]?.id || null;
}

let currentEpisodeId = getInitialSectionId();
let currentPointId = null;
let sidebarCollapsed = false;
let scrollSpyBound = false;
let isAutoScrolling = false;
let autoScrollTimer = null;

function placeholderImageBlock(label) {
  return `
    <div class="flex flex-col items-center justify-center gap-1.5 text-ink-600 h-full">
      <i class="ri-image-line text-2xl"></i>
      <span class="text-[11px] text-ink-500">${label}</span>
      <span class="text-[10px] text-ink-700">待上传</span>
    </div>
  `;
}

function placeholderVideoBlock(label) {
  return `
    <div class="flex flex-col items-center justify-center gap-1.5 text-ink-600 h-full">
      <i class="ri-film-line text-2xl"></i>
      <span class="text-[11px] text-ink-500">${label}</span>
      <span class="text-[10px] text-ink-700">待上传</span>
    </div>
  `;
}

function renderImageOrPlaceholder(item, imgClass) {
  if (!item.url) return placeholderImageBlock(item.name || '静态素材');
  return `<img src="${item.url}" alt="${item.name}" class="${imgClass}" />`;
}

function isVideoUrl(url) {
  if (typeof url !== 'string') return false;
  return /\.(mp4|mov|m4v|webm)(\?|#|$)/i.test(url.trim());
}

// 转义HTML属性值中的特殊字符，避免看点文案含英文引号（如 "赤脚鬼"）时截断属性导致真实文案丢失
function escapeHtmlAttr(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderPointCard(point, episodeId, index, episodeName) {
  const video = point.video || { url: '', label: '视频素材' };
  const order = index + 1;
  const images = Array.isArray(point.images) ? point.images.filter(img => img && img.url) : [];
  const hasVideo = Boolean(video.url);
  const singleImage = images.length === 1;
  const customRatio = point.imageRatio || '';
  const ratioClass = customRatio || 'aspect-[1920/1177]';
  const fitClass = customRatio ? 'object-contain' : 'object-cover';

  const imagesHtml = images.length
    ? `
      <div class="px-6 pb-4">
        <p class="text-xs text-ink-500 mb-2.5">静态素材</p>
        <div class="grid ${singleImage ? 'grid-cols-1' : 'grid-cols-2'} gap-3">
          ${images.map(img => `
            <div class="point-preview-trigger ${ratioClass} ${customRatio ? 'max-h-[560px] mx-auto w-full xl:max-w-[calc(50%-0.625rem)]' : ''} rounded-[6px] bg-ink-950 border border-ink-800 overflow-hidden relative group" data-preview-caption="${escapeHtmlAttr(point.name)}" data-preview-group="${episodeId}-${point.id}" data-preview-episode-name="${escapeHtmlAttr(episodeName)}">
              <img src="${img.url}" alt="${img.label}" class="w-full h-full ${fitClass} transition-transform duration-300 group-hover:scale-105" />
              <div class="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors">
                <i class="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `
    : `
      <div class="px-6 pb-4">
        <p class="text-xs text-ink-500 mb-2.5">静态素材</p>
        <div class="grid grid-cols-2 gap-3">
          <div class="aspect-[1920/1177] rounded-[6px] bg-ink-950 border border-ink-800 overflow-hidden relative">
            ${placeholderImageBlock('静态素材 1')}
          </div>
          <div class="aspect-[1920/1177] rounded-[6px] bg-ink-950 border border-ink-800 overflow-hidden relative">
            ${placeholderImageBlock('静态素材 2')}
          </div>
        </div>
      </div>
    `;

  const videoLabelHtml = `<p class="text-xs text-ink-500 mb-2.5">视频素材${point.videoSizeHint ? `<span class="text-[11px] text-ink-600 ml-2">${point.videoSizeHint.replace(/^视频素材\s*/, '')}</span>` : ''}</p>`;

  const videoHtml = hasVideo
    ? `
      <div class="px-6 pb-6">
        ${videoLabelHtml}
        <div class="video-hover-box point-preview-video-trigger group aspect-video rounded-[6px] bg-ink-950 border border-ink-800 overflow-hidden relative" data-preview-caption="${escapeHtmlAttr(point.name)}" data-preview-episode-name="${escapeHtmlAttr(episodeName)}">
          ${video.poster ? `<img src="${video.poster}" alt="${video.label || '视频素材封面'}" class="video-poster absolute inset-0 w-full h-full object-cover" />` : ''}
          <video src="${video.url}" ${video.poster ? `poster="${video.poster}"` : ''} loop playsinline class="video-autoplay w-full h-full object-cover ${video.poster ? 'opacity-0' : ''}"></video>
          <div class="play-hint absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none transition-opacity duration-200">
            <div class="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center">
              <i class="ri-play-fill text-ink-950 text-lg"></i>
            </div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/15 transition-colors pointer-events-none">
            <i class="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
          </div>
          ${renderVideoProgressBarHtml()}
        </div>
      </div>
    `
    : point.hideEmptyVideo
      ? ''
      : `
      <div class="px-6 pb-6">
        ${videoLabelHtml}
        <div class="video-hover-box aspect-video rounded-[6px] bg-ink-950 border border-ink-800 overflow-hidden relative">
          ${placeholderVideoBlock(video.label)}
        </div>
      </div>
    `;

  return `
    <div id="point-anchor-${episodeId}-${point.id}"
         class="point-card rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors overflow-hidden scroll-mt-36"
         data-episode-id="${episodeId}" data-point-id="${point.id}">
      <div class="px-6 pt-6 pb-4">
        <div class="flex items-center gap-3">
          <span class="flex-shrink-0 text-[11px] leading-5 tracking-wide text-ink-300 border border-ink-700 rounded-[6px] px-2 py-0.5 bg-ink-800">看点${order}</span>
          <h4 class="text-base font-medium text-ink-100 leading-5">${point.name}</h4>
        </div>
        ${point.sizeHint ? `<p class="text-[11px] text-ink-500 mt-1.5 leading-4">${point.sizeHint}</p>` : ''}
      </div>
      ${imagesHtml}
      ${videoHtml}
    </div>
  `;
}

function renderPreheatPointCard(item, sectionId) {
  const images = Array.isArray(item.images) ? item.images.filter(img => img && img.url) : [];
  const video = item.video || { url: '', label: '视频素材' };
  const hasVideo = Boolean(video.url);
  const singleImage = images.length === 1;
  const imagesHtml = `
    <div class="px-6 pb-4">
      <p class="text-xs text-ink-500 mb-2.5">静态素材</p>
      <div class="grid ${singleImage ? 'grid-cols-1' : 'grid-cols-2'} gap-3">
        ${images.length
          ? images.map(img => `
            <div class="point-preview-trigger aspect-[1920/1177] rounded-[6px] bg-ink-950 border border-ink-800 overflow-hidden relative group" data-preview-caption="${escapeHtmlAttr(item.name)}" data-preview-group="${sectionId}-${item.id}">
              <img src="${img.url}" alt="${img.label}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div class="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors">
                <i class="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
          `).join('')
          : `
            <div class="aspect-[1920/1177] rounded-[6px] bg-ink-950 border border-ink-800 overflow-hidden relative">
              ${placeholderImageBlock('静态素材 1')}
            </div>
          `}
      </div>
    </div>
  `;

  const videoLabelHtml = `<p class="text-xs text-ink-500 mb-2.5">视频素材${item.videoSizeHint ? `<span class="text-[11px] text-ink-600 ml-2">${item.videoSizeHint.replace(/^视频素材\s*/, '')}</span>` : ''}</p>`;
  const videoHtml = hasVideo
    ? `
      <div class="px-6 pb-6">
        ${videoLabelHtml}
        <div class="video-hover-box group aspect-video rounded-[6px] bg-ink-950 border border-ink-800 overflow-hidden relative">
          ${video.poster ? `<img src="${video.poster}" alt="${video.label || '视频素材封面'}" class="video-poster absolute inset-0 w-full h-full object-cover" />` : ''}
          <video src="${video.url}" ${video.poster ? `poster="${video.poster}"` : ''} loop playsinline class="video-autoplay w-full h-full object-cover ${video.poster ? 'opacity-0' : ''}"></video>
          <div class="play-hint absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none transition-opacity duration-200">
            <div class="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center">
              <i class="ri-play-fill text-ink-950 text-lg"></i>
            </div>
          </div>
          ${renderVideoProgressBarHtml()}
        </div>
      </div>
    `
    : `
      <div class="px-6 pb-6">
        ${videoLabelHtml}
        <div class="aspect-video rounded-[6px] bg-ink-950 border border-ink-800 overflow-hidden relative">
          ${placeholderVideoBlock(video.label)}
        </div>
      </div>
    `;

  return `
    <div class="rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors overflow-hidden scroll-mt-36">
      <div class="px-6 pt-6 pb-4">
        <h4 class="text-base font-medium text-ink-100 leading-5">${item.name}</h4>
        ${item.sizeHint ? `<p class="text-[11px] text-ink-500 mt-1.5 leading-4">${item.sizeHint}</p>` : ''}
      </div>
      ${imagesHtml}
      ${videoHtml}
    </div>
  `;
}

function renderVideoBrandCard(item) {
  const hasVideo = Boolean(item.url);
  return `
    <div class="rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors overflow-hidden scroll-mt-36">
      <div class="px-6 pt-6 pb-4">
        <h4 class="text-base font-medium text-ink-100 leading-5">${item.name || '预告片'}</h4>
        ${item.sizeHint ? `<p class="text-[11px] text-ink-500 mt-1.5 leading-4">${item.sizeHint}</p>` : ''}
      </div>
      <div class="px-6 pb-6">
        <div class="video-hover-box group aspect-video bg-ink-950 border border-ink-800 rounded-[6px] overflow-hidden relative flex items-center justify-center">
          ${hasVideo ? `<video src="${item.url}" loop playsinline class="video-autoplay w-full h-full object-cover"></video>` : placeholderVideoBlock(item.name || '视频素材')}
          ${hasVideo ? `<div class="play-hint absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none transition-opacity duration-200"><div class="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center"><i class="ri-play-fill text-ink-950 text-lg"></i></div></div>` : ''}
          ${hasVideo ? renderVideoProgressBarHtml() : ''}
        </div>
      </div>
    </div>
  `;
}

function renderBrandCard(item) {
  if (item.type === 'video' || isVideoUrl(item.url)) return renderVideoBrandCard({ ...item, type: 'video' });
  const isLogo = String(item.name || '').toLowerCase().includes('logo');
  const mediaClass = isLogo ? 'aspect-video px-4 py-6' : `${item.ratio} p-4 max-h-52`;
  const imageClass = isLogo
    ? 'media-zoom-target w-56 h-auto max-h-full object-contain transition-transform duration-300'
    : 'media-zoom-target max-h-full max-w-full object-contain transition-transform duration-300';
  return `
    <div class="rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors overflow-hidden scroll-mt-36">
      <div class="media-hover-zoom ${mediaClass} ${item.bg} overflow-hidden relative flex items-center justify-center">
        ${renderImageOrPlaceholder(item, imageClass)}
      </div>
      <div class="px-4 py-3 border-t border-ink-800">
        <p class="text-sm font-medium text-ink-100">${item.name}</p>
        ${item.sizeHint ? `<p class="text-[11px] text-ink-500 mt-1 leading-4">${item.sizeHint}</p>` : ''}
      </div>
    </div>
  `;
}

function renderBrandMergedCard(items) {
  const safeItems = items.length ? items : [{ id: 'empty-poster', name: 'IP封面图', url: '', sizeHint: '推荐 1080×1440（3:4）', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }];
  return `
    <div class="rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors overflow-hidden scroll-mt-36 col-span-2 sm:col-span-3 lg:col-span-2">
      <div class="px-6 pt-6 pb-4">
        <h4 class="text-base font-medium text-ink-100 leading-5">${safeItems.map(item => item.name).join(' / ')}</h4>
      </div>
      <div class="px-6 pb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${safeItems.map(item => `
            <div class="poster-hover-zoom group ${item.ratio || 'aspect-[3/4]'} ${item.bg} rounded-[6px] border border-ink-800 overflow-hidden relative flex items-center justify-center max-h-[420px] cursor-zoom-in" data-poster-preview data-poster-title="${item.name}">
              ${renderImageOrPlaceholder(item, 'poster-zoom-target w-full h-full object-contain transition-transform duration-300')}
              <div class="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors pointer-events-none">
                <i class="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          ${safeItems.map(item => `
            <p class="text-[11px] text-ink-500 text-center leading-4">${item.sizeHint || ''}</p>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderPreheatSection(section) {
  const isPointSection = !section.merged && section.items.every(item => item.layout === 'point');
  const isVideoSection = !section.merged && (section.itemKind === 'video' || section.items.some(item => item.type === 'video' || isVideoUrl(item.url)));
  const gridClass = isPointSection
    ? 'grid-cols-1 xl:grid-cols-2 gap-5'
    : isVideoSection
      ? 'grid-cols-1 xl:grid-cols-2 gap-5'
      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4';

  return `
    <section id="episode-section-${section.id}" class="episode-section" data-episode-id="${section.id}">
      <div class="episode-sticky-header sticky z-30 -mx-1 px-1 py-3 mb-[0.42rem] bg-ink-950" style="top: var(--header-height, 8rem);">
        <h3 class="text-lg font-medium text-ink-50">${section.name}</h3>
      </div>
      <div class="grid ${gridClass} mb-10">
        ${section.merged
          ? renderBrandMergedCard(section.items)
          : section.items.map(item => item.layout === 'point' ? renderPreheatPointCard(item, section.id) : renderBrandCard(item)).join('')}
      </div>
    </section>
  `;
}

function renderBrandSection(section) {
  const tip = section.tip || '';
  return `
    <section id="episode-section-${section.id}" class="episode-section" data-episode-id="${section.id}">
      <div class="episode-sticky-header sticky z-30 -mx-1 px-1 py-3 mb-[0.42rem] bg-ink-950 flex items-center gap-1.5" style="top: var(--header-height, 8rem);">
        <h3 class="text-lg font-medium text-ink-50">${section.name}</h3>
        ${tip ? `<i class="brand-tip-icon ri-error-warning-line text-sm leading-none cursor-default text-ink-500 hover:text-ink-200 transition-colors" data-tip="${escapeHtmlAttr(tip)}"></i>` : ''}
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        ${section.merged ? renderBrandMergedCard(section.items) : section.items.map(item => renderBrandCard(item)).join('')}
      </div>
    </section>
  `;
}

function renderEpisodeSection(episode) {
  const singlePoint = episode.points.length === 1;
  return `
    <section id="episode-section-${episode.id}" class="episode-section" data-episode-id="${episode.id}">
      <div class="episode-sticky-header sticky z-30 -mx-1 px-1 py-3 mb-[0.42rem] bg-ink-950" style="top: var(--header-height, 8rem);">
        <h3 class="text-lg font-medium text-ink-50">${episode.name}</h3>
      </div>
      <div class="grid grid-cols-1 ${singlePoint ? '' : 'xl:grid-cols-2'} gap-5 mb-10">
        ${episode.points.map((p, i) => renderPointCard(p, episode.id, i, episode.name)).join('')}
      </div>
    </section>
  `;
}

let brandTipEl = null;

function ensureBrandTipEl() {
  if (brandTipEl) return brandTipEl;
  brandTipEl = document.createElement('div');
  brandTipEl.className = 'fixed z-[999] w-64 rounded-[6px] border border-ink-700 bg-ink-800 px-3 py-2 text-[11px] leading-[1.6] text-ink-100 shadow-lg opacity-0 pointer-events-none transition-opacity duration-150 space-y-1';
  document.body.appendChild(brandTipEl);
  return brandTipEl;
}

// 将提示文案中的"标题："部分加粗高亮，其余正文保持普通样式，并保留换行
function formatBrandTipHtml(raw) {
  return String(raw || '')
    .split('\n')
    .map(line => {
      const match = line.match(/^([^：:]{1,10}[：:])(.*)$/);
      if (match) {
        return `<div><span class="font-semibold text-ink-50">${escapeHtmlAttr(match[1])}</span>${escapeHtmlAttr(match[2])}</div>`;
      }
      return `<div>${escapeHtmlAttr(line)}</div>`;
    })
    .join('');
}

function bindBrandTipHover(container) {
  const tipEl = ensureBrandTipEl();
  container.querySelectorAll('.brand-tip-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      const raw = icon.getAttribute('data-tip') || '';
      tipEl.innerHTML = formatBrandTipHtml(raw);
      const rect = icon.getBoundingClientRect();
      tipEl.style.opacity = '1';
      const tipWidth = 256;
      let left = rect.left + rect.width / 2 - tipWidth / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - tipWidth - 8));
      tipEl.style.left = `${left}px`;
      tipEl.style.top = `${rect.bottom + 8}px`;
    });
    icon.addEventListener('mouseleave', () => {
      tipEl.style.opacity = '0';
    });
  });
}

function renderEpisodeContent() {
  const container = document.getElementById('episodeContent');
  if (!container) return;

  const preheatSections = getPreheatSections();
  const brandSections = getLiveBrandSections();
  const episodes = getEpisodes();

  if (!preheatSections.length && !brandSections.length && !episodes.length) {
    container.innerHTML = `
      <div class="fade-in flex flex-col items-center justify-center gap-3 py-24 text-ink-500">
        <i class="ri-folder-info-line text-4xl"></i>
        <p class="text-sm">该级别素材暂未补充，敬请期待</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="fade-in">
      ${preheatSections.map(s => renderPreheatSection(s)).join('')}
      ${brandSections.map(s => renderBrandSection(s)).join('')}
      ${episodes.map(ep => renderEpisodeSection(ep)).join('')}
    </div>
  `;

  bindVideoHover(container);
  bindPointPreviewClick(container);
  bindVideoPreviewClick(container);
  bindPosterPreviewClick(container);
  bindBrandTipHover(container);
  observeEpisodeSections();
}

function bindVideoHover(container) {
  bindVideoHoverAll(container);
}

function getScrollSpyOffset() {
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 128;
  return headerHeight + 60;
}

function resolveActiveSection() {
  if (isAutoScrolling) return;

  const appPanel = document.getElementById('panel-app');
  if (!appPanel || appPanel.classList.contains('hidden')) return;

  const offset = getScrollSpyOffset();
  const sections = Array.from(document.querySelectorAll('.episode-section'));
  if (!sections.length) return;

  let activeSection = sections[0];
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top - offset <= 0 && rect.bottom - offset > 0) {
      activeSection = sec;
    }
  });

  const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
  if (atBottom) activeSection = sections[sections.length - 1];

  const epId = activeSection.getAttribute('data-episode-id');
  let pointId = null;
  const cards = Array.from(activeSection.querySelectorAll('.point-card'));
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top - offset <= 0 && rect.bottom - offset > 0) {
      pointId = card.getAttribute('data-point-id');
    }
  });
  if (!pointId && cards.length) {
    const firstVisible = cards.find(c => c.getBoundingClientRect().bottom - offset > 0);
    if (firstVisible) pointId = firstVisible.getAttribute('data-point-id');
  }

  if (epId !== currentEpisodeId || pointId !== currentPointId) {
    currentEpisodeId = epId;
    currentPointId = pointId;
    renderEpisodeTabs();
    scrollActiveTabIntoView();
  }
}

function scrollActiveTabIntoView() {
  const container = document.getElementById('episodeTabs');
  if (!container) return;
  const activeBtn = container.querySelector('[data-active="true"]');
  if (!activeBtn) return;

  const cRect = container.getBoundingClientRect();
  const bRect = activeBtn.getBoundingClientRect();
  if (bRect.top < cRect.top || bRect.bottom > cRect.bottom) {
    container.scrollTop += bRect.top - cRect.top - container.clientHeight / 3;
  }
}

function observeEpisodeSections() {
  if (scrollSpyBound) {
    resolveActiveSection();
    return;
  }
  scrollSpyBound = true;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      resolveActiveSection();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  resolveActiveSection();
}

function scrollToPoint(episodeId, pointId) {
  const target = document.getElementById(`point-anchor-${episodeId}-${pointId}`);
  if (!target) return;

  isAutoScrolling = true;
  currentEpisodeId = episodeId;
  currentPointId = pointId;
  renderEpisodeTabs();

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  target.classList.add('point-flash');
  setTimeout(() => target.classList.remove('point-flash'), 1200);

  if (autoScrollTimer) clearTimeout(autoScrollTimer);
  autoScrollTimer = setTimeout(() => { isAutoScrolling = false; }, 700);
}

function renderNavButton(section, extraClass = '') {
  const isActive = section.id === currentEpisodeId;
  return `
    <button
      class="episode-tab-btn text-left text-sm px-4 py-2.5 border-l-2 transition-colors ${extraClass} ${
        isActive
          ? 'border-ink-100 text-white bg-ink-800'
          : 'border-transparent text-white/85 hover:text-white hover:bg-ink-800/50'
      }"
      data-episode-id="${section.id}"
      ${isActive ? 'data-active="true"' : ''}
    ><span class="sidebar-label">${section.name}</span></button>
  `;
}

function renderGroupTitle(title, tip = '') {
  if (!tip) {
    return `<div class="sidebar-label px-4 pt-4 pb-1 text-[11px] text-white/60 tracking-wide">${title}</div>`;
  }
  return `
    <div class="sidebar-label px-4 pt-4 pb-1 flex items-center gap-1 text-[11px] text-white/60 tracking-wide">
      <span>${title}</span>
      <i class="group-tip-icon ri-error-warning-line text-[12px] leading-none cursor-default text-white/50 hover:text-white/90 transition-colors" data-tip="${tip}"></i>
    </div>
  `;
}

let groupTipEl = null;

function ensureGroupTipEl() {
  if (groupTipEl) return groupTipEl;
  groupTipEl = document.createElement('div');
  groupTipEl.className = 'fixed z-[999] w-56 rounded-[6px] border border-ink-700 bg-ink-800 px-3 py-2 text-[11px] leading-[1.5] text-ink-100 shadow-lg opacity-0 pointer-events-none transition-opacity duration-150 whitespace-normal';
  document.body.appendChild(groupTipEl);
  return groupTipEl;
}

function bindGroupTipHover(container) {
  const tipEl = ensureGroupTipEl();
  container.querySelectorAll('.group-tip-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      tipEl.textContent = icon.getAttribute('data-tip') || '';
      const rect = icon.getBoundingClientRect();
      tipEl.style.opacity = '1';
      const tipWidth = 224;
      let left = rect.left + rect.width / 2 - tipWidth / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - tipWidth - 8));
      tipEl.style.left = `${left}px`;
      tipEl.style.top = `${rect.bottom + 8}px`;
    });
    icon.addEventListener('mouseleave', () => {
      tipEl.style.opacity = '0';
    });
  });
}

function renderEpisodeTabs() {
  const tabsContainer = document.getElementById('episodeTabs');
  if (!tabsContainer) return;

  const preheatNav = getPreheatSections().map(section => `
    <div class="flex flex-col">
      ${renderNavButton(section)}
    </div>
  `).join('');

  const liveBrandNav = getLiveBrandSections().map(section => `
    <div class="flex flex-col">
      ${renderNavButton(section)}
    </div>
  `).join('');

  const episodeNav = getEpisodes().map(ep => {
    const isActive = ep.id === currentEpisodeId;
    const episodeBtn = `
      <button
        class="episode-tab-btn text-left text-sm px-4 py-2.5 border-l-2 transition-colors ${
          isActive
            ? 'border-ink-100 text-white bg-ink-800'
            : 'border-transparent text-white/85 hover:text-white hover:bg-ink-800/50'
        }"
        data-episode-id="${ep.id}"
        ${isActive && !currentPointId ? 'data-active="true"' : ''}
      ><span class="sidebar-label">${ep.name}</span></button>
    `;

    const pointList = isActive
      ? `<div class="point-nav-group sidebar-label flex flex-col border-l-2 border-ink-100 bg-ink-800/40">
          ${ep.points.map((p, i) => {
            const isPointActive = p.id === currentPointId;
            return `
            <button
              class="point-nav-btn text-left pl-7 pr-3 py-2 transition-colors flex items-center gap-2 ${
                isPointActive
                  ? 'text-white bg-ink-700/60'
                  : 'text-white/85 hover:text-white hover:bg-ink-700/40'
              }"
              data-episode-id="${ep.id}" data-point-id="${p.id}"
              ${isPointActive ? 'data-active="true"' : ''}
              title="${p.name}"
            >
              <span class="text-[11px] ${isPointActive ? 'text-white' : 'text-white/85'} flex-shrink-0">看点${i + 1}</span>
            </button>
          `;
          }).join('')}
        </div>`
      : '';

    return `<div class="flex flex-col">${episodeBtn}${pointList}</div>`;
  }).join('');

  const currentDrama = getCurrentDrama();
  const liveMaterialTip = currentDrama.id === 'custom-movie-huamenglu'
    ? '仅用当前内容做规范示意，实际操作时请按项目要求提供完整素材'
    : '仅用4集内容做规范示意，实际操作时需要提供完整集数的素材';

  tabsContainer.innerHTML = `
    ${renderGroupTitle('预热期素材')}
    ${preheatNav || '<div class="sidebar-label px-4 py-2 text-xs text-ink-600">暂无素材</div>'}
    <div class="sidebar-label border-t border-ink-800 mt-3 pt-3"></div>
    ${renderGroupTitle('开播期素材', liveMaterialTip)}
    ${liveBrandNav}${episodeNav || '<div class="sidebar-label px-4 py-2 text-xs text-ink-600">暂无素材</div>'}
  `;

  bindGroupTipHover(tabsContainer);

  tabsContainer.querySelectorAll('.episode-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchEpisode(btn.getAttribute('data-episode-id'));
    });
  });

  tabsContainer.querySelectorAll('.point-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      scrollToPoint(btn.getAttribute('data-episode-id'), btn.getAttribute('data-point-id'));
    });
  });

  if (sidebarCollapsed) {
    tabsContainer.querySelectorAll('.sidebar-label').forEach(l => l.classList.add('hidden'));
  }
}

function switchEpisode(episodeId) {
  const target = document.getElementById(`episode-section-${episodeId}`);
  if (!target) return;

  isAutoScrolling = true;
  currentEpisodeId = episodeId;
  currentPointId = null;
  renderEpisodeTabs();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (autoScrollTimer) clearTimeout(autoScrollTimer);
  autoScrollTimer = setTimeout(() => { isAutoScrolling = false; }, 700);
}

function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  const sidebar = document.getElementById('episodeSidebar');
  if (!sidebar) return;
  const labels = sidebar.querySelectorAll('.sidebar-label');

  if (sidebarCollapsed) {
    sidebar.classList.remove('w-48');
    sidebar.classList.add('w-14');
    labels.forEach(l => l.classList.add('hidden'));
  } else {
    sidebar.classList.remove('w-14');
    sidebar.classList.add('w-48');
    labels.forEach(l => l.classList.remove('hidden'));
  }
}

export function refreshEpisodeSpy() {
  resolveActiveSection();
}

export function initEpisodes() {
  renderEpisodeTabs();
  renderEpisodeContent();

  const toggleBtn = document.getElementById('sidebarToggleBtn');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);
}

export function reloadEpisodes() {
  currentEpisodeId = getInitialSectionId();
  currentPointId = null;
  renderEpisodeTabs();
  renderEpisodeContent();
}
