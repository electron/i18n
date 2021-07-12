# autoUpdater

> Enable apps to automatically update themselves.

Proceso: [Main](../glossary.md#main-process)

**Puedes Ver: [Una guía detallada sobre cómo implementar las actualizaciones en su aplicación](../tutorial/updates.md).**

`autoUpdater` es un [EventEmitter][event-emitter].

## Noticias de la plataforma

Actualmente, sólo macOS y Windows son soportados. No hay soporte para auto actualizaciones en Linux, por lo que es recomendable que use el gestor de paquetes de la distribución para actualizar su aplicación.

Adicionalmente, hay algunas diferencias sutiles en cada plataforma:

### macOS

En macOS, el módulo `autoUpdater` está construido sobre [Squirrel.Mac][squirrel-mac], lo que significa que no necesita ninguna configuración especial para que funcione. Para los requisitos de servidor, puede leer [Soporte de servidor][server-support]. Tenga en cuenta que [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) se aplica para todas las solicitudes creadas como parte del proceso de actualizaciones. Aplicaciones que necesitan para desactivar ATS pueden agregar la clave de `NSAllowsArbitraryLoads` a su .plist de su aplicación.

**Nota:** Su aplicación debe ser firmada para actualizaciones automáticas en macOS. Este es un requerimiento de `Squirrel.Mac`.

### Windows

En Windows, tienes que instalar tu app en el equipo de un usuario antes de que puedas usar el `autoUpdater`, por lo que se recomienda que uses el [Electron-winstaller][installer-lib], [Electron-Forge][electron-forge-lib] o el paquete [Grunt-Electron-Installer][installer] para generar un instalador de Windows.

Cuando uses [Electron-winstaller][installer-lib] o [Electron-Forge][electron-forge-lib] asegúrate de no tratar de actualizar tu App [la primera vez que se ejecuta](https://github.com/electron/windows-installer#handling-squirrel-events) (también puedes ver [este problema para obtener más información](https://github.com/electron/electron/issues/7155)). Se recomienda usar [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) para obtener acceso directo en el escritorio para su aplicación.

El instalador generado con Squirrel creará un icono de acceso directo con un [ID del modelo de usuario de aplicación][app-user-model-id] en el formato de `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, los ejemplos son `com.squirrel.slack.Slack` y `com.squirrel.code.Code`. Tu debes usar el mismo ID de tu aplicación con `app.setAppUserModelId` API, de lo contrario Windows no podría ejecutarlo correctamente en la barra de tareas.

A diferencia de Squirrel, Mac OS, Windows puede recibir actualizaciones sobre S3 o cualquier otro lhst de archivos estático, Puedes leer los documentos de [Squirrel. Windows][squirrel-windows] para obtener más detalles acerca de cómo funciona Squirrel. Windows.

## Eventos

El objeto `app` emite los siguientes eventos:

### Evento: "error"

Devuelve:

* `error` Error

Aparece cuando hay un error al actualizar.

### Evento: "comprobar si hay actualizaciones"

Aparece al comprobar si una actualización ya ha empezado.

### Evento: "actualización disponible"

Emitido cuando hay una actualización disponible. La actualización es descargada automáticamente.

### Evento: 'update-not-available'

Aparece cuando no hay una actualización disponible.

### Evento: "actualización descargada"

Devuelve:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Aparece cuando se ha descargado una actualización.

Solo esta disponible en Windows `releaseName`.

**Nota:** No es estrictamente necesario manejar este evento. Una actualización descargada con éxito se aplicará la próxima vez que la aplicación inicie.

### Evento: 'before-quit-for-update'

Este evento se ejecuta luego que un usuario llama al método: `quitAndInstall()`.

Cuando se hace el llamado a la API, el evento `before-quit` no se ejecuta hasta que todas las ventanas estén cerradas. Como resultado usted debe escuchar a este evento si desea realizar acciones antes de que las ventanas sean cerradas, mientras el proceso está finalizando, así como también escuchar al proceso: `before-quit`.

## Métodos

El objeto `autoUpdater` tiene los siguientes métodos:

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * `url` String
  * `headers` Record<String, String> (opcional) _macOS_ - Cabeceras de peticiones HTTP.
  * `serverType` cadena (opcional) _macOS_ -se puede `json` o `default`, consulta el [Squirrel. Mac][squirrel-mac] README para obtener más información.

Configura el `url` e inicializa la actualización automática.

### `autoUpdater.getFeedURL()`

Devuelve `String` - La actualización actual provee el URL.

### `autoUpdater.checkForUpdates()`

Pregunta al servidor si hay una actualización. Debes llamar a `setFeedURL` antes de usar esta API.

### `autoUpdater.quitAndInstall()`

Reinicia la aplicación e instala la actualización después que esta ha sido descargada. Sólo debería llamarse después de que `update-downloaded` ha sido emitido.

Llamar a `autoUpdater.quitAndInstall()` bajo la capucha cerrará todas las ventanas de la aplicación, y llamará automáticamente a `app.quit()` después de que se hayan cerrado todas las ventanas.

**Note:** No es estrictamente necesario llamar esta función para aplicar una actualización, como una actualización fue descargada con éxito siempre será actualizada la próxima vez que la aplicación inicie.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
