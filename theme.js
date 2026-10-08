// theme.js
// 全站主题切换：设置入口（位于顶部导航“素材规范”左侧），点击弹出下拉菜单，
// 可在 深色（默认） / 浅色 两种模式间切换，选择后立即对整站生效并持久化到 localStorage，
// 跨页面（index.html / spec.html）共享同一份主题状态

const THEME_STORAGE_KEY = 'ui-theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

function getStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;
  } catch (e) {
    return THEME_DARK;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    // 忽略隐私模式等 localStorage 不可用场景
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === THEME_LIGHT) {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
  syncMenuState(theme);
}

function syncMenuState(theme) {
  document.querySelectorAll('.theme-option-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-theme-value') === theme;
    const check = btn.querySelector('.theme-option-check');
    if (check) check.classList.toggle('invisible', !isActive);
  });
}

let menuBound = false;

function ensureThemeMenu(anchorBtn) {
  let menu = document.getElementById('themeMenu');
  if (menu) return menu;

  menu = document.createElement('div');
  menu.id = 'themeMenu';
  menu.className = 'hidden absolute left-0 top-full mt-2 min-w-[150px] rounded-[6px] border border-ink-800 bg-ink-900 shadow-xl overflow-hidden z-50 py-1';
  menu.innerHTML = `
    <button type="button" class="theme-option-btn w-full flex items-center justify-between gap-3 px-3.5 py-2 text-sm text-ink-200 hover:bg-ink-800 hover:text-ink-50 transition-colors" data-theme-value="${THEME_DARK}">
      <span class="flex items-center gap-2"><i class="ri-moon-line"></i>深色模式</span>
      <i class="ri-check-line theme-option-check invisible"></i>
    </button>
    <button type="button" class="theme-option-btn w-full flex items-center justify-between gap-3 px-3.5 py-2 text-sm text-ink-200 hover:bg-ink-800 hover:text-ink-50 transition-colors" data-theme-value="${THEME_LIGHT}">
      <span class="flex items-center gap-2"><i class="ri-sun-line"></i>浅色模式</span>
      <i class="ri-check-line theme-option-check invisible"></i>
    </button>
  `;
  anchorBtn.parentElement.appendChild(menu);

  menu.querySelectorAll('.theme-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme-value');
      setStoredTheme(theme);
      applyTheme(theme);
      menu.classList.add('hidden');
    });
  });

  return menu;
}

function bindThemeMenuToggle(btn, menu) {
  if (menuBound) return;
  menuBound = true;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('hidden') && !menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
}

function renderThemeEntry(mountEl) {
  if (!mountEl || document.getElementById('themeSettingBtn')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'relative';
  wrapper.innerHTML = `
    <button id="themeSettingBtn" type="button" title="外观设置" class="w-8 h-8 rounded-[6px] flex items-center justify-center text-ink-400 hover:text-ink-100 hover:bg-ink-800 transition-colors">
      <i class="ri-settings-3-line text-base"></i>
    </button>
  `;
  mountEl.appendChild(wrapper);

  const btn = wrapper.querySelector('#themeSettingBtn');
  const menu = ensureThemeMenu(btn);
  bindThemeMenuToggle(btn, menu);
  syncMenuState(getStoredTheme());
}

export function initTheme() {
  applyTheme(getStoredTheme());

  const mountEl = document.getElementById('themeEntryMount');
  renderThemeEntry(mountEl);
}
