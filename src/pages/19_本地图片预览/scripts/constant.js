/**
 * author: lvdengming@foxmail.com
 * date: 2025-03-16
 */

/** 打开本地文件夹按钮 id */
export const ACCESS_DIRECTORY_ID = 'access-directory';

/** 清空图片按钮 id */
export const CLEAR_IMGS_ID = 'clear-imgs';

/** 过滤图片输入框 id */
export const FILTER_IMGS_ID = 'filter-imgs';

/** 自定义路径输入框 id */
export const CUSTOM_PATH_ID = 'custom-path';

/** 自定义路径 tag */
export const CustomPathTag = {
    /** 目录路径 */
    DIRECTORY: 'directory',
    /** 文件名 */
    FILENAME: 'filename',
};

// 自动给 tag 添加标识 ${}
for (const key in CustomPathTag) {
    CustomPathTag[key] = '${' + CustomPathTag[key] + '}';
}

/** 自定义路径模板本地存储 key */
export const CUSTOM_PATH_STORAGE_KEY = 'custom-path';

/** 图片容器 className */
export const IMG_WRAPPER_CLASS_NAME = 'img-wrapper';

/** 图片项 className */
export const IMG_ITEM_CLASS_NAME = 'img-item';

/** 复制图标 className */
export const COPY_ICON_CLASS_NAME = 'copy-icon';

/** 已复制图标 className */
export const COPIED_ICON_CLASS_NAME = 'copied';

/** 单项复制操作节流时间（ms） */
export const COPIED_THROTTLE_TIME = 3000;

/** 图片校验正则 */
export const IMG_REGEXP = /\.(jpe?g|png|gif|bmp|webp|svg|tiff?|heic)$/i;

/** 文件系统入口类型 */
export const EntryKind = {
    FILE: 'file',
    DIRECTORY: 'directory',
};
