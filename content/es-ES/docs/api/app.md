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

* `event` Event
* `launchInfo`<string, any> de registro | [NotificationResponse](structures/notification-response.md) _macOS_

Se emite una vez, cuando Electron ha terminado de iniciarse. En macOS, `launchInfo` retiene la `userInfo` del `NSUserNotification` o la información de [`UNNotificationResponse`](structures/notification-response.md) que se usó para abrir la aplicación de , si se lanzó desde el centro de notificaciones. Además puede llamar a `app.isReady()` para comprobar si el evento ha sido lanzado y `app.whenReady()` para obtener una Promise que se cumple cuando Electron está inicializado.

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

* `event` Event
* `exitCode` Integer

Emitido cuando la aplicación se está cerrando.

**Nota:** En Windows, este evento no será emitido si la aplicación se cierra debido a un apagado/reinicio del sistema o el cierre de sesión de un usuario.

### Evento: 'open-file' _macOS_

Devuelve:

* `event` Event
* `path` String

Emitido cuando el usuario quiere abrir un archivo con la aplicación. El evento `open-file` es emitido usualmente cuando la aplicación está ya abierta y el sistema operativo quiere reusar la aplicación para abrir el archivo. `open-file` también es emitido cuando el archivo es soltado dentro del dock y la aplicación todavía no se está ejecutando. Asegúrese de escuchar sobre el evento `open-file` muy temprano en el el inicio de su aplicación para manejar este caso (incluso antes de que el evento `ready` sea emitido).

Usted debe llamar a `event.preventDefault()` si quiere manejar este evento.

En Windows, tiene que analizar `process.argv` (en el proceso principal) para encontrar la ruta del archivo.

### Evento: 'open-url' _macOS_

Devuelve:

* `event` Event
* `url` String

Emitido cuando el usuario quiere abrir una URL con la aplicación. EL archivo `Info.plist` de tu aplicación debe definir el esquema URL dentro de la llave `CFBundleURLTypes`, y establecer `NSPrincipalClass` a `AtomApplication`.

Usted debe llamar a `event.preventDefault()` si quiere manejar este evento.

### Evento: 'activate' _macOS_

Devuelve:

* `event` Event
* `hasVisibleWindows` Boolean

Emitido cuando la aplicación está activada. Varias acciones puede activar este evento, como iniciar la aplicación por primera vez, intentar relanzar la aplicación cuando ya está corriendo, o hacer click en el dock de la aplicación o en el ícono de la barra de tareas.

### Evento: 'did-become-active' _macOS_

Devuelve:

* `event` Event

Emitido cuando la aplicación mac se activa. La diferencia del evento `activate` es que `did-become-active` es emitido cada vez que la aplicación se activa, no solo cuando el icono en el Dock es pulsado o la aplicación es re-lanzada.

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
* `userInfo` unknown - Contiene el estado específico de la aplicación guardado por la actividad.

Emitido durante [Handoff][handoff] después de que una actividad de este artefacto haya sido reanudado con éxito en otro.

### Evento: 'update-activity-state' _macOS_

Devuelve:

* `event` Event
* `type` String - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].
* `userInfo` unknown - Contiene el estado específico de la aplicación guardado por la actividad.

Emitido cuando [Handoff][handoff] va a ser reanudado en otro artefacto. Si necesita actualizar el estado que se transferirá, debe llamar a `event.preventDefault ()` inmediatamente, crear un nuevo diccionario `userInfo` y llamar a `app.updateCurrentActivity()` de manera oportuna. De otra manera, la operación fallará en `continue-activity-error` será llamada.

### Evento: 'new-window-for-tab' _macOS_

Devuelve:

* `event` Event

Emitido cuando el usuario hace clic en el botón de nueva pestaña nativa de macOS. El botón de nueva pestaña solo es visible si el `BrowserWindow` actual tiene un `tabbingIdentifier`

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
* `webContents` [WebContents](web-contents.md)

Emitido cuando un nuevo [contenidoweb](web-contents.md) es creado.

### Evento: 'certificate-error'

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)
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
* `webContents` [WebContents](web-contents.md)
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

### Evento:'login'

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `authenticationResponseDetails` Object
  * `url` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `anfitrión` Cadena
  * `puerto` Íntegro
  * `realm` Cadena
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

### Event: 'gpu-info-update'

Emitido cada vez que hay una actualización de información de la GPU.

### Evento: 'gpu-process-crashed' _Obsoleto_

Devuelve:

* `event` Event
* `killed` Boolean

Emitido cuando el proceso de la GPU se crashea o es terminado.

**Obsoleto:** Este evento es reemplazado por el evento `child-process-gone` el cual contiene más información acerca de porque desapareció el proceso secundario. No siempre se debe a que haya dejado de funcionar. El booleano `killed` puede ser reemplazado al comprobar que `reason === 'killed'` cuando se cambie a ese evento.

### Evento: 'renderer-process-crashed' _Obsoleto_

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Emitido cuando el proceso render de `webContents` se bloquea o es matado.

**Obsoleto:** Este evento es reemplazado por el evento `render-process-gone` el cual contiene más información acerca de porque desapareció el renderer process. No siempre se debe a que haya dejado de funcionar.  El booleano `killed` puede ser reemplazado al comprobar que `reason === 'killed'` cuando se cambie a ese evento.

### Evento: 'render-process-gone'

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* Objeto `details`
  * `reason` String-la razón por la que el proceso de renderizado se ha ido.  Posibles valores:
    * `clean-exit` -proceso salido con un código de salida de cero
    * `abnormal-exit` -proceso salido con un código de salida distinto a cero
    * `killed` -proceso fue enviado un SIGTERM o asesinado externamente
    * `crashed` -Process se estrelló
    * `oom` -Process se quedó sin memoria
    * `launch-failed` - El proceso nunca se ha ejecutado correctamente
    * `integrity-failure` -las verificaciones de integridad de código de Windows fallaron
  * `exitCode` Integer - El código de salida del proceso, a menos que `reason` sea `launch-failed`, en cuyo caso `exitCode` será un código de error de ejecución especifico de la plataforma.

Emitido cuando el renderer process desaparece inesperadamente.  Esto suele ser porque fue estrellado o asesinado.

### Evento: 'child-process-gone'

Devuelve:

* `event` Event
* Objeto `details`
  * `type` String - Tipo de proceso. Uno de los siguiente valores:
    * `Utilidad`
    * `Zygote`
    * `Ayuda de Sandbox`
    * `GPU`
    * `Plugin Pepper`
    * `Broker de Plugin de Pepper`
    * `Desconocido`
  * `reason` String-la razón por la que el proceso hijo se ha ido. Posibles valores:
    * `clean-exit` -proceso salido con un código de salida de cero
    * `abnormal-exit` -proceso salido con un código de salida distinto a cero
    * `killed` -proceso fue enviado un SIGTERM o asesinado externamente
    * `crashed` -Process se estrelló
    * `oom` -Process se quedó sin memoria
    * `launch-failed` - El proceso nunca se ha ejecutado correctamente
    * `integrity-failure` -las verificaciones de integridad de código de Windows fallaron
  * Número de `exitCode` -el código de salida para el de proceso (p. ej., estado de waitpid if on POSIX, de GetExitCodeProcess en Windows).
  * `serviceName` String (opcional)-el nombre no localizado del proceso.
  * `name` String (opcional)-el nombre del proceso. Ejemplos de utilidad: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.

Se emite cuando el proceso hijo desaparece inesperadamente. Esto suele ser porque fue estrellado o asesinado. No incluye procesos de representador.

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

**Nota:** si la segunda instancia es iniciada por un usuario diferente a la primera, la matriz de `argv` no incluirá los argumentos.

Este evento garantiza que se ejecute después del evento `ready` de `app` para ser emitido.

**Note:** Chromium podría agregar argumentos extras de línea de comando, por ejemplo `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitido cuando `desktopCapturer.getSources()` es llamado en el render process del `webContents`. Llamando a `event.preventDefault()` hará que devuelva fuentes vacías.

### Evento: 'remote-require' _Obsoleto_

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitido cuando `remote.require()` es llamado en el renderer process de `webContents`. Llamando `event.preventDefault()` evitará que se devuelva el modulo. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-global' _Obsoleto_

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Emitido cuando `remote.getGlobal()` es llamado en el proceso de renderizado del `webContents`. Llamando `event.preventDefault()` evitará que sea devuelto el global. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-builtin' _Obsoleto_

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitido cuando `remote.getBuiltin()` es llamado en el proceso renderizador del `webContents`. Llamando `event.preventDefault()` evitará que se devuelva el modulo. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-current-window' _Obsoleto_

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitido cuando `remote.getCurrentWindow()` es llamado en el renderer process de `webContents`. Llamar a `event.preventDefault()` impedirá que el objeto sea devuelto. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

### Evento: 'remote-get-current-web-contents' _Obsoleto_

Devuelve:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitido cuando `remote.getCurrentWebContents()` es llamado en el renderer process de `webContents`. Llamar a `event.preventDefault()` impedirá que el objeto sea devuelto. Un valor personalizado puede ser devuelto estableciendo `event.returnValue`.

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

Devuelve `Boolean` - `true` Si Electron se ha inicializado correctamente, de lo contrario `false`. Ver también `app.whenReady()`.

### `app.whenReady()`

Retorna `Promise<void>` - cumplido cuando Electron esta inicializado. También puede ser utilizado para comprobar el estado de: `app.isReady()` y registrar al evento `ready` si la aplicación aun no esta lista.

### `app.focus([options])`

* `options` Object (opcional)
  * `steal` Boolean _macOS_ -hacer que el receptor de la App activa, incluso si otra App está activa actualmente.

En Linux, se centra en la primera ventana visible. En macOS, hace que la aplicación la App activa. En Windows, se centra en la primera ventana de la aplicación.

Deberías tratar de usar la opción de `steal` tan escasamente como sea posible.

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

* `name` String-puedes solicitar las siguientes rutas por el nombre:
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
  * `recent` directorio para los archivos recientes del usuario (solo Windows).
  * `logs` Directorio para los archivos de registro de la aplicación.
  * `crashDumps` directorio donde se almacenan los volcados de memoria.

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

**Nota:** esta función anula el nombre utilizado internamente por electrones; no afecta el nombre que usa el sistema operativo.

### `app.getLocale()`

Devuelve `String` - El locale actual de la aplicación. Los posibles valores de retorno son documentados [aquí](locales.md).

Para establecer la localización, necesitas usar un cambio de línea de comandos al inicio de la aplicación, el cual se puede encontrar [aquí](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md).

**Nota:** Al distribuir su aplicación empaquetada, también tiene que enviar las carpetas `locales`.

**Note:** En windows, tienes que llamarlo después del los eventos `ready` sean emitidos.

### `app.getLocaleCountryCode()`

Devuelve `String` - El código de país [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) de dos letras del sistema operativo del usuario. El valor es tomado desde APIs nativas del sistema operativo.

**Note:** Cuando no se puede detectar el código de país local, devuelve una cadena vacía.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Añade la `ruta` a la lista de documentos recientes.

Esta lista es administrada por el sistema operativo. En Windows, puede visitar la lista desde la barra de tarea y en macOS, puede visitar la desde el menu dock.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Borra la lista de documentos recientes.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`. Por ejemplo si quiere que su aplicación maneje enlaces `electron://`, llame este método con `electron` como el parámetro.
* `path` cadena (opcional) _Windows_ -la ruta al ejecutable electrónico. Por defecto a `process.execPath`
* `args` String [] (opcional) __ de Windows-argumentos pasados al ejecutable. Por defecto a un array vacío

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Establece el ejecutable actual as el manejador por defecto para un protocolo (alias esquema URI). Te permite integrar tu app aún más en el sistema operativo. Una vez registrado. todos los enlaces con `tu-protocolo://` serán abiertos con el ejecutable actual. Todo el enlace, incluyendo el protocolo, sera pasado a tu aplicación como un parámetro.

**Nota:** en macOS, solo puedes registrar protocolos que se hayan agregado para la `info.plist`de tu App, que no se puede modificar en tiempo de ejecución. Sin embargo, puedes cambiar el archivo durante el tiempo de construcción a través de [][electron-forge]de forja de electrones, [][electron-packager]de Empaquetador de electrones o editando `info.plist` con un editor de texto . Vea la [Apple's documentation][CFBundleURLTypes] para mas información.

**Note:** En un entorno de Windows Store (cuando se empaqueta como `appx`) esta API devolverá `true` para todas las llamadas pero la clave de registro que establece no será accesible por otras aplicaciones.  Para registrar tu aplicación de Windows Store como gestor de protocolo determinado debe [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

La API usa el Registro de Windows y `LSSetDefaultHandlerForURLScheme` internamente.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`.
* `ruta` Cadena (opcional) _Windows_ - por defecto a `process.execPath`
* `args` Cadena[] (opcional) _Windows_ - por defecto a un arreglo vacío

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Este método comprueba si el ejecutable actual como el controlador predeterminado para un protocolo de (también conocido como esquema de URI). Si es así, eliminará la App como el controlador predeterminado.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`.
* `ruta` Cadena (opcional) _Windows_ - por defecto a `process.execPath`
* `args` Cadena[] (opcional) _Windows_ - por defecto a un arreglo vacío

Deveulve `Boolean` -Si el ejecutable actual es el manejador por defecto para un protocolo (alias esquema URI).

**Nota:** En macOS puede usar este método para verificar si la aplicación ha sido registrada como controladora por defecto para un protocolo. También puedes verificar esto al marcar `~/Library/Preferences/com.apple.LaunchServices.plist` en el dispositivo macOS. Por favor vea la [documentación de Apple][LSCopyDefaultHandlerForURLScheme] para detalles.

La API usa el Registro de Windows y `LSCopyDefaultHandlerForURLScheme` internamente.

### `app.getApplicationNameForProtocol(url)`

* `url` String - un URL con el nombre del protocolo para verificar. A diferencia de otros métodos de esta familia, este acepta una URL entera, incluyendo `://` a un mínimo de (por ejemplo `https://`).

Devuelve `String` - Nombre de la aplicación que controla el protocolo o un string vacío si no hay controlador. Por ejemplo, si Electron es el controlador por defecto de la URL, este podría ser  `Electron` en Windows y Mac. Sin embargo, no confíe  en el formato preciso que no se garantiza que no cambie. Espere un formato diferente en Linux, posiblemente con un sufijo `.desktop`.

Este método devuelve el nombre de la aplicación del controlador para el protocolo de la URL (alias schema URI).

### `app.getApplicationInfoForProtocol(url)` _macOS_ _Windows_

* `url` String - un URL con el nombre del protocolo para verificar. A diferencia de otros métodos de esta familia, este acepta una URL entera, incluyendo `://` a un mínimo de (por ejemplo `https://`).

Devuelve `Promise<Object>` - Resuelve con un objeto conteniendo lo siguiente:

* `icon` NativeImage-el icono de visualización de la App que maneja el protocolo.
* `path` cadena-ruta de instalación de la App que maneja el protocolo.
* `name` cadena-nombre para mostrar de la App que maneja el protocolo.

Este método devuelve una promesa que contiene el nombre, ícono y ruta de la aplicación del manejador predeterminado para el protocolo (esquema URI) de una URL.

### `app.setUserTasks(tasks)` _Windows_

* `tarea` [Tarea[]](structures/task.md) - Arreglo de objetos `Tarea`

Agrega `tasks` a la categoría [Tasks][tasks] de la Jump List en Windows.

`tareas` es un arreglo de objetos [`Task`](structures/task.md).

Regresa `Boolean` - Siempre que el llamado fue exitoso.

**Nota:** Si quisiese personalizar la lista de saltos aún más use en su lugar `app.setJumpList(categories)`.

### `app.getJumpListSettings()` _Windows_

Devuelve `Objecto`:

* `minItems` Entero - El número mínimo de elementos que será mostrado en la lista (Para una descripción detallada de este valor vea el [documento MSDN][JumpListBeginListMSDN]).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array `JumpListItem` de objetos que corresponden a elementos que el usuario explícitamente a eliminado de la categorías personalizadas en el Jump List. Estos elementos no deben ser añadidos nuevamente a la jump list en el **próximo** llamado a `app.setJumpList()`, Windows no mostrará ninguna categoría personalizada que contenga alguno de los elementos removidos.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array de objetos `JumpListCategory`.

Configura o remueve una Jump list personalizada para la aplicación, y devuelve una de las siguientes cadenas:

* `ok` - Nada salió mal.
* `error` - Uno o más errores ocurrieron, habilite el registro del tiempo de corrida para averiguar la causa probable.
* `invalidSeparatorError` -se intentó agregar un separador a una categoría de personalizada en la lista de saltos. Los separadores solo se permiten en la categoría de `Tasks` estándar.
* `Error en el registro del archivo` - Fue realizado un intento de añadir el enlace del archivo a la Jump list para un tipo de archivo que la aplicación no está registrada para controlar.
* `Error Acceso a categoría personalizada negado` - Cateogrías personalizadas no pueden ser añadidas a la Jump List debido a la privacidad del usuario o a la política del grupo.

Si la `categoría` es `nula` la configuración personalizada previa de la Jump List (si hay alguna) será reemplazada por la Jump List estándar para la aplicación (manejada por Windows).

**Nota**Si un`JumpListCategory`objeto no tiene ni el `tipo`ni el nombre</code>. Si la propiedad `name` está establecida pero la propiedad `type` esta omitida entonces se asume que el `type` es `custom`.

**Nota:** Usuarios pueden remover elementos de las categorías personalizadas y Windows no permitirá que un elemento removido sea añadido de nuevo a la categoría personalizada hasta **después** del siguiente llamado exitoso a `app.setJumpList(categories)`. Cualquier intento de añadir nuevamente el elemento a la categoría personalizada antes que eso resultará en que la categoría entera sea omitida de la Jump List. La lista de elemento removidos puede ser obtenida usando `app.getJumpListSettings()`.

Aquí hay un ejemplo sencillo de cómo crear una Jump List personalizada:

```javascript
const { app } = require (' Electron ')

app. setJumpList ([
  {
    Type: ' Custom ',
    Name: ' Recent projects ',
    items: [
      {Type: ' file ', Path: ' C:\\Projects\\project1.proj '},
      {Type: ' file ', Path: ' C:\\Projects\\project2.proj '}
    ]
  },
  {//tiene un nombre por lo que se asume que ' type ' es "Custom"
    nombre: ' Tools ',
    items: [
      {
        Type: ' Task ',
        title: ' Tool A ',
        Program: Process. execPath,
        args: '--Run-Tool-a ',
        Icon: Process. execPath,
        iconIndex: 0,
        Description: ' ejecuta la herramienta A '
      },
      {
        tipo : ' Task ',
        title: ' Tool B ',
        Program: Process. execPath,
        args: '--Run-Tool-B ',
        Icon: Process. execPath,
        iconIndex: 0,
        Description: ' ejecuta la herramienta B '
      }
    ]
  },
  { type: 'frequent' },
  {//no tiene ningún nombre y no se asume ningún tipo de "tipo" de "tareas"
    elementos: [
      {
        Type: ' Task ',
        title: ' New Project ',
        Program: Process. execPath,
        args: '--New-Project ',
        Description: ' crear un proyecto nuevo. '
      },
      { type: 'separator' },
      {
        Type: ' Task ',
        title: ' recover Project ',
        Program: Process. execPath,
        args: '--recover-Project ',
        Description: ' recover Project '
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Devuelve `Boolean`

El valor devuelto de este método indica si esta instancia de su aplicación obtuvo con éxito el bloqueo.  Si no se puede obtener el bloqueo, puedes asumir que otra instancia de tu aplicación ya está corriendo con el bloqueo y salir inmediatamente.

I.e. Este método devuelve `true` si el proceso es la instancia principal de tu aplicación y tu aplicación debe seguir cargando.  Retorna `false` si su proceso deja inmediatamente de enviar parámetros a otra instancia que ya haya adquirido el bloqueo con anterioridad.

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
    myWindow = createWindow()
  })
}
```

### `app.hasSingleInstanceLock()`

Devuelve `Boolean`

Este método devuelve si esta instancia de tu aplicación es actualmente manteniendo el bloqueo de una sola instancia.  Usted puede realiza un bloqueo con `app.requestSingleInstanceLock()` o liberarlo con `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Libera todos los bloqueos que fueron creados por `requestSingleInstanceLock`. Esto permitir que varias instancias de la aplicación vuelvan a ejecutarse una al lado de la otra.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` Caden - Raramente identifica la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].
* `userInfo` any - Estado especifico de la aplicación para almacenar para su uso por otro dispositivo.
* `webpageURL` String (opcional)-la página web que se cargará en un navegador si no hay instalada una App adecuada en el dispositivo de reanudación. El esquema debe ser `http` o `https`.

Crea un `NSUserActivity` y se establece como la actividad actual. El de la actividad es elegible para [entrega][handoff] a otro dispositivo posteriormente.

### `app.getCurrentActivityType()` _macOS_

Devuelve `String` - El tipo de la actividad que se está ejecutando actualmente.

### `app.invalidateCurrentActivity()` _macOS_

Invalida la actividad actual [Handoff][handoff] del usuario.

### `app.resignCurrentActivity()` _macOS_

Marca la actividad actual del usuario [Handoff][handoff] como inactiva sin invalidarla.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` Caden - Raramente identifica la actividad. Se asigna a [`NSUserActivity.activityType`][activity-type].
* `userInfo` any - Estado especifico de la aplicación para almacenar para su uso por otro dispositivo.

Actualiza la actividad actual si su tipo coincide `type`, fusionando las entradas de `userInfo` en su actual diccionario `userInfo`.

### `app.setAppUserModelId(id)` _Windows_

* `id` Cadena

Cambia el [Id Modelo de Usuario de la Aplicación][app-user-model-id] a `id`.

### `app.setActivationPolicy(policy)` _macOS_

* `policy` cadena-puede ser ' normal ', ' accesorio ' o ' prohibido '.

Establece la política de activación para una App determinada.

Tipos de políticas de activación:

* ' regular '-la aplicación es una App ordinaria que aparece en el Dock y puede tener una interfaz de usuario.
* ' accesorio '-la aplicación no aparece en el Dock y no tiene una barra de menú, pero puede activarse de forma programática o haciendo clic en una de sus ventanas.
* ' prohibido '-la aplicación no aparece en el Dock y no puede crear ventanas o activarse.

### `app.importCertificate(options, callback)` _Linux_

* `options` Object
  * `cetificado` Cadena - camino para el archivo pkcs12.
  * `contraseña` Cadena - Frase clave para el certificado.
* `callback` Función
  * `resultado` Entero - Resultado del importe.

Importa el certificado en formato pkcs12 dentro del certificado de la plataforma. `callback` es llamado con el `result` de la operación de importación, un valor `0` indica que fue exitoso mientras que cualquier otro valor indica que fallo de acuerdo a Chromium [net_error_list](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Desactiva la aceleración por hardware para esta aplicación.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.disableDomainBlockingFor3DAPIs()`

Por defecto, Chromium inhabilita las API 3D (p. ej., WebGL) hasta que se reinicia por de dominio si la GPU procesa con demasiada frecuencia. Esta función inhabilita ese comportamiento.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.getAppMetrics()`

Devuelve [`ProcessMetric[]`](structures/process-metric.md): Array de `ProcessMetric` objetos que corresponden a la memoria y estadísticas de uso de la CPU de todos los procesos asociados con la aplicación.

### `app.getGPUFeatureStatus()`

Devuelve [`GPUFeatureStatus`](structures/gpu-feature-status.md) - el estado de la función de gráficos de `chrome://gpu/`.

**Note:** Esta información sólo es usable después de que le evento `gpu-info-update` es emitido.

### `app.getGPUInfo(infoType)`

* `infoType` String - Puede ser `basic` o `complete`.

Devuelve `Promise<unknown>`

Para `infoType` igual a `complete`: La promesa es completada con `Object` conteniendo toda la información de la GPU como [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). Esto incluye la versión y la información del controlador que es mostrada en la pagina `chrome://gpu</0.</p>

<p spaces-before="0">Para <code>infoType` igual a `basic`: La promesa se cumple con  `Object` que contiene pocos atributos que son solicitados con `complete`. Aquí hay un ejemplo de respuesta básica:

```js
{
  auxAttributes:
   {
     Amdconmutable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     Optimus: false,
     passthroughCmdDecoder: false,
     espacio aislado: falso,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0
   },
  gpuDevice:
   [{ active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 }],
  machineModelName: ' MacBookPro ',
  machineModelVersion: ' 11,5 '
}
```

El uso de `basic` debería ser preferido si sólo se necesita información básica como `vendorId` o `driverId`.

### `app.setBadgeCount([count])` _Linux_ _macOS_

* `count` Integer (opcional) - Si un valor es proporcionado, establece el badge al valor proporcionado de lo contrario en macOS, muestra un simple punto blanco (p. ej. número desconocido de notificaciones). En Linux, si un valor no es proporcionado el badge no se mostrará.

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Establece la insignia de contador para la App actual. Si configuras la cuenta como `0` , se ocultará la insignia de .

En macOS, se muestra en el icono del Dock. En Linux, solo funciona para Unity launcher.

**Nota:** unidad Launcher requiere la existencia de un archivo `.desktop` para trabajar, para obtener más información, consulta [integración del entorno del escritorio][unity-requirement].

### `app.getBadgeCount()` _Linux_ _macOS_

Devolver `Entero` - El valor actual establecido en la insignia contraria.

### `app.isUnityRunning()` _Linux_

Devuelve `Boolean` - Aunque el ambiente del escritorio actual sea un ejecutador de Unity.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (opcional)
  * `path` cadena (opcional) _Windows_ -la ruta ejecutable con la que compararla. Por defecto a `process.execPath`.
  * `args` String [] (opcional) _Windows_ -los argumentos de la línea de comandos para comparar con. Por defecto a un array vacío.

Su proporcionas las opciones `path` y `args` a `app.setLoginItemSettings`, entonces necesitas pasar los mismos argumentos aquí para `openAtLogin` para que sea correctamente configurado.

Devuelve `Objecto`:

* `openAtLogin` Boolean - `true` si la aplicación es establecida para abrirse al iniciar.
* `openAsHidden` Boolean _macOS_ - `true` si la App está configurada para abrirse como oculta en el inicio de sesión. Esta configuración no está disponible en [][mas-builds]MAS construye.
* `wasOpenedAtLogin` Boolean _macOS_ - `true` si la APP se abrió en el inicio de sesión automáticamente. Esta configuración no está disponible en [][mas-builds]MAS construye.
* `wasOpenedAsHidden` Boolean _macOS_ - `true` si la APP se abrió como un elemento de inicio de sesión oculto . Esto indica que la aplicación no debería abrir ninguna ventana al inicio. Esta configuración no está disponible en [][mas-builds]MAS construye.
* `restoreState` Boolean _macOS_ - `true` si la APP se abrió como elemento de inicio de sesión que debería restaurar el estado desde la sesión anterior. Esto indica que la aplicación debería restaurar las ventanas que fueron abiertas la última vez que la aplicación fue cerrada. Esta configuración no está disponible en [][mas-builds]MAS construye.
* `executableWillLaunchAtLogin` Boolean _Windows_ - `true` si la App está configurada para abrir en el inicio de sesión y no se desactiva su llave de ejecución. Esto difiere de `openAtLogin` ya que ignora la opción de `args` , esta propiedad será verdadera si el ejecutable dado se iniciará en el inicio de sesión con **cualquier argumento de** .
* `launchItems` Object [] _Windows_
  * `name` cadena _valor de nombre de_ de Windows de una entrada de registro.
  * `path` cadena _Windows_ -el ejecutable para una aplicación que corresponde a una entrada de registro.
  * `args` String [] _Windows_ -los argumentos de la línea de comandos para pasar al ejecutable.
  * `scope` cadena _Windows_ -una de `user` o `machine`. Indica si la entrada del registro está bajo `HKEY_CURRENT USER` o `HKEY_LOCAL_MACHINE`.
  * `enabled` Boolean _Windows_ - `true` si la clave del registro de la App está en Inicio aprobada y, por lo tanto, se muestra como `enabled` en el administrador de tareas y en los parámetros de Windows.

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* Objeto `settings`
  * `openAtLogin` Boolean (opcional)- `true` para abrir la app en el inicio de sesión, `false` para eliminar la App como elemento de inicio de sesión. Por defecto es `false`.
  * `openAsHidden` Boolean (opcional) _macOS_ - `true` para abrir la App como oculta. Por defecto a `false`. El usuario puede editar esta configuración desde la Preferencias del Sistema, así que `app.getLoginItemSettings().wasOpenedAsHidden` debe ser comprobado cuanto la aplicación es abierta para conocer el valor actual. Esta configuración no está disponible en [][mas-builds]MAS construye.
  * `path` cadena (opcional) _Windows_ -el ejecutable que se iniciará en el inicio de sesión. Por defecto a `process.execPath`.
  * `args` String [] (opcional) _Windows_ -los argumentos de la línea de comando que se pasarán a el ejecutable. Por defecto a un array vacío. Cuida los trazados de envolver en comillas.
  * `enabled` Boolean (opcional) _Windows_ - `true` cambiará la clave de registro aprobada de inicio y `enable / disable` la app en el administrador de tareas y los parámetros de Windows. Por defecto es `true`.
  * `name` cadena (opcional) _nombre de_ -valor de Windows para escribir en el registro. El valor predeterminado es AppUserModelId () de la App. Establece los objetos de inicio de ajuste de la aplicación.

Para trabajar con `autoUpdater` de Electron en Windows, que usa [][Squirrel-Windows]de ardilla, desearás configurar la ruta de inicio para actualizar. exe y pasar argumentos que especifiquen tu nombre de aplicación de . Por ejemplo:

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

**Nota:** árbol de accesibilidad de representación puede afectar de manera significativa el rendimiento de tu app. No se debe habilitar por defecto.

### `app.showAboutPanel()`

Muestra las opciones del panel acerca de las aplicaciones. Estas opciones se pueden sobrescribir con `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)`

* `options` Object
  * `applicationName` Cadena (opcional) - El nombre de la aplicación.
  * `applicationVersion` Cadena (opcional) - La versión de la aplicación.
  * `copyright` Cadena (opcional) - La información de Copyright.
  * `version` cadena (opcional) _macOS_ -el número de versión de construcción de la App.
  * `credits` cadena (opcional) _macOS_ _Windows_ -información de crédito.
  * `authors` String [] (opcional) _Linux_ -lista de autores de la App.
  * `website` cadena (opcional) _Linux_ -el sitio web de la App.
  * `iconPath` cadena (opcional) _Linux_ _Windows_ -path al icono de la app en un formato de archivo JPEG o PNG. En Linux, se mostrarán como 64x64 píxeles mientras se retiene la proporción de aspecto.

Establece el panel de opciones. Esto reemplazará los valores definidos en el archivo de `.plist` de la app en macOS. Ver el [Apple docs][about-panel-options] para más detalles. En Linux, los valores deben establecerse para ser mostrados; no hay valores por defecto.

Si no estableces `credits` pero aún deseas sacarlos en tu aplicación, AppKit buscará por un archivo llamado "Credits.html", "Credits.rtf", y "Credits.rtfd", en ese orden, en el paquete devuelto por el método de clase principal NSBundle. El primer archivo encontrado es usado, y si no se encuentra ninguno, el área de información se deja en blanco. Vea la [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) de Apple para más información.

### `app.isEmojiPanelSupported()`

Devuelve `Boolean` - si la versión del sistema operativo actual permite permite o no los selectores de emoji nativos.

### `app.showEmojiPanel()` _macOS_ _Windows_

Muestra el selector de emoji nativo de la plataforma.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _mas_

* `bookmarkData` String - El marcador de datos de ámbito de seguridad de codificación base64 devuelto por los métodos `dialog.showOpenDialog` o `dialog.showSaveDialog`.

Devuelve `Function` - Esta función **debe** ser llamado una vez que hayas terminado de acceder el archivo de ámbito de seguridad. Si no recuerdas de dejar de acceder el marcador, [recursos de nucleo se fugarán](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) y tu aplicación se perderá su capacidad de alcanzar afuera del entorno aislado completamente hasta que se reinicia tu aplicación.

```js
// Empezar a acceder el archivo.
const stopAccessingSecurityScopedResource = app. startAccessingSecurityScopedResource (Data)
//ahora puedes acceder al archivo fuera del entorno Sandbox 🎉

//recuerda dejar de acceder al archivo una vez que hayas terminado con él.
stopAccessingSecurityScopedResource ()
```

Empezar a acceder un recurso de ámbito de seguridad. Con este método las aplicaciones Electron que están empaquetadas para la Mac App Store pueden llegar fuera de su caja de arena para acceder a los archivos elegidos por el usuario. Ver a [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) por una descripción de cómo funciona este sistema.

### `App. enableSandbox ()`

Habilita el modo sandbox completo en la aplicación. Esto significa que todos los renderizadores se lanzarán en un espacio aislado, independientemente del valor de la marca de `sandbox` en WebPreferences.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.isInApplicationsFolder()` _macOS_

Devuelve `Boolean` - Si la aplicación esta actualmente ejecutándose desde la carpeta de Aplicación del sistema. Usar en combinación con `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` _macOS_

* `options` Object (opcional)
  * `conflictHandler` function \<Boolean> (opcional) - Un controlador para el potencial conflicto en el fallo de movimiento.
    * `conflictType` String - El tipo de conflicto de movimiento encontrado por el controlador; puede ser `exists` o `existsAndRunning`, donde `exists` quiere decir que una aplicación con el mismo nombre está presente el directorio de las Aplicaciones y `existsAndRunning` quiere decir que que existe y que se está ejecutando actualmente.

Devuelve `Boolean` - Si el movimiento fue realizado correctamente. Ten en cuenta que si el movimiento es exitoso, tu aplicación se cerrará y se relanzará.

No se presentará un diálogo de confirmación por defecto. Si deseas permitir que el usuario confirme la operación, puedes hacerlo usando el [`dialog`](dialog.md) API.

**Nota:** Este método emite errores si algo que no sea el usuario provoca un error en el movimiento. Por ejemplo si el usuario cancela el dialogo de autorización, este método va a devolver falso. Si nosotros no realizamos la copia, entonces este método va a lanzar un error. El mensaje de error debería ser descriptivo y advertir exactamente que ha fallado.

Por defecto, si una app del mismo nombre que la que se está trasladando existe en el directorio de aplicaciones y no __ ejecutándose, la App existente se traspasará y la App activa se moverá a su lugar. Si __ se está ejecutando, la App que se ejecuta preexistente asumirá el foco y la App previamente activa se cerrará por sí misma. Este comportamiento puede ser cambiado proporcionando un controlador de conflicto opcional, donde el booleano devuelto por el controlado determina si el conflicto de movimiento se resuelve o no con el controlador por defecto.  es decir, devolviendo `false` se asegura que no se tomaran más acciones, devolviendo `true` resultará en el comportamiento por defecto y el método continuando.

Por ejemplo:

```js
App. moveToApplicationsFolder ({
  conflictHandler: (conflictType) => {
    if (conflictType = = = ' exists ') {
      diálogo de retorno. showMessageBoxSync ({
        Type: ' Question ',
        botones: [' Halt Move ', ' Continue Move '],
        defaultId: 0,
        Message: ' una app de este nombre ya existe '
      }) = = = 1
    }
  }
})
```

Significaría que si una aplicación ya existe en el directorio del usuario, si el usuario elige 'Continuar Mover' entonces la función debería continuar con su comportamiento por defecto y la aplicación existente será eliminada y la aplicación activa será movida en su lugar.

### `app.isSecureKeyboardEntryEnabled()` _macOS_

Devuelve `Boolean` -si `Secure Keyboard Entry` está habilitado.

Por defecto, esta API devolverá `false`.

### `app.setSecureKeyboardEntryEnabled(enabled)` _macOS_

* `enabled` Boolean-enable o Disable `Secure Keyboard Entry`

Establecer el `Secure Keyboard Entry` está habilitado en tu aplicación.

Al usar esta API, se puede evitar que otros procesos intercepten información importante como contraseña y otra información confidencial.

Consulta [](https://developer.apple.com/library/archive/technotes/tn2150/_index.html) de documentación de Apple para obtener más detalles.

**Nota:** habilitar `Secure Keyboard Entry` solo cuando sea necesario y desactívelo cuando ya no se necesite.

## Propiedades

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

Un propiedad `Boolean` eso es `true` si el soporte de accesibilidad de Chrome esta activado, `false` de otra manera. Esta propiedad será `true` si se ha detectado el uso de tecnologías asistitivas, como lectores de pantalla. Estableciendo esta propiedad manualmente a `true` se activá el soporte de accesibilidad de Chrome, permitiendo a los desarrolladores exponer el cambio de accesibilidad a los usuarios en la configuración de la aplicación.

Consulta [](https://www.chromium.org/developers/design-documents/accessibility) de documentación de accesibilidad de Chromium para obtener más detalles. Desactivado por defecto.

Esta API debe ser llamada antes que el evento `ready` sea emitido.

**Nota:** árbol de accesibilidad de representación puede afectar de manera significativa el rendimiento de tu app. No se debe habilitar por defecto.

### `app.applicationMenu`

Una propiedad `Menu | null` que devuelve [`Menu`](menu.md) si uno ha sido establecido y `null` de lo contrario. Los usuarios pueden pasar un [Menú](menu.md) para establecer esta propiedad.

### `app.badgeCount` _Linux_ _macOS_

Una propiedad `Integer` que devuelve el recuento de insignias para la aplicación actual. Si configuras la cuenta como `0` , se ocultará la insignia.

En macOS, configurar esto con cualquier número entero distinto de cero en el icono del Dock. En Linux, esta propiedad solo funciona para Unity Launcher.

**Nota:** unidad Launcher requiere la existencia de un archivo `.desktop` para trabajar, para obtener más información, consulta [integración del entorno del escritorio][unity-requirement].

**Nota:** en macOS, debes asegurarte de que tu aplicación tiene el permiso para mostrar las notificaciones de esta propiedad para que surtan efecto.

### `app.commandLine` _Readonly_

Un objeto [`CommandLine`](./command-line.md) que te permite leer y manipular los argumentos de linea de comando que usa Chromium.

### `app.dock` _macOS_ _ReadOnly_

Una [`Dock`](./dock.md) `| undefined` objeto que te permite realizar acciones en el icono de tu app en el Dock de del usuario en macOS.

### `app.isPackaged` _Readonly_

Una propiedad `Boolean` que retorna `true` si la aplicación está empaquetada, `false` si no lo está. Para muchas aplicaciones, esta propiedad puede ser usada para distinguir los ambientes de desarrollo y producción.

### `app.name`

Una propiedad `String` que índica el nombre actual de la aplicación, el cual es el nombre en el archivo `package.json` de la aplicación.

Usualmente el campo `name` de `package.json` es un nombre corto en minúscula, de acuerdo con las especificaciones de los módulos npm. Generalmente debe especificar un `Nombre del producto` también, el cual es el nombre de su aplicación en mayúscula, y que será preferido por Electron sobre `nombre`.

### `app.userAgentFallback`

Un `String` que es la cadena de agente de usuario Electron usará como una regresión global.

Este es el agente de usuario que se utilizará cuando ningún agente de usuario está establecido en el nivel `webContents` o `session`.  Es útil para asegurar que la aplicación entera tiene el mismo agente de usuario.  Establecer a un valor personalizado lo antes posible en la inicialización de tu aplicación para asegurar que el valor sobrescrito es usado.

### `app.allowRendererProcessReuse`

Un `Boolean` que cuando es `true` deshabilita las anulaciones que Electron tiene en su lugar para asegurar que los renderer processes son reiniciados en cada navegación.  El valor predeterminado actual de para esta propiedad es `true`.

La intención para estos anuladores es desactivan por defecto y luego en algún punto en el futuro esta propiedad sera eliminada.  Esta propiedad impacta en cuales modulos nativos puedes usar en el renderer process.  Para más información de la dirección en que Electron esta yendo con el renderer process, reinicio y uso de modulos nativos en el renderer process por favor revisa esto [Tracking Issue](https://github.com/electron/electron/issues/18397).

### `app.runningUnderRosettaTranslation` _macOS_ _ReadOnly_

Una `Boolean` que cuando `true` indica que la APP se está ejecutando actualmente dentro del [de Rosetta Translator Environment](https://en.wikipedia.org/wiki/Rosetta_(software)).

Puedes usar esta propiedad para pedir a los usuarios que descarguen la versión arm64 de tu aplicación cuando están ejecutando la versión x64 en Rosetta incorrectamente.

[tasks]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[electron-forge]: https://www.electronforge.io/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[electron-packager]: https://github.com/electron/electron-packager
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[LSCopyDefaultHandlerForURLScheme]: https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[activity-type]: https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType
[unity-requirement]: ../tutorial/desktop-environment-integration.md#unity-launcher
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[JumpListBeginListMSDN]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx
[about-panel-options]: https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc
