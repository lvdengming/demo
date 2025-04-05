import { ClientStatus } from './constant.js';
import { routes } from './router.js';
import { queryClientStatus } from './util.js';

const DEMO_CONTAINER_SELECTOR = 'aside .content';
const DEMO_ITEM_CLASS = 'demo-item';
const ACTIVE_CLASS = 'active';
const PATH_ATTRIBUTE = 'to';
const LOADING_ID = 'loading';
const IFRAME_ID = 'demo-view';
const NOT_COMPLETE_ID = 'not-complete';
const HASH_PREFIX = '#/';
const GIT_LINK = 'https://github.com/lvdengming/demo/tree/master/';

const demoItems = [];
const iframe = new Proxy(
    {},
    {
        set(target, property, newValue, receiver) {
            if (property === 'src') {
                receiver.loading = true;
                iframeElement.setAttribute('src', newValue);

                const link = GIT_LINK + newValue;
                sourceLink.setAttribute('href', link);
            } else if (property === 'loading') {
                const loading = document.getElementById(LOADING_ID);
                if (newValue) {
                    loading.classList.add(ACTIVE_CLASS);
                } else {
                    loading.classList.remove(ACTIVE_CLASS);
                }
            }

            target[property] = newValue;
            return true;
        },
    }
);

let prevItem;
let iframeElement;
let sourceLink;

function handlePageLoad() {
    for (const route of routes) {
        const item = document.createElement('div');
        item.classList.add(DEMO_ITEM_CLASS);
        item.setAttribute(PATH_ATTRIBUTE, route.path);
        item.innerText = route.title;
        item.addEventListener('click', handleItemClick);
        demoItems.push(item);
    }

    const demoContainer = document.querySelector(DEMO_CONTAINER_SELECTOR);
    demoContainer.append(...demoItems);
    iframeElement = document.getElementById(IFRAME_ID);
    iframeElement.onload = handleIFrameLoad;
    sourceLink = document.querySelector('.view-source-code > a');

    handleHashChange();
    addMessageEventListener();
    addMobileTouchHandler();
}

function handleHashChange() {
    let path = location.hash.slice(HASH_PREFIX.length);
    const strs = path.split('?');
    path = strs[0];
    const query = strs[1];

    let index = routes.findIndex((route) => route.path === path);
    path = index > -1 ? path : routes[0].path;
    index = index > -1 ? index : 0;

    if (query) {
        location.hash = `${HASH_PREFIX}${path}?${query}`;
        iframe.src = `${routes[index].src}/index.html?${query}`;
    } else {
        location.hash = HASH_PREFIX + path;
        iframe.src = routes[index].src;
    }

    if (prevItem) {
        prevItem.classList.remove(ACTIVE_CLASS);
    }
    prevItem = demoItems[index];
    prevItem.classList.add(ACTIVE_CLASS);

    updatePageState(routes[index]);
}

function handleIFrameLoad() {
    iframe.loading = false;
}

function handleItemClick(event) {
    const currItem = event.target;
    if (currItem === prevItem) return;

    prevItem.classList.remove(ACTIVE_CLASS);
    currItem.classList.add(ACTIVE_CLASS);

    const currPath = currItem.getAttribute(PATH_ATTRIBUTE);
    const currRoute = routes.find((route) => route.path === currPath);
    location.hash = HASH_PREFIX + currPath;
    iframe.src = currRoute.src;

    updatePageState(currRoute);
    prevItem = currItem;
}

function updatePageState(route) {
    const notCompleteEl = document.getElementById(NOT_COMPLETE_ID);
    notCompleteEl.style.display = route.isNotComplete ? 'grid' : 'none';
}

function addMessageEventListener() {
    window.addEventListener('message', (event) => {
        if (event.origin !== location.origin) {
            return;
        }

        if (event.data.closeLoading) {
            iframe.loading = false;
        }
    });
}

/**
 * 优化移动端侧边栏交互
 */
function addMobileTouchHandler() {
    if (queryClientStatus === ClientStatus.NO_MOBILE) {
        return;
    }

    const aside = document.querySelector('aside');
    const arrow = document.querySelector('aside .right-button');
    arrow.addEventListener('touchend', () => {
        const left = window.getComputedStyle(aside).left;
        aside.style.left =
            left === '0px' ? 'calc(0px - var(--aside-width))' : '0px';
    });
}

window.onload = handlePageLoad;
window.onhashchange = handleHashChange;
