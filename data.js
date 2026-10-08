// data.js
// 数据结构定义与初始数据

// 每集包含 4 个看点，每个看点包含至少 2 张静态素材 + 1 段视频素材
export function createEmptyPoint(index) {
  return {
    id: `point-${index}`,
    name: `看点 ${index}`,
    images: [
      { id: `img-${index}-1`, url: '', label: '静态素材 1' },
      { id: `img-${index}-2`, url: '', label: '静态素材 2' }
    ],
    video: { id: `video-${index}`, url: '', poster: '', poster2: '', label: '视频素材' }
  };
}

export function createEmptyEpisode(epIndex) {
  return {
    id: `ep-${epIndex}`,
    name: `第 ${epIndex} 集`,
    points: [
      createEmptyPoint(1),
      createEmptyPoint(2),
      createEmptyPoint(3),
      createEmptyPoint(4)
    ]
  };
}

// 第1集真实素材数据
const episode1 = {
  id: 'ep-1',
  name: '第 1 集',
  points: [
    {
      id: 'point-1',
      name: '"赤脚鬼"嫡女归家步步险',
      images: [
        { id: 'img-1-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/11789319696663/0', label: '静态素材 1' },
        { id: 'img-1-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/21789319696664/0', label: '静态素材 2' }
      ],
      video: { id: 'video-1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/ecf1c8d4.mov', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/ca3b8721.png', label: '视频素材' }
    },
    {
      id: 'point-2',
      name: '夫婿成姐夫？庄寒雁傅云夕相见彼此试探',
      images: [
        { id: 'img-2-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/31789319696664/0', label: '静态素材 1' },
        { id: 'img-2-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/41789319696664/0', label: '静态素材 2' }
      ],
      video: { id: 'video-2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/530a90ee.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/9a09699f.png', label: '视频素材' }
    },
    {
      id: 'point-3',
      name: '四弟怪罪庄寒雁搅黄亲事，欲将其赶出家门',
      images: [
        { id: 'img-3-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/51789319696664/0', label: '静态素材 1' },
        { id: 'img-3-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/61789319700192/0', label: '静态素材 2' }
      ],
      video: { id: 'video-3', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/344074c6.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/88aa04ce.png', label: '视频素材' }
    },
    {
      id: 'point-4',
      name: '太惨！庄寒雁与生母首次相见遭毒打',
      images: [
        { id: 'img-4-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/71789319700192/0', label: '静态素材 1' },
        { id: 'img-4-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/81789319700430/0', label: '静态素材 2' }
      ],
      video: { id: 'video-4', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/1c0441c3.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/a4c1ae06.png', label: '视频素材' }
    }
  ]
};

// 第2集真实素材数据
const episode2 = {
  id: 'ep-2',
  name: '第 2 集',
  points: [
    {
      id: 'point-2-1',
      name: '贵女变怨妇！母亲发疯怒斥庄寒雁害自己变残疾',
      images: [
        { id: 'img-2-1-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/91789319700708/0', label: '静态素材 1' },
        { id: 'img-2-1-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/101789319700821/0', label: '静态素材 2' }
      ],
      video: { id: 'video-2-1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/3fbfd2bd.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/5e012776.png', label: '视频素材' }
    },
    {
      id: 'point-2-2',
      name: '庄家为赶走寒雁套路百出，出重金找媒婆说亲',
      images: [
        { id: 'img-2-2-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/111789319703626/0', label: '静态素材 1' },
        { id: 'img-2-2-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/121789319703627/0', label: '静态素材 2' }
      ],
      video: { id: 'video-2-2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/528bc17b.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/a4ee84a1.png', label: '视频素材' }
    },
    {
      id: 'point-2-3',
      name: '二姐上门刁难庄寒雁，故意拿走被褥和炭火',
      images: [
        { id: 'img-2-3-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/131789319703633/0', label: '静态素材 1' },
        { id: 'img-2-3-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/141789319704218/0', label: '静态素材 2' }
      ],
      video: { id: 'video-2-3', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/9bd9faed.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/feefac18.png', label: '视频素材' }
    },
    {
      id: 'point-2-4',
      name: '高手过招全是心理博弈！云夕拿发簪质问寒雁',
      images: [
        { id: 'img-2-4-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/151789319704592/0', label: '静态素材 1' },
        { id: 'img-2-4-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/161789319707726/0', label: '静态素材 2' }
      ],
      video: { id: 'video-2-4', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/22a33e66.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/2e0b318d.png', label: '视频素材' }
    }
  ]
};

// 第18集真实素材数据
const episode18 = {
  id: 'ep-18',
  name: '第 18 集',
  points: [
    {
      id: 'point-18-1',
      name: '各自珍重！寒雁落泪道别傅云夕',
      images: [
        { id: 'img-18-1-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/171789319707914/0', label: '静态素材 1' },
        { id: 'img-18-1-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/181789319708229/0', label: '静态素材 2' }
      ],
      video: { id: 'video-18-1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/6b4cf2aa.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/719812b9.png', label: '视频素材' }
    },
    {
      id: 'point-18-2',
      name: '得不到就毁掉 庄士洋杀害阮惜文',
      images: [
        { id: 'img-18-2-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/191789319708488/0', label: '静态素材 1' },
        { id: 'img-18-2-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/201789319708621/0', label: '静态素材 2' }
      ],
      video: { id: 'video-18-2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/6b2b412e.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/fb3ad235.png', label: '视频素材' }
    },
    {
      id: 'point-18-3',
      name: '催泪！庄寒雁丧母雪夜哀鸣',
      images: [
        { id: 'img-18-3-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/211789319711323/0', label: '静态素材 1' },
        { id: 'img-18-3-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/221789319711323/0', label: '静态素材 2' }
      ],
      video: { id: 'video-18-3', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/60e20a7a.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/1edd1f80.png', label: '视频素材' }
    },
    {
      id: 'point-18-4',
      name: '破碎感拉满！寒雁崩溃欲为母报仇',
      images: [
        { id: 'img-18-4-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/231789319711620/0', label: '静态素材 1' },
        { id: 'img-18-4-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/241789319711621/0', label: '静态素材 2' }
      ],
      video: { id: 'video-18-4', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/bad4df05.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/32421a23.png', label: '视频素材' }
    }
  ]
};

// 第19集真实素材数据
const episode19 = {
  id: 'ep-19',
  name: '第 19 集',
  points: [
    {
      id: 'point-19-1',
      name: '明日成亲！寒雁决定嫁给云夕，开启贵女进阶之路',
      images: [
        { id: 'img-19-1-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/251789319711621/0', label: '静态素材 1' },
        { id: 'img-19-1-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/261789319712277/0', label: '静态素材 2' }
      ],
      video: { id: 'video-19-1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/db21c631.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/b9f0e526.png', label: '视频素材' }
    },
    {
      id: 'point-19-2',
      name: '傅云夕：我来庄家就办一件事，抢亲！',
      images: [
        { id: 'img-19-2-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/271789319713154/0', label: '静态素材 1' },
        { id: 'img-19-2-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/281789319713155/0', label: '静态素材 2' }
      ],
      video: { id: 'video-19-2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/e5c95d77.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/6cd74044.png', label: '视频素材' }
    },
    {
      id: 'point-19-3',
      name: '庄语迟阻挠寒雁出嫁，混战中意外惨死！',
      images: [
        { id: 'img-19-3-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/291789319713283/0', label: '静态素材 1' },
        { id: 'img-19-3-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/301789319714311/0', label: '静态素材 2' }
      ],
      video: { id: 'video-19-3', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/8753f194.mp4', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/fc7fc8db.png', label: '视频素材' }
    },
    {
      id: 'point-19-4',
      name: '夫妻结盟，庄寒雁红衣大婚',
      images: [
        { id: 'img-19-4-1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/311789319714312/0', label: '静态素材 1' },
        { id: 'img-19-4-2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/321789319714572/0', label: '静态素材 2' }
      ],
      video: { id: 'video-19-4', url: '', poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/2b940ada.png', label: '视频素材' }
    }
  ]
};

// 品牌通用素材分类：IP logo 与 定档海报，展示在剧集目录第1集之前
const yanhuishiBrandSections = [
  {
    id: 'brand-logo',
    name: 'IP logo',
    items: [
      {
        id: 'logo-original',
        name: '原版 logo',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/36489408.png',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      },
      {
        id: 'logo-white',
        name: '白色 logo',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/699fd0d1.png',
        ratio: 'aspect-video',
        bg: 'bg-[#2b2b2b]'
      }
    ]
  }
];

// 预热期通用素材：Logo、定档海报、预热看点（预热海报已改名为“概念海报”并迁移至“其他”分类）
const yanhuishiPreheatSections = [
  {
    id: 'preheat-logo',
    name: 'IP logo',
    items: [
      {
        id: 'preheat-logo-original',
        name: '原版 logo',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/12cf345e.png',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      },
      {
        id: 'preheat-logo-white',
        name: '白色 logo',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/01abec78.png',
        ratio: 'aspect-video',
        bg: 'bg-[#2b2b2b]'
      }
    ]
  },
  {
    id: 'brand-poster',
    name: 'IP封面图',
    merged: true,
    items: [
      {
        id: 'poster-vertical',
        name: 'IP封面图',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/9f4433dc.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'preheat-point',
    name: '预热看点',
    items: [
      {
        id: 'preheat-point-1',
        name: '预热看点1：双强互撩联手破局',
        layout: 'point',
        images: [
          { id: 'preheat-point-1-img-1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/df395e83.png', label: '静态素材 1' },
          { id: 'preheat-point-1-img-2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/01c43952.png', label: '静态素材 2' }
        ],
        video: { id: 'preheat-point-1-video', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/e37b7f18.mp4', poster: '', label: '视频素材' },
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      },
      {
        id: 'preheat-point-2',
        name: '预热看点2：贵女觉醒看破黑白众生相',
        layout: 'point',
        images: [
          { id: 'preheat-point-2-img-1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/a418050f.png', label: '静态素材 1' },
{ id: 'preheat-point-2-img-2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/444e780d.png', label: '静态素材 2' }
        ],
        video: { id: 'preheat-point-2-video', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/bc572ea9.mp4', poster: '', label: '视频素材' },
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      }
    ]
  }
];

// 其他分类素材：IP logo、概念海报（原预热海报迁移至此）
const yanhuishiOtherSections = [
  {
    id: 'other-logo',
    name: 'IP logo',
    items: [
      {
        id: 'other-logo-original',
        name: '原版 logo',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/8c9afef5.png',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      },
      {
        id: 'other-logo-white',
        name: '白色 logo',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/3fac46d6.png',
        ratio: 'aspect-video',
        bg: 'bg-[#2b2b2b]'
      }
    ]
  },
  {
    id: 'other-calendar',
    name: '追剧日历',
    group: '海报&长图',
    merged: true,
    tip: '交付时间：\n开播前3天\n数量：\n1组多张\n具体内容建议：\n按周对外释放，单图形式，标明首播信息，告知会员+SVIP具体更新时间&集数，前置体现点映信息',
    items: [
      {
        id: 'calendar-1',
        name: '追剧日历 1',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/2a78e207.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'calendar-2',
        name: '追剧日历 2',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/60b860e8.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-concept-poster',
    name: '概念海报',
    group: '海报&长图',
    merged: true,
    tip: '交付时间：\n立项后开机前\n数量：\n≥1套\n具体内容建议：\n前期风格化海报，可无人物，概念海报、漫画版/手绘版海报等形式均可，突出剧集风格，未来可用于商务授权',
    items: [
      {
        id: 'concept-poster-vertical',
        name: '概念竖海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/cbb91280.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'concept-poster-horizontal',
        name: '概念横海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/45115b66.png',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-character-poster',
    name: '人物海报',
    group: '海报&长图',
    tip: '交付时间：\n拍摄期\n数量：\n≥1套\n具体内容建议：\n需有主演人物的海报，CP海报/群像海报/关系海报/个人版海报均可，根据剧集特性提供，加强外部演员和角色感知',
    groups: [
      {
        id: 'character-poster-role',
        name: '单人角色海报',
        items: [
          { id: 'character-poster-role-1', name: '单人角色海报 1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/e4582b83.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-role-2', name: '单人角色海报 2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/4ce4740e.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-role-3', name: '单人角色海报 3', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/bbdc4075.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-role-4', name: '单人角色海报 4', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/ab5f3161.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-role-5', name: '单人角色海报 5', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/2224cb73.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-role-6', name: '单人角色海报 6', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/94f293ee.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-role-7', name: '单人角色海报 7', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/6f87b51e.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }
        ]
      },
      {
        id: 'character-poster-silhouette',
        name: '光影轮廓海报',
        items: [
          { id: 'character-poster-silhouette-1', name: '光影轮廓海报 1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/72faec7a.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-silhouette-2', name: '光影轮廓海报 2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/d3c18f49.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-silhouette-3', name: '光影轮廓海报 3', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/8857ed06.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-silhouette-4', name: '光影轮廓海报 4', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/7bc9bf76.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-silhouette-5', name: '光影轮廓海报 5', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/f9249b52.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-silhouette-6', name: '光影轮廓海报 6', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/4f63d9bd.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-silhouette-7', name: '光影轮廓海报 7', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/dca1e318.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-silhouette-8', name: '光影轮廓海报 8', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/b96f7a90.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }
        ]
      },
      {
        id: 'character-poster-reversible',
        name: '全员双面反转海报',
        items: [
          { id: 'character-poster-reversible-1', name: '全员双面反转海报 1', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/image20131789040881570/0', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-reversible-2', name: '全员双面反转海报 2', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/image20141789040881570/0', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-reversible-3', name: '全员双面反转海报 3', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/image20151789040881571/0', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-reversible-4', name: '全员双面反转海报 4', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/image20161789040893471/0', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-reversible-5', name: '全员双面反转海报 5', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/image20171789040892653/0', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-reversible-6', name: '全员双面反转海报 6', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/image20741521789040883537/0', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-reversible-7', name: '全员双面反转海报 7', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/image20741531789040884313/0', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-reversible-8', name: '全员双面反转海报 8', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/image20741541789040885853/0', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }
        ]
      },
      {
        id: 'character-poster-cp',
        name: 'CP海报',
        items: [
          { id: 'character-poster-cp-1', name: 'CP海报 1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/fdaf0932.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-cp-2', name: 'CP海报 2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/f124c918.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }
        ]
      },
      {
        id: 'character-poster-female-group',
        name: '女性群像海报',
        items: [
          { id: 'character-poster-female-group-1', name: '女性群像海报 1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/ebe1a5d6.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }
        ]
      },
      {
        id: 'character-poster-group',
        name: '群像海报',
        items: [
          { id: 'character-poster-group-1', name: '群像海报 1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/779bd54d.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'character-poster-group-2', name: '群像海报 2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/7830bebd.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }
        ]
      }
    ]
  },
  {
    id: 'other-hot-poster',
    name: '热点海报',
    group: '海报&长图',
    tip: '交付时间：\n至少发布前一周提供\n数量：\n多张\n具体内容建议：\n结合节日、节气、主演生日、相关话题等热点营销内容',
    groups: [
      {
        id: 'hot-poster-birthday',
        name: '生日海报',
        items: [
          { id: 'hot-poster-birthday-1', name: '生日海报 1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/106f2a39.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'hot-poster-birthday-2', name: '生日海报 2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/8f2a6da0.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'hot-poster-birthday-3', name: '生日海报 3', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/3b3425d0.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'hot-poster-birthday-4', name: '生日海报 4', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/401caa77.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }
        ]
      },
      {
        id: 'hot-poster-festival',
        name: '节日海报',
        items: [
          { id: 'hot-poster-festival-1', name: '节日海报 1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/2914571d.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
          { id: 'hot-poster-festival-2', name: '节日海报 2', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/15d57859.png', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }
        ]
      }
    ]
  },
  {
    id: 'other-schedule-poster',
    name: '定档海报',
    group: '海报&长图',
    merged: true,
    tip: '交付时间：\n至少播前3个月提供\n数量：\n1套\n具体内容建议：\n重大节点海报，最好提供横竖版本。希望突出男女主或群像人物关系，突出剧集特质',
    items: [
      {
        id: 'schedule-poster-horizontal',
        name: '定档横海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/427a5420.png',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      },
      {
        id: 'schedule-poster-vertical',
        name: '定档竖海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/ebb31b47.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-launch-poster',
    name: '开播海报',
    group: '海报&长图',
    merged: true,
    tip: '交付时间：\n至少播前3个月提供\n数量：\n1套\n具体内容建议：\n重大节点海报，最好提供横竖版本。希望突出男女主或群像人物关系，突出剧集特质',
    items: [
      {
        id: 'launch-poster-horizontal',
        name: '开播横海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/60952d22.png',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      },
      {
        id: 'launch-poster-vertical',
        name: '开播竖海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/d4211e20.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-key-moment-poster',
    name: '关键节点海报',
    group: '海报&长图',
    merged: true,
    groupTitle: '收官海报',
    tip: '交付时间：\n至少播前3个月提供\n数量：\n多张\n具体内容建议：\n结合倒计时、更新日、点映结局、会员结局等关键节点，结合重点剧情名场面进行产出',
    items: [
      {
        id: 'key-moment-poster-finale-1',
        name: '收官海报 1',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/05a59144.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'key-moment-poster-finale-2',
        name: '收官海报 2',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/70a05aa3.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'key-moment-poster-finale-3',
        name: '收官海报 3',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/e64007ac.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'key-moment-poster-finale-4',
        name: '收官海报 4',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/87d7c6e8.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'key-moment-poster-finale-5',
        name: '收官海报 5',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/07538650.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'key-moment-poster-finale-6',
        name: '收官海报 6',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/d4c61df4.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'key-moment-poster-finale-7',
        name: '收官海报 7',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/a4119be5.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'key-moment-poster-finale-8',
        name: '收官海报 8',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/f5ce6690.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-pr-poster',
    name: '站内预约量PR海报',
    group: '海报&长图',
    merged: true,
    tip: '交付时间：\n至少发布前一周提供\n数量：\n多张\n具体内容建议：\n站内预约量破50万、100万、150万、200万、250万、300万等数据节点，结合主演海报、剧照延展\n如数据突出，可提前与运营沟通pr话术',
    items: [
      {
        id: 'pr-poster-50w',
        name: '预约破50万海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/17003bcf.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'pr-poster-80w',
        name: '预约破80万海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/68c32af9.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-heat-pr-poster',
    name: '站内热度值PR海报',
    group: '海报&长图',
    merged: true,
    tip: '交付时间：\n定档前提供\n数量：\n多张\n具体内容建议：\n站内热度值从20000开始，每破1000，对外pr一次，剧相关的人物、元素或是创意类型延展均可；26000必看俱乐部、28000爱看俱乐部、30000爆款俱乐部，这三个节点需要带俱乐部icon；\n如数据突出，可提前与运营沟通pr话术',
    items: [
      {
        id: 'heat-pr-poster-20000',
        name: '热度值破20000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/93748804.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-21000',
        name: '热度值破21000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/3d17dc08.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-22000',
        name: '热度值破22000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/fc40d1bf.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-23000',
        name: '热度值破23000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/07b63c01.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-24000',
        name: '热度值破24000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/d89072e0.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-25000',
        name: '热度值破25000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/6408f31f.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-26000',
        name: '热度值破26000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/1af5e0fb.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-27000',
        name: '热度值破27000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/4d81eaf3.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-28000',
        name: '热度值破28000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/181f3d88.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-29000',
        name: '热度值破29000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/076bc20c.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'heat-pr-poster-30000',
        name: '热度值破30000海报',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/2de54a03.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-role-heat-report',
    name: '剧集角色热度战报',
    group: '海报&长图',
    merged: true,
    tip: '交付时间：\n定档前提供\n数量：\n多张\n具体内容建议：\n站内角色热度破1000万、5000万、1亿、2亿、3亿等节点，根据剧照延展战报发布；\n如数据突出，可提前与运营沟通pr话术',
    items: [
      {
        id: 'role-heat-report-5000w',
        name: '角色热度破5000万',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/e804c3e6.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'role-heat-report-1yi',
        name: '角色热度破亿',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/e419140e.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-cloud-cinema-long-poster',
    name: '云包场海报长图',
    group: '海报&长图',
    merged: true,
    tip: '交付时间：\n开播前制作交付\n数量：\n≥1张\n具体内容建议：\n整合开播物料、站内资源玩法、明星互动等对外发布，体现大剧排面',
    items: [
      {
        id: 'cloud-cinema-long-poster-1',
        name: '演员版',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/0a449ba3.png',
        ratio: 'aspect-[9/16]',
        bg: 'bg-ink-950'
      },
      {
        id: 'cloud-cinema-long-poster-2',
        name: '主创版',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/a688b219.png',
        ratio: 'aspect-[9/16]',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-anniversary-poster',
    name: '开播周年海报',
    group: '海报&长图',
    merged: true,
    tip: '交付时间：\n开播周年前交付\n数量：\n≥1张\n具体内容建议：\n可根据主演剧照延展，开播一周年对外释放，拉动长尾价值',
    items: [
      {
        id: 'anniversary-poster-1',
        name: '开播周年海报 1',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/a9d64480.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'anniversary-poster-2',
        name: '开播周年海报 2',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/106d4802.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'anniversary-poster-3',
        name: '开播周年海报 3',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/e81154c7.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      },
      {
        id: 'anniversary-poster-4',
        name: '开播周年海报 4',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/982228d6.png',
        ratio: 'aspect-[3/4]',
        bg: 'bg-ink-950'
      }
    ]
  }
];

// APP外素材 - 视频素材：开机物料等以视频形态交付的素材
const yanhuishiOtherVideoSections = [
  {
    id: 'other-video-launch',
    name: '开机物料',
    tip: '交付时间：\n开机日前提供\n数量：\n1支\n具体内容建议：\n特辑、概念内容、动态海报等形式皆可',
    items: [
      {
        id: 'other-video-launch-1',
        name: '开机物料',
        hideName: true,
        type: 'video',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/5709adea.mp4',
        poster: '',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-video-wrap',
    name: '杀青物料',
    tip: '交付时间：\n杀青日前提供\n数量：\n1支\n具体内容建议：\n杀青特辑、片场侧拍内容等形式皆可',
    items: [
      {
        id: 'other-video-wrap-1',
        name: '杀青物料',
        hideName: true,
        type: 'video',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/fbbd7faa.mp4',
        poster: '',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-video-schedule-trailer',
    name: '定档预告片',
    tip: '交付时间：\n至少播前3个月提供\n数量：\n1支\n具体内容建议：\n突出剧集卖点，人物关系，有剧情亮点的放出',
    items: [
      {
        id: 'other-video-schedule-trailer-1',
        name: '定档预告片',
        hideName: true,
        type: 'video',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/af246122.mp4',
        poster: '',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-video-launch-trailer',
    name: '开播预告片',
    tip: '交付时间：\n至少播前3个月提供\n数量：\n1支\n具体内容建议：\n突出更丰富的剧情内容，调起用户开播期待',
    items: [
      {
        id: 'other-video-launch-trailer-1',
        name: '开播预告片',
        hideName: true,
        type: 'video',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/bc1bd54a.mp4',
        poster: '',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-video-emotion-trailer',
    name: '情感预告',
    tip: '交付时间：\n至少播前3个月提供\n数量：\n≥1支\n具体内容建议：\n不同主题的预告',
    items: [
      {
        id: 'other-video-emotion-trailer-1',
        name: '情感预告',
        hideName: true,
        type: 'video',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/391a41c1.mp4',
        poster: '',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-video-group-trailer',
    name: '群像预告',
    tip: '交付时间：\n至少播前3个月提供\n数量：\n≥1支\n具体内容建议：\n不同主题的预告',
    items: [
      {
        id: 'other-video-group-trailer-1',
        name: '群像预告',
        hideName: true,
        type: 'video',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/1656a415.mp4',
        poster: '',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      }
    ]
  },
  {
    id: 'other-video-mv',
    name: 'MV',
    group: 'MV',
    displayTitle: 'MV',
    tip: '交付时间：\n至少播前3个月提供\n数量：\n≥3支\n具体内容建议：\n主题曲/插曲/片头/片尾/演唱者录音室侧拍MV等；OST中，希望至少有1首平台拥有独立歌曲权益。',
    items: [
      {
        id: 'other-video-mv-1',
        name: '雁回时MV-剪',
        type: 'video',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/559ff30e.mp4',
        poster: '',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      },
      {
        id: 'other-video-mv-blade-1',
        name: '雁回时MV-刃',
        type: 'video',
        url: 'https://vfiles.gtimg.cn/wupload/xy/starter/18693336.mp4',
        poster: '',
        ratio: 'aspect-video',
        bg: 'bg-ink-950'
      }
    ]
  }
];

// 热度值：排在第19集之后的独立板块，仅含看点图片素材（无视频）
const heatSection = {
  id: 'heat-value',
  name: '热度值',
  points: [
    {
      id: 'heat-point-1',
      name: '最快热度值破3万剧集，进入腾讯视频爆款俱乐部',
      hideEmptyVideo: true,
      imageRatio: 'aspect-[3/2]',
      images: [
        { id: 'img-heat-1-1', url: 'https://vfiles.gtimg.cn/wupload/xy/starter/1fec4712.png', label: '静态素材 1' }
      ],
      video: { id: 'video-heat-1', url: '', poster: '', label: '视频素材' }
    }
  ]
};

// 初始数据：第1集、第2集为真实素材，第2集后直接接第18集、第19集真实素材，最后为热度值
const yanhuishiEpisodes = [
  episode1,
  episode2,
  episode18,
  episode19,
  heatSection
];

// ============================================================
// 多剧集支持：每个剧集包含品牌通用素材、预热期素材、开播期剧集数据
// ============================================================

// 生成一个空的品牌通用素材（结构与雁回时一致，url 待填充）
function createEmptyBrandSections() {
  return [
    {
      id: 'brand-logo',
      name: 'IP logo',
      items: [
        { id: 'logo-original', name: '原版 logo', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/mzc00200znyfa5u1753853696630/0?imageView2/2/w/536/h/360', sizeHint: '高度≤480px，560px ≤宽度 ≤1920px·四周撑满不要留空间·透明底 PNG', ratio: 'aspect-video', bg: 'bg-ink-950' },
        { id: 'logo-white', name: '白色 logo', url: 'https://vmmp.qpic.cn/vmedia/xh/mulpic/mzc00200znyfa5u1785228983299/0', sizeHint: '高度≤480px，560px ≤宽度 ≤1920px·四周撑满不要留空间·透明底 PNG', ratio: 'aspect-video', bg: 'bg-[#2b2b2b]' }
      ]
    },
    {
      id: 'brand-poster',
      name: 'IP封面图',
      merged: true,
      items: [
        { id: 'poster-vertical', name: 'IP封面图', url: 'https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200znyfa5u1760853924228/0', sizeHint: '推荐 1080×1440（3:4）', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' }
      ]
    }
  ];
}

// 生成一个空的预热期素材（结构与雁回时一致，url 待填充）
function createEmptyPreheatSections() {
  return [
    {
      id: 'preheat-logo',
      name: 'IP logo',
      itemKind: 'image',
      items: [
        { id: 'preheat-logo-original', name: '原版 logo', url: '', sizeHint: '高度≤480px，560px ≤宽度 ≤1920px·四周撑满不要留空间·透明底 PNG', ratio: 'aspect-video', bg: 'bg-ink-950' },
        { id: 'preheat-logo-white', name: '白色 logo', url: '', sizeHint: '高度≤480px，560px ≤宽度 ≤1920px·四周撑满不要留空间·透明底 PNG', ratio: 'aspect-video', bg: 'bg-[#2b2b2b]' }
      ]
    },
    {
      id: 'preheat-poster',
      name: '海报',
      itemKind: 'image',
      merged: true,
      items: [
        { id: 'preheat-poster-vertical', name: '竖版海报', url: '', sizeHint: '推荐 1080×1440（3:4）', ratio: 'aspect-[3/4]', bg: 'bg-ink-950' },
        { id: 'preheat-poster-horizontal', name: '横版海报', url: '', sizeHint: '推荐 1920×1080（16:9）', ratio: 'aspect-video', bg: 'bg-ink-950' }
      ]
    },
    {
      id: 'preheat-trailer',
      name: '预告片',
      itemKind: 'video',
      items: [
        { id: 'preheat-trailer-item-1', name: '预告片文案', url: '', sizeHint: '视频素材 推荐 1920×1080（16:9）· MP4 / H.264', ratio: 'aspect-video', bg: 'bg-ink-950', type: 'video', poster: '' }
      ]
    }
  ];
}

// 生成一个空的开播期剧集列表（第1集、第2集，各4个看点，url 待填充）
function createEmptyEpisodeList() {
  const withSizeHint = (index, title, imageUrls, videoAsset) => {
    const base = createEmptyPoint(index);
    return {
      ...base,
      ...(title ? { name: title } : {}),
      images: base.images.map((img, i) => ({
        ...img,
        url: (imageUrls && imageUrls[i]) || img.url
      })),
      video: {
        ...base.video,
        url: (videoAsset && videoAsset.url) || base.video.url,
        poster: (videoAsset && videoAsset.poster) || base.video.poster
      },
      sizeHint: '静态素材 推荐 1920×1080（16:9）',
      videoSizeHint: '视频素材 推荐 1920×1080（16:9）· MP4 / H.264'
    };
  };
  return [
    {
      id: 'ep-1',
      name: '第 4 期 上',
      points: [
        withSizeHint(1, '出发团办"东北时装周"', [
          'https://vfiles.gtimg.cn/wupload/xy/starter/d6864164.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/73f4846c.png'
        ], {
          url: 'https://vfiles.gtimg.cn/wupload/xy/starter/5dece02d.MP4',
          poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/d6864164.png'
        }),
        withSizeHint(2, '沈腾王安宇玩"当然了"互相伤害', [
          'https://vfiles.gtimg.cn/wupload/xy/starter/4337c14c.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/53ceab5d.png'
        ], {
          url: 'https://vfiles.gtimg.cn/wupload/xy/starter/3e195c49.mov',
          poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/53ceab5d.png'
        }),
        withSizeHint(3, '沈腾贾冰做东北烤肉香疯了', [
          'https://vfiles.gtimg.cn/wupload/xy/starter/7a6109de.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/759d3177.png'
        ], {
          url: 'https://vfiles.gtimg.cn/wupload/xy/starter/fa892ffe.mov',
          poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/759d3177.png'
        }),
        withSizeHint(4, '全员黑化！沈腾王安宇用锅底灰"搓澡"', [
          'https://vfiles.gtimg.cn/wupload/xy/starter/e5efabe4.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/48727f4e.png'
        ], {
          url: 'https://vfiles.gtimg.cn/wupload/xy/starter/791fe90b.mov',
          poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/48727f4e.png'
        })
      ]
    },
    {
      id: 'ep-2',
      name: '第 4 期 下',
      points: [
        withSizeHint(1, '沈腾耍赖王安宇范丞丞气到无语', [
          'https://vfiles.gtimg.cn/wupload/xy/starter/de1d8488.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/2c47bb18.png'
        ], {
          url: 'https://vfiles.gtimg.cn/wupload/xy/starter/06dc5391.mov',
          poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/de1d8488.png'
        }),
        withSizeHint(2, '黄景瑜被机器人打？沈腾摇人', [
          'https://vfiles.gtimg.cn/wupload/xy/starter/e5068220.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/cb828123.png'
        ], {
          url: 'https://vfiles.gtimg.cn/wupload/xy/starter/2e057d59.mov',
          poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/cb828123.png'
        }),
        withSizeHint(3, '宇过天亭画画默契爆棚', [
          'https://vfiles.gtimg.cn/wupload/xy/starter/f2115709.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/d52226a9.png'
        ], {
          url: 'https://vfiles.gtimg.cn/wupload/xy/starter/62eb5333.mov',
          poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/f2115709.png'
        }),
        withSizeHint(4, '贾冰卤牛肉炖豆角香疯了', [
          'https://vfiles.gtimg.cn/wupload/xy/starter/205a7ef4.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/7b26a749.png'
        ], {
          url: 'https://vfiles.gtimg.cn/wupload/xy/starter/e239a358.mov',
          poster: 'https://vfiles.gtimg.cn/wupload/xy/starter/7b26a749.png'
        })
      ]
    }
  ];
}

// 少儿-动物神探队2 专属开播期剧集列表：复用通用结构，覆盖分集名称、裁剪看点数量并覆盖各集看点内容，避免与其他剧集共享同一份数据
function createAnimalDetective2EpisodeList() {
  const episodeNames = ['第 21 集', '第 22 集'];
  // 各集看点覆盖：按「分集 id → 看点序号」指定文案与静态素材，未列出的看点保持原样
  const pointOverrides = {
    'ep-1': {
      1: {
        name: '小溪和旅鼠们无障碍沟通！',
        imageUrls: [
          'https://vfiles.gtimg.cn/wupload/xy/starter/5329913f.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/dbcca67d.png'
        ],
        videoUrl: 'https://vfiles.gtimg.cn/wupload/xy/starter/af02df1f.mp4'
      },
      2: {
        name: '阿姆小溪智斗大熊护送旅鼠',
        imageUrls: [
          'https://vfiles.gtimg.cn/wupload/xy/starter/35767712.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/ad43f50a.png'
        ],
        videoUrl: 'https://vfiles.gtimg.cn/wupload/xy/starter/b24a7e05.mp4'
      }
    },
    'ep-2': {
      1: {
        name: '鬼脸天蛾cos蜜蜂偷蜂蜜',
        imageUrls: [
          'https://vfiles.gtimg.cn/wupload/xy/starter/f17dd8ee.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/1179689d.png'
        ],
        videoUrl: 'https://vfiles.gtimg.cn/wupload/xy/starter/d22dd47a.mp4'
      },
      2: {
        name: '让我看看是谁偷吃蜂蜜呢？',
        imageUrls: [
          'https://vfiles.gtimg.cn/wupload/xy/starter/4f75a0b2.png',
          'https://vfiles.gtimg.cn/wupload/xy/starter/7cc4d1de.png'
        ],
        videoUrl: 'https://vfiles.gtimg.cn/wupload/xy/starter/d231c1df.mp4'
      }
    }
  };
  return createEmptyEpisodeList().map((episode, index) => {
    const next = {
      ...episode,
      name: episodeNames[index] || episode.name,
      // 第 21、22 集仅保留看点 1、2，看点 3、4 已按需求删除
      points: episode.points.slice(0, 2)
    };
    const overrides = pointOverrides[episode.id];
    return {
      ...next,
      points: next.points.map((point, pointIndex) => {
        const override = overrides ? overrides[pointIndex + 1] : null;
        // 无论是否有覆盖配置，本剧集所有看点都不写入视频附加图片
        const videoWithoutStatic = { ...point.video, poster: '', poster2: '', images: [] };
        // 本剧集静态素材按 1920×1177 出图，提示文案统一覆盖，不影响其他剧集
        const sizeHint = '静态素材 推荐 1920×1177';
        if (!override) return { ...point, sizeHint, video: videoWithoutStatic };
        return {
          ...point,
          name: override.name,
          sizeHint,
          // 静态素材按 URL 列表生成，支持超过 2 张；兼容旧的 imageUrl/imageUrl2 写法
          images: (Array.isArray(override.imageUrls)
            ? override.imageUrls
            : [override.imageUrl, override.imageUrl2]
          )
            .filter(Boolean)
            .map((url, imgIndex) => ({
              id: `${point.id}-img-${imgIndex + 1}`,
              url,
              label: `静态素材 ${imgIndex + 1}`
            })),
          // 视频素材：已指定 videoUrl 的看点写入对应视频，其余仍清空待后续补齐
          // 第 21、22 集全部看点均清空 poster/poster2/images，避免写入视频附加图片
          video: {
            ...videoWithoutStatic,
            url: override.videoUrl || ''
          }
        };
      })
    };
  });
}

// 级别定义：S+/S级为默认展示级别，A级素材内容稍后补齐
export const LEVELS = [
  { id: 'sp_s', name: 'S+/S级' },
  { id: 'a', name: 'A级' }
];

// 剧集集合：每个剧集自带独立的三套数据，并按级别（S+/S级、A级）分组，互不干扰
export const dramas = [
  {
    id: 'yanhuishi',
    name: '电视剧-雁回时',
    levels: {
      sp_s: {
        brandSections: yanhuishiBrandSections,
        preheatSections: yanhuishiPreheatSections,
        episodes: yanhuishiEpisodes,
        otherSections: yanhuishiOtherSections,
        otherVideoSections: yanhuishiOtherVideoSections
      },
      a: {
        brandSections: [],
        preheatSections: [],
        episodes: [],
        otherSections: [],
        otherVideoSections: []
      }
    }
  },
];

const fallbackDynamicDramas = [];

let currentDramaId = dramas[0].id;
let currentLevelId = LEVELS[0].id;
let dynamicDramas = [];
const DYNAMIC_DRAMAS_CACHE_KEY = 'ip-material-dynamic-dramas-cache';

function readDynamicDramasCache() {
  try {
    const raw = window.localStorage.getItem(DYNAMIC_DRAMAS_CACHE_KEY);
    if (!raw) return [];
    const cached = JSON.parse(raw);
    return Array.isArray(cached) ? cached.map(normalizeDynamicDrama) : [];
  } catch (error) {
    console.warn('动态项目缓存读取失败', error);
    return [];
  }
}

function writeDynamicDramasCache(items) {
  try {
    window.localStorage.setItem(DYNAMIC_DRAMAS_CACHE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn('动态项目缓存写入失败', error);
  }
}

function normalizeDocumentaryPosterSections(dramaName, sections) {
  if (!String(dramaName || '').startsWith('纪录片-') || !Array.isArray(sections)) return sections || [];
  return sections.map(section => {
    if (String(section.name || '').trim() !== '海报') return section;
    return {
      ...section,
      merged: true,
      items: Array.isArray(section.items)
        ? section.items.map(item => ({ ...item, ratio: 'aspect-[3/4]' }))
        : []
    };
  });
}

function normalizeDynamicDrama(drama) {
  const levelData = drama.levels?.sp_s || {
    brandSections: [],
    preheatSections: [],
    episodes: [],
    otherSections: [],
    otherVideoSections: []
  };
  return {
    ...drama,
    isDynamic: true,
    levels: {
      sp_s: {
        brandSections: levelData.brandSections || [],
        preheatSections: normalizeDocumentaryPosterSections(drama.name, levelData.preheatSections),
        episodes: levelData.episodes || [],
        otherSections: levelData.otherSections || [],
        otherVideoSections: levelData.otherVideoSections || []
      },
      a: {
        brandSections: [],
        preheatSections: [],
        episodes: [],
        otherSections: [],
        otherVideoSections: []
      }
    }
  };
}

function mergeDynamicDramas(items) {
  const merged = new Map();
  fallbackDynamicDramas.map(normalizeDynamicDrama).forEach(item => merged.set(item.id, item));
  items.map(normalizeDynamicDrama).forEach(item => merged.set(item.id, item));
  return Array.from(merged.values());
}

export async function loadDynamicDramas() {
  try {
    const response = await fetch('/api/projects', { cache: 'no-store' });
    if (!response.ok) {
      dynamicDramas = mergeDynamicDramas(readDynamicDramasCache());
      return dynamicDramas;
    }
    const data = await response.json();
    const projects = Array.isArray(data.projects) ? data.projects : [];
    dynamicDramas = mergeDynamicDramas(projects);
    writeDynamicDramasCache(dynamicDramas);
    return dynamicDramas;
  } catch (error) {
    console.warn('动态项目加载失败，使用本地缓存兜底', error);
    dynamicDramas = mergeDynamicDramas(readDynamicDramasCache());
    return dynamicDramas;
  }
}

export function upsertDynamicDrama(drama) {
  const normalized = normalizeDynamicDrama(drama);
  const index = dynamicDramas.findIndex(d => d.id === normalized.id);
  if (index >= 0) dynamicDramas[index] = normalized;
  else dynamicDramas.push(normalized);
  dynamicDramas = mergeDynamicDramas(dynamicDramas);
  writeDynamicDramasCache(dynamicDramas);
  return normalized;
}

function sortDramasForDisplay(items) {
  const next = [...items];
  const varietyIndex = next.findIndex(item => item.id === 'earthfresh');
  const movieIndex = next.findIndex(item => item.id === 'custom-movie-huamenglu');
  if (varietyIndex < 0 || movieIndex < 0 || movieIndex === varietyIndex + 1) return next;
  const [movie] = next.splice(movieIndex, 1);
  const targetIndex = next.findIndex(item => item.id === 'earthfresh');
  next.splice(targetIndex + 1, 0, movie);
  return next;
}

export function getDramas() {
  const merged = new Map();
  dramas.forEach(item => merged.set(item.id, item));
  dynamicDramas.forEach(item => merged.set(item.id, item));
  return sortDramasForDisplay(Array.from(merged.values()));
}

export function getStaticDramas() {
  return dramas;
}

export function getCurrentDramaId() {
  return currentDramaId;
}

export function setCurrentDrama(id) {
  const found = getDramas().find(d => d.id === id);
  if (found) currentDramaId = id;
  return getCurrentDrama();
}

export function getCurrentLevelId() {
  return currentLevelId;
}

export function setCurrentLevel(levelId) {
  const found = LEVELS.find(l => l.id === levelId);
  if (found) currentLevelId = levelId;
  return currentLevelId;
}

export function isCurrentDynamicDrama() {
  return dynamicDramas.some(d => d.id === currentDramaId);
}

export function getCurrentDrama() {
  const drama = getDramas().find(d => d.id === currentDramaId) || getDramas()[0];
  const levelData = drama.levels[currentLevelId] || drama.levels[LEVELS[0].id];
  return {
    id: drama.id,
    name: drama.name,
    defaultLevel: drama.defaultLevel || LEVELS[0].name,
    isDynamic: Boolean(drama.isDynamic),
    status: drama.status || 'static',
    hasPublished: Boolean(drama.hasPublished),
    brandSections: levelData.brandSections || [],
    preheatSections: levelData.preheatSections || [],
    episodes: levelData.episodes || [],
    otherSections: levelData.otherSections || [],
    otherVideoSections: levelData.otherVideoSections || []
  };
}
