# Notification

> Crea las notificaciones de escritorio del sistema operativo

Process: [Main](../glossary.md#main-process)

## Utilizando el proceso de renderizado

Si quieres mostrar notificaciones desde un proceso de renderizado se debe utilizar [HTML5 Notification API](../tutorial/notifications.md)

## Clase: Notification

> Crea las notificaciones de escritorio del sistema operativo

Process: [Main](../glossary.md#main-process)

`Notification` es un [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Crea una nueva `Notification` con propiedades nativas como las configuradas por `options`.

### Métodos Estáticos

La clase `Notification` tiene los siguientes métodos estáticos:

#### `Notification.isSupported()`

Devuelve `Boolean` - Si las notificaciones de escritorio son soportadas o no en el sistema actual

### `new Notification([options])` *Experimental*

* `opciones` Objeto 
  * `title` String - Un título para la notificación, el cual será mostrado en la parte superior de la ventana de notificación.
  * `subtitle` String (optional) *macOS* - A subtitle for the notification, which will be displayed below the title.
  * `body` String - El cuerpo del texto de la notificación, el cual aparecerá debajo del título o subtítulo.
  * `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
  * `icon` (String | [NativeImage](native-image.md)) (optional) - An icon to use in the notification.
  * `hasReply` Boolean (optional) *macOS* - Whether or not to add an inline reply option to the notification.
  * `replyPlaceholder` String (optional) *macOS* - The placeholder to write in the inline reply input field.
  * `sound` String (optional) *macOS* - The name of the sound file to play when the notification is shown.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) *macOS* - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) *macOS* - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

### Eventos de Instancia

Los objetos creados con `new Notification` emite los siguientes eventos:

**Nota:** Algunos eventos sólo están disponibles en sistemas operativos específicos y se etiquetan como tal.

#### Evento: "show"

Devuelve:

* `event` Event

Se emite cuando la notificación se muestra al usuario. Tenga en cuenta que este puede emitirse tantas veces como se muestre la notificación a través del método `show()`.

#### Evento: "click"

Devuelve:

* `event` Event

Se emite cuando el usuario hace clic en la notificación.

#### Evento: 'close'

Devuelve:

* `event` Event

Se emite cuando se cierra la notificación por medio de la intervención manual del usuario.

No se garantiza que este evento se emita en todos los casos donde se cierre la notificación.

#### Evento: "reply" *macOS*

Devuelve:

* `event` Event
* `reply` String - La cadena que ingreso el usuario dentro del campo de respuesta insertado.

Se emite cuando el usuario hace clic en el botón "Reply" en una notificación con `hasReply: true`.

#### Evento: "action" *macOS*

Devuelve:

* `event` Event
* `index` Númerp - El indice de la acción que fue activado.

### Métodos de Instancia

Los objetos creados con `new Notification` tienen los siguientes métodos de instancia:

#### `notification.show()`

Muestra inmediatamente la notificación al usuario, por favor tenga en cuenta que esto significa que a diferencia de la implementación HTML5 Notification, solamente creando una instancia `new Notification` no lo muestra inmediatamente al usuario. Es necesario llamar a este método antes de que el sistema operativo lo muestre en pantalla.

Si la notificación ha sido mostrada con anterioridad, este método descartará la notificación previa y creará una nueva con propieades idénticas.

#### `notification.close()`

Descarta la notificación.

### Reproducción de Sonidos

En macOS, se puede especificar el nombre del sonido que se desee reproducir cuando se muestre la notificación. Cualquier sonido por defecto, además de los archivos de sonido personalizados, (en Preferencias del sistema > Sonido) puede ser utilizados. Asegúrese de que el archivo de sonido sea copiado en el paquete de la aplicación (por ejemplo, `YourApp.app/Contents/Resources`), o uno de los siguientes direcciones:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

Ver la documentación [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) para más información.