# Používání Pepper Flash Pluginu

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Připravte kopii Flash pluginu

Na macOS a Linuxu naleznete detaily Pepper Flash pluginu navigací na `chrome://version` v prohlížeči Chrome. Jeho umístění a verze jsou užitečné pro podporu Pepper Flash Electronu. Můžete ji také zkopírovat na jiné umístění.

## Přidat Electron přepínač

You can directly add `--ppapi-flash-path` and `--ppapi-flash-version` to the Electron command line or by using the `app.commandLine.appendSwitch` method before the app ready event. Také zapněte `pluginy` možnost `BrowserWindow`.

Například:

```javascript
const { app, BrowserWindow } = require('electron')
cesta k pohodě = require('cesta')

// Zadejte cestu flashu, za předpokladu, že je umístěn do stejného adresáře s hlavním adresářem. s.
nechat pluginName
přepínat (process.platform) {
  případ 'win32':
    pluginName = 'pepflashplayer. ll'
    přestávka
  případ 'darwin':
    pluginName = 'PepperFlashPlayer. lugin"
    přestávka
  případ 'linux':
    pluginName = 'libpepflashplayer. o'
    přestávka
}
aplikace. ommandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Volitelně: Zadejte například verzi flashu, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.whenReady(). hen(() => {
  const win = new BrowserWindow({
    šířka: 800,
    výška: 600,
    webPreference: {
      plugins: true
    }
  })
  vyhraje. oadURL(`file://${__dirname}/index.html`)
  // Něco jiného
})
```

Můžete také zkusit načíst systémový doplněk Pepper Flash namísto odeslání pluginů sami, jeho cesta může být přijata voláním `aplikace. etPath('pepperFlashSystemPlugin')`.

## Povolit Flash plugin v `<webview>` tagu

Přidat `pluginy` atribut do tagu `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Odstranění problémů

Můžete zkontrolovat, zda byl Pepper Flash plugin načten prohlížením `navigátora. zavazadla` v konzoli devtools (i když nevíte, zda je cesta pluginu správná).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

Ve Windowsu k určení path`--ppapi-flash-path`musí být použit znak`\` jako oddělovač, ale jeho použití v POSIX-style nebude funkční.

U některých operací, jako jsou streamovací média používající RTMP, je nezbytné udělit hráčům větší oprávnění k souborům `.swf`. Jedním ze způsobů, jak toho dosáhnout, je použít [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
