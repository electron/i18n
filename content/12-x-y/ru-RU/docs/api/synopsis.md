# Краткий обзор

> Как использовать Node.js и Electron API.

Все [встроенные модули Node.js](https://nodejs.org/api/) доступны в Electron и сторонних модулях (включая [нативные модули](../tutorial/using-native-node-modules.md)).

Кроме того, Electron предоставляет дополнительные встроенные модули для разработки нативных дестопных приложений. Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

Основное правило: если модуль связан с [GUI][gui] или системой низкого уровня, то должно быть доступно только в основном процессе. You need to be familiar with the concept of [main process vs. renderer process](../tutorial/quick-start.md#main-and-renderer-processes) scripts to be able to use those modules.

Скрипт основного процесса похож на обычный скрипт Node.js:

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

The renderer process is no different than a normal web page, except for the extra ability to use node modules if `nodeIntegration` is enabled:

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const fs = require('fs')
  console.log(fs.readFileSync(__filename, 'utf8'))
</script>
</body>
</html>
```

Чтобы запустить приложение, прочитайте [Запуск приложения](../tutorial/quick-start.md#run-your-application).

## Деструктирующее присваивание

Начиная с версии 0.37 можно использовать [деструктирующее присваивание][destructuring-assignment], для того чтобы упростить использование встроенных модулей.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

If you need the entire `electron` module, you can require it and then using destructuring to access the individual modules from `electron`.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Это эквивалентно следующему коду:

```javascript
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
