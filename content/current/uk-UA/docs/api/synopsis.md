# Короткий огляд

> Як використовувати API Node.js та Electron.

Всі [вбудовані модулі Node.js](https://nodejs.org/api/) доступні в Electron, також повністю підтримуються сторонні модулі (включаючи [native modules](../tutorial/using-native-node-modules.md)).

Electron також забеспечує деякими вбудованими модулями для розробки десктопних застосунків. Деякі модулі доступні тільки в головному процесі, деякі доступні тільки в процесі візуалізації (Web сторінка) і деякі доступні в обох процесах.

Основне правило: якщо модуль пов'язаний з [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) чи системою на низькому рівні, тоді він має бути доступний в головному процесі. Ви маєте бути знайомі з принципом [головний процес vs. процес рендерингу](../tutorial/application-architecture.md#main-and-renderer-processes) для використання цих модулів.

Скрипт головного процесу виглядає як нормальний Node.js скрипт:

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

Процес візуалізації не відрізняється від звичайної Web сторінки, окрім можливості використовувати node модулі:

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const { app } = require('electron').remote
  console.log(app.getVersion())
</script>
</body>
</html>
```

Для того, щоб запустити ваш додаток, прочитайте [Запуск додатка](../tutorial/first-app.md#running-your-app).

## Призначення деструктуризації

Починаючи з 0.37, ви можете використовувати [деструктуризацію](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) для легшої роботи з вбудованими модулями.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Якщо вам потрібен весь `electron` модуль, ви можете імпортувати його і потім використати деструктуризацію для доступа до конкретного модуля `electron`.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.on('ready', () => {
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

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```
