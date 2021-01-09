# Об'єкт `File`

> Використовує HTML5 `File` API для нативної роботи з файлами в файловій системі.

Інтерфейс DOM File надає абстракцію навколо нативних файлів для роботи користувача прямо з HTML5 API для файлів. Electron додає атрибут `path` до інтерфейсу `File`, який відображає справжній шлях в файловій системі.

Приклад отримання справжнього шляху перетягнутого в додаток файлу:

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
