# Wykrywanie Wydarzeń Offline oraz Online

[Wykrywanie zdarzeń online i offline](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) może być zaimplementowane w procesie renderowania za pomocą nawigatora [`. atrybut nLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) część standardowego API HTML5. Atrybut `navigator.onLine` zwraca `false` jeśli jakiekolwiek żądania sieci są zagwarantowane jako nieudane, tj. zdecydowanie offline (odłączone od sieci). Zwraca `true` we wszystkich pozostałych przypadkach. Ponieważ wszystkie pozostałe warunki zwracają `tru`, należy pamiętać o uzyskaniu fałszywych dodatnich, ponieważ nie możemy założyć wartości `true` muszą oznaczać, że Electron może uzyskać dostęp do Internetu. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Przykład:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then() => {
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

   alertOnlineStatus()
 </script>
 </body>
 </html>
```

Mogą być również przypadki, w których chcesz odpowiedzieć na te wydarzenia w głównym procesie . Główny proces nie ma jednak obiektu `navigator` i w związku z tym nie może wykryć tych zdarzeń bezpośrednio. Korzystanie z narzędzi komunikacji międzyprocesowej Electrona, zdarzenia mogą być przekazane do głównego procesu i w razie potrzeby obsługiwane, jak pokazano w poniższym przykładzie.

_main.js_

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.whenReady(). hen() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, Pokaż: false, webPreferences: { nodeIntegration: true } })
  onlineStatusWindow. oadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (zdarzenie, status) => {
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
