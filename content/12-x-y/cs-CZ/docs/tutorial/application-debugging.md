# Ladění aplikace

Kdykoli se vaše Electron aplikace nechová tak, jak jste chtěli, soubor nástrojů pro ladění může pomoci najít chyby kódování, výkon úzká místa nebo optimalizovat příležitosti.

## Proces vykreslování

Nejkomplexnějším nástrojem pro ladění jednotlivých procesů vykreslování je Nástroj vývojáře Chromia. Je k dispozici pro všechny procesy renderer, včetně instancí `BrowserWindow`, `BrowserView`a `WebView`. je můžete programicky otevřít voláním `openDevTools()` API na `webContents` instance:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools() )
```

Google offers [excellent documentation for their developer tools][devtools]. Doporučujeme, abyste se s nimi seznámili - jsou obvykle jedním z nejsilnějších nástrojů v jakémkoliv nástrojovém pásu vývojáře Electronu.

## Hlavní proces

Ladění hlavního procesu je trochu trickerové, protože pro ně nemůžete otevřít vývojářské nástroje. The Chromium Developer Tools can [be used to debug Electron's main process][node-inspect] thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation][main-debug].

## V8 havárie

Pokud dojde k pádu kontextu V8, DevTools zobrazí tuto zprávu.

`DevTools byl odpojen od stránky. Po obnovení stránky se DevTools automaticky znovu připojí.`

Chromové logy mohou být povoleny prostřednictvím proměnné prostředí `ELECTRON_ENABLE_LOGING`. Více informací naleznete v dokumentaci [proměnných prostředí](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging).

Případně může být předán argument příkazové řádky `--enable-logging`. Více informací je k dispozici v dokumentaci [příkazového řádku](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging).

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
