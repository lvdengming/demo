/**
 * author: lvdengming@foxmail.com
 * date: 2025-01-06
 */

const app = document.getElementById('app');
const img = document.querySelector('img');

img.addEventListener('load', () => {
    console.log(app, img);
    console.log('图片加载完成');
});
