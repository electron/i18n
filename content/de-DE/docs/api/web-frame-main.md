# webFrameMain

> Steuern Sie Webseiten und iframes.

Prozess: [Main](../glossary.md#main-process)

Das `webFrameMain` Modul kann verwendet werden, um Frames über vorhandene [`WebContents`](web-contents.md) Instanzen hinweg zu suchen. Navigationsereignisse sind die häufigsten Anwendungsfall.

```javascript
const { BrowserWindow, webFrameMain } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://twitter.com')

win.webContents.on(
  'did-frame-navigate',
  (event, url, isMainFrame, frameProcessId, frameRoutingId) =>
    const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
    if (frame) -
      const-Code = 'document.body.innerHTML = document.body.innerHTML.replaceAll("heck", "h*ck")'
      frame.executeJavaScript(code)

  

```

Sie können auch auf Frames vorhandener Seiten zugreifen, indem Sie die `mainFrame` -Eigenschaft [`WebContents`](web-contents.md)verwenden.

```javascript
const { BrowserWindow } = require('electron')

async function main () '
  const win = new BrowserWindow({ width: 800, height: 600 })
  erwarten win.loadURL('https://reddit.com')

  const youtubeEmbeds = win.webContents.mainFrame .frames.filter((frame) => -
    versuchen Sie es mit
      const URL = new URL(frame.url)
      geben sie url.host === 'www.youtube.com'
    ' fangen {
      return false
    }
  '  ')


.log (youtubeEmbeds)

main()
```

## Methoden

Auf diese Methoden kann über das `webFrameMain` -Modul zugegriffen werden:

### `webFrameMain.fromId(processId, routingId)`

* `processId` Ganzzahl - Ein `Integer` , der die interne ID des Prozesses darstellt, dem der Frame gehört.
* `routingId` Ganzzahl - Ein `Integer` , der die eindeutige Frame-ID im aktuellen Rendererprozess darstellt. Routing-IDs können von `WebFrameMain` Instanzen abgerufen werden (`frame.routingId`) und werden auch von Frame- bestimmten `WebContents` Navigationsereignissen (z. B. `did-frame-navigate`).

Gibt `WebFrameMain | undefined` zurück : Ein Frame mit den angegebenen Prozess- und Routing-IDs, oder `undefined` , wenn den angegebenen IDs kein WebFrameMain zugeordnet ist.

## Klasse: WebFrameMain

Prozess: [Main](../glossary.md#main-process)

### Instanz Methoden

#### `frame.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.

Gibt `Promise<unknown>` zurück - Ein Versprechen, das mit dem Ergebnis des ausgeführten Codes aufgelöst wird oder abgelehnt wird, wenn die Ausführung ein abgelehntes Versprechen auslöst oder zu führt.

Bewertet `code` in Der Seite.

Im Browserfenster können einige HTML-APIs wie `requestFullScreen` nur durch eine Geste des Benutzers aufgerufen werden. Wenn Sie `userGesture` auf `true` festlegen, wird diese Einschränkung entfernt.

#### `frame.reload()`

Gibt `boolean` zurück : Gibt an, ob das erneute Laden erfolgreich initiiert wurde. Führt nur zu `false` , wenn der Rahmen keine Historie hat.

#### `frame.send(Kanal, ... args)`

* `channel` String
* `...args` any[]

Senden Sie eine asynchrone Nachricht über `channel`, zusammen mit Argumenten an den Rendererprozess. Argumente werden mit dem \[Structured Clone Algorithm\]\[SCA\]serialisiert, genau wie [`postMessage`][], sodass Prototypketten nicht werden. Beim Senden von Funktionen, Versprechen, Symbolen, WeakMaps oder WeakSets wird eine Ausnahme auslösen.

Der Rendererprozess kann die Nachricht verarbeiten, indem er `channel` mit dem [`ipcRenderer`](ipc-renderer.md) -Modul abhört.

#### `frame.postMessage(Kanal, Nachricht, [transfer])`

* `channel` String
* `message`
* `transfer` MessagePortMain[] (optional)

Senden Sie eine Nachricht an den Rendererprozess, wodurch optional der Besitz von Null oder mehr [`MessagePortMain`]-Objekten übertragen wird.

Die übertragenen `MessagePortMain` Objekte stehen im Renderer- Prozess zur Verfügung, indem sie auf die `ports` -Eigenschaft des emitted-Ereignisses zugreifen. Wenn sie im Renderer ankommen , sind sie systemeigene DOM- `MessagePort` -Objekte.

Ein Beispiel:

```js
Hauptprozess
const { port1, port2 } = neue MessageChannelMain()
webContents.mainFrame.postMessage('port', { message: 'hello' }, [port1])

/ Renderer-Prozess
ipcRenderer.on('port', (e, msg) => '
  const [port] = e.ports
  ...
})
```

### Instanz Eigenschaften

#### `frame.url` _Readonly_

Eine `string` , die die aktuelle URL des Frames darstellt.

#### `frame.top` _Readonly_

Eine `WebFrameMain | null` , die den oberen Rahmen in der Rahmenhierarchie darstellt, zu der `frame` gehört.

#### `frame.parent` _Readonly_

Ein `WebFrameMain | null` , der den übergeordneten Rahmen von `frame`darstellt, wäre die Eigenschaft `null` , wenn `frame` der oberste Frame in der Rahmenhierarchie ist.

#### `frame.frames` _Readonly_

Eine `WebFrameMain[]` Auflistung, die die direkten Nachkommen von `frame`enthält.

#### `frame.framesInSubtree` _Readonly_

Eine `WebFrameMain[]` Auflistung, die jeden Frame in der Unterstruktur von `frame`enthält, einschließlich sich selbst. Dies kann nützlich sein, wenn Sie alle Frames durchlaufen.

#### `frame.frameTreeNodeId` _Readonly_

Ein `Integer` , der die ID des internen FrameTreeNode- -Instanz des Frames darstellt. Diese ID ist browserglobal und identifiziert eindeutig einen Frame, der Inhalt hostet. Der Bezeichner wird bei der Erstellung des Rahmens fixiert und bleibt für die Lebensdauer des Rahmens konstant. Wenn der Rahmen entfernt wird, wird die ID nicht mehr verwendet.

#### `frame.name` _Readonly_

Eine `String` , die den Framenamen darstellt.

#### `frame.osProcessId` _Readonly_

Eine `Integer` , die das Betriebssystem `pid` des Prozesses darstellt, der diesen Frame besitzt.

#### `frame.processId` _Readonly_

Ein `Integer` , der die interne Chromium- `pid` des Prozesses darstellt, der diesen Rahmen besitzt. Dies ist nicht dasselbe wie die Betriebssystemprozess-ID; , um diese Verwendung `frame.osProcessId`zu lesen.

#### `frame.routingId` _Readonly_

Ein `Integer` , der die eindeutige Frame-ID im aktuellen Rendererprozess darstellt. Unterschiedliche `WebFrameMain` Instanzen, die auf denselben zugrunde liegenden Frame verweisen, haben die gleiche `routingId`.
