# Краткий обзор

> Как использовать API Node.js и Electron.

Все [встроенные модули Node.js](https://nodejs.org/api/) доступны в Electron и сторонних модулях (включая [нативные модули](../tutorial/using-native-node-modules.md)).

Кроме того, Electron предоставляет дополнительные встроенные модули для разработки нативных дестопных приложений. Некоторые модули доступны только в главном процессе, некоторые доступны только в процессе отрисовки (веб-страницы), а некоторые могут быть использованы в обоих процессах.

Основное правило: если модуль связан с [GUI][gui] или системой низкого уровня, то должно быть доступно только в основном процессе. You need to be familiar with the concept of main process vs. renderer process scripts to be able to use those modules.

Скрипт основного процесса похож на обычный скрипт Node.js:

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

Процесс отрисовки ничем не отличается от обычной веб-страницы, за исключением дополнительной возможности использования модулей node, если параметр `nodeIntegration` имеет значение "Включён":

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
