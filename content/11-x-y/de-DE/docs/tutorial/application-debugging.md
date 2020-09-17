# Anwendungs Debugging

Wann auch immer deine Electron App sich nicht so verhält wie gewünscht, dann stehen dir eine Vielzahl von Debugging-Tools zur Verfügung um Fehler im Code, einen Flaschenhals für die Pervormance oder Möglichkeiten zur Optimierung zu finden.

## Renderer-Prozess

Das umfassendste Tool zum Debuggen individueller Render-Pozesse ist das Chromium Developer Toolset. Das Toolset steht zur Verfügung in allen Render-Prozessen, inklusive Instanzen von `BrowserWindow`, `BrowserView` und `WebView`. Du kannst diese programmatisch öffnen durch Aufruf der `openDevTools()` API auf `webContents` der Instanz:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()
```

Google bietet [ausgezeichnete Dokumentation für ihre Entwickler-Tools][devtools]. Wir empfehlen Ihnen, sich mit ihnen vertraut zu machen - sie sind in der Regel ein der leistungsstärksten Werkzeuge in jedem Werkzeuggurt von Electron Developer.

## Main-Prozess

Debugging des Main-Prozess ist etwas schwieriger, denn du kannst die Developer Tools hier nicht öffnen. Die Chromium Developer Tools können verwendet werden um [Electrons Main-Prozess zu Debuggen][node-inspect] dank einer engen Zusammenarbeit zwischen Google / Chrome und Node.js. Du wirst aber vielleicht auch auf Eigenartiges stoßen, so ist `require` zum Beispiel nicht verfügbar in der Console.

Für weitere Informationen, ließ einfach die [Debugging des Main-Prozess][main-debug] Dokumentation.

## V8 Abstürze

Wenn der V8-Kontext abstützen sollte, wird folgende Nachricht in DevTools angezeigt:

`DevTools was disconnected from the page. Once page is reloaded, DevTools will automatically reconnect.`

Chromium Logs können durch das Einstellen der Umgebungsvariabel `ELECTRON_ENABLE_LOGGING` aktiviert werden. Weitere Informationen könenn in der [Dokumentation zu den Umgebungsvariablen](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging) gefunden werden.

Alternativ kann dies aber auch durch das Argument `--enable-logging` im Terminal aktiviert werden. Weitere Informationen hierzu kann in der [Dokumentation der Konsolen-Argumente](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging) gefunden werden.

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
