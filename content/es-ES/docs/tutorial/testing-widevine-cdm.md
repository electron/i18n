# Probando Widevine CDM

En Electron usted puede usar la librería de Widevine CDM conectado con el navegador Chrome.

Widevine Content Decryption Modules (CDMs) es la forma en que los servicios de streaming protegen el contenido utilizando vídeo HTML5 en los navegadores web sin depender de un plugin NPAPI como Flash o Silverlight. El soporte Widevine es un solución alternativa para los servicios de streaming que actualmente depende de Silverlight para la reproducción contenido de video protegidos por DRM. Esto permitirá a sitios web mostrar contenido de video protegidos con DRM en Firefox sin el uso de plugins NPAPI. El Widevine CDM corre en un sandbox open-source que proporciona mejor seguridad que los plugins NPAPI.

#### Nota sobre VMP

A partir de [`Electron v1.8.0 (Chrome v59)`](https://electronjs.org/releases#1.8.1), los siguientes pasos pueden ser sólo algunos de los pasos necesarios para habilitar Widevine; cualquier aplicación en o después de esa versión que pretenda usar el Widevine CDM puede necesitar firmarse utilizando una licencia obtenida de [Widevine](https://www.widevine.com/) en sí mismo.

Por [Widevine](https://www.widevine.com/):

> Chrome 59 (y superiores) incluyen soporte para Verified Media Path (VMP). VMP  proporciona un método para verificar la autenticidad de una plataforma de dispositivos. Para las implementaciones de navegadores, esto proporcionará una señal adicional para determinar si una implementación basada en navegador es fiable y segura.
> 
> La guía de integración del proxy ha sido actualizada con información acerca de VMP y como y cómo emitir licencias.
> 
> Widevine recomienda que nuestras integraciones basadas en el navegador (vendedores y aplicaciones basadas en el navegador) añadan soporte para VMP.

Para habilitar la reproducción de video con esta nueva restricción, ha sido creado [castLabs](https://castlabs.com/open-source/downstream/) un [fork](https://github.com/castlabs/electron-releases) que tiene implementado los cambios necesarios para habilitar Wedevine para ser reproducido en una aplicación Electron si uno ha obtenida las licencias necesarias desde widevine.

## Obtener la librería

Abre `chrome://components/` en el navegador Chrome, encuentra `Widevine Content Decryption Module` y asegúrese de que esté actualizado, luego puede encontrar los archivos de la biblioteca desde el directorio de la aplicación.

### En Windows

El archivo de la librería `widevinecdm.dll` estará en el directorio `Program Files(x86)/Google/Chrome/Application/VERSIÓN_DE_CHROME/WidevineCdm/_platform_specific/win_(x86|x64)/`.

### En macOS

El archivo de la librería `libwidevinecdm.dylib` estará en el directorio `/Applications/Google Chrome.app/Contents/Versions/VERSIÓN_DE_CHROME/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/`.

**Nota:** Asegúrese de que la versión de Chrome utilizada por Electron sea mayor o igual que el valor `min_chrome_version` del componente Widevine CDM de Chrome. El valor puede ser encontrado en `manifest.json` en el directorio `WidevineCdm`.

## Usando la librería

Después de obtener los archivos de la librería, usted debe pasar la ruta del archivo con el comando `--widevine-cdm-path` y la versión de la librería con `--widevine-cdm-version`. Los comandos deben ser pasados antes de que se emita el evento `ready` del módulo `app`.

Código de ejemplo:

```javascript
const { app, BrowserWindow } = require('electron')

// You have to pass the directory that contains widevine library here, it is
// * `libwidevinecdm.dylib` on macOS,
// * `widevinecdm.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// The version of plugin can be got from `chrome://components` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.whenReady().then(() => {
  win = new BrowserWindow()
  win.show()
})
```

## Verificando la compatibilidad de Widevine CDM

Para verificar si Widevine funciona, puede usar los siguientes métodos:

* Abrir https://shaka-player-demo.appspot.com/ y cargar un manifiesto que use `Widevine`.
* Abrir http://www.dash-player.com/demo/drm-test-area/, confirmar que la página diga `bitdash usa Widevine en su navegador`, luego reproducir el video.
