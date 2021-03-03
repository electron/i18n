# Обнаружение Online/Offline событий

[Online и offline событие](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) может быть реализовано в процессе визуализации с помощью атрибута [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), частью стандартного API в HTML5. Атрибут `navigator.onLine` возвращает `false` если любые сетевые запросы гарантированно потерпят неудачу, то есть определенно offline (отключено от сети). Он возвращает `true` во всех других случаях. Поскольку все другие условия возвращают `true`, следует помнить о получении ложных позитивных значений, поскольку мы не можем предположить, что `true` однозначно означает, что Electron может получить доступ в Интернет. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Пример:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

_online-status.html_

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  alertOnlineStatus)
  window.addEventListener('offline',  alertOnlineStatus)

  alertOnlineStatus()
</script>
</body>
</html>
```

Могут быть случаи, когда вы хотите ответить на эти события в основном процессе. Однако основной процесс не имеет объекта `навигатора` и поэтому не может обнаружить эти события напрямую. Using Electron's inter-process communication utilities, the events can be forwarded to the main process and handled as needed, as shown in the following example.

_main.js_

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.whenReady(). hen(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, показывать: false, настройки веб-сайтов: { nodeIntegration: true } })
  onlineStatusWindow. oadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

_online-status.html_

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const { ipcRenderer } = require('electron')
  const updateOnlineStatus = () => {
    ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  updateOnlineStatus)
  window.addEventListener('offline',  updateOnlineStatus)

  updateOnlineStatus()
</script>
</body>
</html>
```
