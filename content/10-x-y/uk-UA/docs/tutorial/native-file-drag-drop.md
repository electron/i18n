# Нативний Drag & Видалити файл

Деякі види програм, які маніпулюють файлами, можуть допомогти нативний файл операційної системи перетягування & відкинути функцію. Перетягуючи файли на веб-вміст є поширеним і підтримується багатьма сайтами. Electron additionally supports dragging files and content out from web content into the operating system's world.

Для реалізації цієї функції у вашому додатку, вам потрібно викликати `webContents.startDrag(item)` API у відповідь на `на подію`.

У процесі рендерингу обробте захід `ondragstart` і переслати інформацію до вашого основного процесу.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Потім, в основних процесах, збільшіть подію з шляхом до файлу, який тягнеться з іконкою.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.start({
    file: Path,
    icon: '/path/to/icon.png'
  })

```
