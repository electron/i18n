# app

> Controla el ciclo de vida de los eventos de su aplicación.

Proceso: [principal](../glossary.md#main-process)</0>

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

* `launchInfo` unknown _macOS_

Emitted once, when Electron has finished initializing. On macOS, `launchInfo` holds the `userInfo` of the `NSUserNotification` that was used to open the application, if it was launched from Notification Center. You can also call `app.isReady()` to check if this event has already fired and `app.whenReady()` to get a Promise that is fulfilled when Electron is initialized.

### Evento: 'window-all-closed'

Emitido cuando todas las ventanas han sido cerradas.

Si no se subscribe a este evento y todas las ventanas están cerradas, el comportamiento por defecto es salir de la aplicación; sin embargo, si se subscribe, usted controla si la aplicación se cierra o no. Si el usuario presionó `Cmd + Q`, o el desarrollador llamó a `app.quit()`, Electron primero tratará de cerrar todas las ventanas y entonces emitir el evento `will-quit`, y en este caso el evento `window-all-closed` no será emitido.

### Evento: 'before-quit'

Devuelve:

* `event` Event

Emitido antes de que la aplicación empiece a cerrar sus ventanas. Llamando a `event.preventDefault()` evitará el comportamiento por defecto, que es terminar la aplicación.

**Note:** Si el cierre de la aplicación fue iniciada por `autoUpdater.quitAndInstall()`, luego `before-quit` es emitido *after* emitiendo el evento `close` en todas las ventanas y cerrándolas.

**Nota:** En Windows, este evento no será emitido si la aplicación se cierra debido a un apagado/reinicio del sistema o el cierre de sesión de un usuario.

### Evento: 'will-quit'

Devuelve:

* `event` Event

Emitido cuando todas las ventanas han sido cerradas y la aplicación se cerrará. Llamando a `event.preventDefault()` evitará el comportamiento por defecto, que es terminar la aplicación.

Consulte la descripción del evento `window-all-closed` por las diferencias con los eventos `will-quit` y `window-all-closed`.

**Nota:** En Windows, este evento no será emitido si la aplicación se cierra debido a un apagado/reinicio del sistema o el cierre de sesión de un usuario.

### Evento: 'quit'

Devuelve:

* `event` Evento
* `exitCode` Integer

Emitido cuando la aplicación se está cerrando.

**Nota:** En Windows, este evento no será emitido si la aplicación se cierra debido a un apagado/reinicio del sistema o el cierre de sesión de un usuario.

### Evento: 'open-file' _macOS_

Devuelve:

* `evento` Evento
* `path` String

Emitido cuando el usuario quiere abrir un archivo con la aplicación. El evento `open-file` es emitido usualmente cuando la aplicación está ya abierta y el sistema operativo quiere reusar la aplicación para abrir el archivo. `open-file` también es emitido cuando el archivo es soltado dentro del dock y la aplicación todavía no se está ejecutando. Asegúrese de escuchar sobre el evento `open-file` muy temprano en el el inicio de su aplicación para manejar este caso (incluso antes de que el evento `ready` sea emitido).

Usted debe llamar a `event.preventDefault()` si quiere manejar este evento.

En Windows, tiene que analizar `process.argv` (en el proceso principal) para encontrar la ruta del archivo.

### Evento: 'open-url' _macOS_

Devuelve:

* `event` Event
* `url` String

Emitido cuando el usuario quiere abrir una URL con la aplicación. El archivo `Info.plist` de tu aplicación debe definir el esquema URL dentro de la llave `CFBundleURLTypes` y configurar `NSPrincipalClass` a `AtomApplication`.

Usted debe llamar a `event.preventDefault()` si quiere manejar este evento.

### Evento: 'activate' _macOS_

Devuelve:

* `event` Event
* `hasVisibleWindows` Boolean

Emitido cuando la aplicación está activada. Varias acciones puede activar este evento, como iniciar la aplicación por primera vez, intentar relanzar la aplicación cuando ya está corriendo, o hacer click en el dock de la aplicación o en el ícono de la barra de tareas.

### Evento: 'continue-activity' _macOS_

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].
* `userInfo` unknown - Contiene el estado especifico de la aplicación guardado por la actividad en otro dispositivo.

Emitido durante [Handoff][handoff] cuando una actividad de un artefacto diferente quiere ser reanudado. Usted debe llamar `event.preventDefault()` si quiere manejar este evento.

La actividad de un usuario puede ser continuada solo en una aplicación que tenga la misma identificación de equipo de desarrolladores como la la aplicación fuente de las actividades y que soporte los tipos de actividad. Los tipos de actividades soportadas están en el `Info.plist` de la aplicación bajo la llave `NSUserActivityTypes`.

### Evento: 'will-continue-activity' _macOS_

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].

Emitido durante [Handoff][handoff] cuando una actividad de un artefacto diferente quiere ser reanudado. Usted debe llamar `event.preventDefault()` si quiere manejar este evento.

### Evento: 'continue-activity-error' _macOS_

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].
* `error` String - Una cadena en el idioma local con la descripción del error.

Emitido durante [Handoff][handoff] cuando una actividad desde un artefacto diferente falla al ser reanudada.

### Evento: 'activity-was-continued' _macOS_

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].
* `userInfo` unknown - Contiene el estado especifico de la aplicación guardado por la actividad.

Emitido durante [Handoff][handoff] después de que una actividad de este artefacto haya sido reanudado con éxito en otro.

### Evento: 'update-activity-state' _macOS_

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].
* `userInfo` unknown - Contiene el estado especifico de la aplicación guardado por la actividad.

Emitido cuando [Handoff][handoff] va a ser reanudado en otro artefacto. Si necesita actualizar el estado que se transferirá, debe llamar a `event.preventDefault ()` inmediatamente, crear un nuevo diccionario `userInfo` y llamar a `app.updateCurrentActivity()` de manera oportuna. De otra manera, la operación fallará en `continue-activity-error` será llamada.

### Evento: 'new-window-for-tab' _macOS_

Devuelve:

* `event` Event

Emitido cuando el usuario hace clic en el botón de nueva pestaña nativa de macOS. El botón de nueva pestaña solo es visible si el `BrowserWindow` actual tiene un `tabbingIdentifier`

### Event: 'browser-window-blur'

Devuelve:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido cuando el [browserWindow](browser-window.md) está borroso.

### Event: 'browser-window-focus'

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
* `callback` Función
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
* `callback` Función
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

### Event:'login'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `authenticationResponseDetails` Object
  * `url` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Función
  * `username` String (opcional)
  * `password` String (opcional)

Emitido cuando `webContents` quiere hacer una autenticación básica.

El comportamiento por defecto es cancelar todas las autenticaciones. Para sobrescribir esto de debe evitar el comportamiento por defecto con `event.preventDefault()` y llamar a `callback(username, password)` con las credenciales.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

Si `callback` es llamado sin un nombre de usuario o contraseña, la solicitud de autenticación sera cancelada y el error de autenticación será retornado a la página.

### Evento: 'gpu-info-update'

Emitido cada vez que hay una actualización de información de la GPU.

### Evento: 'gpu-process-crashed'

Devuelve:

* `event` Event
* `killed` Boolean

Emitido cuando el proceso de la GPU se crashea o es terminado.

### Event: 'renderer-process-crashed' _Deprecated_

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `killed` Booleano

Emitido cuando el proceso render de `webContents` se bloquea o es matado.

**Deprecated:** This event is superceded by the `render-process-gone` event which contains more information about why the render process dissapeared. It isn't always because it crashed.  The `killed` boolean can be replaced by checking `reason === 'killed'` when you switch to that event.

#### Event: 'render-process-gone'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `details` Object
  * `reason` String - The reason the render process is gone.  Posibles valores:
    * `clean-exit` - Process exited with an exit code of zero
    * `abnormal-exit` - Process exited with a non-zero exit code
    * `killed` - Process was sent a SIGTERM or otherwise killed externally
    * `crashed` - Process crashed
    * `oom` - Process ran out of memory
    * `launch-failure` - Process never successfully launched
    * `integrity-failure` - Windows code integrity checks failed

Emitted when the renderer process unexpectedly dissapears.  This is normally because it was crashed or killed.

### Evento: 'accessibility-support-changed' _macOS_ _Windows_

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

app.on('session-created', (session) => {
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

**Note:** If the second instance is started by a different user than the first, the `argv` array will not include the arguments.

Este evento garantiza que se ejecute después del evento `ready` de `app` para ser emitido.

**Note:** Chromium podría agregar argumentos extras de línea de comando, por ejemplo `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitido cuando `desktopCapturer.getSources()` es llamado en el render process del `webContents`. Llamando a `event.preventDefault()` hará que devuelva fuentes vacías.

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

Emitido cuando `remote.getBuiltin()` es llamado en el proceso renderizador del `webContents`. Llamando `event.preventDefault()` evitará que se devuelva el modulo. El valor personalizado puede ser retornado por la configuración `event.returnValue`.

### Evento: 'remote-get-current-window'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitido cuando `remote.getCurrentWindow()` es llamado en el renderer process de `webContents`. Llamar a `event.preventDefault()` evitará que el objeto sea devuelto. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-current-web-contents'

Devuelve:

* `event` Event
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitido cuando `remote.getCurrentWebContents()` es llamado en el renderer process de `webContents`. Llamar a `event.preventDefault()` evitará que el objeto sea devuelto. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

## Métodos

El objeto `app` tiene los siguientes métodos:

**Note:** Algunos métodos solo están disponibles es sistemas operativos específicos y son etiquetados como tal.

### `app.quit()`

Intenta cerrar todas las ventanas. El evento `before-quit` se producirá primero. Si todas las ventas son cerradas exitosamente, el evento `will-quit` será producido y por defecto la aplicación se cerrará.

Este método garantiza que todos los eventos de `beforeunload` y `unload` serán correctamente ejecutados. Es posible que una ventana cancele la salida regresando `falso` en el manipulador de eventos `antes de cargar`.

### `app.exit([exitCode])`

* `exitCode` Íntegro (opcional)

Sale inmediatamente con `exitCode`. `exitCode` por defecto 0.

Todas las ventanas serán cerradas de inmediato sin preguntarle al usuario, y los eventos `before-quit` y `will-quit` no serán emitidos.

### `app.relaunch([options])`

* `options` Object (opcional)
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

Devuelve `Boolean` - `true` Si Electron se ha inicializado correctamente, de lo contrario `false`. See also `app.whenReady()`.

### `app.whenReady()`

Retorna `Promise<void>` - cumplido cuando Electron esta inicializado. También puede ser utilizado para comprobar el estado de: `app.isReady()` y registrar al evento `ready` si la aplicación aun no esta lista.

### `app.focus([options])`

* `options` Object (opcional)
  * `steal` Boolean _macOS_ - Make the receiver the active app even if another app is currently active.

En Linux, se centra en la primera ventana visible. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

You should seek to use the `steal` option as sparingly as possible.

### `app.hide()` _macOS_

Oculta todas la ventanas de la aplicación sin minimizar estas.

### `app.show()` _macOS_

Muestra las ventanas de la aplicación después que fueron ocultadas. No los enfoca automáticamente.

### `app.setAppLogsPath([path])`

* `path` String (opcional) - Una ruta personalizada para tus registros. Debe ser absoluta.

Establece o crea un directorio de registros de tu aplicación el cual puede ser manipulado con `app.getPath()` o `app.setPath(pathName, newPath)`.

Llamando a `app.setAppLogsPath()` sin un parámetro `path` resultará en que este directorio sea configurado a `~/Library/Logs/YourAppName` en _macOS_ y adentro del directorio `userData` en _Linux_ y _Windows_.

### `app.getAppPath()`

Devuelve `String` - al directorio de la aplicación actual.

### `app.getPath(name)`

* `name` String - You can request the following paths by the name:
  * `Inicio` Directorio de inicio del usuario.
  * `appData` Directorio de datos de la aplicación por usuario, el cual por defecto apunta a:
    * `%APPDATA%` en Windows
    * `$XDG_CONFIG_HOME` o `~/.config` en Linux
    * `~/Library/Application Support` en marcOS
  * `Información del usuario` El directorio para almacenar los archivos de la configuración de su aplicación, que es el directorio `appData` por defecto unida con el nombre de su aplicación.
  * `caché`
  * `temp` Directorio temporal.
  * `exe` Archivo ejecutable en curso.
  * `module` la librería `libchromiumcontent`.
  * `escritorio` El directorio del escritorio del usuario en curso.
  * `documentos` Directorio para la carpeta "Mis documentos" del usuario.
  * `descargas` Directorio para las descargas del usuario.
  * `musica` Directorio para la música del usuario.
  * `imágenes` Directorio para las imágenes del usuario.
  * `videos` Directorio para las imágenes del usuario.
  * `recent` Directory for the user's recent files (Windows only).
  * `logs` Directorio para los archivos de registro de la aplicación.
  * `pepperFlashSystemPlugin` Ruta completa a la versión del sistema del plugin Pepper Flash.
  * `crashDumps` Directory where crash dumps are stored.

Devuelve `String` - Una ruta a un directorio especial o un archivo asociado con `name`. En caso de falla, un `Error` es lanzado.

Si se llama a `app.getPath('logs')` sin que se llame primero a `app.setAppLogsPath()`, se creará un directorio de registro por defecto equivalente a llamar a `app.setAppLogsPath()` sin un parámetro `path`.

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (opcional)
  * `size` String
    * `pequeño` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 en _Linux_, 32x32 en _Windows_, no soportado en _macOS_.

Devuelve `Promise<NativeImage>` - cumplido con el icono de la aplicación, el cual es un [NativeImage](native-image.md).

Busca un ícono asociado a la ruta.

En _Windows_, Hay dos tipos de íconos:

* Íconos asociados con cierta extensión de un archivo, como `.mp3`, `.png`, etc.
* Íconos dentro del archivo mismo, como `.exe`, `.dll`, `.ico`.

En _Linux_ y _macOS_, los iconos dependen de la aplicación asociada al tipo de archivo.

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

Usualmente el campo `name` de `package.json` es un nombre corto en minúscula, de acuerdo con las especificaciones de los módulos npm. Generalmente debe especificar un `Nombre del producto` también, el cual es el nombre de su aplicación en mayúscula, y que será preferido por Electron sobre `nombre`.

### `app.setName(name)`

* `name` String

Reescribe el nombre de la aplicación actual.

**Note:** This function overrides the name used internally by Electron; it does not affect the name that the OS uses.

### `app.getLocale()`

Devuelve `String` - El locale actual de la aplicación. Los posibles valores de retorno son documentados [aquí](locales.md).

Para establecer la localización, necesitas usar un cambio de línea de comandos al inicio de la aplicación, el cual se puede encontrar [aquí](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md).

**Nota:** Al distribuir su aplicación empaquetada, también tiene que enviar las carpetas `locales`.

**Note:** En windows, tienes que llamarlo después del los eventos `ready` sean emitidos.

### `app.getLocaleCountryCode()`

Returns `String` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. El valor es tomado desde APIs nativas del sistema operativo.

**Note:** Cuando no se puede detectar el código de país local, devuelve una cadena vacía.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Añade la `ruta` a la lista de documentos recientes.

Esta lista es administrada por el sistema operativo. En Windows, puede visitar la lista desde la barra de tarea y en macOS, puede visitar la desde el menu dock.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Borra la lista de documentos recientes.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`. For example, if you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) _Windows_ - The path to the Electron executable. Por defecto a `process.execPath`
* `args` String[] (optional) _Windows_ - Arguments passed to the executable. Por defecto a un array vacío

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which cannot be modified at runtime. However, you can change the file during build time via [Electron Forge][electron-forge], [Electron Packager][electron-packager], or by editing `info.plist` with a text editor. Vea la [Apple's documentation][CFBundleURLTypes] para mas información.

**Note:** En un entorno de Windows Store (cuando se empaqueta como `appx`) esta API devolverá `true` para todas las llamadas pero la clave de registro que establece no será accesible por otras aplicaciones.  Para registrar tu aplicación de Windows Store como gestor de protocolo determinado debe [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and `LSSetDefaultHandlerForURLScheme` internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`.
* `ruta` Cadena (opcional) _Windows_ - por defecto a `process.execPath`
* `args` Cadena[] (opcional) _Windows_ - por defecto a un arreglo vacío

Regresa `Boolean` - Siempre que el llamado fue exitoso.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`.
* `ruta` Cadena (opcional) _Windows_ - por defecto a `process.execPath`
* `args` Cadena[] (opcional) _Windows_ - por defecto a un arreglo vacío

Returns `Boolean` - Whether the current executable is the default handler for a protocol (aka URI scheme).

**Nota:** En macOS puede usar este método para verificar si la aplicación ha sido registrada como controladora por defecto para un protocolo. También puedes verificar esto al marcar `~/Library/Preferences/com.apple.LaunchServices.plist` en el dispositivo macOS. Por favor vea la [documentación de Apple][LSCopyDefaultHandlerForURLScheme] para detalles.

The API uses the Windows Registry and `LSCopyDefaultHandlerForURLScheme` internally.

### `app.getApplicationNameForProtocol(url)`

* `url` String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `String` - Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be `Electron` on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a `.desktop` suffix.

This method returns the application name of the default handler for the protocol (aka URI scheme) of a URL.

### `app.setUserTasks(tasks)` _Windows_

* `tarea` [Tarea[]](structures/task.md) - Arreglo de objetos `Tarea`

Agrega `tasks` a la categoría [Tasks][tasks] de la Jump List en Windows.

`tareas` es un arreglo de objetos [`Task`](structures/task.md).

Regresa `Boolean` - Siempre que el llamado fue exitoso.

**Nota:** Si quisiese personalizar la lista de saltos aún más use en su lugar `app.setJumpList(categories)`.

### `app.getJumpListSettings()` _Windows_

Devuelve `Objeto`:

* `minItems` Entero - El número mínimo de elementos que será mostrado en la lista (Para una descripción detallada de este valor vea el [documento MSDN][JumpListBeginListMSDN]).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. Estos elementos no deben ser añadidos nuevamente a la jump list en el **próximo** llamado a `app.setJumpList()`, Windows no mostrará ninguna categoría personalizada que contenga alguno de los elementos removidos.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array of `JumpListCategory` objects.

Configura o remueve una Jump list personalizada para la aplicación, y devuelve una de las siguientes cadenas:

* `ok` - Nada salió mal.
* `error` - Uno o más errores ocurrieron, habilite el registro del tiempo de corrida para averiguar la causa probable.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
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

El valor devuelto de este método indica si esta instancia de su aplicación obtuvo con éxito el bloqueo.  Si no se puede obtener el bloqueo, puedes asumir que otra instancia de tu aplicación ya está corriendo con el bloqueo y salir inmediatamente.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  Retorna `false` si su proceso deja inmediatamente de enviar parámetros a otra instancia que ya haya adquirido el bloqueo con anterioridad.

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
  app.whenReady().then(() => {
  })
}
```

### `app.hasSingleInstanceLock()`

Devuelve `Boolean`

Este método devuelve si esta instancia de tu aplicación es actualmente manteniendo el bloqueo de una sola instancia.  Usted puede realiza un bloqueo con `app.requestSingleInstanceLock()` o liberarlo con `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` Caden - Raramente identifica la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].
* `userInfo` any - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Crea un `NSUserActivity` y se establece como la actividad actual. The activity is eligible for [Handoff][handoff] to another device afterward.

### `app.getCurrentActivityType()` _macOS_

Devuelve `String` - El tipo de la actividad que se está ejecutando actualmente.

### `app.invalidateCurrentActivity()` _macOS_

Invalida la actividad actual [Handoff][handoff] del usuario.

### `app.resignCurrentActivity()` _macOS_

Marca la actividad actual del usuario [Handoff][handoff] como inactiva sin invalidarla.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` Caden - Raramente identifica la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].
* `userInfo` any - App-specific state to store for use by another device.

Actualiza la actividad actual si su tipo coincide `type`, fusionando las entradas de `userInfo` en su actual diccionario `userInfo`.

### `app.setAppUserModelId(id)` _Windows_

* `id` Cadena

Cambia el [Id Modelo de Usuario de la Aplicación][app-user-model-id] a `id`.

### `app.setActivationPolicy(policy)` _macOS_

* `policy` String - Can be 'regular', 'accessory', or 'prohibited'.

Sets the activation policy for a given app.

Activation policy types:
* 'regular' - The application is an ordinary app that appears in the Dock and may have a user interface.
* 'accessory' - The application doesn’t appear in the Dock and doesn’t have a menu bar, but it may be activated programmatically or by clicking on one of its windows.
* 'prohibited' - The application doesn’t appear in the Dock and may not create windows or be activated.

### `app.importCertificate(options, callback)` _Linux_

* `options` Object
  * `cetificado` Cadena - camino para el archivo pkcs12.
  * `contraseña` Cadena - Frase clave para el certificado.
* `callback` Función
  * `resultado` Entero - Resultado del importe.

Importa el certificado en formato pkcs12 dentro del certificado de la plataforma. `callback` es llamado con el `result` de la operación de importación, un valor `0` indica que fue exitoso mientras que cualquier otro valor indica que fallo de acuerdo a Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Desactiva la aceleración por hardware para esta aplicación.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behavior.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.getAppMetrics()`

Devuelve [`ProcessMetric[]`](structures/process-metric.md): Array de `ProcessMetric` objetos que corresponden a la memoria y estadísticas de uso de la CPU de todos los procesos asociados con la aplicación.

### `app.getGPUFeatureStatus()`

Devuelve [`GPUFeatureStatus`](structures/gpu-feature-status.md) - el estado de la función de gráficos de `chrome://gpu/`.

**Note:** Esta información sólo es usable después de que le evento `gpu-info-update` es emitido.

### `app.getGPUInfo(infoType)`

* `infoType` String - Can be `basic` or `complete`.

Devuelve `Promise<unknown>`

Para `infoType` igual a `complete`: La promesa es completada con `Object` conteniendo toda la información de la GPU como [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). Esto incluye la versión y la información del controlador que es mostrada en la pagina `chrome://gpu</0.</p>

<p spaces-before="0">Para <code>infoType` igual a `basic`: La promesa se cumple con  `Object` que contiene pocos atributos que son solicitados con `complete`. Aquí hay un ejemplo de respuesta básica:
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

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Entero

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS, it shows on the dock icon. En Linux, solo funciona para Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration][unity-requirement].

### `app.getBadgeCount()` _Linux_ _macOS_

Devolver `Entero` - El valor actual establecido en la insignia contraria.

### `app.isUnityRunning()` _Linux_

Devuelve `Boolean` - Aunque el ambiente del escritorio actual sea un ejecutador de Unity.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (opcional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Por defecto a `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Por defecto a un array vacío.

Su proporcionas las opciones `path` y `args` a `app.setLoginItemSettings`, entonces necesitas pasar los mismos argumentos aquí para `openAtLogin` para que sea correctamente configurado.

Devuelve `Objecto`:

* `openAtLogin` Boolean - `true` si la aplicación es establecida para abrirse al iniciar.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds][mas-builds].
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds][mas-builds].
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. Esto indica que la aplicación no debería abrir ninguna ventana al inicio. This setting is not available on [MAS builds][mas-builds].
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. Esto indica que la aplicación debería restaurar las ventanas que fueron abiertas la última vez que la aplicación fue cerrada. This setting is not available on [MAS builds][mas-builds].

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Por defecto es `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Por defecto a `false`. El usuario puede editar esta configuración desde la Preferencias del Sistema, así que `app.getLoginItemSettings().wasOpenedAsHidden` debe ser comprobado cuanto la aplicación es abierta para conocer el valor actual. This setting is not available on [MAS builds][mas-builds].
  * `path` String (optional) _Windows_ - The executable to launch at login. Por defecto a `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Por defecto a un array vacío. Take care to wrap paths in quotes.

Establece los objetos de inicio de ajuste de la aplicación.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel][Squirrel-Windows], you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Por ejemplo:

``` javascript
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

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Devuelve `Boolean` - `true` si la accesibilidad de soporte de Chrome es habilitado, o `false` de otra manera. Esta API devolverá `true` si el uso de tecnologías asistivas, como leectores de pantallas, son detectadas. Ver https://www.chromium.org/developers/design-documents/accessibility para más detalles.

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Activa o desactiva el renderizado del [árbol de accesibilidad](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Manualmente habilita el soporte de accesibilidad de Chrome, lo que permite exponer el interruptor de accesibilidad a los usuarios en la configuración de la aplicación. Mira [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) para mas detalles. Desactivado por defecto.

Esta API debe ser llamada antes que el evento `ready` sea emitido.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.showAboutPanel()`

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)`

* `options` Object
  * `applicationName` Cadena (opcional) - El nombre de la aplicación.
  * `applicationVersion` Cadena (opcional) - La versión de la aplicación.
  * `copyright` Cadena (opcional) - La información de Copyright.
  * `version` String (optional) _macOS_ - The app's build version number.
  * `credits` String (optional) _macOS_ _Windows_ - Credit information.
  * `authors` String[] (optional) _Linux_ - List of app authors.
  * `website` String (optional) _Linux_ - The app's website.
  * `iconPath` String (optional) _Linux_ _Windows_ - Path to the app's icon. On Linux, will be shown as 64x64 pixels while retaining aspect ratio.

Establece el panel de opciones. This will override the values defined in the app's `.plist` file on macOS. Ver el [Apple docs][about-panel-options] para más detalles. En Linux, los valores deben establecerse para ser mostrados; no hay valores por defecto.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported()`

Devuelve `Boolean` - si la versión del sistema operativo actual permite permite o no los selectores de emoji nativos.

### `app.showEmojiPanel()` _macOS_ _Windows_

Muestra el selector de emoji nativo de la plataforma.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _mas_

* `bookmarkData` String - El marcador de datos de ámbito de seguridad de codificación base64 devuelto por los métodos `dialog.showOpenDialog` o `dialog.showSaveDialog`.

Devuelve `Function` - Esta función **debe** ser llamado una vez que hayas terminado de acceder el archivo de ámbito de seguridad. Si no recuerdas de dejar de acceder el marcador, [recursos de nucleo se fugarán](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) y tu aplicación se perderá su capacidad de alcanzar afuera del entorno aislado completamente hasta que se reinicia tu aplicación.

```js
// Empezar a acceder el archivo.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

Empezar a acceder un recurso de ámbito de seguridad. Con este método las aplicaciones Electron que están empaquetadas para la Mac App Store pueden llegar fuera de su caja de arena para acceder a los archivos elegidos por el usuario. Ver a [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) por una descripción de cómo funciona este sistema.

### `app.enableSandbox()`

Habilita el modo sandbox completo en la aplicación. This means that all renderers will be launched sandboxed, regardless of the value of the `sandbox` flag in WebPreferences.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` _macOS_

* `options` Object (opcional)
  * `conflictHandler` Function<Boolean> (optional) - A handler for potential conflict in move failure.
    * `conflictType` String - The type of move conflict encountered by the handler; can be `exists` or `existsAndRunning`, where `exists` means that an app of the same name is present in the Applications directory and `existsAndRunning` means both that it exists and that it's presently running.

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**Nota:** Este método emite errores si algo que no sea el usuario provoca un error en el movimiento. Por ejemplo si el usuario cancela el dialogo de autorización, este método va a devolver falso. Si nosotros no realizamos la copia, entonces este método va a lanzar un error. El mensaje de error debería ser descriptivo y advertir exactamente que ha fallado.

By default, if an app of the same name as the one being moved exists in the Applications directory and is _not_ running, the existing app will be trashed and the active app moved into its place. If it _is_ running, the pre-existing running app will assume focus and the the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior.  i.e. returning `false` will ensure no further action is taken, returning `true` will result in the default behavior and the method continuing.

Por ejemplo:

```js
app.moveToApplicationsFolder({
  conflictHandler: (conflictType) => {
    if (conflictType === 'exists') {
      return dialog.showMessageBoxSync({
        type: 'question',
        buttons: ['Halt Move', 'Continue Move'],
        defaultId: 0,
        message: 'An app of this name already exists'
      }) === 1
    }
  }
})
```

Would mean that if an app already exists in the user directory, if the user chooses to 'Continue Move' then the function would continue with its default behavior and the existing app will be trashed and the active app moved into its place.

### `app.isSecureKeyboardEntryEnabled()` _macOS_

Returns `Boolean` - whether `Secure Keyboard Entry` is enabled.

By default this API will return `false`.

### `app.setSecureKeyboardEntryEnabled(enabled)` _macOS_

* `enabled` Boolean - Enable or disable `Secure Keyboard Entry`

Set the `Secure Keyboard Entry` is enabled in your application.

By using this API, important information such as password and other sensitive information can be prevented from being intercepted by other processes.

See [Apple's documentation](https://developer.apple.com/library/archive/technotes/tn2150/_index.html) for more details.

**Note:** Enable `Secure Keyboard Entry` only when it is needed and disable it when it is no longer needed.

## Propiedades

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

Un propiedad `Boolean` eso es `true` si el soporte de accesibilidad de Chrome esta activado, `false` de otra manera. Esta propiedad será `true` si se ha detectado el uso de tecnologías asistitivas, como lectores de pantalla. Estableciendo esta propiedad manualmente a `true` se activá el soporte de accesibilidad de Chrome, permitiendo a los desarrolladores exponer el cambio de accesibilidad a los usuarios en la configuración de la aplicación.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Desactivado por defecto.

Esta API debe ser llamada antes que el evento `ready` sea emitido.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.applicationMenu`

A `Menu | null` property that returns [`Menu`](menu.md) if one has been set and `null` otherwise. Los usuarios pueden pasar un [Menú](menu.md) para establecer esta propiedad.

### `app.badgeCount` _Linux_ _macOS_

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

**Nota:** El ejecutador de Unity requiere de la existencia de un archivo `.desktop` para hacerlo funcionar, para más información por favor leer [Desktop Environment Integration][unity-requirement].

**Note:** On macOS, you need to ensure that your application has the permission to display notifications for this property to take effect.

### `app.commandLine` _Readonly_

A [`CommandLine`](./command-line.md) object that allows you to read and manipulate the command line arguments that Chromium uses.

### `app.dock` _macOS_ _Readonly_

A [`Dock`](./dock.md) `| undefined` object that allows you to perform actions on your app icon in the user's dock on macOS.

### `app.isPackaged` _Readonly_

Una propiedad `Boolean` que retorna `true` si la aplicación está empaquetada, `false` si no lo está. Para muchas aplicaciones, esta propiedad puede ser usada para distinguir los ambientes de desarrollo y producción.

### `app.name`

A `String` property that indicates the current application's name, which is the name in the application's `package.json` file.

Usualmente el campo `name` de `package.json` es un nombre corto en minúscula, de acuerdo con las especificaciones de los módulos npm. Generalmente debe especificar un `Nombre del producto` también, el cual es el nombre de su aplicación en mayúscula, y que será preferido por Electron sobre `nombre`.

### `app.userAgentFallback`

Un `String` que es la cadena de agente de usuario Electron usará como una regresión global.

Este es el agente de usuario que se utilizará cuando ningún agente de usuario está establecido en el nivel `webContents` o `session`.  It is useful for ensuring that your entire app has the same user agent.  Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.

### `app.allowRendererProcessReuse`

Un `Boolean` que cuando es `true` deshabilita las anulaciones que Electron tiene en su lugar para asegurar que los renderer processes son reiniciados en cada navegación.  The current default value for this property is `true`.

La intención para estos anuladores es desactivan por defecto y luego en algún punto en el futuro esta propiedad sera eliminada.  Esta propiedad impacta en cuales modulos nativos puedes usar en el renderer process.  Para más información de la dirección en que Electron esta yendo con el renderer process, reinicio y uso de modulos nativos en el renderer process por favor revisa esto [Tracking Issue](https://github.com/electron/electron/issues/18397).

[tasks]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[LSCopyDefaultHandlerForURLScheme]: https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[activity-type]: https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType
[unity-requirement]: ../tutorial/desktop-environment-integration.md#unity-launcher
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[JumpListBeginListMSDN]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx
[about-panel-options]: https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc
