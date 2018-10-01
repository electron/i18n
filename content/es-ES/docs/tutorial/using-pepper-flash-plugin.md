# Uso del Plugin de Pepper Flash

Electron es compatible con el complemento de Pepper Flash. Para usar el complemento de Pepper Flash en Electron, debe especificar manualmente la ubicación del complemento de Pepper Flash y luego habilitarlo en su aplicación.

## Prepare una copia del complemento Flash

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://flash` in the Chrome browser. Su ubicación y versión son útiles para el soporte de Pepper Flash de Electron. También puedes copiarlo a otro ubicación.

## Agregar interruptor de Electron

You can directly add `--ppapi-flash-path` and `--ppapi-flash-version` to the Electron command line or by using the `app.commandLine.appendSwitch` method before the app ready event. Also, turn on `plugins` option of `BrowserWindow`.

Por ejemplo:

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

app.on('ready', () => {
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

## Enable Flash Plugin in a `<webview>` Tag

Add `plugins` attribute to `<webview>` tag.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Problemas

You can check if Pepper Flash plugin was loaded by inspecting `navigator.plugins` in the console of devtools (although you can't know if the plugin's path is correct).

La arquitectura del complemento de Pepper Flash debe coincidir con la de Electron. En Windows, un error común es usar la versión de 32 bits del complemento Flash contra la versión de 64 bits de Electrón.

On Windows the path passed to `--ppapi-flash-path` has to use `` as path delimiter, using POSIX-style paths will not work.

For some operations, such as streaming media using RTMP, it is necessary to grant wider permissions to players’ `.swf` files. Una forma de lograr esto, es usar [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).