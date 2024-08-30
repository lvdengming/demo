/**
 * author: lvdengming@foxmail.com
 * date: 2024-08-24
 * description: 基于 IntersectionObserver 实现瀑布流懒加载
 */

import { setStyle } from '../../scripts/util.js';

const config = {
    ITEMS_COUNT: 100,
    DISPLAY_CONTAINER: document.getElementById('app'),
    WATERFALL_ITEM_CLASS_NAME: 'waterfall-item',
    /**
     * imgWrapper大小等同于img大小，为waterfallItem大小减去内边距
     */
    IMG_WRAPPER_CLASS_NAME: 'img-wrapper',
    IMG_WIDTH: 300,
    IMG_MIN_HEIGHT: 200,
    IMG_MAX_HEIGHT: 600,
    IMG_BASE_URL: 'https://picsum.photos',
    LAYOUT_WAIT_TIME: 1000,
};
const waterfallItemList = [];

let observer;

/**
 * 初始化创建 img-wrapper，img
 */
function init() {
    const heightRange = config.IMG_MAX_HEIGHT - config.IMG_MIN_HEIGHT;

    for (let i = 0; i < config.ITEMS_COUNT; i++) {
        const height =
            config.IMG_MIN_HEIGHT + Math.round(Math.random() * heightRange);

        const waterfall = document.createElement('div');
        waterfall.className = config.WATERFALL_ITEM_CLASS_NAME;
        waterfall.dataset.src = `${config.IMG_BASE_URL}/${config.IMG_WIDTH}/${height}?random=${i}`;
        waterfall.setStyle = setStyle;
        waterfall.setStyle`
            position: absolute;
            width: ${config.IMG_WIDTH}px;
            height: ${height}px;
        `;

        const imgWrapper = document.createElement('div');
        imgWrapper.className = config.IMG_WRAPPER_CLASS_NAME;
        imgWrapper.setStyle = setStyle;
        waterfall.append(imgWrapper);

        config.DISPLAY_CONTAINER.append(waterfall);
        waterfallItemList.push(waterfall);
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

    waterfallItemList.forEach((waterfall) => {
        const index = layoutHeights.indexOf(Math.min(...layoutHeights));
        waterfall.setStyle`
            top: ${layoutHeights[index]}px;
            left: ${index * config.IMG_WIDTH}px;
        `;

        layoutHeights[index] += waterfall.clientHeight;
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

            const waterfall = entry.target;
            const imgWrapper = waterfall.querySelector(
                `.${config.IMG_WRAPPER_CLASS_NAME}`
            );

            const img = document.createElement('img');
            img.src = waterfall.dataset.src;
            img.addEventListener('load', () => {
                imgWrapper.setStyle`background-image: none;`;
                imgWrapper.append(img);
            });

            observer.unobserve(waterfall);
        });
    });

    waterfallItemList.forEach((wrapper) => {
        observer.observe(wrapper);
    });
}

/**
 * 通知父窗口，关闭加载动画（当前页面首屏图片加载时间较长）
 */
function closeLoading() {
    window.parent.postMessage({ closeLoading: true });
}

init();
layoutWaterfall();
addIntersectionObserver();
closeLoading();

/* eslint-disable no-undef */
window.addEventListener(
    'resize',
    _.throttle(layoutWaterfall, config.LAYOUT_WAIT_TIME)
);
/* eslint-enable no-undef */
