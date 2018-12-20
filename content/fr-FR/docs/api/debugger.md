## Classe : Debugger

> Un transport alternatif pour le protocole de débogage distant de Chrome.

Processus : [Main](../glossary.md#main-process)

Les outils de développement de chrome a une [liaison spéciale](https://developer.chrome.com/devtools/docs/debugger-protocol) disponible lors de l’exécution de JavaScript qui permet l’interaction avec les pages et leur instrumentation.

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

### Méthodes d’instance

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (facultatif) - Version de protocole de débogage demandée.

Attache le débogueur au `webContents`.

#### `debugger.isAttached()`

Retourne `Boolean` - Si un débogueur est attaché au `webContents`.

#### `debugger.detach()`

Détache le débogueur depuis le `webContents`.

#### `debugger.sendCommand(method[, commandParams, callback])`

* `method` String -Nom de la méthode, cela devrait être l'une des méthodes définies par le protocole de débogage à distance.
* `commandParams` Object (facultatif) - Objet JSON avec les paramètres de la requête.
* `callback` Function (facultatif) - Réponse 
  * `error` Object - Message d'erreur indiquant l'échec de la commande.
  * `result` Any - Réponse définie par l'attribut 'returns' de la description de la commande dans le protocole de débogage distant.

Envoi une commande au débogueur.

### Événements d’instance

#### Événement : 'detach'

* `event` Événement
* `reason` String - Motif du retrait du débogueur.

Émis lorsque la session de débogage est terminée. Cela se produit soit lorsque le `webContents` est fermé, soit lorsque devtools est invoqué pour le `webContents` rattaché.

#### Événement : 'message'

* `event` Event
* `method` String - Nom de la méthode.
* `params` Object - Paramètres d'événements définis par l'attribut 'parameters' dans le protocole de débogage distant.

Émis à chaque fois que la cible du débogueur envoie un événement d’instrumentation.