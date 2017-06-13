# Notificaciones (Windows, Linux, macOS)

Todos los tres sistemas operativos proporcionan medios para aplicaciones enviar notificaciones al usuario. Electrón convenientemente permite a los desarrolladores enviar notificaciones con la API</a> HTML5 de notificación, mediante notificación nativos del sistema operativo ejecutando APIs para mostrarlo.</p> 

**Note:** ya que es una API de HTML5 sólo está disponible en el proceso de renderizado.

```javascript
que myNotification = nueva notificación ('Título', {
  body: 'Lorem Ipsum Dolor Sit Amet'
}) myNotification.onclick = () => {console.log ('notificación haga clic en')}
```

Mientras que la experiencia de usuario y código a través de los sistemas operativos son similares, hay diferencias sutiles.

## Windows

* En Windows 10, notificaciones de "trabajo justo".
* Windows 8.1 y Windows 8, debe instalarse un acceso directo a su aplicación, con un\[app-user-model-id\] \[modelo de usuario de aplicación ID\], a la pantalla de inicio. Sin embargo, hay que tener en cuenta que no necesita ser clavado en la pantalla de inicio.
* En Windows 7, las notificaciones funcionan mediante una implementación personalizada que se asemeja visualmente el nativo en más nuevos sistemas.

Además, en Windows 8, la longitud máxima para el cuerpo de la notificación es 250 caracteres, con la recomendación de equipo de Windows que notificaciones deben mantenerse a 200 caracteres. Dicho esto, que la limitación se ha eliminado en Windows 10, con el equipo de Windows pidiendo a los desarrolladores a ser razonable. Tratar de enviar cantidades gigantescas de texto a la API (en miles de caracteres) puede resultar en inestabilidad.

### Notificaciones avanzadas

Versiones posteriores de Windows permitan notificaciones avanzadas, plantillas, imágenes y otros elementos flexibles. Para enviar las notificaciones (desde el proceso principal o el proceso de renderizado), utilice el modo de usuario módulo[electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), que utiliza nativo addons de nodo para enviar objetos `ToastNotification` y `TileNotification`.

Mientras que las notificaciones incluyendo botones trabajan con solo `electron-windows-notifications`, manejo de respuestas requiere el uso de [`electron-windows-interactivos-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), que ayuda a registrar los componentes COM y llamar a la aplicación de la electrónica con los datos de usuario ingresados.

### Horas de silencioso / modo de presentación

Para detectar si o no le permiten enviar una notificación, utilice el módulo de entorno de usuario[electron-notificación-state](https://github.com/felixrieseberg/electron-notification-state).

Esto le permite determinar anticipadamente o no Windows se silencio tire la notificación.

## MacOS

Las notificaciones son directo en macOS, pero debe ser consciente de las directrices de interfaz humano de[Apple en notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Tenga en cuenta que las notificaciones se limitan a 256 bytes de tamaño y se truncará si se excede ese límite.

### Notificaciones avanzadas

Versiones anteriores de macOS permiten notificaciones con un campo de entrada, permitiendo al usuario a responder rápidamente a una notificación. Para enviar notificaciones con un campo de entrada, utilice el módulo de entorno de usuario [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### No molestar / estado de la sesión

Para detectar si o no le permiten enviar una notificación, utilice el módulo de entorno de usuario[electron-notificación-state](https://github.com/felixrieseberg/electron-notification-state).

Esto le permitirá detectar a tiempo o no se mostrará la notificación.

## Linux

Las notificaciones se envían usando `libnotify` que puede mostrar notificaciones en cualquier entorno de escritorio sigue \[Especificación de notificaciones de escritorio\]\[notification-spec\], como canela, iluminación, unidad, GNOME, KDE.