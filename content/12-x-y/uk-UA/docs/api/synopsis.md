# Короткий огляд

> Як використовувати API Node.js та Electron.

Всі [вбудовані модулі Node.js](https://nodejs.org/api/) доступні в Electron, також повністю підтримуються сторонні модулі (включаючи [native modules](../tutorial/using-native-node-modules.md)).

Electron також забеспечує деякими вбудованими модулями для розробки десктопних застосунків. Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

Основне правило: якщо модуль пов'язаний з [GUI][gui] чи системою на низькому рівні, тоді він має бути доступний в головному процесі. You need to be familiar with the concept of [main process vs. renderer process](../tutorial/quick-start.md#main-and-renderer-processes) scripts to be able to use those modules.

Скрипт головного процесу виглядає як нормальний Node.js скрипт:

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

Для того, щоб запустити ваш додаток, прочитайте [Запуск додатка](../tutorial/quick-start.md#run-your-application).

## Призначення деструктуризації

Починаючи з 0.37, ви можете використовувати [деструктуризацію][destructuring-assignment] для легшої роботи з вбудованими модулями.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Якщо вам потрібен весь `electron` модуль, ви можете імпортувати його і потім використати деструктуризацію для доступа до конкретного модуля `electron`.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Це рівноцінно наступному коду:

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
