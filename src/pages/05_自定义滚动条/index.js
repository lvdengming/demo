import { ClientStatus } from '../../scripts/constant.js';
import {
    debounce,
    queryClientStatus,
    createViewInComputer,
} from '../../scripts/util.js';

let wrapper;
let scrollbar;
const hideScrollbar = debounce(() => (scrollbar.style.opacity = 0), 300);

function handlePageLoad() {
    if (queryClientStatus() === ClientStatus.MOBILE) {
        createViewInComputer();
        return;
    }

    wrapper = document.querySelector('.x-scroll');
    wrapper.onscroll = handleWrapperScroll;

    scrollbar = document.createElement('div');
    scrollbar.classList.add('x-scrollbar');
    wrapper.append(scrollbar);

    const height = Math.round(
        (wrapper.clientHeight / wrapper.scrollHeight) * wrapper.clientHeight
    );
    scrollbar.style.height = height + 'px';
}

function handleWrapperScroll(e) {
    scrollbar.style.opacity = 1;

    const top = Math.round(
        (e.target.scrollTop / wrapper.scrollHeight) * wrapper.clientHeight +
            e.target.scrollTop
    );
    scrollbar.style.top = top + 'px';

    hideScrollbar();
}

window.onload = handlePageLoad;
