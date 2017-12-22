# `File` Nesne

> HTML5 `File` API kullanarak dosya sistemi içerisindeki dosyalarla çalışın.

DOM'un File arayüzü, HTML5'in dosya API'i ile işletim sistemi seviyesinde dosyalarla iş yapmak için soyutlama sağlar. Electron has added a `path` attribute to the `File` interface which exposes the file's real path on filesystem.

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