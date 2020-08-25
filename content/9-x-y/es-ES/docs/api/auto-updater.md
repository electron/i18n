# autoUpdater

> Enable apps to automatically update themselves.

Proceso: [Main](../glossary.md#main-process)

**Puede Ver: [Una guía detallada sobre cómo implementar las actualizaciones en su aplicación](../tutorial/updates.md).**

`autoUpdater` is an [EventEmitter][event-emitter].

## Noticias de la plataforma

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

Adicionalmente, hay algunas diferencias sutiles en cada plataforma:

### macOS

En macOS, el módulo `autoUpdater` está construido sobre [Squirrel.Mac][squirrel-mac], lo que significa que no necesita ninguna configuración especial para que funcione. Para los requisitos de servidor, puede leer [Soporte de servidor][server-support]. Tenga en cuenta que [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) se aplica para todas las solicitudes creadas como parte del proceso de actualizaciones. Aplicaciones que necesitan para desactivar ATS pueden agregar la clave de `NSAllowsArbitraryLoads` a su .plist de su aplicación.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] or the [grunt-electron-installer][installer] package to generate a Windows installer.

When using [electron-winstaller][installer-lib] or [electron-forge][electron-forge-lib] make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). se recomienda usar

electron-squirrel-startup<0> para obtener acceso directo en el escritorio para su aplicación.</p> 

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID][app-user-model-id] in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. Tu debes usar el mismo ID de tu aplicación con `app.setAppUserModelId` API, de lo contrario Windows no podría ejecutarlo correctamente en la barra de tareas.

A diferencia de Squirrel, Mac OS, Windows puede recibir actualizaciones sobre S3 o cualquier otro lhst de archivos estático, You can read the documents of [Squirrel.Windows][squirrel-windows] to get more details about how Squirrel.Windows works.



## Eventos

El objeto `app` emite los siguientes eventos:



### Evento: "error"

Devuelve:

* `error` Error

Aparece cuando hay un error al actualizar.



### Evento: "comprobar si hay actualizaciones"

Aparece al comprobar si una actualización ya ha empezado.



### Evento: "actualización disponible"

Emitted when there is an available update. The update is downloaded automatically.



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

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.



### Evento: 'before-quit-for-update'

Este evento se ejecuta luego que un usuario llama al método: `quitAndInstall()`.

Cuando se hace el llamado a la API, el evento `before-quit` no se ejecuta hasta que todas las ventanas estén cerradas. Como resultado usted debe escuchar a este evento si desea realizar acciones antes de que las ventanas sean cerradas, mientras el proceso está finalizando, así como también escuchar al proceso: `before-quit`.



## Métodos

El objeto `autoUpdater` tiene los siguientes métodos:



### `autoUpdater.setFeedURL(options)`

* `options` Object 
    * `url` String
  * `headers` Record<String, String> (optional) _macOS_ - HTTP request headers.
  * `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac][squirrel-mac] README for more information.

Configura el `url` e inicializa la actualización automática.



### `autoUpdater.getFeedURL()`

Devuelve `String` - La actualización actual provee el URL.



### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.



### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Llamar a `autoUpdater.quitAndInstall()` bajo la capucha cerrará todas las ventanas de la aplicación, y llamará automáticamente a `app.quit()` después de que se hayan cerrado todas las ventanas.

**Note:** No es estrictamente necesario llamar esta función para aplicar una actualización, como una actualización fue descargada con éxito siempre será actualizada la próxima vez que la aplicación inicie.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
