# Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

## Utilisation dans le processus de rendu

SI vous voulez afficher des notifications depuis un processus de rendu, vous devez utiliser l'[API HTML5 de notification](../tutorial/notifications.md)

## Classe : Notification

> Créer des notifications bureau spécifique à l'OS

Processus : [Main](../glossary.md#main-process)

`Notification` est un [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

Cela crée une nouvelle `Notification` avec les propriétés natives définies par les `options`.

### Méthodes statiques

La classe `Notification` dispose des méthodes statiques suivantes :

#### `Notification.isSupported()`

Retourne `Boolean` - Si le système actuel prend en charge les notification bureau ou non

### `new Notification([options])` *Experimental*

* `options` Object 
  * `title` String - Le titre de la notification, qui s'affichera en haut de la fenêtre de notification lorsqu'elle est affichée
  * `subtitle` String - (facultatif) Un sous-titre pour la notification, qui s'affichera en dessous du titre. *macOS*
  * `body` String - Le corps de texte de la notification, qui s'affichera sous le titre ou le sous-titre
  * `silent` Boolean - (facultatif) Émet ou non le signal sonore d'une notification lors de l'affichage de la notification
  * `icon` (String | [NativeImage](native-image.md)) - (facultatif) Icône à utiliser dans la notification
  * `hasReply` Boolean - (facultatif) Ajoute ou non une ligne de réponse en option à la notification. *macOS*
  * `replyPlaceholder` String - (facultatif) Le texte d'exemple à afficher dans le champ de saisie de réponse. *macOS*
  * `sound` String - (facultatif) Le nom du fichier son à jouer lorsque la notification est affichée. *macOS*
  * `actions` [NotificationAction[]](structures/notification-action.md) - (facultatif) Les actions à ajouter à la notification. Vous trouverez les actions disponibles et les limitations dans la documentation de `NotificationAction` *macOS*

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
* `reply` String - La chaîne de caractères que l'utilisateur a écrite dans le champ de réponse

Émis lorsque l'utilisateur clique sur le bouton "Reply" sur une notification avec `hasReply: true`.

#### Événement : 'action' *macOS*

Renvoie :

* `event` Événement
* `index` Number - L'indice de l'action qui a été activée

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