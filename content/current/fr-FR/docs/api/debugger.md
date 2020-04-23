## Classe : Debugger

> Un transport alternatif pour le protocole de débogage distant de Chrome.

Processus : [Main](../glossary.md#main-process)

Les outils de développement de chrome a une [liaison spéciale](https://chromedevtools.github.io/devtools-protocol/) disponible lors de l’exécution de JavaScript qui permet l’interaction avec les pages et leur instrumentation.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

try {
  win.webContents.debugger.attach('1.1')
} catch (err) {
  console.log('Debugger attach failed : ', err)
}

win.webContents.debugger.on('detach', (event, reason) => {
  console.log('Debugger detached due to : ', reason)
})

win.webContents.debugger.on('message', (event, method, params) => {
  if (method === 'Network.requestWillBeSent') {
    if (params.request.url === 'https://www.github.com') {
      win.webContents.debugger.detach()
    }
  }
})

win.webContents.debugger.sendCommand('Network.enable')
```

### Événements d’instance

#### Événement : 'detach'

Retourne :

* `event` Événement
* `reason` String - Motif du retrait du débogueur.

Emitted when the debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Événement : 'message'

Retourne :

* `event` Événement
* `method` String - Nom de la méthode.
* `params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Émis chaque fois que la cible de débogage émet un événement d'instrumentation.

### Méthodes d’instance

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (facultatif) - Version de protocole de débogage demandée.

Attache le débogueur au `webContents`.

#### `debugger.isAttached()`

Retourne `Boolean` - Si un débogueur est attaché au `webContents`.

#### `debugger.detach()`

Détache le débogueur depuis le `webContents`.

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` n'importe quel objet (facultatif) - JSON avec les paramètres de la requête.

Retourne `Promise<any>` - Une promesse qui résout avec la réponse définie par l'attribut 'returns' de la description de la commande dans le protocole de débogage distant ou qui est rejetée indiquant l'échec de la commande.

Envoi une commande au débogueur.
