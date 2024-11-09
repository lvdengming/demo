/**
 * author: lvdengming@foxmail.com
 * date: 2024-11-08
 */

import { linearAnimation } from '../../common/util.js';

const price = document.querySelector('#app .price-wrapper .price');
const reset = document.querySelector('#app .action-wrapper .reset');
const discount = document.querySelector('#app .action-wrapper .discount');

const from = 2999;
const to = 299;
const duration = 2000;

/**
 * 设置价格
 * @param {number} value 具体价格
 */
const setPrice = (value) => {
    price.textContent = value.toFixed(2);
};

// 设置默认价格
setPrice(from);

reset.addEventListener('click', () => {
    setPrice(from);
});

discount.addEventListener('click', () => {
    linearAnimation(from, to, duration, (value) => {
        setPrice(value);
    });
});
