# Notification

> Crea las notificaciones de escritorio del sistema operativo

Proceso: [Main](../glossary.md#main-process)

## Utilizando el proceso de renderizado

Si quieres mostrar notificaciones desde un proceso de renderizado se debe utilizar [HTML5 Notification API](../tutorial/notifications.md)

## Clase: Notification

> Crea las notificaciones de escritorio del sistema operativo

Proceso: [Main](../glossary.md#main-process)

`Notification` es un [EventEmitter][event-emitter].

Crea una nueva `Notification` con propiedades nativas como las configuradas por `options`.

### Métodos Estáticos

La clase `Notification` tiene los siguientes métodos estáticos:

#### `Notification.isSupported()`

Devuelve `Boolean` - Si las notificaciones de escritorio son soportadas o no en el sistema actual

### `Notificación nueva ([options])`

* `options` Object (opcional)
  * `title` String (opcional) - Un título para la notificación, el cual será mostrado en la parte superior de la ventana de notificación cuando sea mostrado.
  * `subtitle` String (opcional) _macOS_ - Un subtítulo para la notificación, la cual aparecerá debajo del título.
  * `body` String (opcional) - El texto del cuerpo de la notificación, el cual será mostrado debajo del título o del subtítulo.
  * `silent` Boolean (opcional) - Si se emite o no un sonido de notificación del sistema operativo cuando aparece la notificación.
  * `icon` (String | [NativeImage](native-image.md)) (opcional) - Icono para usar en la notificación.
  * `hasReply` Boolean (opcional) _macOS_ - Si se agrega o no una opción de respuesta insertada en la notificación.
  * `timeoutType` String (opcional) _Linux_ _Windows_ - La duración del tiempo de espera de la notificación. Puede ser 'default' o 'never'.
  * `replyPlaceholder` String (opcional) _macOS_ - El marcador de posición para escribir en el campo insertado de entrada de respuesta.
  * `sound` String (opcional) _macOS_ - El nombre del archivo de sonido que se reproduce cuando se muestra la notificación.
  * `urgency` String (opcional) _Linux_ - El nivel de urgencia de la notificación. Puede ser 'normal', 'critical', o 'low'.
  * `actions` [NotificationAction[]](structures/notification-action.md) (opcional) _macOS_ - Las acciones que se añaden a la notificación. Por favor lea las acciones disponibles y limitaciones en la documentación de `NotificationAction`.
  * `closeButtonText` String (opcional) _macOS_ - Un título personalizado para el botón cerrar de una alerta. Una cadena vacía hará que se utilice el texto localizado predeterminado.
  * `toastXml` String (opcional) _Windows_ - Una descripción personalizada de la notificación en Windows sustituyendo todas las propiedades anteriores. Ofrece una personalización completa del diseño y el comportamiento de la notificación.

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

* `event` Event

Se emite cuando se cierra la notificación por medio de la intervención manual del usuario.

No se garantiza que este evento se emita en todos los casos donde se cierre la notificación.

#### Evento: "reply" _macOS_

Devuelve:

* `event` Event
* `reply` String - La cadena que ingreso el usuario dentro del campo de respuesta insertado.

Se emite cuando el usuario hace clic en el botón "Reply" en una notificación con `hasReply: true`.

#### Evento: "action" _macOS_

Devuelve:

* `event` Event
* `index` Númerp - El indice de la acción que fue activado.

#### Evento: 'failed' _Windows_

Devuelve:

* `event` Event
* `error` String - El error encontrado durante la ejecución del método `show()`.

Se emite cuando se encuentra un error al crear y mostrar la notificación nativa.

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

#### `Notification. closeButtonText`

Una propiedad `String` que representa el texto del botón cerrar en la notificación.

#### `notificación. silenciosa`

Una propiedad `Boolean` que representa si la notificación es silenciosa.

#### `Notification. hasReply`

Una propiedad `Boolean` que representa si al notificación tiene a una acción de respuesta.

#### `notification.urgency` _Linux_

Una propiedad de `String` que representa el nivel de urgencia de la notificación. Puede ser 'normal', 'critical', o 'low'.

Por defecto es 'low' - vea [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) para más información.

#### `notification.timeoutType` _Linux_ _Windows_

Una propiedad de `String` que representa el tipo de duración de tiempo de espera para la notificación. Puede ser 'default' o 'never'.

Si `timeoutType` se establece en ' Never ', la notificación nunca expira. Permanece abierto hasta que sea cerrado por la API de llamadas o el usuario.

#### `Notification. Actions`

Una propiedad [`NotificationAction[]`](structures/notification-action.md) que representa las acciones de la notificación.

#### `notification.toastXml` _Windows_

Una propiedad `String` que representa el Toast XML de la notificación.

### Reproducción de Sonidos

En macOS, se puede especificar el nombre del sonido que se desee reproducir cuando se muestre la notificación. Se puede usar cualquiera de los sonidos predeterminados (en las preferencias del sistema > sonido), además de los archivos de sonido personalizados. Asegúrese de que el archivo de sonido sea copiado en el paquete de la aplicación (por ejemplo, `YourApp.app/Contents/Resources`), o uno de los siguientes direcciones:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

Ver la documentación [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) para más información.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
