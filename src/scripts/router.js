export const routes = [
  {
    title: '太阳加载动画',
    path: 'sun-loading',
    src: 'src/pages/01_太阳加载动画'
  },
  {
    title: '转圈加载动画',
    path: 'rotate-loading',
    src: 'src/pages/03_转圈加载动画'
  },
  {
    title: '自定义右键菜单',
    path: 'popup-menus',
    src: 'src/pages/02_自定义右键菜单'
  },
  {
    title: '美团',
    path: 'meituan',
    src: 'https://cd.meituan.com/'
  },
  {
    title: '淘宝',
    path: 'taobao',
    src: 'https://www.taobao.com/'
  },
  {
    title: '拼多多',
    path: 'pingduoduo',
    src: 'https://www.pinduoduo.com/'
  }
];

export const router = {
  mode: 'hash',
  routes
};
