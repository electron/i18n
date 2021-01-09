# Нативний Drag & Drop Файлу

## Огляд

Деякі види програм, які маніпулюють файлами, можуть допомогти нативний файл операційної системи перетягування & відкинути функцію. Перетягуючи файли на веб-вміст є поширеним і підтримується багатьма сайтами. Electron additionally supports dragging files and content out from web content into the operating system's world.

Щоб виконати цю функцію у вашому додатку, необхідно зателефонувати до [`веб-контенту. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API у відповідь на `ondragпочати` подію.

## Приклад

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following lines to the `index.html` file:

```html
<a href="#" id="drag">Перетягніть</a>
<script src="renderer.js"></script>
```

і додати наступні рядки в `renderer.js` файл:

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) =>
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')

```

Код вище вказує на процес рендерингу для роботи з `ondragstart` подією і переслати інформацію до основного процесу.

У головному процесі (`main. s` файл), розширювати отриману подію з шляхом до файлу, який перетягується і іконка:

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.start({
    file: Path,
    icon: '/path/to/icon.png'
  })

```

After launching the Electron application, try dragging and dropping the item from the BroswerWindow onto your desktop. У цьому посібнику товар є Markdown файлом, розташований в корені проекту:

![Перетягування](../images/drag-and-drop.gif)
