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
  * `subtitle` String (opcional) *macOS* - Un subtítulo para la notificación, la cual aparecerá debajo del título.
  * `body` String - El cuerpo del texto de la notificación, el cual aparecerá debajo del título o subtítulo.
  * `silent` Boolean (opcional) - Si se emite o no un sonido de notificación del sistema operativo cuando aparece la notificación.
  * `icon` (String | [NativeImage](native-image.md)) (opcional) - Icono para usar en la notificación.
  * `hasReply` Boolean (opcional) *macOS* - Si se agrega o no una opción de respuesta insertada en la notificación.
  * `replyPlaceholder` String (opcional) *macOS* - El marcador de posición para escribir en el campo insertado de entrada de respuesta.
  * `sound` String (opcional) *macOS* - El nombre del archivo de sonido que se reproduce cuando se muestra la notificación.
  * `actions` [NotificationAction[]](structures/notification-action.md) (opcional) *macOS* - Las acciones que se añaden a la notificación. Por favor lea las acciones disponibles y limitaciones en la documentación de `NotificationAction`.
  * `closeButtonText` String (opcional) *macOS* - Un título personalizado para el botón de cerrar de una alerta. Una cadena vacía causará que se use el texto localizado predeterminado.

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

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

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