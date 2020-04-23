# Нативное перетаскивание файла

Некоторым приложениям может понадобиться поддержка реализованной в операционной системе функции перетаскивания файлов. Перетаскивание файлов в веб-контент поддерживается большинством веб-сайтов. Electron дополнительно поддерживает перетаскивание файлов и содержимого приложения в операционную систему.

Чтобы добавить эту возможность в свое приложение нужно вызвать `webContents.startDrag(item)` API в ответ на событие `ondragstart`.

В процессе рендера, обрабатывайте событие `ondragstart` и направляйте информацию в ваш основной процесс.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Далее, в main process, добавьте к событию путь к файлу, который перетаскивается, и иконку.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
