# Notification

> Crea las notificaciones de escritorio del sistema operativo

Process: [Main](../glossary.md#main-process)

## Utilizando el proceso de renderizado

Si quieres mostrar notificaciones desde un proceso de renderizado se debe utilizar [HTML5 Notification API](../tutorial/notifications.md)

## Clase: Notification

> Crea las notificaciones de escritorio del sistema operativo

Process: [Main](../glossary.md#main-process)

`Notification` es un [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

Crea una nueva `Notification` con propiedades nativas como las configuradas por `options`.

### Métodos Estáticos

La clase `Notification` tiene los siguientes métodos estáticos:

#### `Notification.isSupported()`

Devuelve `Boolean` - Si las notificaciones de escritorio son soportadas o no en el sistema actual

### `new Notification([options])` *Experimental*

* `opciones` Objeto 
  * `title` Cadena - Un título para la notificación, el cual será mostrado en la parte superior de la ventana de notificación
  * `subtitle` Cadena - (opcional) Un subtítulo para la notificación, la cual aparecerá debajo del título. *macOS*
  * `body` Cadena - El cuerpo del texto de la notificación, el cual aparecerá debajo del título o subtítulo
  * `silent` Booleano - (opcional) Si se emite o no un sonido de notificación del sistema operativo cuando aparece la notificación
  * `icon` [NativeImage](native-image.md) - (optional) An icon to use in the notification
  * `hasReply` Booleano - (opcional) Si se agrega o no una opción de respuesta insertada en la notificación. *macOS*
  * `replyPlaceholder` Cadena- (opcional) El marcador de posición para escribir en el campo insertado de entrada de respuesta. *macOS*
  * `sound` Cadena - (opcional) El nombre del archivo de sonido que se reproduce cuando se muestra la notificación. *macOS*
  * `actions` [NotificationAction[]](structures/notification-action.md) - (opcional) Las acciones que se añaden a la notificación. Por favor lea las acciones disponibles y limitaciones en la documentación de `NotificationAction` *macOS*

### Eventos de Instancia

Los objetos creados con `new Notification` emite los siguientes eventos:

**Nota:** Algunos eventos sólo están disponibles en sistemas operativos específicos y se etiquetan como tal.

#### Evento: "show"

Devuelve:

* `event` Evento

Se emite cuando la notificación se muestra al usuario. Tenga en cuenta que este puede emitirse tantas veces como se muestre la notificación a través del método `show()`.

#### Evento: "click"

Devuelve:

* `event` Evento

Se emite cuando el usuario hace clic en la notificación.

#### Evento: 'close'

Devuelve:

* `event` Evento

Se emite cuando se cierra la notificación por medio de la intervención manual del usuario.

This event is not guarunteed to be emitted in all cases where the notification is closed.

#### Evento: "reply" *macOS*

Devuelve:

* `event` Evento
* `reply` Cadena - La cadena que ingreso el usuario dentro del campo de respuesta insertado

Se emite cuando el usuario hace clic en el botón "Reply" en una notificación con `hasReply: true`.

#### Evento: "action" *macOS*

Devuelve:

* `event` Evento
* `index` Númerp - El indice de la acción que fue activado

### Métodos de Instancia

Los objetos creados con `new Notification` tienen los siguientes métodos de instancia:

#### `notification.show()`

Muestra inmediatamente la notificación al usuario, por favor tenga en cuenta que esto significa que a diferencia de la implementación HTML5 Notification, solamente creando una instancia `new Notification` no lo muestra inmediatamente al usuario. Es necesario llamar a este método antes de que el sistema operativo lo muestre en pantalla.

### Reproducción de Sonidos

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.