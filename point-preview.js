// point-preview.js
// 【开播期素材】静态素材/视频素材点击放大预览：
// 黑色蒙层 + 底图预览容器，
// 静态素材：三张端型底图（移动端 / Pad端 / PC端）横向并列展示，将当前点击的素材图分别裁剪填充到每张底图预设的多个挖空位置；
// 视频素材：使用独立的专属预览底图（与静态素材三端底图完全分开），铺满其唯一挖空位置自动循环播放，
// 并在预设的文字位置叠加当前看点真实文案（PingFang SC Regular，字号按各底图设计基准精确换算），
// 各底图最上层均叠加各自的信息覆盖层（顶对齐），营造真实平台展示效果

const MOBILE_BASE_URL = 'https://vfiles.gtimg.cn/wupload/xy/starter/8c4d3d29.png';
const MOBILE_OVERLAY_URL = 'https://vfiles.gtimg.cn/wupload/xy/starter/a52c893c.png';
const PAD_BASE_URL = 'https://vfiles.gtimg.cn/wupload/xy/starter/1ddc19df.png';
const PAD_OVERLAY_URL = 'https://vfiles.gtimg.cn/wupload/xy/starter/6e773140.png';
const PC_BASE_URL = 'https://vfiles.gtimg.cn/wupload/xy/starter/cec97bfc.png';
const PC_OVERLAY_URL = 'https://vfiles.gtimg.cn/wupload/xy/starter/8e4c6809.png';

// ------------------------------
// 视频素材专属预览底图设计基准：390 x 848（与静态素材三端底图分开使用）
// ------------------------------
const VIDEO_BASE_URL = 'https://vfiles.gtimg.cn/wupload/xy/starter/654e38a1.png';
const VIDEO_W = 390;
const VIDEO_H = 848;
const VIDEO_RATIO = VIDEO_W / VIDEO_H;
const VIDEO_RADIUS_PX = 4;

const videoSlot1 = { w: 366, h: 206, top: 242, left: (VIDEO_W - 366) / 2 };
const videoCaption1 = { top: 460, width: 366, left: (VIDEO_W - 366) / 2, align: 'center' };

// ------------------------------
// 移动端底图设计基准：390 x 1158
// ------------------------------
const MOBILE_W = 390;
const MOBILE_H = 1158;
const MOBILE_RATIO = MOBILE_W / MOBILE_H;
const MOBILE_RADIUS_PX = 4;

// 三处素材挖空区域（left/top均按左上角定位，宽高均为素材实际展示尺寸）
const mobileSlot1 = { w: 366, h: 274, top: 103, left: (MOBILE_W - 366) / 2 };
const mobileSlot2 = { w: 177, h: 121, top: 389, left: 12 };
const mobileSlot3 = { w: 366, h: 206, top: 866, left: (MOBILE_W - 366) / 2 };

// 三处文案位置：caption1/3 已知 top + left，caption1 页面居中(以文本框宽度=366，left随之居中)，caption3 左对齐
const mobileCaption1 = { top: 337, width: 366, left: (MOBILE_W - 366) / 2, align: 'center' };
const mobileCaption2 = { top: 514, width: 177, left: 12, align: 'left' };
const mobileCaption3 = { top: 1084, width: MOBILE_W - 24 * 2, left: 24, align: 'left' };

function pctBox(box, baseW, baseH) {
  return {
    left: (box.left / baseW) * 100,
    top: (box.top / baseH) * 100,
    width: (box.w / baseW) * 100,
    height: (box.h / baseH) * 100,
  };
}

function pctText(box, baseW, baseH) {
  return {
    left: (box.left / baseW) * 100,
    top: (box.top / baseH) * 100,
    width: (box.width / baseW) * 100,
  };
}

// ------------------------------
// Pad端底图设计基准：1366 x 1147
// ------------------------------
const PAD_W = 1366;
const PAD_H = 1147;
const PAD_RATIO = PAD_W / PAD_H;
const PAD_RADIUS_PX = { slot1: 12, slot2: 8 };

const padSlot1 = { w: 986, h: 428, top: 72, left: 24 };
const padSlot2 = { w: 321, h: 181, top: 566, left: 24 };

const padCaption1 = { top: 380, width: PAD_W - 54 * 2, left: 54, align: 'left' };
const padCaption2 = { top: 783, width: PAD_W - 24 * 2, left: 24, align: 'left' };

// ------------------------------
// PC端底图设计基准：1536 x 1507
// ------------------------------
const PC_W = 1536;
const PC_H = 1507;
const PC_RATIO = PC_W / PC_H;
// PC端底图真实导出像素为1575x1500，与设计基准1536x1507的宽高比存在偏差（1.05 vs 1.0192）
// 容器展示比例必须使用图片真实比例，否则底图会被拉伸变形，导致挖空位置与图片实际内容错位
const PC_REAL_W = 1575;
const PC_REAL_H = 1500;
const PC_REAL_RATIO = PC_REAL_W / PC_REAL_H;
const PC_RADIUS_PX = { slot1: 0, slot2: 4, slot3: 4 };

// 以下坐标根据用户提供的绿色色块标注图（1098x1046展示图，按比例换算到1536x1507基准）精确测量得出
const pcSlot1 = { w: 1380, h: 608, top: 0, left: PC_W - 1380 };
const pcSlot2 = { w: 438, h: 308, top: 651, left: 156 };
const pcSlot3 = { w: 438, h: 254, top: 1127, left: 156 };

const pcCaption1 = { top: 275, width: PC_W - 204 * 2, left: 204, align: 'left' };
const pcCaption2 = { top: 949, width: PC_W - 172 * 2, left: 172, align: 'left' };
const pcCaption3 = { top: 1425, width: PC_W - 172 * 2, left: 172, align: 'left' };

// 各字号（px@各自设计基准宽度），换算为相对预览容器宽度(container query width)的百分比，随容器缩放
const DEVICE_LABEL_FONT_CQW_BASE = 390; // 顶部端型标签统一以移动端基准换算字号比例
function fontCqw(px, baseW) {
  return (px / baseW) * 100;
}

// ------------------------------
// 静态素材原始上传图统一尺寸：1920 x 1177
// 每个挖空位置在铺入原图前，均需先按下方定义的裁剪框（宽高固定，距顶部像素固定，左右居中）
// 从原图裁出对应区域，再将裁出的区域等比缩放铺满挖空位置，而非直接整图 object-cover
// ------------------------------
const SOURCE_IMG_W = 1920;
const SOURCE_IMG_H = 1177;

function makeCropBox(cropW, cropH, cropTop) {
  return { w: cropW, h: cropH, top: cropTop, left: (SOURCE_IMG_W - cropW) / 2 };
}

const SLOT_CROP_BOXES = {
  mobileSlot1: makeCropBox(1440, 1080, 97),
  mobileSlot2: makeCropBox(1280, 877, 133),
  mobileSlot3: makeCropBox(1920, 1080, 0),
  padSlot1: makeCropBox(1920, 800, 80),
  padSlot2: makeCropBox(1920, 1080, 0),
  pcSlot1: makeCropBox(1920, 800, 80),
  pcSlot2: makeCropBox(1280, 877, 133),
  pcSlot3: makeCropBox(1920, 1080, 0),
};

// 根据裁剪框计算出 background-size（百分比）与 background-position（百分比），
// 使 background-image 铺满容器时，恰好只显示裁剪框内的那部分原图内容（等比放大裁剪后再缩放填充）
function cropBoxToBgStyle(cropBox) {
  const sizeWPct = (SOURCE_IMG_W / cropBox.w) * 100;
  const sizeHPct = (SOURCE_IMG_H / cropBox.h) * 100;
  const maxOffsetX = SOURCE_IMG_W - cropBox.w;
  const maxOffsetY = SOURCE_IMG_H - cropBox.h;
  const posXPct = maxOffsetX > 0 ? (cropBox.left / maxOffsetX) * 100 : 0;
  const posYPct = maxOffsetY > 0 ? (cropBox.top / maxOffsetY) * 100 : 0;
  return `background-size:${sizeWPct}% ${sizeHPct}%;background-position:${posXPct}% ${posYPct}%;background-repeat:no-repeat;`;
}

function renderSlotHtml(slotClass, boxPct, radiusPx, boxRawWidth, cropKey) {
  const radiusPct = radiusPx > 0 ? (radiusPx / boxRawWidth) * 100 : 0;
  const cropBox = cropKey ? SLOT_CROP_BOXES[cropKey] : null;
  const bgStyle = cropBox ? cropBoxToBgStyle(cropBox) : '';
  return `
    <div class="${slotClass} absolute overflow-hidden bg-black" style="left:${boxPct.left}%;top:${boxPct.top}%;width:${boxPct.width}%;height:${boxPct.height}%;border-radius:${radiusPct}%;">
      <div class="preview-slot-img w-full h-full select-none" style="${bgStyle}" data-crop-key="${cropKey || ''}"></div>
      <video class="preview-slot-video w-full h-full object-cover select-none hidden" src="" loop autoplay playsinline></video>
    </div>
  `;
}

function renderCaptionHtml(captionClass, textPct, fontSizeCqw, baseH, offsetTopPx, opacity, color) {
  const offsetCqh = baseH ? (offsetTopPx || 0) / baseH * 100 : 0;
  const justify = textPct.align === 'center' ? 'justify-center text-center' : 'justify-start text-left';
  const opacityStyle = typeof opacity === 'number' ? `opacity:${opacity};` : '';
  const colorStyle = color ? `color:${color};` : '';
  return `
    <div class="${captionClass} absolute px-0 pointer-events-none flex items-start ${justify}" style="left:${textPct.left}%;top:calc(${textPct.top}% + ${offsetCqh}cqh);width:${textPct.width}%;font-family:'PingFang SC','PingFang SC Regular',sans-serif;font-weight:400;font-size:${fontSizeCqw}cqw;line-height:1.4;text-shadow:0 1px 4px rgba(0,0,0,.6);${opacityStyle}${colorStyle ? colorStyle : 'color:#fff;'}">
      <span class="block overflow-hidden" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;"></span>
    </div>
  `;
}

// 文案超过 maxLen 个字符时，截断并在末尾追加省略号打点展示
function truncateCaption(text, maxLen) {
  if (!text) return text;
  return text.length > maxLen ? `${text.slice(0, maxLen)}...` : text;
}

let modalEl = null;

// 根据当前视口宽高，动态计算三张底图应统一使用的高度(px)，
// 使三张不同宽高比的底图横向拼接后：整体宽度不超过视口可用宽度，且单张高度不超过视口可用高度，
// 从而保证三张预览图始终完整展示在页面上，不会被裁切或需要额外滚动才能看全
function updateFramesLayout() {
  if (!modalEl) return;
  const row = modalEl.querySelector('.point-preview-frames-row');
  if (!row) return;

  const gapPx = window.innerWidth >= 768 ? 20 : 12;
  const labelAndGapH = 28; // 顶部端型标签 + 与底图的间距，三列一致，按px估算预留
  const outerPadding = 32; // 弹窗左右安全间距
  const outerVPadding = 96; // 弹窗上下安全间距（含关闭按钮/滚动余量）

  const availableWidth = Math.max(window.innerWidth - outerPadding, 240) - gapPx * 2;
  const availableHeight = Math.max(window.innerHeight - outerVPadding, 240) - labelAndGapH;

  const totalRatioWidthPerHeight = MOBILE_RATIO + PAD_RATIO + PC_REAL_RATIO;
  const heightByWidth = availableWidth / totalRatioWidthPerHeight;
  const finalHeight = Math.max(Math.min(heightByWidth, availableHeight), 120);

  const mobileFrame = modalEl.querySelector('[data-preview-frame="mobile"]');
  const padFrame = modalEl.querySelector('[data-preview-frame="pad"]');
  const pcFrame = modalEl.querySelector('[data-preview-frame="pc"]');
  [mobileFrame, padFrame, pcFrame].forEach(frame => {
    if (frame) frame.style.height = `${finalHeight}px`;
  });

  // 视频专属预览容器单独按其自身宽高比计算合适高度（不参与三端底图的横向总宽度拼接计算）
  const videoAvailableWidth = Math.max(window.innerWidth - outerPadding, 240);
  const videoHeightByWidth = videoAvailableWidth / VIDEO_RATIO;
  const videoFinalHeight = Math.max(Math.min(videoHeightByWidth, availableHeight), 120);
  const videoFrame = modalEl.querySelector('[data-preview-frame="video"]');
  if (videoFrame) videoFrame.style.height = `${videoFinalHeight}px`;
}

function ensureModal() {
  if (modalEl) return modalEl;

  const mSlot1Pct = pctBox(mobileSlot1, MOBILE_W, MOBILE_H);
  const mSlot2Pct = pctBox(mobileSlot2, MOBILE_W, MOBILE_H);
  const mSlot3Pct = pctBox(mobileSlot3, MOBILE_W, MOBILE_H);
  const mCap1Pct = pctText(mobileCaption1, MOBILE_W, MOBILE_H);
  const mCap2Pct = pctText(mobileCaption2, MOBILE_W, MOBILE_H);
  const mCap3Pct = pctText(mobileCaption3, MOBILE_W, MOBILE_H);
  const mFont = fontCqw(14, MOBILE_W);

  const pSlot1Pct = pctBox(padSlot1, PAD_W, PAD_H);
  const pSlot2Pct = pctBox(padSlot2, PAD_W, PAD_H);
  const pCap1Pct = pctText(padCaption1, PAD_W, PAD_H);
  const pCap2Pct = pctText(padCaption2, PAD_W, PAD_H);
  const pFont1 = fontCqw(16, PAD_W);
  const pFont2 = fontCqw(14, PAD_W);

  const cSlot1Pct = pctBox(pcSlot1, PC_W, PC_H);
  const cSlot2Pct = pctBox(pcSlot2, PC_W, PC_H);
  const cSlot3Pct = pctBox(pcSlot3, PC_W, PC_H);
  const cCap1Pct = pctText(pcCaption1, PC_W, PC_H);
  const cCap2Pct = pctText(pcCaption2, PC_W, PC_H);
  const cCap3Pct = pctText(pcCaption3, PC_W, PC_H);
  const cFont1 = fontCqw(15, PC_W);
  const cFont23 = fontCqw(13, PC_W);

  const deviceLabelFont = fontCqw(14, DEVICE_LABEL_FONT_CQW_BASE);

  const vSlot1Pct = pctBox(videoSlot1, VIDEO_W, VIDEO_H);
  const vCap1Pct = pctText(videoCaption1, VIDEO_W, VIDEO_H);
  const vFont = fontCqw(14, VIDEO_W);

  modalEl = document.createElement('div');
  modalEl.id = 'pointPreviewModal';
  modalEl.className = 'fixed inset-0 z-[1000] hidden items-center justify-center bg-black/85 backdrop-blur-sm overflow-auto py-8';
  modalEl.innerHTML = `
    <div class="point-preview-close absolute inset-0 cursor-zoom-out"></div>
    <div class="point-preview-frames-row relative flex flex-row items-start justify-center gap-3 md:gap-5 pointer-events-none px-4">

      <div class="flex flex-col items-start gap-2 pointer-events-auto flex-shrink-0">
        <span class="text-xs text-white/70 tracking-wide">移动端</span>
        <div class="point-preview-frame-mobile relative overflow-hidden rounded-[14px] shadow-2xl" data-preview-frame="mobile" style="aspect-ratio: ${MOBILE_RATIO}; container-type: inline-size;">
          <img class="w-full h-full object-cover select-none absolute inset-0" src="${MOBILE_BASE_URL}" alt="移动端预览底图" draggable="false" />
          ${renderSlotHtml('preview-mobile-slot-1', mSlot1Pct, MOBILE_RADIUS_PX, mobileSlot1.w, 'mobileSlot1')}
          ${renderSlotHtml('preview-mobile-slot-2', mSlot2Pct, MOBILE_RADIUS_PX, mobileSlot2.w, 'mobileSlot2')}
          ${renderSlotHtml('preview-mobile-slot-3', mSlot3Pct, MOBILE_RADIUS_PX, mobileSlot3.w, 'mobileSlot3')}
          <div class="absolute inset-x-0 top-0 pointer-events-none" style="background-image:url('${MOBILE_OVERLAY_URL}');background-repeat:no-repeat;background-size:100% auto;background-position:0% 0%;width:100%;aspect-ratio:${MOBILE_W}/${MOBILE_H};"></div>
          ${renderCaptionHtml('preview-mobile-caption-1', mCap1Pct, mFont, MOBILE_H, 0)}
${renderCaptionHtml('preview-mobile-caption-2', mCap2Pct, mFont, MOBILE_H, 1, 0.6)}
          ${renderCaptionHtml('preview-mobile-caption-3', mCap3Pct, mFont, MOBILE_H, 0)}
        </div>
      </div>

      <div class="flex flex-col items-start gap-2 pointer-events-auto flex-shrink-0">
        <span class="text-xs text-white/70 tracking-wide">Pad端</span>
        <div class="point-preview-frame-pad relative overflow-hidden rounded-[14px] shadow-2xl" data-preview-frame="pad" style="aspect-ratio: ${PAD_RATIO}; container-type: inline-size;">
          <img class="w-full h-full object-cover select-none absolute inset-0" src="${PAD_BASE_URL}" alt="Pad端预览底图" draggable="false" />
          ${renderSlotHtml('preview-pad-slot-1', pSlot1Pct, PAD_RADIUS_PX.slot1, padSlot1.w, 'padSlot1')}
          ${renderSlotHtml('preview-pad-slot-2', pSlot2Pct, PAD_RADIUS_PX.slot2, padSlot2.w, 'padSlot2')}
          <div class="absolute inset-0 pointer-events-none" style="background-image:url('${PAD_OVERLAY_URL}');background-repeat:no-repeat;background-size:100% 100%;background-position:0% 0%;"></div>
          ${renderCaptionHtml('preview-pad-caption-1', pCap1Pct, pFont1, PAD_H, 0)}
          ${renderCaptionHtml('preview-pad-caption-2', pCap2Pct, pFont2, PAD_H, 0, undefined, '#8A8A8A')}
        </div>
      </div>

      <div class="flex flex-col items-start gap-2 pointer-events-auto flex-shrink-0">
        <span class="text-xs text-white/70 tracking-wide">PC端</span>
        <div class="point-preview-frame-pc relative overflow-hidden rounded-[14px] shadow-2xl" data-preview-frame="pc" style="aspect-ratio: ${PC_REAL_RATIO}; container-type: inline-size;">
          <img class="w-full h-full object-cover select-none absolute inset-0" src="${PC_BASE_URL}" alt="PC端预览底图" draggable="false" />
          ${renderSlotHtml('preview-pc-slot-1', cSlot1Pct, PC_RADIUS_PX.slot1, pcSlot1.w, 'pcSlot1')}
          ${renderSlotHtml('preview-pc-slot-2', cSlot2Pct, PC_RADIUS_PX.slot2, pcSlot2.w, 'pcSlot2')}
          ${renderSlotHtml('preview-pc-slot-3', cSlot3Pct, PC_RADIUS_PX.slot3, pcSlot3.w, 'pcSlot3')}
          <div class="absolute inset-0 pointer-events-none" style="background-image:url('${PC_OVERLAY_URL}');background-repeat:no-repeat;background-size:100% 100%;background-position:0% 0%;"></div>
          ${renderCaptionHtml('preview-pc-caption-1', cCap1Pct, cFont1, PC_H, 0)}
          ${renderCaptionHtml('preview-pc-caption-2', cCap2Pct, cFont23, PC_H, 16, 0.5)}
          ${renderCaptionHtml('preview-pc-caption-3', cCap3Pct, cFont23, PC_H, 0, 0.5)}
        </div>
      </div>

      <div class="point-preview-video-frame-wrap hidden flex flex-col items-center gap-2 pointer-events-auto flex-shrink-0">
        <div class="point-preview-frame-video relative overflow-hidden rounded-[14px] shadow-2xl" data-preview-frame="video" style="aspect-ratio: ${VIDEO_RATIO}; container-type: inline-size;">
          <img class="w-full h-full object-cover select-none absolute inset-0" src="${VIDEO_BASE_URL}" alt="视频预览底图" draggable="false" />
          ${renderSlotHtml('preview-video-slot-1', vSlot1Pct, VIDEO_RADIUS_PX, videoSlot1.w)}
          ${renderCaptionHtml('preview-video-caption-1', vCap1Pct, vFont, VIDEO_H, 0)}
        </div>
      </div>

    </div>
    <div class="point-preview-info absolute left-4 top-4 md:left-6 md:top-6 pointer-events-none flex flex-col items-start gap-1.5 max-w-[70vw]">
      <span class="point-preview-info-episode text-base leading-5 tracking-wide text-white/90 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,.6)]"></span>
      <span class="point-preview-info-caption text-base leading-5 text-white font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,.6)]"></span>
    </div>
    <button type="button" class="point-preview-close-btn absolute right-4 top-4 md:right-6 md:top-6 pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors">
      <i class="ri-close-line text-xl"></i>
    </button>
    <button type="button" class="point-preview-prev-btn absolute left-4 md:left-8 top-1/2 -translate-y-1/2 pointer-events-auto w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors">
      <i class="ri-arrow-left-s-line text-2xl"></i>
    </button>
    <button type="button" class="point-preview-next-btn absolute right-4 md:right-8 top-1/2 -translate-y-1/2 pointer-events-auto w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors">
      <i class="ri-arrow-right-s-line text-2xl"></i>
    </button>
  `;
  document.body.appendChild(modalEl);

  modalEl.querySelectorAll('.point-preview-close, .point-preview-close-btn').forEach(el => {
    el.addEventListener('click', closePointPreview);
  });

  modalEl.querySelector('.point-preview-prev-btn').addEventListener('click', () => showPreviewByOffset(-1));
  modalEl.querySelector('.point-preview-next-btn').addEventListener('click', () => showPreviewByOffset(1));

  document.addEventListener('keydown', (e) => {
    if (!modalEl || modalEl.classList.contains('hidden')) return;
    if (e.key === 'Escape') closePointPreview();
    if (e.key === 'ArrowLeft') showPreviewByOffset(-1);
    if (e.key === 'ArrowRight') showPreviewByOffset(1);
  });

  window.addEventListener('resize', () => {
    if (!modalEl || modalEl.classList.contains('hidden')) return;
    updateFramesLayout();
  });

  return modalEl;
}

// 当前预览所在的素材列表（同一看点下的所有静态素材）及索引，用于左右切换
let previewImageList = [];
let previewIndex = 0;

const ALL_SLOT_IMG_SELECTORS = [
  '.preview-mobile-slot-1 .preview-slot-img',
  '.preview-mobile-slot-2 .preview-slot-img',
  '.preview-mobile-slot-3 .preview-slot-img',
  '.preview-pad-slot-1 .preview-slot-img',
  '.preview-pad-slot-2 .preview-slot-img',
  '.preview-pc-slot-1 .preview-slot-img',
  '.preview-pc-slot-2 .preview-slot-img',
  '.preview-pc-slot-3 .preview-slot-img',
];

const ALL_SLOT_VIDEO_SELECTORS = [
  '.preview-mobile-slot-1 .preview-slot-video',
  '.preview-mobile-slot-2 .preview-slot-video',
  '.preview-mobile-slot-3 .preview-slot-video',
  '.preview-pad-slot-1 .preview-slot-video',
  '.preview-pad-slot-2 .preview-slot-video',
  '.preview-pc-slot-1 .preview-slot-video',
  '.preview-pc-slot-2 .preview-slot-video',
  '.preview-pc-slot-3 .preview-slot-video',
];

const ALL_CAPTION_SELECTORS = {
  mobile: ['.preview-mobile-caption-1 span', '.preview-mobile-caption-2 span', '.preview-mobile-caption-3 span'],
  pad: ['.preview-pad-caption-1 span', '.preview-pad-caption-2 span'],
  pc: ['.preview-pc-caption-1 span', '.preview-pc-caption-2 span', '.preview-pc-caption-3 span'],
};

// 视频素材专属预览容器的 selector（独立于三端底图，仅在预览视频素材时展示）
const VIDEO_FRAME_VIDEO_SELECTOR = '.preview-video-slot-1 .preview-slot-video';
const VIDEO_FRAME_IMG_SELECTOR = '.preview-video-slot-1 .preview-slot-img';
const VIDEO_FRAME_CAPTION_SELECTOR = '.preview-video-caption-1 span';

function renderCurrentPreview() {
  if (!modalEl) return;
  const total = previewImageList.length;
  const current = previewImageList[previewIndex] || { url: '', caption: '', type: 'image' };
  const isVideo = current.type === 'video';

  const infoEpisodeEl = modalEl.querySelector('.point-preview-info-episode');
  const infoCaptionEl = modalEl.querySelector('.point-preview-info-caption');

  infoEpisodeEl.textContent = current.episodeName || '';
  infoEpisodeEl.classList.toggle('hidden', !current.episodeName);
  infoCaptionEl.textContent = current.caption || '';

  const staticFrameWraps = modalEl.querySelectorAll('.point-preview-frame-mobile, .point-preview-frame-pad, .point-preview-frame-pc');
  const videoFrameWrap = modalEl.querySelector('.point-preview-video-frame-wrap');

  staticFrameWraps.forEach(frame => {
    if (frame && frame.parentElement) frame.parentElement.classList.toggle('hidden', isVideo);
  });
  if (videoFrameWrap) videoFrameWrap.classList.toggle('hidden', !isVideo);

  if (isVideo) {
    // 视频素材：使用专属底图容器，铺满其唯一挖空位置自动循环播放，并叠加当前看点文案
    const videoEl = modalEl.querySelector(VIDEO_FRAME_VIDEO_SELECTOR);
    const imgEl = modalEl.querySelector(VIDEO_FRAME_IMG_SELECTOR);
    const captionEl = modalEl.querySelector(VIDEO_FRAME_CAPTION_SELECTOR);
    if (imgEl) imgEl.classList.add('hidden');
    if (videoEl) {
      videoEl.classList.remove('hidden');
      if (videoEl.getAttribute('src') !== current.url) {
        videoEl.src = current.url || '';
      }
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    }
    if (captionEl) captionEl.textContent = current.caption || '';

    // 同时暂停并清理三端底图内所有的 video（切出静态素材场景，避免后台残留播放）
    ALL_SLOT_VIDEO_SELECTORS.forEach(sel => {
      const v = modalEl.querySelector(sel);
      if (v) {
        v.classList.add('hidden');
        v.pause();
        v.removeAttribute('src');
        v.load();
      }
    });
    ALL_SLOT_IMG_SELECTORS.forEach(sel => {
      const img = modalEl.querySelector(sel);
      if (img) img.classList.remove('hidden');
    });
  } else {
    // 静态素材：铺满三端底图各自预设的多个挖空位置，并叠加当前看点文案
    ALL_SLOT_IMG_SELECTORS.forEach((sel, i) => {
      const img = modalEl.querySelector(sel);
      const video = modalEl.querySelector(ALL_SLOT_VIDEO_SELECTORS[i]);
      if (img) {
        img.classList.remove('hidden');
        img.style.backgroundImage = current.url ? `url('${current.url}')` : 'none';
      }
      if (video) {
        video.classList.add('hidden');
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    });
    Object.values(ALL_CAPTION_SELECTORS).flat().forEach(sel => {
      const span = modalEl.querySelector(sel);
      if (!span) return;
      if (sel === '.preview-mobile-caption-2 span') {
        span.textContent = truncateCaption(current.caption || '', 11);
      } else {
        span.textContent = current.caption || '';
      }
    });

    // 同时暂停并清理视频专属容器内的 video
    const videoEl = modalEl.querySelector(VIDEO_FRAME_VIDEO_SELECTOR);
    const imgEl = modalEl.querySelector(VIDEO_FRAME_IMG_SELECTOR);
    if (videoEl) {
      videoEl.classList.add('hidden');
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
    }
    if (imgEl) imgEl.classList.remove('hidden');
  }

  const prevBtn = modalEl.querySelector('.point-preview-prev-btn');
  const nextBtn = modalEl.querySelector('.point-preview-next-btn');
  const showArrows = total > 1;
  [prevBtn, nextBtn].forEach(btn => {
    btn.classList.toggle('hidden', !showArrows);
  });
}

function showPreviewByOffset(offset) {
  const total = previewImageList.length;
  if (total <= 1) return;
  previewIndex = (previewIndex + offset + total) % total;
  renderCurrentPreview();
}

// imageList: 全部看点下的素材数组 [{ url, caption, type, episodeName }]，按集数/看点顺序排列；activeIndex: 当前点击的素材在数组中的下标
export function openPointPreview(imageUrl, caption, imageList, activeIndex) {
  const modal = ensureModal();

  if (Array.isArray(imageList) && imageList.length) {
    previewImageList = imageList;
    previewIndex = Number.isInteger(activeIndex) && activeIndex >= 0 && activeIndex < imageList.length ? activeIndex : 0;
  } else {
    previewImageList = [{ url: imageUrl, caption, type: 'image' }];
    previewIndex = 0;
  }

  renderCurrentPreview();
  updateFramesLayout();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
}

// 视频素材放大预览：使用独立的专属预览底图（与静态素材三端底图分开），铺满其唯一挖空位置自动循环播放
export function openVideoPreview(videoUrl, caption, fullList, activeIndex) {
  if (Array.isArray(fullList) && fullList.length) {
    openPointPreview(videoUrl, caption, fullList, activeIndex);
  } else {
    openPointPreview(videoUrl, caption, [{ url: videoUrl, caption, type: 'video' }], 0);
  }
}

export function closePointPreview() {
  if (!modalEl) return;
  modalEl.classList.add('hidden');
  modalEl.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  ALL_SLOT_VIDEO_SELECTORS.forEach(sel => {
    const video = modalEl.querySelector(sel);
    if (video) video.pause();
  });
  const videoFrameEl = modalEl.querySelector(VIDEO_FRAME_VIDEO_SELECTOR);
  if (videoFrameEl) videoFrameEl.pause();
}

// 收集容器内所有可预览素材（静态图 + 视频），按其在文档中出现的顺序排列成一份全局有序列表，
// 使预览弹窗内的上一个/下一个切换可以跨看点、跨集数按顺序进行，而不仅限于同一看点内部
function collectGlobalPreviewList(container) {
  const nodes = Array.from(container.querySelectorAll('.point-preview-trigger, .point-preview-video-trigger'));
  const list = [];
  const nodeIndexMap = new Map();

  nodes.forEach(el => {
    const isVideo = el.classList.contains('point-preview-video-trigger');
    const caption = el.getAttribute('data-preview-caption') || '';
    const episodeName = el.getAttribute('data-preview-episode-name') || '';
    let url = '';
    if (isVideo) {
      const video = el.querySelector('video');
      url = video ? video.getAttribute('src') : '';
    } else {
      const img = el.querySelector('img');
      url = img ? img.getAttribute('src') : '';
    }
    if (!url) return;
    nodeIndexMap.set(el, list.length);
    list.push({ url, caption, episodeName, type: isVideo ? 'video' : 'image' });
  });

  return { list, nodeIndexMap };
}

// 为容器内所有带 data-preview-caption 的静态素材图片绑定点击放大预览
// 全部看点、全部集数的素材统一收集为一份按顺序排列的全局列表，支持在预览弹窗内跨看点左右切换
export function bindPointPreviewClick(container) {
  if (!container) return;
  const { list, nodeIndexMap } = collectGlobalPreviewList(container);

  container.querySelectorAll('.point-preview-trigger').forEach(el => {
    const idx = nodeIndexMap.get(el);
    if (idx === undefined) return;
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      const item = list[idx];
      if (!item) return;
      openPointPreview(item.url, item.caption, list, idx);
    });
  });
}

// 为容器内所有带 data-preview-video-trigger 的视频素材区块绑定点击放大预览，
// 与静态素材共用同一份全局有序列表，支持从视频继续跨看点切换到其他素材
export function bindVideoPreviewClick(container) {
  if (!container) return;
  const { list, nodeIndexMap } = collectGlobalPreviewList(container);

  container.querySelectorAll('.point-preview-video-trigger').forEach(el => {
    const idx = nodeIndexMap.get(el);
    if (idx === undefined) return;
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      const item = list[idx];
      if (!item) return;
      openVideoPreview(item.url, item.caption, list, idx);
    });
  });
}
