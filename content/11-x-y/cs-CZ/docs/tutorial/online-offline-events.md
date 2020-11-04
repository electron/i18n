# Detekce online / Offline událostí

[Online a offline událost](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) detektor lze implementovat v procesu vykreslování pomocí navigátoru [`. atribut nLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) , část standardního HTML5 API. `navigator.onLine` atribut vrátí `falešnou` , pokud je zaručeno, že všechny síťové požadavky selžou, tj. rozhodně offline (odpojeno od sítě). Ve všech ostatních případech se vrací `pravda`. Vzhledem k tomu, že všechny ostatní podmínky se vracejí `true`, je třeba mít na paměti falešné pozitivy, protože nemůžeme předpokládat `pravou` hodnotu nutně znamená, že Electron má přístup k internetu. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Ukázka:

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

  window.addEventListener('online', alertOnlineStatus)
  window.addEventListener('offline', alertOnlineStatus)

  alertOnline()
</script>
</body>
</html>
```

Mohou existovat případy, kdy chcete na tyto události reagovat i v hlavním procesu. Hlavní proces však nemá objekt `navigátoru` , a proto nemůže tyto události zjistit přímo. Používání Elektronických komunikačních nástrojů mezi procesy, události lze předat hlavnímu procesu a podle potřeby je zpracovat, jak ukazuje následující příklad.

_main.js_

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.whenReady(). en() => {
  onlineStatusWindow = nový BrowserWindow({ wide: 0, výška: 0, show: false, webPreference: { nodeIntegration: true } })
  onlineStatusWindow. oadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (událost, stav) => {
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

  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  updateOnlineStatus()
</script>
</body>
</html>
```
