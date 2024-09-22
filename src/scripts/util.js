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

export {
    createViewInComputer,
    debounce,
    queryClientStatus,
    setStyle,
    throttle,
};
