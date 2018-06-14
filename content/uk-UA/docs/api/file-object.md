# Об'єкт `File`

> Використовує HTML5 `File` API для нативної роботи з файлами в файловій системі.

The DOM's File interface provides abstraction around native files in order to let users work on native files directly with the HTML5 file API. Electron has added a `path` attribute to the `File` interface which exposes the file's real path on filesystem.

Приклад отримання справжнього шляху перетягнутого в додаток файлу:

```html
<div id="holder">
  Перетягніть файл сюди
</div>

<script>
  document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
      console.log('Файли які Ви перетягли: ', f.path)
    }
  });
  document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
```