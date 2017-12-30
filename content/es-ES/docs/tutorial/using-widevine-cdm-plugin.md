# Uso del plugin MDL Widevine

En Electron usted puede usar el plugin de Widevine CDM conectado con el navegador Chrome.

## Conectándose

Electrón no entrega con conectores Widevine CDM por razones de licencia, para obtenerlo, necesita instalar la versión oficial del navegador Chrome primero, que debe coincidir con la arquitectura y la versión de Chrome que la su construcción en Electron usa.

**Nota:** La mayor versión del navegador Chrome tiene que ser la misma versión usada por Electron, de otra manera la conección no trabajará. `navigator.plugins` le mostrará que ha sido cargado.

### Windows & macOS

Abre `chrome://components/` en el navegador Chrome, encuentra `WidevineCdm` y asegurese de que está actualizada,, luego puede encontrar todos los conectores binarios del directorio `APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/`.

`APP_DATA` es la ubicación en el sistema designada para almacenar los datos de las aplicaciones, en windows es `%LOCALAPPDATA%`, on macOS it is `~/Library/Application Support`. `VERSION` es la cadena de versión del plugin Widevine CDM, como `1.4.8.866`. `PLATFORM` es `mac` o `win`. `ARCH` es `x86` o `x64`.

En Windows los requerimientos binarios son `widevinecdm.dll` y `widevinecdmadapter.dll`, en macOS son 0>libwidevinecdm.dylib</code> y `widevinecdmadapter.plugin`. Los puede copiar a cualquier lugar que quiera, pero tienen que estar juntos.

### Linux

En Linux los conectores binarios son entregados juntos con el navegador Chrome, los puede encontrar por `/opt/google/chrome`, los nombres de los archivos son `libwidevinecdm.so` y `libwidevinecdmadapter.so`.

## Usando los conectores

After getting the plugin files, you should pass the `widevinecdmadapter`'s path to Electron with `--widevine-cdm-path` command line switch, and the plugin's version with `--widevine-cdm-version` switch.

**Note:** Though only the `widevinecdmadapter` binary is passed to Electron, the `widevinecdm` binary has to be put aside it.

The command line switches have to be passed before the `ready` event of `app` module gets emitted, and the page that uses this plugin must have plugin enabled.

Example code:

```javascript
const {app, BrowserWindow} = require('electron')

// You have to pass the filename of `widevinecdmadapter` here, it is
// * `widevinecdmadapter.plugin` on macOS,
// * `libwidevinecdmadapter.so` on Linux,
// * `widevinecdmadapter.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// The version of plugin can be got from `chrome://plugins` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // The `plugins` have to be enabled.
      plugins: true
    }
  })
  win.show()
})
```

## Verifying the plugin

To verify whether the plugin works, you can use following ways:

* Open devtools and check whether `navigator.plugins` includes the Widevine CDM plugin.
* Open https://shaka-player-demo.appspot.com/ and load a manifest that uses `Widevine`.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.