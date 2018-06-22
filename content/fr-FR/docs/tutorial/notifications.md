# Notifications (Windows, Linux, macOS)

Les trois systèmes d’exploitation permettent aux applications d’envoyer des notifications à l’utilisateur. Electron permet aux développeurs d'envoyer des notifications avec l' [API de Notification HTML5](https://notifications.spec.whatwg.org/), utilisant l'API de notifications natives du système d’exploitation en cours d’exécution pour l’afficher.

**Remarque :** Depuis qu'il s'agit d'une API HTML5 c'est seulement disponible dans le processus de rendu. Si vous souhaitez afficher des Notifications depuis le processus principal, veuillez voir le module de [Notification](../api/notification.md).

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

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. Notez, cependant, qu’il n’a pas besoin d’être épinglée à l’écran de démarrage.
* Sur Windows 7, les notifications fonctionnent via une implémentation personnalisée qui ressemble visuellement au natif sur les systèmes plus récents.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][[set-app-user-model-id](../api/app.md#appsetappusermodelidid-windows)] yourself.

En outre, dans Windows 8, la longueur maximale pour le corps de notification est de 250 caractères, l'équipe Windows recommande que les notifications fassent jusqu'à 200 caractères. Cela dit, la limitation a été retiré sur Windows 10. L'équipe Windows demandant aux développeurs de rester raisonnable. Essayer d'envoyer des quantités gigantesques de textes à l'API (milliers de caractères) peut entraîner une instabilité.

### Notifications enrichies

Les versions ultérieures de Windows permettent aux notifications enrichies, avec des modèles personnalisés, des images et autres éléments. Pour envoyer ces notifications (depuis processus principal ou le processus de rendu), utilisez le "userland" module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), qui utilise un addons natif de Node pour envoyer des objets `ToastNotification` et `TileNotification`.

Tandis que les notifications incluant des boutons fonctionnent seulement avec `electron-windows-notifications`, la gestion des réponses nécessite l'utilisation de [`electron-windows-interactive-notification`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), qui aide à l'enregistrement des composants COM requis et fait l'appel à votre application Electron avec les données renseignées.

### Ne pas déranger / Mode présentation

Pour détecter si oui ou non vous êtes autorisé à envoyer une notification, utilisez module "userland" [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Cela permet de déterminer en avance ou non si Windows retire silencieusement la notification.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Notez que les notifications sont limitées à 256 octets de taille et risque d’être tronquées si vous dépassez cette limite.

### Notifications enrichies

Les versions ultérieures de macOS permettent aux notifications d'avoir un champ de saisie, permettant à l’utilisateur de répondre rapidement à une notification. Pour envoyer des notifications à un champ de saisie, utilisez le module de "userland" [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Ne pas déranger / État de la session

Pour détecter si oui ou non vous êtes autorisé à envoyer une notification, utilisez module "userland" [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Cela vous permettra de détecter si la notification sera affichée ou pas.

## Linux

Les notifications sont envoyées à l'aide de `libnotify` qui permet l'affichage de notifications sur n'importe quel environnement bureau suivant [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), comme Cinnamon, Enlightenment, Unity, GNOME et KDE.