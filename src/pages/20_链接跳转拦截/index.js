/**
 * author: lvdengming@foxmail.com
 * date: 2025-04-05
 */

import { getQueryParams } from '../../common/util.js';

/** 页面在 query 中存储链接的 key */
const LINK_KEY = 'target';

/** 页面跳转拦截信息 */
const interceptor = document.querySelector('.interceptor-wrapper');
/** 继续访问 */
const confirm = document.getElementById('confirm');

// 当前页面处于跳转状态
const params = getQueryParams();
if (params[LINK_KEY]) {
    const link = decodeURIComponent(params[LINK_KEY]);
    const el = interceptor.querySelector('.link');
    el.innerHTML = link;

    interceptor.classList.add('active');
}

// 继续访问
confirm.addEventListener('click', () => {
    const link = interceptor.querySelector('.link').innerHTML;
    (window.parent === window ? window : window.parent).location.href = link;
});

// 页面上的链接被点击
document.addEventListener('click', function (e) {
    const target = e.target.closest('a');
    if (!target || target.getAttribute('no-intercept') !== null) {
        return;
    }

    // 阻止链接跳转
    e.preventDefault();

    const link =
        window.parent === window
            ? window.location.href
            : window.parent.location.href;
    const href = `${link}?${LINK_KEY}=${encodeURIComponent(target.href)}`;

    if (target.getAttribute('target') === '_blank') {
        window.open(href);
    } else {
        (window.parent === window ? window : window.parent).location.href =
            href;
    }
});
