# Нативное перетаскивание файла

Некоторым приложениям может понадобиться поддержка, реализованной в операционной системе, функции перетаскивания файлов. Перетаскивание файлов в веб-контент поддерживается большинством веб-сайтов. Electron дополнительно поддерживает перетаскивание файлов и содержимого приложения в операционную систему.

Чтобы добавить эту возможность в свое приложение нужно вызвать `webContents.startDrag(item)` API в ответ на `ondragstart` event.

In your renderer process, handle the `ondragstart` event and forward the information to your main process.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Then, in the main process, augment the event with a path to the file that is being dragged and an icon.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```