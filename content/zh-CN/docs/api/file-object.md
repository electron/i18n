# `File` 对象

> 在文件系统中，使用HTML5 `File` 原生API操作文件

DOM 文件接口为原生文件提供了抽象, 以便让用户使用 HTML5 文件 API 直接处理原生文件。 Electron已经向 ` 文件 ` 接口添加了一个 ` path ` 属性, 在文件系统上暴露出文件的真实路径

示例：获取拖拽到app上的文件的真实路径

```html
<div id="holder">
  Drag your file here
</div>

<script>
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  });
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
```