# Nachrichtenanschlüsse in Electron

[`Nachrichtschluss`][]ist ein Kennzeichen von Internet, das die Nachrichte erlaubt durch verschiedene Texte einzugehen. Es ist wie `Fenster. Nachricht Post`, aber auf verschiedene Kanaelen. Das Ziel dieses Dokumentes ist zu beschreiben, wie Electron die Nachrichten einem Kanal uebertraegt, und Beispiele geben, wie Nachrichtschluesse in einem App verwenden.

Hier ist ein kurzes Beispiel, was ein Nachrichtschluss genau ist und seine Funktion:

```js
// Geraet.js ///////////////////////////////////////////////////////////////
//Nachrichtschluesse sind in Kuppeln geschaffen. Ein Kuppel von Nachrichtschluessen in Verbindung heisst
//Kanal.
dauernder. Kanal=neuer Nachrichtkanal()
//Der eigene Unterschied zwischen Schluss 1 und Schluss2 ist wie Sie sie verwenden. Nachrichte
//die dem Schluss1 gesendet sind, werden vom Schluss2 bekommen werden und umgekehrt.
const port1 = channel.port1
const port2 = channel.port2

/ / Es ist in Ordnung, eine Nachricht auf dem Kanal zu senden, bevor das andere Ende
/ einen Listener registriert hat. Nachrichten werden in die Warteschlange gestellt, bis ein Listener registriert ist.
port2.postMessage({ answer: 42 })

/ Hier senden wir das andere Ende des Kanals, Port1, an den Hauptprozess. Es ist
/ auch möglich, MessagePorts an andere Frames oder an Web Workers usw.
ipcRenderer.postMessage('port', null, [port1]) zu senden.
```

```js
main.js /////////////
//
ipcMain.on('port', (event) => '
  / Wenn wir einen MessagePort im Hauptprozess erhalten, wird er zu einem
  / MessagePortMain.
  const port = event.ports[0]

  / MessagePortMain verwendet die Node.js-artige Ereignis-API anstelle der
  /web-style events API. Also .on('message', ...) statt .onmessage = ...
  port.on('message', (event) => '
    / / daten ist { answer: 42 }
    const data = event.data
  ' )

  / MessagePortMain-Warteschlangennachrichten, bis die .start()-Methode aufgerufen wurde.
  port.start()
)
```

Die Dokumentation [Channel Messaging API][] ist eine hervorragende Möglichkeit, mehr darüber zu erfahren, wie MessagePorts funktioniert.

## MessagePorts im Hauptprozess

Im Renderer verhält sich die `MessagePort` -Klasse genau wie im Web. Der Hauptprozess ist jedoch keine Webseite – sie hat keine Blink-Integration – und sie nicht über die `MessagePort` oder `MessageChannel` Klassen verfügt. Um MessagePorts im Hauptprozess zu und mit ihnen zu interagieren, fügt Electron zwei neue Klassen hinzu: [`MessagePortMain`][] und [`MessageChannelMain`][]. Diese verhalten sich ähnlich wie die analogen Klassen im Renderer.

`MessagePort` Objekte können entweder im Renderer oder im Hauptprozess erstellt und mit den Methoden [`ipcRenderer.postMessage`][] und [`WebContents.postMessage`][] hin- und hergeleitet werden. Beachten Sie, dass die üblichen IPC-Methoden wie `send` und `invoke` nicht verwendet werden können, um `MessagePort`s zu übertragen, nur die `postMessage` Methoden können `MessagePort`s übertragen.

Wenn Sie `MessagePort`über den Hauptprozess übergeben, können Sie zwei Seiten verbinden, die sonst möglicherweise nicht kommunizieren können (z. B. aufgrund von Einschränkungen gleichen Ursprungs).

## Erweiterung: `close` -Ereignis

Electron fügt `MessagePort` eine Funktion hinzu, die nicht im Web vorhanden ist, um MessagePorts nützlicher zu machen. Das ist das `close` Ereignis, das ausgesendet wird, wenn das andere Ende des Kanals geschlossen wird. Ports können auch implizit geschlossen werden, indem Sie Garbage Collection sammeln.

Im Renderer können Sie das `close` -Ereignis entweder durch Zuweisen `port.onclose` oder durch Aufrufen `port.addEventListener('close', ...)`abhören. Im Hauptprozess können Sie das `close` -Ereignis abhören, indem Sie `port.on('close',
...)`aufrufen.

## Beispielanwendungsfälle

### Arbeitsprozess

In diesem Beispiel verfügt Ihre App über einen Arbeitsprozess, der als ausgeblendetes Fenster implementiert ist. Sie möchten, dass die App-Seite direkt mit dem Worker Prozess kommunizieren kann, ohne dass der Leistungsaufwand für die Weiterleitung über den Hauptprozess entsteht.

```js
main.js ////////
/
  
  > 

/ <canvas>, Audio, fetch(), etc.)
  const worker = new BrowserWindow('
    anzeigen: false,
    webPreferences: { nodeIntegration: true }
  ' )
  warten worker.loadFile('worker.html')

  / Das Hauptfenster sendet Arbeit an den Arbeitsprozess und erhält Ergebnisse
  / über einen MessagePort.
  const mainWindow = new BrowserWindow('
    webPreferences: { nodeIntegration: true }
  ')
  mainWindow.loadFile('app.html')

  / / Wir können hier ipcMain.handle() nicht verwenden, da die Antwort eine
  / MessagePort übertragen muss.
  ipcMain.on('request-worker-channel', (event) => '
    / Aus Sicherheitsgründen stellen wir sicher, dass nur die Frames, die wir erwarten,
    können / auf den Worker zugreifen können.
    if (event.senderFrame === mainWindow.webContents.mainFrame) -
      / Erstellen Eines neuen Kanals ...
      const { port1, port2 } = neue MessageChannelMain()
      / ... senden Sie ein Ende an den Arbeiter ...
      worker.webContents.postMessage('new-client', null, [port1])
      / ... und das andere Ende des Hauptfensters.
      event.senderFrame.postMessage('provide-worker-channel', null, [port2])
      / * Jetzt können das Hauptfenster und die Arbeitskraft miteinander kommunizieren
      / ohne den Hauptprozess durchlaufen zu müssen!
    •
  )
)
```

```html<!-- Worker.html ------------------------------------------------------------><script>
const { ipcRenderer } = require('electron')

Funktion doWork(input) -
  /
  rückgabeeingabe * 2


/ / Wir erhalten möglicherweise mehrere Clients, z. B. wenn mehrere Fenster vorhanden sind,
/ oder wenn das Hauptfenster neu geladen wird.
ipcRenderer.on('new-client', (event) => '
  const [ port ] = event.ports
  port.onmessage = (event) => '
    ... Die Ereignisdaten können ein beliebiges serialisierbares Objekt sein (und das Ereignis könnte sogar
    / andere MessagePorts mit sich führen!)
    const result = doWork(event.data)
    port.postMessage(result)

</script>

```

```html
<!-- app.html --------------------------------------------------------------->
<script>
const { ipcRenderer } = require('electron')

/ Wir bitten darum, dass der Hauptprozess uns einen Kanal sendet, den wir verwenden können
, um / / mit dem Arbeiter zu kommunizieren.
ipcRenderer.send('request-worker-channel')

ipcRenderer.once('provide-worker-channel', (event) => '
  / .
  const [ port ] = event.ports
  ... Registrieren eines Handlers, um Ergebnisse zu erhalten ...
  port.onmessage = (ereignis) =>
    konsole.log('received result:', event.data)
  '
  / ... und beginnen Sie, es zu senden arbeiten!
  port.postMessage(21)

</script>
```

### Antwort-Streams

Die integrierten IPC-Methoden von Electron unterstützen nur zwei Modi: Fire-and-forget (z. B. `send`) oder die Anforderungsbeantwortung (z. B. `invoke`). Mit MessageChannels können Sie einen "Antwortstream" implementieren, bei dem eine einzelne Anforderung mit einem Datenstrom antwortet.

```js
renderer.js //////////////
  
  

//////
  const { port1, port2 } = new MessageChannel()

  / / Wir senden ein Ende des Ports an den Hauptprozess ...
  ipcRenderer.postMessage(
    'give-me-a-stream',
    { element, count: 10 },
    [port2]
  )

  / ... und wir hängen am anderen Ende. Der Hauptprozess sendet Nachrichten
  / an das Ende des Ports und schließt sie, wenn er fertig ist.
  port1.onmessage = (ereignis) => -
    callback(event.data)
  -
  port1.onclose = () =>
    console.log('stream ended')
  -
-

makeStreamingRequest(42, (data) =>
  console.log('got response data:', event.data)


```

```js
main.js /////////////

//
  
  > /
  const [replyPort] = event.ports

  / Hier senden wir die Nachrichten synchron, aber wir könnten
  / den Port genauso einfach speichern und Nachrichten asynchron senden.
  für (let i = 0; i < msg.count; i++)
    replyPort.postMessage(msg.element)
  -


  / Dies ist nicht unbedingt notwendig - wenn wir
  , dass der Port nicht explizit geschlossen wurde, wäre es schließlich Müll
  / gesammelt, was auch das 'close'-Ereignis im Renderer auslösen würde.
  replyPort.close()

```

### Direkte Kommunikation zwischen dem Hauptprozess und der Hauptwelt einer kontextisolierten Seite

Wenn [Kontextisolation][] aktiviert ist, werden IPC-Nachrichten vom Hauptprozess, um den Renderer zu , an die isolierte Welt und nicht an die haupt Welt übermittelt. Manchmal möchtest du Botschaften direkt an die Hauptwelt übermitteln, ohne durch die isolierte Welt gehen zu müssen.

```js
main.js //////// { BrowserWindow, app, MessageChannelMain } 
//
  > 


/
  const bw = new BrowserWindow('
    webPreferences: '
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    '
  ')
  bw.loadURL('index.html')


  /
  const { port1, port2 } = new MessageChannelMain()

  / / Es ist IN Ordnung, eine Nachricht auf dem Kanal zu senden, bevor das andere Ende
  / registriert hat. Nachrichten werden in die Warteschlange eingereiht, bis ein Listener
  / registriert ist.
  port2.postMessage({ test: 21 })

  / / Wir können auch Nachrichten aus der Hauptwelt des Renderers empfangen.
  port2.on('message', (event) => '
    console.log('from renderer main world:', event.data)
  ')
  port2.start()

  / . .
  .
  bw.webContents.postMessage('main-world-port', null, [port1])

```

```js
preload.js ////////////


{ ipcRenderer } 
/ Wir erstellen dieses Versprechen in der Vorspannung, sodass es garantiert ist,
/ den onload-Listener zu registrieren, bevor das Load-Ereignis ausgelöst wird.
const windowLoaded = new Promise(resolve => -
  window.onload = resolve
))

ipcRenderer.on('main-world-port', async (event) => '
  warten windowLoaded

  /
  window.postMessage('main-world-port', '*', event.ports)
')
```

```html
<!-- index.html ------------------------------------------------------------->
<script>
window.onmessage = (ereignis) => '
  / 'event.source ===-Fenster bedeutet, dass die Nachricht vom Preload-
  /-Skript kommt, im Gegensatz zu einem <iframe> oder einer anderen Quelle.
  if (event.source === window && event.data === 'main-world-port') '
    const [ port ] = event.ports
    / . Sobald wir den Port haben, können wir direkt mit dem Hauptprozess
    // kommunizieren.
    port.onmessage = (ereignis) =>
      console.log('from main process:', event.data)
      port.postMessage(event.data * 2)
    '
  '
'
</script>
```

[Kontextisolation]: context-isolation.md
[`ipcRenderer.postMessage`]: ../api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer
[`WebContents.postMessage`]: ../api/web-contents.md#contentspostmessagechannel-message-transfer
[`MessagePortMain`]: ../api/message-port-main.md
[`MessageChannelMain`]: ../api/message-channel-main.md
[`Nachrichtschluss`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
