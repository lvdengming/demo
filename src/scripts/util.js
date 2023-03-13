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
  section.innerText = '请在电脑上查看';
  section.style = `
    display: grid;
    place-items: center;
    position: fixed;
    inset: 0;
    background-color: #fff;
    font-size: 20px;
    color: #303133;
  `;

  document.body.append(section);
}

export { queryClientStatus, debounce, throttle, createViewInComputer };
