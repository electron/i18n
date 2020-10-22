# Détection des événements en ligne/hors ligne

## Vue d'ensemble

La détection des [événements Online et offline](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) peut être implémentée dans le processus de rendu en utilisant l'attribut [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), faisant partie de l'API HTML5 standard.

L'attribut `navigator.onLine` renvoie :
* `false` si toute requête réseau est garantie vouée à l'échec (par exemple, lors de la déconnexion du réseau).
* `true` dans tous les autres cas.

Puisque de nombreux cas retournent `true`, vous devriez traiter avec précaution les cas pouvant être des faux positifs, car la valeur `true` ne signifie pas toujours qu'Electron puisse accéder à Internet. Par exemple, dans les cas où l'ordinateur exécute un logiciel de virtualisation qui a des adaptateurs Ethernet virtuels avec l'état « toujours connecté ». Par conséquent, si vous voulez déterminer le statut de l'accès à Internet d'Electron, vous devrez mettre en œuvre des moyens supplémentaires de vérification.

## Example

### Détection d'événements dans le processus de rendu

Partez d'une application fonctionnelle à partir du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

créer le fichier `online-status.html` et ajouter la ligne suivante avant la balise fermeture :

```html
<script src="renderer.js"></script>
```

et ajoutez le fichier `render.js`:

```javascript
const alertOnlineStatus = () => { window.alert(navigator.onLine ? 'online' : 'offline') }

window.addEventListener('online', alertOnlineStatus)
window.addEventListener('offline', alertOnlineStatus)

alertOnlineStatus()
```

Après avoir lancé l'application Electron, vous devriez voir la notification :

![Online-offline-event detection](../images/online-event-detection.png)

### Détection d'événements dans le processus principal

Il peut y avoir des cas où vous souhaitez également pouvoir réagir aux événements online/offline depuis le processus principal. The Main process, however, does not have a `navigator` object and cannot detect these events directly. Dans ce cas, vous devez transférer les événements vers le processus principal en utilisant les utilitaires de communication interprocessus (IPC) d'Electron.

Partez d'une application fonctionnelle à partir du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
laisser onlineStatusWindow

app.whenReady(). hen(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, 0, show: false, webPreferences: { nodeIntegration: true } })
  onlineStatusWindow. oadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

créer le fichier `online-status.html` et ajouter la ligne suivante avant la balise fermeture :

```html
<script src="renderer.js"></script>
```

et ajoutez le fichier `render.js`:

```javascript
const { ipcRenderer } = require('electron')
const updateOnlineStatus = () => { ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline') }

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```

Après avoir lancé l'application Electron, vous devriez voir la notification dans la console :

```sh
npm start

> electron@1.0.0 start /electron
> electron .

online
```
