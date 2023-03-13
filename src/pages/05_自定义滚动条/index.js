// 滚动条上下边距
const verticalSpan = 5;

let wrapper;
let scrollbar;

function handlePageLoad() {
  wrapper = document.querySelector('.x-scroll');
  wrapper.onscroll = handleWrapperScroll;

  scrollbar = document.createElement('div');
  scrollbar.classList.add('x-scrollbar');
  wrapper.append(scrollbar);

  const height = Math.round(
    (wrapper.clientHeight / wrapper.scrollHeight) *
      (wrapper.clientHeight - 2 * verticalSpan)
  );
  scrollbar.style.top = height + verticalSpan + 'px';
}

function handleWrapperScroll() {}

window.onload = handlePageLoad;
