# Ladění aplikace

Kdykoli se vaše Electron aplikace nechová tak, jak jste chtěli, soubor nástrojů pro ladění může pomoci najít chyby kódování, výkon úzká místa nebo optimalizovat příležitosti.

## Proces vykreslování

Nejkomplexnějším nástrojem pro ladění jednotlivých procesů vykreslování je Nástroj vývojáře Chromia. Je k dispozici pro všechny procesy renderer, včetně instancí `BrowserWindow`, `BrowserView`a `WebView`. je můžete programicky otevřít voláním `openDevTools()` API na `webContents` instance:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools() )
```

Google nabízí [vynikající dokumentaci pro své vývojářské nástroje](https://developer.chrome.com/devtools). Doporučujeme, abyste se s nimi seznámili - jsou obvykle jedním z nejsilnějších nástrojů v jakémkoliv nástrojovém pásu vývojáře Electronu.

## Hlavní proces

Ladění hlavního procesu je trochu trickerové, protože pro ně nemůžete otevřít vývojářské nástroje. Nástroje vývojáře Chromia lze [použít k ladění hlavního procesu](https://nodejs.org/en/docs/inspector/) díky užší spolupráci mezi Google / Chrome a Node. , ale můžete narazit na závody jako `vyžadují, aby` nebyly přítomny v konzoli.

Více informací naleznete v [ladění v dokumentaci hlavního procesu](./debugging-main-process.md).

## V8 havárie

Pokud dojde k pádu kontextu V8, DevTools zobrazí tuto zprávu.

`DevTools byl odpojen od stránky. Po obnovení stránky se DevTools automaticky znovu připojí.`

Chromové logy mohou být povoleny prostřednictvím proměnné prostředí `ELECTRON_ENABLE_LOGING`. For more information, see the [environment variables documentation](../api/environment-variables.md#electron_enable_logging).

Případně může být předán argument příkazové řádky `--enable-logging`. More information is available in the [command line switches documentation](../api/command-line-switches.md#--enable-logging).
