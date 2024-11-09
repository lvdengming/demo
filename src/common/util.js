import { ClientStatus } from './constant.js';

function queryClientStatus() {
    const mobileRegExp = /Mobi|Android|iPhone/i;
    const userAgent = navigator.userAgent;
    return mobileRegExp.test(userAgent)
        ? ClientStatus.MOBILE
        : ClientStatus.NO_MOBILE;
}

function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.apply(null, args), delay);
    };
}

function throttle(fn, timeSpan) {
    let timestamp = 0;
    return function (...args) {
        const now = Date.now();
        if (now - timestamp <= timeSpan) return false;
        timestamp = now;
        setTimeout(() => fn.apply(null, args), timeSpan);
    };
}

function createViewInComputer() {
    const section = document.createElement('section');
    section.style = `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        inset: 0;
        background-color: #fff;
        font-size: 20px;
        color: #303133;
        z-index: 999;
    `;

    const img = document.createElement('img');
    img.src = '../../../assets/view-in-computer.svg';
    img.style = `
        width: 50vw;
        margin-bottom: 16px;
    `;
    const span = document.createElement('span');
    span.textContent = '请在电脑上查看';
    section.append(img, span);

    document.body.append(section);
}

function setStyle(strings, ...values) {
    let cssText = strings[0];
    for (let i = 0; i < values.length; i++) {
        cssText += values[i];
        cssText += strings[i + 1];
    }

    this.style.cssText += cssText;
}

/**
 * 匀速变化动画
 * @param {number} from 起始值
 * @param {number} to 目标值
 * @param {number} duration 动画时间
 * @param {function(number): void} progressCallback 中间过程的回调函数，该函数接收当前变化的值
 */
function linearAnimation(from, to, duration, progressCallback) {
    const speed = (to - from) / duration;
    const startTime = Date.now();
    progressCallback(from);

    const _run = () => {
        const time = Date.now() - startTime;
        if (time >= duration) {
            progressCallback(to);
            return;
        }

        const changes = speed * time;
        const value = from + changes;
        progressCallback(value);

        requestAnimationFrame(_run);
    };

    requestAnimationFrame(_run);
}

export {
    createViewInComputer,
    debounce,
    linearAnimation,
    queryClientStatus,
    setStyle,
    throttle,
};
