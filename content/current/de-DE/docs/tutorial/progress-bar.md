# Fortschrittsanzeige in der Taskleiste (Windows, macOS, Unity)

Unter Windows kann ein Taskleisten-Button verwendet werden, um einen Fortschrittsbalken anzuzeigen. This enables a window to provide progress information to the user without the user having to switch to the window itself.

Auf macOS wird der Fortschrittsbalken als Teil des Dock-Symbols angezeigt.

Der Unity DE hat auch eine ähnliche Funktion, mit der Sie den Fortschritt im Launcher angeben können.

__Fortschrittsbalken in Taskleiste:__

![Taskbar Fortschrittsleiste](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Alle drei Fälle werden von der gleichen API abgedeckt - die `setProgressBar()` Methode die auf Instanzen von `BrowserWindows` verfügbar ist. Rufen Sie es mit einer Nummer zwischen `0` und `1` auf, um Ihren Fortschritt anzuzeigen. Wenn Sie eine langwierige Aufgabe haben, die derzeit bei 63% zur Fertigstellung liegt, würden Sie sie mit `setProgressBar(0.63)` aufrufen.

Allgemein gesprochen Wenn der Parameter auf einen Wert unter Null gesetzt wird (wie `-1`) wird der Fortschrittsbalken entfernt, während er auf einen Wert höher als einen Wert gesetzt wird (wie `2`) wird der Fortschrittsbalken in den Zwischenmodus wechseln.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress-options).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```
