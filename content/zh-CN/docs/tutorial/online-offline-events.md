# 在线/离线事件探测

## 概览

在渲染进程中，[在线/离线事件](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) 的探测，是通过标准 HTML5 API 中 [` navigator.onLine `](http://html5index.org/Offline%20-%20NavigatorOnLine.html) 属性来实现的。

`navigator.onLine` 属性返回值：

* `false`：如果所有网络请求都失败(例如，断开网络)。
* `true`: 在其他情况下都返回 true

由于许多情况都会返回 `true`，你应该小心对待误报的情况， 因为我们不能总是假设 `true` 值意味着 Electron 可以访问互联网。 例如，当计算机运行的虚拟化软件时，虚拟以太网适配器处于 "always connected" 状态。 因此，如果您想要确定 Electron 的互联网访问状态，您应该为此检查进行额外的开发。

## 示例

Starting with an HTML file `index.html`, this example will demonstrate how the `navigator.onLine` API can be used to build a connection status indicator.

```html title="index.html"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body>
    <h1>Connection status: <strong id='status'></strong></h1>
    <script src="renderer.js"></script>
</body>
</html>
```

In order to mutate the DOM, create a `renderer.js` file that adds event listeners to the `'online'` and `'offline'` `window` events. The event handler sets the content of the `<strong id='status'>` element depending on the result of `navigator.onLine`.

```js title='renderer.js'
function updateOnlineStatus () {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```

Finally, create a `main.js` file for main process that creates the window.

```js title='main.js'
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const onlineStatusWindow = new BrowserWindow({
    width: 400,
    height: 100
  })

  onlineStatusWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

启动 Electron 应用程序后，您应该能看到通知：

![Connection status](../images/connection-status.png)

> Note: If you need to communicate the connection status to the main process, use the [IPC renderer](../api/ipc-renderer.md) API.
