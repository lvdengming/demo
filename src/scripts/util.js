import { ClientStatus } from './constant.js';

function queryClientStatus() {
  const mobileRegExp = /Mobi|Android|iPhone/i;
  const userAgent = navigator.userAgent;
  return mobileRegExp.test(userAgent)
    ? ClientStatus.MOBILE
    : ClientStatus.NO_MOBILE;
}

export { queryClientStatus };
