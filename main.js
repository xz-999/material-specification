// main.js
// 应用入口：初始化项目数据、Tab切换、素材展示与新增/编辑功能

import { initTabs } from './tabs.js';
import { initEpisodes } from './episodes.js';
import { initDrama } from './drama.js';
import { initLevel } from './level.js';
import { initOther } from './other.js';
import { initTheme } from './theme.js';

function syncHeaderHeight() {
  const header = document.querySelector('header');
  if (!header) return;
  document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
}

document.addEventListener('DOMContentLoaded', async () => {
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  initTheme();
  initTabs();
  initEpisodes();
  initDrama();
  initLevel();
  initOther();
});
