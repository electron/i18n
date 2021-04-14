# ipcMain

> Kommunizieren Sie asynchron vom Hauptprozess zu Rendererprozessen.

Prozess: [Main](../glossary.md#main-process)

Das `ipcMain` -Modul ist ein [Event Emitter][event-emitter]. Bei Verwendung im Hauptprozess verarbeitet es asynchrone und synchrone Nachrichten, die von einem Renderer Prozess (Webseite) gesendet werden. Nachrichten, die von einem Renderer gesendet werden, werden an dieses -Modul gesendet.

## Senden von Nachrichten

Es ist auch möglich, Nachrichten vom Hauptprozess an den Renderer zu senden, Prozess zu senden, siehe [webContents.send][web-contents-send] für weitere Informationen.

* Beim Senden einer Nachricht ist der Ereignisname der `channel`.
* Um auf eine synchrone Nachricht zu antworten, müssen Sie `event.returnValue`festlegen.
* Um eine asynchrone Nachricht an den Absender zurückzusenden, können Sie `event.reply(...)`verwenden.  Diese Hilfsmethode verarbeitet automatisch Nachrichten , die von Frames stammen, die nicht der Hauptframe sind (z. B. iframes), während `event.sender.send(...)` immer an den Hauptframe gesendet wird.

Ein Beispiel für das Senden und Verarbeiten von Nachrichten zwischen dem Renderund und den wichtigsten Prozessen:

```javascript
Im Hauptprozess.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => '
  console.log(arg) / prints 'ping'
  event.reply('asynchronous-reply', 'pong')
')

ipcMain.on('synchrone-message', (event, arg

  .log
  > )
```

```javascript
Im Renderer-Prozess (Webseite).
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) / prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => '
  console.log(arg) / prints "pong"


```

## Methoden

Das `ipcMain` -Modul verfügt über die folgende Methode zum Abhören von Ereignissen:

### `ipcMain.on(Kanal, Listener)`

* `channel` String
* `listener` -Funktion
  * `event` IpcMainEvent
  * `...args` any[]

Hört `channel`, wenn eine neue Nachricht eintrifft, `listener` mit `listener(event, args...)`aufgerufen wird.

### `ipcMain.once(Kanal, Listener)`

* `channel` String
* `listener` -Funktion
  * `event` IpcMainEvent
  * `...args` any[]

Fügt eine einmalige `listener` Funktion für das Ereignis hinzu. Diese `listener` wird nur aufgerufen, wenn eine Nachricht das nächste Mal an `channel`gesendet wird, nach der sie entfernt wird.

### `ipcMain.removeListener(Kanal, Listener)`

* `channel` String
* `listener` -Funktion
  * `...args` any[]

Entfernt die angegebenen `listener` aus dem Listenerarray für die angegebene `channel`.

### `ipcMain.removeAlleListen([channel])`

* `channel` String (optional)

Entfernt Listener der angegebenen `channel`.

### `ipcMain.handle(Kanal, Listener)`

* `channel` String
* `listener` Funktion<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Fügt einen Handler für einen `invoke`fähigen IPC hinzu. Dieser Handler wird aufgerufen, wenn ein Renderer `ipcRenderer.invoke(channel, ...args)`aufruft.

Wenn `listener` ein Versprechen zurückgibt, wird das letztendliche Ergebnis des Versprechens als Antwort an den Remoteaufrufer zurückgegeben. Andernfalls wird der Rückgabewert des -Listeners als Wert der Antwort verwendet.

```js
Hauptprozess
ipcMain.handle('my-invokable-ipc', async (event, ... args) =>
  const result = warten einigePromise(... args)
  Rückgabeergebnis


/ / Renderer-Prozess
async () =>
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  / ...
}
```

Die `event` , die als erstes Argument an den Handler übergeben wird, entspricht dem , der an einen regulären Ereignislistener übergeben wurde. Sie enthält Informationen darüber, welche WebContents die Quelle der Aufrufanforderung ist.

### `ipcMain.handleOnce(Kanal, Listener)`

* `channel` String
* `listener` Funktion<Promise\<void> | any>
  * `event` IpcMainInvokeEvent
  * `...args` any[]

Behandelt eine einzelne `invoke`fähige IPC-Nachricht und entfernt dann den Listener. Siehe `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(Kanal)`

* `channel` String

Entfernt alle Handler für `channel`, falls vorhanden.

## IpcMainEvent-Objekt

Die Dokumentation für das `event` An das `callback` übergebene Objekt finden Sie in den [`ipc-main-event`](structures/ipc-main-event.md) Strukturdokumenten.

## IpcMainInvokeEvent-Objekt

Die Dokumentation für das `event` -Objekt, das an `handle` Rückrufe übergeben wurde, finden Sie in den [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) Strukturdokumenten.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
