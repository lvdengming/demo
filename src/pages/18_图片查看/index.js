/**
 * author: lvdengming@foxmail.com
 * date: 2025-01-06
 */

const app = document.getElementById('app');
const img = document.querySelector('img');

img.addEventListener('load', () => {
    if (app.clientHeight === 0 || img.naturalHeight === 0) return;

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

function addEvents() {
    let startX,
        startY,
        startLeft,
        startTop,
        isDragging = false,
        scale = 1;

    img.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = img.offsetLeft;
        startTop = img.offsetTop;
    });

    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    img.addEventListener('wheel', (e) => {
        e.preventDefault();

        scale += e.deltaY * -0.01;
        // 限定缩放比例在 0.25-4 之间
        scale = Math.min(Math.max(0.25, scale), 4);

        img.style.transform = `scale(${scale})`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // 限定拖拽范围在容器内
        const rect = app.getBoundingClientRect();
        if (
            !(
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            )
        ) {
            isDragging = false;
            return;
        }

        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;

        img.style.left = `${startLeft + diffX}px`;
        img.style.top = `${startTop + diffY}px`;
    });
}
