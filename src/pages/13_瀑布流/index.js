/**
 * author: lvdengming@foxmail.com
 * date: 2024-08-24
 * description: 基于 IntersectionObserver 实现瀑布流懒加载
 */

import { setStyle } from '../../scripts/util.js';

const config = {
    ITEMS_COUNT: 100,
    DISPLAY_CONTAINER: document.getElementById('app'),
    /**
     * imgWrapper高度，实际展示img大小需要去除imgWrapper内边距
     */
    IMG_WRAPPER_CLASS_NAME: 'img-wrapper',
    IMG_WIDTH: 300,
    IMG_MIN_HEIGHT: 200,
    IMG_MAX_HEIGHT: 600,
    IMG_BASE_URL: 'https://picsum.photos',
    LAYOUT_WAIT_TIME: 1000,
};
const imgWrapperList = [];

let observer;

/**
 * 初始化创建 img-wrapper，img
 */
function init() {
    const heightRange = config.IMG_MAX_HEIGHT - config.IMG_MIN_HEIGHT;

    for (let i = 0; i < config.ITEMS_COUNT; i++) {
        const height =
            config.IMG_MIN_HEIGHT + Math.round(Math.random() * heightRange);

        const div = document.createElement('div');
        div.className = config.IMG_WRAPPER_CLASS_NAME;
        div.dataset.src = `${config.IMG_BASE_URL}/${config.IMG_WIDTH}/${height}?random=${i}`;
        div.setStyle = setStyle;
        div.setStyle`
            position: absolute;
            width: ${config.IMG_WIDTH}px;
            height: ${height}px;
        `;

        config.DISPLAY_CONTAINER.append(div);
        imgWrapperList.push(div);
    }
}

/**
 * 根据屏幕宽度，布局瀑布流
 */
function layoutWaterfall() {
    const columnCount = Math.floor(
        document.body.clientWidth / config.IMG_WIDTH
    );
    const layoutHeights = new Array(columnCount).fill(0);

    imgWrapperList.forEach((wrapper) => {
        const index = layoutHeights.indexOf(Math.min(...layoutHeights));
        wrapper.setStyle`
            top: ${layoutHeights[index]}px;
            left: ${index * config.IMG_WIDTH}px;
        `;

        layoutHeights[index] += wrapper.clientHeight;
    });
}

/**
 * 通过 IntersectionObserver 监听元素是否处于可视区域，实现图片懒加载
 */
function addIntersectionObserver() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const imgWrapper = entry.target;
            const img = document.createElement('img');
            img.src = imgWrapper.dataset.src;
            img.addEventListener('load', () => {
                imgWrapper.setStyle`background-image: none;`;
                imgWrapper.append(img);
            });

            observer.unobserve(imgWrapper);
        });
    });

    imgWrapperList.forEach((wrapper) => {
        observer.observe(wrapper);
    });
}

init();
layoutWaterfall();
addIntersectionObserver();

/* eslint-disable no-undef */
window.addEventListener(
    'resize',
    _.throttle(layoutWaterfall, config.LAYOUT_WAIT_TIME)
);
/* eslint-enable no-undef */
