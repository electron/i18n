# Debugowanie aplikacji

Za każdym razem, gdy aplikacja Electron nie zachowuje się tak, jak chcesz, zestaw narzędzi do debugowania może pomóc w znalezieniu błędów kodowania, wydajności wąskich gardeł lub możliwości optymalizacji.

## Proces Renderowania

Najbardziej kompleksowym narzędziem do debugowania poszczególnych procesów renderowania jest zestaw narzędzi dla programistów Chromium. Jest on dostępny dla wszystkich procesów renderowania, w tym instancji `BrowserWindow`, `BrowserView`i `WebView`. możesz je otworzyć programowo wywołując `openDevTools()` API na `webContents` instancji:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools][devtools]. Zalecamy zapoznanie się z nimi - są one zazwyczaj jednym z najpotężniejszych narzędzi w pasach narzędzi Electron Developer.

## Proces Główny

Debugowanie głównego procesu jest nieco trudne, ponieważ nie możesz otworzyć dla nich narzędzi deweloperskich. The Chromium Developer Tools can [be used to debug Electron's main process][node-inspect] thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation][main-debug].

## Awarie V8

Jeśli kontekst V8 ulegnie awarii, DevTools wyświetli tę wiadomość.

`DevTools został odłączony od strony. Po przeładowaniu strony DevTools automatycznie połączy się ponownie.`

Chromium logs można włączyć za pomocą zmiennej środowiskowej `ELECTRON_ENABLE_LOGGING`. Aby uzyskać więcej informacji, zobacz [dokumentację zmiennych środowiskowych](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging).

Alternatywnie, argument wiersza poleceń `--enable-logging` może zostać przekazany. Więcej informacji jest dostępnych w [wierszach poleceń przełącza dokumentację](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging).

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
