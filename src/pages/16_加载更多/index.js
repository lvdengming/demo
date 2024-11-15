/**
 * author: lvdengming@foxmail.com
 * date: 2024-11-15
 */

const selector = {
    APP: '#app',
    CARD_LIST: '.card-list',
    CARD: '.card',
    LOADING_WRAPPER: '.loading-wrapper',
};

const BATCH_COUNT = 10;
const LOADING_TIME = 2000;

function loadMoreCards() {
    const cardList = document.querySelector(selector.CARD_LIST);
    const count = document.querySelectorAll(selector.CARD).length;

    const fragment = new DocumentFragment();
    for (let i = 1; i <= BATCH_COUNT; i++) {
        const card = document.createElement('div');
        card.classList.add(selector.CARD.slice(1));
        card.innerHTML = `${i + count}`;

        fragment.append(card);
    }

    cardList.append(fragment);
}

const observer = new IntersectionObserver(
    (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
            setTimeout(loadMoreCards, LOADING_TIME);
        }
    },
    {
        root: document.querySelector(selector.APP),
        // 28px + 16px = 44px，若不考虑 threshold 影响，则永远不会触发
        // rootMargin: '-45px',
        threshold: 0.5,
    }
);

const loadingWrapper = document.querySelector(selector.LOADING_WRAPPER);
observer.observe(loadingWrapper);
