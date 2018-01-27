# Notificación

> Crea las notificaciones de escritorio del sistema operativo

Proceso: [Main](../glossary.md#main-process)

## Utilizando el proceso de renderizado

Si quieres mostrar notificaciones desde un proceso de renderizado se debe utilizar [HTML5 Notification API](../tutorial/notifications.md)

## Clase: Notification

> Crea las notificaciones de escritorio del sistema operativo

Proceso: [Main](../glossary.md#main-process)

`Notification` es un [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

Crea una nueva `Notification` con propiedades nativas como las configuradas por `options`.

### Métodos Estáticos

La clase `Notification` tiene los siguientes métodos estáticos:

#### `Notification.isSupported()`

Devuelve `Boolean` - Si las notificaciones de escritorio son soportadas o no en el sistema actual

### `new Notification([options])` *Experimental*

* `options` Objeto 
  * `title` Cadena - Un título para la notificación, el cual será mostrado en la parte superior de la ventana de notificación
  * `subtitle` Cadena - (opcional) Un subtítulo para la notificación, la cual aparecerá debajo del título. *macOS*
  * `body` Cadena - El cuerpo del texto de la notificación, el cual aparecerá debajo del título o subtítulo
  * `silent` Booleano - (opcional) Si se emite o no un sonido de notificación del sistema operativo cuando aparece la notificación
  * `icon` [NativeImage](native-image.md) - (opcional) Un icono para usarse en la notificación
  * `hasReply` Booleano - (opcional) Si se agrega o no una opción de respuesta insertada en la notificación. *macOS*
  * `replyPlaceholder` Cadena- (opcional) El marcador de posición para escribir en el campo insertado de entrada de respuesta. *macOS*
  * `sound` Cadena - (opcional) El nombre del archivo de sonido que se reproduce cuando se muestra la notificación. *macOS*
  * `actions` [NotificationAction[]](structures/notification-action.md) - (opcional) Las acciones que se añaden a la notificación. Please read the available actions and limitations in the `NotificationAction` documentation *macOS*

### Eventos de Instancia

Objects created with `new Notification` emit the following events:

**Nota:** Algunos eventos sólo están disponibles en sistemas operativos específicos y se etiquetan como tal.

#### Evento: "show"

Devuelve:

* `evento` Evento

Emitted when the notification is shown to the user, note this could be fired multiple times as a notification can be shown multiple times through the `show()` method.

#### Event: 'click'

Devuelve:

* `evento` Evento

Emitted when the notification is clicked by the user.

#### Evento: 'close'

Devuelve:

* `evento` Evento

Emitted when the notification is closed by manual intervention from the user.

This event is not guarunteed to be emitted in all cases where the notification is closed.

#### Event: 'reply' *macOS*

Devuelve:

* `evento` Evento
* `reply` String - The string the user entered into the inline reply field

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

#### Event: 'action' *macOS*

Devuelve:

* `evento` Evento
* `index` Number - The index of the action that was activated

### Métodos de Instancia

Objects created with `new Notification` have the following instance methods:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, simply instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

### Playing Sounds

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.