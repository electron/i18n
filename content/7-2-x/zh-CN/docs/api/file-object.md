# `File` 对象

> 在文件系统中，使用HTML5 `File` 原生API操作文件

DOM的文件接口提供了关于原生文件的抽象，以便用户可以直接使用HTML5文件API处理原生文件。 Electron已经向 ` 文件 ` 接口添加了一个 ` path ` 属性, 在文件系统上暴露出文件的真实路径

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
