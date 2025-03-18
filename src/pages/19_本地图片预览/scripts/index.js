/**
 * author: lvdengming@foxmail.com
 * date: 2025-02-17
 */

import {
    ACCESS_DIRECTORY_ID,
    CLEAR_IMGS_ID,
    EntryKind,
    IMG_ITEM_CLASS_NAME,
    IMG_REGEXP,
    IMG_WRAPPER_CLASS_NAME,
} from './constant.js';

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

                const imgItem = document.createElement('div');
                imgItem.className = IMG_ITEM_CLASS_NAME;
                imgItem.title = `${uri}/${file.name}`;
                imgItem.append(img);
                imgItem.append(p);

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

const accessDirectoryBtn = document.getElementById(ACCESS_DIRECTORY_ID);
accessDirectoryBtn.addEventListener('click', AccessLocalDirectory);

const clearImgsBtn = document.getElementById(CLEAR_IMGS_ID);
clearImgsBtn.addEventListener('click', clearImgs);
