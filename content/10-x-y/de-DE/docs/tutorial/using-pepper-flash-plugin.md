# Verwendung des Pepper Flash-Plugins

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Kopieren des Flash-Plugins vorbereiten

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://flash` in the Chrome browser. Der Standort und die Version sind nützlich für die Unterstützung von Electron's Pepper Flash. Du kannst es auch an einen anderen -Standort kopieren.

## Elektron-Schalter hinzufügen

Sie können `--ppapi-flash-path` und `--ppapi-flash-version` direkt zur Electron-Befehlszeile hinzufügen oder die `App verwenden. ommandLine.appendSwitch` Methode bevor die App fertig ist. Schalten Sie außerdem `Plugins` Option von `BrowserWindow` ein.

Ein Beispiel:

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Optional: Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.whenReady().then(() => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true
    }
  })
  win.loadURL(`file://${__dirname}/index.html`)
  // Something else
})
```

You can also try loading the system wide Pepper Flash plugin instead of shipping the plugins yourself, its path can be received by calling `app.getPath('pepperFlashSystemPlugin')`.

## Flash-Plugin in einem `<webview>` Tag aktivieren

`Plugins` Attribut zu `<webview>` Tag hinzufügen.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Problemlösungen

Sie können überprüfen, ob Pepper Flash Plugin geladen wurde, indem Sie den `Navigator untersuchen. lugins` in der Konsole von devtools (obwohl Sie nicht wissen können, ob der Pfad des Plugins korrekt ist).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

Unter Windows muss der Pfad, der an `--ppapi-flash-path` übergeben wurde, `\` als Pfad Trennzeichen verwenden und POSIX-Pfade verwenden, nicht funktionieren.

Für einige Operationen, wie zum Beispiel das Streaming von Medien mit RTMP, ist es notwendig, den Players `.swf` Dateien breitere Berechtigungen zu gewähren. Eine Möglichkeit, dies zu erreichen, ist, [nw-flash-trust](https://github.com/szwacz/nw-flash-trust) zu verwenden.
