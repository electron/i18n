# Usando el Plugin MDL Widevine

En Electron pueden usar el plugin de Widevine CDM con el navegador Chrome.

## Conseguir el plugin

Electrón no enviar con el plugin Widevine CDM por razones de licencia, para conseguirlo, es necesario instalar el navegador Chrome oficial primero, que debe coincidir con la arquitectura y la versión del cromo de la acumulación de electrones que usa.

**Note:** que la versión del navegador Chrome tiene que ser el mismo con la versión de cromo utilizada por el Electron, de lo contrario el plugin no funcionará aunque`navigator.plugins` demostraría que se ha cargado.

### Windows & macOS

Abra ` chrome://components/` en el navegador Chrome, encontrar `WidevineCdm` y asegúrese de que está actualizado, entonces usted puede encontrar todos los binarios del plugin en el directorio `APP_DATA/Google/Chrome/WidevineCDM/versión/_platform_specific/PLATFORM_ARCH/`.

`APP_DATA` es la ubicación del sistema de almacenamiento de datos de la aplicación en Windows es `%LOCALAPPDATA%`, en macOS ` ~ / Library/Support` de aplicación. `VERSION` es la cadena de versión del plugin Widevine CDM, como `1.4.8.866`. `PLATFORM` es `mac` o `win`. `ARCH` es `x86` o `x64`.

En Windows los archivos binarios necesarios son `widevinecdm.dll` y `widevinecdmadapter.dll`, en macOS son `libwidevinecdm.dylib` y `widevinecdmadapter.plugin`. Puede copiarlos en cualquier lugar que desee, pero tienen que poner juntos.

### Linux

En Linux que los binarios del plugin se envían junto con el navegador Chrome, se les pueden encontrar en `/opt/google/chrome`, los nombres de archivo son `libwidevinecdm.so` y `libwidevinecdmadapter.so`.

## Usando el plugin

Después de conseguir los archivos de plugin, debe pasar camino de la `widevinecdmadapter` Electron con `--interruptor de línea de comandos widevine-MDL-path` y la versión del plugin con `--widevine-MDL-version` interruptor.

**Note:** aunque sólo el `widevinecdmadapter` binario se pasa al Electron, el `widevinecdm` binario tiene que ponerlo a un lado.

Los interruptores de línea de comandos tienen que pasar antes del evento `ready` `app` módulo obtiene emitido, y la página que usa este plugin debe tener plugin activado.

Código de ejemplo:

```javascript
const {app, BrowserWindow} = require('electron') / / tienes que pasar el nombre de 'widevinecdmadapter' aquí, es / / * 'widevinecdmadapter.plugin' en macOS, / / * 'libwidevinecdmadapter.so' en Linux, / / * 'widevinecdmadapter.dll' en Windows.
app.commandLine.appendSwitch ('widevine-MDL-path', ' / path/to/widevinecdmadapter.plugin') / / la versión del plugin se puede conseguir desde 'chrome://plugins' página en Chrome.
app.commandLine.appendSwitch ('widevine-MDL-versión ', '1.4.8.866') dejó ganar = null app.on ('listo', () => {ganar = new BrowserWindow ({webPreferences: {/ / 'plugins' tiene que estar habilitado.
      plugins: true}}) win.show()})
```

## Verificar el plugin

Para comprobar si funciona el plugin, se puede utilizar después de maneras:

* Abrir las devtools y comprobar si `navigator.plugins` incluye el plugin Widevine CDM.
* Abra https://shaka-player-demo.appspot.com/ y cargar un manifiesto que utiliza`Widevine`.
* Abrir http://www.dash-player.com/demo/drm-test-area/, compruebe si la página dice `bitdash usa Widevine en su browser` y reproducir el vídeo.