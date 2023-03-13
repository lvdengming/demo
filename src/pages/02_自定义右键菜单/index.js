import { ClientStatus, Display } from '../../scripts/constant.js';
import { queryClientStatus, createViewInComputer } from '../../scripts/util.js';

const IMG_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcf++Hv/ZU//OPv/DL/+9Gv/BI/+4Bf+4Ef/XcP/LOP/TSf/RRP/WTv/JM/+3Ef+9Ff/bhf+5BP/DJf+yDv/imv/kqv/bXP/w0v/fd//calQXUgwAAAAKdFJOUwB///8d3L9enl8sr20gAAACN0lEQVRYw+2Y65abIBRGE1EzVbyNSW18/wctHA6XYw4q9Ee7Vt2AgOHbcVyTOMztdnFxcXFMWf7gKHN190VRKDpFC0iNqB5ZvqpXzJRxHoF7hrAa9/hK9j2oYIA2QA/UqXeyNg5QDBrshhHbUH8xxO+uT7sOJ/tU5a4wh0eK8KmKHTxd28Bfo16pqphep5l6I+R/p8xr668kVghVceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1xU+8axwe8NfzkIV7xVZdF0AVhi+rWdxIfgmwloE6CkrDCPwJbYUeFgK61icxFcNKyxIxE+WgnllQ0y4+HffzZ8WZtJlCDtz+CzqaaFaVGiWBNEOZZ15zihsT2CFnXk4QStsLohTU3FC+Af8I8JWV1fa1jy8u+hnOUy2vnd5SkeGrJBfHZwDbxe87pfxQvejmMZZYxxdYSoyVyixSvtXFLJ7hWq5xCRNSTozczzHCj8T54kI5d8QCtvZAodDIa7DgRkJaII2hBfaJC7EOE7D076XuIoVBu8oN3kpBLVt4YXBVaUSFSbS5Akb00znSoPn9KCJCN0am7SnGhganC4kKhR2MV0vvEn4M7bFhM3GIZqtgfiPr9BdSAYnrnCX3rQeB/2xsKcHouiBBhpO+phQL9CdjmKqsRkXpkMz57dmfTY1v3k8is26zvN2A6yIbKVqm/tMjFBMp5jpxrWKbsB1dJw/AsC3Lt/YEaK7x1t5r7aLj3ned/fRj1TK3H9wXFxc/F/8BgM0jBZ4nc19AAAAAElFTkSuQmCC';

const contextMenu = new Proxy(
  {},
  {
    set(target, property, value) {
      const menu = document.getElementById('context-menu');
      if (property === 'display' && value) {
        menu.style.display = Display.BLOCK;
        menu.style.top = value.y + 'px';
        menu.style.left = value.x + 'px';
      } else if (property === 'display') {
        menu.style.display = Display.NONE;
      }

      target[property] = value;
      return true;
    },
  }
);

function handlePageLoad() {
  if (queryClientStatus() === ClientStatus.MOBILE) {
    createViewInComputer();
    return;
  }

  initTableRow();
  initContextMenu();
}

function handlePageClick() {
  contextMenu.display = false;
}

function handleTableRowContextMenu(event) {
  event.preventDefault();

  let target = event.target;
  while (target.tagName !== 'TR') {
    target = target.parentNode;
  }

  contextMenu.display = {
    x: event.clientX,
    y: event.clientY,
    target,
  };
}

function handleMenuItemClick(event) {
  // target 可能是 span，也可能是 div
  let target = event.target;
  // 找到 menu-item
  while (target.tagName !== 'DIV') {
    target = target.parentNode;
  }

  const directory = contextMenu.display.target;
  const directoryName = directory.querySelector('span').innerText;
  const operation = target.querySelector('span').innerText;
  const description = `action: ${operation}${directoryName}`;

  console.log(description);
}

// 设置图片路径 & 添加表格数据行右键事件
function initTableRow() {
  const tableRows = document.querySelectorAll('.table-row');
  const imgs = document.querySelectorAll('.table-row img');

  for (const img of imgs) {
    img.setAttribute('src', IMG_SRC);
  }

  for (const row of tableRows) {
    row.oncontextmenu = handleTableRowContextMenu;
  }
}

// 右键菜单项添加点击事件
function initContextMenu() {
  const menuItems = document.querySelectorAll('#context-menu .menu-item');
  for (const menuItem of menuItems) {
    menuItem.onclick = handleMenuItemClick;
  }
}

window.onload = handlePageLoad;
window.onclick = handlePageClick;
