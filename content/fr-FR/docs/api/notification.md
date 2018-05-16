# Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

## Utilisation dans le processus de rendu

SI vous voulez afficher des notifications depuis un processus de rendu, vous devez utiliser l'[API HTML5 de notification](../tutorial/notifications.md)

## Classe : Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

`Notification` is an [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

Cela crée une nouvelle `Notification` avec les propriétés natives définies par les `options`.

### Méthodes statiques

La classe `Notification` dispose des méthodes statiques suivantes :

#### `Notification.isSupported()`

Retourne `Boolean` - Si le système actuel prend en charge les notification bureau ou non

### `new Notification([options])` *Experimental*

* `options` Object 
  * `title` String - A title for the notification, which will be shown at the top of the notification window when it is shown
  * `subtitle` String - (optional) A subtitle for the notification, which will be displayed below the title. *macOS*
  * `body` String - The body text of the notification, which will be displayed below the title or subtitle
  * `silent` Boolean - (optional) Whether or not to emit an OS notification noise when showing the notification
  * `icon` [NativeImage](native-image.md) - (optional) An icon to use in the notification
  * `hasReply` Boolean - (optional) Whether or not to add an inline reply option to the notification. *macOS*
  * `replyPlaceholder` String - (optional) The placeholder to write in the inline reply input field. *macOS*
  * `sound` String - (optional) The name of the sound file to play when the notification is shown. *macOS*
  * `actions` [NotificationAction[]](structures/notification-action.md) - (optional) Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation *macOS*

### Événements d’instance

Les objets créés avec `new Notification` émettent les événements suivants :

**Remarque :** Certains événements sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

#### Événement : 'show'

Renvoie :

* `event` Événement

Émis lorsque la notification est affiché à l'utilisateur, notez que cet événement peut être émis plusieurs fois du fait qu'une notification peut être affichée plusieurs fois par le biais de la méthode `show()`.

#### Événement : 'click'

Renvoie :

* `event` Événement

Émis lorsque l'utilisateur clique sur la notification.

#### Événement : 'close'

Renvoie :

* `event` Événement

Émis lorsque la notification est fermée manuellement par l'utilisateur.

This event is not guarunteed to be emitted in all cases where the notification is closed.

#### Événement : 'reply' *macOS*

Renvoie :

* `event` Événement
* `reply` String - The string the user entered into the inline reply field

Émis lorsque l'utilisateur clique sur le bouton "Reply" sur une notification avec `hasReply: true`.

#### Événement : 'action' *macOS*

Renvoie :

* `event` Événement
* `index` Number - The index of the action that was activated

### Méthodes d’instance

Les objets créés avec `new Notification` ont les méthodes d'instance suivantes :

#### `notification.show()`

Affiche immédiatement la notification à l'utilisateur, veuillez notez que cela signifie, contrairement à l'implémentation des Notifications HTML5, que simplement instancier un `new Notification` ne va pas afficher immédiatement la notification à l'utilisateur. Pour que l'OS l'affiche à l'écran, vous devez appeler cette méthode.

### Lire un son

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.