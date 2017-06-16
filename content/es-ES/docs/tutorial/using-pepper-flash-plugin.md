# Usando el Plugin de Flash de pimienta

Electrón es compatible con el plugin de Flash de pimienta. Para utilizar el plugin de Flash de pimienta en Electron, debe especificar manualmente la ubicación del plugin Flash de pimienta y habilítelo en su aplicación.

## Preparar una copia del Plugin de Flash

En macOS y Linux, los detalles del plugin Flash de pimiento pueden encontrarse navegando a ` chrome://plugins` en el navegador Chrome. Su ubicación y su versión son útiles para soporte Flash de pimienta del Electron. También puede copiar a otra ubicación.

## Añadir interruptor Electronico

Puede agregar directamente `--ppapi-flash-path` y `--ppapi-flash-version` a la línea de comando Electron o mediante el método `app.commandLine.appendSwitch` antes del evento ready de la aplicación. Además, activar la opción de `plugins` de `BrowserWindow`.

Por ejemplo:

```javascript
const {app, BrowserWindow} = ruta const require('electron') = require('path') / / especificar ruta flash, lo suponiendo que esté en el mismo directorio con main.js.
pluginName deje interruptor (process.platform) {caso 'win32': pluginName = 'pepflashplayer.dll' break case 'darwin': pluginName = 'PepperFlashPlayer.plugin' break case 'linux': pluginName = 'libpepflashplayer.so' break} app.commandLine.appendSwitch ('ppapi-flash-path', path.join (__dirname, pluginName)) / opcional: especificar la versión de flash, por ejemplo, v17.0.0.169 app.commandLine.appendSwitch ('ppapi-flash-versión ', '17.0.0.169') app.on ('listo', () => {dejó ganar = BrowserWindow nuevo ({ancho: 800, altura: 600, webPreferences: {
      plugins: true
    }}) win.loadURL ('file://${__dirname}/index.html') / / algo más})
```

También puedes cargar el plugin de Flash pimienta amplia de sistema en lugar de los plugins del envío usted mismo, su trayectoria puede ser recibida por llamar a</code>`app.getPath ('pepperFlashSystemPlugin').</p>

<h2>Activar el Plugin de Flash en una etiqueta de <code><webview>`</h2> 

Agregue el atributo de `plugins` etiqueta de `<webview>`.

```html
<webview src="http://www.adobe.com/software/flash/about/" plugins></webview>
```

## Problemas

Usted puede chequear si pimienta Flash plugin fue cargado por inspección`navigator.plugins` en la consola de devtools (aunque no se sabe si la ruta del plugin es correcta).

La arquitectura de plugin de destello de la pimienta tiene que coincidir con uno del Electron. En Windows, un error común es usar la versión de 32 bits del plugin de Flash contra la versión de 64 bits de Electron.

En Windows la ruta pasa a `--ppapi-flash-path` tiene que utilizar `` como delimitador, con rutas de estilo POSIX no funcionará.

Para algunas operaciones, como transmisiones en tiempo real usando RTMP, es necesario conceder más permisos a los archivos de `.swf` de los jugadores. Una forma de lograr esto, es usar flash-[nw-trust](https://github.com/szwacz/nw-flash-trust).