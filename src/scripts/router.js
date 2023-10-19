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
        isNotComplete: true,
    },
    {
        title: '主题切换',
        path: 'theme-toggle',
        src: 'src/pages/11_主题切换',
    },
];

export const router = {
    mode: 'hash',
    routes,
};
