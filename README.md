# 下载文件和图片

## 概述

该功能用于判断用户选择的文件是否为图片文件。如果是图片文件，则进行预览；如果不是图片文件，则提供下载功能。

## 功能

- **下载**：如果选择的文件不是图片文件，提供下载按钮，用户可以点击按钮下载文件。
- **预览**：如果选择的文件是图片文件，页面将显示该图片的预览。

## 使用

该功能可以集成到你的 Vue.js 项目中，提供文件选择、预览和下载的操作。

## Vue.js 实现

### 文件选择与处理

1. **文件选择**：通过 `<input type="file">` 标签允许用户选择文件，并通过 `@change` 事件触发文件处理逻辑。
   
2. **文件类型判断**：
    - 使用 `file.type.startsWith('image/')` 判断文件是否为图片文件。
    - 如果是图片，执行图片预览；否则，显示下载按钮。

### 预览图片

1. **图片预览逻辑**：
    - 使用 `FileReader` 将图片文件读取为 Data URL。
    - 将 Data URL 设置为 `<img>` 标签的 `src`，从而显示图片预览。

### 下载文件

1. **非图片文件的下载**：
    - 使用 `URL.createObjectURL(file)` 创建临时 URL。
    - 创建一个 `<a>` 标签并设置 `href` 为该 URL，点击链接触发下载。

### 代码示例

```vue
<template>
  <div>
    <h1>下载文件和图片</h1>
    
    <label for="file-input">选择文件：</label>
    <input type="file" id="file-input" @change="handleFileSelect" />
    
    <!-- 图片预览 -->
    <div v-if="isImage" class="preview-container">
      <h2>文件预览：</h2>
      <img :src="imagePreview" alt="预览图片" />
    </div>

    <!-- 下载按钮 -->
    <button v-if="!isImage" @click="downloadFile">下载文件</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,            // 存储选择的文件
      isImage: false,        // 标记文件是否为图片
      imagePreview: '',      // 图片预览的Data URL
    };
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];  // 获取选择的文件
      if (file) {
        this.file = file;

        // 判断是否为图片文件
        if (file.type.startsWith('image/')) {
          this.isImage = true;
          this.previewImage(file);  // 图片预览
        } else {
          this.isImage = false;
        }
      }
    },

    previewImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;  // 设置图片预览的Data URL
      };
      reader.readAsDataURL(file);  // 读取文件为Data URL
    },

    downloadFile() {
      // 创建临时下载链接
      const url = URL.createObjectURL(this.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.file.name;  // 设置下载文件的名称
      a.click();  // 触发下载
      URL.revokeObjectURL(url);  // 释放临时URL
    }
  }
};
</script>

<style scoped>
.preview-container {
  margin-top: 20px;
}
img {
  max-width: 100%;
  height: auto;
}
button {
  margin-top: 20px;
}
</style>
