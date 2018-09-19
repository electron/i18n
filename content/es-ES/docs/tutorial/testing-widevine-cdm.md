# Probando Widevine CDM

En Electron usted puede usar la librería de Widevine CDM conectado con el navegador Chrome.

## Obtener la librería

Abre `chrome://components/` en el navegador Chrome, encuentra `Widevine Content Decryption Module` y asegúrese de que esté actualizado, luego puede encontrar los archivos de la biblioteca desde el directorio de la aplicación.

### En Windows

El archivo de la librería `widevinecdm.dll` estará en el directorio `Program Files(x86)/Google/Chrome/Application/VERSIÓN_DE_CHROME/WidevineCdm/_platform_specific/win_(x86|x64)/`.

### En MacOS

El archivo de la librería `libwidevinecdm.dylib` estará en el directorio `/Applications/Google Chrome.app/Contents/Versions/VERSIÓN_DE_CHROME/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/`.

**Nota:** Asegúrese de que la versión de Chrome utilizada por Electron sea mayor o igual que el valor `min_chrome_version` del componente Widevine CDM de Chrome. El valor puede ser encontrado en `manifest.json` en el directorio `WidevineCdm`.

## Usando la librería

Después de obtener los archivos de la librería, usted debe pasar la ruta del archivo con el comando `--widevine-cdm-path` y la versión de la librería con `--widevine-cdm-version`. Los comandos deben ser pasados antes de que se emita el evento `ready` del módulo `app`.

Código de ejemplo:

```javascript
const { app, BrowserWindow } = require('electron')

// Tienes que pasar el directorio que contiene la biblioteca de widevine aquí, es
// * `libwidevinecdm.dylib` en macOS,
// * `widevinecdm.dll` en Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// La versión del plugin puede ser obtenida desde la página `chrome://plugins` en el navegador Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Verificando la compatibilidad de Widevine CDM

Para verificar si Widevine funciona, puede usar los siguientes métodos:

* Abrir https://shaka-player-demo.appspot.com/ y cargar un manifiesto que use `Widevine`.
* Abrir http://www.dash-player.com/demo/drm-test-area/, confirmar que la página diga `bitdash usa Widevine en su navegador`, luego reproducir el video.