# Używanie Pluginu Pepper Flash

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Przygotuj kopię wtyczki Flash

Na macOS i Linux, szczegóły wtyczki Pepper Flash można znaleźć nawigując do `chrome://flash` w przeglądarce Chrome. Jego położenie i wersja są przydatne dla wsparcia Pepper Flash Electrona. Możesz również skopiować to do innej lokalizacji.

## Dodaj Electron Switch

Możesz bezpośrednio dodać `--ppapi-flash-path` i `--ppapi-flash-version` do wiersza poleceń Electron lub używając aplikacji `. metoda ommandLine.appendSwitch` przed zdarzeniem gotowości aplikacji. Włącz również opcję `plugins` z `BrowserWindow`.

Na przykład:

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

Możesz również spróbować załadować ogólnosystemową wtyczkę Pepper Flash zamiast samodzielnie wysyłać pluginów, jego ścieżka może być odebrana przez połączenie `aplikacji. etPath('pepperFlashSystemPlugin')`.

## Włącz Flash Plugin w tagu `<webview>`

Dodaj atrybut `plugins` do tagu `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Rozwiązywanie problemów

Możesz sprawdzić, czy wtyczka Pepper Flash została załadowana przez sprawdzenie `navigator. luginy` w konsoli narzędzi devtoolów (chociaż nie możesz wiedzieć, czy ścieżka jest poprawna).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

W przypadku niektórych operacji, takich jak streaming multimedialny przy użyciu RTMP, konieczne jest przyznanie szerszych uprawnień dla odtwarzaczy plików `.swf`. Jednym ze sposobów na osiągnięcie tego celu jest użycie [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
