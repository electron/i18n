# autoUpdater

> Enable apps to automatically update themselves.

Proceso: [principal](../glossary.md#main-process)</0>

**Puede Ver: [Una guía detallada sobre cómo implementar las actualizaciones en su aplicación](../tutorial/updates.md).**

## Noticias de la plataforma

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

Adicionalmente, hay algunas diferencias sutiles en cada plataforma:

### macOS

En macOS, el módulo `autoUpdater` está construido sobre [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), lo que significa que no necesita ninguna configuración especial para que funcione. Para los requisitos de servidor, puede leer [Soporte de servidor](https://github.com/Squirrel/Squirrel.Mac#server-support). Tenga en cuenta que [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) se aplica para todas las solicitudes creadas como parte del proceso de actualizaciones. Aplicaciones que necesitan para desactivar ATS pueden agregar la clave de `NSAllowsArbitraryLoads` a su .plist de su aplicación.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

En Windows, hay que instalar la aplicación en el equipo del usuario antes de utilizar el `autoUpdater`. Por eso se recomienda utilizar el paquete [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) o [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) para generar el instalador de Windows.

Cuando usas [electron-winstraller](https://github.com/electron/windows-installer) o [electron-forge](https://github.com/electron-userland/electron-forge) no intentes actualizar tu aplicación [lo primero de correr](https://github.com/electron/windows-installer#handling-squirrel-events) (También ver [este tema para obtener más información](https://github.com/electron/electron/issues/7155)). se recomienda usar

electron-squirrel-startup<0> para obtener acceso directo en el escritorio para su aplicación.</p> 

El instalador generado con [Squirrel](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) se creara un acceso directo a un icono con una `Application User Model ID` en el formato igual a este ` com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE` ejemplos: `com.squirrel.slack.Slack` y <1>com.squirrel.code.Code</1> Tu debes usar el mismo ID de tu aplicación con `app.setAppUserModelId` API, de lo contrario Windows no podría ejecutarlo correctamente en la barra de tareas.

A diferencia de Squirrel, Mac OS, Windows puede recibir actualizaciones sobre S3 o cualquier otro lhst de archivos estático, puedes leer la documentación de [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) para obtener más detalles sobre el funcionamiento de esto.



## Eventos

El objeto `app` emite los siguientes eventos:



### Evento: 'error'

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
  * `headers` Object (opcional) _macOS_ - Cabeceras de petición HTTP.
  * `serverType` String (opcional) _macOS_ - `json` o `default`, ver el [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README para más información.

Configura el `url` e inicializa la actualización automática.



### `autoUpdater.getFeedURL()`

Devuelve `String` - La actualización actual provee el URL.



### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.



### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Llamar a `autoUpdater.quitAndInstall()` bajo la capucha cerrará todas las ventanas de la aplicación, y llamará automáticamente a `app.quit()` después de que se hayan cerrado todas las ventanas.

**Note:** No es estrictamente necesario llamar esta función para aplicar una actualización, como una actualización fue descargada con éxito siempre será actualizada la próxima vez que la aplicación inicie.
