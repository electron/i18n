# autoUpdater

> Permite que las aplicaciones que se actualicen automáticamente.

Process: [Main](../glossary.md#main-process)

**Podrá encontrar una guía detallada sobre como implementar actualizaciones en su aplicación [aquí](../tutorial/updates.md).**

## Noticias de la plataforma

Actualmente, solo macOS y Windows están soportados. No hay soporte para auto actualizaciones en Linux, por lo que es recomendable que use el gestor de paquetes de la distribución para actualizar su aplicación.

Adicionalmente, hay algunas diferencias sutiles en cada plataforma:

### macOS

En macOS el modulo `autoUpdater` esta construido sobre [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) significando que no tienes que hacer alguna configuración especial para que funcione. Para los requerimientos del lado del servidor, puedes leer [Soporte de Servidor](https://github.com/Squirrel/Squirrel.Mac#server-support). Tenga en cuenta que [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) se aplica para todas las solicitudes creadas como parte del proceso de actualizaciones. Aplicaciones que necesitan para desactivar ATS pueden agregar la clave de `NSAllowsArbitraryLoads` a su .plist de su aplicación.

**Nota:** Su aplicación debe ser firmada para actualizaciones automáticas en macOS. Este es un requisito de `Squirrel.Mac`.

### Windows

En Windows, hay que instalar la aplicación en el equipo del usuario antes de utilizar el `autoUpdater`. Por eso se recomienda utilizar el paquete [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) o [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) para generar el instalador de Windows.

Cuando usas [electron-winstraller](https://github.com/electron/windows-installer) o [electron-forge](https://github.com/electron-userland/electron-forge) no intentes actualizar tu aplicación [lo primero de correr](https://github.com/electron/windows-installer#handling-squirrel-events) (También ver [este tema para obtener más información](https://github.com/electron/electron/issues/7155)). se recomienda usar electron-squirrel-startup<0> para obtener acceso directo en el escritorio para su aplicación.</p> 

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

Aparece cuando hay una actualización disponible. La actualización se descargará automáticamente.

### Evento: 'update-not-available'

Aparece cuando no hay una actualización disponible.

### Evento: "actualización descargada"

Devuelve:

* `event` Evento
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Fecha
* `updateURL` String

Aparece cuando se ha descargado una actualización.

Solo esta disponible en Windows `releaseName`.

## Métodos

El objeto `autoUpdater` tiene los siguientes métodos:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` Cadena
* `requestHeaders` Object *macOS* (optional) - HTTP request headers.

Configura el `url` e inicializa la actualización automática.

### `autoUpdater.getFeedURL()`

Devuelve `String` - La actualización actual provee el URL.

### `autoUpdater.checkForUpdates()`

Solicita al servidor si hay actualizaciones. Se debe llamar a `setFeedURL` antes de utilizar esta API.

### `autoUpdater.quitAndInstall()`

Reinicia la aplicación e instala la actualización luego de que se haya descargado. Solo se debería llamar luego de que aparezca `update-downloaded`.

**Note:** `autoUpdater.quitAndInstall()` cerrará todas las aplicaciones de Windows primero y solo emitirá `before-quit` event on `app` después de eso. Esto difiere de la secuencia normal del evento quit.