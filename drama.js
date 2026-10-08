// drama.js
// 顶部标题旁的剧集下拉切换：切换剧集时更新标题并重渲染 APP 内素材面板

import { getDramas, getCurrentDramaId, setCurrentDrama } from './data.js';
import { reloadEpisodes } from './episodes.js';
import { resetLevelLabel } from './level.js';
import { reloadOther } from './other.js';

// 各剧集专属素材规范页面：未配置的剧集沿用全局素材规范页面 spec.html
const SPEC_PAGE_BY_DRAMA = {
  earthfresh: './spec-earthfresh.html'
};

export function syncSpecEntryLink() {
  const link = document.getElementById('specEntryLink');
  if (!link) return;
  const dramaId = getCurrentDramaId();
  link.setAttribute('href', SPEC_PAGE_BY_DRAMA[dramaId] || './spec.html');
}

export function renderDramaMenu() {
  const menu = document.getElementById('dramaMenu');
  if (!menu) return;
  const currentId = getCurrentDramaId();

  menu.innerHTML = getDramas().map(d => {
    const isActive = d.id === currentId;
    return `
      <button
        class="drama-menu-item w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
          isActive
            ? 'text-ink-100 bg-ink-800'
            : 'text-ink-400 hover:text-ink-100 hover:bg-ink-800/60'
        }"
        data-drama-id="${d.id}"
      >
        <span>${d.name}</span>
        ${isActive ? '<i class="ri-check-line text-ink-100"></i>' : ''}
      </button>
    `;
  }).join('');

  menu.querySelectorAll('.drama-menu-item').forEach(btn => {
    btn.addEventListener('click', () => {
      switchDrama(btn.getAttribute('data-drama-id'));
    });
  });
}

function openMenu() {
  const menu = document.getElementById('dramaMenu');
  const caret = document.getElementById('dramaCaret');
  if (!menu) return;
  renderDramaMenu();
  menu.classList.remove('hidden');
  if (caret) caret.classList.add('is-open');
}

function closeMenu() {
  const menu = document.getElementById('dramaMenu');
  const caret = document.getElementById('dramaCaret');
  if (!menu) return;
  menu.classList.add('hidden');
  if (caret) caret.classList.remove('is-open');
}

function toggleMenu() {
  const menu = document.getElementById('dramaMenu');
  if (!menu) return;
  if (menu.classList.contains('hidden')) openMenu();
  else closeMenu();
}

export function switchDrama(dramaId) {
  const drama = setCurrentDrama(dramaId);
  closeMenu();

  const titleEl = document.getElementById('dramaTitle');
  if (titleEl) titleEl.textContent = drama.name;
  document.title = drama.name;

  // 切换剧集后级别重置为默认 S+/S级
  resetLevelLabel();

  // 同步素材规范入口地址（部分剧集拥有专属规范页面）
  syncSpecEntryLink();

  // 重新渲染 APP 内素材面板的数据
  reloadEpisodes();
  reloadOther();

  // 切换后回到页面顶部，保证目录联动从头开始
  window.scrollTo({ top: 0, behavior: 'auto' });
}

export function initDrama() {
  syncSpecEntryLink();

  const btn = document.getElementById('dramaSwitchBtn');
  if (btn) {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // 点击页面其他区域关闭菜单
  document.addEventListener('click', e => {
    const menu = document.getElementById('dramaMenu');
    const switchBtn = document.getElementById('dramaSwitchBtn');
    if (!menu || menu.classList.contains('hidden')) return;
    if (menu.contains(e.target) || (switchBtn && switchBtn.contains(e.target))) return;
    closeMenu();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}
