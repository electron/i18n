# Détection des événements en ligne/hors ligne

La détection des [événements en ligne et hors ligne](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) peut être implémentée dans le processus de rendu en utilisant l'attribut [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), faisant partie de l'API HTML5 standard. L'attribut `navigator.onLine` retourne `false` si n'importe quelle requêtes est garantie d'échouée. Par exemple, être complétement hors-ligne (déconnecté du réseau). Cela retourne `true` dans tous les autres cas. Puisque toutes les autres conditions retournent `true`, il faut s'attendre à obtenir de faux positifs, car nous ne pouvons pas supposer que la valeur `true` signifie nécessairement qu'Electron peut accéder à Internet. Par exemple, dans les cas où l'ordinateur exécute un logiciel de virtualisation qui a des adaptateurs ethernet virtuels qui sont toujours "connectés". Par conséquent, si vous voulez vraiment déterminer le statut d'accès à Internet d'Electron, vous devriez développer des moyens supplémentaires de vérification.

Exemple :

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

Il peut y avoir des cas où vous souhaitez avoir accès à ces événements dans le processus principal. Toutefois, le processus principal n'a pas d'objet `navigator` et donc ne peux pas détecter ces événement directement. À l'aide des utilitaires de communication interprocessus d'Electron, les événements peuvent être transmis au processus principal et être manipulés selon les besoins, comme illustré dans l'exemple suivant.

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