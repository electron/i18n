# Notificaciones (Windows, Linux, macOS)

## Descripción general

Los tres sistemas operativos proporcionan medios para que las aplicaciones envíen notificaciones al usuario. La técnica de mostrar notificaciones es diferente para los procesos Principales y Renderizadores.

Para el proceso de Renderer, Electron permite convenientemente a los desarrolladores enviar notificaciones con la [API de notificación HTML5](https://notifications.spec.whatwg.org/), usando las API de notificación nativa del sistema operativo en ejecución para mostrarlas.

Para mostrar las notificaciones en el proceso principal, necesita utilizar el módulo [Notification](../api/notification.md).

## Ejemplo

### Mostrar notificaciones en el proceso de Renderer

Asumiendo que tiene una aplicación Electron funcional de la [Guía de inicio rápido](quick-start.md), añade la siguiente línea al índice `. tml` archivo antes de cerrar la etiqueta `</body>`:

```html
<script src="renderer.js"></script>
```

y añadir el archivo `rendererer.js`:

```javascript fiddle='docs/fiddles/features/notifications/renderer'
const myNotification = new Notification('Título', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notificación pulsada')
}
```

Después de lanzar la aplicación Electron deberías ver la notificación:

![Notificación en el proceso de Renderer](../images/notification-renderer.png)

Si abres la consola y luego haz clic en la notificación, verás el mensaje que se generó después de activar el evento `onclick`:

![Mensaje de clic para la notificación](../images/message-notification-renderer.png)

### Mostrar notificaciones en el proceso principal

Comenzando con una aplicación funcional de la [Guía de inicio rápido](quick-start.md), actualice el archivo `main.js` con las siguientes líneas:

```javascript fiddle='docs/fiddles/features/notifications/main'
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

Después de lanzar la aplicación Electron deberías ver la notificación:

![Notificación en el proceso principal](../images/notification-main.png)

## Información adicional

Si bien el código y la experiencia del usuario en los sistemas operativos son similares, existen diferencias sutiles.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Esto puede ser anulado durante el desarrollo, por lo que añadir `node_modules\electron\dist\electron.exe` a su Menú Inicio también hace el truco . Navegue al archivo en Explorer, haga clic derecho y "Anclar para iniciar el menú". Luego necesitará añadir la línea `app.setAppUserModelId(process.execPath)` a su proceso principal para ver las notificaciones.
* En Windows 8.1 y Windows 8, un acceso directo para tu aplicación con un [Application User Model ID][app-user-model-id] debe ser instalado en el Start screen. Sin embargo, tenga en cuenta que no es necesario fijarlo a la pantalla de Inicio.
* En Windows 7, las notificaciones funcionan a través de una implementación personalizada que se asemeja visualmente a la nativa en los sistemas más nuevos.

Electron intenta automatizar el trabajo en torno de la Application User Model ID. Cuando Electron es usado junto con el framework de instalación y actualización Squirrel [shortcuts will automatically be set correctly][squirrel-events]. Además, Electron detectará que Squirrel fue usada y automáticamente llamará a `app.setAppUserModelId()` con el valor correcto. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Además, en Windows 8, la longitud máxima para el cuerpo de la notificación es de 250 caracteres, y el equipo de Windows recomienda que las notificaciones se mantengan en 200 caracteres. Dicho eso, esa limitación se eliminó en Windows 10, y el equipo de Windows les pidió a los desarrolladores que fuesen razonables. Intentar enviar cantidades gigantescas de texto a la API (miles de caracteres) puede provocar inestabilidad.

#### Notificaciones Avanzadas

Las versiones posteriores de Windows permiten notificaciones avanzadas, con plantillas personalizadas, imágenes y otros elementos flexibles. Para enviar esas notificaciones (ya sea desde el proceso principal o desde el procesador), use el módulo de usuario [electron-windows-notificaciones](https://github.com/felixrieseberg/electron-windows-notifications), que usa complementos de nodo nativos para enviar `ToastNotification` y objetos `TileNotification`.

Mientras que los botones de notificaciones funcionan con `electron-windows-notifications`, manejar respuestas requiere el uso de [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), que ayuda a registrar los componentes COM requeridos y llamar a su aplicación Electron con los datos de usuario introducidos.

#### Horas Silenciosas / Modo de Presentación

Para detectar si se le permite o no enviar una notificación, utilice el módulo userland [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Esto le permite determinar con antelación si Windows lanzará o no silenciosamente la notificación.

### macOS

Las notificaciones son directas en macOS, pero usted debe ser conciente de [Apple's Human Interface guidelines regarding notifications][apple-notification-guidelines].

Tenga en cuenta que las notificaciones están limitadas a 256 bytes de tamaño y se truncarán si supera ese límite.

#### Notificaciones Avanzadas

Las versiones posteriores de macOS permiten notificaciones con un campo de entrada, lo que permite al usuario responder rápidamente a una notificación. Para enviar notificaciones con un campo de entrada, use el módulo de usuario [node-mac-notifier][node-mac-notifier].

#### No molestar / Estado de Sesión

Para detectar si se le permite o no enviar una notificación, use el módulo de usuario [electron-notification-state][electron-notification-state].

Esto le permitirá detectar con anticipación si la notificación se mostrará o no.

### Linux

Las notificaciones se envían utilizando `libnotify` que puede mostrar notificaciones en cualquier entorno de escritorio que siga la [Especificación de Notificaciones de Escritorio][notification-spec], incluidos Cinnamon, Enlightenment, Unity, GNOME, KDE.

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[node-mac-notifier]: https://github.com/CharlieHess/node-mac-notifier

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
