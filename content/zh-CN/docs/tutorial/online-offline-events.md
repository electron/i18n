# 在线/离线事件探测

在渲染进程中，[ Online and offline ](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) 事件检测，是通过标准 HTML5 API 中 [` navigator.onLine `](http://html5index.org/Offline%20-%20NavigatorOnLine.html) 属性来实现的。 脱机时 (从网络断开), ` navigator.onLine ` 属性将返回 ` false `， 除此之外都返回`true` 。 由于所有其他条件都返回 ` true `, 因此必须警惕信息误报, 因为我们不能保证 ` true ` 的情况下 Electron 一定可以访问 internet。 例如这种情况下，软件运行在一个虚拟网络适配器始终为“connected”的虚拟机中。 因此，如果你想确保 Electron 真实的网络访问状态，你应该开发额外的检测方法。

示例:

*main.js*

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

*online-status.html*

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

也会有人想要在主进程也有回应这些事件的实例。 然后主进程没有 `navigator` 对象因此不能直接探测在线还是离线。 使用 Electron 的进程间通讯工具，事件就可以在主进程被使用，就像下面的例子.

*main.js*

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

*online-status.html*

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