// level.js
// 标题右侧的级别下拉切换：默认展示 S+/S级，可切换到 A级（内容稍后补齐）

import { LEVELS, getCurrentDrama, getCurrentLevelId, setCurrentLevel } from './data.js';
import { reloadEpisodes } from './episodes.js';
import { reloadOther } from './other.js';

function getLevelName(levelId) {
  const drama = getCurrentDrama();
  if (drama.isDynamic && levelId === LEVELS[0].id) return drama.defaultLevel || LEVELS[0].name;
  const level = LEVELS.find(l => l.id === levelId);
  return level ? level.name : '';
}

function renderLevelMenu() {
  const menu = document.getElementById('levelMenu');
  if (!menu) return;
  const currentId = getCurrentLevelId();

  menu.innerHTML = LEVELS.map(l => {
    const isActive = l.id === currentId;
    return `
      <button
        class="level-menu-item w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
          isActive
            ? 'text-ink-100 bg-ink-800'
            : 'text-ink-400 hover:text-ink-100 hover:bg-ink-800/60'
        }"
        data-level-id="${l.id}"
      >
        <span>${l.name}</span>
        ${isActive ? '<i class="ri-check-line text-ink-100"></i>' : ''}
      </button>
    `;
  }).join('');

  menu.querySelectorAll('.level-menu-item').forEach(btn => {
    btn.addEventListener('click', () => {
      switchLevel(btn.getAttribute('data-level-id'));
    });
  });
}

function openMenu() {
  const menu = document.getElementById('levelMenu');
  const caret = document.getElementById('levelCaret');
  if (!menu) return;
  renderLevelMenu();
  menu.classList.remove('hidden');
  if (caret) caret.classList.add('is-open');
}

function closeMenu() {
  const menu = document.getElementById('levelMenu');
  const caret = document.getElementById('levelCaret');
  if (!menu) return;
  menu.classList.add('hidden');
  if (caret) caret.classList.remove('is-open');
}

function toggleMenu() {
  const menu = document.getElementById('levelMenu');
  if (!menu) return;
  if (menu.classList.contains('hidden')) openMenu();
  else closeMenu();
}

function switchLevel(levelId) {
  setCurrentLevel(levelId);
  closeMenu();

  const labelEl = document.getElementById('levelLabel');
  if (labelEl) labelEl.textContent = getLevelName(levelId);

  // 重新渲染 APP 内素材面板的数据
  reloadEpisodes();
  reloadOther();

  // 切换后回到页面顶部，保证目录联动从头开始
  window.scrollTo({ top: 0, behavior: 'auto' });
}

// 剧集切换后，级别重置为默认（S+/S级），并同步按钮文案
export function resetLevelLabel() {
  setCurrentLevel(LEVELS[0].id);
  const labelEl = document.getElementById('levelLabel');
  if (labelEl) labelEl.textContent = getLevelName(LEVELS[0].id);
}

export function initLevel() {
  const labelEl = document.getElementById('levelLabel');
  if (labelEl) labelEl.textContent = getLevelName(getCurrentLevelId());

  const btn = document.getElementById('levelSwitchBtn');
  if (btn) {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  document.addEventListener('click', e => {
    const menu = document.getElementById('levelMenu');
    const switchBtn = document.getElementById('levelSwitchBtn');
    if (!menu || menu.classList.contains('hidden')) return;
    if (menu.contains(e.target) || (switchBtn && switchBtn.contains(e.target))) return;
    closeMenu();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}
