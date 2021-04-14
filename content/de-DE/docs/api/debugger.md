## Klasse: Debugger

> Ein alternativer Transport für das Remote-Debuggingprotokoll von Chrome.

Prozess: [Main](../glossary.md#main-process)

Chrome Developer Tools verfügt über eine [spezielle Bindung][rdp] die zur Laufzeit von JavaScript verfügbar ist und die Interaktion mit Seiten und deren Instrumentierung ermöglicht.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

versuchen sie
  win.webContents.debugger.attach('1.1')
' catch (err) '
  console.log('Debugger attach failed: ', err)
'

win.webContents.debugger.on('detach', (ereignis.log
  > , grund)
')

win.webContents.debugger.on('message', (ereignis, method, params) => '
  if (Methode === 'Network.requestWillBeSent') -
    if (params.request.url === 'https://www.github.com') -
      win.webContents.debugger.detach()
    .
  .
.

.
```

### Instanz Events

#### Veranstaltung: 'ablösen'

Rückgabewert:

* `event` Event
* `reason` String - Grund für das Trennen des Debuggers.

Wird gesendet, wenn die Debugsitzung beendet wird. Dies geschieht entweder, wenn `webContents` geschlossen wird, oder wenn devtools für die angefügten `webContents`aufgerufen wird.

#### Ereignis: 'Nachricht'

Rückgabewert:

* `event` Event
* `method` String - Methodenname.
* `params` - Ereignisparameter, die durch das Attribut 'parameters' im Remote-Debugging-Protokoll definiert sind.
* `sessionId` String - Eindeutiger Bezeichner der angehängten Debugsitzung entspricht dem von `debugger.sendCommand`gesendeten Wert .

Wird angezeigt, wenn das Debugziel ein Instrumentationsereignis ausgibt.

### Instanz Methoden

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (optional) - Angeforderte Debugging-Protokollversion.

Fügt den Debugger an die `webContents`an.

#### `debugger.isAttached()`

Gibt `Boolean` zurück : Gibt an, ob ein Debugger an die `webContents`angefügt ist.

#### `debugger.detach()`

Detachiert den Debugger vom `webContents`.

#### `debugger.sendCommand(method[, commandParams, sessionId])`

* `method` String - Methodenname, sollte eine der Methoden sein, die vom [Remote-Debuggingprotokoll][rdp]definiert werden.
* `commandParams` jedes (optional) - JSON-Objekt mit Anforderungsparametern.
* `sessionId` String (optional) - Senden Sie den Befehl an das Ziel mit der zugeordneten Debugging-Sitzungs-ID. Der Anfangswert kann erhalten werden, indem [Target.attachToTarget][attachToTarget] Nachricht gesendet wird.

Gibt `Promise<any>` zurück - Ein Versprechen, das mit der durch definierten Antwort das Attribut "Returns" der Befehlsbeschreibung im Remote-Debuggingprotokoll auflöst oder abgelehnt wird, was auf den Fehler des Befehls hinweist.

Geben Sie den Befehl an das Debugziel.

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
