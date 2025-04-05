export const routes = [
    {
        title: '太阳加载动画',
        path: 'sun-loading',
        src: 'src/pages/01_太阳加载动画',
    },
    {
        title: '转圈加载动画',
        path: 'rotate-loading',
        src: 'src/pages/03_转圈加载动画',
    },
    {
        title: '吃豆人动画',
        path: 'eat-pea',
        src: 'src/pages/06_吃豆人',
    },
    {
        title: '自定义右键菜单',
        path: 'popup-menus',
        src: 'src/pages/02_自定义右键菜单',
    },
    {
        title: '动效按钮',
        path: 'dynamic-button',
        src: 'src/pages/04_动效按钮',
    },
    {
        title: '自定义滚动条',
        path: 'scrollbar',
        src: 'src/pages/05_自定义滚动条',
    },
    {
        title: '骨架屏',
        path: 'skeleton',
        src: 'src/pages/07_骨架屏',
    },
    {
        title: '抽签',
        path: 'lottery',
        src: 'src/pages/08_抽签',
    },
    {
        title: '动态输入',
        path: 'dynamic-input',
        src: 'src/pages/09_动态输入文字',
    },
    {
        title: '轮播图',
        path: 'carousel',
        src: 'src/pages/10_轮播图',
        isNotComplete: false,
    },
    {
        title: '主题切换',
        path: 'theme-toggle',
        src: 'src/pages/11_主题切换',
    },
    {
        title: '描边动画',
        path: 'stroke-animation',
        src: 'src/pages/12_描边动画',
    },
    {
        title: '瀑布流',
        path: 'waterfall',
        src: 'src/pages/13_瀑布流',
    },
    {
        title: '课程表',
        path: 'timetable',
        src: 'src/pages/14_课程表',
    },
    {
        title: '数字动画',
        path: 'number-animation',
        src: 'src/pages/15_数字动画',
    },
    {
        title: '加载更多',
        path: 'load-more',
        src: 'src/pages/16_加载更多',
    },
    {
        title: '视频视口播放',
        path: 'video-viewport-play',
        src: 'src/pages/17_视频视口播放',
    },
    {
        title: '图片查看',
        path: 'img-viewer',
        src: 'src/pages/18_图片查看',
    },
    {
        title: '本地图片预览',
        path: 'local-imgs-preview',
        src: 'src/pages/19_本地图片预览',
    },
    {
        title: '链接跳转拦截',
        path: 'link-interceptor',
        src: 'src/pages/20_链接跳转拦截',
    },
];

export const router = {
    mode: 'hash',
    routes,
};
