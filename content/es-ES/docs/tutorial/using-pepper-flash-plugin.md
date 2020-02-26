# Uso del Plugin de Pepper Flash

Electron es compatible con el complemento de Pepper Flash. Para usar el complemento de Pepper Flash en Electron, debe especificar manualmente la ubicación del complemento de Pepper Flash y luego habilitarlo en su aplicación.

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

También puede intentar cargar el plugin de Pepper Flash en lugar de enviar los plugins usted mismo, su ruta puede ser recibida llamando a `app.getPath('pepperFlashSystemPlugin')`.

## Habilite el complemento Flash en una `<webview>` etiqueta

Agregue el atributo `plugins` al la etiqueta `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Problemas

Usted puede comprobar si el plugin Pepper Flasha sido cargado inspeccionando `navigator.plugins` en la consola devtools (aunque no se puede saber si la ruta del plugin es correcta).

La arquitectura del complemento de Pepper Flash debe coincidir con la de Electron. En Windows, un error común es usar la versión de 32 bits del complemento Flash contra la versión de 64 bits de Electrón.

En Windows la ruta pasada a `--ppapi-flash-path` tiene que usar `` como delimitador de ruta, usando el estilo de rutas POSIX no funcionará.

Para algunas operaciones, como streaming de medios usando RTMP, es necesario conceder permisos más amplios a los reproductores de archivos `.swf`. Una forma de lograr esto, es usar [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).