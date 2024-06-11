import { ClientStatus } from '../../scripts/constant.js';
import { createViewInComputer, queryClientStatus } from '../../scripts/util.js';

window.onload = () => {
    // 此案例不在移动端展示
    if (queryClientStatus() === ClientStatus.MOBILE) {
        createViewInComputer();
        return;
    }

    const slideList = document.querySelectorAll('.slide-item');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const indicatorList = document.querySelectorAll('.indicator-item');

    console.log(slideList, arrowLeft, arrowRight, indicatorList);
};
