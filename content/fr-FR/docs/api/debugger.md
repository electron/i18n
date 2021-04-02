## Classe : Debugger

> Un transport alternatif pour le protocole de débogage distant de Chrome.

Processus : [Main](../glossary.md#main-process)

Les outils de développement de chrome a une [liaison spéciale][rdp] disponible lors de l’exécution de JavaScript qui permet l’interaction avec les pages et leur instrumentation.

```javascript
const { BrowserWindow } = require ('electron')
const win = new BrowserWindow()

try {
  win.webContents.debugger.attach ('1.1')
} catch (err) {
  console.log ('Debugger attach failed: ', err)
}

win.webContents.debugger.on('detach', (événement, raison) => { console
  .log ('Debugger détaché en raison de: ', raison)
})

win.webContents.debugger.on('message', (événement, méthode, params) => {
  si (méthode === 'Network.requestWillBeSent') {
    si (params.request .url === 'https://www.github.com') {
      win.webContents.debugger.detach()
    }
  }
})

win.webContents.debugger.sendCommand ('Network.enable')
```

### Événements d’instance

#### Événement : 'detach'

Retourne :

* `event` Événement
* `reason` String - Motif du retrait du débogueur.

Émis lorsque la session de débogage est terminée. Cela se produit soit lorsque `webContents` est fermé ou des devtools est invoqué pour le système `webContents`.

#### Événement : 'message'

Retourne :

* `event` Événement
* `method` String - Nom de la méthode.
* `params` tout - Paramètres d’événement définis par les « paramètres » dans le protocole de débogage à distance.
* `sessionId` String - Identificateur unique de la session de débogage ci-joint, correspondra à la valeur envoyée par `debugger.sendCommand`.

Émis chaque fois que la cible de débogage émet un événement d'instrumentation.

### Méthodes d’instance

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (facultatif) - Version de protocole de débogage demandée.

Attache le débogueur au `webContents`.

#### `debugger.isAttached()`

Retourne `Boolean` - Si un débogueur est attaché au `webContents`.

#### `debugger.detach()`

Détache le débogueur depuis le `webContents`.

#### `debugger.sendCommand (méthode[, commandParams, sessionId])`

* `method` String - Nom de méthode, devrait être l’une des méthodes définies par le protocole de débogage [à distance][rdp].
* `commandParams` n'importe quel objet (facultatif) - JSON avec les paramètres de la requête.
* `sessionId` String (facultatif) - envoyez la commande à la cible avec l’id de session de débogage associé. La valeur initiale peut être obtenue en envoyant [Target.attachToTarget][attachToTarget] message.

Retourne `Promise<any>` - Une promesse qui se résout avec la réponse définie par l'attribut 'returns' de la description de la commande dans le protocole de débogage distant ou qui est rejetée indiquant l'échec de la commande.

Envoi une commande au débogueur.

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
