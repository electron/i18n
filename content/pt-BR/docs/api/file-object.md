# Objeto `File`

> Use a API do HTML5 `File` para funcionar nativamente com arquivos no sistema de arquivos.

The DOM's File interface provides abstraction around native files in order to let users work on native files directly with the HTML5 file API. Electron has added a `path` attribute to the `File` interface which exposes the file's real path on filesystem.

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