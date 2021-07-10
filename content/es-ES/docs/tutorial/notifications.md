# Notificaciones (Windows, Linux, macOS)

## Descripción general

Los tres sistemas operativos proporcionan medios para que las aplicaciones envíen notificaciones al usuario. La técnica de mostrar notificaciones es diferente para los procesos Principales y Renderizadores.

Para el proceso de Renderer, Electron permite convenientemente a los desarrolladores enviar notificaciones con la [API de notificación HTML5](https://notifications.spec.whatwg.org/), usando las API de notificación nativa del sistema operativo en ejecución para mostrarlas.

Para mostrar las notificaciones en el proceso principal, necesita utilizar el módulo [Notification](../api/notification.md).

## Ejemplo

### Mostrar notificaciones en el proceso de Renderer

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following line to the `index.html` file before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

...and add the `renderer.js` file:

```javascript fiddle='docs/fiddles/features/notifications/renderer'
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => console.log(CLICK_MESSAGE)
```

Después de lanzar la aplicación Electron deberías ver la notificación:

![Notificación en el proceso de Renderer](../images/notification-renderer.png)

Additionally, if you click on the notification, the DOM will update to show "Notification clicked!".

### Mostrar notificaciones en el proceso principal

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript fiddle='docs/fiddles/features/notifications/main'
const { Notification } = require('electron')

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

After launching the Electron application, you should see the system notification:

![Notification in the Main process](../images/notification-main.png)

## Información adicional

Si bien el código y la experiencia del usuario en los sistemas operativos son similares, existen diferencias sutiles.

### Windows

* En Windows 10, se debe instalar un acceso directo a tu app en el menú de inicio con la [ID del modelo de usuario de la aplicación][app-user-model-id]. Esto puede ser anulado durante el desarrollo, por lo que añadir `node_modules\electron\dist\electron.exe` a su Menú Inicio también hace el truco . Navegue al archivo en Explorer, haga clic derecho y "Anclar para iniciar el menú". Luego necesitará añadir la línea `app.setAppUserModelId(process.execPath)` a su proceso principal para ver las notificaciones.
* En Windows 8.1 y Windows 8, un acceso directo para tu aplicación con un [Application User Model ID][app-user-model-id] debe ser instalado en el Start screen. Sin embargo, tenga en cuenta que no es necesario fijarlo a la pantalla de Inicio.
* En Windows 7, las notificaciones funcionan a través de una implementación personalizada que se asemeja visualmente a la nativa en los sistemas más nuevos.

Electron intenta automatizar el trabajo en torno de la Application User Model ID. Cuando Electron es usado junto con el framework de instalación y actualización Squirrel [shortcuts will automatically be set correctly][squirrel-events]. Además, Electron detectará que Squirrel fue usada y automáticamente llamará a `app.setAppUserModelId()` con el valor correcto. Durante el desarrollo, puede tener que llamar por ti mismo a [`app.setAppUserModelId()`][set-app-user-model-id].

Además, en Windows 8, la longitud máxima para el cuerpo de la notificación es de 250 caracteres, y el equipo de Windows recomienda que las notificaciones se mantengan en 200 caracteres. Dicho eso, esa limitación se eliminó en Windows 10, y el equipo de Windows les pidió a los desarrolladores que fuesen razonables. Intentar enviar cantidades gigantescas de texto a la API (miles de caracteres) puede provocar inestabilidad.

#### Notificaciones Avanzadas

Las versiones posteriores de Windows permiten notificaciones avanzadas, con plantillas personalizadas, imágenes y otros elementos flexibles. Para enviar esas notificaciones (ya sea desde el proceso principal o desde el procesador), use el módulo de usuario [electron-windows-notificaciones](https://github.com/felixrieseberg/electron-windows-notifications), que usa complementos de nodo nativos para enviar `ToastNotification` y objetos `TileNotification`.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### Horas Silenciosas / Modo de Presentación

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

### macOS

Las notificaciones son directas en macOS, pero usted debe ser conciente de [Apple's Human Interface guidelines regarding notifications][apple-notification-guidelines].

Tenga en cuenta que las notificaciones están limitadas a 256 bytes de tamaño y se truncarán si supera ese límite.

#### No molestar / Estado de Sesión

Para detectar si se le permite o no enviar una notificación, use el módulo de usuario [electron-notification-state][electron-notification-state].

Esto le permitirá detectar con anticipación si la notificación se mostrará o no.

### Linux

Las notificaciones se envían utilizando `libnotify` que puede mostrar notificaciones en cualquier entorno de escritorio que siga la [Especificación de Notificaciones de Escritorio][notification-spec], incluidos Cinnamon, Enlightenment, Unity, GNOME, KDE.

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
