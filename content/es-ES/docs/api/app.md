# app

> Controla el ciclo de vida de los eventos de su aplicación.

Proceso: [Main](../glossary.md#main-process)

Los siguientes ejemplos muestran como salir de la aplicación cuando la última ventana está cerrada:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Eventos

El objeto `app` emite los siguientes eventos:

### Evento: 'will-finish-launching'

Emitido cuando la aplicación ha terminado su iniciación básica. En windows y Linux el evento `will-finish-launching` es el mismo que el evento `ready`; en macOS este evento representa la notificación `applicationWillFinishLaunching` de `NSApplication`. Normalmente configurará aquí los receptores para los eventos `open-file` y `open-url`, e iniciará el informador de errores y el actualizador automático.

En la mayoría de los casos usted debe hacer todo desde el controlador del evento `ready`.

### Evento: 'ready'

Devuelve:

* `launchInfo` Object *macOS*

Emitido cuando Electron se ha terminado de iniciar. En macOS, `launchInfo` almacena el `userInfo</0 de <code>NSUserNotification` que fue usado para abrir la aplicación, si fue lanzado desde el centro de notificaciones. Puede usar `app.isReady()` para verificar si el evento ya fue emitido.

### Evento: 'window-all-closed'

Emitido cuando todas las ventanas han sido cerradas.

Si no se subscribe a este evento y todas las ventanas están cerradas, el comportamiento por defecto es salir de la aplicación; sin embargo, si se subscribe, usted controla si la aplicación se cierra o no. Si el usuario presionó `Cmd + Q`, o el desarrollador llamó a `app.quit()`, Electron primero tratará de cerrar todas las ventanas y entonces emitir el evento `will-quit`, y en este caso el evento `window-all-closed` no será emitido.

### Evento: 'before-quit'

Devuelve:

* `event` Event

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Nota:** En Windows, este evento no será emitido si la aplicación se cierra debido a un apagado/reinicio del sistema o el cierre de sesión de un usuario.

### Evento: 'will-quit'

Devuelve:

* `event` Event

Emitido cuando todas las ventanas han sido cerradas y la aplicación se cerrará. Llamando `event.preventDefault()` se evitará el comportamiento por defecto, que es cerrar la aplicación.

Consulte la descripción del evento `window-all-closed` por las diferencias con los eventos `will-quit` y `window-all-closed`.

**Nota:** En Windows, este evento no será emitido si la aplicación se cierra debido a un apagado/reinicio del sistema o el cierre de sesión de un usuario.

### Evento: 'quit'

Devuelve:

* `event` Event
* `exitCode` Integer

Emitido cuando la aplicación se está cerrando.

**Nota:** En Windows, este evento no será emitido si la aplicación se cierra debido a un apagado/reinicio del sistema o el cierre de sesión de un usuario.

### Evento: 'open-file' *macOS*

Devuelve:

* `event` Event
* `path` String

Emitido cuando el usuario quiere abrir un archivo con la aplicación. El evento `open-file` es emitido usualmente cuando la aplicación está ya abierta y el sistema operativo quiere reusar la aplicación para abrir el archivo. `open-file` también es emitido cuando el archivo es soltado dentro del dock y la aplicación todavía no se está ejecutando. Asegúrese de escuchar sobre el evento `open-file` muy temprano en el el inicio de su aplicación para manejar este caso (incluso antes de que el evento `ready` sea emitido).

Usted debe llamar a `event.preventDefault()` si quiere manejar este evento.

En Windows, tiene que analizar `process.argv` (en el proceso principal) para encontrar la ruta del archivo.

### Evento: 'open-url' *macOS*

Devuelve:

* `event` Event
* `url` String

Emitido cuando el usuario quiere abrir una URL con la aplicación. El archivo `Info.plist` de su aplicación debe definir el esquema de url en la llave `CFBundleURLTypes`, y configurar `NSPrincipalClass` para `AtomApplication`.

Usted debe llamar a `event.preventDefault()` si quiere manejar este evento.

### Evento: 'activate' *macOS*

Devuelve:

* `event` Event
* `hasVisibleWindows` Boolean

Emitido cuando la aplicación está activada. Varias acciones puede activar este evento, como iniciar la aplicación por primera vez, intentar relanzar la aplicación cuando ya está corriendo, o hacer click en el dock de la aplicación o en el ícono de la barra de tareas.

### Evento: 'continue-activity' *macOS*

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contiene el estado específico de la aplicación almacenado por la actividad de otro artefacto.

Emitido durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) cuando una actividad de un artefacto diferente quiere ser reanudado. Usted debe llamar `event.preventDefault()` si quiere manejar este evento.

La actividad de un usuario puede ser continuada solo en una aplicación que tenga la misma identificación de equipo de desarrolladores como la la aplicación fuente de las actividades y que soporte los tipos de actividad. Los tipos de actividades soportadas están en el `Info.plist` de la aplicación bajo la llave `NSUserActivityTypes`.

### Evento: 'will-continue-activity' *macOS*

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Emitido durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) cuando una actividad de un artefacto diferente quiere ser reanudado. Usted debe llamar `event.preventDefault()` si quiere manejar este evento.

### Evento: 'continue-activity-error' *macOS*

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Una cadena en el idioma local con la descripción del error.

Emitido durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) cuando una actividad desde un artefacto diferente falla al ser reanudada.

### Evento: 'activity-was-continued' *macOS*

Devuelve:

* `event` Event
* `type` String- Una cadena que identifica la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object: contiene el estado específico de la aplicación almacenado por la actividad.

Emitido durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) después de que una actividad de este artefacto haya sido reanudado con éxito en otro.

### Evento: 'update-activity-state' *macOS*

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object: contiene el estado específico de la aplicación almacenado por la actividad.

Emitido cuando [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) va a ser reanudado en otro artefacto. Si necesita actualizar el estado que se transferirá, debe llamar a `event.preventDefault ()` inmediatamente, crear un nuevo diccionario `userInfo` y llamar a `app.updateCurrentActiviy()` de manera oportuna. Otherwise, the operation will fail and `continue-activity-error` will be called.

### Evento: 'new-window-for-tab' *macOS*

Devuelve:

* `event` Event

Emitido cuando el usuario hace click en el nuevo botón nativo de madOS. El nuevo botón es visible solamente si el `BrowserWindow` actual tiene `tabbingIdentifier`

### Evento: 'browser-window-blur'

Devuelve:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido cuando el [browserWindow](browser-window.md) está borroso.

### Evento: 'browser-window-focus'

Devuelve:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido cuando se enfoca un [browserWindow](browser-window.md).

### Evento: 'browser-window-created'

Devuelve:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido cuando se crea un [browserWindow](browser-window.md).

### Evento: 'web-contents-created'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitido cuando un nuevo [contenidoweb](web-contents.md) es creado.

### Evento: 'certificate-error'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `url` String
* `error` String - El código de error
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - Si se considera que el certificado es de confianza

Emitido cuando falla la verificación de `certificate` por `url`, al confiar en el certificado usted debe prevenir el comportamiento con `event.preventDefault()` y llamar `callback(true)`.

```javascript
const { app } = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Lógica de verificación.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Evento: 'select-client-certificate'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `url` URL
* `certificateList`[Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate`[Certificate](structures/certificate.md)(opcional)

Emitido cuando el certificado de un cliente es requerido.

La `url` corresponde a la entrada de navegación requerida al certificado del cliente y `callback` puede ser llamado con una entrada filtrada de la lista. Usando `event.preventDefault()` previene que la aplicación use el primer certificado almacenado.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Evento: 'login'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `request` Object 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

Emitido cuando `webContents` quiere hacer una autenticación básica.

El comportamiento por defecto es cancelar todas las autenticaciones. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Evento: 'gpu-process-crashed'

Devuelve:

* `event` Event
* `killed` Boolean

Es emitido cuando el proceso de la gpu se crashea o es terminado.

### Evento: 'accessibility-support-changed' *macOS* *Windows*

Devuelve:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` cuando el soporte de accesibilidad de Chrome está activado, de lo contrario `false`.

Es emitido cuando el soporte de accesibilidad de Chrome es modificado. Este evento se dispara cuando las tecnologías de asistencia, como un lector de pantalla, sin activados o desactivados. Vea https://www.chromium.org/developers/design-documents/accessibility para mas información.

### Evento: 'session-created'

Devuelve:

* `session` [Session](session.md)

Emitido cuando Electron ha creado una nueva `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Evento: 'second-instance'

Devuelve:

* `event` Event
* `argv` Cadena[] - Un arreglo de las líneas de argumentos de comandos de segunda instancia
* `workingDirectory` Cadena - El directorio de trabajo de segunda instancia

Este evento será emitido dentro de la instancia principal de la aplicación cuando se ha ejecutado una segunda instancia. `argv` es un arreglo de las líneas de argumentos de segunda instancia, y `workingDirectory` es su directorio de trabajo actual. Usualmente las aplicaciones responden a esto haciendo su ventana principal concentrada y no minimizada.

Este evento garantiza que se ejecute después del evento `ready` de `app` para ser emitido.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Event: 'remote-require'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-global'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

### Evento: 'remote-get-builtin'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Evento: 'remote-get-current-window'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Evento: 'remote-get-current-web-contents'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Evento: 'remote-get-guest-web-contents'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

## Métodos

El objeto `app` tiene los siguientes métodos:

**Note:** Algunos métodos solo están disponibles es sistemas operativos específicos y son etiquetados como tal.

### `app.quit()`

Intenta cerrar todas las ventanas. El evento `before-quit` se producirá primero. Si todas las ventas son cerradas exitosamente, el evento `will-quit` será producido y por defecto la aplicación se cerrará.

Este método garantiza que todos los eventos de `beforeunload` y `unload` serán correctamente ejecutados. Es posible que una ventana cancele la salida regresando `falso` en el manipulador de eventos `antes de cargar`.

### `app.exit([exitCode])`

* `exitCode` Entero (opcional)

Sale inmediatamente con `exitCode`. `exitCode` por defecto es 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `opciones` Objecto (opcional) 
  * `args` String[] - (opcional)
  * `execPath` Cadena (opcional)

Reinicia la aplicación cuando la instancia se cierra.

By default, the new instance will use the same working directory and command line arguments with current instance. Cuando `args` es especificada, el `args` se convertirá en un argumento de la linea de comandos. Cuando `execPath` es especificado, el`execPath` Será ejecutado en el relanzador en vez de la aplicación en curso.

Note que este método no cierta la aplicación cuando esta es ejecutada, tiene que llamar `app.quit` o `app.exit` después de llamar `app.relaunch` para hacer que la aplicación se reinicie.

Cuando `app.relaunch` es llamada múltiples veces, múltiples instancias serán iniciadas después de que la actual instancia se cierre.

Un ejemplo de reiniciar la instancia actual de forma inmediata y agregar un nuevo argumento a la línea de comando de la nueva instancia:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Devuelve `Boolean` - `true` Si Electron se ha inicializado correctamente, de lo contrario `false`.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. También puede ser utilizado para comprobar el estado de: `app.isReady()` y registrar al evento `ready` si la aplicación aun no esta lista.

### `app.focus()`

En Linux, el foco se tiene en la primera ventana visible. En macOS, hace que la aplicación se active. En Windows, el foco se tiene en la primera ventana de la aplicación.

### `app.hide()` *macOS*

Oculta todas la ventanas de la aplicación sin minimizar estas.

### `app.show()` *macOS*

Muestra las ventanas de la aplicación después e que fueron ocultas. No enfoca automáticamente estas.

### `app.getAppPath()`

Devuelve `String` - al directorio de la aplicación actual.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

Usted puede pedir las siguientes direcciones por nombre:

* `Inicio` Directorio de inicio del usuario.
* `appData` Directorio de la información de la aplicación por usuario, que lleva por defecto a: 
  * `%APPDATA%` en Windows
  * `$XDG_CONFIG_HOME` o `~/.config` en Linux
  * `~/Library/Application Support` en marcOS
* `Información del usuario` El directorio para almacenar los archivos de la configuración de su aplicación, que es el directorio `appData` por defecto unida con el nombre de su aplicación.
* `temp` Directorio temporal.
* `exe` Archivo ejecutable en curso.
* `module` la librería `libchromiumcontent`.
* `escritorio` El directorio del escritorio del usuario en curso.
* `documentos` Directorio para la carpeta "Mis documentos" del usuario.
* `descargas` Directorio para las descargas del usuario.
* `musica` Directorio para la música del usuario.
* `imágenes` Directorio para las imágenes del usuario.
* `videos` Directorio para las imágenes del usuario.
* `logs` Directorio para los archivos de registro de la aplicación.
* `pepperFlashSystemPlugin` Ruta completa a la versión del sistema del plugin Pepper Flash.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `opciones` Objecto (opcional) 
  * `tamaño` String 
    * `pequeño` - 16x16
    * `normal` - 32x32
    * `grande` - 48x48 en *Linux*, 32x32 en *Windows*, no compatible en *macOS*.
* `callback` Function 
  * `error` Error
  * `ícono` [NativeImage](native-image.md)

Busca un ícono asociado a la ruta.

En *Windows*, Hay dos tipos de íconos:

* Íconos asociados con cierta extensión de un archivo, como `.mp3`, `.png`, etc.
* Íconos dentro del archivo mismo, como `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

**[Próximamente desaprobado](promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `opciones` Objecto (opcional) 
  * `size` String 
    * `pequeño` - 16x16
    * `normal` - 32x32
    * `grande` - 48x48 en *Linux*, 32x32 en *Windows*, no compatible en *macOS*.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Busca un ícono asociado a la ruta.

En *Windows*, Hay dos tipos de íconos:

* Íconos asociados con cierta extensión de un archivo, como `.mp3`, `.png`, etc.
* Íconos dentro del archivo mismo, como `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String
* `path` String

Reemplaza la `ruta` a un directorio especial o un archivo asociado con el `nombre`. Si el camino especificado a un directorio no existe, el directorio será creado por el siguiente método. En caso de fallar se lanza un `Error`.

Solo puede sobre escribir rutas de de un `nombre` definido en `app.getPath`.

Por defecto, las cookies y el caché de una página web serán almacenados en el directorio `userData`. Si quiere cambiar su localización, tiene que reescribir la ruta de `Dato de Usuario` ante que el evento `listo` del módulo de la `app` sea emitido.

### `app.getVersion()`

Regresa `Cadena` - La versión de la aplicación cargada. Si ninguna versión es encontrada en el archivo `package.json` de la aplicación, la versión del ejecutable se regresa.

### `app.getName()`

Regresa `Cadena` - El nombre actual de la aplicación, el cual es el nombre del archivo `package.json` de esta.

Usualmente el campo `nombre` de `package.json` es un nombre corto en minúscula, de acuerdo con las especificaciones del módulo npm. Generalmente debe especificar un `Nombre del producto` también, el cual es el nombre de su aplicación en mayúscula, y que será preferido por Electron sobre `nombre`.

### `app.setName(name)`

* `name` String

Reescribe el nombre de la aplicación actual.

### `app.getLocale()`

Devuelve `String` - Código de la localización actual de la aplicación. Los valores posibles están documentados [aquí](locales.md).

Para establecer la localización, necesitas usar un cambio de línea de comandos al inicio de la aplicación, el cual se puede encontrar [aquí](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Nota:** Al distribuir su aplicación empaquetada, también tiene que enviar las carpetas `locales`.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Añade la `ruta` a la lista de documentos recientes.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Borra la lista de documentos recientes.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`. Si quiere que su aplicación maneje enlaces `electron://`, llame este método con `electron` como el parámetro.
* `ruta` Cadena (opcional) *Windows* - por defecto a `process.execPath`
* `args` Cadena[] (opcional) *Windows* - por defecto a un arreglo vacío

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Este método configura el ejecutable actual como por defecto a utilizar por un protocolo (esquema aka URI). Esto le permite integrar la profundidad de la aplicación dentro del sistema operativo. Una vez registrado, todos los enlaces con `your-protocol://` serán abiertos con el ejecutable. El enlace completo, incluyendo el protocolo, será enviado a su aplicación como un parámetro.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Nota:** En macOS, solo puede registrar protocolos que han sido añadidos a la `info.plist` de su aplicación, que no puede ser modificada mientras la aplicación esté corriendo. Usted también puede modificar el archivo con un editor de texto o script durante su creación. Vea la [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) para mas información.

El API usa el registro de Windows y LSSetDefaultHandlerForURLScheme internamente.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`.
* `ruta` Cadena (opcional) *Windows* - por defecto a `process.execPath`
* `args` Cadena[] (opcional) *Windows* - por defecto a un arreglo vacío

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Este método verifica si el ejecutable actual como el manejador por defecto para un protocolo (aka Esquema URI). Si es así, removerá la aplicación como el manejador por defecto.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`.
* `ruta` Cadena (opcional) *Windows* - por defecto a `process.execPath`
* `args` Cadena[] (opcional) *Windows* - por defecto a un arreglo vacío

Devuelve `Boolean`

Este método verifica si el ejecutable acutal es el manejador por defecto para un protocolo (aka esquema URI). Si es así, regresará verdad. de otra manera, regresará falso.

**Nota:** En macOS puede usar este método para verificar si la aplicación ha sido registrada como controladora por defecto para un protocolo. También puedes verificar esto al marcar `~/Library/Preferences/com.apple.LaunchServices.plist` en el dispositivo macOS. Por favor vea la [documentación de Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) para detalles.

El API usa el registro de Windows y LSCopyDefaultHandlerForURLScheme internamente.

### `app.setUserTasks(tasks)` *Windows*

* `tarea` [Tarea[]](structures/task.md) - Arreglo de objetos `Tarea`

Añade `tareas` a la categoría [Tareas](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) de la JumpList en Windows.

`tareas` es un arreglo de objetos [`Task`](structures/task.md).

Regresa `Boolean` - Siempre que el llamado fue exitoso.

**Nota:** Si quisiese personalizar la lista de saltos aún más use en su lugar `app.setJumpList(categories)`.

### `app.getJumpListSettings()` *Windows*

Devuelve `Objeto`:

* `minItems` Entero - El número mínimo de elementos que será mostrado en la lista (Para una descripción detallada de este valor vea el [documento MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `remover elementos` [JumpListItem[]](structures/jump-list-item.md) - Arreglo de los objetos `JumpListItem` a elementos que el usuario ha removido explícitamente de la categoría personalizada en la Jump list. Estos elementos no deben ser añadidos nuevamente a la jump list en el **próximo** llamado a `app.setJumpList()`, Windows no mostrará ninguna categoría personalizada que contenga alguno de los elementos removidos.

### `app.setJumpList(categories)` *Windows*

* `categorías` [categoría Jump list[]](structures/jump-list-category.md) o `nulos` - Arreglo de objetos en la `categoría jump list`.

Configura o remueve una Jump list personalizada para la aplicación, y devuelve una de las siguientes cadenas:

* `ok` - Nada salió mal.
* `error` - Uno o más errores ocurrieron, habilite el registro del tiempo de corrida para averiguar la causa probable.
* `Error que no se pudo separar` - se realizó un intento de de añadir un separador a una categoría personalizada de Jump List. Separadores son permitidos solo en la categoría `Tareas`.
* `Error en el registro del archivo` - Fue realizado un intento de añadir el enlace del archivo a la Jump list para un tipo de archivo que la aplicación no está registrada para controlar.
* `Error Acceso a categoría personalizada negado` - Cateogrías personalizadas no pueden ser añadidas a la Jump List debido a la privacidad del usuario o a la política del grupo.

Si la `categoría` es `nula` la configuración personalizada previa de la Jump List (si hay alguna) será reemplazada por la Jump List estándar para la aplicación (manejada por Windows).

**Nota:** Si un objeto de `JumpListCategory` no tiene ni `type` ni el `name` en sus propiedades de objeto, se asume que su propiedad `type` será `tasks`. Si la propiedad `name` está establecida pero la propiedad `type` esta omitida entonces se asume que el `type` es `custom`.

**Nota:** Usuarios pueden remover elementos de las categorías personalizadas y Windows no permitirá que un elemento removido sea añadido de nuevo a la categoría personalizada hasta **después** del siguiente llamado exitoso a `app.setJumpList(categories)`. Cualquier intento de añadir nuevamente el elemento a la categoría personalizada antes que eso resultará en que la categoría entera sea omitida de la Jump List. La lista de elemento removidos puede ser obtenida usando `app.getJumpListSettings()`.

Aquí hay un ejemplo sencillo de cómo crear una Jump List personalizada:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Devuelve `Boolean`

Este método hace de tu aplicación una de segunda instancia - además de permitir que tu aplicación se ejecuta de muchas instancias, esto asegurará que solo una instancia única de tu aplicación se esté ejecutando, y otras señales de instancias a esta instancia y sale.

El valor devuelto de este método indica si esta instancia de su aplicación obtuvo con éxito el bloqueo. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

Este método retorna `true` si el proceso es de primera instancia en su aplicación y esta debe continuar la carga. Retorna `false` si su proceso deja inmediatamente de enviar parámetros a otra instancia que ya haya adquirido el bloqueo con anterioridad.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

Un ejemplo de activar la ventana de la instancia primaria cuando una de segunda instancia se inicia:

```javascript
const { app } = require('electron')
let miVentana = null

const obtenerBloqueo = app.requestSingleInstanceLock()

if (!obtenerBloqueo) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Si alguien intentó ejecutar un segunda instancia, debemos
 //enfocarnos en nuestra ventana principal.
    if (miVentana) {
      if (miVentana.isMinimized()) miVentana.restore()
      miVentana.focus()
    }
  })

  // Crear miVentana, esto cargara el resto de la aplicación, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Devuelve `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock. Usted puede realiza un bloqueo con `app.requestSingleInstanceLock()` o liberarlo con `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` Caden - Raramente identifica la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Objeto - Específicos estados de aplicaciones de la tiendo para usar en otro dispositivo.
* `webpageURL` Cadena (opcional) - La página web a cargar en un buscador, si no es adecuada para aplicaciones, es instalada en el dispositivo a resumir. El esquema debe ser `http` o`https`.

Crea un `NSUserActivity` y se establece como la actividad actual. La actividad es elegible para [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) a otro dispositivo luego.

### `app.getCurrentActivityType()` *macOS*

Devuelve `String` - El tipo de la actividad que se está ejecutando actualmente.

### `app.invalidateCurrentActivity()` *macOS*

* `type` Caden - Raramente identifica la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalida la actividad actual [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) del usuario.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` Caden - Raramente identifica la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Objeto - Específicos estados de aplicaciones de la tiendo para usar en otro dispositivo.

Actualiza la actividad actual si su tipo coincide `type`, fusionando las entradas de `userInfo` en su actual diccionario `userInfo`.

### `app.setAppUserModelId(id)` *Windows*

* `id` Cadena

Cambia el [Id Modelo de Usuario de la Aplicación](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) a `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `opciones` Object 
  * `cetificado` Cadena - camino para el archivo pkcs12.
  * `contraseña` Cadena - Frase clave para el certificado.
* `callback` Function 
  * `resultado` Entero - Resultado del importe.

Importa el certificado en formato pkcs12 dentro del certificado de la plataforma. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Desactiva la aceleración por hardware para esta aplicación.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.disableDomainBlockingFor3DAPIs()`

Por defecto, Chromium desactiva 3D APIs (ej., WebGL) hasta reiniciar por dominio si el proceso de GPU crashea frecuentemente. Esta función desactiva ese comportamiento.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.getAppMetrics()`

Devuelve [`ProcessMetric[]`](structures/process-metric.md): matriz de `ProcessMetric` objetos que corresponden a las estadísticas de uso de memoria y Cpu de todos los procesos asociados con la aplicación.

### `app.getGPUFeatureStatus()`

Devuelve [`GPUFeatureStatus`](structures/gpu-feature-status.md) - el estado de la función de gráficos de `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Devuelve `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src.git/+/69.0.3497.106/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Aquí hay un ejemplo de respuesta básica:

```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```

Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Entero

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Establece el distintivo en contra para la aplicación actual. Establecer la cuenta a `0` esconderá el distintivo.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Devolver `Entero` - El valor actual establecido en la insignia contraria.

### `app.isUnityRunning()` *Linux*

Devuelve `Boolean` - Aunque el ambiente del escritorio actual sea un ejecutador de Unity.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `opciones` Objecto (opcional) 
  * `path` Cadena (opcional) *Windows* - El camino ejecutable para comparar en contra. Por defecto a `process.execPath`.
  * `args` Cadena[] (opcional) *Windows* - La línea de argumentos de comando para comparar e contra. Por defecto, a un arreglo vacío.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Devuelve `Objeto`:

* `openAtLogin` Boolean - `true` si la aplicación es establecida para abrirse al iniciar.
* `openAsHidden` Boolean *macOS* - `true` si la aplicación es establecida para abrirse como oculta al login. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` si la aplicación fue abierto automáticamente al login. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` si la aplicación fue abierto como un artículo oculto de login. Esto indica que la aplicación no debería abrir ninguna ventana al inicio. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` si la aplicación fue abierto como un artículo de login que debería restaurar el estado de la sesión anterior. Esto indica que la aplicación debería restaurar las ventanas que fueron abiertas la última vez que la aplicación fue cerrada. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `ajustes` Object 
  * `openAtLogin` Boolean (opcional) - `true` para abrir la aplicación al iniciar, `false` para eliminar la aplicación como un objeto de inicio. Por defecto a `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` abrirse la aplicación como oculta. Por defecto a `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (opcional) *Windows* - El ejecutable para iniciar al iniciar. Por defecto a `process.execPath`.
  * `args` Cadena[] (opcional) *Windows* - Los argumentos de líneas de comando para pasar al ejecutable. Por defecto a un arreglo vacío. Ten cuidado de envolver los caminos en las citas.

Establece los objetos de inicio de ajuste de la aplicación.

Para trabajar con `autoUpdater` de Electron en Windows, el cual usa [Squirrel](https://github.com/Squirrel/Squirrel.Windows), querrás establecer el camino de ejecución de Update.exe, y pasarán los argumentos que especifican el nombre de tu aplicación. Por ejemplo:

```javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Devuelve `Boolean` - `true` si la accesibilidad de soporte de Chrome es habilitado, o `false` de otra manera. Esta API devolverá `true` si el uso de tecnologías asistivas, como leectores de pantallas, son detectadas. Ver https://www.chromium.org/developers/design-documents/accessibility para más detalles.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Activa o desactiva el renderizado del [árbol de accesibilidad](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Manualmente habilita el soporte de accesibilidad de Chrome, lo que permite exponer el interruptor de accesibilidad a los usuarios en la configuración de la aplicación. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Desactivado por defecto.

This API must be called after the `ready` event is emitted.

**Nota:** Renderizar el árbol de accesibilidad puede afectar significativamente al rendimiento de su aplicación. No debería estar activado por defecto.

### `app.showAboutPanel` *macOS* *Linux*

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` *macOS* *Linux*

* `opciones` Object 
  * `applicationName` Cadena (opcional) - El nombre de la aplicación.
  * `applicationVersion` Cadena (opcional) - La versión de la aplicación.
  * `copyright` Cadena (opcional) - La información de Copyright.
  * `version` String (optional) - The app's build version number. *macOS*
  * `credits` String (optional) - Credit information. *macOS*
  * `website` String (optional) - The app's website. *Linux*
  * `iconPath` String (optional) - Path to the app's icon. *Linux*

Establece el panel de opciones. This will override the values defined in the app's `.plist` file on MacOS. Ver el [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) para más detalles. On Linux, values must be set in order to be shown; there are no defaults.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - El marcador de datos de ámbito de seguridad de codificación base64 devuelto por los métodos `dialog.showOpenDialog` o `dialog.showSaveDialog`.

Devuelve `Function` - Esta función **debe** ser llamado una vez que hayas terminado de acceder el archivo de ámbito de seguridad. Si no recuerdas de dejar de acceder el marcador, [recursos de nucleo se fugarán](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) y tu aplicación se perderá su capacidad de alcanzar afuera del entorno aislado completamente hasta que se reinicia tu aplicación.

```js
// Empezar a acceder el archivo.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Empezar a acceder un recurso de ámbito de seguridad. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. Ver a [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) por una descripción de cómo funciona este sistema.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` Cadena - Un cambio en la línea de comando
* `value` Cadena (opcional) - Un valor para el cambio dado

Adjuntar un cambio (con `valor` opcional) al comando de de línea de Chromium.

**Nota;** Esto no afectará el `process.argv`, y es primcipalmente usado por los desarrolladores para controlar algunos comportamientos de Chromium de bajo nivel.

### `app.commandLine.appendArgument(value)`

* `valor` Cadena - El argumento a adjuntar a la línea de comando

Adjuntar un argumento a la línea de comando de Chromium. El argumento será citado correctamente.

**Nota:** Esto no afectará a `process.argv`.

### `app.commandLine.hasSwitch(switch)`

* `switch` Cadena - Un cambio en la línea de comando

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` Cadena - Un cambio en la línea de comando

Returns `String` - The command-line switch value.

**Note:** When the switch is not present, it returns empty string.

### `app.enableSandbox()` *Experimental* *macOS* *Windows*

Habilita el modo sandbox completo en la aplicación.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.isInApplicationsFolder()` *macOS*

Devuelve `Boolean` - Si la aplicación se está operando actualmente desde la carpeta Aplicación de sistemas. Utilizar en combinación con `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**Nota:** Este método emite errores si algo que no sea el usuario provoca un error en el movimiento. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. El mensaje de error debería ser descriptivo y advertir exactamente que ha fallado

### `app.dock.bounce([type])` *macOS*

* `type` Cadena (opcional) - Puede ser `critical` o `informational`. El por defecto es `informational`

Cuando `critical` es pasado, el ícono del punto rebotará hasta que la aplicación se vuelva activa o la petición sea cancelada.

Cuando `informational` es pasada, el ícono del punto rebotará por un segundo. Como sea, la petición se mantiene activa hasta que la aplicación se vuelva activa o que la petición sea cancelada.

Devuelve `Integer` un ID representativo de la petición.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Íntegro

Cancela el rebote de `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Rebota la apilación de descargas si el archivo de camino está dentro de la carpeta de descargas.

### `app.dock.setBadge(text)` *macOS*

* `texto` String

Establece la cadena para ser mostrada en el área de insignia del punto.

### `app.dock.getBadge()` *macOS*

Devuelve `Cadena` - La insignia cadena del punto.

### `app.dock.hide()` *macOS*

Esconde el icono del punto.

### `app.dock.show()` *macOS*

Muestra el icono del punto.

### `app.dock.isVisible()` *macOS*

Devuelve `Boolean` - Aunque el icono del punto sea visible. El llamado `app.dock.show()` es asincrónico, así que este método podría no volver inmediatamente luego de ese llamado.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Establece la `image` asociada con el ícono del punto.

## Propiedades

### `app.isPackaged`

Una propiedad `Boolean` que retorna `true` si la aplicación está empaquetada, `false` si no lo está. Para muchas aplicaciones, esta propiedad puede ser usada para distinguir los ambientes de desarrollo y producción.