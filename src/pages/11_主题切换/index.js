const Theme = {
    DARK: 'dark',
    LIGHT: 'light',
};
let theme = localStorage.getItem('page_theme') ?? Theme.LIGHT;
setPageTheme(theme);

const toggle = document.querySelector('.theme-toggle');
// 绑定颜色开关点击事件
toggle.addEventListener('click', () => {
    theme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setPageTheme(theme);
    localStorage.setItem('page_theme', theme);
});

function setPageTheme(theme) {
    // 在 html 上设置 data-theme 属性值为 theme
    // 设置元素的 dataset.xxx 属性等价于设置元素 data-xxx 属性值
    document.documentElement.dataset.theme = theme;

    // 设置颜色开关选项
    const circle = document.querySelector('.theme-toggle .circle');
    const left = theme === Theme.LIGHT ? '5px' : '65px';
    circle.style.left = left;

    // 设置显示文本
    const title = document.querySelector('h1 .theme');
    title.innerHTML = theme;
}
