# app

> Controla el ciclo de vida de los eventos de su aplicación.

Proceso: [Main](../glossary.md#main-process)

Los siguientes ejemplos muestran como salir de la aplicación cuando la última ventana está cerrada:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Eventos

El objeto `app` produce los siguientes eventos:

### Evento: 'will-finish-launching'

Emitido cuando la aplicación ha terminado su iniciación básica. En windows y Linux el evento `will-finish-launching` es el mismo que el evento `ready`; en macOS este evento representa la notificación `applicationWillFinishLaunching` de `NSApplication`. Normalmente configurará aquí los detectores para los eventos `open-file` y `open-url`, e iniciará el informador de errores y el actualizador automático.

En la mayoría de los casos, debería hacerse todo en el controlador del evento `ready`.

### Evento: 'ready'

Devuelve:

* `launchInfo` Object *macOS*

Emitido cuando Electron se ha terminado de iniciar. En macOS, `launchInfo` almacena el `userInfo</0 de <code>NSUserNotification` que fue usado para abrir la aplicación, si fue lanzado desde el centro de notificaciones. Puede usar `app.isReady()` para verificar si el evento ya fue disparado.

### Evento: 'window-all-closed'

Emitido cuando todas las ventanas han sido cerradas.

Si no se subscribe a este evento y todas las ventanas están cerradas, el comportamiento por defecto es salir de la aplicación; sin embargo, si se subscribe, usted controla si la aplicación se cierra o no. Si el usuario presionó `Cmd + Q`, o el desarrollador llamó a `app.quit()`, Electron primero tratará de cerrar todas las ventanas y emitir el evento `will-quit`, y en este caso el evento `window-all-closed` no será emitido.

### Evento: 'before-quit'

Devuelve:

* `evento` Evento

Emitido antes de que la aplicación empiece a cerrar las ventanas. Llamar a `event.preventDefault()` evitará el comportamiento por defecto, que es cerrar la aplicación.

**Nota:** Si el cierre de la aplicación fue iniciada por `autoUpdater.quitAndInstall()` entonces `before-quit` es emitido *después de* emitir el evento`close` en todas las ventanas y cerrarlas.

### Evento: 'will-quit'

Devuelve:

* `event` Event

Emitido cuando todas las ventanas han sido cerradas y la aplicación se cerrará. Llamando `event.preventDefault()` se evitará el comportamiento por defecto, que es cerrar la aplicación.

Consulte la descripción del evento `window-all-closed` por las diferencias con los eventos `will-quit` y `window-all-closed`.

### Evento: 'quit'

Devuelve:

* `event` Event
* `exitCode` Integer

Emitido cuando la aplicación se está cerrando.

### Evento: 'open-file' *macOS*

Devuelve:

* `event` Event
* `path` String

Emitido cuando el usuario quiere abrir un archivo con la aplicación. El evento `open-file` es emitido usualmente cuando la aplicación está ya abierta y el sistema operativo quiere reusar la aplicación para abrir el archivo. `open-file` también es emitido cuando el archivo es arrojado dentro del dock y la aplicación no está corriendo todavía. Asegúrese de escuchar sobre el evento `open-file` muy temprano en el el inicio de su aplicación para controlar este caso (incluso antes de que el evento `ready` esté emitido).

Usted debe llamar a `event.preventDefault()` si quiere manejar este evento.

En Windows, tiene que analizar gramaticalmente `process.argv` (en el proceso principal) para encontrar la ruta del archivo.

### Evento: 'open-url' *macOS*

Devuelve:

* `evento` Evento
* `url` String

Emitido cuando el usuario quiere abrir una URL con la aplicación. El archivo `Info.plist` de su aplicación debe definir el esquema de url en la llave `CFBundleURLTypes`, y configurar `NSPrincipalClass` para `AtomApplication`.

Usted debe llamar a `event.preventDefault()` si quiere manejar este evento.

### Evento: 'activate' *macOS*

Devuelve:

* `event` Evento
* `hasVisibleWindows` Buleano

Emitido cuando la aplicación está activada. Varias acciones puede activar este evento, como iniciar la aplicación por primera vez, intentar relanzar la aplicación cuando ya está corriendo, o hacer click en el dock de la aplicación o en el ícono de la barra de tareas.

### Evento: 'continue-activity' *macOS*

Devuelve:

* `event` Evento
* `tipo` cadena - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Objecto - Contiene el estado específico de la aplicación almacenado por la actividad de otro artefacto.

Emitido durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) cuando una actividad de un artefacto diferente quiere ser reanudado. Usted debe llamar `event.preventDefault()` si quiere manejar este evento.

La actividad de un usuario puede ser continuada solo en una aplicación que tenga la misma identificación de equipo de desarrolladores como la la aplicación fuente de las actividades y que soporte los tipos de actividad. Los tipos de actividades soportadas están en el `Info.plist` de la aplicación bajo la llave `NSUserActivityTypes`.

### Event: 'will-continue-activity' *macOS*

Devuelve:

* `event` Evento
* `tipo` cadena - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) before an activity from a different device wants to be resumed. Usted debe llamar `event.preventDefault()` si quiere manejar este evento.

### Event: 'continue-activity-error' *macOS*

Devuelve:

* `event` Evento
* `tipo` cadena - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` Cadena - Una cadena con la descripción localizada del error.

Emitido durante [Manos Libres](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) cuando una actividad desde un dispositivo diferente no se reanuda.

### Event: 'activity-was-continued' *macOS*

Devuelve:

* `event` Evento
* `tipo` cadena - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `Información de Usuario` Objeto: contiene el estado específico de la aplicación almacenado por la actividad.

Emitido durante [Manos Libres](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) después de que se realiza una actividad con éxito en este dispositivo se reanuda en otro.

### Event: 'update-activity-state' *macOS*

Devuelve:

* `event` Evento
* `tipo` cadena - Una cadena identificando la actividad. Se asigna a [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `Información de Usuario` Objeto: contiene el estado específico de la aplicación almacenado por la actividad.

Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediatelly, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise the operation will fail and `continue-activity-error` will be called.

### Event: 'new-window-for-tab' *macOS*

Devuelve:

* `event` Evento

Emitido cuando el usuario hace click en el nuevo botón nativo de madOS. El nuevo botón es visible solamente si el `BrowserWindow` actual tiene `tabbingIdentifier`

### Event: 'browser-window-blur'

Devuelve:

* `event` Evento
* `window` [BrowserWindow](browser-window.md)

Emitido cuando el [browserWindow](browser-window.md) está borroso.

### Event: 'browser-window-focus'

Devuelve:

* `event` Evento
* `window` [BrowserWindow](browser-window.md)

Emitido cuando se enfoca un [browserWindow](browser-window.md).

### Evento: 'browser-window-created'

Devuelve:

* `event` Evento
* `window` [BrowserWindow](browser-window.md)

Emitido cuando se crea un [browserWindow](browser-window.md).

### Event: 'web-contents-created'

Devuelve:

* `event` Evento
* `Contenidosweb` [Contenidosweb](web-contents.md)

Emitido cuando un nuevo [contenidoweb](web-contents.md) es creado.

### Event: 'certificate-error'

Devuelve:

* `event` Evento
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `url` String
* `error` cadena - el error del código
* `certificate` [certificate](structures/certificate.md)
* `callback` Función 
  * `isTrusted` Boleano - Si considera que el certificado como de confianza

Emitido cuando falla la verificación de `certificate` por `url`, al confiar en el certificado usted debe prevenir el comportamiento con `event.preventDefault()` y llamar `callback(true)`.

```javascript
const {app} = require('electron')

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

### Event: 'select-client-certificate'

Devuelve:

* `event` Evento
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `url` URL
* `certificateList`[Certificate[]](structures/certificate.md)
* `callback` Función 
  * `certificate`[Certificate](structures/certificate.md)(opcional)

Emitido cuando el certificado de un cliente es requerido.

La `url` corresponde a la entrada de navegación requerida al certificado del cliente y `callback` puede ser llamado con una entrada filtrada de la lista. Usando `event.preventDefault()` previene que la aplicación use el primer certificado almacenado.

```javascript
const {app} = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Event:'login'

Devuelve:

* `event` Evento
* `Contenidosweb` [Contenidosweb](web-contents.md)
* `request` Object 
  * `method` Cuerda
  * `url` URL
  * `referrer` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `esquema` Cadena
  * `anfitrión` Cadena
  * `puerto` Íntegro
  * `realm` Cadena
* `callback` Función 
  * `username` Cadena
  * `contraseña` Cadena

Emitido cuando `webContents` quiere hacer una autenticación básica.

El comportamiento por defecto es cancelar todas las autenticaciones, para anular esto usted debería prevenir el comportamiento por defecto con `event.preventDefault()` y llamar `callback (username, password) ` con las credenciales.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Event: 'gpu-process-crashed'

Devuelve:

* `event` Evento
* `killed` Booleano

Es emitido cuando el proceso de la gpu se crashea o es terminado.

### Event: 'accessibility-support-changed' *macOS* *Windows*

Devuelve:

* `event` Evento
* `accessibilitySupportEnabled` Booleano - `true` cuando el soporte de accesibilidad de Chrome está activado, de lo contrario `false`.

Es emitido cuando el soporte de accesibilidad de Chrome es modificado. Este evento se dispara cuando las tecnologías de asistencia, como un lector de pantalla, sin activados o desactivados. Vea https://www.chromium.org/developers/design-documents/accessibility para mas información.

## Métodos

El objeto `app` tiene los siguientes métodos:

**Note:** Algunos métodos solo están disponibles es sistemas operativos específicos y son etiquetados como tal.

### `app.quit()`

Intenta cerrar todas las ventanas. El evento `before-quit` se producirá primero. Si todas las ventas son cerradas exitosamente, el evento `will-quit` será producido y por defecto la aplicación se cerrará.

Este método garantiza que todos los eventos de `beforeunload` y `unload` serán correctamente ejecutados. Es posible que una ventana cancele la salida regresando `falso` en el manipulador de eventos `antes de cargar`.

### `app.exit([exitCode])`

* `exitCode` Íntegro (opcional)

Cierra inmediatamente con `exitCode`. `exitCode` por defecto a 0.

Tods las ventanas se cerrarán inmediatamente sin preguntar al usuarios y los eventos `before-quit` y `will-quit` no se correrán.

### `app.relaunch([options])`

* `opciones` Objecto (opcional) 
  * `args` Cadena[] - (opcional)
  * `execPath` Cadena (opcional)

Reinicia la aplicación cuando la instancia se cierra.

Por defecto la nueva instancia usará el mismo directorio de trabajo y los argumentos de la linea de comandos con la instancia actual. Cuando `args` es especificada, el `args` se convertirá en un argumento de la linea de comandos. Cuando `execPath` es especificado, el`execPath` Será ejecutado en el relanzador en vez de la aplicación en curso.

Note que este método no cierta la aplicación cuando esta es ejecutada, tiene que llamar `app.quit` o `app.exit` después de llamar `app.relaunch` para hacer que la aplicación se reinicie.

Cuando `app.relaunch` es llamada múltiples veces, múltiples instancias serán iniciadas después de que la actual instancia se cierre.

Un ejemplo de reiniciar la instancia actual de forma inmediata y agregar un nuevo argumento a la línea de comando de la nueva instancia:

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Devuelve `Boolean` - `true` Si Electron se ha inicializado correctamente, de lo contrario `false`.

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

Devuelve `cadena` - Una ruta a un directorio especial o a un archivo asociado con un `nombre`. Cuando hay una falla se lanza un `Error`.

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
* `logs` Directory for your app's log folder.
* `pepperFlashSystemPlugin` Camino completo a la versión del sistema del plugin pepper flash.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `opciones` Object (opcional) 
  * `size` String 
    * `pequeño` - 16x16
    * `normal` - 32x32
    * `grande` - 48x48 en *Linux*, 32x32 en *Windows*, no compatible en *macOS*.
* `callback` Función 
  * `error` Error
  * `ícono` [NativeImage](native-image.md)

Busca un ícono asociado a la ruta.

En *Windows*, Hay dos tipos de íconos:

* Íconos asociados con cierta extensión de un archivo, como `.mp3`, `.png`, etc.
* Íconos dentro del archivo mismo, como `.exe`, `.dll`, `.ico`.

En *Linux* y *macOS*, los íconos dependen de la aplicación asociada al tipo de archivo.

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

Regresa `Cadena` - La localización actual de la aplicación. Los valores posibles son documentados [aquí](locales.md).

**Nota:** Al distribuir su aplicación empaquetada, también tiene que enviar las carpetas `locales`.

**Nota:** En Windows tiene que llamarlo antes de que el evento `listo` sea emitido.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Añade la `ruta` a la lista de documentos recientes.

Esta lista es administrada por el sistema operativo. En Windows puede visitar la lista desde la barra de tareas, y en macOS puede acceder a ella desde el menú dock.

### `app.clearRecentDocuments()` *macOS* *Windows*

Borra la lista de documentos recientes.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`. Si quiere que su aplicación maneje enlaces `electron://`, llame este método con `electron` como el parámetro.
* `ruta` Cadena (opcional) *Windows* - por defecto a `process.execPath`
* `args` Cadena[] (opcional) *Windows* - por defecto a un arreglo vacío

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Este método configura el ejecutable actual como por defecto a utilizar por un protocolo (esquema aka URI). Esto le permite integrar la profundidad de la aplicación dentro del sistema operativo. Una vez registrado, todos los enlaces con `your-protocol://` serán abiertos con el ejecutable. El enlace completo, incluyendo el protocolo, será enviado a su aplicación como un parámetro.

En Windows, puede proveer una opción de ruta opcional, la ruta a su ejecutable, y args, un arreglo de argumento para ser pasados a su ejecutable cuando este se lance.

**Nota:** En macOS, solo puede registrar protocolos que han sido añadidos a la `info.plist` de su aplicación, que no puede ser modificada mientras la aplicación esté corriendo. Usted también puede modificar el archivo con un editor de texto o script durante su creación. Vea la [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) para mas información.

El API usa el registro de Windows y LSSetDefaultHandlerForURLScheme internamente.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`.
* `ruta` Cadena (opcional) *Windows* - por defecto a `process.execPath`
* `args` Cadena[] (opcional) *Windows* - por defecto a un arreglo vacío

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Este método verifica si el ejecutable actual como el manejador por defecto para un protocolo (aka Esquema URI). Si es así, removerá la aplicación como el manejador por defecto.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocolo` Cadena - El nombre de su protocolo, sin el `://`.
* `ruta` Cadena (opcional) *Windows* - por defecto a `process.execPath`
* `args` Cadena[] (opcional) *Windows* - por defecto a un arreglo vacío

Devuelve `Boolean`

Este método verifica si el ejecutable acutal es el manejador por defecto para un protocolo (aka esquema URI). Si es así, regresará verdad. de otra manera, regresará falso.

**Nota:** En macOS puede usar este método para verificar si la aplicación ha sido registrada como controladora por defecto para un protocolo. También puedes verificar esto al marcar `~/Library/Preferences/com.apple.LaunchServices.plist` en el dispositivo macOS. Por favor vea la [documentación de Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) para detalles.

El API usa el registro de Windows y LSCopyDefaultHandlerForURLScheme internamente.

### `app.setUserTasks(tasks)` *Windows*

* `tarea` [Tarea[]](structures/task.md) - Arreglo de objetos `Tarea`

Añade `tareas` a la categoría [Tareas](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) de la JumpList en Windows.

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

**Nota:** Si un objeto de `JumpListCategory` no tiene ni el `tipo` ni el `nombre` de su conjunto de propiedad, se asume que su `tipo` es `tareas`. Si la propiedad `nombre` está establecida pero la propiedad `tipo` se omite entonces el `tipo` se asume que el tipo es `personalizado`.

**Nota:** Usuarios pueden remover elementos de las categorías personalizadas y Windows no permitirá que un elemento removido sea añadido de nuevo a la categoría personalizada hasta **después** del siguiente llamado exitoso a `app.setJumpList(categories)`. Cualquier intento de añadir nuevamente el elemento a la categoría personalizada antes que eso resultará en que la categoría entera sea omitida de la Jump List. La lista de elemento removidos puede ser obtenida usando `app.getJumpListSettings()`.

Aquí hay un ejemplo sencillo de cómo crear una Jump List personalizada:

```javascript
const {app} = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // tiene un nombre por lo que `type` se asume tener nombre "custom": 'Tools',
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
  { // no tiene nombre ni tipo por lo que `type` se asume ser "tasks"
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

### `app.makeSingleInstance(callback)`

* `callback` Función 
  * `argv` Cadena[] - Un arreglo de las líneas de argumentos de comandos de segunda instancia
  * `workingDirectory` Cadena - El directorio de trabajo de segunda instancia

Devuelta `Boolean`.

Este método hace de tu aplicación una de segunda instancia - además de permitir que tu aplicación se ejecuta de muchas instancias, esto asegurará que solo una instancia única de tu aplicación se esté ejecutando, y otras señales de instancias a esta instancia y sale.

`callback` será llamado por la primera instancia con `callback(argv, workingDirectory)` cuando una segunda instancia ha sido ejecutada. `argv` es un arreglo de las líneas de argumentos de segunda instancia, y `workingDirectory` es su directorio de trabajo actual. Usualmente las aplicaciones responden a esto haciendo su ventana principal concentrada y no minimizada.

El `callback` está garantizado de ser ejecutado luego del evento `ready` de `app` sea emitido.

Este método devuelve `false` si tu proceso es la instancia primaria de la aplicación y tu aplicación debería continuar cargando. Y devuelve `true` si tu proceso ha enviado sus parámetros otra instancia y debería retirarse inmediatamente.

En macOS, el sistema fuerza instancias únicas automáticamente cuando los usuarios intentan abrir una segunda instancia de tu aplicación en Finder, y los eventos `open-file` y `open-url` serán emitidos por eso. Como sea, cuando los usuarios inicien tu aplicación en línea de comando, los mecanismos de instancia única del sistema serán puenteados y tendrás que usar este método para asegurar la única instancia.

Un ejemplo de activar la ventana de la instancia primaria cuando una de segunda instancia se inicia:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Alguien ha intentado correr a segunda instancia, deberíamos enfocarnos en nuestra ventana.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Crear myWindow, cargar el resto de la aplicación, etc...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Suelta todos los bloqueos que fueron creados por `makeSingleInstance`. Esto permitirá que múltiples instancias de la aplicación se ejecuten nuevamente de lado a lado.

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
* `callback` Función 
  * `resultado` Entero - Resultado del importe.

Importa el certificado en formato pkcs12 dentro del certificado de la plataforma. `callback` es llamado con `result` para importar operaciones, un valor de `` indica que fue exitoso, mientras que otro valor indica un error acorde a chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Desactiva la aceleración por hardware para esta aplicación.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.disableDomainBlockingFor3DAPIs()`

Por defecto, Chromium desactiva 3D APIs (ej., WebGL) hasta reiniciar por dominio si el proceso de GPU crashea frecuentemente. Esta función desactiva ese comportamiento.

Este método solo puede ser llamado despues de iniciada la aplicación.

### `app.getAppMemoryInfo()` *Deprecated*

Devuelve [`ProcessMetric[]`](structures/process-metric.md): el conjunto de objetos `ProcessMetric` corresponden a las estadísticas de uso de memoria ram y cpu de todos los procesos asociados con la aplicación. **Nota:** Este método está obsoleto, utilice `app.getAppMetrics()` en su lugar.

### `app.getAppMetrics()`

Devuelve [`ProcessMetric[]`](structures/process-metric.md): el conjunto de objetos `ProcessMetric` corresponden a las estadísticas de uso de memoria ram y cpu de todos los procesos asociados con la aplicación.

### `app.getGPUFeatureStatus()`

Devuelve [`GPUFeatureStatus`](structures/gpu-feature-status.md) - el estado de la función de gráficos de `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Entero

Regresa `Boolean` - Siempre que el llamado fue exitoso.

Establece el distintivo en contra para la aplicación actual. Establecer la cuenta a `` esconderá el distintivo.

En macOS se mostrará en el icono del muelle. En Linux solo funciona para los ejecutadores de Unity

**Nota:** El ejecutador de Unity requiere de la existencia de un archivo `.desktop` para hacerlo funcionar, para más información por favor leer [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Devolver `Entero` - El valor actual establecido en la insignia contraria.

### `app.isUnityRunning()` *Linux*

Devuelve `Boolean` - Aunque el ambiente del escritorio actual sea un ejecutador de Unity.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `opciones` Objecto (opcional) 
  * `path` Cadena (opcional) *Windows* - El camino ejecutable para comparar en contra. Por defecto a `process.execPath`.
  * `args` Cadena[] (opcional) *Windows* - La línea de argumentos de comando para comparar e contra. Por defecto, a un arreglo vacío.

Si tú has dado las opciones `path` y `args` a `app.setLoginItemSettings` entonces tú necesitas pasar los mismos argumentos aquí para `openAtLogin` para que se establezca correctamente.

Devuelve `Objeto`:

* `openAtLogin` Boolean - `true` si la aplicación es establecida para abrirse al iniciar.
* `openAsHidden` Boolean - `true` si la aplicación se establece para que se abra escondida al iniciarse. Este ajuste es solo compatible para macOS.
* `wasOpenedAtLogin` Boolean - `true` si la aplicación fuera abierta automáticamente. Este ajuste es solo compatible con macOS.
* `wasOpenedAsHidden` Boolean - `true` si la aplicación fuera abierta como un inicio de objeto escondido. Esto indica que la aplicación no debería abrir ninguna ventana al inicio. Este ajuste es solo compatible con macOS.
* `restoreState` Boolean - `true` si la aplicación fue abierta como un objeto que debería restaurar el estado de la sesión anterior. Esto indica que la aplicación debería restaurar las ventanas que fueron abiertas la última vez que la aplicación fue cerrada. Este ajuste es solo compatible con macOS.

**Nota:** Este API no tiene efecto en [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `ajustes` Object 
  * `openAtLogin` Boolean (opcional) - `true` para abrir la aplicación al iniciar, `false` para eliminar la aplicación como un objeto de inicio. Por defecto a `false`.
  * `openAsHidden` Boolean (opcional) - `true` para abrir la aplicación como escondida. Por defecto a `false`. El usuario puede editar este ajuste desde Preferencias del Sistema, así que `app.getLoginItemStatus().wasOpenedAsHidden` debería ser revisado cuando la aplicación sea abierta para saber el valor actual. Este ajuste solo es compatible en macOS.
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

**Nota:** Este API no tiene efecto en [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Devuelve `Boolean` - `true` si la accesibilidad de soporte de Chrome es habilitado, o `false` de otra manera. Esta API devolverá `true` si el uso de tecnologías asistivas, como leectores de pantallas, son detectadas. Ver https://www.chromium.org/developers/design-documents/accessibility para más detalles.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manualmente habilita el soporte de accesibilidad de Chrome, lo que permite exponer el interruptor de accesibilidad a los usuarios en la configuración de la aplicación. https://www.chromium.org/developers/design-documents/accessibility para más detalles. Desactivado por defecto.

**Nota:** Renderizar el árbol de accesibilidad puede afectar significativamente al rendimiento de su aplicación. No debería estar activado por defecto.

### `app.setAboutPanelOptions(options)` *macOS*

* `opciones` Object 
  * `applicationName` Cadena (opcional) - El nombre de la aplicación.
  * `applicationVersion` Cadena (opcional) - La versión de la aplicación.
  * `copyright` Cadena (opcional) - La información de Copyright.
  * `credits` Cadena (opcional) - Información de crédito.
  * `version` Cadena (opcional) - Este número de versión de construcción de la aplicación.

Establece el panel de opciones. Esto anulará los valores definidos en el archivo `.plist` de la aplicación. Ver el [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) para más detalles.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` Cadena - Un cambio en la línea de comando
* `value` Cadena (opcional) - Un valor para el cambio dado

Adjuntar un cambio (con `valor` opcional) al comando de de línea de Chromium.

**Nota;** Esto no afectará el `process.argv`, y es primcipalmente usado por los desarrolladores para controlar algunos comportamientos de Chromium de bajo nivel.

### `app.commandLine.appendArgument(value)`

* `valor` Cadena - El argumento a adjuntar a la línea de comando

Adjuntar un argumento a la línea de comando de Chromium. El argumento será citado correctamente.

**Nota:** Esto no afectará a `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Permite modo sandbox mezclado en la aplicación.

Este método solo puede ser llamado después de iniciada la aplicación.

### `app.isInApplicationsFolder()` *macOS*

Devuelve `Boolean` - Si la aplicación se está ejecutando actualmente desde la carpeta Aplicación de sistemas. Usar en combinación con `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Devuelve `Boolean` - Si la movida fue exitosa. Tenga en cuenta que si la movida es exitosa su aplicación dejará de funcionar y se relanzará.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

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

Establece el [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103) de la aplicación.

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Establece la `image` asociada con el ícono del punto.