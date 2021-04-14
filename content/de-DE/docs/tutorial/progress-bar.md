# Fortschrittsanzeige in der Taskleiste (Windows, macOS, Unity)

## Übersicht

Eine Fortschrittsleiste ermöglicht es einem Fenster, dem Benutzer Fortschrittsinformationen bereitzustellen, ohne zum Fenster selbst wechseln zu müssen.

Unter Windows können Sie eine Taskleistenschaltfläche verwenden, um eine Fortschrittsleiste anzuzeigen.

![Windows-Fortschrittsleiste][1]

Unter macOS wird die Fortschrittsleiste als Teil des Dock-Symbols angezeigt.

![macOS-Fortschrittsleiste][2]

Unter Linux verfügt die grafische Unity-Oberfläche auch über eine ähnliche Funktion, mit der Sie die Fortschrittsleiste im Launcher angeben können.

![Linux-Fortschrittsleiste][3]

> HINWEIS: Unter Windows kann jedes Fenster seine eigene Fortschrittsleiste haben, während es unter macOS und Linux (Unity) nur einen Fortschrittsbalken für die Anwendung geben kann.

----

Alle drei Fälle werden von derselben API abgedeckt - der [`setProgressBar()`][setprogressbar] Methode, die auf einer Instanz von `BrowserWindow`verfügbar ist. Um Ihren Fortschritt anzuzeigen, rufen Sie diese Methode mit einer zwischen `0` und `1`auf. Wenn Sie z. B. eine lang andauernde Aufgabe haben, die derzeit bei 63 % ist, würden Sie sie als `setProgressBar(0.63)`bezeichnen.

Festlegen des Parameters auf negative Werte (z.B. `-1`) entfernt den Fortschritt Balken, während er auf Werte von mehr als `1` (z. B. `2`) schaltet die Fortschrittsleiste in den unbestimmten Modus (nur Windows -- sie klemmt auf 100% andernfalls). In diesem Modus bleibt ein Fortschrittsbalken aktiv, zeigt jedoch keinen tatsächlichen Prozentsatz an. Verwenden Sie diesen Modus für Situationen, in denen Sie nicht wissen, wie lange ein Vorgang dauert.

Weitere Optionen und Modi finden Sie in der [-API-Dokumentation][setprogressbar].

## Beispiel

Beginnend mit einer funktionierenden Anwendung aus dem [Quick Start Guide](quick-start.md), fügen Sie folgende Zeilen in die `main.js` Datei ein:

```javascript fiddle='docs/fiddles/features/progress-bar'
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

Nach dem Starten der Electron-Anwendung sollte die Leiste in Dock (macOS) oder Taskleiste (Windows, Unity) angezeigt werden, die den Fortschritt Prozentsatz angibt, den Sie gerade definiert haben.

![macOS Dock-Fortschrittsleiste](../images/dock-progress-bar.png)

Für macOS wird die Fortschrittsleiste auch für Ihre Anwendung angezeigt, wenn sie [Mission Control](https://support.apple.com/en-us/HT204100)verwenden:

![Missionskontroll-Fortschrittsleiste](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
