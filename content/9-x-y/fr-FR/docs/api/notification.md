# Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

## Utilisation dans le processus de rendu

SI vous voulez afficher des notifications depuis un processus de rendu, vous devez utiliser l'[API HTML5 de notification](../tutorial/notifications.md)

## Classe : Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

`Notification` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Cela crée une nouvelle `Notification` avec les propriétés natives définies par les `options`.

### Méthodes statiques

La classe `Notification` dispose des méthodes statiques suivantes :

#### `Notification.isSupported()`

Retourne `Boolean` - Si le système actuel prend en charge les notification bureau ou non

### `new Notification([options])` _Experimental_

* `options` Object (optional)
  * `title` String - Le titre de la notification, qui s'affichera en haut de la fenêtre de notification lorsqu'elle est affichée.
  * `sous-titre` String (facultatif) _macOS_ - Un sous-titre pour la notification, qui sera affiché sous le titre.
  * `body` String - Le corps de texte de la notification, qui s'affichera sous le titre ou le sous-titre.
  * `silencieux` Booléen (facultatif) - Émet ou non un bruit de notification lors de l'affichage de la notification.
  * `icône` (String | [NativeImage](native-image.md)) (facultatif) - Une icône à utiliser dans la notification.
  * `hasReply` Boolean (facultatif) _macOS_ - Ajout ou non d'une option de réponse en ligne à la notification.
  * `timeoutType` String (optional) _Linux_ _Windows_ - The timeout duration of the notification. Can be 'default' or 'never'.
  * `replyPlaceholder` String (facultatif) _macOS_ - L'espace réservé à écrire dans le champ de saisie de réponse en ligne.
  * `sound` String (facultatif) _macOS_ - Le nom du fichier audio à jouer lorsque la notification est affichée.
  * `urgency` String (optional) _Linux_ - The urgency level of the notification. Can be 'normal', 'critical', or 'low'.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) _macOS_ - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) _macOS_ - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

### Événements d’instance

Les objets créés avec `new Notification` émettent les événements suivants :

**Remarque :** Certains événements sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

#### Événement : 'show'

Renvoie :

* `event` Événement

Émis lorsque la notification est affiché à l'utilisateur, notez que cet événement peut être émis plusieurs fois du fait qu'une notification peut être affichée plusieurs fois par le biais de la méthode `show()`.

#### Événement : 'click'

Retourne :

* `event` Événement

Émis lorsque l'utilisateur clique sur la notification.

#### Événement : 'close'

Retourne :

* `event` Event

Émis lorsque la notification est fermée manuellement par l'utilisateur.

Cet événement ne garantit pas d'être émis dans tous les cas de fermeture de la notification.

#### Événement : 'reply' _macOS_

Retourne :

* `event` Événement
* `reply` String - La chaîne de caractères que l'utilisateur a écrite dans le champ de réponse.

Émis lorsque l'utilisateur clique sur le bouton "Reply" sur une notification avec `hasReply: true`.

#### Événement : 'action' _macOS_

Retourne :

* `event` Événement
* `index` Number - L'indice de l'action qui a été activée.

### Méthodes d’instance

Les objets créés avec `new Notification` ont les méthodes d'instance suivantes :

#### `notification.show()`

Montre immédiatement la notification à l'utilisateur, veuillez noter que cela signifie que contrairement à la Mise en œuvre de la notification HTML5, instanciation d'une `nouvelle notification` fait ne pas le montrer immédiatement à l'utilisateur, vous devez appeler cette méthode avant le système d'exploitation l'affichera.

Si la notification a déjà été affichée auparavant, cette méthode rejettera la notification précédemment affichée et en créera une nouvelle avec des propriétés identiques.

#### `notification.close()`

Rejette la notification.

### Propriétés d'instance

#### `notification.title`

Une propriété `String` représentant le titre de la notification.

#### `notification.subtitle`

Une propriété `String` représentant le sous-titre de la notification.

#### `notification.body`

Une propriété `String` représentant le corps de la notification.

#### `notification.replyPlaceholder`

Une propriété `String` représentant le placeholder de la réponse de la notification.

#### `notification.sound`

Une propriété `String` représentant le son de la notification.

#### `notification.closeButtonText`

Une propriété `String` représentant le texte du bouton de fermeture de la notification.

#### `notification.silent`

Une propriété `Boolean` qui indique si la notification est silencieuse.

#### `notification.hasReply`

Une propriété `Booléenne` qui indique si la notification a une action de réponse.

#### `notification.urgency` _Linux_

A `String` property representing the urgency level of the notification. Can be 'normal', 'critical', or 'low'.

Default is 'low' - see [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) for more information.

#### `notification.timeoutType` _Linux_ _Windows_

A `String` property representing the type of timeout duration for the notification. Can be 'default' or 'never'.

If `timeoutType` is set to 'never', the notification never expires. It stays open until closed by the calling API or the user.

#### `notification.actions`

Une propriété [`NotificationAction[]`](structures/notification-action.md) représentant les actions de la notification.

### Lire un son

Sur macOS, vous pouvez spécifier le nom du son que vous voulez jouer lors de l'affichage de la notification. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Assurez-vous que le fichier audio soit copié dans l'"app bundle" (par exemple, `VotreApp.app/Contents/Resources`), ou l'un des emplacements suivants :

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

Consultez la documentation de [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) pour plus d'informations.
