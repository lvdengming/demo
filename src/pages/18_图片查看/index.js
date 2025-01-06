/**
 * author: lvdengming@foxmail.com
 * date: 2025-01-06
 */

const app = document.getElementById('app');
const img = document.querySelector('img');

img.addEventListener('load', () => {
    // 图片加载完成后，保持图片宽高比在 app 中 object-fit contain 展示
    const appRatio = app.clientWidth / app.clientHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let width, height;
    if (appRatio <= imgRatio) {
        width = app.clientWidth;
        height = width / imgRatio;
    } else {
        height = app.clientHeight;
        width = height * imgRatio;
    }

    const top = (app.clientHeight - height) / 2;
    const left = (app.clientWidth - width) / 2;

    img.style.cssText = `
        top: ${top}px;
        left: ${left}px;
        width: ${width}px;
        height: ${height}px;
        object-fit: unset;
    `;

    addEvents();
});

function addEvents() {}
