# Нативное перетаскивание файла

## Обзор

Некоторым приложениям может понадобиться поддержка реализованной в операционной системе функции перетаскивания файлов. Перетаскивание файлов в веб-контент поддерживается большинством веб-сайтов. Electron дополнительно поддерживает перетаскивание файлов и содержимого приложения в операционную систему.

Чтобы реализовать эту функцию в вашем приложении, вам нужно позвонить [`веб-контента. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API в ответ на событие `ondragstart`.

## Пример

Начиная с рабочего приложения из [Quick Start Guide](quick-start.md), добавьте следующие строки в файл `index.html`:

```html
<a href="#" id="drag">Перетащите меня</a>
<script src="renderer.js"></script>
```

и добавьте следующие строки в файл `renderer.js`:

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/the/item')

```

Код выше инструктирует процесс Renderer для обработки события `ondragstart` и передачи информации Главному процессу.

В главном процессе(`главное. s` файл), развернуть полученное событие с путем, который является перетаскиванием и значком:

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

После запуска приложения Electron попробуйте перетащить элемент с BroswerWindow на рабочий стол. В этом руководстве элемент является Markdown файлом, расположенным в корне проекта:

![Перетаскивание](../images/drag-and-drop.gif)
