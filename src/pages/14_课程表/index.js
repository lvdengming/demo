/**
 * author: lvdengming@foxmail.com
 * date: 2024-09-21
 */

import { ClientStatus } from '../../scripts/constant.js';
import { createViewInComputer, queryClientStatus } from '../../scripts/util.js';

if (queryClientStatus() === ClientStatus.MOBILE) {
    createViewInComputer();
}

const DRAGGING_OVER_CLASS_NAME = 'dragging-over';
const container = document.querySelector('#app main');
let draggedNode;

container.addEventListener('dragstart', (e) => {
    draggedNode = e.target;
    // 设置鼠标样式
    e.dataTransfer.effectAllowed = draggedNode.dataset.effect;
});

container.addEventListener('dragover', (e) => {
    e.preventDefault();
});

container.addEventListener('dragenter', (e) => {
    clearDragenterStyle();
    const target = getDropNode(e.target);
    if (target && target.dataset.drop === e.dataTransfer.effectAllowed) {
        target.classList.add(DRAGGING_OVER_CLASS_NAME);
    }
});

container.addEventListener('drop', (e) => {
    clearDragenterStyle();
    const target = getDropNode(e.target);
    // 非可 drop 的目标节点
    if (!target || target.dataset.drop !== e.dataTransfer.effectAllowed) {
        return;
    }

    if (target.dataset.drop === 'copy') {
        target.innerHTML = '';
        const cloned = draggedNode.cloneNode(true);
        cloned.dataset.effect = 'move';
        target.appendChild(cloned);
    } else {
        draggedNode.remove();
    }
});

/**
 * 清除 dragenter 样式
 */
function clearDragenterStyle() {
    document.querySelectorAll('.' + DRAGGING_OVER_CLASS_NAME).forEach((el) => {
        el.classList.remove(DRAGGING_OVER_CLASS_NAME);
    });
}

/**
 * 找到可 drop 的元素
 * @param {HTMLElement} node 当前目标元素
 */
function getDropNode(node) {
    while (node) {
        if (node.dataset && node.dataset.drop) {
            return node;
        }

        node = node.parentNode;
    }
}
