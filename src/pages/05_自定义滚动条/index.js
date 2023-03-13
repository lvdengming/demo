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
  scrollbar.style.top = Math.round(
    (e.scrollTop / wrapper.scrollHeight) * wrapper.clientHeight
  );
}

window.onload = handlePageLoad;
