# Het gebruik maken van Pepper Flash Plugin

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Bereid een kopie van Flash Plugin voor

Op macOS en Linux kunnen de details van de Pepper Flash plugin worden gevonden door te navigeren naar `chrome://flash` in de Chrome-browser. De locatie en versie zijn handig voor ondersteuning van Pepper Flash van Electron. U kunt het ook kopiëren naar een andere locatie.

## Electron Switch toevoegen

Je kunt direct `--ppapi-flash-path` en `--ppapi-flash-version` toevoegen aan de Electron command line of met behulp van de `app. ommandLine.appendSwitch` methode voordat de app klaar is voor event. Schakel ook de optie `plugins` in van `BrowserWindow`.

Bijvoorbeeld:

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

U kunt ook proberen om het systeem brede Pepper Flash plugin te laden in plaats van verzending de plugins zelf, pad kan worden ontvangen door te bellen `app. etPath('pepperFlashSystemPlugin')`.

## Schakel Flash Plugin in in een `<webview>` Tag

Voeg `plugins` attribuut toe aan `<webview>` tag.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Probleemoplossen

U kunt controleren of Pepper Flash plugin is geladen door de navigator `te inspecteren. lugins` in de console van devtools (hoewel je niet weet of het pad van de plugin correct is).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

Voor sommige operaties, zoals streamingmedia met RTMP, is het nodig om meer toestemming te geven aan `.swf` bestanden van spelers. Een manier om dit te bereiken, is om [nw-flash-trust](https://github.com/szwacz/nw-flash-trust) te gebruiken.
