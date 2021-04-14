# MessagePorts dans Electron

Un [`MessagePort`][]s est une fonctionnalité web permettant l'échange de messages entre différents contextes. C'est un peu comme `window.postMessage`, mais sur différents canaux. L’objectif de ce document est de décrire comment Electron étend le modèle de messagerie Channel , et de donner quelques exemples de la façon dont vous pouvez utiliser MessagePorts dans votre application.

Voici un petit exemple de MessagePort et de son fonctionnement:

```js
// rendererer.js ///////////////////////////////////////////////////////////////////
// Les MessagePorts sont créés par paires. On appelle canal une paire de MessagePort connectés .
const channel = new MessageChannel()

// La seule différence entre port1 et port2 est dans la façon dont vous les utilisez. Les messages envoyés à port1 seront reçus par port2 et vice-versa.
const port1 = channel.port1
const port2 = channel. ort2

// Il est possible d'envoyer un message sur le canal avant que l'autre extrémité n'ait enregistré un écouteur. Les messages seront dans ce cas mis en file d'attente jusqu'à ce qu'un écouteur soit enregistré.
port2.postMessage({ answer: 42 })

// Ici nous envoyons l'autre extrémité du canal, port1, au processus principal. //Il est également possible d'envoyer des MessagePorts à d'autres frames, Web Workers, etc.
ipcRenderer.postMessage('port', null, [port1])
```

```js
// main.js ///////////////////////////////////////////////////////////////////////////
// Dans le processus principal, nous recevons le port.
ipcMain.on('port', (event) => {
  // Lorsque nous recevons un MessagePort dans le processus principal, il devient un
  // MessagePortMain.
  const port = event.ports[0]

  // MessagePortMain utilise une API des événements du style Node.js plutôt que web. Alors .on ('message', ...) au lieu de .onmessage = ...
  port.on('message', (event) => {
    // data is { answer: 42 }
    const data = event.data
  })

  // MessagePortMain met les messages en attente jusqu'à ce que la méthode .start() soit invoquée.
  port.start()
})
```

La documentation de [Channel Messaging API][] est un excellent moyen d'en apprendre plus sur le fonctionnement des MessagePorts.

## Les MessagePorts dans le processus principal

Dans le moteur de rendu, la classe `MessagePort` se comporte exactement comme pour le Web. Le processus principal n'étant pas pas une page web, il n'y a pas l'intégration de Blink — et donc pas de classe `MessagePort` ou `MessageChannel`. Afin de gérer et interagir à l'aide de MessagePorts avec le processus principal, Electron ajoute deux nouvelles classes : [`MessagePortMain`][] et [`MessageChannelMain`][]. Celles-ci se comportent comme les classes analogues dans le moteur de rendu.

Les objets de type `MessagePort` peuvent être créés soit dans le moteur de rendu soit dans le processus principal, et passés dans les deux sens en utilisant les méthodes [`ipcRenderer. ostMessage`][] et [`WebContents.postMessage`][] . Notez bien que les méthodes IPC usuelles telles que `send` et `invoke` ne peuvent pas être utilisées pour transférer des `MessagePort`, seules la méthode `postMessage` le peut pour transférer des `MessagePort`.

En transmettant un `MessagePort`s via le processus principal, vous pouvez connecter deux pages qui sans cela n'auraient pas été en mesure de communiquer (par ex à cause de restrictions sur une même origine).

## Extension: `close` événement

Electron ajoute une fonctionnalité à `MessagePort` non présente pour le web afin de rendre MessagePorts plus utile. Il s'agit de l'événement `close` , qui est émis lorsque l'autre extrémité du canal est fermée. Les ports peuvent également être implicitement fermés par une purge du garbage-collector.

Dans le moteur de rendu, vous pouvez ajouter des écouteurs sur l'événement `close` soit par assignation avec `port.onclose` ou en invoquant la méthode `port.addEventListener('close', ...)`. Dans le processus , vous pouvez le faire appelant `port.on ('close',...)`.

## Exemple de cas d'utilisation

### Processus des travailleurs

Dans cet exemple, votre application dispose d’un processus de travail implémenté en tant que fenêtre cachée. Vous souhaitez que la page de l’application soit en mesure de communiquer directement avec le de travail, sans les frais généraux de performance de relayer via le processus principal.

```js
main.js ///////////////////////////
const { BrowserWindow, application, ipcMain, MessageChannelMain } = exiger ('electron')

app.whenReady().then(async () => {
  // Le processus de travail est un BrowserWindow caché, de sorte qu’il aura accès
  // à un contexte Blink complet (y compris par exemple. <canvas>, audio, fetch(), etc.)
  const worker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true }
  })
  await worker.loadFile('worker.html')

  // La fenêtre principale enverra du travail au processus de travail et recevra les résultats
  // sur un MessagePort.
  const mainWindow = nouveau BrowserWindow ({
    webPreferences: { nodeIntegration: true }
  })
  mainWindow.loadFile ('app.html')

  // Nous ne pouvons pas utiliser ipcMain.handle()) ici, parce que la réponse doit transférer un
  // MessagePort.
  ipcMain.on ('request-worker-channel', (événement) => {
    // Pour des raisons de sécurité, assurons-nous que seuls les cadres que nous attendons peuvent
    // accéder au travailleur.
    if (event.senderFrame === mainWindow.webContents.mainFrame) {
      // Créer un nouveau canal ...
      const { port1, port2 } = nouveau MessageChannelMain ()
      // ... envoyer une fin au travailleur ...
      worker.webContents.postMessage ('new-client', null, [port1])
      // ... et l’autre extrémité de la fenêtre principale.
      event.senderFrame.postMessage ('provide-worker-channel', null, [port2])
      // Maintenant, la fenêtre principale et le travailleur peuvent communiquer les uns avec les autres
      // sans passer par le processus principal!
    }
  })
})
```

```html<!-- travailleur.html ------------------------------------------------------------><script>
const { ipcRenderer } = exiger (« électron »)

fonction doWork (entrée) {
  // Quelque chose de cpu-intensif.
  entrée de retour * 2
}

// Nous pourrions obtenir plusieurs clients, par exemple s’il y a plusieurs fenêtres,
// ou si la fenêtre principale se recharge.
ipcRenderer.on ('new-client', (event) => {
  const [ port ] = event.ports
  port.onmessage = (événement) => {
    // Les données de l’événement peuvent être n’importe quel objet sérialisable (et l’événement pourrait même
    // transporter d’autres MessagePorts avec elle!)
    résultat const = doWork (event.data)
    port.postMessage(résultat)
  }
})
</script>
```

```html<!--'application.html ---------------------------------------------------------------><script>
const { ipcRenderer } = exiger ('electron')

// Nous demandons que le processus principal nous envoie un canal que nous pouvons utiliser pour
// communiquer avec le travailleur.
ipcRenderer.send ('request-worker-channel')

ipcRenderer.once ('provide-worker-channel', (événement) => {
  // Une fois que nous recevons la réponse, nous pouvons prendre le port...
  const [ port ] = event.ports
  // ... enregistrer un gestionnaire pour recevoir des résultats ...
  port.onmessage = (événement) => { console
    .log ('résultat reçu:', event.data)
  }
  // ... et commencer à l’envoyer travailler!
  port.postMessage(21)
})
</script>
```

### Flux de réponse

Les méthodes IPC intégrées d’Electron ne supportent que deux modes : le feu et l' (p. ex. `send`), ou demande-réponse (p. ex. `invoke`). À l’aide de MessageChannels, pouvez implémenter un « flux de réponse », où une seule demande répond par flux de données.

```js
renderer.js //////////////////////////// fonction

makeStreamingRequest (élément, rappel) {
  // MessageChannels sont légers - il est bon marché pour en créer un nouveau pour chaque
  // demande.
  const { port1, port2 } = nouveau MessageChannel ()

  // Nous envoyons une extrémité du port au processus principal ...
  ipcRenderer.postMessage(
    'give-me-a-stream',
    { element, count: 10 },
    [port2]
  )

  // ... et nous nous accrochons à l’autre extrémité. Le processus principal enverra des messages
  // à son extrémité du port, et le fermera quand il sera terminé.
  port1.onmessage = (événement) => {
    rappel (event.data)
  }
  port1.onclose = () => { console
    .log ('stream ended')
  }
}

makeStreamingRequest(42, (données) => { console
  .log ('got response data:', event.data)
})
// Nous verrons « données de réponse obtenu: 42 » 10 fois.
```

```js
main.js /////////////////////////

ipcMain.on('give-me-a-stream', (événement, msg) => {
  // Le renderer nous a envoyé un MessagePort qu’il veut que nous envoyons notre
  // réponse plus.
  const [replyPort] = event.ports

  // Ici nous envoyons les messages de façon synchrone, mais nous pourrions tout aussi bien stocker
  // le port quelque part et envoyer des messages asynchrone.
  pour (let i = 0; i < msg.count; i++) {
    replyPort.postMessage (msg.element)
  }

  // Nous fermeons le port quand nous avons fini d’indiquer à l’autre extrémité que nous
  // n’enverrons plus de messages. Ce n’est pas strictement nécessaire - si nous
  / / n’a pas explicitement fermer le port, il serait éventuellement
  ordures / / recueillies, ce qui déclencherait également l’événement « fermer » dans le renderer.
  replyPort.close()
})
```

### Communiquer directement entre le processus principal et le monde principal d’une page isolée dans le contexte

Lorsque [l'][] d’isolement du contexte est activé, les messages IPC du processus principal à le renderer sont livrés au monde isolé, plutôt qu’au monde principal. Parfois, vous voulez transmettre des messages au monde principal directement, sans avoir à marcher à travers le monde isolé.

```js
principal.js /////////////////////////////
const { BrowserWindow, app, MessageChannelMain } = require ('electron')
const path = require ('path')

app.whenReady().then(async () => {
  // Créer un BrowserWindow avec contextIsolation activée.
  const bw = nouveau BrowserWindow ({
    webPreferences: {
      contexteIsolation: vrai,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  bw.loadURL ('index.html')

  // Nous enverrons une extrémité de ce canal au monde principal de la page
  // context-isolated.
  const { port1, port2 } = nouveau MessageChannelMain ()

  // Il est ok d’envoyer un message sur le canal avant que l’autre extrémité a
  // enregistré un auditeur. Les messages seront mis en file d’attente jusqu’à ce qu’un auditeur
  // enregistré.
  port2.postMessage ({ test: 21 })

  // Nous pouvons également recevoir des messages du monde principal du renderer.
  port2.on ('message', (événement) => { console
    .log ('from renderer main world:', event.data)
  })
  port2.start()

  // Le script de préchargement recevra ce message IPC et transférera le port
  // vers le monde principal.
  bw.webContents.postMessage ('main-world-port', null, [port1])
})
```

```js
préchargement.js /////////////////////////////////////////
const { ipcRenderer } = require ('electron')

// Nous devons attendre que le monde principal soit prêt à recevoir le message avant de
// envoyer le port. Nous créons cette promesse dans le préchargement de sorte qu’il est garanti
// d’enregistrer l’auditeur de charge avant que l’événement de charge soit tiré.
const windowLoaded = new Promise(resolve => {
  window.onload = resolve
})

ipcRenderer.on ('main-world-port', async (event) => {
  await windowLoaded
  // We use regular window.postMessage to transfer the port from the isolated
  // world to the main world.
  window.postMessage ('main-world-port', '*', event.ports)
})
```

```html
<!-- index.html ------------------------------------------------------------->
<script>
window.onmessage = (événement) => {
  // event.source === fenêtre signifie que le message vient de la
  de préchargement // script, par opposition à une <iframe> ou à une autre source.
  si (event.source === fenêtre && event.data === 'main-world-port') {
    const [ port ] = event.ports
    // Une fois que nous avons le port, nous pouvons communiquer directement avec le principal
    // processus.
    port.onmessage = (événement) => { console
      .log ('du processus principal:', event.data)
      port.postMessage (event.data * 2)
    }
  }
}
</script>
```

[l']: context-isolation.md
[`ipcRenderer. ostMessage`]: ../api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer
[`WebContents.postMessage`]: ../api/web-contents.md#contentspostmessagechannel-message-transfer
[`MessagePortMain`]: ../api/message-port-main.md
[`MessageChannelMain`]: ../api/message-channel-main.md
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
