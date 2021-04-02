# remote

> Verwenden Sie die Hauptprozessmodule aus dem Rendererprozess.

Prozess: [Renderer](../glossary.md#renderer-process)

> ⚠️ WARNUNG ⚠️ Das `remote` -Modul ist</a>veraltet. Verwenden Sie anstelle von `remote` [`ipcRenderer`](ipc-renderer.md) und [`ipcMain`](ipc-main.md).</p> 
> 
> Lesen Sie hier mehr darüber, warum das `remote` -Modul veraltet ist [](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).
> 
> Wenn Sie `remote` trotz der Probleme mit der Leistung und Sicherheit weiterhin verwenden möchten, finden Sie weitere Informationen unter [@electron/Remote-](https://github.com/electron/remote).</blockquote> 
> 
> Das `remote` -Modul bietet eine einfache Möglichkeit, die prozessübergreifende Kommunikation (IPC) zwischen dem Rendererprozess (Webseite) und dem Hauptprozess zu verarbeiten.
> 
> In Electron sind GUI-bezogene Module (wie `dialog`, `menu` usw.) nur im Hauptprozess verfügbar, nicht im Renderer-Prozess. Um sie aus dem Rendererprozess zu verwenden, ist das `ipc` Modul erforderlich, um prozessübergreifende Nachrichten an den Hauptprozess zu senden. Mit dem `remote` -Modul können Sie Methoden des Hauptprozessobjekts aufrufen, ohne explizit prozessübergreifende Nachrichten zu senden, ähnlich wie Javas [RMI][rmi]. Ein Beispiel für das Erstellen eines Browserfensters aus einem Rendererprozess:
> 
> ```javascript
const { BrowserWindow } = require('electron').remote
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

**Hinweis:** Für die Rückseite (Zugriff auf den Renderer-Prozess aus dem Hauptprozess), Können Sie [webContents.executeJavaScript](web-contents.md#contentsexecutejavascriptcode-usergesture)verwenden.

**Hinweis:** Das Remotemodul kann aus Sicherheitsgründen in den folgenden Kontexten deaktiviert werden:

- [`BrowserWindow`](browser-window.md) - indem Sie die Option `enableRemoteModule` auf `false`.
- [`<webview>`](webview-tag.md) : Durch Festlegen des `enableremotemodule` -Attributs auf `false`.

## Remoteobjekte

Jedes Objekt (einschließlich Funktionen), das vom `remote` -Modul zurückgegeben wird, stellt ein Objekt im Hauptprozess dar (wir nennen es ein Remoteobjekt oder eine Remotefunktion). Wenn Sie Methoden eines Remoteobjekts aufrufen, eine Remotefunktion aufrufen oder ein neues Objekt mit dem Remotekonstruktor (Funktion) erstellen, senden Sie tatsächlich synchrone interprozessübergreifende Nachrichten.

Im obigen Beispiel waren sowohl [`BrowserWindow`](browser-window.md) als auch `win` Remoteobjekte, und `new BrowserWindow` erstellten kein `BrowserWindow` Objekt im Renderer- -Prozess. Stattdessen wurde ein `BrowserWindow` Objekt im Hauptprozess erstellt und das entsprechende Remoteobjekt im Rendererprozess zurückgegeben, nämlich das `win` -Objekt.

**Hinweis:** Nur [aufzählbare Eigenschaften][enumerable-properties] , die vorhanden sind, wenn auf das Remoteobjekt verwiesen wird, sind über die Fernbedienung zugänglich.

**Hinweis:** Arrays und Puffer werden über IPC kopiert, wenn über das `remote` -Modul zugegriffen wird. Wenn Sie sie im Rendererprozess ändern, werden sie im Hauptprozess nicht geändert und umgekehrt.

## Lebensdauer von Remoteobjekten

Electron stellt sicher, dass das entsprechende Objekt, das im Hauptprozess , nicht freigegeben wird, solange das entfernte Objekt im Renderer-Prozess Leben (d. h. nicht garbage collected) nicht freigegeben wird. Wenn das Remoteobjekt Garbage Collection wurde, wird das entsprechende Objekt im Hauptprozess dereferenziert.

Wenn das entfernte Objekt im Renderer-Prozess durchgesickert ist (z. B. in einer Karte gespeichert, aber nie freigegeben), wird auch das entsprechende Objekt im Hauptprozess undicht, daher sollten Sie sehr vorsichtig sein, keine entfernten Objekte zu durchsickern.

Primäre Werttypen wie Zeichenfolgen und Zahlen werden jedoch per Kopie gesendet.

## Übergeben von Callbacks an den Main-Prozess

Code im Hauptprozess kann Rückrufe vom Renderer akzeptieren - zum Beispiel das `remote` -Modul - aber Sie sollten äußerst vorsichtig sein, wenn Sie diese -Funktion verwenden.

Erstens werden die Rückrufe, die an den Hauptprozess übergeben werden, asynchron aufgerufen, um Deadlocks zu vermeiden. Sie sollten nicht erwarten, dass der Hauptprozess den Rückgabewert der übergebenen Rückrufe .

Sie können z. B. eine Funktion aus dem Rendererprozess in einem `Array.map` , der im Hauptprozess aufgerufen wird, nicht verwenden:

```javascript
// main process mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// renderer process
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [undefined, undefined, undefined], [2, 3, 4]
```

Wie Sie sehen können, war der synchrone Rückgabewert des Rendererrückrufs nicht wie erwartet und stimmte nicht mit dem Rückgabewert eines identischen Rückrufs überein, der im Hauptprozess lebt.

Zweitens bleiben die Rückrufe, die an den Hauptprozess übergeben werden, so lange bestehen, bis der Hauptprozess sie auf sammelt.

Beispielsweise scheint der folgende Code auf den ersten Blick unschuldig zu sein. Es installiert einen Rückruf für das `close` -Ereignis auf einem Remoteobjekt:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => '
  / / Fenster wurde geschlossen...
})
```

Aber denken Sie daran, dass der Rückruf vom Hauptprozess referenziert wird, bis Sie ihn explizit deinstallieren . Wenn Sie dies nicht tun, wird jedes Mal, wenn Sie Das Fenster neu laden, der Rückruf erneut installiert, wobei für jeden Neustart ein Rückruf ausläuft.

Erschwerend kommt hinzu, dass, da der Kontext zuvor installierter Rückrufe freigegeben wurde, Im Hauptprozess Ausnahmen ausgelöst werden, wenn das `close` -Ereignis ausgesendet wird.

Um dieses Problem zu vermeiden, stellen Sie sicher, dass Sie alle Verweise auf Rendererrückrufe bereinigen an den Hauptprozess übergeben werden. Dazu gehört das Bereinigen von Ereignishandlern oder , die sicherstellen, dass der Hauptprozess explizit angewiesen wird, Rückrufe zu dereferenzieren, die von einem Rendererprozess stammen, der beendet wird.

## Zugriff auf integrierte Module im Hauptprozess

Die integrierten Module im Hauptprozess werden als Getter im `remote` Modul hinzugefügt, so dass Sie sie direkt wie das `electron` Modul verwenden können.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## Methoden

Das `remote` Modul hat folgende Methoden:

### `remote.getCurrentWindow()`

Gibt [`BrowserWindow`](browser-window.md) zurück - Das Fenster, zu dem diese Webseite gehört.

**Hinweis:** Verwenden Sie `removeAllListeners` nicht auf [`BrowserWindow`](browser-window.md). Die Verwendung dieser kann alle [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) Listener entfernen, Klickereignisse auf Touchleistenschaltflächen deaktivieren und andere unbeabsichtigte Folgen.

### `remote.getCurrentWebContents()`

Gibt [`WebContents`](web-contents.md) zurück - Der Webinhalt dieser Webseite.

### `remote.getGlobal(name)`

* `name` String

Gibt `any` zurück - Die globale Variable von `name` (z. B. `global[name]`) im Hauptprozess .

## Eigenschaften

### `remote.require`

Eine `NodeJS.Require` Funktion, die `require(module)` im Hauptprozess entspricht. Module, die durch ihren relativen Pfad angegeben werden, werden relativ zum Einstiegspunkt des Hauptprozesses aufgelöst.

z.B.

```sh
project/
├── main
│   ├── foo.js
│   └── index.js
├── package.json
└── renderer
    └── index.js
```

```js
Hauptprozess: main/index.js
const { app } = require('electron')
app.whenReady().then()=>
```

```js
// some relative module: main/foo.js
module.exports = 'bar'
```

```js
// renderer process: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.process` _Readonly_

Ein `NodeJS.Process` Objekt.  Das `process` Objekt im Hauptprozess. Dies ist das gleiche wie `remote.getGlobal('process')` , wird aber zwischengespeichert.

[rmi]: https://en.wikipedia.org/wiki/Java_remote_method_invocation
[enumerable-properties]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
