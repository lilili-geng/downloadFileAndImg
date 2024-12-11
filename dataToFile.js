/**
 * 判断是否文件，是的话下载，不是预览
 * Ligenghong
 * @param {*} file
 */
export function dataToFile(file) {
  const { name, raw } = file;
  const { type } = raw;

  // 判断是否为图片类型
  if (isImage(type)) {
    previewImage(raw, type);
  } else {
    downloadFile(raw, type, name);
  }
}

/**
 * 判断是否为图片类型
 * @param {string} type - 文件类型
 * @returns {boolean}
 */
function isImage(type) {
  return ["image/jpeg", "image/png", "image/jpg"].includes(type);
}

/**
 * 预览图片
 * @param {Blob} raw - 图片数据
 * @param {string} type - 图片类型
 */
function previewImage(raw, type) {
  const url = createObjectURL(raw, type);
  const imageBox = createImageBox(url);

  document.body.appendChild(imageBox);

  imageBox.addEventListener("click", () => {
    remoImage(imageBox);
  });
}

/**
 * 创建图片预览框
 * @param {string} url - 图片 URL
 * @returns {HTMLElement} imageBox
 */
function createImageBox(url) {
  const Box = document.createElement("div");
  const images = document.createElement("img");

  images.width = 800;
  images.src = url;
  images.style.transform = "translate(50%,10%)";

  Box.id = "imageBox";
  Box.style = `
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 24%;
    transform: translate(-24%, -50%);
    z-index: 9999999;
    background: rgba(0, 0, 0, 0.5);
  `;

  Box.appendChild(images);
  return Box;
}

/**
 * 生成 Blob URL
 * @param {Blob} raw - 文件 Blob 数据
 * @param {string} type - 文件类型
 * @returns {string} URL
 */
function createObjectURL(raw, type) {
  return window.URL.createObjectURL(new Blob([raw], { type }));
}

/**
 * 下载文件
 * @param {Blob} raw - 文件数据
 * @param {string} type - 文件类型
 * @param {string} name - 文件名
 */
function downloadFile(raw, type, name) {
  // IE浏览器支持
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(new Blob([raw]), name);
  } else {
    // 非IE浏览器
    const url = createObjectURL(raw, type);
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.setAttribute("download", name);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    window.URL.revokeObjectURL(url); // 释放内存
  }
}

/**
 * 移除图片预览框
 * @param {HTMLElement} imageBox
 */
function remoImage(imageBox) {
  imageBox.remove();
}
