# Používání Pepper Flash Pluginu

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Připravte kopii Flash pluginu

Na macOS a Linuxu lze detaily Pepper Flash pluginu nalézt navigací na `chrome://flash` v prohlížeči Chrome. Jeho umístění a verze jsou užitečné pro podporu Pepper Flash Electronu. Můžete ji také zkopírovat na jiné umístění.

## Přidat Electron přepínač

You can directly add `--ppapi-flash-path` and `--ppapi-flash-version` to the Electron command line or by using the `app.commandLine.appendSwitch` method before the app ready event. Také zapněte `pluginy` možnost `BrowserWindow`.

Například:

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
