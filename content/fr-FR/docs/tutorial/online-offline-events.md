# Détection des événements en ligne/hors ligne

La détection des événements en ligne et hors ligne peut être implémentée dans le processus de rendu en utilisant les APIs standards HTML5, comme illustré dans l'exemple suivant.

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

Il peut y avoir des cas où vous souhaitez avoir accès à ces événements dans le processus principal. Toutefois, le processus principal n'a pas d'objet `navigator` et donc ne peux pas détecter ces événement directement. À l'aide des utilitaires de communication interprocessus d'Electron, les événements peuvent être transmis au processus principal et être manipulés selon les besoins, comme illustré dans l'exemple suivant.

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

**REMARQUE :** Si Electron ne peux pas se connecter à un réseau local (LAN) ou un routeur, il est considéré comme hors ligne ; toutes les autres conditions retournent la valeur `true`. Ainsi, alors que vous pouvez supposer qu'Electron est hors ligne lorsque `navigator.onLine` renvoie la valeur `false`, vous ne pouvez pas supposer qu’une valeur `true` signifie nécessairement qu’Electron peut accéder à internet. Vous pourriez obtenir de faux positifs, comme dans les cas où l’ordinateur exécute un logiciel de virtualisation qui a des cartes ethernet virtuelles qui sont toujours « connectés ». Par conséquent, si vous voulez vraiment déterminer le statut d’accès internet d’Electron, vous devez développer des moyens supplémentaires pour la vérification.