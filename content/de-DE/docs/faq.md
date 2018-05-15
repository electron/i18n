# Electron FAQ

## Warum habe ich Probleme bei der Installation von Elektron?

Beim Ausführen von `npm install electron` können bei einigen Nutzern gelegentlich Installationsfehler auftreten.

In fast allen Fällen sind diese Fehler das Ergebnis von Netzwerkproblemen und nicht von tatsächlichen Problemen mit dem Paket `electron` npm. Fehler wie `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` weisen alle auf ein Problem mit dem Netzwerk hin. The best resolution is to try switching networks, or wait a bit and try installing again.

Man kann auch versuchen, Electron direkt unter [electron/electron/releases](https://github.com/electron/electron/releases) herunterzuladen, falls die Installation über `npm` weiterhin fehlschlägt.

## Wann wird Electron auf die neueste Version von Chrome aktualisiert?

Die Chrome Version von Electron wird in der Regel innerhalb von ein oder zwei Wochen Implementiert nachdem eine neue stabile Version für Chrome veröffentlicht wird. Diese Schätzung kann nicht garantiert werden und hängt vom Arbeitsaufwand während der Aktualisierung ab.

Es wird nur der stabile Kanal von Chrome verwendet. Wenn sich ein wichtiger Fix im Beta- oder Dev-Channel befindet, werden wir ihn zurückportieren.

Weitere Informationen finden Sie in der [Einführung zur Sicherheit](tutorial/security.md).

## Wann wird Electron auf die neueste Version von Node.js upgraden?

Wenn eine neue Version von Node.js veröffentlicht wird, warten wir in der Regel etwa einen Monat vor dem Upgrade in Elektron. So können wir vermeiden, die häufigen Bugs in neuen Node.js Versionen mit in Electron einzubinden.

Neue Funktionalitäten von Node.js werden in der Regel durch V8 Upgrades ermöglicht. Da Electron das vom Chrome Browser mitgelieferte V8 verwendet, stehen die neuen JavaScript Funktionalitäten der neuen Node.js Version in der Regel bereits in Electron zur Verfügung.

## Wie kann man Daten zwischen Webseiten austauschen?

Um Daten zwischen Web-Seiten (Renderer-Prozesse) zu teilen, ist der einfachste Weg, HTML5-APIs zu verwenden, die bereits in Browsern zur Verfügung stehen. Gute Kandidaten sind [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`LocalStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) und [`SessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Oder Sie können das IPC-System verwenden, welches speziell für Electron ist, um Objekte in den Hauptprozess als eine globale Variable zu speichern und dann vom Renderer über die `remote`-Eigenschaft des `Elektrons` Moduls darauf zugreifen:

```javascript
// Im Main-Prozess.
global.sharedObject = {  
 someProperty: 'default value'
}
```

```javascript
// In Seite 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In Seite 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Mein App Fenster/Brett verschwand nach ein paar Minuten.

Dies geschieht, wenn die Variable, die verwendet wird, um das Fenster/Fach zu speichern, nur Unsinn aufnimmt.

Wenn dieses Problem auftritt, könnten die folgenden Artikel hilfreich sein:

* [Speicherverwaltung](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Geltungsbereich von Variablen](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Wenn Sie eine schnelle Lösung bevorzugen, machen Sie die Variablen global, indem Sie Ihren Code

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
 const tray = new Tray('/path/to/icon.png')
 tray.setTitle('hello world') 
})
```

wie folgt anpassen:

```javascript
const {app, Tray} = require('electron') 
let tray = null
app.on('ready', () => {
 tray = new Tray('/path/to/icon.png')
 tray.setTitle('hello world')
})
```

## Ich kann jQuery/RequireJS/Meteor/AngularJS in Electron nicht verwenden.

Wegen der Node.js Integration in Electron gibt es einige zusätzlich eingefügte Symbole im DOM wie `module`, `exports`, `require`. Das verursacht Probleme für einige Bibliotheken, da diese versuchen, Symbole mit den gleichen Namen einzufügen.

Um dies zu beheben können Sie die Node-Integration in Electron deaktivieren:

```javascript
// Im Hauptprozess.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
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

Und zwar deshalb, weil Sie das [npm `electron` module](https://www.npmjs.com/package/electron) entweder lokal oder global installiert haben, was das in Electron integrierte Modul überschreibt.

Um zu überprüfen, ob Sie das richtige integrierte Modul verwenden, können Sie den Pfad des `electron`-Moduls ausgeben lassen:

```javascript
console.log(require.resolve('electron'))
```

und kontrollieren ob es folgende Form hat:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

Wenn der Pfad wie `node_modules/electron/index.js` aussieht, dann können Sie entweder das npm `electron` Modul entfernen oder umbenennen.

```sh
npm uninstall electron
npm uninstall -g electron
```

Wenn Sie allerdings das integrierte Modul nutzen und trotzdem diesen Fehler bekommen, dann ist es sehr wahrscheinlich, dass Sie das Modul im falschen Prozess verwenden. Beispielsweise kann `electron.app` nur im Hauptprozess verwendet werden, während `electron.webFrame` nur im Renderer-Prozess verfügbar ist.