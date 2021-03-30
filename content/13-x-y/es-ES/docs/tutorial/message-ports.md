# MessagePorts en Electron

[`MessagePort`][]s son características web que permite pasar mensajes entre diferentes contextos. Es como `window.postMessage`, pero en diferentes canales. El objetivo de este documente este describir como Electron extiende el modelo de mensajería del canal, y dar algunos ejemplos de como puedes usar MessagePorts en tu aplicación.

Aquí un ejemplo muy breve de que es y como funciona un MessagePort:

```js
// renderer.js ///////////////////////////////////////////////////////////////
// MessagePorts son creados en pares. Un par conectado de message ports es 
// llamado un canal.
const channel = new MessageChannel()

// La única diferencia entre port1 y port2 está en como los usas. Mensajes
// enviado al port1 será recibido por el port2 y viceversa.
const port1 = channel.port1
const port2 = channel.port2

// Está bien enviar un mensaje en el canal antes de que el otro extremo haya registrado 
// un listener. Los mensajes se pondrán en cola hasta que se registre un oyente.
port2.postMessage({ answer: 42 })

// Aquí enviamos el otro extremo del canal, port1, al main process. Es
// además posible enviar MessagePorts a otros frames, o a Web Workers, etc.
ipcRenderer.postMessage('port', null, [port1])
```

```js
// main.js ///////////////////////////////////////////////////////////////////
// En el main process, recibimos el port.
ipcMain.on('port', (event) => {
  // Cuando recibimos un  MessagePort en el main process, este se convierte en  un
  // MessagePortMain.
  const port = event.ports[0]

  // MessagePortMain usa la API  Node.js-style events, en lugar de la  
  // API web-style events. Así .on('message', ...) en lugar de .onmessage = ...
  port.on('message', (event) => {
    // data es { answer: 42 }
    const data = event.data
  })

  // MessagePortMain pone en cola los mensajes hasta que el método .start() haya sido llamado.
  port.start()
})
```

La documentación de [Channel Messaging API][] es una gran manera para aprender más acerca de como funciona MessagePorts.

## MessagePorts en el main process

En el renderer, la clase `MessagePort` se comporta exactamente como lo hace en la web. El main process no es una página web, sin embargo no tiene un integración con Blink por lo tanto no tiene las clases `MessagePort` o `MessageChannel`. Para manejar e interactuar con MessagePorts en el main process, Electron agrega dos nuevas clases: [`MessagePortMain`][] y [`MessageChannelMain`][]. Estos se comportan se comportan de manera similar a las clases análogas en el renderer.

Los objetos `MessagePort` pueden ser creados en el renderer o en el main process, y pasar de un lado a otro usando los métodos [`ipcRenderer.postMessage`][] y [`WebContents.postMessage`][]. Tenga en cuenta que los métodos usuales de IPC tales como `send` y `invoke` no pueden ser usados para transferir los `MessagePort`, sólo los métodos `postMessage` pueden transferir los `MessagePort`.

Al pasar los `MessagePort` a través del main process, puedes conectar dos páginas que de otra forma no podrían comunicarse (p.ej. debido a restricciones del mismo origen).

## Extensión: evento `close`

Electron agrega una característica a `MessagePort` que no esta presente en la web, para poder hacer a MessagePorts más útil. Ese es el evento `close`, el cual es emitido cuando el otro extremo del canal está cerrado. Los puertos también pueden ser cerrados implícitamente al ser recolectados por el colector de basura.

En el renderer, puede usar el evento `close` ya sea asignando a `port.onclose` o llamando a `port.addEventListener('close', ...)`. En el main process, puedes escuchar por el evento `close` llamando a `port.on('close',
...)`.

## Ejemplo de casos de uso

### Worker process

En este ejemplo, tu aplicación tiene un worker process implementado como una ventana oculta. Quieres que la página de la aplicación sea capaz de comunicarse directamente con el worker process, sin la sobrecarga del rendimiento de la retransmisión a través del main process.

```js
// main.js ///////////////////////////////////////////////////////////////////
const { BrowserWindow, app, ipcMain, MessageChannelMain } = require('electron')

app.whenReady().then(async () => {
  // El worker process es una BrowserWindow oculta , así que tendrá acceso 
  // a un completo contexto  Blink  (incluyendo p. ej. <canvas>, audio, fetch(), etc.)
  const worker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true }
  })
  await worker.loadFile('worker.html')

  // La ventana principal enviará trabajo al  worker process y  recibe resultados
  // sobre un  MessagePort.
  const mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  })
  mainWindow.loadFile('app.html')

  // No podemos usar aquí ipcMain.handle(), porque la repuesta necesita transferir un 
  // MessagePort.
  ipcMain.on('request-worker-channel', (event) => {
    // Por razones de seguridad, vamos a asegurarnos que sólo los frames que esperamos puedan
    // acceder al worker.
    if (event.senderFrame === mainWindow.webContents.mainFrame) {
      // Crea un nuevo canal ...
      const { port1, port2 } = new MessageChannelMain()
      // ... envia un extremo al  worker ...
      worker.webContents.postMessage('new-client', null, [port1])
      // ... y el otro extremo al  main window.
      event.senderFrame.postMessage('provide-worker-channel', null, [port2])
      // Ahora el  main window y el  worker pueden comunicarse entre si
      // sin pasar a través del main process!
    }
  })
})
```

```html
<!-- worker.html ------------------------------------------------------------>
<script>
const { ipcRenderer } = require('electron')

function doWork(input) {
  // Algo intensivo para el cpu.
  return input * 2
}

// Podríamos obtener varios clientes, por ejemplo, si hay varias ventanas,
// o si se recarga el main window.
ipcRenderer.on('new-client', (event) => {
  const [ port ] = event.ports
  port.onmessage = (event) => {
    // Los datos del evento puede ser cualquier objeto serializable (y el evento podría incluso 
    // llevar otro  MessagePorts con él!)
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

// Solicitamos que el main process nos envié un canal que podamos usar 
// para comunicarnos con el worker.
ipcRenderer.send('request-worker-channel')

ipcRenderer.once('provide-worker-channel', (event) => {
  // Una vez que recibimos la repuesta, podemos tomar el puerto...
  const [ port ] = event.ports
  // ... registra un manejador para recibir resultados ...
  port.onmessage = (event) => {
    console.log('received result:', event.data)
  }
  // ... y empieza a enviar funciona!
  port.postMessage(21)
})
</script>
```

### Flujo de repuestas

Los métodos IPC incorporados de Electron sólo soportan dos modos: dispara-y-olvida (p. ej. `send`), o solicitud-respuesta (p. ej. `invoke`). Al usar MessageChannels, puedes implementar un "flujo de respuesta", donde una simple solicitud se responda con un flujo de datos.

```js
// renderer.js ///////////////////////////////////////////////////////////////

function makeStreamingRequest (element, callback) {
  // MessageChannels livianos--es barato crear uno nuevo por cada solicitud.
  const { port1, port2 } = new MessageChannel()

  // Enviamos un extremo del por al  main process ...
  ipcRenderer.postMessage(
    'give-me-a-stream',
    { element, count: 10 },
    [port2]
  )

  // ... y nos aferramos al otro extremo. El  main process enviará mensajes
  // a su extremo del puerto, y lo cerrará cuando haya finalizado.
  port1.onmessage = (event) => {
    callback(event.data)
  }
  port1.onclose = () => {
    console.log('stream ended')
  }
}

makeStreamingRequest(42, (data) => {
  console.log('obtuve datos de respuesta:', event.data)
})
// Veremos "obtuve datos de respuesta: 42" 10 veces.
```

```js
// main.js ///////////////////////////////////////////////////////////////////

ipcMain.on('give-me-a-stream', (event, msg) => {
  // El renderer nos ha enviado un MessagePort que quiere que enviemos nuestra
  // respuesta sobre.
  const [replyPort] = event.ports

  // Aquí enviamos los mensajes sincrónicamente, pero podríamos almacenar fácilmente
  // el puerto y enviar mensajes de forma  asincróna.
  for (let i = 0; i < msg.count; i++) {
    replyPort.postMessage(msg.element)
  }

  // Cerramos el puerto cuando terminamos para indicar al otro extremo que
  // ya no enviaremos más mensajes. Esto no es estrictamente necesario--si nosotros
  // no cerramos explícitamente el puerto, eventualmente sería recogido
  // por el recolecto de basura, el cual además debería lanzar el evento  'close' en el renderer.
  replyPort.close()
})
```

### Comunicarse directamente entre el proceso principal y el mundo principal de una página aislada del contexto

Cuando [context isolation][] está activado, los mensajes IPC desde el main process al renderer son entregados al mundo aislado, en lugar que al mundo principal. Algunas veces quieres entregar mensajes al mundo principal directamente, sin tener que recorrer el mundo aislado.

```js
// main.js ///////////////////////////////////////////////////////////////////
const { BrowserWindow, app, MessageChannelMain } = require('electron')
const path = require('path')

app.whenReady().then(async () => {
  // Crear un  BrowserWindow con contextIsolation activado.
  const bw = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  bw.loadURL('index.html')

  // Estaremos enviando un extremo al  mundo principal  de
  // al contexto de la página aislada.
  const { port1, port2 } = new MessageChannelMain()

  // Está bien enviar un mensaje en el canal antes de que el otro extremo tenga 
  // registrado un listener. Los mensajes serán puestos en cola hasta que se registre un oyente.
  port2.postMessage({ test: 21 })

  // Además podemos recibir mensajes desde el mundo principal del  renderer.
  port2.on('message', (event) => {
    console.log('from renderer main world:', event.data)
  })
  port2.start()

  // El script de precarga recibirá este mensaje  IPC y transferirá el puerto 
  // al mundo principal.
  bw.webContents.postMessage('main-world-port', null, [port1])
})
```

```js
// preload.js ////////////////////////////////////////////////////////////////
const { ipcRenderer } = require('electron')

// Necesitamos esperar a que el mundo principal este listo para recibir el mensaje antes 
// de enviar el puerto. Creamos esta promesa en la pre-carga así que esta garantizado 
// para registrar el oyente de carga antes de que se dispare el evento de carga.
const windowLoaded = new Promise(resolve => {
  window.onload = resolve
})

ipcRenderer.on('main-world-port', async (event) => {
  await windowLoaded
  // Usamos un  window.postMessage normal para transferir el puerto desde el mundo aislado
  // al mundo principal.
  window.postMessage('main-world-port', '*', event.ports)
})
```

```html
<!-- index.html ------------------------------------------------------------->
<script>
window.onmessage = (event) => {
  // event.source === window quiere decir que el mensaje viene del script de 
  // precarga, a diferencia de un  <iframe> u otro origen.
  if (event.source === window && event.data === 'main-world-port') {
    const [ port ] = event.ports
    // Una vez que tenemos el puerto, podemos comunicarnos directamente con el man process.
    port.onmessage = (event) => {
      console.log('from main process:', event.data)
      port.postMessage(event.data * 2)
    }
  }
}
</script>
```

[context isolation]: context-isolation.md
[`ipcRenderer.postMessage`]: ../api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer
[`WebContents.postMessage`]: ../api/web-contents.md#contentspostmessagechannel-message-transfer
[`MessagePortMain`]: ../api/message-port-main.md
[`MessageChannelMain`]: ../api/message-channel-main.md
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
