# Notificaciones (Windows, Linux, macOS)

Los tres sistemas operativos proporcionan medios para que las aplicaciones envíen notificaciones al usuario. Electron permite convenientemente a los desarrolladores enviar notificaciones con la [API de Notificaciones de HTML5](https://notifications.spec.whatwg.org/), utilizando las API de notificaciones nativas del sistema operativo que se están ejecutando actualmente para mostrarlas.

**Nota:** dado que se trata de una API HTML5, solo está disponible en el proceso de renderizado. Si desea mostrar notificaciones en el proceso principal, consulte el módulo [Notificación](../api/notification.md).

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Si bien el código y la experiencia del usuario en los sistemas operativos son similares, existen diferencias sutiles.

## Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. Sin embargo, tenga en cuenta que no es necesario fijarlo a la pantalla de Inicio.
* En Windows 7, las notificaciones funcionan a través de una implementación personalizada que se asemeja visualmente a la nativa en los sistemas más nuevos.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][[set-app-user-model-id](../api/app.md#appsetappusermodelidid-windows)] yourself.

Además, en Windows 8, la longitud máxima para el cuerpo de la notificación es de 250 caracteres, y el equipo de Windows recomienda que las notificaciones se mantengan en 200 caracteres. Dicho eso, esa limitación se eliminó en Windows 10, y el equipo de Windows les pidió a los desarrolladores que fuesen razonables. Intentar enviar cantidades gigantescas de texto a la API (miles de caracteres) puede provocar inestabilidad.

### Notificaciones Avanzadas

Las versiones posteriores de Windows permiten notificaciones avanzadas, con plantillas personalizadas, imágenes y otros elementos flexibles. Para enviar esas notificaciones (ya sea desde el proceso principal o desde el procesador), use el módulo de usuario [electron-windows-notificaciones](https://github.com/felixrieseberg/electron-windows-notifications), que usa complementos de nodo nativos para enviar `ToastNotification` y objetos `TileNotification`.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Horas Silenciosas / Modo de Presentación

Para detectar si se le permite o no enviar una notificación, use el módulo de usuario [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Esto le permite determinar de antemano si Windows enviará o no la notificación de forma silenciosa.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Tenga en cuenta que las notificaciones están limitadas a 256 bytes de tamaño y se truncarán si supera ese límite.

### Notificaciones Avanzadas

Las versiones posteriores de macOS permiten notificaciones con un campo de entrada, lo que permite al usuario responder rápidamente a una notificación. Para enviar notificaciones con un campo de entrada, use el módulo de usuario [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### No molestar / Estado de Sesión

Para detectar si se le permite o no enviar una notificación, use el módulo de usuario [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Esto le permitirá detectar con anticipación si la notificación se mostrará o no.

## Linux

Las notificaciones se envían utilizando `libnotify` que puede mostrar notificaciones en cualquier entorno de escritorio que siga la [Especificación de Notificaciones de Escritorio](https://developer.gnome.org/notification-spec/), incluidos Cinnamon, Enlightenment, Unity, GNOME, KDE.