// spec.js
// 素材规范二级页面：图片规范 / 视频规范 两个子 Tab，纯展示统一标准说明，页面独立加载运行

import { initTheme } from './theme.js';
import { renderVideoProgressBarHtml, bindClickPlayProgressBarAll } from './video-hover.js';

const specData = {
  overview: {
    singleImage: 'https://vfiles.gtimg.cn/wupload/xy/starter/e7a57361.png'
  },
  principle: {
    title: '通用原则',
    subtitle: '审美是底线 效果是高线',
    categories: [
      { key: 'accurate', label: '准确', images: ['https://vfiles.gtimg.cn/wupload/xy/starter/8fda7f41.png', 'https://vfiles.gtimg.cn/wupload/xy/starter/55992167.png'] },
      { key: 'unique', label: '独特', images: ['https://vfiles.gtimg.cn/wupload/xy/starter/34344764.png', 'https://vfiles.gtimg.cn/wupload/xy/starter/79fc0818.png'] },
      { key: 'expressive', label: '表现力', images: [
        'https://vfiles.gtimg.cn/wupload/xy/starter/73384677.png',
        {
          src: 'https://vfiles.gtimg.cn/wupload/xy/starter/d28ac65d.png',
          baseWidth: 2896,
          baseHeight: 1629,
          videos: [
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/0b6b33bb.mp4', left: 54, bottom: 146, width: 1382, height: 777 },
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/45a805f1.mp4', left: 1456, bottom: 146, width: 1382, height: 777 }
          ]
        },
        {
          src: 'https://vfiles.gtimg.cn/wupload/xy/starter/f8b3256a.png',
          baseWidth: 2896,
          baseHeight: 1629,
          videos: [
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/f2b5822d.mp4', left: 54, bottom: 146, width: 1382, height: 777 },
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/8ec7db33.mp4', left: 1456, bottom: 146, width: 1382, height: 777 }
          ]
        }
      ] }
    ]
  },
  image: {
    title: '图片素材规范',
    categories: [
      { key: 'size', label: '尺寸', images: ['https://vfiles.gtimg.cn/wupload/xy/starter/1821c0e0.png'] },
      { key: 'shot', label: '景别', images: ['https://vfiles.gtimg.cn/wupload/xy/starter/2f3f11a9.png'] },
      { key: 'color', label: '色彩', images: ['https://vfiles.gtimg.cn/wupload/xy/starter/32bc6637.png'] },
      { key: 'composition', label: '构图', images: ['https://vfiles.gtimg.cn/wupload/xy/starter/a8420f3c.png'] },
      { key: 'narrative', label: '叙事', images: ['https://vfiles.gtimg.cn/wupload/xy/starter/7d82cefa.png'] },
      { key: 'emotion', label: '情绪', images: ['https://vfiles.gtimg.cn/wupload/xy/starter/9f3a6280.png'] },
      { key: 'subject', label: '主体', images: [
        'https://vfiles.gtimg.cn/wupload/xy/starter/7fc84eb5.png'
      ] },
      { key: 'collage', label: '拼图', images: [
        'https://vfiles.gtimg.cn/wupload/xy/starter/5e6d2191.png',
        'https://vfiles.gtimg.cn/wupload/xy/starter/1445f662.png',
        'https://vfiles.gtimg.cn/wupload/xy/starter/2ca53f50.png',
        'https://vfiles.gtimg.cn/wupload/xy/starter/17f7e557.png',
        'https://vfiles.gtimg.cn/wupload/xy/starter/d72b4819.png'
      ] }
    ]
  },
  video: {
    title: '视频素材规范',
    categories: [
      { key: 'size', label: '尺寸', images: [
        {
          src: 'https://vfiles.gtimg.cn/wupload/xy/starter/fe416493.png',
          baseWidth: 2896,
          baseHeight: 1629,
          videos: [
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/cbe1cf5a.mp4', left: 180, top: 339, width: 1920, height: 1080 },
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/cbe1cf5a.mp4', left: 2195, top: 647, width: 466, height: 262, radius: 5 }
          ]
        }
      ] },
      { key: 'rhythm', label: '节奏', images: [
        {
          src: 'https://vfiles.gtimg.cn/wupload/xy/starter/2f6c184e.png',
          baseWidth: 2896,
          baseHeight: 1629,
          videos: [
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/d18265a5.mp4', left: 92, top: 511, width: 1272, height: 716 },
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/763c96d6.mp4', left: 1532, top: 511, width: 1272, height: 716 }
          ]
        },
        {
          src: 'https://vfiles.gtimg.cn/wupload/xy/starter/0bcf4c4a.png',
          baseWidth: 2896,
          baseHeight: 1629,
          videos: [
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/ab764a8d.mp4', left: 92, top: 511, width: 1272, height: 716 },
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/2201db3c.mp4', left: 1532, top: 511, width: 1272, height: 716 }
          ]
        },
        {
          src: 'https://vfiles.gtimg.cn/wupload/xy/starter/1fe2638d.png',
          baseWidth: 2896,
          baseHeight: 1629,
          videos: [
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/6f435d3a.mp4', left: 54, top: 587, width: 1517, height: 853 }
          ]
        },
        {
          src: 'https://vfiles.gtimg.cn/wupload/xy/starter/2da2c962.png',
          baseWidth: 2896,
          baseHeight: 1629,
          videos: [
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/42107b12.mp4', left: 92, top: 511, width: 1272, height: 716 },
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/19e119b7.mp4', left: 1532, top: 511, width: 1272, height: 716 }
          ]
        },
        {
          src: 'https://vfiles.gtimg.cn/wupload/xy/starter/4e0c681b.png',
          baseWidth: 2896,
          baseHeight: 1629,
          videos: [
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/8f5b38b8.mp4', left: 92, top: 511, width: 1272, height: 716 },
            { url: 'https://vfiles.gtimg.cn/wupload/xy/starter/42fbe722.mp4', left: 1532, top: 511, width: 1272, height: 716 }
          ]
        }
      ] },
      { key: 'cover', label: '封面', images: [
        'https://vfiles.gtimg.cn/wupload/xy/starter/65cd607e.png',
        'https://vfiles.gtimg.cn/wupload/xy/starter/830d1879.png'
      ] }
    ]
  },
  logo: {
    singleImage: 'https://vfiles.gtimg.cn/wupload/xy/starter/017d644e.png'
  }
};

const tabList = [
  { key: 'overview', label: '框架' },
  { key: 'principle', label: '通用原则' },
  { key: 'image', label: '图片' },
  { key: 'video', label: '视频' },
  { key: 'logo', label: 'logo' }
];

let currentSpecTab = 'overview';
let expandedTabs = { overview: true, principle: false, image: false, video: false, logo: false };
const currentSectionKeyByTab = {
  principle: 'accurate',
  image: 'size',
  video: 'size'
};

function parseHash() {
  const raw = (window.location.hash || '').replace(/^#/, '');
  if (!raw) return null;
  const [tabKey, sectionKey] = raw.split('/');
  if (!tabList.some(t => t.key === tabKey)) return null;
  return { tabKey, sectionKey: sectionKey || null };
}

function applyHashState() {
  const parsed = parseHash();
  if (!parsed) return false;

  currentSpecTab = parsed.tabKey;
  expandedTabs[parsed.tabKey] = true;

  const data = specData[parsed.tabKey];
  if (parsed.sectionKey && data && data.categories && data.categories.some(c => c.key === parsed.sectionKey)) {
    currentSectionKeyByTab[parsed.tabKey] = parsed.sectionKey;
  }
  return true;
}

let suppressHashUpdate = false;

function updateHash(tabKey, sectionKey) {
  suppressHashUpdate = true;
  const hash = sectionKey ? `#${tabKey}/${sectionKey}` : `#${tabKey}`;
  history.replaceState(null, '', hash);
  window.setTimeout(() => { suppressHashUpdate = false; }, 0);
}

function renderSpecCard(rule) {
  return `
    <div class="rounded-[6px] border border-ink-800 bg-ink-900 hover:border-ink-600 transition-colors p-5 flex gap-4">
      <div class="w-10 h-10 rounded-[6px] bg-ink-800 flex items-center justify-center flex-shrink-0">
        <i class="${rule.icon} text-ink-200 text-lg"></i>
      </div>
      <div class="min-w-0">
        <p class="text-sm font-medium text-ink-100">${rule.label}</p>
        <p class="text-xs text-ink-400 mt-1.5 leading-5">${rule.value}</p>
      </div>
    </div>
  `;
}

function renderTreeNav() {
  const nav = document.getElementById('specTreeNav');
  if (!nav) return;

  nav.innerHTML = tabList.map(tab => {
    const isTabActive = tab.key === currentSpecTab;
    const isExpanded = !!expandedTabs[tab.key];
    const data = specData[tab.key];
    const hasChildren = !!(data && data.categories);
    const childrenHtml = hasChildren ? data.categories.map(item => {
      const isChildActive = isTabActive && item.key === currentSectionKeyByTab[tab.key];
      return `
        <button
          type="button"
          data-tab-key="${tab.key}"
          data-section-key="${item.key}"
          class="section-nav-btn w-full text-left pl-7 pr-3 py-2 rounded-[6px] text-sm transition-colors ${isChildActive ? 'bg-ink-800 text-ink-50' : 'text-ink-400 hover:bg-ink-900 hover:text-ink-200'}"
        >
          ${item.label}
        </button>
      `;
    }).join('') : '';

    return `
      <div class="spec-tree-group">
        <button
          type="button"
          data-spec-tab="${tab.key}"
          class="spec-tab-btn w-full flex items-center justify-between gap-2 text-left px-3 py-2.5 rounded-[6px] text-sm font-medium transition-colors ${isTabActive ? 'bg-ink-800 text-ink-100' : 'text-ink-400 hover:bg-ink-900 hover:text-ink-200'}"
        >
          <span class="whitespace-nowrap overflow-hidden">${tab.label}</span>
          ${hasChildren ? `<i class="ri-arrow-down-s-line text-base flex-shrink-0 transition-transform ${isExpanded ? '' : '-rotate-90'}"></i>` : ''}
        </button>
        ${hasChildren ? `
        <div class="spec-tree-children flex flex-col gap-1 mt-1 ${isExpanded ? '' : 'hidden'}">
          ${childrenHtml}
        </div>
        ` : ''}
      </div>
    `;
  }).join('');

  nav.querySelectorAll('[data-spec-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-spec-tab');
      if (key === currentSpecTab) {
        expandedTabs[key] = !expandedTabs[key];
        renderTreeNav();
        return;
      }
      currentSpecTab = key;
      expandedTabs[key] = true;
      renderTreeNav();
      renderSpecContent();
      updateHash(key, specData[key] && specData[key].categories ? currentSectionKeyByTab[key] : null);
    });
  });

  nav.querySelectorAll('.section-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-tab-key');
      const sectionKey = btn.getAttribute('data-section-key');
      const isTabSwitch = tabKey !== currentSpecTab;

      currentSpecTab = tabKey;
      expandedTabs[tabKey] = true;
      currentSectionKeyByTab[tabKey] = sectionKey;
      renderTreeNav();
      updateHash(tabKey, sectionKey);

      if (isTabSwitch) {
        renderSpecContent();
      }

      const container = document.getElementById('specContent');
      const target = container && container.querySelector(`[data-section-block="${sectionKey}"]`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function renderCategoryBody(item) {
  if (item.rules) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${item.rules.map(rule => renderSpecCard(rule)).join('')}
      </div>
    `;
  }
  return `
    <div class="flex flex-col gap-4">
      ${item.images.map(img => {
        if (typeof img === 'string') {
          return `
            <div class="rounded-[6px] border border-ink-800 bg-ink-900 overflow-hidden flex items-center justify-center">
              <img src="${img}" alt="${item.label}" class="w-full h-auto object-contain" />
            </div>
          `;
        }
        const videosHtml = (img.videos || []).map((v, vIndex) => {
          const leftPct = (v.left / img.baseWidth) * 100;
          const widthPct = (v.width / img.baseWidth) * 100;
          const heightPct = (v.height / img.baseHeight) * 100;
          const posPct = (typeof v.top === 'number')
            ? `top:${(v.top / img.baseHeight) * 100}%;`
            : `bottom:${(v.bottom / img.baseHeight) * 100}%;`;
          const radiusStyle = v.radius ? `border-radius:${v.radius}px;` : '';
          return `
            <div class="expressive-video-box absolute overflow-hidden bg-black cursor-pointer group" data-video-index="${vIndex}" style="left:${leftPct}%; ${posPct} width:${widthPct}%; height:${heightPct}%; ${radiusStyle}">
              <video src="${v.url}" loop playsinline class="w-full h-full object-fill"></video>
              <div class="video-play-overlay absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity duration-200">
                <div class="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <i class="ri-play-fill video-play-icon text-ink-950 text-lg"></i>
                </div>
              </div>
              ${renderVideoProgressBarHtml()}
            </div>
          `;
        }).join('');
        return `
          <div class="expressive-image-wrap relative rounded-[6px] border border-ink-800 bg-ink-900 overflow-hidden">
            <img src="${img.src}" alt="${item.label}" class="w-full h-auto object-contain block" />
            ${videosHtml}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

let sectionScrollObserver = null;
let autoAdvanceLock = false;

function goToNextTab() {
  const currentIndex = tabList.findIndex(t => t.key === currentSpecTab);
  const nextTab = tabList[currentIndex + 1];
  if (!nextTab) return;

  autoAdvanceLock = true;
  currentSpecTab = nextTab.key;
  expandedTabs[nextTab.key] = true;
  renderTreeNav();
  renderSpecContent();
  updateHash(nextTab.key, specData[nextTab.key] && specData[nextTab.key].categories ? currentSectionKeyByTab[nextTab.key] : null);

  const container = document.getElementById('specContent');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.setTimeout(() => { autoAdvanceLock = false; }, 600);
}

function goToPrevTab() {
  const currentIndex = tabList.findIndex(t => t.key === currentSpecTab);
  const prevTab = tabList[currentIndex - 1];
  if (!prevTab) return;

  autoAdvanceLock = true;
  currentSpecTab = prevTab.key;
  expandedTabs[prevTab.key] = true;
  renderTreeNav();
  renderSpecContent();
  updateHash(prevTab.key, specData[prevTab.key] && specData[prevTab.key].categories ? currentSectionKeyByTab[prevTab.key] : null);

  const container = document.getElementById('specContent');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
  window.setTimeout(() => { autoAdvanceLock = false; }, 600);
}

function setupSectionScrollSpy(container) {
  if (sectionScrollObserver) {
    sectionScrollObserver.disconnect();
    sectionScrollObserver = null;
  }

  const data = specData[currentSpecTab];
  if (!data || !(data.categories || data.singleImage)) return;

  const blocks = container.querySelectorAll('[data-section-block]');
  if (!blocks.length) return;

  const visibleRatios = new Map();
  const tabAtSetup = currentSpecTab;
  const lastKey = data.categories ? data.categories[data.categories.length - 1].key : 'single';
  const firstKey = data.categories ? data.categories[0].key : 'single';
  const hasPrevTab = tabList.findIndex(t => t.key === tabAtSetup) > 0;

  sectionScrollObserver = new IntersectionObserver((entries) => {
    if (tabAtSetup !== currentSpecTab) return;

    entries.forEach(entry => {
      const key = entry.target.getAttribute('data-section-block');
      visibleRatios.set(key, entry.isIntersecting ? entry.intersectionRatio : 0);

      if (key === lastKey && entry.boundingClientRect.bottom <= (window.innerHeight * 0.35) && !autoAdvanceLock) {
        goToNextTab();
      }

      if (key === firstKey && hasPrevTab && entry.boundingClientRect.top >= (window.innerHeight * 0.65) && !autoAdvanceLock) {
        goToPrevTab();
      }
    });

    let topKey = null;
    let topRatio = 0;
    visibleRatios.forEach((ratio, key) => {
      if (ratio > topRatio) {
        topRatio = ratio;
        topKey = key;
      }
    });

    if (data.categories && topKey && topKey !== currentSectionKeyByTab[currentSpecTab]) {
      currentSectionKeyByTab[currentSpecTab] = topKey;
      renderTreeNav();
      updateHash(currentSpecTab, topKey);
    }
  }, {
    root: null,
    rootMargin: '-88px 0px -55% 0px',
    threshold: [0, 0.15, 0.3, 0.5, 0.75, 1]
  });

  blocks.forEach(block => sectionScrollObserver.observe(block));
}

function bindExpressiveVideos(container) {
  bindClickPlayProgressBarAll(container, '.expressive-video-box');
  container.querySelectorAll('.expressive-video-box').forEach(box => {
    const video = box.querySelector('video');
    const overlay = box.querySelector('.video-play-overlay');
    const icon = box.querySelector('.video-play-icon');
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    const setPlayingUi = (playing) => {
      if (playing) {
        overlay.classList.add('opacity-0');
        overlay.classList.remove('bg-black/25');
      } else {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('bg-black/25');
      }
      icon.className = playing ? 'ri-pause-fill video-play-icon text-ink-950 text-lg' : 'ri-play-fill video-play-icon text-ink-950 text-lg';
    };

    box.addEventListener('click', () => {
      if (video.paused) {
        container.querySelectorAll('.expressive-video-box video').forEach(otherVideo => {
          if (otherVideo !== video && !otherVideo.paused) {
            otherVideo.pause();
            const otherBox = otherVideo.closest('.expressive-video-box');
            const otherOverlay = otherBox.querySelector('.video-play-overlay');
            const otherIcon = otherBox.querySelector('.video-play-icon');
            otherOverlay.classList.remove('opacity-0');
            otherOverlay.classList.add('bg-black/25');
            otherIcon.className = 'ri-play-fill video-play-icon text-ink-950 text-lg';
          }
        });
        video.play().then(() => setPlayingUi(true)).catch(() => setPlayingUi(false));
      } else {
        video.pause();
        setPlayingUi(false);
      }
    });

    video.addEventListener('play', () => setPlayingUi(true));
    video.addEventListener('pause', () => setPlayingUi(false));
    video.addEventListener('ended', () => setPlayingUi(true));
  });
}

function renderSpecContent() {
  const container = document.getElementById('specContent');
  if (!container) return;

  const data = specData[currentSpecTab];
  if (!data) return;

  if (data.singleImage) {
    container.innerHTML = `
      <div class="fade-in" data-section-block="single">
        <div class="rounded-[6px] border border-ink-800 bg-ink-900 overflow-hidden flex items-center justify-center">
          <img src="${data.singleImage}" alt="${tabList.find(t => t.key === currentSpecTab)?.label || ''}" class="w-full h-auto object-contain" />
        </div>
      </div>
    `;
    setupSectionScrollSpy(container);
    return;
  }

  let bodyHtml = '';

  if (data.categories) {
    bodyHtml = data.categories.map(item => `
      <div data-section-block="${item.key}" class="scroll-mt-6">
        <h4 class="text-sm font-medium text-ink-200 mb-3">${item.label}</h4>
        ${renderCategoryBody(item)}
      </div>
    `).join('');
  } else {
    bodyHtml = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${data.rules.map(rule => renderSpecCard(rule)).join('')}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="fade-in flex flex-col">
      <div class="mb-3">
        <div class="flex items-baseline gap-3">
          <h3 class="text-lg font-medium text-ink-50">${data.title}</h3>
          ${data.subtitle ? `<span class="text-lg font-medium text-ink-400">${data.subtitle}</span>` : ''}
        </div>
        ${data.desc ? `<p class="text-sm text-ink-400 mt-2">${data.desc}</p>` : ''}
      </div>
      <div class="flex flex-col gap-10">
        ${bodyHtml}
      </div>
    </div>
  `;

  bindExpressiveVideos(container);
  setupSectionScrollSpy(container);
}

function initSpec() {
  const collapseBtn = document.getElementById('specTabCollapseBtn');
  const sidebar = document.getElementById('specTabSidebar');
  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', () => {
      const collapsed = sidebar.classList.toggle('collapsed');
      collapseBtn.title = collapsed ? '展开' : '收起';
    });
  }

  const hasInitialHash = applyHashState();

  renderTreeNav();
  renderSpecContent();

  if (hasInitialHash) {
    window.setTimeout(() => {
      const container = document.getElementById('specContent');
      const sectionKey = currentSectionKeyByTab[currentSpecTab];
      const target = sectionKey && container && container.querySelector(`[data-section-block="${sectionKey}"]`);
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else if (container) {
        container.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 0);
  }

  window.addEventListener('hashchange', () => {
    if (suppressHashUpdate) return;
    if (!applyHashState()) return;

    renderTreeNav();
    renderSpecContent();

    window.setTimeout(() => {
      const container = document.getElementById('specContent');
      const sectionKey = currentSectionKeyByTab[currentSpecTab];
      const target = sectionKey && container && container.querySelector(`[data-section-block="${sectionKey}"]`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSpec();
});
