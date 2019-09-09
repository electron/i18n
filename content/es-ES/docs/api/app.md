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

Emitido antes que la aplicación empiece a cerrar sus ventanas. Llamando `event.preventDefault()` evitará el comportamiento por defecto que es terminar la aplicación.

**Note:** Si el cierre de la aplicación fue iniciada por `autoUpdater.quitAndInstall()`, luego `before-quit` es emitido *after* emitiendo el evento `close` en todas las ventanas y cerrando.

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

Emitido cuando [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) va a ser reanudado en otro artefacto. Si necesita actualizar el estado que se transferirá, debe llamar a `event.preventDefault ()` inmediatamente, crear un nuevo diccionario `userInfo` y llamar a `app.updateCurrentActiviy()` de manera oportuna. De otra manera, la operación fallará en `continue-activity-error` será llamada.

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

El comportamiento por defecto es cancelar todas las autenticaciones. Para sobrescribir esto de debe evitar el comportamiento por defecto con `event.preventDefault()` y llamar a `callback(username, password)` con las credenciales.

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

### Evento: 'renderer-process-crashed'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `killed` Booleano

Emitido cuando el proceso render de `webContents` se bloquea o es matado.

### Evento: 'accessibility-support-changed' *macOS* *Windows*

Devuelve:

* `event` Event
* `accessibilitySupportEnabled` Booleano - `true` cuando el soporte de accesibilidad de Chrome está activado, de lo contrario `false`.

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

Este evento será emitido dentro de la primera instancia de tu aplicación cuando una segunda instancia ha sido ejecutada y llama `app.requestSingleInstanceLock()`.

`argv` Es un Array los argumentos de la línea de comando de la segunda instancia y `workingDirectory` es su actual directorio de trabajo. Usualmente las aplicaciones responden a esto haciendo su ventana principal concentrada y no minimizada.

Este evento garantiza que se ejecute después del evento `ready` de `app` para ser emitido.

**Note:** Chromium podría agregar argumentos extras de línea de comando, por ejemplo `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitido cuando `desktopCapturer.getSources()` es llamado en el renderer process del `webContents`. Llamando `event.preventDefault()` hará que retorne fuentes vacías.

### Evento: 'remote-require'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `moduleName` String

Emitido cuando `remote.require()` es llamado en el renderer process de `webContents`. Llamando `event.preventDefault()` evitará que se devuelva el modulo. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-global'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `globalName` String

Emitido cuando `remote.getGlobal()` es llamado en el proceso de renderizado del `webContents`. Llamando `event.preventDefault()` evitará que sea devuelto el global. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-builtin'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `moduleName` String

Emitido cuando `remote.getBuiltin()` es llamado en el proceso renderizador del `webContents`. Llamando `event.preventDefault()` evitará que se devuelva el modulo. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-current-window'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitido cuando `remote.getCurrentWindow()` es llamado en el renderer process de `webContents`. Llamar a `event.preventDefault()` evitará que el objeto sea devuelto. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-current-web-contents'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitido cuando `remote.getCurrentWebContents()` es llamado en el renderer process de `webContents`. Llamando `event.preventDefault()` evitará que el objeto sea retornado. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-guest-web-contents'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitido cuando `<webview>.getWebContents()` es llamado en el proceso renderizador de `webContents`. Llamando `event.preventDefault()` evetará que el objeto sea retornado. El valor personalizado puede ser retornado por la configuración `event.returnValue`.

## Métodos

El objeto `app` tiene los siguientes métodos:

**Note:** Algunos métodos solo están disponibles es sistemas operativos específicos y son etiquetados como tal.

### `app.quit()`

Intenta cerrar todas las ventanas. El evento `before-quit` se producirá primero. Si todas las ventas son cerradas exitosamente, el evento `will-quit` será producido y por defecto la aplicación se cerrará.

Este método garantiza que todos los eventos de `beforeunload` y `unload` serán correctamente ejecutados. Es posible que una ventana cancele la salida regresando `falso` en el manipulador de eventos `antes de cargar`.

### `app.exit([exitCode])`

* `exitCode` Íntegro (opcional)

Sale inmediatamente con `exitCode`. `exitCode` por defecto es 0.

Todas las ventanas serán cerradas de inmediato sin preguntarle al usuario, y los eventos `before-quit` y `will-quit` no serán emitidos.

### `app.relaunch([options])`

* `opciones` Objecto (opcional) 
  * `args` String[] - (opcional)
  * `execPath` Cadena (opcional)

Reinicia la aplicación cuando la instancia se cierra.

Por defecto, la nueva instancia va a usar el mismo directorio de trabajo y los argumentos de la linea de comando con la instancia actual. Cuando `args` es especificada, el `args` se convertirá en un argumento de la linea de comandos. Cuando `execPath` es especificado, el`execPath` Será ejecutado en el relanzador en vez de la aplicación en curso.

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

Retorna `Promise<void>` - cumplido cuando Electron esta inicializado. También puede ser utilizado para comprobar el estado de: `app.isReady()` y registrar al evento `ready` si la aplicación aun no esta lista.

### `app.focus()`

En Linux, el foco se tiene en la primera ventana visible. En macOS, hace que la aplicación se active. En Windows, el foco se tiene en la primera ventana de la aplicación.

### `app.hide()` *macOS*

Oculta todas la ventanas de la aplicación sin minimizar estas.

### `app.show()` *macOS*

Muestra las ventanas de la aplicación después e que fueron ocultas. No enfoca automáticamente estas.

### `app.setAppLogsPath(path)`

* `path` String (opcional) - Una ruta personalizada para tus registros. Debe ser absoluta.

Establece o crea un directorio de registros de tu aplicación el cual puede ser manipulado con `app.getPath()` o `app.setPath(pathName, newPath)`.

Llamando a `app.setAppLogsPath()` sin un parámetro `path` dará como resultado que se configure en `/Library/Logs/YourAppName` en *macOS*, y dentro del directorio `userData` en *Linux* y *Windows*.

### `app.getAppPath()`

Devuelve `String` - al directorio de la aplicación actual.

### `app.getPath(name)`

* `name` String

Retorna `String` - Una ruta a un directorio especial o a un archivo asociado con `name`. Cuando falla, un `Error` es lanzado.

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
  * `size` String 
    * `pequeño` - 16x16
    * `normal` - 32x32
    * `grande` - 48x48 en *Linux*, 32x32 en *Windows*, no compatible en *macOS*.
* `callback` Function 
  * `error` Error
  * `ícono` [NativeImage](native-image.md)

Busca un ícono asociado a la ruta.

En *Windows*, hay dos tipos de iconos:

* Íconos asociados con cierta extensión de un archivo, como `.mp3`, `.png`, etc.
* Íconos dentro del archivo mismo, como `.exe`, `.dll`, `.ico`.

En *Linux* y *macOS*, los iconos dependen de la aplicación asociada al tipo de archivo.

**[Próximamente desaprobado](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `opciones` Objecto (opcional) 
  * `size` String 
    * `pequeño` - 16x16
    * `normal` - 32x32
    * `grande` - 48x48 en *Linux*, 32x32 en *Windows*, no compatible en *macOS*.

Devuelve `Promise<NativeImage>` - cumplido con el icono de la aplicación, el cual es un [NativeImage](native-image.md).

Busca un ícono asociado a la ruta.

En *Windows*, Hay dos tipos de íconos:

* Íconos asociados con cierta extensión de un archivo, como `.mp3`, `.png`, etc.
* Íconos dentro del archivo mismo, como `.exe`, `.dll`, `.ico`.

En *Linux* y *macOS*, los iconos dependen de la aplicación asociada al tipo de archivo.

### `app.setPath(name, path)`

* `name` String
* `path` String

Reemplaza la `ruta` a un directorio especial o un archivo asociado con el `nombre`. Si la ruta especifica un directorio que no existe, un `Error` es lanzado. En ese caso, el directorio devería ser creado con `fs.mkdirSync` o similar.

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

**Note:** En windows, tienes que llamarlo después del los eventos `ready` sean emitidos.

### `app.getLocaleCountryCode()`

Devuelve `string` - El código de país del sistema operativo local del usuario [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) El valor se obtiene de APIs nativas del sistema operativo.

**Note:** Cuando no se puede detectar el código de país local, devuelve una cadena vacía.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Añade la `ruta` a la lista de documentos recientes.

Esta lista es manejada por el sistema operativo. En windows, puedes visitar la lista desde la barra de tarea, y en macOS, puedes visitarla desde le menu dock.

### `app.clearRecentDocuments()` *macOS* *Windows*

Borra la lista de documentos recientes.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`. Si quiere que su aplicación maneje enlaces `electron://`, llame este método con `electron` como el parámetro.
* `ruta` Cadena (opcional) *Windows* - por defecto a `process.execPath`
* `args` Cadena[] (opcional) *Windows* - por defecto a un arreglo vacío

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Este método configura el ejecutable actual como por defecto a utilizar por un protocolo (esquema aka URI). Esto le permite integrar la profundidad de la aplicación dentro del sistema operativo. Una vez registrado, todos los enlaces con `your-protocol://` serán abiertos con el ejecutable. El enlace completo, incluyendo el protocolo, será enviado a su aplicación como un parámetro.

En Windows, puedes proveer la ruta de parámetros opcionales, la ruta a tu ejecutable, y args, un array de argumentos para ser pasada al ejecutable de tu aplicación cuando este sea lance.

**Nota:** En macOS, solo puede registrar protocolos que han sido añadidos a la `info.plist` de su aplicación, que no puede ser modificada mientras la aplicación esté corriendo. Usted también puede modificar el archivo con un editor de texto o script durante su creación. Vea la [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) para mas información.

**Note:** En un entorno de Windows Store (cuando se empaqueta como `appx`) esta API devolverá `true` para todas las llamadas pero la clave de registro que establece no será accesible por otras aplicaciones. Para registrar tu aplicación de Windows Store como gestor de protocolo determinado debe [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

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
  { // tiene un nombre por lo tanto `type` es asumido como  "custom"
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
  { // no tiene nombre ni tipo entonces   `type` es asumido para ser "tasks"
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

El valor devuelto de este método indica si esta instancia de su aplicación obtuvo con éxito el bloqueo. Si no se puede obtener el bloqueo, puedes asumir que otra instancia de tu aplicación ya está corriendo con el bloqueo y salir inmediatamente.

Este método retorna `true` si el proceso es de primera instancia en su aplicación y esta debe continuar la carga. Retorna `false` si su proceso deja inmediatamente de enviar parámetros a otra instancia que ya haya adquirido el bloqueo con anterioridad.

En macOS, el sistema fuerza instancias únicas automáticamente cuando los usuario intentan abrir una segunda instancia de tu aplicación en Finder, y los eventos `open-file` y `open-url` seran emitidos por eso. Como sea, cuando los usuarios inicien tu aplicación en la linea de comando, el mecanismo de instancias única del sistema del sistema serán puenteadas, y tendrás que usar este método para asegurar una única instancia.

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

Este método devuelve si esta instancia de tu aplicación es actualmente manteniendo el bloqueo de una sola instancia. Usted puede realiza un bloqueo con `app.requestSingleInstanceLock()` o liberarlo con `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Libera todos los bloqueos que fueron creados por `requestSingleInstanceLock`. Esto va a permitir que varias instancias de la aplicación se ejecuten nuevamente lado a lado.

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

Importa el certificado en formato pkcs12 dentro del certificado de la plataforma. `callback` es llamado con el `result` de la operación de importación, un valor `0` indica que fue exitoso mientras que cualquier otro valor indica que fallo de acuerdo a Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

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

* `infoType` String - Los valores pueden ser `basic` para información básica o `complete` para información completa.

Devuelve `Promise`

Para `infoType` igual a `complete`: La promesa es completada con `Object` conteniendo toda la información de la GPU como [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). Esto incluye la versión y la información del controlador que es mostrada en la pagina `chrome://gpu</0.</p>

<p>Para <code>infoType` igual a `basic`: La promesa se cumple con `Object` que contiene pocos atributos que son solicitados con `complete`. Aquí hay un ejemplo de respuesta básica:

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

El uso de `basic` debería ser preferido si sólo se necesita información básica como `vendorId` o `driverId`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Entero

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Establece el distintivo en contra para la aplicación actual. Establecer la cuenta a `0` esconderá el distintivo.

En macOS, se muestra en el icono del dock. En Linux, solo funciona para Unity launcher.

**Note:** El lanzador Unity requiere que exista un archivo `.desktop` para funcionar, para mas información por favor lea [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Devolver `Entero` - El valor actual establecido en la insignia contraria.

### `app.isUnityRunning()` *Linux*

Devuelve `Boolean` - Aunque el ambiente del escritorio actual sea un ejecutador de Unity.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `opciones` Objecto (opcional) 
  * `path` Cadena (opcional) *Windows* - El camino ejecutable para comparar en contra. Por defecto a `process.execPath`.
  * `args` Cadena[] (opcional) *Windows* - La línea de argumentos de comando para comparar e contra. Por defecto, a un arreglo vacío.

Su proporcionas las opciones `path` y `args` a `app.setLoginItemSettings`, entonces necesitas pasar los mismos argumentos aquí para `openAtLogin` para que sea correctamente configurado.

Devuelve `Objeto`:

* `openAtLogin` Boolean - `true` si la aplicación es establecida para abrirse al iniciar.
* `openAsHidden` Boolean *macOS* - `true` si la aplicación es establecida para abrirse como oculta al login. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` si la aplicación fue abierto automáticamente al login. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` si la aplicación fue abierto como un artículo oculto de login. Esto indica que la aplicación no debería abrir ninguna ventana al inicio. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` si la aplicación fue abierto como un artículo de login que debería restaurar el estado de la sesión anterior. Esto indica que la aplicación debería restaurar las ventanas que fueron abiertas la última vez que la aplicación fue cerrada. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `ajustes` Object 
  * `openAtLogin` Boolean (opcional) - `true` para abrir la aplicación al iniciar, `false` para eliminar la aplicación como un objeto de inicio. Por defecto a `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` abrirse la aplicación como oculta. Por defecto a `false`. El usuario puede editar esta configuración desde la Preferencias del Sistema, así que `app.getLoginItemSettings().wasOpenedAsHidden` debe ser comprobado cuanto la aplicación es abierta para conocer el valor actual. Esta configuración no está disponible en [builds para la tienda de aplicaciones de MAC](../tutorial/mac-app-store-submission-guide.md).
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

**[Próximamente desaprobado](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Activa o desactiva el renderizado del [árbol de accesibilidad](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Manualmente habilita el soporte de accesibilidad de Chrome, lo que permite exponer el interruptor de accesibilidad a los usuarios en la configuración de la aplicación. Mira [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) para mas detalles. Desactivado por defecto.

Esta API debe ser llamada antes que el evento `ready` sea emitido.

**Nota:** Renderizar el árbol de accesibilidad puede afectar significativamente al rendimiento de su aplicación. No debería estar activado por defecto.

**[Próximamente desaprobado](modernization/property-updates.md)**

### `app.showAboutPanel` *macOS* *Linux*

Muestra las opciones del panel acerca de la aplicación. Estas opciones estas opciones pueden ser sobrescritas con `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` *macOS* *Linux*

* `opciones` Object 
  * `applicationName` Cadena (opcional) - El nombre de la aplicación.
  * `applicationVersion` Cadena (opcional) - La versión de la aplicación.
  * `copyright` Cadena (opcional) - La información de Copyright.
  * `version` String (opcional) - El número de versión de construcción de la aplicación. *macOS*
  * `credits` String (opcional) - Información de crédito. *macOS*
  * `website` String (opcional) - El sitio web de la aplicación. *Linux*
  * `iconPath` String (opcional) - Ruta al icono de la aplicación. Se mostrará como 64x64 píxeles mientras se mantiene la relación de aspecto. *Linux*

Establece el panel de opciones. Esto va a sobrescribir los valores de la aplicación definidos en el archivo `.plist` en MacOS. Ver el [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) para más detalles. En Linux, los valores deben establecerse para ser mostrados; no hay valores por defecto.

### `app.isEmojiPanelSupported`

Devuelve `Boolean` - si la versión del sistema operativo actual permite permite o no los selectores de emoji nativos.

### `app.showEmojiPanel` *macOS* *Windows*

Muestra el selector de emoji nativo de la plataforma.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - El marcador de datos de ámbito de seguridad de codificación base64 devuelto por los métodos `dialog.showOpenDialog` o `dialog.showSaveDialog`.

Devuelve `Function` - Esta función **debe** ser llamado una vez que hayas terminado de acceder el archivo de ámbito de seguridad. Si no recuerdas de dejar de acceder el marcador, [recursos de nucleo se fugarán](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) y tu aplicación se perderá su capacidad de alcanzar afuera del entorno aislado completamente hasta que se reinicia tu aplicación.

```js
// Empezar a acceder el archivo.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Empezar a acceder un recurso de ámbito de seguridad. Con este método las aplicaciones Electron que están empaquetadas para la Mac App Store pueden llegar fuera de su caja de arena para acceder a los archivos elegidos por el usuario. Ver a [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) por una descripción de cómo funciona este sistema.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - Un interruptor de la linea de comandos, sin el líder `--`
* `value` Cadena (opcional) - Un valor para el cambio dado

Adjuntar un cambio (con `valor` opcional) al comando de de línea de Chromium.

**Note:** Esto no va a afectar a `process.argv`. El uso previsto de esta función es para el control del comportamiento de Chromium.

### `app.commandLine.appendArgument(value)`

* `valor` Cadena - El argumento a adjuntar a la línea de comando

Añadir un argunmento a la línea de comandos de Chromium. El argumento será citado correctamente. Los interruptores procederán a los argumentos independientemente de la orden de la adición.

Si estas añadiendo un argumento como `--switch=value`, considere usar en su lugar `appendSwitch('switch', 'value')`.

**Note:** Esto no va a afectar a `process.argv`. El uso previsto de esta función es para el control del comportamiento de Chromium.

### `app.commandLine.hasSwitch(switch)`

* `switch` Cadena - Un cambio en la línea de comando

Devuelve `Boolean` - Si el interruptor de la línea de comando esta presente.

### `app.commandLine.getSwitchValue(switch)`

* `switch` Cadena - Un cambio en la línea de comando

Devuelve `String` - El valor del interruptor de la linea de comando.

**Note:** Cando el interruptor no esta presento o no tiene un valor, revuelve una cadena vacía.

### `app.enableSandbox()` *Experimental*

Habilita el modo sandbox completo en la aplicación.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.isInApplicationsFolder()` *macOS*

Devuelve `Boolean` - Si la aplicación se está operando actualmente desde la carpeta Aplicación de sistemas. Utilizar en combinación con `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Devuelve `Boolean` - Si el movimiento fue exitoso. Por favor tenga en cuenta que si el movimiento es exitoso, tu aplicación se cerrará y se volverá a reabrir.

No se presentará ningún dialogo de confirmación por defecto. Si tú deseas permitir al usuario a confirmar la operación, debes usar la API [`dialog`](dialog.md).

**Nota:** Este método emite errores si algo que no sea el usuario provoca un error en el movimiento. Por ejemplo si el usuario cancela el dialogo de autorización, este método va a devolver falso. Si nosotros no realizamos la copia, entonces este método va a lanzar un error. El mensaje de error debería ser descriptivo y advertir exactamente que ha fallado

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

Devuelve `Promise<void>` - Se resuelve cuando se muestra el icono del dock.

### `app.dock.isVisible()` *macOS*

Devuelve `Boolean` - Si el icono del dock es visible.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Establece el [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) de la aplicación.

### `app.dock.getMenu()` *macOS*

Retorna `Menu | null` - El [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) de la aplicación.

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Establece la `image` asociada con el ícono del punto.

## Propiedades

### `app.applicationMenu`

Un propiedad `Menu` que devuelve [`Menu`](menu.md) si se ha establecido y `null` de otra manera. Los usuarios pueden pasar un [Menu](menu.md) para establecer esta propiedad.

### `app.accessibilitySupportEnabled` *macOS* *Windows*

Un propiedad `Boolean` eso es `true` si el soporte de accesibilidad de Chrome esta activado, `false` de otra manera. Esta propiedad será `true` si se ha detectado el uso de tecnologías asistitivas, como lectores de pantalla. Estableciendo esta propiedad manualmente a `true` se activá el soporte de accesibilidad de Chrome, permitiendo a los desarrolladores exponer el cambio de accesibilidad a los usuarios en la configuración de la aplicación.

Mira [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) para más detalles. Deshabilitado por defecto.

Esta API debe ser llamada antes que el evento `ready` sea emitido.

**Nota:** Renderizar el árbol de accesibilidad puede afectar significativamente al rendimiento de su aplicación. No debería estar activado por defecto.

### `app.userAgentFallback`

Un `String` que es la cadena de agente de usuario Electron usará como una regresión global.

Este es el agente de usuario que se utilizará cuando ningún agente de usuario está establecido en el nivel `webContents` o `session`. Útil para asegurar que toda tu aplicación tenga el mismo agente de usuario. Establecer a valor personalizado lo antes posible en la inizialización de tus aplicaciones para asegurar que usa los valores sobrescritos.

### `app.isPackaged`

Una propiedad `Boolean` que retorna `true` si la aplicación está empaquetada, `false` si no lo está. Para muchas aplicaciones, esta propiedad puede ser usada para distinguir los ambientes de desarrollo y producción.

### `app.allowRendererProcessReuse`

Un `Boolean` que cuando es `true` deshabilita las anulaciones que Electron tiene en su lugar para asegurar que los renderer processes son reiniciados en cada navegación. El valor por defecto actual para esta propiedad es `false`.

La intención para estos anuladores es desactivan por defecto y luego en algún punto en el futuro esta propiedad sera eliminada. Esta propiedad impacta en cuales modulos nativos puedes usar en el renderer process. Para más información de la dirección en que Electron esta yendo con el renderer process, reinicio y uso de modulos nativos en el renderer process por favor revisa esto [Tracking Issue](https://github.com/electron/electron/issues/18397).