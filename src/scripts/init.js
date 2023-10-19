import { routes } from './router.js';

const DEMO_CONTAINER_SELECTOR = 'aside .content';
const DEMO_ITEM_CLASS = 'demo-item';
const ACTIVE_CLASS = 'active';
const PATH_ATTRIBUTE = 'to';
const LOADING_ID = 'loading';
const IFRAME_ID = 'demo-view';
const NOT_COMPLETE_ID = 'not-complete';
const HASH_PREFFIX = '#/';

const demoItems = [];
const iframe = new Proxy(
    {},
    {
        set(target, property, newValue, receiver) {
            if (property === 'src') {
                receiver.loading = true;
                iframeElement.setAttribute('src', newValue);
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

    handleHashChange();
}

function handleHashChange() {
    let path = location.hash.slice(HASH_PREFFIX.length);
    let index = routes.findIndex((route) => route.path === path);

    path = index > -1 ? path : routes[0].path;
    index = index > -1 ? index : 0;

    location.hash = HASH_PREFFIX + path;
    iframe.src = routes[index].src;

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
    location.hash = HASH_PREFFIX + currPath;
    iframe.src = currRoute.src;

    updatePageState(currRoute);
    prevItem = currItem;
}

function updatePageState(route) {
    const notCompleteEl = document.getElementById(NOT_COMPLETE_ID);
    notCompleteEl.style.display = route.isNotComplete ? 'grid' : 'none';
}

window.onload = handlePageLoad;
window.onhashchange = handleHashChange;
