# Online/Offline Ereigniserkennung

## Übersicht

[Online- und Offline-](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) -Erkennung kann im Renderer-Prozess mithilfe des [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) -Attributs implementiert werden, das Teil der Standard-HTML5-API ist.

Das `navigator.onLine` -Attribut gibt zurück:

* `false` , wenn alle Netzwerkanforderungen garantiert fehlschlagen (z. B. wenn die Verbindung zum Netzwerk getrennt wird).
* `true` in allen anderen Fällen.

Da viele Fälle `true`zurückgeben, sollten Sie mit Pflegesituationen falsch positive Ergebnisse behandeln, da wir nicht immer davon ausgehen können, dass `true` Wert bedeutet, , dass Electron auf das Internet zugreifen kann. In Fällen, in denen der Computer eine Virtualisierungssoftware mit virtuellen Ethernet-Adaptern im Zustand "immer verbunden" ausführt. Wenn Sie also den Internetzugriff Status von Electron ermitteln möchten, sollten Sie zusätzliche Mittel für diese Prüfung entwickeln.

## Beispiel

### Ereigniserkennung im Renderer-Prozess

Beginnen Sie mit einer funktionierenden Anwendung aus dem [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

```javascript
const { app, BrowserWindow } = require('electron')

onlineStatusWindow

app.whenReady().then() =>
  onlineStatusWindow = neues BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL('file://${__dirname}/index.html')
.
```

Fügen Sie in der `index.html` -Datei die folgende Zeile vor dem schließenden `</body>` -Tag hinzu:

```html
<script src="renderer.js"></script>
```

und fügen Sie die `renderer.js` Datei hinzu:

```javascript fiddle='docs/fiddles/features/online-detection/renderer'
const alertOnlineStatus = () => .alert(navigator.onLine ? 'online' : 'offline') '

window.addEventListener('online', alertOnlineStatus)
window.addEventListener('offline', alertOnlineStatus)

alertOnlineStatus()
```

Nach dem Start der Electron-Anwendung sollten Sie die Benachrichtigung sehen:

![Online-Offline-Ereigniserkennung](../images/online-event-detection.png)

### Ereigniserkennung im Hauptprozess

Es kann Situationen geben, in denen Sie auch auf Online-/Offline-Ereignisse in dem Hauptprozess reagieren möchten. Der Main-Prozess verfügt jedoch nicht über ein `navigator` -Objekt und kann diese Ereignisse nicht direkt erkennen. In diesem Fall müssen Sie die Ereignisse mithilfe der Interprozess- -Kommunikations-Dienstprogramme (IPC) von Electron an den Hauptprozess weiterleiten.

Beginnen Sie mit einer funktionierenden Anwendung aus dem [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
onlineStatusWindow

app.whenReady(
  > ). Höhe: 0, zeigen: false, webPreferences: { nodeIntegration: true } )
  onlineStatusWindow.loadURL('file://${__dirname}/index.html')
)

('online-status-changed', (ereignis, status) => '
  console.log(status)
')
```

Fügen Sie in der `index.html` -Datei die folgende Zeile vor dem schließenden `</body>` -Tag hinzu:

```html
<script src="renderer.js"></script>
```

und fügen Sie die `renderer.js` Datei hinzu:

```javascript fiddle='docs/fiddles/features/online-detection/main'
const { ipcRenderer } = require('electron')
const updateOnlineStatus = () => 'ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline') '

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```

Nach dem Starten der Electron-Anwendung sollte die Benachrichtigung in der Konsole angezeigt werden:

```sh
npm Start

> electron@1.0.0 Start /Electron
> Electron .

Online
```
