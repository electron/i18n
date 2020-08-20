# Online/Offline Pagtukoy ng mga Kaganapan

[ Ang pagtukoy ng mga kaganapan sa online at offline ](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) ay pwedeng ipatupad sa proseso ng tagasalin gamit ang [` navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) na katangian, bahagi ng pamantayang HTML5 API. Ang `navigator.onLine` na katangian ay nagbabalik ng `mali` kung kahit anong hinihinging network ay garantisadong mabibigo i.e. tiyak na offline (nadiskonek mula sa network).  Ito ay nagbabalik ng `/totoo` sa lahat ng iba pang kaso. Dahil lahat ng iba pang mga kondisyon ay bumalik `totoo`, ang isa ay dapat mmaalalahanin sa pagkuha ng mga maling positibo, dahil hindi natin maipagpapalagay `totoo` na kabuluhan ay nangangahulugan na ang Electron ay maaaring ma-access ang internet.  Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Halimbawa:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

_online-status.html _

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

Maaaring may mga pagkakataon na kung saan nais mo ring tumugon sa mga pangyayari sa pangunahing proseso. Ang pangunahing proseso gayunpaman ay walang `navigator` na bagay kaya hindi nito matutukoy ang mga pangyayari ng direkta.  Gamit ang mga komunikasyong kagamitan ng Electron's inter-process, ang mga pangyayari ay maaaring ipasa sa pangunahing proseso at pangangasiwaan kung kailangan, gaya ng pinakita sa mga sumusunod na halimbawa.

_main.js_

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

_online-status.html _

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
