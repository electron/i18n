# 온라인/오프라인 이벤트 감지

[온라인 및 오프라인 이벤트](https://developer.mozilla.org/en-US/docs/Online_and_offline_events)감지는 표준 HTML5API의 일부인[`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html)특성을 사용하여 렌더러 프로세스에서 구현할 수 있습니다. `navigator.onLine` 속성은 네트워크 요청이 실패 (즉, 네트워크와의 연결이 끊어진 상태)가 확실한 경우 `false`를 반환합니다. 그외 모든 상황에서는 `true`를 리턴합니다. 다른 모든 조건이 `true`를 반환하기 때문에, `true` 값이 Electron이 인터넷에 액세스 할 수 있음을 의미 할 수 없으므로 주의해야합니다. 예를 들어 컴퓨터가 항상"연결된 "가상 이더넷 어댑터를 가진 가상화 소프트웨어를 실행하는 경우에 그렇습니다. 따라서 Electron 의 인터넷 액세스 상태를 확인하려는 경우, 검사를 위한 추가 수단을 개발해야합니다.

Example:

*main.js*

```javascript
const {app, BrowserWindow} = require('electron')

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

주 프로세스에서 이러한 이벤트에 응답하려는 경우도있을 수 있습니다. 그러나 메인 프로세스는 `navigator` 객체가 없으므로 이러한 이벤트를 직접 감지 할 수 없습니다. Electron의 프로세스 간 통신 유틸리티를 사용하면 이벤트를 전달할 수 있습니다 다음 예제와 같이 주 프로세스로 이동하여 필요에 따라 처리합니다.

*main.js*

```javascript
const {app, BrowserWindow, ipcMain} = require('electron')
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
  const {ipcRenderer} = require('electron')
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