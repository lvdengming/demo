import { queryClientStatus } from "../../scripts/tools.js";
import { ClientStatus, Display } from "../../scripts/constant.js";

function handlePageLoad() {
  initDisplayView();
}

function initDisplayView() {
  const clientStatus = queryClientStatus();
  if (clientStatus === ClientStatus.MOBILE) {
    const mobileInfo = document.getElementById('mobile-info');
    const content = document.getElementById('content');
    mobileInfo.style.display = Display.BLOCK;
    content.style.display = Display.NONE;
  }
}

window.onload = handlePageLoad();
