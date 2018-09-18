# Rilevamento di eventi online/offline

L'identificazione [Evento online ed offline](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) può essere implementata nel processo di rendering usando l'attributo [`navigatore.inLinea`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), parte dell'API standard HTML5. L'attributo `navigatore.inLinea` restituisce `false` se ogni richiesta rete garantisce di fallire, per esempio offline definitivamente (disconnesso dalla rete). Restituisce `true` in ogni caso. Se ogni altra condizione restituisce `true`, si deve sapere che si possono ottenere falsi positici, non potendo supporre che il valore `true` significhi necessariamente che Electron può accedere ad internet. Come nel caso in cui il computer stia eseguendo un software di virtualizzazione che ha adattatori ethernet virtuali sempre "connesso". Pertanto, se vuoi davvero determinare lo stato di accesso ad internet di Electron, dovresti sviluppare significati addizionali per controllare.

Esempio:

*main.js*

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

*stato-online.html*

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

Ci potrebbero essere instanze dove vuoi rispondere a questi eventi anche nel processo principale. Il processo principale comunque non ha oggetto `navigatore` e quindi non può identificare questi eventi direttamente. Usando le utilità di comunicazione interprocessuali di Electron, questi eventi possono essere inoltrati al processo principale e gestiti per le necessità, come mostrato nell'esempio seguente.

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

*stato-online.html*

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