import { ClientStatus } from '../../scripts/constant.js';
import { createViewInComputer, queryClientStatus } from '../../scripts/util.js';

let carouselTimer;
let indicator = 1;
let slideList = Array.from(document.querySelectorAll('.slide-item'));

const slideWrapper = document.querySelector('.slide-wrapper');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

const indicatorList = Array.from(document.querySelectorAll('.indicator-item'));
// 指示器和当前轮播的映射
const indicatorMap = indicatorList.map((item, index) => index);
indicatorMap.unshift(indicatorMap.at(-1));
indicatorMap.push(indicatorMap.at(1));

const carouselInterval = 3000;
const cssVar = {
    slideWidth: '--slide-width',
    slideItems: '--slide-items',
    slideTime: '--slide-transition-time',
};
const transitionTime =
    Number(getCssVar(cssVar.slideTime).replace('s', '')) * 1000;

window.onload = () => {
    // 此案例不在移动端展示
    if (queryClientStatus() === ClientStatus.MOBILE) {
        createViewInComputer();
        return;
    }

    // 添加收尾元素，实现无限轮播
    const cloneFirst = slideList.at(0).cloneNode(true);
    const cloneLast = slideList.at(-1).cloneNode(true);
    slideWrapper.insertBefore(cloneLast, slideList.at(0));
    slideWrapper.appendChild(cloneFirst);
    slideList = Array.from(document.querySelectorAll('.slide-item'));

    // 同步 css
    const slideCount = Number(getCssVar(cssVar.slideItems));
    setCssVar(cssVar.slideItems, slideCount + 2);
    setDisplay(indicator, false);

    carousel();

    arrowLeft.addEventListener('click', () => {
        clearInterval(carouselTimer);
        indicator--;
        setDisplay(indicator);

        if (indicator === 0) {
            indicator = slideList.length - 2;
            setTimeout(() => setDisplay(indicator, false), transitionTime);
        }

        carousel();
    });

    arrowRight.addEventListener('click', () => {
        clearInterval(carouselTimer);
        indicator++;
        setDisplay(indicator);

        if (indicator === slideList.length - 1) {
            indicator = 1;
            setTimeout(() => setDisplay(indicator, false), transitionTime);
        }

        carousel();
    });

    indicatorList.forEach((item, index) => {
        item.addEventListener('click', () => {
            clearInterval(carouselTimer);
            indicator = index + 1;
            setDisplay(indicator);

            carousel();
        });
    });
};

function getCssVar(key) {
    const root = document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(key);

    return value;
}

function setCssVar(key, value) {
    const root = document.documentElement;
    root.style.setProperty(key, value);
}

function setDisplay(index, hasTransition = true) {
    let transitionCache;
    // 改变展示项时，取消过渡，改变之后还原
    if (!hasTransition) {
        transitionCache =
            getComputedStyle(slideWrapper).getPropertyValue('transition');
        slideWrapper.style.setProperty('transition', 'none');
    }

    slideWrapper.style.setProperty(
        'left',
        `calc(-${index} * var(${cssVar.slideWidth}))`
    );

    indicatorList.forEach((item) => item.classList.remove('active'));
    indicatorList[indicatorMap[index]].classList.add('active');

    // 待 left 属性修改完成后再还原
    if (!hasTransition) {
        // 加 10ms 是因为异步任务不是立即调度的
        setTimeout(
            () => slideWrapper.style.setProperty('transition', transitionCache),
            10
        );
    }
}

function carousel() {
    carouselTimer = setInterval(() => {
        indicator++;
        setDisplay(indicator);

        if (indicator === slideList.length - 1) {
            indicator = 1;
            setTimeout(() => setDisplay(indicator, false), transitionTime);
        }
    }, carouselInterval);
}
