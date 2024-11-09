import { ClientStatus } from '../../common/constant.js';
import { createViewInComputer, queryClientStatus } from '../../common/util.js';

const teams = [];
const selectedTeams = [];
const memebers = [];
let index = 0;
let timer = null;
let h1El;

function handlePageLoad() {
    // 此案例不在移动端展示
    if (queryClientStatus() === ClientStatus.MOBILE) {
        createViewInComputer();
        return;
    }

    const importInput = document.getElementById('import-excel');
    importInput.addEventListener('change', handleInputChange, false);

    const startButton = document.querySelector('.buttons .start');
    startButton.addEventListener('click', startLottery);
    const stopButton = document.querySelector('.buttons .stop');
    stopButton.addEventListener('click', stopLottery);

    h1El = document.querySelector('.lottery h1');
}

function handleInputChange(e) {
    const excel = e.target.files[0];
    const fileNameEl = document.querySelector('.file-name');
    fileNameEl.textContent = excel.name;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = e.target.result;
        /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */
        /* eslint-disable no-undef */
        const workbook = XLSX.read(data);
        /* eslint-enable no-undef */
        const [sheetName] = workbook.SheetNames;
        extractSheet(workbook.Sheets[sheetName]);
    };
    reader.readAsArrayBuffer(excel);
}

function extractSheet(sheet) {
    // 每次导入数据时，状态重置
    teams.length = 0;
    selectedTeams.length = 0;
    memebers.length = 0;

    const [colA, colB, colC] = ['A', 'B', 'C'];
    let rowCount = 2;
    /* eslint-disable no-prototype-builtins */
    while (sheet.hasOwnProperty(colA + rowCount)) {
        /* eslint-enable no-prototype-builtins */
        const team = [
            sheet[colA + rowCount].v,
            sheet[colB + rowCount].v,
            sheet[colC + rowCount].v,
        ];
        teams.push(team);
        memebers.push(...team);

        rowCount++;
    }

    render();
}

function render() {
    const teamsEl = document.querySelector('.teams');
    teamsEl.innerHTML = '';
    for (const team of teams) {
        const teamEl = document.createElement('div');
        teamEl.classList.add('team-item');
        teamEl.append(...createTeamChilds(team));

        teamsEl.append(teamEl);
    }

    const selectedTeamsEl = document.querySelector('.selected-teams');
    selectedTeamsEl.innerHTML = '';
    for (const team of selectedTeams) {
        const teamEl = document.createElement('div');
        teamEl.classList.add('team-item');
        teamEl.append(...createTeamChilds(team));

        selectedTeamsEl.append(teamEl);
    }
}

function createTeamChilds(team) {
    const els = [];
    for (const memeber of team) {
        const spanEl = document.createElement('span');
        spanEl.innerText = memeber;
        els.push(spanEl);
    }
    return els;
}

function startLottery() {
    if (!teams.length) {
        const message = selectedTeams.length ? '抽签已结束' : '请导入数据';
        window.alert(message);
        return;
    }

    if (timer) {
        window.clearInterval(timer);
    }

    timer = window.setInterval(() => {
        index = createRandomIndex();
        h1El.innerText = memebers[index];
    }, 50);
}

function stopLottery() {
    if (!teams.length) {
        const message = selectedTeams.length ? '抽签已结束' : '请导入数据';
        window.alert(message);
        return;
    }

    window.clearInterval(timer);
    const memeber = memebers[index];
    const teamIndex = teams.findIndex((item) => item.includes(memeber));

    const team = teams[teamIndex];
    teams.splice(teamIndex, 1);
    selectedTeams.push(team);

    team.map((item) => {
        const idx = memebers.findIndex((memeber) => memeber === item);
        memebers.splice(idx, 1);
    });

    const orderEl = document.querySelector('.order');
    if (!orderEl.innerText) {
        orderEl.innerText = `抽签顺序：${memeber}`;
    } else {
        orderEl.innerText += ` -> ${memeber}`;
    }

    render();
}

function createRandomIndex() {
    let start = 0;
    let end = memebers.length - 1;
    return Math.round(Math.random() * (end - start) + start);
}

window.onload = handlePageLoad;
