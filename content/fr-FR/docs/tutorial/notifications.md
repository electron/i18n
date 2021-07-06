# Notifications (Windows, Linux, macOS)

## Vue d'ensemble

Les trois systèmes d'exploitation fournissent des moyens pour les applications d'envoyer des notifications à l'utilisateur. La technique d'affichage des notifications est différente pour les processus Main et Renderer.

Pour le processus de rendu Electron permet facilement aux développeurs d'envoyer des notifications avec l'API de notification [HTML5](https://notifications.spec.whatwg.org/), en utilisant les API de notification natives du système d'exploitation actuellement en cours d'exécution pour l'afficher.

Pour afficher les notifications dans le processus principal, vous devez utiliser le module [Notification](../api/notification.md).

## Exemple

### Afficher les notifications dans le processus de rendu

En partant d'une application fonctionnelle du [Guide de démarrage rapide](quick-start.md), ajoutez les lignes suivantes au fichier `index.html` avant la balise de fermeture `</body>` :

```html
<script src="renderer.js"></script>
```

... et ajoutez le fichier `renderer.js` :

```javascript fiddle='docs/fiddles/features/notifications/renderer'
const NOTIFICATION_TITLE = 'Titre'
const NOTIFICATION_BODY = 'Notification du Processus de rendu. Cliquez pour écrire dans la console.'
const CLICK_MESSAGE = 'Notification cliquée'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => console.log(CLICK_MESSAGE)
```

Après avoir lancé l'application Electron, vous devriez voir la notification :

![Notification dans le processus de rendu](../images/notification-renderer.png)

De plus, si vous cliquez sur la notification, le DOM se mettra à jour pour afficher "Notification cliquée!".

### Afficher les notifications dans le processus principal

À partir d’une application fonctionnelle du [Guide de démarrage rapide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript fiddle='docs/fiddles/features/notifications/main'
const { Notification } = require('electron')

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

Après avoir lancé l'application Electron, vous devriez voir la notification système :

![Notification dans le processus principal](../images/notification-main.png)

## Informations complémentaires

Le code et l’expérience utilisateur sur les différents systèmes d’exploitation sont semblables, mais il y a des différences.

### Windows

* Sous Windows 10, un raccourci vers votre application avec un [ID de modèle d’utilisateur d’application][app-user-model-id] doit être installé sur le Menu Démarrer. Cela peut être overkill pendant le développement, donc ajouter `node_modules\electron\dist\electron.exe` à votre menu de démarrage fait aussi l'astuce . Naviguez vers le fichier dans l'explorateur, cliquez avec le bouton droit de la souris et 'Épingler pour démarrer le menu'. Vous devrez ensuite ajouter la ligne `app.setAppUserModelId(process.execPath)` à votre processus principal pour voir les notifications.
* Sous Windows 8.1 et Windows 8, un raccourci vers votre application avec un [Utilisateur de l'application ID modèle][app-user-model-id] doit être installé sur l'écran de démarrage. Notez, cependant, qu’il n’a pas besoin d’être épinglée à l’écran de démarrage.
* Sur Windows 7, les notifications fonctionnent via une implémentation personnalisée qui ressemble visuellement au natif sur les systèmes plus récents.

Electron tente d'automatiser le travail autour de l'ID du modèle utilisateur de l'application. Quand Electron est utilisé conjointement avec l'installation et la mise à jour du framework Squirrel, [raccourcis seront automatiquement configurés correctement][squirrel-events]. De plus, Electron détectera que Squirrel a été utilisé et appellera automatiquement `app.setAppUserModelId()` avec la valeur correcte. Pendant le développement, vous pouvez avoir pour appeler [`app.setAppUserModelId()`][set-app-user-model-id] vous-même.

En outre, dans Windows 8, la longueur maximale pour le corps de notification est de 250 caractères, l'équipe Windows recommande que les notifications fassent jusqu'à 200 caractères. Cela dit, la limitation a été retiré sur Windows 10. L'équipe Windows demandant aux développeurs de rester raisonnable. Essayer d'envoyer des quantités gigantesques de textes à l'API (milliers de caractères) peut entraîner une instabilité.

#### Notifications enrichies

Les versions ultérieures de Windows permettent aux notifications enrichies, avec des modèles personnalisés, des images et autres éléments. Pour envoyer ces notifications (depuis processus principal ou le processus de rendu), utilisez le "userland" module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), qui utilise un addons natif de Node pour envoyer des objets `ToastNotification` et `TileNotification`.

Bien que les notifications incluant des boutons fonctionnent avec `electron-windows-notifications`, la gestion des réponses nécessite l'utilisation de [`electron-windows-interactive-notification`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), qui aide à l'enregistrement des composants COM requis et fait l'appel à votre application Electron avec les données saisies par l'utilisateur.

#### Ne pas déranger / Mode présentation

Utilisez le module userland [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) afin de détecter si vous êtes autorisé à envoyer une notification, .

Cela permet de déterminer à l'avance si Windows supprimera silencieusement la notification.

### macOS

Les notifications sont simples sur macOS, mais vous devriez être au courant de [Directives de l'interface humaine d'Apple concernant les notifications][apple-notification-guidelines].

Notez que les notifications sont limitées à 256 octets de taille et risque d’être tronquées si vous dépassez cette limite.

#### Ne pas déranger / État de la session

Pour détecter si oui ou non vous êtes autorisé à envoyer une notification, utilisez module "userland" [electron-notification-state][electron-notification-state].

Cela vous permettra de détecter si la notification sera affichée ou pas.

### Linux

Les notifications sont envoyées à l'aide de `libnotify` qui permet l'affichage de notifications sur n'importe quel environnement bureau suivant [Desktop Notifications Specification][notification-spec], comme Cinnamon, Enlightenment, Unity, GNOME et KDE.

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
