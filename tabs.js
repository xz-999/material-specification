// tabs.js
// 顶部两个主 Tab（APP内素材/其他）的切换逻辑

import { refreshEpisodeSpy } from './episodes.js';
import { refreshOtherSpy } from './other.js';

export function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = {
    app: document.getElementById('panel-app'),
    other: document.getElementById('panel-other')
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        if (b === btn) {
          b.classList.add('active', 'text-ink-100');
          b.classList.remove('text-ink-400');
        } else {
          b.classList.remove('active', 'text-ink-100');
          b.classList.add('text-ink-400');
        }
      });

      Object.entries(panels).forEach(([key, el]) => {
        if (!el) return;
        if (key === target) {
          el.classList.remove('hidden');
          el.classList.add('fade-in');
        } else {
          el.classList.add('hidden');
        }
      });

      if (target === 'app') {
        requestAnimationFrame(() => refreshEpisodeSpy());
      }
      if (target === 'other') {
        requestAnimationFrame(() => refreshOtherSpy());
      }
    });
  });
}
