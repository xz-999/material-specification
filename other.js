// other.js
// “其他”分类素材：IP logo、概念海报等不属于预热期/开播期的独立素材展示
// 与 APP内素材 tab 一样，左侧提供分组目录，支持点击跳转、滚动联动、折叠展开

import { getCurrentDrama } from './data.js';
import { bindPosterPreviewClick } from './poster-preview.js';
import { renderVideoProgressBarHtml, bindVideoHoverAll } from './video-hover.js';

function getOtherSections() {
  const drama = getCurrentDrama();
  return currentOtherType === 'video' ? (drama.otherVideoSections || []) : (drama.otherSections || []);
}

function getInitialOtherSectionId() {
  return getOtherSections()[0]?.id || null;
}

let currentOtherType = 'static';
let currentOtherSectionId = getInitialOtherSectionId();
let otherSidebarCollapsed = false;
let otherScrollSpyBound = false;
let isOtherAutoScrolling = false;
let otherAutoScrollTimer = null;

function renderImageOrPlaceholder(item, imgClass) {
  if (!item.url) {
    return `
      <div class="flex flex-col items-center justify-center gap-1.5 text-ink-600 h-full">
        <i class="ri-image-line text-2xl"></i>
        <span class="text-[11px] text-ink-500">${item.name || '静态素材'}</span>
        <span class="text-[10px] text-ink-700">待上传</span>
      </div>
    `;
  }
  return `<img src="${item.url}" alt="${item.name}" class="${imgClass}" />`;
}

// 转义HTML属性值中的特殊字符，避免提示文案含引号等字符时破坏属性结构
function escapeHtmlAttr(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// 渲染视频类素材卡片：hover 自动起播，播放失败时保留视频区域占位
// item.hideName 为 true 时隐藏卡片底部的小标题（分区大标题已足够表达）
function renderOtherVideoCard(item) {
  const showName = !item.hideName;
  const showFooter = showName || !!item.sizeHint;
  return `
    <div class="rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors overflow-hidden scroll-mt-36 col-span-2">
      <div class="px-6 pt-6 pb-2">
        <h4 class="text-base font-medium text-ink-100 leading-5">${item.name || '视频素材'}</h4>
      </div>
      <div class="px-6 pb-6">
        <div class="video-hover-box group aspect-video ${item.bg || 'bg-ink-950'} border border-ink-800 rounded-[6px] overflow-hidden relative flex items-center justify-center">
          ${item.url ? `<video src="${item.url}" loop playsinline class="video-autoplay w-full h-full object-contain"></video>` : `<div class="flex flex-col items-center justify-center gap-1.5 text-ink-600 h-full"><i class="ri-film-line text-2xl"></i><span class="text-[11px] text-ink-500">${item.name || '视频素材'}</span><span class="text-[10px] text-ink-700">待上传</span></div>`}
          ${item.url ? `<div class="play-hint absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none transition-opacity duration-200"><div class="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center"><i class="ri-play-fill text-ink-950 text-lg"></i></div></div>` : ''}
          ${item.url ? renderVideoProgressBarHtml() : ''}
        </div>
      </div>
      ${showFooter ? `
      <div class="px-4 py-3 border-t border-ink-800">
        ${showName ? `<p class="text-sm font-medium text-ink-100">${item.name}</p>` : ''}
        ${item.sizeHint ? `<p class="text-[11px] text-ink-500 ${showName ? 'mt-1' : ''} leading-4">${item.sizeHint}</p>` : ''}
      </div>
      ` : ''}
    </div>
  `;
}

function renderOtherCard(item) {
  if (item.type === 'video') return renderOtherVideoCard(item);
  return `
    <div class="rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors overflow-hidden scroll-mt-36">
      <div class="media-hover-zoom ${item.ratio} ${item.bg} overflow-hidden relative flex items-center justify-center p-4 max-h-52">
        ${renderImageOrPlaceholder(item, 'media-zoom-target max-h-full max-w-full object-contain transition-transform duration-300')}
      </div>
      <div class="px-4 py-3 border-t border-ink-800">
        <p class="text-sm font-medium text-ink-100">${item.name}</p>
        ${item.sizeHint ? `<p class="text-[11px] text-ink-500 mt-1 leading-4">${item.sizeHint}</p>` : ''}
      </div>
    </div>
  `;
}

function renderOtherMergedCard(items, groupTitle) {
  const title = groupTitle || items.map(item => item.name).join(' / ');
  return `
    <div class="rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors overflow-hidden scroll-mt-36 col-span-2 sm:col-span-3 lg:col-span-4">
      <div class="px-6 pt-6 pb-4">
        <h4 class="text-base font-medium text-ink-100 leading-5">${title}</h4>
      </div>
      <div class="px-6 pb-6">
        <div class="flex flex-wrap gap-3">
          ${items.map(item => `
            <div class="poster-hover-zoom group ${item.bg} rounded-[6px] border border-ink-800 overflow-hidden relative flex items-center justify-center h-[420px] cursor-zoom-in merged-poster-item" data-poster-preview data-poster-title="${item.name}">
              ${renderImageOrPlaceholder(item, 'poster-zoom-target w-full h-full object-contain transition-transform duration-300')}
              <div class="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors pointer-events-none">
                <i class="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="flex flex-wrap gap-3 mt-2">
          ${items.map(item => `
            <p class="text-[11px] text-ink-500 text-center leading-4 merged-poster-item">${item.sizeHint || ''}</p>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// 渲染带多套子分组文案的整块卡片（如人物海报：人物角色海报 / 光影轮廓海报，各自一组多图）
function renderOtherGroupItems(items) {
  return `
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      ${items.map(item => `
        <div class="poster-hover-zoom group ${item.bg} rounded-[6px] border border-ink-800 overflow-hidden relative flex items-center justify-center h-[420px] cursor-zoom-in" data-poster-preview data-poster-title="${item.name}">
          ${renderImageOrPlaceholder(item, 'poster-zoom-target w-full h-full object-contain transition-transform duration-300')}
          <div class="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors pointer-events-none">
            <i class="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderOtherGroupsCard(groups) {
  return `
    <div class="rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors overflow-hidden scroll-mt-36 col-span-2 sm:col-span-3 lg:col-span-4">
      ${groups.map((group, index) => `
        <div class="px-6 ${index === 0 ? 'pt-6' : 'pt-2'} pb-6 ${index < groups.length - 1 ? 'border-b border-ink-800' : ''}">
          <h4 class="text-base font-medium text-ink-100 leading-5 mb-2.5">${group.name}</h4>
          ${renderOtherGroupItems(group.items)}
        </div>
      `).join('')}
    </div>
  `;
}

function renderOtherSection(section) {
  const tip = section.tip || '';
  const showTitle = !section.hideTitle;
  const titleText = section.displayTitle || section.name;
  return `
    <section id="other-section-${section.id}" class="other-section" data-other-id="${section.id}">
      <div class="other-sticky-header sticky z-30 -mx-1 px-1 py-3 mb-[0.42rem] bg-ink-950 flex items-center gap-1.5" style="top: var(--header-height, 8rem);">
        ${showTitle ? `<h3 class="text-lg font-medium text-ink-50">${titleText}</h3>` : ''}
        ${tip ? `<i class="other-tip-icon ri-error-warning-line text-sm leading-none cursor-default text-ink-500 hover:text-ink-200 transition-colors" data-tip="${escapeHtmlAttr(tip)}"></i>` : ''}
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        ${section.groups
          ? renderOtherGroupsCard(section.groups)
          : section.merged
            ? renderOtherMergedCard(section.items, section.groupTitle)
            : section.items.map(item => renderOtherCard(item)).join('')}
      </div>
    </section>
  `;
}

function bindOtherHover(container) {
  container.querySelectorAll('.media-hover-zoom').forEach(zoomBox => {
    zoomBox.style.zIndex = 1;
    zoomBox.addEventListener('mouseenter', () => { zoomBox.style.zIndex = 20; });
    zoomBox.addEventListener('mouseleave', () => { zoomBox.style.zIndex = 1; });
  });
}

// 视频素材 hover 自动起播，失败时回落到封面/占位
function bindOtherVideoHover(container) {
  bindVideoHoverAll(container);
}

let otherTipEl = null;

function ensureOtherTipEl() {
  if (otherTipEl) return otherTipEl;
  otherTipEl = document.createElement('div');
  otherTipEl.className = 'fixed z-[999] w-64 rounded-[6px] border border-ink-700 bg-ink-800 px-3 py-2 text-[11px] leading-[1.6] text-ink-100 shadow-lg opacity-0 pointer-events-none transition-opacity duration-150 space-y-1';
  document.body.appendChild(otherTipEl);
  return otherTipEl;
}

function bindOtherTipHover(container) {
  const tipEl = ensureOtherTipEl();
  container.querySelectorAll('.other-tip-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      const raw = icon.getAttribute('data-tip') || '';
      tipEl.innerHTML = formatTipHtml(raw);
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

// 将提示文案中的"标题："部分加粗高亮，其余正文保持普通样式，并保留换行
function formatTipHtml(raw) {
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

function renderOtherContent() {
  const container = document.getElementById('otherContent');
  if (!container) return;

  const sections = getOtherSections();

  if (!sections.length) {
    const emptyText = currentOtherType === 'video' ? '视频素材暂未补充' : '静态素材暂未补充';
    container.innerHTML = `
      <div class="fade-in flex flex-col items-center justify-center gap-3 py-24 text-ink-500 border border-ink-800 rounded-[6px] bg-ink-900/60">
        <i class="ri-folder-info-line text-4xl"></i>
        <p class="text-sm">${emptyText}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="fade-in">
      ${sections.map(section => renderOtherSection(section)).join('')}
    </div>
  `;

  bindOtherHover(container);
  bindOtherVideoHover(container);
  bindOtherTipHover(container);
  bindPosterPreviewClick(container);
  observeOtherSections();
}

function getOtherScrollSpyOffset() {
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 128;
  return headerHeight + 60;
}

function resolveActiveOtherSection() {
  if (isOtherAutoScrolling) return;

  const otherPanel = document.getElementById('panel-other');
  if (!otherPanel || otherPanel.classList.contains('hidden')) return;

  const offset = getOtherScrollSpyOffset();
  const sections = Array.from(document.querySelectorAll('.other-section'));
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

  const sectionId = activeSection.getAttribute('data-other-id');
  if (sectionId !== currentOtherSectionId) {
    currentOtherSectionId = sectionId;
    const activeData = getOtherSections().find(s => s.id === sectionId);
    if (activeData && activeData.group) {
      otherGroupCollapsedMap[activeData.group] = false;
    }
    renderOtherTabs();
    scrollActiveOtherTabIntoView();
  }
}

function scrollActiveOtherTabIntoView() {
  const container = document.getElementById('otherTabs');
  if (!container) return;
  const activeBtn = container.querySelector('[data-active="true"]');
  if (!activeBtn) return;

  const cRect = container.getBoundingClientRect();
  const bRect = activeBtn.getBoundingClientRect();
  if (bRect.top < cRect.top || bRect.bottom > cRect.bottom) {
    container.scrollTop += bRect.top - cRect.top - container.clientHeight / 3;
  }
}

function observeOtherSections() {
  if (otherScrollSpyBound) {
    resolveActiveOtherSection();
    return;
  }
  otherScrollSpyBound = true;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      resolveActiveOtherSection();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  resolveActiveOtherSection();
}

function switchOtherSection(sectionId) {
  const target = document.getElementById(`other-section-${sectionId}`);
  if (!target) return;

  isOtherAutoScrolling = true;
  currentOtherSectionId = sectionId;
  renderOtherTabs();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (otherAutoScrollTimer) clearTimeout(otherAutoScrollTimer);
  otherAutoScrollTimer = setTimeout(() => { isOtherAutoScrolling = false; }, 700);
}

// 记录各分组（母tab）的展开/收起状态，默认展开
const otherGroupCollapsedMap = {};

function renderOtherTabItem(section) {
  const isActive = section.id === currentOtherSectionId;
  return `
    <button
      class="other-tab-btn text-left text-sm px-4 py-2.5 border-l-2 transition-colors ${
        isActive
          ? 'border-ink-100 text-white bg-ink-800'
          : 'border-transparent text-white/85 hover:text-white hover:bg-ink-800/50'
      }"
      data-other-id="${section.id}"
      ${isActive ? 'data-active="true"' : ''}
    ><span class="sidebar-label">${section.name}</span></button>
  `;
}

function renderOtherTabs() {
  const tabsContainer = document.getElementById('otherTabs');
  if (!tabsContainer) return;

  const sections = getOtherSections();

  // 按出现顺序将连续的同 group 分组收纳进一个可展开/收起的母tab
  const nodes = [];
  let i = 0;
  while (i < sections.length) {
    const section = sections[i];
    if (section.group) {
      const groupName = section.group;
      const groupSections = [];
      while (i < sections.length && sections[i].group === groupName) {
        groupSections.push(sections[i]);
        i += 1;
      }
      const hasActiveChild = groupSections.some(s => s.id === currentOtherSectionId);
      if (otherGroupCollapsedMap[groupName] === undefined) {
        otherGroupCollapsedMap[groupName] = false;
      }
      const isCollapsed = otherGroupCollapsedMap[groupName];
      // 单 section 的 group：直接作为普通 tab 展示，不渲染子分支
      if (groupSections.length === 1) {
        const s = groupSections[0];
        const isActive = s.id === currentOtherSectionId;
        nodes.push(`
          <div class="flex flex-col">
            <button
              class="other-tab-btn flex items-center text-left text-sm px-4 py-2.5 border-l-2 transition-colors ${
                isActive ? 'border-ink-100 text-white' : 'border-transparent text-white/85 hover:text-white hover:bg-ink-800/50'
              }"
              data-other-id="${s.id}"
            >
              <span class="sidebar-label">${groupName}</span>
            </button>
          </div>
        `);
      } else {
      nodes.push(`
        <div class="flex flex-col other-group" data-group-name="${escapeHtmlAttr(groupName)}">
          <button
            class="other-group-btn flex items-center justify-between text-left text-sm px-4 py-2.5 border-l-2 transition-colors ${
              hasActiveChild ? 'border-ink-100 text-white' : 'border-transparent text-white/85 hover:text-white hover:bg-ink-800/50'
            }"
            data-group-name="${escapeHtmlAttr(groupName)}"
          >
            <span class="sidebar-label font-medium">${groupName}</span>
            <i class="ri-arrow-down-s-line sidebar-label transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}"></i>
          </button>
          <div class="other-group-children flex flex-col ${isCollapsed ? 'hidden' : ''}">
            ${groupSections.map(s => `<div class="flex flex-col pl-3">${renderOtherTabItem(s)}</div>`).join('')}
          </div>
        </div>
      `);
      }
    } else {
      nodes.push(`<div class="flex flex-col">${renderOtherTabItem(section)}</div>`);
      i += 1;
    }
  }

  tabsContainer.innerHTML = nodes.join('') || '<div class="sidebar-label px-4 py-2 text-xs text-ink-600">暂无素材</div>';

  tabsContainer.querySelectorAll('.other-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchOtherSection(btn.getAttribute('data-other-id'));
    });
  });

  tabsContainer.querySelectorAll('.other-group-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const groupName = btn.getAttribute('data-group-name');
      otherGroupCollapsedMap[groupName] = !otherGroupCollapsedMap[groupName];
      renderOtherTabs();
    });
  });

  if (otherSidebarCollapsed) {
    tabsContainer.querySelectorAll('.sidebar-label').forEach(l => l.classList.add('hidden'));
  }
}

function switchOtherType(type) {
  if (type === currentOtherType) return;
  currentOtherType = type;
  currentOtherSectionId = getInitialOtherSectionId();
  renderOtherTypeTabs();
  renderOtherTabs();
  renderOtherContent();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderOtherTypeTabs() {
  const buttons = document.querySelectorAll('.other-type-btn');
  buttons.forEach(btn => {
    const type = btn.getAttribute('data-other-type');
    const isActive = type === currentOtherType;
    btn.classList.toggle('active', isActive);
    btn.classList.toggle('text-ink-100', isActive);
    btn.classList.toggle('text-ink-400', !isActive);
  });
}

function bindOtherTypeTabs() {
  document.querySelectorAll('.other-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchOtherType(btn.getAttribute('data-other-type'));
    });
  });
  renderOtherTypeTabs();
}

function toggleOtherSidebar() {
  otherSidebarCollapsed = !otherSidebarCollapsed;
  const sidebar = document.getElementById('otherSidebar');
  if (!sidebar) return;
  const labels = sidebar.querySelectorAll('.sidebar-label');

  if (otherSidebarCollapsed) {
    sidebar.classList.remove('w-48');
    sidebar.classList.add('w-14');
    labels.forEach(l => l.classList.add('hidden'));
  } else {
    sidebar.classList.remove('w-14');
    sidebar.classList.add('w-48');
    labels.forEach(l => l.classList.remove('hidden'));
  }
}

export function refreshOtherSpy() {
  resolveActiveOtherSection();
}

export function initOther() {
  bindOtherTypeTabs();
  renderOtherTabs();
  renderOtherContent();

  const toggleBtn = document.getElementById('otherSidebarToggleBtn');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleOtherSidebar);
}

export function reloadOther() {
  currentOtherType = 'static';
  currentOtherSectionId = getInitialOtherSectionId();
  renderOtherTypeTabs();
  renderOtherTabs();
  renderOtherContent();
}
