# Détection des événements en ligne/hors ligne

## Vue d'ensemble

La détection des [événements Online et offline](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) peut être implémentée dans le processus de rendu en utilisant l'attribut [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), faisant partie de l'API HTML5 standard.

L'attribut `navigator.onLine` renvoie :

* `false` si toute requête réseau est garantie vouée à l'échec (par exemple, lors de la déconnexion du réseau).
* `true` dans tous les autres cas.

Puisque de nombreux cas retournent `true`, vous devriez traiter avec précaution les cas pouvant être des faux positifs, car la valeur `true` ne signifie pas toujours qu'Electron puisse accéder à Internet. Par exemple, dans les cas où l'ordinateur exécute un logiciel de virtualisation qui a des adaptateurs Ethernet virtuels avec l'état « toujours connecté ». Par conséquent, si vous voulez déterminer le statut de l'accès à Internet d'Electron, vous devrez mettre en œuvre des moyens supplémentaires de vérification.

## Exemple

En partant d'un fichier HTML `index.html`, cet exemple démontrera comment l'API `navigator.onLine` peut être utilisée pour construire un indicateur d'état de connexion.

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

Après avoir lancé l'application Electron, vous devriez voir la notification :

![Connection status](../images/connection-status.png)

> Note: If you need to communicate the connection status to the main process, use the [IPC renderer](../api/ipc-renderer.md) API.
