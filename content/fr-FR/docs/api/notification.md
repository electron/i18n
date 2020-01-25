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

### `new Notification([options])` *Experimental*

* `options` Object (facultatif) 
  * `title` String - Le titre de la notification, qui s'affichera en haut de la fenêtre de notification lorsqu'elle est affichée.
  * `sous-titre` String (facultatif) *macOS* - Un sous-titre pour la notification, qui sera affiché sous le titre.
  * `body` String - Le corps de texte de la notification, qui s'affichera sous le titre ou le sous-titre.
  * `silencieux` Booléen (facultatif) - Émet ou non un bruit de notification lors de l'affichage de la notification.
  * `icône` (String | [NativeImage](native-image.md)) (facultatif) - Une icône à utiliser dans la notification.
  * `hasReply` Boolean (facultatif) *macOS* - Ajout ou non d'une option de réponse en ligne à la notification.
  * `replyPlaceholder` String (facultatif) *macOS* - L'espace réservé à écrire dans le champ de saisie de réponse en ligne.
  * `sound` String (facultatif) *macOS* - Le nom du fichier audio à jouer lorsque la notification est affichée.
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

### Lire un son

Sur macOS, vous pouvez spécifier le nom du son que vous voulez jouer lors de l'affichage de la notification. Tous les sons par défaut (dans préférences système > Son) peuvent être utilisés, en plus des fichiers audio personnalisés. Assurez-vous que le fichier audio soit copié dans l'"app bundle" (par exemple, `VotreApp.app/Contents/Resources`), ou l'un des emplacements suivants :

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

Consultez la documentation de [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) pour plus d'informations.