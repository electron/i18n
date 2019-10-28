# Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

## Utilisation dans le processus de rendu

SI vous voulez afficher des notifications depuis un processus de rendu, vous devez utiliser l'[API HTML5 de notification](../tutorial/notifications.md)

## Classe : Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Cela crée une nouvelle `Notification` avec les propriétés natives définies par les `options`.

### Méthodes statiques

La classe `Notification` dispose des méthodes statiques suivantes :

#### `Notification.isSupported()`

Retourne `Boolean` - Si le système actuel prend en charge les notification bureau ou non

### `new Notification([options])` *Experimental*

* `options` Object (facultatif) 
  * `title` String - Le titre de la notification, qui s'affichera en haut de la fenêtre de notification lorsqu'elle est affichée.
  * `subtitle` String (optional) *macOS* - A subtitle for the notification, which will be displayed below the title.
  * `body` String - Le corps de texte de la notification, qui s'affichera sous le titre ou le sous-titre.
  * `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
  * `icon` (String | [NativeImage](native-image.md)) (optional) - An icon to use in the notification.
  * `hasReply` Boolean (optional) *macOS* - Whether or not to add an inline reply option to the notification.
  * `replyPlaceholder` String (optional) *macOS* - The placeholder to write in the inline reply input field.
  * `sound` String (optional) *macOS* - The name of the sound file to play when the notification is shown.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) *macOS* - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) *macOS* - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

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

Cet événement ne garantit pas d'être émis dans tous les cas de fermeture de la notification.

#### Événement : 'reply' *macOS*

Renvoie :

* `event` Événement
* `reply` String - La chaîne de caractères que l'utilisateur a écrite dans le champ de réponse.

Émis lorsque l'utilisateur clique sur le bouton "Reply" sur une notification avec `hasReply: true`.

#### Événement : 'action' *macOS*

Renvoie :

* `event` Événement
* `index` Number - L'indice de l'action qui a été activée.

### Méthodes d’instance

Les objets créés avec `new Notification` ont les méthodes d'instance suivantes :

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

Si la notification a déjà été affichée auparavant, cette méthode rejettera la notification précédemment affichée et en créera une nouvelle avec des propriétés identiques.

#### `notification.close()`

Rejette la notification.

### Propriétés d'instance

#### `notification.title`

A `String` property representing the title of the notification.

#### `notification.subtitle`

A `String` property representing the subtitle of the notification.

#### `notification.body`

A `String` property representing the body of the notification.

#### `notification.replyPlaceholder`

A `String` property representing the reply placeholder of the notification.

#### `notification.sound`

A `String` property representing the sound of the notification.

#### `notification.closeButtonText`

A `String` property representing the close button text of the notification.

#### `notification.silent`

A `Boolean` property representing whether the notification is silent.

#### `notification.hasReply`

A `Boolean` property representing whether the notification has a reply action.

#### `notification.actions`

A [`NotificationAction[]`](structures/notification-action.md) property representing the actions of the notification.

### Playing Sounds

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.