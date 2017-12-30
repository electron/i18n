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

Después de obtener los archivos conectores, usted debe pasar la ruta de `widevinecdmadapter` a electron con el comando de cambio lineal `--widevine-cdm-path` y las versiones de los conectores con `--widevine-cdm-version`.

**Nota:** A pesar de que solamente el `widevinecdmadapter` binario es pasado a Electron, el `widevinecdm` binario tiene que ponerse al lado.

El comando de los interruptores de línea tiene que ser pasado antes que el `ready` del módulo de `app` sea emitido, y que la página que usa el conector tenga el conector activado.

Código de ejemplo:

```javascript
const {app, BrowserWindow} = require('electron')

// Tiene que pasa el nombre del archivo de`widevinecdmadapter` equí, es
// * `widevinecdmadapter.plugin` en macOS,
// * `libwidevinecdmadapter.so` en Linux,
// * `widevinecdmadapter.dll` en Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// La versión del conector puede ser obtenida de la página `chrome://plugins`en Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // El conector tiene que ser activado.
      plugins: true
    }
  })
  win.show()
})
```

## Verificando el Conector

Para verificar si el conector funciona, se pueden usar los siguientes métodos:

* Open devtools and check whether `navigator.plugins` includes the Widevine CDM plugin.
* Open https://shaka-player-demo.appspot.com/ and load a manifest that uses `Widevine`.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.