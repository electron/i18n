# Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

## Utilisation dans le processus renderer

SI vous voulez afficher des notifications depuis un processus renderer, vous devez utiliser l'[API HTML5 de notification](../tutorial/notifications.md)

## Classe : Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

`Notification` est un [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

Cela créer une nouvelle `Notification` avec les propriétés natives défini par les `options`.

### Méthodes statiques

La classe `Notification` dispose des méthodes statiques suivantes :

#### `Notification.isSupported()`

Retourne `Boolean` - Si le système actuel prend en charge les notification bureau

### `new Notification([options])` *Experimental*

* `options` Object 
  * `title` String - Le titre de la notification, qui s'affichera en haut de la fenêtre de notification lorsqu'il est affiché
  * `subtitle` String - (facultatif) Un sous-titre pour la notification, qui s'affichera en dessous du titre. *macOS*
  * `body` String - Le corp de texte de la notification, qui s'affichera sous le titre ou le sous-titre
  * `silent` Boolean - (optional) Whether or not to emit an OS notification noise when showing the notification
  * `icon` [NativeImage](native-image.md) - (optional) An icon to use in the notification
  * `hasReply` Boolean - (optional) Whether or not to add an inline reply option to the notification. *macOS*
  * `replyPlaceholder` String - (optional) The placeholder to write in the inline reply input field. *macOS*
  * `sound` String - (optional) The name of the sound file to play when the notification is shown. *macOS*
  * `actions` [NotificationAction[]](structures/notification-action.md) - (optional) Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation *macOS*

### Événements d’instance

Objects created with `new Notification` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### Événement : 'show'

Retourne :

* `event` Event

Emitted when the notification is shown to the user, note this could be fired multiple times as a notification can be shown multiple times through the `show()` method.

#### Event: 'click'

Retourne :

* `event` Event

Emitted when the notification is clicked by the user.

#### Événement : 'close'

Retourne :

* `event` Event

Emitted when the notification is closed by manual intervention from the user.

This event is not guarunteed to be emitted in all cases where the notification is closed.

#### Event: 'reply' *macOS*

Retourne :

* `event` Event
* `reply` String - The string the user entered into the inline reply field

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

#### Event: 'action' *macOS*

Retourne :

* `event` Event
* `index` Number - The index of the action that was activated

### Méthodes d’instance

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