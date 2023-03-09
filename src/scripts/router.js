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
];

export const router = {
  mode: 'hash',
  routes,
};
