// video-hover.js
// 通用视频 hover 自动播放 + 可拖拽进度条逻辑
// 供 episodes.js（开播期/预热期）、preheat.js（预热期通用素材）、other.js（其他分类）共同复用

// 生成进度条的 HTML 片段，追加在 .video-hover-box 容器内，默认隐藏，hover 时通过 CSS 显示
export function renderVideoProgressBarHtml() {
  return `
    <div class="video-progress-bar absolute left-0 right-0 bottom-0 z-20 px-2.5 pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" data-video-progress>
      <div class="video-progress-track relative w-full h-[4px] rounded-full bg-white/30 cursor-pointer" data-progress-track>
        <div class="video-progress-fill absolute left-0 top-0 h-full rounded-full bg-white" data-progress-fill style="width:0%"></div>
        <div class="video-progress-thumb absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow" data-progress-thumb style="left:0%"></div>
      </div>
    </div>
  `;
}

// 为单个 video-hover-box 容器绑定 hover 自动播放 + 拖拽进度条能力
// zoomBox 必须包含 class="group"（用于进度条 group-hover 显隐），且内部含 video.video-autoplay
export function bindSingleVideoHover(zoomBox) {
  const video = zoomBox.querySelector('video.video-autoplay');
  if (!video) return;
  const hint = zoomBox.querySelector('.play-hint');
  const posters = zoomBox.querySelectorAll('.video-poster, .absolute.inset-0.grid img');
  const progressWrap = zoomBox.querySelector('[data-video-progress]');
  const track = zoomBox.querySelector('[data-progress-track]');
  const fill = zoomBox.querySelector('[data-progress-fill]');
  const thumb = zoomBox.querySelector('[data-progress-thumb]');

  let unplayable = false;
  let isDragging = false;
  let isHovering = false;
  let seekPending = false;
  let pendingRatio = null;

  const fallbackToPoster = () => {
    unplayable = true;
    if (posters.length) {
      video.classList.add('opacity-0');
      posters.forEach(p => p.classList.remove('opacity-0'));
    }
    if (progressWrap) progressWrap.classList.add('hidden');
  };

  const updateProgressUi = () => {
    if (!track || !fill || !thumb) return;
    const duration = video.duration;
    if (!duration || Number.isNaN(duration)) return;
    const pct = Math.min(100, Math.max(0, (video.currentTime / duration) * 100));
    fill.style.width = `${pct}%`;
    thumb.style.left = `${pct}%`;
  };

  const applySeek = (ratio) => {
    const duration = video.duration;
    if (!duration || Number.isNaN(duration)) return;
    seekPending = true;
    video.currentTime = ratio * duration;
    updateProgressUi();
  };

  video.addEventListener('seeked', () => {
    seekPending = false;
    if (pendingRatio !== null) {
      const ratio = pendingRatio;
      pendingRatio = null;
      applySeek(ratio);
    }
  });

  const seekByClientX = (clientX) => {
    if (!track) return;
    const duration = video.duration;
    if (!duration || Number.isNaN(duration)) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    if (seekPending) {
      pendingRatio = ratio;
      const pct = ratio * 100;
      if (fill) fill.style.width = `${pct}%`;
      if (thumb) thumb.style.left = `${pct}%`;
      return;
    }
    applySeek(ratio);
  };

  video.addEventListener('error', fallbackToPoster);
  video.addEventListener('timeupdate', updateProgressUi);
  video.addEventListener('loadedmetadata', updateProgressUi);

  zoomBox.addEventListener('mouseenter', () => {
    isHovering = true;
    if (unplayable) return;
    if (hint) hint.classList.add('opacity-0');
    posters.forEach(p => p.classList.add('opacity-0'));
    video.classList.remove('opacity-0');
    if (!isDragging) video.currentTime = 0;
    video.play().catch(fallbackToPoster);
  });

  zoomBox.addEventListener('mouseleave', () => {
    if (isDragging) {
      isHovering = false;
      return;
    }
    isHovering = false;
    video.pause();
    video.currentTime = 0;
    updateProgressUi();
    if (hint) hint.classList.remove('opacity-0');
    if (posters.length) {
      posters.forEach(p => p.classList.remove('opacity-0'));
      video.classList.add('opacity-0');
    }
  });

  if (track) {
    track.addEventListener('mousedown', (e) => {
      if (unplayable) return;
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      video.pause();
      seekByClientX(e.clientX);

      const onMouseMove = (moveEvt) => {
        seekByClientX(moveEvt.clientX);
        const rect = zoomBox.getBoundingClientRect();
        const insideBox = moveEvt.clientX >= rect.left && moveEvt.clientX <= rect.right
          && moveEvt.clientY >= rect.top && moveEvt.clientY <= rect.bottom;
        isHovering = insideBox;
      };
      const onMouseUp = (upEvt) => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        const rect = zoomBox.getBoundingClientRect();
        const insideBox = upEvt.clientX >= rect.left && upEvt.clientX <= rect.right
          && upEvt.clientY >= rect.top && upEvt.clientY <= rect.bottom;
        isHovering = insideBox;

        if (isHovering && !unplayable) {
          video.play().catch(fallbackToPoster);
        } else if (!unplayable) {
          video.currentTime = 0;
          updateProgressUi();
          if (hint) hint.classList.remove('opacity-0');
          if (posters.length) {
            posters.forEach(p => p.classList.remove('opacity-0'));
            video.classList.add('opacity-0');
          }
        }
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    track.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

// 批量绑定容器内所有 .video-hover-box
export function bindVideoHoverAll(container) {
  container.querySelectorAll('.video-hover-box').forEach(zoomBox => {
    bindSingleVideoHover(zoomBox);
  });
}

// 为“点击播放/暂停”型视频容器叠加可拖拽进度条能力（不接管播放/暂停触发逻辑，由调用方自行控制播放）
// box 内部须包含 video 元素与 renderVideoProgressBarHtml 生成的进度条节点
export function bindClickPlayProgressBar(box) {
  const video = box.querySelector('video');
  if (!video) return;
  const track = box.querySelector('[data-progress-track]');
  const fill = box.querySelector('[data-progress-fill]');
  const thumb = box.querySelector('[data-progress-thumb]');
  if (!track || !fill || !thumb) return;

  let isDragging = false;
  let wasPlayingBeforeDrag = false;
  let seekPending = false;
  let pendingRatio = null;

  const updateProgressUi = () => {
    const duration = video.duration;
    if (!duration || Number.isNaN(duration)) return;
    const pct = Math.min(100, Math.max(0, (video.currentTime / duration) * 100));
    fill.style.width = `${pct}%`;
    thumb.style.left = `${pct}%`;
  };

  const applySeek = (ratio) => {
    const duration = video.duration;
    if (!duration || Number.isNaN(duration)) return;
    seekPending = true;
    video.currentTime = ratio * duration;
    updateProgressUi();
  };

  video.addEventListener('seeked', () => {
    seekPending = false;
    if (pendingRatio !== null) {
      const ratio = pendingRatio;
      pendingRatio = null;
      applySeek(ratio);
    }
  });

  const seekByClientX = (clientX) => {
    const duration = video.duration;
    if (!duration || Number.isNaN(duration)) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    if (seekPending) {
      pendingRatio = ratio;
      const pct = ratio * 100;
      fill.style.width = `${pct}%`;
      thumb.style.left = `${pct}%`;
      return;
    }
    applySeek(ratio);
  };

  video.addEventListener('timeupdate', updateProgressUi);
  video.addEventListener('loadedmetadata', updateProgressUi);
  video.addEventListener('play', updateProgressUi);

  track.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    wasPlayingBeforeDrag = !video.paused;
    video.pause();
    seekByClientX(e.clientX);

    const onMouseMove = (moveEvt) => {
      seekByClientX(moveEvt.clientX);
    };
    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (wasPlayingBeforeDrag) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  track.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// 批量绑定容器内所有点击播放型视频（如 .expressive-video-box）的进度条
export function bindClickPlayProgressBarAll(container, selector) {
  container.querySelectorAll(selector).forEach(box => {
    bindClickPlayProgressBar(box);
  });
}
