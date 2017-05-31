# Notifications (Windows, Linux, macOS)

Les trois systèmes d’exploitation permettent aux applications d’envoyer des notifications à l’utilisateur. Électron permet idéalement aux développeurs envoyer des notifications avec le API</a> de Notification HTML5, à l’aide de notification native du système d’exploitation en cours d’exécution API pour l’afficher.</p> 

**Note:** puisqu’il s’agit d’une API HTML5, il est uniquement disponible dans le processus de rendu.

```javascript
Let myNotification = nouvelle Notification ('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
}) myNotification.onclick = () => {console.log ("Notification cliquée")}
```

Alors que le code et l’expérience utilisateur sur systèmes d’exploitation sont semblables, il y a des différences subtiles.

## Windows

* Sur Windows 10, notifications « que le travail ».
* Sur Windows 8.1 et Windows 8, un raccourci vers votre application, avec un\[app-user-model-id\] \[ID de modèle d’Application utilisateur\], doit être installé à l’écran de démarrage. Notez, cependant, qu’il n’a pas besoin d’être épinglée à l’écran de démarrage.
* Sur Windows 7, notifications de travaillent via une implémentation personnalisée qui visuellement ressemble au natif sur les systèmes plus récents.

En outre, dans Windows 8, la longueur maximale pour le corps de notification est 250 caractères, avec l’équipe Windows recommandant que les notifications devraient être maintenues à 200 caractères. Cela dit, que la restriction a été supprimée dans Windows 10, avec l’équipe de Windows demandant aux développeurs d’être raisonnable. Essayez d’envoyer des quantités gigantesques de texte à l’API (des milliers de caractères) peut entraîner l’instabilité.

### Notifications avancées

Les versions ultérieures de Windows permettent aux notifications avancées, avec des modèles personnalisés, des images et autres éléments élastiques. Pour envoyer ces notifications (à partir du procédé de rendu ou le processus principal), utilisez le "userland" module[electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), qui utilise native nœud addons pour envoyer des objets `ToastNotification` et `TileNotification`.

Alors que les communications y compris les boutons fonctionnent avec quelques `electron-windows-notifications`, traitement des réponses nécessite l’utilisation de [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), qui contribue à inscrire les composants COM requis et en appelant votre application électronique avec les données de l’utilisateur inscrit.

### Heures de calme / Mode présentation

Pour détecter si oui ou non vous êtes autorisé à envoyer une notification, utilisez le module "userland"[electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Cela permet de déterminer en avance ou non Windows lèvera silencieusement à la notification.

## macOS

Les notifications sont directe sur macOS, mais vous devez être conscient du directives Interface humaine de[Apple concernant les notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Notez que les notifications sont limitées à 256 octets de taille et risque d’être tronquées si vous dépassez cette limite.

### Notifications avancées

Les versions ultérieures de macOS permettent aux notifications avec un champ de saisie, permettant à l’utilisateur de répondre rapidement à une notification. Pour envoyer des notifications à un champ de saisie, utilisez le module "userland" [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Ne pas déranger / Session State

Pour détecter si oui ou non vous êtes autorisé à envoyer une notification, utilisez le module "userland"[electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Cela vous permettra de détecter avance si oui ou non la notification sera affichée.

## Linux

Les notifications sont envoyées à l’aide de `libnotify` qui peuvent afficher les notifications sur n’importe quel environnement de bureau que[notification-spec] suit [Desktop Notifications spécifications], y compris la cannelle, l’illumination, l’unité, GNOME, KDE.