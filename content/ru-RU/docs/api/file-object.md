# Объект `File`

> Использует `File` из HTML5 API для найтивной работы с файлами в файловой системе.

Файловый интерфейс DOM предоставляет абстракции над файловой системой, чтобы позволить пользователям работать с ней с помощью файлового API HTML5. Electron has added a `path` attribute to the `File` interface which exposes the file's real path on filesystem.

Example of getting a real path from a dragged-onto-the-app file:

```html
<div id="holder">
  Drag your file here
</div>

<script>
  document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  });
  document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
```