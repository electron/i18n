# Détection des événements en ligne/hors ligne

Détection des événements en ligne et hors ligne peut être implémentée dans le processus de rendu en utilisant les API HTML5 standard, comme illustré dans l’exemple suivant.

*main.js*

```javascript
const {app, BrowserWindow} = require('electron') onlineStatusWindow let app.on ("prêt", () => {onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false }) onlineStatusWindow.loadURL ('file://${__dirname}/online-status.html')})
```

*en ligne-status.html*

```html
< ! DOCTYPE html><html><body><script> const alertOnlineStatus = () = > {window.alert (navigator.onLine ? "en ligne" : "hors ligne")} window.addEventListener ('en ligne', alertOnlineStatus) window.addEventListener ("hors ligne", alertOnlineStatus) alertOnlineStatus()</script></body></html>
```

Il peut y avoir des cas où vous souhaitez répondre à ces événements dans le processus principal aussi bien. Toutefois, le processus principal n’a pas un`navigator` objet et donc ne peut pas détecter ces événements directement. À l’aide des utilitaires de communication interprocessus de l’électron, les événements peuvent être transmis à la procédure principale et manipulés selon les besoins, comme illustré dans l’exemple suivant.

*main.js*

```javascript
const {app, BrowserWindow, ipcMain} = require('electron') onlineStatusWindow let app.on ("prêt", () => {onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false }) onlineStatusWindow.loadURL ('file://${__dirname}/online-status.html')}) ipcMain.on (' en ligne-état-passé ', (événement, statut) = > {console.log(status)})
```

*en ligne-status.html*

```html
< ! DOCTYPE html><html><body><script> const {ipcRenderer} = require('electron') const updateOnlineStatus = () = > {ipcRenderer.send (' en ligne-état-passé ', navigator.onLine ? "en ligne" : "hors ligne")} window.addEventListener ('en ligne', updateOnlineStatus) window.addEventListener ("hors ligne", updateOnlineStatus) updateOnlineStatus()</script></body></html>
```

**NOTE:** si électron n’est pas capable de se connecter à un réseau local (LAN) ou un routeur, il est considéré comme hors ligne ; toutes les autres conditions de retour `true`. Ainsi alors que vous pouvez supposer que l’électron est hors ligne lorsque `navigator.onLine` renvoie une valeur de `false`, vous ne pouvez pas supposer qu’une valeur de `true` signifie nécessairement qu’électrons peuvent accéder à internet. Vous pourriez obtenir de faux positifs, comme dans les cas où l’ordinateur exécute un logiciel de virtualisation qui a des cartes ethernet virtuelles qui sont toujours « connectés ». Par conséquent, si vous voulez vraiment déterminer le statut d’accès internet d’électron, vous devez développer des moyens supplémentaires pour la vérification.