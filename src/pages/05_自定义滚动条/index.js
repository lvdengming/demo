let wrapper;
let scrollbar;

function handlePageLoad() {
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
  const top = Math.round(
    (e.target.scrollTop / wrapper.scrollHeight) * wrapper.clientHeight +
      e.target.scrollTop
  );
  scrollbar.style.top = top + 'px';
}

window.onload = handlePageLoad;
