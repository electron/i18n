# Rahmenlose Fenster

> Öffne ein Fenster ohne Werkzeug/Symbolleiste, Ränder oder anderen grafischen Schnickschnack.

Ein rahmenloses Fenster ist ein Fenster ohne die üblichen [Bestandteile](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), wie Symbolleisten, die nicht Teil der Webseite sind. Die folgenden Optionen stehen in der Klasse [`BrowserWindow`](browser-window.md) zur Verfügung.

## Erstelle ein rahmenloses Fenster

Um ein rahmenloses Fenster zu erstellen musst du `frame` in den [BrowserWindow](browser-window.md) `Optionen` auf `false` setzen:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600, frame: false })
win.show()
```

### Alternativen auf macOS

Es gibt eine Alternative, um ein rahmenloses Fenster zu erhalten. Statt `frame` auf `false` zu setzen, welches sowohl die Titelleiste als auch die Schaltflächen entfernt, möchtest Du möglicherweise nur die Titelleiste entfernen, aber die Standard-Schaltflächen ("Amplelichter") behalten. Das kannst du erreichen indem du folgende `titleBarStyle`-Optionen verwendest:

#### `hidden`

Resultiert in eine versteckte Titelleiste und ein Inhaltsfenster der vollen Größe. Dennoch sind die Standard-Fensterkontrollen (Ampel) weiterhin vorhanden.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hidden' })
win.show()
```

#### `hiddenInset`

Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
win.show()
```

#### `customButtonsOnHover`

Uses custom drawn close, and miniaturize buttons that display when hovering in the top left of the window. The fullscreen button is not available due to restrictions of frameless windows as they interface with Apple's macOS window masks. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. This option is only applicable for frameless windows.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
win.show()
```

## Transparent window

Wenn Sie die Option `transparent` auf `true`setzen, können Sie auch das rahmenlose Fenster transparent machen:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ transparent: true, frame: false })
win.show()
```

### Einschränkungen

* Sie können nicht durch den transparenten Bereich klicken. Wir werden eine -API einführen, um fenster-Form festzulegen, um dieses Problem zu lösen, siehe [unser Problem](https://github.com/electron/electron/issues/1335) für Details.
* Transparente Fenster können nicht in der Geänderten Datei geändert werden. Wenn Sie `resizable` auf `true` festlegen, kann ein transparentes Fenster auf einigen Plattformen nicht mehr funktionieren.
* Der `blur` Filter gilt nur für die Webseite, so dass es keine Möglichkeit gibt, Unschärfeeffekt auf den Inhalt unterhalb des Fensters anzuwenden (d. h. andere Anwendungen, die auf system des Benutzers geöffnet sind).
* The window will not be transparent when DevTools is opened.
* On Windows operating systems,
  * transparent windows will not work when DWM is disabled.
  * transparent windows can not be maximized using the Windows system menu or by double clicking the title bar. The reasoning behind this can be seen on [this pull request](https://github.com/electron/electron/pull/28207).
* On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://bugs.chromium.org/p/chromium/issues/detail?id=369209) on Linux.
* On Mac, the native window shadow will not be shown on a transparent window.

## Click-Through-Fenster

Um ein Klickfenster zu erstellen, d. h. das Fenster dazu zu bringen, alle Ereignisse zu ignorieren, können Sie die [win.setIgnoreMouseEvents(ignore)][ignore-mouse-events] API aufrufen:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Weiterleitung

Das Ignorieren von Mausnachrichten macht die Webseite für die Mausbewegung unwissend, was bedeutet, dass , dass Mausbewegungsereignisse nicht emittiert werden. Unter Windows-Betriebssystemen kann ein optionaler Parameter verwendet werden, um Mausverschiebungsnachrichten an die Webseite weiterzuleiten, , sodass Ereignisse wie `mouseleave` ausgegeben werden können:

```javascript
const { ipcRenderer } = require('electron')
const el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
})
el.addEventListener('mouseleave', () => {
  ipcRenderer.send('set-ignore-mouse-events', false)
})

// Main process
const { ipcMain } = require('electron')
ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
  BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...args)
})
```

Dadurch wird die Webseite beim Überklicken `el`durchklickt und kehrt zu normalen außerhalb zurück.

## Draggable Region

Standardmäßig ist das rahmenlose Fenster nicht ziehbar. Apps müssen `-webkit-app-region: drag` in CSS angeben, um Electron mitzuteilen, welche Regionen (wie die Standardtitelleiste des Betriebssystems) ziehbar sind, und Apps können auch `-webkit-app-region: no-drag` verwenden, um den nicht ziehbaren Bereich aus dem ziehbaren Bereich auszuschließen. Beachten Sie, dass derzeit nur rechteckige Shapes unterstützt werden.

Hinweis: `-webkit-app-region: drag` ist bekannt, dass Probleme auftreten, während die Entwicklertools geöffnet sind. Weitere Informationen, einschließlich einer Problemumgehung, finden Sie in dieser [GitHub-Ausgabe](https://github.com/electron/electron/issues/3647) .

Um das gesamte Fenster ziehbar zu machen, können Sie `-webkit-app-region: drag` als `body`-Stil hinzufügen:

```html
<body style="-webkit-app-region: drag">
</body>
```

Und beachten Sie, dass, wenn Sie das ganze Fenster ziehbar gemacht haben, müssen Sie auch Schaltflächen als nicht ziehbar markieren, sonst wäre es für Benutzer unmöglich, auf sie zu klicken:

```css
button {
  -webkit-app-region: no-drag;
}
```

Wenn Sie nur eine benutzerdefinierte Titelleiste als ziehbar festlegen, müssen Sie auch alle Schaltflächen in der Titelleiste nicht ziehbar machen.

## Textauswahl

In einem rahmenlosen Fenster kann das Ziehen mit der Auswahl von Text in Konflikt stehen. Wenn Sie beispielsweise die Titelleiste ziehen, können Sie versehentlich den Text auf der Titelleiste auswählen. Um dies zu verhindern, müssen Sie die Textauswahl in einem ziehbaren Bereich wie folgt deaktivieren:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Kontextmenü

Auf einigen Plattformen wird der ziehbare Bereich als Nicht-Client-Frame behandelt, so dass , wenn Sie mit der rechten Maustaste darauf klicken, ein Systemmenü erscheint. Damit sich das Kontextmenü auf allen Plattformen korrekt verhält , sollten Sie niemals ein benutzerdefiniertes Kontextmenü auf ziehbaren Bereichen verwenden.

[ignore-mouse-events]: browser-window.md#winsetignoremouseeventsignore-options
