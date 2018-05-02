# Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

## Utilisation dans le processus de rendu

SI vous voulez afficher des notifications depuis un processus de rendu, vous devez utiliser l'[API HTML5 de notification](../tutorial/notifications.md)

## Classe : Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Cela crée une nouvelle `Notification` avec les propriétés natives définies par les `options`.

### Méthodes statiques

La classe `Notification` dispose des méthodes statiques suivantes :

#### `Notification.isSupported()`

Retourne `Boolean` - Si le système actuel prend en charge les notification bureau ou non

### `new Notification([options])` *Experimental*

* `options` Object 
  * `title` String - A title for the notification, which will be shown at the top of the notification window when it is shown.
  * `subtitle` String (optional) *macOS* - A subtitle for the notification, which will be displayed below the title.
  * `body` String - The body text of the notification, which will be displayed below the title or subtitle.
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
* `reply` String - The string the user entered into the inline reply field.

Émis lorsque l'utilisateur clique sur le bouton "Reply" sur une notification avec `hasReply: true`.

#### Événement : 'action' *macOS*

Renvoie :

* `event` Événement
* `index` Number - The index of the action that was activated.

### Méthodes d’instance

Les objets créés avec `new Notification` ont les méthodes d'instance suivantes :

#### `notification.show()`

Affiche immédiatement la notification à l'utilisateur, veuillez notez que cela signifie, contrairement à l'implémentation des Notifications HTML5, que simplement instancier un `new Notification` ne va pas afficher immédiatement la notification à l'utilisateur. Pour que l'OS l'affiche à l'écran, vous devez appeler cette méthode.

Si la notification a déjà été affichée auparavant, cette méthode rejettera la notification précédemment affichée et en créera une nouvelle avec des propriétés identiques.

#### `notification.close()`

Rejette la notification.

### Lire un son

Sur macOS, vous pouvez spécifier le nom du son que vous voulez jouer lors de l'affichage de la notification. Tous les sons par défaut (dans préférences système > Son) peuvent être utilisés, en plus des fichiers audio personnalisés. Assurez-vous que le fichier audio soit copié dans l'"app bundle" (par exemple, `VotreApp.app/Contents/Resources`), ou l'un des emplacements suivants :

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

Consultez la documentation de [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) pour plus d'informations.