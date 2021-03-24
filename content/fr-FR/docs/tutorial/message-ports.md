# MessagePorts dans Electron

Un [`MessagePort`][]s est une fonctionnalité web permettant l'échange de messages entre différents contextes. C'est un peu comme `window.postMessage`, mais sur différents canaux. The goal of this document is to describe how Electron extends the Channel Messaging model, and to give some examples of how you might use MessagePorts in your app.

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

  // MessagePortMain utilise une API des événements du style Node.js plutôt que web. So .on('message', ...) instead of .onmessage = ...
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

## Extension: `close` event

Electron ajoute une fonctionnalité à `MessagePort` non présente pour le web afin de rendre MessagePorts plus utile. Il s'agit de l'événement `close` , qui est émis lorsque l'autre extrémité du canal est fermée. Les ports peuvent également être implicitement fermés par une purge du garbage-collector.

Dans le moteur de rendu, vous pouvez ajouter des écouteurs sur l'événement `close` soit par assignation avec `port.onclose` ou en invoquant la méthode `port.addEventListener('close', ...)`. Dans le processus , vous pouvez le faire appelant `port.on ('close',...)`.

## Exemple de cas d'utilisation

### Worker process

In this example, your app has a worker process implemented as a hidden window. You want the app page to be able to communicate directly with the worker process, without the performance overhead of relaying via the main process.

```js
// main.js ///////////////////////////////////////////////////////////////////
const { BrowserWindow, app, ipcMain, MessageChannelMain } = require('electron')

app.whenReady().then(async () => {
  // The worker process is a hidden BrowserWindow, so that it will have access
  // to a full Blink context (including e.g. <canvas>, audio, fetch(), etc.)
  const worker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true }
  })
  await worker.loadFile('worker.html')

  // The main window will send work to the worker process and receive results
  // over a MessagePort.
  const mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  })
  mainWindow.loadFile('app.html')

  // We can't use ipcMain.handle() here, because the reply needs to transfer a
  // MessagePort.
  ipcMain.on('request-worker-channel', (event) => {
    // For security reasons, let's make sure only the frames we expect can
    // access the worker.
    if (event.senderFrame === mainWindow.webContents.mainFrame) {
      // Create a new channel ...
      const { port1, port2 } = new MessageChannelMain()
      // ... send one end to the worker ...
      worker.webContents.postMessage('new-client', null, [port1])
      // ... and the other end to the main window.
      event.senderFrame.postMessage('provide-worker-channel', null, [port2])
      // Now the main window and the worker can communicate with each other
      // without going through the main process!
    }
  })
})
```

```html
<!-- worker.html ------------------------------------------------------------>
<script>
const { ipcRenderer } = require('electron')

function doWork(input) {
  // Something cpu-intensive.
  return input * 2
}

// We might get multiple clients, for instance if there are multiple windows,
// or if the main window reloads.
ipcRenderer.on('new-client', (event) => {
  const [ port ] = event.ports
  port.onmessage = (event) => {
    // The event data can be any serializable object (and the event could even
    // carry other MessagePorts with it!)
    const result = doWork(event.data)
    port.postMessage(result)
  }
})
</script>
```

```html
<!-- app.html --------------------------------------------------------------->
<script>
const { ipcRenderer } = require('electron')

// We request that the main process sends us a channel we can use to
// communicate with the worker.
ipcRenderer.send('request-worker-channel')

ipcRenderer.once('provide-worker-channel', (event) => {
  // Once we receive the reply, we can take the port...
  const [ port ] = event.ports
  // ... register a handler to receive results ...
  port.onmessage = (event) => {
    console.log('received result:', event.data)
  }
  // ... and start sending it work!
  port.postMessage(21)
})
</script>
```

### Reply streams

Electron's built-in IPC methods only support two modes: fire-and-forget (e.g. `send`), or request-response (e.g. `invoke`). Using MessageChannels, you can implement a "response stream", where a single request responds with a stream of data.

```js
// renderer.js ///////////////////////////////////////////////////////////////

function makeStreamingRequest (element, callback) {
  // MessageChannels are lightweight--it's cheap to create a new one for each
  // request.
  const { port1, port2 } = new MessageChannel()

  // We send one end of the port to the main process ...
  ipcRenderer.postMessage(
    'give-me-a-stream',
    { element, count: 10 },
    [port2]
  )

  // ... and we hang on to the other end. The main process will send messages
  // to its end of the port, and close it when it's finished.
  port1.onmessage = (event) => {
    callback(event.data)
  }
  port1.onclose = () => {
    console.log('stream ended')
  }
}

makeStreamingRequest(42, (data) => {
  console.log('got response data:', event.data)
})
// We will see "got response data: 42" 10 times.
```

```js
// main.js ///////////////////////////////////////////////////////////////////

ipcMain.on('give-me-a-stream', (event, msg) => {
  // The renderer has sent us a MessagePort that it wants us to send our
  // response over.
  const [replyPort] = event.ports

  // Here we send the messages synchronously, but we could just as easily store
  // the port somewhere and send messages asynchronously.
  for (let i = 0; i < msg.count; i++) {
    replyPort.postMessage(msg.element)
  }

  // We close the port when we're done to indicate to the other end that we
  // won't be sending any more messages. This isn't strictly necessary--if we
  // didn't explicitly close the port, it would eventually be garbage
  // collected, which would also trigger the 'close' event in the renderer.
  replyPort.close()
})
```

### Communicating directly between the main process and the main world of a context-isolated page

When [context isolation][] is enabled, IPC messages from the main process to the renderer are delivered to the isolated world, rather than to the main world. Sometimes you want to deliver messages to the main world directly, without having to step through the isolated world.

```js
// main.js ///////////////////////////////////////////////////////////////////
const { BrowserWindow, app, MessageChannelMain } = require('electron')
const path = require('path')

app.whenReady().then(async () => {
  // Create a BrowserWindow with contextIsolation enabled.
  const bw = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  bw.loadURL('index.html')

  // We'll be sending one end of this channel to the main world of the
  // context-isolated page.
  const { port1, port2 } = new MessageChannelMain()

  // It's OK to send a message on the channel before the other end has
  // registered a listener. Messages will be queued until a listener is
  // registered.
  port2.postMessage({ test: 21 })

  // We can also receive messages from the main world of the renderer.
  port2.on('message', (event) => {
    console.log('from renderer main world:', event.data)
  })
  port2.start()

  // The preload script will receive this IPC message and transfer the port
  // over to the main world.
  bw.webContents.postMessage('main-world-port', null, [port1])
})
```

```js
// preload.js ////////////////////////////////////////////////////////////////
const { ipcRenderer } = require('electron')

// We need to wait until the main world is ready to receive the message before
// sending the port. We create this promise in the preload so it's guaranteed
// to register the onload listener before the load event is fired.
const windowLoaded = new Promise(resolve => {
  window.onload = resolve
})

ipcRenderer.on('main-world-port', async (event) => {
  await windowLoaded
  // We use regular window.postMessage to transfer the port from the isolated
  // world to the main world.
  window.postMessage('main-world-port', '*', event.ports)
})
```

```html
<!-- index.html ------------------------------------------------------------->
<script>
window.onmessage = (event) => {
  // event.source === window means the message is coming from the preload
  // script, as opposed to from an <iframe> or other source.
  if (event.source === window && event.data === 'main-world-port') {
    const [ port ] = event.ports
    // Once we have the port, we can communicate directly with the main
    // process.
    port.onmessage = (event) => {
      console.log('from main process:', event.data)
      port.postMessage(event.data * 2)
    }
  }
}
</script>
```

[context isolation]: context-isolation.md
[`ipcRenderer. ostMessage`]: ../api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer
[`WebContents.postMessage`]: ../api/web-contents.md#contentspostmessagechannel-message-transfer
[`MessagePortMain`]: ../api/message-port-main.md
[`MessageChannelMain`]: ../api/message-channel-main.md
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
