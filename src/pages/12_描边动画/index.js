import { ClientStatus } from '../../scripts/constant.js';
import { createViewInComputer, queryClientStatus } from '../../scripts/util.js';

function handlePageLoad() {
    // 此案例不在移动端展示
    if (queryClientStatus() === ClientStatus.MOBILE) {
        createViewInComputer();
        return;
    }
}

window.addEventListener('load', handlePageLoad);

const prefix = '--path-length-';
const pathList = document.querySelectorAll('#hello path');

pathList.forEach((path, index) => {
    const length = path.getTotalLength();
    const key = prefix + (index + 1);
    path.style.setProperty(key, length);
});
