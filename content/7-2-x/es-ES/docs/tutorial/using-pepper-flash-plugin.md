# Uso del Plugin de Pepper Flash

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Prepare una copia del complemento Flash

En macOS y Linux, los detalles del plugin Pepper Flash pueden ser encontrado navegando a `chrome://flash` en el navegador Chrome. Su ubicación y versión son útiles para el soporte de Pepper Flash de Electron. También puedes copiarlo a otro ubicación.

## Agregar interruptor de Electron

Usted puede agregar directamente `--ppapi-flash-path` y `--ppapi-flash-version` a la línea de comando de Electron usando el método `app.commandLine.appendSwitch` antes evento ready de la aplicación. Además, activa la opción `plugins` de `BrowserWindow`.

Por ejemplo:

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Especifica la ruta a flash, suponiendo que es colocado en el mismo directorio con main.js.
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

// Opcional: Especifica la versión de flash, por ejemplo, v17.0.0.169
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
  // algo más
})
```

También puede intentar cargar el plugin de Pepper Flash en lugar de enviar los plugins usted mismo, su ruta puede ser recibida llamando a `app.getPath('pepperFlashSystemPlugin')`.

## Habilite el complemento Flash en una `<webview>` etiqueta

Agregue el atributo `plugins` al la etiqueta `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Problemas

Usted puede comprobar si el plugin Pepper Flasha sido cargado inspeccionando `navigator.plugins` en la consola devtools (aunque no se puede saber si la ruta del plugin es correcta).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

Para algunas operaciones, como streaming de medios usando RTMP, es necesario conceder permisos más amplios a los reproductores de archivos `.swf`. Una forma de lograr esto, es usar [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
