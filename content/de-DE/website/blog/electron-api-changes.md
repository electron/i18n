---
title: API-Änderungen kommen in Electron 1.0
author: zcbenz
date: '2015-11-17'
---

Seit dem Anfang von Electron, beginnend mit der Zeit als Atom-Shell, wir haben mit der Bereitstellung einer netten, plattformübergreifenden JavaScript-API für Chromiums Inhaltsmodul und native GUI-Komponenten experimentiert. Die APIs begannen sehr organisch und im Laufe der Zeit haben wir einige Änderungen zur Verbesserung der ursprünglichen Designs.

---

Mit Electron gearing up for a 1.0 release, möchten wir die Gelegenheit nutzen, um Änderungen vorzunehmen, indem wir die letzten niggling API Details ansprechen. Die unten beschriebenen Änderungen sind in **0.35 enthalten.**, mit den alten APIs, die Veraltungswarnungen melden, damit Sie über die zukünftige Version 1.0 auf dem Laufenden bleiben können. Ein Electron 1.0 wird für ein paar Monate nicht mehr verfügbar sein, daher haben Sie einige Zeit, bevor diese Änderungen abbrechen.

## Veraltungswarnungen

Standardmäßig werden Warnungen angezeigt, wenn Sie veraltete APIs verwenden. Um sie auszuschalten, können Sie `process.noDeprecation` auf `true` setzen. Um die Quellen der veralteten API-Nutzung zu verfolgen, können Sie `Prozess festlegen. hrowDeprecation` bis `true` , um Ausnahmen zu erzeugen, anstatt Warnungen auszugeben, oder `Prozess setzen. raceDeprecation` bis `true` , um die Spuren der deprecations auszudrucken.

## Neue Möglichkeit, integrierte Module zu verwenden

Built-in modules are now grouped into one module, instead of being separated into independent modules, so you can use them [without conflicts with other modules](https://github.com/electron/electron/issues/387):

```javascript
var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

Die alte Methode von `require('app')` wird immer noch für Abwärtskompatibilität unterstützt, aber Sie können auch deaktivieren, wenn ausgeschaltet:

```javascript
require('electron').hideInternalModules()
require('app') // wirft einen Fehler auf.
```

## Eine einfachere Möglichkeit, das `Remote-` Modul zu verwenden

Da sich die Verwendung von eingebauten Modulen geändert hat, haben wir die Verwendung von Mainprozess-Side-Modulen im Renderer-Prozess vereinfacht. Sie können jetzt nur auf die Attribute von `zugreifen`um sie zu verwenden:

```javascript
// Neuer Weg.
var app = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

Anstatt lange benötigte Kette zu verwenden:

```javascript
// Alt.
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Das `ipc` Modul wird geteilt

Das `ipc` Modul existierte sowohl im Hauptprozess als auch im Renderer-Prozess und die API war auf jeder Seite anders was für neue Benutzer ziemlich verwirrend ist. Wir haben das Modul in `ipcMain` im Hauptprozess umbenannt und `ipcRenderer` im Renderer-Prozess, um Verwirrung zu vermeiden:

```javascript
// In main process.
var ipcMain = require('electron').ipcMain
```

```javascript
// Im Renderer-Prozess.
var ipcRenderer = require('electron').ipcRenderer
```

Und für das Modul `ipcRenderer` wurde beim Empfangen von Nachrichten ein zusätzliches `Event` Objekt hinzugefügt um zu stimmen wie Nachrichten in `ipcMain` Modulen behandelt werden:

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## Standardisierung `BrowserWindow` Optionen

Die `BrowserWindow` Optionen hatten unterschiedliche Stile, basierend auf den Optionen anderer APIs, und waren in JavaScript wegen der `-` in den Namen etwas schwer zu verwenden. Sie sind nun auf die traditionellen JavaScript-Namen standardisiert:

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Einhaltung der DOM-Konventionen für API-Namen

Die API-Namen in Electron bevorzugen camelCase für alle API-Namen, wie `Url` bis `URL`, aber das DOM hat seine eigenen Konventionen und sie bevorzugen `URL` bis `Url`, während der Verwendung von `Id` statt `ID`. Wir haben die folgenden API-Umbenennungen gemacht, um den Stil des DOMs zu berücksichtigen:

* `Url` wurde in `URL umbenannt`
* `Csp` wird in `CSP` umbenannt

Aufgrund dieser Änderungen werden Sie bei der Verwendung von Electron v0.35.0 für Ihre App viele Verwirrungen bemerken. Eine einfache Möglichkeit, sie zu beheben, ist alle Instanzen von `Url` durch `URL` zu ersetzen.

## Ändert den Ereignisnamen von `Tray`

Der Stil des `Tray` Ereignis-Namens war etwas anders als andere Module, so dass ein Umbenennen durchgeführt wurde, um es den anderen anzupassen.

* `angeklickt` wurde umbenannt in `klicken`
* `Doppelklick` wurde umbenannt in `Doppelklick`
* `Rechtsklickt` wird umbenannt zu `Rechtsklick`

