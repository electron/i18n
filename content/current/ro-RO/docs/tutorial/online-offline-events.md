# Detectare eveniment online/offline

[Detectarea evenimentelor online și offline](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) poate fi implementată în procesul de redare folosind navigatorul [`. nLinia`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) atribut, parte a API-ului HTML5 standard. Atributul `navigator.onLine` returnează `false` dacă orice cerere de rețea este garantată pentru a eșua, adică în mod categoric offline (deconectat de la rețea). Returnează `adevărat` în toate celelalte cazuri. Deoarece toate celelalte condiții returnează `adevărat`, trebuie să fii atent să obții rezultate pozitive false, pentru că nu putem presupune că `adevărata valoare` înseamnă că Electron poate accesa internetul. Cum ar fi cazul în care calculatorul rulează un software virtualizat care are adaptoare ethernet virtuale care sunt întotdeauna „conectate. Prin urmare, dacă vrei cu adevărat să stabilești statusul accesului la internet al Electron, ar trebui să dezvolți mijloace suplimentare pentru verificare.

Exemplu:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = noul BrowserWindow({ width: 0, height: 0, show: false })
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

Pot exista cazuri în care doriţi să răspundeţi la aceste evenimente în procesul principal, de asemenea. Cu toate acestea, procesul principal nu are un obiect `navigator` și, prin urmare, nu poate detecta aceste evenimente direct. Folosind utilități de comunicare interprocesare a electronului, evenimentele pot fi transmise procesului principal și pot fi gestionate după cum este necesar, după cum se arată în următorul exemplu.

_main.js_

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.whenReady(). hen() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, arată: fals, webPreferens: { nodeIntegration: true } })
  onlineStatusWindow. oadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (eveniment, status) => {
  console.log(status)
})
```

_online-status.html_

```html
<! OCTYPE html>
<html>
<body>
<script>
  const { ipcRenderer } = require('electron')
  const updateOnlineStatus = () => {
    ipcRenderer. end('online-status-changed', navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  updateOnlineStatus()
</script>
</body>
</html>
```
