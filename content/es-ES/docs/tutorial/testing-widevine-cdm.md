# Prueba CDM Widevine

En Electron usted puede usar la librería de Widevine CDM conectado con el navegador Chrome.

## Obtener la librería

Abre `chrome://components/` en el navegador Chrome, encuentra `Widevine Content Decryption Module` y asegúrese de que esté actualizado, luego puede encontrar los archivos de la biblioteca desde el directorio de la aplicación.

### En Windows

The library file `widevinecdm.dll` will be under `Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` directory.

### En MacOS

The library file `libwidevinecdm.dylib` will be under `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` directory.

**Note:** Make sure that chrome version used by Electron is greater than or equal to the `min_chrome_version` value of Chrome's widevine cdm component. The value can be found in `manifest.json` under `WidevineCdm` directory.

## Usando la librería

After getting the library files, you should pass the path to the file with `--widevine-cdm-path` command line switch, and the library's version with `--widevine-cdm-version` switch. The command line switches have to be passed before the `ready` event of `app` module gets emitted.

Código de ejemplo:

```javascript
const { app, BrowserWindow } = require('electron')

// Tienes que pasar el directorio que contiene la biblioteca de widevine aquí, es
// * `libwidevinecdm.dylib` en macOS,
// * `widevinecdm.dll` en Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// The version of plugin can be got from `chrome://plugins` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Verifying Widevine CDM support

To verify whether widevine works, you can use following ways:

* Abrir https://shaka-player-demo.appspot.com/ y cargar un manifiesto que use `Widevine`.
* Abrir http://www.dash-player.com/demo/drm-test-area/, confirmar que la página diga `bitdash usa Widevine en su navegador`, luego reproducir el video.