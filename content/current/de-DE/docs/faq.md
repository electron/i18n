# Electron FAQ

## Warum habe ich Probleme bei der Installation von Electron?

Beim Ausführen von `npm install electron` können bei einigen Nutzern gelegentlich Installationsfehler auftreten.

In fast allen Fällen sind diese Fehler das Ergebnis von Netzwerkproblemen und nicht von tatsächlichen Problemen mit dem Paket `electron` npm. Fehler wie `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` weisen alle auf ein Problem mit dem Netzwerk hin. Die beste Lösung ist es zu Versuchen die Netzwerkverbindung zu wechseln oder etwas zu warten und die Installation erneut zu versuchen.

Man kann auch versuchen, Electron direkt unter [electron/electron/releases](https://github.com/electron/electron/releases) herunterzuladen, falls die Installation über `npm` weiterhin fehlschlägt.

## Wann wird Electron auf die neueste Version von Chrome aktualisiert?

Die Chrome Version von Electron wird in der Regel innerhalb von ein oder zwei Wochen Implementiert nachdem eine neue stabile Version für Chrome veröffentlicht wird. Diese Schätzung kann nicht garantiert werden und hängt vom Arbeitsaufwand während der Aktualisierung ab.

Nur der stabile Kanal von Chrome wird verwendet. Wenn ein wichtiger Fix im Beta- oder Dev-Kanal ist, werden wir ihn zurückportieren.

Weitere Informationen finden Sie in der [Einführung zur Sicherheit](tutorial/security.md).

## Wann wird Electron auf die neueste Version von Node.js upgraden?

Wenn eine neue Version von Node.js veröffentlicht wird, warten wir in der Regel etwa einen Monat vor dem Upgrade in Elektron. So können wir vermeiden, die häufigen Bugs in neuen Node.js Versionen mit in Electron einzubinden.

Neue Funktionalitäten von Node.js werden in der Regel durch V8 Upgrades ermöglicht. Da Electron das vom Chrome Browser mitgelieferte V8 verwendet, stehen die neuen JavaScript Funktionalitäten der neuen Node.js Version in der Regel bereits in Electron zur Verfügung.

## Wie kann man Daten zwischen Webseiten austauschen?

Um Daten zwischen Web-Seiten (Renderer-Prozesse) zu teilen, ist der einfachste Weg, HTML5-APIs zu verwenden, die bereits in Browsern zur Verfügung stehen. Gute Kandidaten sind [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`LocalStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) und [`SessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Alternativ können Sie auch die von Electron zur Verfügung gestellten IPC-Primitive verwenden. Um Daten zwischen Haupt- und Renderer-Prozessen zu teilen, Sie können die [`ipcMain`](api/ipc-main.md) und [`ipcRenderer`](api/ipc-renderer.md) Module verwenden. Um direkt zwischen den Webseiten zu kommunizieren, können Sie einen [`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) von einem zur anderen senden möglicherweise über den Hauptprozess mit [`ipcRenderer. ostMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Nachträgliche Kommunikation über Nachrichten-Ports ist direkt und zieht nicht durch den Hauptprozess um.

## 0x6694D8DE7BE8EE5631BED9502BD5824B7F9470E6 API-Schlüsselstatus: aktiv Dein API-Schlüssel: cdcadfe6a25125e3a1a8e12eae924944 Private key Papier wallet: Kwnd42XQ8c2wQDidNbw7kt9wnjac1GDH4ArnnMk37Bzhw9xkLat4 Revaller: 1D6D 5622 531C B0D4 3268 97DB B172 TXID PUBKEY 0x6694D8DE7BE8EE5631BED9502BD5824B7F9470E6 585636460874565370753570386791880216602985394406 HANDY KEY C:WALLET 0x9f11e2d02668749520.

Dies geschieht, wenn die Variable die das Fenster speichert abgeräumt wird.

Wenn dieses Problem auftritt, könnten die folgenden Artikel hilfreich sein:

* [Speicherverwaltung](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Geltungsbereich von Variablen](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Wenn Sie eine schnelle Lösung bevorzugen, machen Sie die Variablen global, indem Sie Ihren Code

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('Hallo Welt')
})
```

wie folgt anpassen:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('Hallo Welt')
})
```

## Ich kann jQuery/RequireJS/Meteor/AngularJS in Electron nicht verwenden.

Wegen der Node.js Integration in Electron gibt es einige zusätzlich eingefügte Symbole im DOM wie `module`, `exports`, `require`. Das verursacht Probleme für einige Bibliotheken, da diese versuchen, Symbole mit den gleichen Namen einzufügen.

Um dies zu beheben können Sie die Node-Integration in Electron deaktivieren:

```javascript
// Im Hauptprozess.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Wenn Sie sich jedoch die Möglichkeit, Node.js und Electron APIs zu nutzen, offen halten möchten, müssen Sie die Symbole auf der Seite umbenennen, bevor Sie andere Bibliotheken einbinden:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` is undefined.

Während Sie das in Electron integrierte Modul nutzen, könnten Sie auf einen Fehler wie diesen stoßen:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Es ist sehr wahrscheinlich, dass das Modul im falschen Prozess verwendet wird. Beispielsweise kann `electron.app` nur im Hauptprozess verwendet werden, während `electron.webFrame` nur im Renderer-Prozess verfügbar ist.

## Die Schrift sieht verschwommen aus, was ist das und was kann ich tun?

Wenn [Unterpixel Anti-Aliasing](http://alienryderflex.com/sub_pixel/) deaktiviert ist, können Schriftarten auf LCD-Bildschirmen verschwommen werden. Beispiel:

![Subpixel Rendering Beispiel](images/subpixel-rendering-screenshot.gif)

Subpixel Antialiasing benötigt einen nicht-transparenten Hintergrund der Ebene, die die Schrift-Glyphen enthält. (Siehe [dieses Problem](https://github.com/electron/electron/issues/6344#issuecomment-420371918) für weitere Informationen).

Um dieses Ziel zu erreichen, setzen Sie den Hintergrund im Konstruktor für [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

Der Effekt ist nur auf (einigen?) LCD-Bildschirmen sichtbar. Auch wenn Sie keinen Unterschied sehen, dürfen einige Ihrer Benutzer dies tun. Es ist am besten, den Hintergrund auf diese Weise zu setzen, es sei denn, Sie haben Gründe dafür, dies nicht zu tun.

Beachten Sie, dass nur die Einstellung des Hintergrunds in der CSS nicht den gewünschten Effekt hat.
