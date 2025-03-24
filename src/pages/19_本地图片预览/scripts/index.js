/**
 * author: lvdengming@foxmail.com
 * date: 2025-02-17
 */

import {
    ACCESS_DIRECTORY_ID,
    CLEAR_IMGS_ID,
    COPIED_ICON_CLASS_NAME,
    COPIED_THROTTLE_TIME,
    COPY_ICON_CLASS_NAME,
    CUSTOM_PATH_ID,
    CUSTOM_PATH_STORAGE_KEY,
    CustomPathTag,
    EntryKind,
    FILTER_IMGS_ID,
    IMG_ITEM_CLASS_NAME,
    IMG_REGEXP,
    IMG_WRAPPER_CLASS_NAME,
} from './constant.js';

// 筛选图片
const filterImgs = document.getElementById(FILTER_IMGS_ID);
filterImgs.addEventListener('input', () => {
    const keywords = filterImgs.value.trim();
    const imgItems = document.querySelectorAll('.' + IMG_ITEM_CLASS_NAME);

    for (const item of imgItems) {
        const uri = item.dataset.uri;
        const isMatch = uri.includes(keywords);
        item.style.display = isMatch ? 'block' : 'none';
    }
});

// 自定义复制内容
const customPath = document.getElementById(CUSTOM_PATH_ID);
const rule =
    localStorage.getItem(CUSTOM_PATH_STORAGE_KEY) ??
    `${CustomPathTag.DIRECTORY}/${CustomPathTag.FILENAME}`;
customPath.value = rule;

/** 通过 File System Access API 打开本地文件夹 */
async function AccessLocalDirectory() {
    // 递归遍历文件夹，获取文件夹下的所有图片文件
    const traverse = async (handle, uri) => {
        for await (const entry of handle.values()) {
            if (entry.kind === EntryKind.DIRECTORY) {
                await traverse(entry, `${uri}/${entry.name}`);
            } else {
                const file = await entry.getFile();
                // 若文件不是图片文件，则跳过
                if (!IMG_REGEXP.test(file.name)) {
                    continue;
                }

                const objectUrl = URL.createObjectURL(file);

                const img = new Image();
                img.src = objectUrl;
                img.alt = file.name;
                img.onload = () => {
                    // 加载完成后释放资源
                    URL.revokeObjectURL(objectUrl);
                };

                const p = document.createElement('p');
                p.textContent = file.name;
                p.title = `${uri}/${file.name}`;

                const copyIcon = initCopyIcon(uri, entry.name);

                const imgItem = document.createElement('div');
                imgItem.className = IMG_ITEM_CLASS_NAME;
                imgItem.setAttribute('data-uri', p.title);
                imgItem.append(img);
                imgItem.append(p);
                imgItem.append(copyIcon);

                const imgWrapper = document.querySelector(
                    '.' + IMG_WRAPPER_CLASS_NAME
                );
                imgWrapper.append(imgItem);
            }
        }
    };

    try {
        const handle = await window.showDirectoryPicker();
        await traverse(handle, handle.name);
    } catch (error) {
        console.error(error);
    }
}

/** 清空展示的图片 */
function clearImgs() {
    const imgWrapper = document.querySelector('.' + IMG_WRAPPER_CLASS_NAME);
    imgWrapper.innerHTML = '';
}

function initCopyIcon(path, filename) {
    let copied = false;
    const copyIcon = document.createElement('i');
    copyIcon.className = COPY_ICON_CLASS_NAME;
    copyIcon.title = 'Copy Path';

    copyIcon.addEventListener('click', async () => {
        if (copied) {
            return;
        }

        const text = getCopyText(path, filename);
        await copyToClipboard(text);
        copied = true;
        copyIcon.classList.add(COPIED_ICON_CLASS_NAME);

        setTimeout(() => {
            copied = false;
            copyIcon.classList.remove(COPIED_ICON_CLASS_NAME);
        }, COPIED_THROTTLE_TIME);
    });

    return copyIcon;
}

/** 获取要复制到剪切板的内容 */
function getCopyText(path, filename) {
    const customPath = document.getElementById(CUSTOM_PATH_ID);

    let rule = customPath.value.trim();
    rule = rule ? rule : `${CustomPathTag.DIRECTORY}/${CustomPathTag.FILENAME}`;
    localStorage.setItem(CUSTOM_PATH_STORAGE_KEY, rule);

    return rule
        .replaceAll(CustomPathTag.DIRECTORY, path)
        .replaceAll(CustomPathTag.FILENAME, filename);
}

/**
 * 复制文本到剪贴板
 * @param {string} text 要复制的文本内容
 * @return {Promise<boolean>} 返回 Promise 表示操作结果
 */
function copyToClipboard(text) {
    // 处理非字符串类型
    const content = String(text);

    return new Promise((resolve, reject) => {
        // 优先使用现代 Clipboard API
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(content)
                .then(() => resolve(true))
                .catch((err) => {
                    // 现代 API 失败时降级方案
                    execCommandCopy(content) ? resolve(true) : reject(err);
                });
        } else {
            // 降级方案
            execCommandCopy(content)
                ? resolve(true)
                : reject(new Error('复制失败'));
        }
    });
}

/** 传统浏览器复制方案 */
function execCommandCopy(text) {
    try {
        // 创建临时文本域
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.all = 'unset'; // 清除样式
        textarea.style.position = 'fixed'; // 防止滚动
        textarea.style.left = '-9999px'; // 移出屏幕
        textarea.style.top = '0';
        textarea.setAttribute('readonly', ''); // 防止键盘弹出 (iOS)

        document.body.appendChild(textarea);

        // 保存原有选区
        const originalSelection = document.getSelection();
        const selected =
            originalSelection.rangeCount > 0
                ? originalSelection.getRangeAt(0)
                : false;

        // 执行复制操作
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length); // 移动端兼容

        const success = document.execCommand('copy');
        document.body.removeChild(textarea);

        // 恢复原有选区
        if (selected) {
            originalSelection.removeAllRanges();
            originalSelection.addRange(selected);
        }

        return success;
    } catch (err) {
        console.error('复制操作失败:', err);
        return false;
    }
}

const accessDirectoryBtn = document.getElementById(ACCESS_DIRECTORY_ID);
accessDirectoryBtn.addEventListener('click', AccessLocalDirectory);

const clearImgsBtn = document.getElementById(CLEAR_IMGS_ID);
clearImgsBtn.addEventListener('click', clearImgs);
