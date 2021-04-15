# ipcRenderer

> Kommunizieren Sie asynchron von einem Rendererprozess zum Hauptprozess.

Prozess: [Renderer](../glossary.md#renderer-process)

Das `ipcRenderer` -Modul ist ein  [EventEmitter][event-emitter]. Es bietet einige Methoden, sodass Sie synchrone und asynchrone Nachrichten aus dem Render- -Prozess (Webseite) an den Hauptprozess senden können. Sie können auch Antworten aus dem Hauptprozess erhalten.

Codebeispiele finden Sie unter [ipcMain](ipc-main.md) .

## Methoden

Das `ipcRenderer` -Modul verfügt über die folgende Methode zum Abhören von Ereignissen und Senden von Nachrichten:

### `ipcRenderer.on(Kanal, Listener)`

* `channel` String
* `listener` Function
  * `event` IpcRendererEvent
  * `...args` any[]

Listens to `channel`, when a new message arrives `listener` would be called with `listener(event, args...)`.

### `ipcRenderer.once(Kanal, Listener)`

* `channel` String
* `listener` Function
  * `event` IpcRendererEvent
  * `...args` any[]

Fügt eine einmalige `listener` Funktion für das Ereignis hinzu. Diese `listener` wird nur aufgerufen, wenn eine Nachricht das nächste Mal an `channel`gesendet wird, nach der sie entfernt wird.

### `ipcRenderer.removeListener(Kanal, Listener)`

* `channel` String
* `listener` Function
  * `...args` any[]

Entfernt die angegebenen `listener` aus dem Listenerarray für die angegebene `channel`.

### `ipcRenderer.removeAllListeners(Kanal)`

* `channel` String

Entfernt alle Listener oder die der angegebenen `channel`.

### `ipcRenderer.send(Kanal, ... args)`

* `channel` String
* `...args` any[]

Senden Sie eine asynchrone Nachricht über `channel`zusammen mit Argumenten an den Hauptprozess. Argumente werden mit dem [Structured Clone Algorithm][SCA]serialisiert, genau wie [`window.postMessage`][], so dass Prototypketten nicht werden. Beim Senden von Funktionen, Versprechen, Symbolen, WeakMaps oder WeakSets wird eine Ausnahme auslösen.

> **HINWEIS:** Das Senden nicht standardmäßiger JavaScript-Typen wie DOM-Objekte oder speziellen Electron-Objekte löst eine Ausnahme aus.
> 
> Da der Hauptprozess keine Unterstützung für DOM-Objekte wie `ImageBitmap`, `File`, `DOMMatrix` usw. hat, können solche Objekte nicht über Electron-IPC an den Hauptprozess gesendet werden, da der Hauptprozess keine Möglichkeit hätte, sie zu dekodieren. Der Versuch, solche Objekte über IPC zu senden, führt zu einem Fehler.

Der Hauptprozess verarbeitet es, indem er auf `channel` mit dem [`ipcMain`](ipc-main.md) -Modul wartet.

Wenn Sie eine [`MessagePort`][] in den Hauptprozess übertragen müssen, verwenden Sie [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Wenn Sie eine einzelne Antwort vom Hauptprozess erhalten möchten, z. B. das Ergebnis eines Methodenaufrufs, sollten Sie [`ipcRenderer.invoke`](#ipcrendererinvokechannel-args)verwenden.

### `ipcRenderer.invoke(Kanal, ... args)`

* `channel` String
* `...args` any[]

Gibt `Promise<any>` zurück - Wird mit der Antwort aus dem Hauptprozess aufgelöst.

Senden Sie eine Nachricht an den Hauptprozess über `channel` und erwarten Sie ein Ergebnis asynchron. Argumente werden mit dem [Structured Clone Algorithm][SCA]serialisiert, genau wie [`window.postMessage`][], so dass Prototypketten nicht werden. Beim Senden von Funktionen, Versprechen, Symbolen, WeakMaps oder WeakSets wird eine Ausnahme auslösen.

> **HINWEIS:** Das Senden nicht standardmäßiger JavaScript-Typen wie DOM-Objekte oder speziellen Electron-Objekte löst eine Ausnahme aus.
> 
> Da der Hauptprozess keine Unterstützung für DOM-Objekte wie `ImageBitmap`, `File`, `DOMMatrix` usw. hat, können solche Objekte nicht über Electron-IPC an den Hauptprozess gesendet werden, da der Hauptprozess keine Möglichkeit hätte, sie zu dekodieren. Der Versuch, solche Objekte über IPC zu senden, führt zu einem Fehler.

Der Hauptprozess sollte auf `channel` mit [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener)hören.

Ein Beispiel:

```javascript
Renderer-Prozess
ipcRenderer.invoke('some-name', someArgument).then(result) => '
  / ...


/ Hauptprozess
ipcMain.handle('some-name', async (ereignis, someArgument) => '
  const result = warten doSomeWork(someArgument)
  Rückgabeergebnis
.
```

Wenn Sie eine [`MessagePort`][] in den Hauptprozess übertragen müssen, verwenden Sie [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Wenn Sie keine Antwort auf die Nachricht benötigen, sollten Sie [`ipcRenderer.send`](#ipcrenderersendchannel-args)verwenden.

### `ipcRenderer.sendSync(Kanal, ... args)`

* `channel` String
* `...args` any[]

Gibt `any` zurück - Der vom [`ipcMain`](ipc-main.md) -Handler zurückgesendete Wert.

Senden Sie eine Nachricht an den Hauptprozess über `channel` und erwarten Sie ein Ergebnis synchron. Argumente werden mit dem [Structured Clone Algorithm][SCA]serialisiert, genau wie [`window.postMessage`][], so dass Prototypketten nicht werden. Beim Senden von Funktionen, Versprechen, Symbolen, WeakMaps oder WeakSets wird eine Ausnahme auslösen.

> **HINWEIS:** Das Senden nicht standardmäßiger JavaScript-Typen wie DOM-Objekte oder speziellen Electron-Objekte löst eine Ausnahme aus.
> 
> Da der Hauptprozess keine Unterstützung für DOM-Objekte wie `ImageBitmap`, `File`, `DOMMatrix` usw. hat, können solche Objekte nicht über Electron-IPC an den Hauptprozess gesendet werden, da der Hauptprozess keine Möglichkeit hätte, sie zu dekodieren. Der Versuch, solche Objekte über IPC zu senden, führt zu einem Fehler.

Der Hauptprozess verarbeitet es, indem er mit [`ipcMain`](ipc-main.md) Modul auf `channel` , und Antworten abhört, indem `event.returnValue`.

> :warning: **WARNUNG**: Das Senden einer synchronen Nachricht blockiert den gesamten -Renderer-Prozess, bis die Antwort empfangen wird . Es ist viel besser, die asynchrone Version zu verwenden, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).

### `ipcRenderer.postMessage(Kanal, Nachricht, [transfer])`

* `channel` String
* `message`
* `transfer` MessagePort[] (optional)

Senden Sie eine Nachricht an den Hauptprozess, wodurch optional der Besitz von null oder mehr [`MessagePort`][] -Objekten übertragen wird.

Die übertragenen `MessagePort` Objekte werden im Hauptprozess als [`MessagePortMain`](message-port-main.md) Objekte verfügbar sein, indem sie auf die `ports` -Eigenschaft des emittierten Ereignisses zugreifen.

Ein Beispiel:

```js
Renderer-Prozess
const { port1, port2 } = neue MessageChannel()
ipcRenderer.postMessage('port', { message: 'hello' } [port1])

/ / Hauptprozess
ipcMain.on('port', (e, msg) => '
  const [port] = e.ports
  ...
})
```

Weitere Informationen zur Verwendung von `MessagePort` und `MessageChannel`finden Sie in der Dokumentation</a>

MDN .</p> 



### `ipcRenderer.sendTo(webContentsId, kanal, ... args)`

* `webContentsId` -Zahl
* `channel` String
* `...args` any[]

Sendet eine Nachricht an ein Fenster mit `webContentsId` über `channel`.



### `ipcRenderer.sendToHost(Kanal, ... args)`

* `channel` String
* `...args` any[]

Wie `ipcRenderer.send` , aber das Ereignis wird an das `<webview>` -Element in der Hostseite anstelle des Hauptprozesses gesendet.



## Ereignisobjekt

Die Dokumentation für das `event` An das `callback` übergebene Objekt finden Sie in den [`ipc-renderer-event`](structures/ipc-renderer-event.md) Strukturdokumenten.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`window.postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
