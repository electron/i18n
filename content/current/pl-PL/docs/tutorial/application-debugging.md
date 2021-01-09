# Debugowanie aplikacji

Za każdym razem, gdy aplikacja Electron nie zachowuje się tak, jak chcesz, zestaw narzędzi do debugowania może pomóc w znalezieniu błędów kodowania, wydajności wąskich gardeł lub możliwości optymalizacji.

## Proces Renderowania

Najbardziej kompleksowym narzędziem do debugowania poszczególnych procesów renderowania jest zestaw narzędzi dla programistów Chromium. Jest on dostępny dla wszystkich procesów renderowania, w tym instancji `BrowserWindow`, `BrowserView`i `WebView`. możesz je otworzyć programowo wywołując `openDevTools()` API na `webContents` instancji:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()
```

Google oferuje [doskonałą dokumentację dla ich narzędzi programistycznych](https://developer.chrome.com/devtools). Zalecamy zapoznanie się z nimi - są one zazwyczaj jednym z najpotężniejszych narzędzi w pasach narzędzi Electron Developer.

## Proces Główny

Debugowanie głównego procesu jest nieco trudne, ponieważ nie możesz otworzyć dla nich narzędzi deweloperskich. Narzędzia dla programistów Chromium można [użyć do debugowania głównego procesu Electrona](https://nodejs.org/en/docs/inspector/) dzięki bliższej współpracy między Google / Chrome i Node. , ale możesz napotkać niechęci takie jak `wymagają, aby` nie było obecnych w konsoli.

Aby uzyskać więcej informacji, zobacz [Debugowanie dokumentacji głównego procesu](./debugging-main-process.md).

## Awarie V8

Jeśli kontekst V8 ulegnie awarii, DevTools wyświetli tę wiadomość.

`DevTools został odłączony od strony. Po przeładowaniu strony DevTools automatycznie połączy się ponownie.`

Chromium logs można włączyć za pomocą zmiennej środowiskowej `ELECTRON_ENABLE_LOGGING`. For more information, see the [environment variables documentation](../api/environment-variables.md#electron_enable_logging).

Alternatywnie, argument wiersza poleceń `--enable-logging` może zostać przekazany. More information is available in the [command line switches documentation](../api/command-line-switches.md#--enable-logging).
