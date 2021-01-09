# Debugowanie aplikacji

Za każdym razem, gdy aplikacja Electron nie zachowuje się tak, jak chcesz, zestaw narzędzi do debugowania może pomóc w znalezieniu błędów kodowania, wydajności wąskich gardeł lub możliwości optymalizacji.

## Proces Renderowania

Najbardziej kompleksowym narzędziem do debugowania poszczególnych procesów renderowania jest zestaw narzędzi dla programistów Chromium. Jest on dostępny dla wszystkich procesów renderowania, w tym instancji `BrowserWindow`, `BrowserView`i `WebView`. możesz je otworzyć programowo wywołując `openDevTools()` API na `webContents` instancji:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools][devtools]. Zalecamy zapoznanie się z nimi - są one zazwyczaj jednym z najpotężniejszych narzędzi w pasach narzędzi Electron Developer.

## Proces Główny

Debugowanie głównego procesu jest nieco trudne, ponieważ nie możesz otworzyć dla nich narzędzi deweloperskich. The Chromium Developer Tools can [be used to debug Electron's main process][node-inspect] thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation][main-debug].

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
