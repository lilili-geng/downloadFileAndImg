/**
 * 判断是否文件，是的话下载，不是预览
 * Ligenghong
 * @param {*} params
 */
export function dataToFile(file) {
  const { name, raw } = file;
  const { type } = raw;
  //  判断类型
  if (type == "image/jpeg" || type == "image/png" || type == "image/jpg") {
    // 非IE 浏览器
    const url = window.URL.createObjectURL(new Blob([raw], { type }));
    const images = document.createElement("img");
    const Box = document.createElement("div");
    document.body.appendChild(Box);
    Box.id = "imageBox";
    var imageBox = document.getElementById("imageBox");
    images.width = "800";
    images.src = url;
    imageBox.appendChild(images);
    imageBox.setAttribute(
      "style",
      `width: 100%;
      height: 100%;
      position: fixed;
      top: 50%;
      left: 24%;
      transform: translate(-24%,-50%);
      z-index: 9999999;
      background: rgba(0,0,0,0.5);`
    );
    imageBox.addEventListener("click", function () {
      remoImage();
    });
    images.style = "transform: translate(50%,10%)";
    document.body.appendChild(imageBox);
  } else {
    // 兼容 IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(new Blob([raw]), name);
    } else {
      // 非IE 浏览器
      const url = window.URL.createObjectURL(new Blob([raw], { type }));
      console.log(url);
      const download = document.createElement("a");
      download.href = url;
      download.setAttribute("download", `${name}`);
      document.body.appendChild(download);
      download.click();
      window.URL.revokeObjectURL(url); // 释放内存
    }
  }
}
function remoImage() {
  var first = document.getElementById("imageBox");
  first.remove();
}
