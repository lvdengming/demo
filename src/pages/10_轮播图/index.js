import { ClientStatus } from '../../scripts/constant.js';
import { createViewInComputer, queryClientStatus } from '../../scripts/util.js';

window.onload = () => {
    // 此案例不在移动端展示
    if (queryClientStatus() === ClientStatus.MOBILE) {
        createViewInComputer();
        return;
    }
};
