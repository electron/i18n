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
  * `icon` [NativeImage](native-image.md) - (optional) An icon to use in the notification
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

This event is not guarunteed to be emitted in all cases where the notification is closed.

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

### Lire un son

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.