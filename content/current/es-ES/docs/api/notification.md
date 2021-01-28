# Notification

> Crea las notificaciones de escritorio del sistema operativo

Proceso: [principal](../glossary.md#main-process)</0>

## Utilizando el proceso de renderizado

Si quieres mostrar notificaciones desde un proceso de renderizado se debe utilizar [HTML5 Notification API](../tutorial/notifications.md)

## Clase: Notification

> Crea las notificaciones de escritorio del sistema operativo

Proceso: [principal](../glossary.md#main-process)</0>

`Notification` es un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Crea una nueva `Notification` con propiedades nativas como las configuradas por `options`.

### Métodos Estáticos

La clase `Notification` tiene los siguientes métodos estáticos:

#### `Notification.isSupported()`

Devuelve `Boolean` - Si las notificaciones de escritorio son soportadas o no en el sistema actual

### `new Notification([options])`

* `options` Object (opcional)
  * `title` String - Un título para la notificación, el cual será mostrado en la parte superior de la ventana de notificación.
  * `subtitle` String (opcional) _macOS_ - Un subtítulo para la notificación, la cual aparecerá debajo del título.
  * `body` String - El cuerpo del texto de la notificación, el cual aparecerá debajo del título o subtítulo.
  * `silent` Boolean (opcional) - Si se emite o no un sonido de notificación del sistema operativo cuando aparece la notificación.
  * `icon` (String | [NativeImage](native-image.md)) (opcional) - Icono para usar en la notificación.
  * `hasReply` Boolean (opcional) _macOS_ - Si se agrega o no una opción de respuesta insertada en la notificación.
  * `timeoutType` String (optional) _Linux_ _Windows_ - The timeout duration of the notification. Can be 'default' or 'never'.
  * `replyPlaceholder` String (opcional) _macOS_ - El marcador de posición para escribir en el campo insertado de entrada de respuesta.
  * `sound` String (opcional) _macOS_ - El nombre del archivo de sonido que se reproduce cuando se muestra la notificación.
  * `urgency` String (optional) _Linux_ - The urgency level of the notification. Can be 'normal', 'critical', or 'low'.
  * `actions` [NotificationAction[]](structures/notification-action.md) (opcional) _macOS_ - Las acciones que se añaden a la notificación. Por favor lea las acciones disponibles y limitaciones en la documentación de `NotificationAction`.
  * `closeButtonText` String (optional) _macOS_ - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

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

#### Evento: "close"

Devuelve:

* `event` Evento

Se emite cuando se cierra la notificación por medio de la intervención manual del usuario.

No se garantiza que este evento se emita en todos los casos donde se cierre la notificación.

#### Evento: "reply" _macOS_

Devuelve:

* `evento` Evento
* `reply` String - La cadena que ingreso el usuario dentro del campo de respuesta insertado.

Se emite cuando el usuario hace clic en el botón "Reply" en una notificación con `hasReply: true`.

#### Evento: "action" _macOS_

Devuelve:

* `event` Event
* `index` Númerp - El indice de la acción que fue activado.

### Métodos de Instancia

Los objetos creados con `new Notification` tienen los siguientes métodos de instancia:

#### `notification.show()`

Muestra inmediatamente la notificación al usuario, por favor tenga en cuenta, esto quiere decir que a diferencia de la implementación de notificación de HTML5, iniciando una `new Notification` no se mostrará inmediatamente al usuario, usted necesita llamar este método antes que el sistema operativo lo muestre.

Si la notificación ha sido mostrada con anterioridad, este método descartará la notificación previa y creará una nueva con propieades idénticas.

#### `notification.close()`

Descarta la notificación.

### Propiedades de Instancia

#### `notification.title`

Una propiedad `String` que representa el título de la notificación.

#### `notification.subtitle`

Una propiedad `String` que representa el subtítulo de la notificación.

#### `notification.body`

Una propiedad `String` que representa el cuerpo de la notificación.

#### `notification.replyPlaceholder`

Una propiedad `String` que representa el marcador de respuesta de la notificación.

#### `notification.sound`

Una propiedad `String` que representa el sonido de la notificación.

#### `notification.closeButtonText`

Una propiedad `String` que representa el texto del botón cerrar en la notificación.

#### `notification.silent`

Una propiedad `Boolean` que representa si la notificación es silenciosa.

#### `notification.hasReply`

Una propiedad `Boolean` que representa si al notificación tiene a una acción de respuesta.

#### `notification.urgency` _Linux_

A `String` property representing the urgency level of the notification. Can be 'normal', 'critical', or 'low'.

Por defecto es 'low' - vea [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) para más información.

#### `notification.timeoutType` _Linux_ _Windows_

A `String` property representing the type of timeout duration for the notification. Can be 'default' or 'never'.

If `timeoutType` is set to 'never', the notification never expires. It stays open until closed by the calling API or the user.

#### `notification.actions`

Una propiedad [`NotificationAction[]`](structures/notification-action.md) que representa las acciones de la notificación.

### Reproducción de Sonidos

En macOS, se puede especificar el nombre del sonido que se desee reproducir cuando se muestre la notificación. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Asegúrese de que el archivo de sonido sea copiado en el paquete de la aplicación (por ejemplo, `YourApp.app/Contents/Resources`), o uno de los siguientes direcciones:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

Ver la documentación [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) para más información.
