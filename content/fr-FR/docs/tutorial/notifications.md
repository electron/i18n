# Notifications (Windows, Linux, macOS)

Les trois systèmes d’exploitation permettent aux applications d’envoyer des notifications à l’utilisateur. Electron permet aux développeurs d'envoyer des notifications avec l' [API de Notification HTML5](https://notifications.spec.whatwg.org/), utilisant l'API de notifications natives du système d’exploitation en cours d’exécution pour l’afficher.

**Remarque :** Depuis qu'il s'agit d'une API HTML5 c'est seulement disponible dans le processus de rendu.

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Le code et l’expérience utilisateur sur les différents systèmes d’exploitation sont semblables, mais il y a des différences.

## Windows

* Sur Windows 10, les notifications "fonctionnent".
* Sur Windows 8.1 et Windows 8, un raccourci vers votre application, avec un \[App User Model ID\]\[app-user-model-id\], doit être installé à l’écran de démarrage. Notez, cependant, qu’il n’a pas besoin d’être épinglée à l’écran de démarrage.
* Sur Windows 7, les notifications fonctionnent via une implémentation personnalisée qui ressemble visuellement au natif sur les systèmes plus récents.

En outre, dans Windows 8, la longueur maximale pour le corps de notification est de 250 caractères, l'équipe Windows recommande que les notifications fassent jusqu'à 200 caractères. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Attempting to send gigantic amounts of text to the API (thousands of characters) might result in instability.

### Notifications enrichies

Later versions of Windows allow for advanced notifications, with custom templates, images, and other flexible elements. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with just `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Heures de calme / Mode présentation

Pour détecter si oui ou non vous êtes autorisé à envoyer une notification, utilisez module "userland" [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

Les notifications sont directe sur macOS, mais vous devez être conscient des [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Notez que les notifications sont limitées à 256 octets de taille et risque d’être tronquées si vous dépassez cette limite.

### Notifications enrichies

Les versions ultérieures de macOS permettent aux notifications d'avoir un champ de saisie, permettant à l’utilisateur de répondre rapidement à une notification. Pour envoyer des notifications à un champ de saisie, utilisez le module de "userland" [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Ne pas déranger / État de la session

Pour détecter si oui ou non vous êtes autorisé à envoyer une notification, utilisez module "userland" [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Cela vous permettra de détecter si la notification sera affichée ou pas.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows \[Desktop Notifications Specification\]\[notification-spec\], including Cinnamon, Enlightenment, Unity, GNOME, KDE.