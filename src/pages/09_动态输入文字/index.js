const welcomes = ['欢迎来到本页面', '祝您身体健康，万事如意！'];
const timeSpan = 300;
let index = 0;
let isWrite = true;
let end = 0;

function handlePageLoad() {
    const h1El = document.querySelector('h1');

    setInterval(() => {
        if (isWrite) {
            h1El.innerText = welcomes[index].slice(0, end++);
            if (end > welcomes[index].length) {
                isWrite = false;
            }
        } else {
            h1El.innerText = welcomes[index].slice(0, end--);
            if (end < 0) {
                isWrite = true;
                end = 0;

                index++;
                if (index >= welcomes.length) {
                    index = 0;
                }
            }
        }
    }, timeSpan);
}

window.onload = handlePageLoad;
