# app

> Contrôle le cycle de vie des événements de votre application.

Processus : [Main](../glossary.md#main-process)

L’exemple suivant montre comment quitter l’application lorsque la dernière fenêtre est fermée :

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Événements

L'objet `app` émet les événements suivants :

### Événement : 'will-finish-launching'

Émis lorsque l'application a terminé son démarrage de base. Sur Windows et Linux, l'événement `will-finish-launching` est le même que l'événement `ready`. Sur macOS, cet événement représente la notification `applicationWillFinishLaunching` de `NSApplication`. Vous allez habituellement mettre en place des listeners pour les événements `open-file` et `open-url` ici, et lancer le reporteur d'incident et la mise à jour automatique.

Dans la plupart des cas, vous devriez pouvoir tout faire dans l'évènement `ready`.

### Événement : 'ready'

Retourne :

* `event` Événement
* `launchInfo` Record<string, any> | [NotificationResponse](structures/notification-response.md) _macOS_

Émis lorsqu'Electron a terminé l’initialisation. On macOS, `launchInfo` holds the `userInfo` of the `NSUserNotification` or information from [`UNNotificationResponse`](structures/notification-response.md) that was used to open the application, if it was launched from Notification Center. Vous pouvez également appeler `app.isReady()` pour vérifier si cet événement a déjà été émis et `app.whenReady()` pour obtenir une Promesse qui sera résolue Electron sera initialisé.

### Événement : 'window-all-closed'

Émis lorsque toutes les fenêtres ont été fermées.

Si vous n'être pas abonné à cet événement et que toutes les fenêtres sont fermées, le comportement par défaut consiste à quitter l'application. Toutefois, si vous vous abonnez, vous pouvez contrôler le fait que l'application se ferme ou non. Si l'utilisateur appuie sur `Cmd + Q`, ou le développeur appelle `app.quit()`, Electron essaie d'abord de fermer toutes les fenêtres et puis émet l'événement `will-quit` et dans ce cas, l'événement `window-all-closed` ne sera pas émis.

### Événement : 'before-quit'

Retourne :

* `event` Événement

Émis avant que l'application ne commence à fermer ses fenêtres. Appeler `event.preventDefault()` empêchera le comportement par défaut, qui est de terminer l'application.

**Remarque :** Si l'application a été quittée par `autoUpdater.quitAndInstall()`, puis `before-quit` est émise *après* émettant un événement `close` sur toutes les fenêtres et les fermant.

**Note:** Sous Windows, cet événement ne sera pas émit si l'application est fermée à cause d'un extinction du système/re-démarrage ou une déconnexion de l'utilisateur.

### Événement : 'will-quit'

Retourne :

* `event` Événement

Émis lorsque toutes les fenêtres ont été fermées et que l'application va se fermer. Appeler `event.preventDefault()` empêchera le comportement par défaut, qui est de terminer l'application.

Consultez la description de l’événement `window-all-closed` pour voir les différences entre les événements `will-quit` et `window-all-closed`.

**Note:** Sous Windows, cet événement ne sera pas émit si l'application est fermée à cause d'un extinction du système/re-démarrage ou une déconnexion de l'utilisateur.

### Événement : 'quit'

Retourne :

* `event` Événement
* `exitCode` Integer

Émis lorsque l'application se quitte.

**Note:** Sous Windows, cet événement ne sera pas émit si l'application est fermée à cause d'un extinction du système/re-démarrage ou une déconnexion de l'utilisateur.

### Événement : 'open-file' _macOS_

Retourne :

* `event` Événement
* `path` String

Émis lorsque l’utilisateur souhaite ouvrir un fichier avec l’application. L’événement `open-file` est habituellement émis lorsque l’application est déjà ouvert et le système d’exploitation souhaite réutiliser l’application pour ouvrir le fichier. `open-file` est également émis lorsqu’un fichier est déposé sur le dock et l’application n’est pas encore en cours d’exécution. Assurez-vous d’écouter l’événement `open-file` très tôt dans le démarrage votre l’application pour gérer ce cas (même avant que l’événement `ready` soit émis).

Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

Sur Windows, vous devrez analyser `process.argv` (dans le main process) pour obtenir le chemin d'accès.

### Événement : 'open-url' _macOS_

Retourne :

* `event` Événement
* `url` String

Émis lorsque l’utilisateur souhaite ouvrir une URL avec l’application. Le fichier de votre application `Info.plist` doit définir le schéma d'URL dans la touche `CFBundleURLTypes` et définir `NSPrincipalClass` à `AtomApplication`.

Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

### Événement : 'activate' _macOS_

Retourne :

* `event` Événement
* `hasVisibleWindows` Boolean

Émis lorsque l'application est activée. Différentes actions peuvent déclencher cet événement, comme le lancement de l’application pour la première fois, essayer de relancer l’application lorsqu’elle est déjà en cours d’exécution, ou en cliquant sur l'icône du dock de l’application ou de l’icône de la barre des tâches.

### Événement : 'did-become-active' _macOS_

Retourne :

* `event` Événement

Émis lorsque l'application est activée. Contrairement à l'événement `activate`, l'événement `did-become-active` est émit à chaque fois que l'application devient active, et pas seulement sur l'icône du Dock de l'application ou quand l'application est relancée.

### Événement : 'continue-activity' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`][activity-type].
* `userInfo` inconnu - Contient l'état spécifique de l'application stocké par l'activité sur un autre appareil.

Émis au cours de la [procédure de transfert][handoff] quand une activité depuis un périphérique différent veut reprendre. Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

Une activité d'utilisateur peut être poursuivie seulement dans une application qui a le même identifiant d'équipe développeur que l'application d'origine de la source d'activité et qui prend en charge le type d'activité. La prise en charge d’activité types est spécifiée dans le `Info.plist` de l'application sous la clé `NSUserActivityType`.

### Événement: 'wil-continue-activity' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`][activity-type].

Émis au cours de la [procédure de transfert][handoff] quand une activité depuis un périphérique différent veut reprendre. Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

### Événement : 'continue-activity-error' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`][activity-type].
* `error` String - Une chaîne de caractères avec la description localisée de l'erreur.

Émis au cours de la [procédure de transfert][handoff] quand une activité depuis un périphérique différent n'arrive pas à reprendre.

### Événement : 'activity-was-continued' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`][activity-type].
* `userInfo` inconnu - Contient l'état spécifique de l'application stocké par l'activité.

Émis au cours de la [procédure de transfert][handoff]après qu'une activité depuis un périphérique différent a bien repris.

### Événement : 'update-activity-state' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`][activity-type].
* `userInfo` inconnu - Contient l'état spécifique de l'application stocké par l'activité.

Émis lorsque la [procédure de transfert][handoff] va être repris par un autre appareil. Si vous avez besoin de mettre à jour l'état à transférer, vous devez appeler `event.preventDefault()` immédiatement, construire un nouveau dictionnaire `userInfo` et appeler `app.updateCurrentActivity()` en suivant. Sinon, l'opération échouera et `continue-activity-error` sera appelée.

### Événement : 'new-window-for-tab' _macOS_

Retourne :

* `event` Événement

Émis lorsque l'utilisateur clique sur le bouton natif de nouvel onglet de macOS. Le bouton de nouvel onglet n'est visible que si la `BrowserWindow actuelle` possède un `tabbingIdentifier`

### Événement : 'browser-window-blur'

Retourne :

* `event` Événement
* `window` [BrowserWindow](browser-window.md)

Émis lorsqu'un [browserWindow](browser-window.md) perd le focus.

### Événement : 'browser-window-focus'

Retourne :

* `event` Événement
* `window` [BrowserWindow](browser-window.md)

Émis lorsqu'un [browserWindow](browser-window.md) gagne le focus.

### Événement : 'browser-window-created'

Retourne :

* `event` Événement
* `window` [BrowserWindow](browser-window.md)

Émis lorsqu'un nouveau [browserWindow](browser-window.md) est créé.

### Événement : 'web-contents-created'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)

Émis lorsqu'un nouveau [webContents](web-contents.md) est créé.

### Événement 'certificate-error'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - Le code d'erreur
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - Détermine si le certificat doit être considéré comme digne de confiance

Émis lorsque la vérification du `certificate` pour l'`url` a échouée. Pour approuver le certificat, vous devez empêcher le comportement par défaut avec `event.preventDefault()` et appeler `callback(true)`.

```javascript
const { app } = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Logique de vérification.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Événement : 'select-client-certificate'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Certificate](structures/certificate.md) (facultatif)

Émis lorsqu'un certificat client est demandé.

L' `url` correspondant à l’entrée de navigation demande le certificat client et le `callback` peut être appelée avec une entrée filtrée dans la liste. L’utilisation de `event.preventDefault()` empêche l’application d’utiliser le premier certificat du store.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Événement : 'login'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* Objet `authenticationResponseDetails`
  * `url` URL
* Objet `authInfo`
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `nom d'utilisateur` String (facultatif)
  * `mot de passe` String (facultatif)

Émis lorsque `webContents` veut faire une authentification normale.

Le comportement par défaut est d'annuler toutes les authentifications. Pour remplacer cela vous devez empêcher le comportement par défaut avec `event.preventDefault()` et appeler `callback(username, password)` avec les identifiants.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

Si `callback` est appelé sans nom d'utilisateur ou mot de passe, la demande d'authentification sera annulée et l'erreur d'authentification sera renvoyée à la page .

### Événement : 'gpu-info-update'

Émis chaque fois qu'il y a une mise à jour d'informations GPU.

### Événement : 'gpu-process-crashed' _Deprecated_

Retourne :

* `event` Événement
* `killed` Boolean

Émis lorsque le processus GPU plante ou est tué.

**Deprecated:** Cet événement est remplacé par l'événement `child-process-gone` qui contient plus d'informations à propos de la raison du plantage du processus enfant. Ceci n'est pas toujours causé par un plantage. Le booléen `killed` peut être remplacé par la vérification de `reason === 'killed'` lorsque vous passez à l'utilisation de cet événement.

### Événement : 'renderer-process-crashed' _Deprecated_

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Émis lorsque le processus de rendu de `webContents` plante ou est tué.

**Deprecated:** Cet événement est remplacé par l'événement `render-process-gone` qui contient plus d'informations à propos de la raison du plantage du processus enfant. Ceci n'est pas toujours causé par un plantage.  Le booléen `killed` peut être remplacé par la vérification de `reason === 'killed'` lorsque vous passez à l'utilisation de cet événement.

### Événement : 'render-process-gone'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* Objet `details`
  * `reason` String - La raison pour laquelle le processus de rendu a disparu.  Valeurs possibles :
    * `` de sortie propre - Processus s'est terminé avec le code de sortie zéro
    * `anormal-exit` - Le Processus s'est terminé avec un code de sortie différent de zéro
    * `killed` - Le processus a reçu un SIGTERM ou a été tué autrement de l'extérieur
    * `crashed` - Processus s'est planté
    * `oom` - Le processus est tombé à cours de mémoire
    * `launch-failed` - Le processus ne s'est pas lancé avec succès
    * `integrity-failure` - Les vérifications d'intégrité du code Windows ont échouées
  * `Codedesortie`Numero integre-Le code de sortie du proces, sauf `si <code>la raison est <code>lancer a echoue,`ou <0>le codeSortie </code>sera une plateforme specifique, de code envoye errone.

Émis lorsque le processus de rendu plante de manière inattendue.  C'est normalement dans les cas où il s'est planté ou qu'il a été tué.

### Événement : 'child-process-gone'

Retourne :

* `event` Événement
* Objet `details`
  * `type` String - Type de processus. Une des valeurs suivantes:
    * `Utilitaire`
    * `Zygote`
    * `Assistant bac à sable`
    * `GPU`
    * `Plugin Pepper`
    * `Broker de plugin Pepper`
    * `Inconnu`
  * `reason` String - The reason the child process is gone. Valeurs possibles :
    * `` de sortie propre - Processus s'est terminé avec le code de sortie zéro
    * `anormal-exit` - Le Processus s'est terminé avec un code de sortie différent de zéro
    * `killed` - Le processus a reçu un SIGTERM ou a été tué autrement de l'extérieur
    * `crashed` - Processus s'est planté
    * `oom` - Le processus est tombé à cours de mémoire
    * `launch-failed` - Le processus ne s'est pas lancé avec succès
    * `integrity-failure` - Les vérifications d'intégrité du code Windows ont échouées
  * `exitCode` Number - The exit code for the process (e.g. status from waitpid if on posix, from GetExitCodeProcess on Windows).
  * `serviceName` String (optional) - The non-localized name of the process.
  * `name` String (optional) - The name of the process. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.

Émis lorsque le processus enfant plante de manière inattendue. C'est normalement dans les cas où il s'est planté ou qu'il a été tué. Cela n'inclut pas le processus de rendu.

### Événement : 'accessibility-support-changed' _macOS_ _Windows_

Retourne :

* `event` Événement
* `accessibilitySupportEnabled` Boolean - `true` quand le support de l'accessibilité de Chrome est activé, sinon `false`.

Émis lorsque le support de l’accessibilité du Chrome change. Cet événement se déclenche lorsque les technologies d’assistance, tels que les lecteurs d’écran sont activés ou désactivés. Voir https://www.chromium.org/developers/design-documents/accessibility pour plus de détails.

### Évènement : 'session-created'

Retourne :

* `session` [Session](session.md)

Émis lorsque Electron vient de créer une nouvelle `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (session) => {
  console.log(session)
})
```

### Évènement : 'second-instance'

Retourne :

* `event` Événement
* `argv` String[] - un tableau d’arguments de la deuxième instance de la ligne de commande
* `workingDirectory` String - Le répertoire de travail de la deuxième instance

Cet événement sera émis dans l'instance principale de votre application quand une seconde instance a été exécutée et appelle `app.requestSingleInstanceLock()`.

`argv` est un tableau des arguments de la ligne de commande de la seconde instance, et `workingDirectory` est son répertoire de travail actuel. Les applications répondent habituellement à cela en faisant de leur fenêtre principale, une fenêtre centrée et non réduite au minimum.

**Note:** Si la seconde instance a été lancée par un utilisateur différent du premier, le tableau `argv` ne va pas inclure les arguments.

Cet évènement est garanti d'être émis après que l'évènement `ready` de `app` soit émis.

**Remarque :** Des arguments supplémentaires en ligne de commande peuvent être ajoutés par Chromium, tels que `--original-process-start-time`.

### Événement : 'desktop-capturer-get-sources'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)

Émis lors de l'appel à `desktopCapturer.getSources()` dans le processus de rendu de `webContents`. L' Appel à `event.preventDefault()` lui fera retourner des sources vides.

### Événement: 'remote-require' _Deprecated_

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `module` String

Émis lorsque `remote.require()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Événement: 'remote-get-global' _Deprecated_

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Émis lorsque `remote.getGlobal()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Événement: 'remote-get-builtin' _Deprecated_

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `module` String

Émis lorsque `remote.getBuiltin()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Événement: 'remote-get-current-window' _Deprecated_

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)

Émis lorsque `remote.getCurrentWindow()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Événement: 'remote-get-current-web-contents' _Deprecated_

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)

Émis lorsque `remote.getCurrentWebContents()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

## Méthodes

L'objet `app` dispose des méthodes suivantes :

**Remarque :** Certaines méthodes sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

### `app.quit()`

Essayez de fermer toutes les fenêtres. L’événement `before-quit` sera émis d’abord. Si toutes les fenêtres sont fermées avec succès, l’événement `will-quit` sera émis et mettra fin à l’application par défaut.

Cette méthode garantit que tous les écouteurs d’événements de `beforeunload` et `unload` seront correctement exécutées. Il est possible qu’une fenêtre annule la fermeture en retournant `false` dans l'écouteur d’événement `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (facultatif)

Sort immédiatement avec `exitCode`. `exitCode` est par défaut à 0.

Toutes les fenêtres seront fermées immédiatement sans demander à l'utilisateur, et les événements `before-quit` et `will-quit` ne seront pas émis.

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` String[] - (facultatif)
  * `execPath` String (facultatif)

Relance l’application lorsque l’instance en cours se termine.

Par défaut, la nouvelle instance utilisera le même répertoire de travail et les mêmes arguments de la ligne de commande avec l'instance actuelle. Si `args` est spécifié, `args` sera passé comme argument de ligne de commande à la place. Lorsque `execPath` est spécifié, `execPath` sera exécuté pour redémarrer à la de l’application actuelle.

Notez bien que cette méthode ne ferme pas l'application, vous devez appeler `app.quit` ou `app.exit` après avoir appelé `app.relaunch` pour faire redémarrer votre application.

Quand `app.relaunch` est appelé plusieurs fois, plusieurs instances vont être appelées après que l'instance actuelle soit fermée.

Voici un exemple qui redémarre une nouvelle instance immédiatement en ajoutant un nouvel argument de ligne de commande à la nouvelle instance :

```javascript
const { app } = require('electron') app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) }) app.exit(0)
```

### `app.isReady()`

Retourne `Boolean` - `true` si Electron a fini de s'initialiser, `false` sinon. Voir également `app.whenReady()`.

### `app.whenReady()`

Returns `Promise&lt;void&gt;` - Remplie quand Electron est initialisé. Peut astucieusement remplacer la vérification de `app.isReady()` et l'abonnement à l'événement `ready` si l'application n'est pas encore prête.

### `app.focus([options])`

* `options` Object (optional)
  * `steal` Boolean _macOS_ - Destiner l'action à l'application active même si il s'agit d'une autre application.

Sous Linux, donne le focus à la première fenêtre visible. Sur macOS, fait de l'application l'application active. Sous Windows, donne le focus à la première fenêtre de l'application.

Il vaut mieux utiliser l'option `steal` aussi parcimonieusement que possible.

### `app.hide()` _macOS_

Masque toutes les fenêtres de l'application sans les minimiser.

### `app.show()` _macOS_

Affiche les fenêtres de l'application après qu'elles aient été occultées. Ne leur pas automatiquement le focus. .

### `chemin app.setAppLogsPath([path])`

* `path` String (facultatif) - Un chemin personnalisé pour vos logs. Doit être absolu.

Définit ou crée un répertoire qui peut être manipulé par `app.getPath()` ou `app.setPath(pathName, newPath)`.

Appeler `app. etAppLogsPath()` sans paramètre `path` fera que ce répertoire sera réglé sur `~/Library/Logs/YourAppName` sur _macOS_, et dans le répertoire `userData` sur _Linux_ et _Windows_.

### `app.getAppPath()`

Retourne `String` - Répertoire courant de l'application.

### `app.getPath(name)`

* `name` String - Nom pour lequel vous pouvez demander le chemin nom:
  * `home` Répertoire d'accueil de l'utilisateur.
  * `appData` Répertoire de données par utilisateur de l'application, pointant par défaut sur:
    * `%APPDATA%` sur Windows
    * `$XDG_CONFIG_HOME` ou `~/.config` sur Linux
    * `~/Library/Application Support` sur macOS
  * `userData` Le dossier pour stocker les fichiers de configuration de votre application, qui par défaut est le dossier `appData` avec le nom de votre application.
  * `cache`
  * `temp` Dossier temporaire.
  * `exe` Le fichier exécutable actuel.
  * `module` La bibliothèque de `libchromiumcontent`.
  * `desktop` Le dossier du Bureau de l’utilisateur actuel.
  * `documents` Dossier "Mes Documents" d'un utilisateur.
  * `downloads` Dossier pour les téléchargements de l’utilisateur.
  * `music` Dossier de musique de l’utilisateur.
  * `pictures` Dossier des images de l’utilisateur.
  * `videos` Dossier des vidéos de l’utilisateur.
  * `recent` Dossier des fichiers récents de l'utilisateur (Windows seulement).
  * `logs` Répertoire du dossier de log de votre application.
  * `crashDumps` Dossier où les rapports d'incidents sont stockés.

Retourne `String` - Un chemin vers le répertoire spécial ou le fichier associé à `nom`. On failure, an `Error` is thrown.

Si `app.getPath('logs')` est appelé sans que `app.setAppLogsPath()` soit appelé en premier, un répertoire de logs par défaut sera créé équivalent à un appel `app.setAppLogsPath()` sans paramètre `path`.

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 sur _Linux_, 32x32 sur _Windows_, non pris en charge sur _macOS_.

Retourne `Promise<NativeImage>` - rempli avec l'icône de l'application, qui est une [NativeImage](native-image.md).

Récupère une icône associée à un chemin.

Sous _Windows_, il y a 2 sortes d’icônes :

* Icônes associées à certaines extensions de fichier, comme `.mp3`, `.png`, etc.
* Icônes à l’intérieur du fichier lui-même, comme les `.exe`, `.dll`, `.ico`.

Sur _Linux_ et _macOS_, les icônes dépendent de l'application associée au type Mime de fichier.

### `app.setPath(name, path)`

* `name` String
* `path` String

Remplace le chemin `path` par un répertoire spécial ou un fichier associé à `name`. Si le chemin spécifie un répertoire qui n'existe pas, une `Erreur` est levée. Dans ce cas, le répertoire doit être créé avec `fs.mkdirSync` ou similaire.

Vous pouvez remplacer uniquement les chemins d’un `name` défini dans `app.getPath`.

Par défaut, les cookies et la cache des pages web seront stockés dans le répertoire `userData`. Si vous voulez changer cet emplacement, vous devez remplacer le chemin `userData` avant que l'événement `ready` du module `app` soit émis.

### `app.getVersion()`

Retourne `String` - La version de l'application chargée. Si aucune version n'est trouvée dans le fichier `package.json` de l'application, la version du bundle courant ou de l'exécutable est renvoyée.

### `app.getName()`

Retourne `String` - Le nom de l'application, qui est écrit dans le fichier `package.json` .

Habituellement, le champ `name` de `package.json` est un nom court en minuscule, selon la spécification des modules npm. Vous devriez dans la plupart des cas renseigner également un champ `productName`, qui contient le nom complet et capitalisé de votre application, et qui sera préféré à `name` par Electron.

### `app.setName(name)`

* `name` String

Remplace le nom de l'application actuelle.

**Note:** Cette fonction remplace le nom utilisé en interne par Electron; elle n'affecte pas le nom que l'OS utilise.

### `app.getLocale()`

Renvoie `String` - Les paramètres régionaux actuels de l'application, récupérés à l'aide de la librairie `l10n_util` de Chromium. Les valeurs de retour possibles sont documentées [ici](https://source.chromium.org/chromium/chromium/src/+/master:ui/base/l10n/l10n_util.cc).

Pour définir la localisation, utilisez un paramètre de ligne de commande au démarrage de l'application, que vous trouverez [ici](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md).

**Remarque :** À la distribution de votre application empaquetée, vous devrez également inclure le dossier `locales`.

**Remarque :** Sous Windows, vous devez l'appeler après que les événements `prêts` soient émis.

### `app.getLocaleCountryCode()`

Retourne `String` - Les deux lettres de la locale du système d'exploitation de l'utilisateur selon le codage [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) . La valeur est tirée des API natives d'OS.

**Note:** Quand il est impossible de détecter le code du pays de la localisation, il renvoie une chaîne vide.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Ajoute le `path` à la liste des documents récents.

Cette liste est gérée par l'OS. Cette liste est gérée par l'Os. Sous Windows, vous pouvez scruter la liste à partir de la barre des tâches et sur macOS à partir du menu du dock.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Efface la liste des documents récents.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`. Par exemple, si vous souhaitez que votre application gère les liens `electron://`, appelez cette méthode avec `electron` comme paramètre.
* `path` String (facultatif) _Windows_ -Chemin vers l'exécutable d'Electron. Par défaut `process.execPath`
* `args` String[] (facultatif) _Windows_ - Arguments transmis à l'exécutable. Par défaut, un tableau vide

Returns `Boolean` - Si l'appel a réussi.

Définit l'exécutable courant comme gestionnaire par défaut pour un protocole (alias le schéma URI). Il vous permet d'intégrer votre application plus profondément dans le système d'exploitation. Une fois enregistré, tous les liens avec `votre-protocole://` seront ouverts avec l'exécutable courant. L'ensemble du lien, y compris le protocole, sera transmis à votre application comme paramètre.

**Remarque:** Sur macOS, vous ne pouvez enregistrer que les protocoles qui ont été ajoutés à votre application `info.plist`, qui ne peut pas être modifié au moment de l'exécution. Cependant, vous pouvez changer le fichier pendant la construction via [Electron Forge][electron-forge], [Electron Packager][electron-packager], ou en modifiant `info.plist` avec un éditeur de texte. Veuillez vous référer à la [documentation d'Apple][CFBundleURLTypes] pour plus de détails.

**Remarque :** Dans un environnement Windows Store (lorsque empaqueté en tant qu'`appx`) cette API retournera `true` pour tous les appels, mais la clé de registre qu'elle définit ne sera pas accessible par d'autres applications.  Afin d'enregistrer votre application Windows Store comme gestionnaire de protocole par défaut, vous devez [déclarer le protocole dans votre manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

L'API utilise le registre Windows et `LSSetDefaultHandlerForURLScheme` en interne.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`.
* `path` String (facultatif) _Windows_ - `process.execPath` par défaut
* `args` String[] (facultatif) _Windows_ - Un tableau vide par défaut

Returns `Boolean` - Si l'appel a réussi.

Cette méthode vérifie si l'exécutable courant est le gestionnaire par défaut pour un protocole (aka le schéma URI). Si c'est le cas, cela supprimera l'application comme gestionnaire par défaut.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`.
* `path` String (facultatif) _Windows_ - `process.execPath` par défaut
* `args` String[] (facultatif) _Windows_ - Un tableau vide par défaut

Retourne `Boolean` - Si l'exécutable actuel et le gestionnaire par défaut d'un protocole (schéma URI).

**Remarque:** Sur macOS, vous pouvez utiliser cette méthode pour vérifier si l'application a bien été enregistré comme gestionnaire de protocole par défaut pour un protocole. Vous pouvez également confirmer cela en vérifiant `~/Library/Preferences/com.apple.LaunchServices.plist` sur votre machine macOS. Veuillez vous référer à la [documentation d'Apple][LSCopyDefaultHandlerForURLScheme] pour plus de détails.

L'API utilise le registre Windows et `LSCopyDefaultHandlerForURLScheme` en interne.

### `app.getApplicationNameForProtocol(url)`

* `url` String - une URL avec le nom du protocole à vérifier. Contrairement aux autre méthodes de cette famille, celle-ci accepte un URL en entier, y compris `://` au minimum (par exemple : `https://`).

Retourne `String` - Nom de l'application qui gère le protocole, ou un <0>String</0> vide s'il n'y a pas de gestionnaire. Par exemple, si Electron est le gestionnaire par défaut de l'URL, il pourrait s'agit de `Electron` sur Windows et Mac. Par contre, ne vous fiez pas au format précis qui ne garantit pas de ne pas changer. Attendez-vous à un format différent sur Linux, probablement avec un préfixe `.desktop`.

Cette méthode retourne le nom de l'application du gestionnaire par défaut pour le protocole d'une URL (schéma d'URI).

### `app.getApplicationInfoForProtocol(url)` _macOS_ _Windows_

* `url` String - une URL avec le nom du protocole à vérifier. Contrairement aux autre méthodes de cette famille, celle-ci accepte un URL en entier, y compris `://` au minimum (par exemple : `https://`).

Retourne `Promise<Object>` - Résoudre avec un objet contenant les éléments suivants :

* `icon` NativeImage - the display icon of the app handling the protocol.
* `path` String  - installation path of the app handling the protocol.
* `name` String - display name of the app handling the protocol.

This method returns a promise that contains the application name, icon and path of the default handler for the protocol (aka URI scheme) of a URL.

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Tableau d'objets `Task`

Ajoute `tâches` à la catégorie [Tâches][tasks] de la liste de sauts sur Windows.

`tasks` est un tableau d’objets [`Task`](structures/task.md).

Returns `Boolean` - Si l'appel a réussi.

**Remarque :** Si vous souhaitez personnaliser encore plus la JumpList, utilisez `app.setJumpList(categories)` à la place.

### `app.getJumpListSettings()` _Windows_

Retourne `Object`:

* `minItems` Integer - Le nombre minimum d'éléments qui seront affichés dans la JumpList (pour une description plus détaillée de cette valeur, voir les [documentations MSDN][JumpListBeginListMSDN]).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Tableau des objets `JumpListItem` qui correspondent aux éléments que l'utilisateur a explicitement retirés des catégories personnalisées dans la liste de saut de . Ces éléments ne doivent pas être ajoutés de nouveau à la JumpList dans l'appel **suivant** à `app.setJumpList()`, Windows n'affichera aucune catégorie personnalisée qui contient les éléments supprimés.

### `app.setJumpList(categories)` _Windows_

* `catégories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Tableau d'objets `JumpListCategory`.

Définit ou supprime une JumpList personnalisée pour l'application et renvoie l'une des chaînes de caractères suivantes :

* `ok` - Tout s'est bien passé.
* `error` - Une ou plusieurs erreurs se sont produites, activez la journalisation de la durée d'exécution pour déterminer la cause probable.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - Tentative d'ajout d'un lien de fichier dans la JumpList pour un type de fichier que l'application n'est pas enregistrée pour gérer.
* `customCategoryAccessDeniedError` - Les catégories personnalisées ne peuvent pas être ajoutées à la JumpList en raison de la confidentialité de l'utilisateur ou des paramètres de politique de groupe.

Si `cetagories` est `null`, la JumpList personnalisée précédemment définie (si existante) sera remplacée par la JumpList standard de l'application (gérée par Windows).

**Remarque :** Si un objet `JumpListCategory` n'a ni de `type` ni de propriété `name` définie le `type` est donc supposé être `tasks`. Si la propriété `name` est définie mais que le `type` est omis, alors le `type` est assumé être `custom`.

**Remarque :** Les utilisateurs peuvent supprimer des éléments des catégories personnalisées, et Windows n'autorisera pas l'ajout d'un élément supprimé dans une catégorie personnalisée avant le **prochain** appel réussi à `app.setJumpList(categories)`. Toute tentative de réajouter un élément supprimé à une catégorie personnalisée plus tôt, cela entraînera l'omission de toute la catégorie personnalisée dans la JumpList. La liste des éléments supprimés peut être obtenue à l'aide de `app.getJumpListSettings()`.

**Note:** The maximum length of a Jump List item's `description` property is 260 characters. Beyond this limit, the item will not be added to the Jump List, nor will it be displayed.

Voici un exemple très simple de la création d'une JumpList personnalisé :

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.request SingleInstanceLock()`

Retourne `Boolean`

La valeur renvoyée par cette méthode indique si cette instance de votre application a obtenu le verrou ou non.  S'il n'a pas réussi à obtenir le verrou vous pouvez supposer qu'une autre instance de votre application est déjà en cours d'exécution avec le verrou et quitter immédiatement.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  Elle renvoie `false` si votre process devrait quitter immédiatement, puisqu'il a envoyé ses paramètres à une instance qui possède déjà le verrou.

Sur macOS, le système impose automatiquement une instance unique lorsque les utilisateurs essaient d'ouvrir une seconde instance de votre application dans Finder, et les événements `open-file` et `open-url` seront émis pour cela. Cependant, lorsque les utilisateurs démarrent votre application en ligne de commande , le mécanisme d'instance unique du système sera contourné, et vous devez utiliser cette méthode pour assurer une seule instance.

Un exemple d'activation de la fenêtre de l'instance primaire lorsqu'une seconde instance démarre :

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Quelqu'un a tenté d'exécuter une seconde instance. Nous devrions focus la fenêtre.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Créer myWindow, charger le reste de l'app, etc...
  app.whenReady().then(() => {
    myWindow = createWindow()
  })
}
```

### `app.hasSingleInstanceLock()`

Retourne `Boolean`

Cette méthode retourne un booléen indiquant si cette instance de votre application détient actuellement le verrou d'instance unique.  Vous pouvez demander le verrou avec `app.requestSingleInstanceLock()` et le débloquer avec `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`][activity-type].
* `userInfo` n'importe quel - état spécifique à l'application à stocker pour utilisation par un autre appareil.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. Le schéma doit être `http` ou `https`.

Créée un `NSUserActivity` et le défini en tant qu'activité courante. Après cela, l'activité devient éligible à la fonction [Handoff][handoff] sur l'autre périphérique.

### `app.getCurrentActivityType()` _macOS_

Retourne `String` - le type de l’activité en cours d’exécution.

### `app.invalidateCurrentActivity()` _macOS_

Invalide l'activité [Handoff][handoff] courante de l'utilisateur.

### `app.resignCurrentActivity()` _macOS_

Marque l'activité actuelle de l'utilisateur [Handoff][handoff] comme inactive sans l'invalider.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`][activity-type].
* `userInfo` n'importe quel - état spécifique à l'application à stocker pour utilisation par un autre appareil.

Modifie l'activité en cours si son type correspond à `type`, en fusionnant les entrées de `userInfo` dans son dictionnaire `userInfo` courant.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

Change le [Application User Model ID][app-user-model-id] à `id`.

### `app.setActivationPolicy(policy)` _macOS_

* `policy` String - Can be 'regular', 'accessory', or 'prohibited'.

Sets the activation policy for a given app.

Activation policy types:

* 'regular' - The application is an ordinary app that appears in the Dock and may have a user interface.
* 'accessory' - The application doesn’t appear in the Dock and doesn’t have a menu bar, but it may be activated programmatically or by clicking on one of its windows.
* 'prohibited' - The application doesn’t appear in the Dock and may not create windows or be activated.

### `app.importCertificate(options, callback)` _Linux_

* Objet `options`
  * `certificate` String - Chemin pour le fichier pkcs12.
  * `password` String - La Passphrase pour le certificat.
* `callback` Function
  * `result` Integer - Résultat de l'importation.

Importe le certificat au format pkcs12 dans l'entrepôt de certificats de la plateforme. `callback` est appelé avec le retour `result` de l'opération d'import, une valeur `0` indique un succès alors que toute autre valeur signale un problème, telle que décrite par la [net_error_list](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h) de Chromium.

### `app.disableHardwareAcceleration()`

Désactive l'accélération matérielle pour l'application courante.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. Cette fonction désactive ce comportement.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.getAppMetrics()`

Retourne [`ProcessMetric[]`](structures/process-metric.md) : Tableau d'objets `ProcessMetric` correspondant aux statistiques d'utilisation de la mémoire et du processeur de tous les processus associés à l'application.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - L'état des fonctions graphiques de `chrome://gpu/`.

**Remarque :** Cette information n'est utilisable qu'après l'émission de l'événement `gpu-info-update`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Peut être `basique` ou `complete`.

Retourne `Promise<unknown>`

Si `infoType` vaut `complete` : La Promise est remplie avec `Object` contenant toutes les informations sur le GPU, comme pour [l'objet GPUInfo de Chromium](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). Cela inclut les informations de version et driver montrées sur la page `chrome://gpu`.

Si `infoType` vaut `basic` : La Promise est remplie avec `Object` contenant moins d'attributs que si l'on utilise `complete`. Voilà un exemple de réponse basique :

```js
{
  auxAttributes:
   {
     amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0
   },
  gpuDevice:
   [{ active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 }],
  machineModelName: 'MacBookPro',
  machineModelVersion: '11.5'
}
```

`basic` devrait être priorisé si vous n'avez besoin que d'informations basiques telles que `vendorId` ou `driverId`.

### `app.setBadgeCount([count])` _Linux_ _macOS_

* `count` Integer (optional) - If a value is provided, set the badge to the provided value otherwise, on macOS, display a plain white dot (e.g. unknown number of notifications). Sous Linux, si aucune valeur n'est fournie, le badge ne s'affichera pas.

Returns `Boolean` - Si l'appel a réussi.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

Sur macOS, il s'affiche sur l'icône du dock. Sous Linux, il ne fonctionne que pour le lanceur Unity.

**Note :** le launcher Unity requiert la présence d'un fichier `.desktop` pour fonctionner, pour de plus amples informations, lisez le document [Intégration de l'environnement de bureau][unity-requirement].

### `app.getBadgeCount()` _Linux_ _macOS_

Retourne `Integer` - La valeur actuelle affichée sur le badge du compteur.

### `app.isUnityRunning()` _Linux_

Retourne `Boolean` - Si l'environnement de bureau actuel est Unity launcher.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Par défaut `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Par défaut, un tableau vide.

Si vous avez fourni des options `path` et `args` à `app.setLoginItemSettings`, vous devez passer les mêmes arguments ici pour que `openAtLogin` soit défini correctement.

Retourne `Object`:

* `openAtLogin` Boolean - `true` si l'application est configurée pour démarrer à l'ouverture de session.
* `openAsHidden` Boolean _macOS_ - `true` si l'application est configurée pour s'ouvrir comme cachée à l'ouverture de session. Ce paramètre n'est pas disponible sur les [MAS builds][mas-builds].
* `wasOpenedAtLogin` Boolean _macOS_ - `true` si l'application est automatiquement ouverte à l'ouverture de session. Ce paramètre n'est pas disponible sur les [MAS builds][mas-builds].
* `wasOpenedAsHidden` Boolean _macOS_ - `true` si l'application est ouverte comme un programme caché à l'ouverture de session. Cela indique que l'application ne devrait pas ouvrir la moindre fenêtre au démarrage. Ce paramètre n'est pas disponible sur les [MAS builds][mas-builds].
* `restoreState` Boolean _macOS_ - `true` si l'application est ouverte comme un programme qui devrait restaurer l'état de la session précédente à l'ouverture de session. Cela indique que l'application devrait restaurer les fenêtres qui étaient ouvertes lorsque celle-ci a été précédemment fermée. Ce paramètre n'est pas disponible sur les [MAS builds][mas-builds].
* `executableWillLaunchAtLogin` Boolean _Windows_ - `true` if app is set to open at login and its run key is not deactivated. This differs from `openAtLogin` as it ignores the `args` option, this property will be true if the given executable would be launched at login with **any** arguments.
* `launchItems` Object[] _Windows_
  * `name` String _Windows_ - name value of a registry entry.
  * `path` String _Windows_ - The executable to an app that corresponds to a registry entry.
  * `args` String[] _Windows_ - the command-line arguments to pass to the executable.
  * `scope` String _Windows_ - one of `user` or `machine`. Indicates whether the registry entry is under `HKEY_CURRENT USER` or `HKEY_LOCAL_MACHINE`.
  * `enabled` Boolean _Windows_ - `true` if the app registry key is startup approved and therefore shows as `enabled` in Task Manager and Windows settings.

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Par défaut, `faux`.
  * `openAsHidden` Boolean (facultatif) _macOS_ - `true` pour ouvrir l’application comme cachée. `false` par défaut. L'utilisateur peut éditer ce paramètre depuis les Préférences Système, alors `app.getLoginItemSettings().wasOpenedAsHidden` va être vérifié lorsque l'app sera ouverte pour connaître la valeur actuelle. Ce paramètre n'est pas disponible sur les [MAS builds][mas-builds].
  * `path` String (optional) _Windows_ - The executable to launch at login. Par défaut `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Par défaut, un tableau vide. Take care to wrap paths in quotes.
  * `enabled` Boolean (optional) _Windows_ - `true` will change the startup approved registry key and `enable / disable` the App in Task Manager and Windows Settings. Par défaut, `true`.
  * `name` String (optional) _Windows_ - value name to write into registry. Defaults to the app's AppUserModelId(). Configurer les paramètres de l'application lors de l'ouverture de session.

Pour fonctionner avec `autoUpdater` d'Electron sur Windows, qui utilise [Squirrel][Squirrel-Windows], vous aurez besoin de configurer le chemin de démarrage de Update.exe et de lui passer les arguments qui définissent le nom de votre application. Par exemple :

``` javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Retourne `Boolean` - `true` si le support des fonctionnalités d'accessibilité de Chrome est activé, `false` sinon. Cette API retournera `true` si les technologies d'assistance, comme les lecteurs d'écran, sont détectées. Voir https://www.chromium.org/developers/design-documents/accessibility pour de plus amples informations.

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Active ou désactive le rendu de [l'arbre d'accessibilité](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Active manuellement le support de l'accessibilité de Chrome, permettant de mettre à disposition des utilisateurs les commutateurs d'accessibilité dans les paramètres de l'application. Consultez les [documents d'accessibilité de Chromium](https://www.chromium.org/developers/design-documents/accessibility) pour plus de détails. Désactivé par défaut.

Cette API doit être appelée après l'émission de l'événement `ready` .

**Note:** Rendering accessibility tree can significantly affect the performance of your app. Il ne doit pas être activé par défaut.

### `app.showAboutPanel()`

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)`

* Objet `options`
  * `applicationName` String (optional) - Nom de l'application.
  * `applicationVersion` String (optional) - Version de l'application.
  * `copyright` String (optional) - Information copyright.
  * `version` String (facultatif) _macOS_ - Le numéro de version de l'application.
  * `crédits` String (facultatif) _macOS_ _Windows_ - Crédits.
  * `auteurs` String[] (facultatif) _Linux_ - Liste des auteurs d'applications.
  * `site web` String (facultatif) _Linux_ - Le site web de l'application.
  * `iconPath` String (optional) _Linux_ _Windows_ - Path to the app's icon in a JPEG or PNG file format. Sous Linux, sera affiché en 64x64 pixels tout en conservant le ratio.

Configure les options de la fenêtre À propos de. This will override the values defined in the app's `.plist` file on macOS. Voir [la documentation Apple][about-panel-options] pour de plus amples informations. Sous Linux, les valeurs doivent être définies pour être affichées ; il n'y a pas de valeurs par défaut.

Si vous ne définissez pas `credits<0> mais vous souhaitez quand même les afficher dans votre app, AppKit cherchera un fichier nommé "Credits.html", "Credits.rtf", et "Credits.rtfd", dans cet ordre, dans le bundle retourné par la méthode la classe main de NSBundle. Le premier fichier trouvé est utilisé, et si aucun n'est trouvé, la zone info est laissée vide. Consultez la <a href="https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc">documentation</a> Apple pour plus d'informations.</p>

<h3 spaces-before="0"><code>app.isEmojiPanelSupported()`</h3>

Retourne `Boolean` - que la version actuelle de l'OS autorise ou non les sélecteurs natifs d'émojis.

### `app.showEmojiPanel()` _macOS_ _Windows_

Montrer le sélecteur d'émoji natif de la plateforme.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _mas_

* `bookmarkData` String - Les données de marque-page encodées en base64 renvoyées par les méthodes `dialog.showOpenDialog` où `dialog.showSaveDialog`.

Retourne `Fonction` - Cette fonction **doit** être appelée une fois que vous avez fini d'accéder au fichier de sécurité utilisé. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Commence à accéder au fichier.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

Commencez à accéder à une ressource périmée de sécurité. Avec cette méthode, les applications Electron qui sont empaquetées pour le Mac App Store peuvent atteindre en dehors de leur sandbox pour accéder aux fichiers choisis par l'utilisateur. Voir la documentation de [Apple](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) pour une description du fonctionnement de ce système.

### `app.enableSandbox()`

Active le mode "full sandbox" dans l'application. This means that all renderers will be launched sandboxed, regardless of the value of the `sandbox` flag in WebPreferences.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` _macOS_

* `options` Object (optional)
  * `conflictHandler` Function\<Boolean> (optional) - A handler for potential conflict in move failure.
    * `conflictType` String - Le type de conflit de déplacement rencontré par le gestionnaire ; peut être `exists` ou `existsAndRunning`, où `existe` signifie qu'une application du même nom est présente dans le répertoire Applications et `existsAndRunning` signifie à la fois qu'elle existe et qu'elle est actuellement en cours d'exécution.

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** Cette méthode renvoie des erreurs si quelque chose d'autre qu'une erreur utilisateur fait échouer le déplacement. Par exemple, si l'utilisateur annule la boîte de dialogue d'autorisation, cette méthode renvoie false. Si nous ne réussissons pas à effectuer la copie, alors cette méthode lancera une erreur. Le message contenu dans l'erreur devrait être suffisamment informatif pour que vous puissiez déterminer précisément quel est le problème.

Par défaut, si une application du même nom que celle qui a été déplacée existe dans le répertoire Applications et est _pas_ en cours d'exécution, l'application existante sera mise à la corbeille et l'application active sera déplacée à sa place. If it _is_ running, the pre-existing running app will assume focus and the previously active app will quit itself. Ce comportement peut être modifié en fournissant le gestionnaire de conflits facultatif, où le booléen retourné par le gestionnaire détermine si le conflit de déplacement est résolu avec le comportement par défaut.  c'est-à-dire que retourner `false` ne garantira aucune action supplémentaire, retourner `true` entraînera le comportement par défaut et la méthode continuera.

Par exemple :

```js
app.moveToApplicationsFolder({
  ConftHandler: (conflictType) => {
    if (conflictType === 'exiss') {
      dialogue de retour. howMessageBoxSync({
        type: 'question',
        boutons: ['Halter le déplacement', 'Continuer le déplacement'],
        defaultId: 0,
        message : 'Une application de ce nom existe déjà'
      }) === 1
    }
  }
})
```

Cela signifierait que si une application existe déjà dans le répertoire de l'utilisateur, si l'utilisateur choisit de "Continuer le déplacement", alors la fonction continuera avec son comportement par défaut et l'application existante sera mise à la corbeille et l'application active sera déplacée à sa place.

### `app.isSecureKeyboardEntryEnabled()` _macOS_

Returns `Boolean` - whether `Secure Keyboard Entry` is enabled.

Par défaut cette API retournera `false`.

### `app.setSecureKeyboardEntryEnabled(enabled)` _macOS_

* `enabled` Boolean - Enable or disable `Secure Keyboard Entry`

Set the `Secure Keyboard Entry` is enabled in your application.

By using this API, important information such as password and other sensitive information can be prevented from being intercepted by other processes.

See [Apple's documentation](https://developer.apple.com/library/archive/technotes/tn2150/_index.html) for more details.

**Note:** Enable `Secure Keyboard Entry` only when it is needed and disable it when it is no longer needed.

## Propriétés

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

Une propriété `Booléen` qui est `vraie` si le support d'accessibilité de Chrome est activé, `faux` sinon. Cette propriété sera `true` si l'utilisation de technologies d'assistance, telles que les lecteurs d'écran, a été détectée. Définir cette propriété à `true` active manuellement la prise en charge de l'accessibilité de Chrome, permettant aux développeurs d'exposer le basculement d'accessibilité aux utilisateurs dans les paramètres de l'application.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Désactivé par défaut.

Cette API doit être appelée après l'émission de l'événement `ready` .

**Note:** Rendering accessibility tree can significantly affect the performance of your app. Il ne doit pas être activé par défaut.

### `app.applicationMenu`

Une propriété `Menu | null` qui renvoie [`Menu`](menu.md) si on a été défini et `null` autrement. Les utilisateurs peuvent passer un [Menu](menu.md) pour définir cette propriété.

### `app.badgeCount` _Linux_ _macOS_

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

**Note :** le launcher Unity requiert la présence d'un fichier `.desktop` pour fonctionner, pour de plus amples informations, lisez le document [Intégration de l'environnement de bureau][unity-requirement].

**Note:** On macOS, you need to ensure that your application has the permission to display notifications for this property to take effect.

### `app.commandLine` _Readonly_

Un objet [`CommandLine`](./command-line.md) qui vous permet de lire et de manipuler les arguments de ligne de commande que Chromium utilise.

### `app.dock` _macOS_ _Readonly_

A [`Dock`](./dock.md) `| undefined` object that allows you to perform actions on your app icon in the user's dock on macOS.

### `app.isPackaged` _Readonly_

Une propriété `Boolean` qui renvoie `true` si l'application est packagée, `false` sinon. Pour de nombreuses applications, cette propriété peut être utilisée pour distinguer les environnements de développement et de production.

### `nom de l'application`

Une propriété `String` qui indique le nom de l'application courante, qui est le nom dans le fichier `package.json` de l'application.

Habituellement, le champ `name` de `package.json` est un nom court en minuscule, selon la spécification des modules npm. Vous devriez dans la plupart des cas renseigner également un champ `productName`, qui contient le nom complet et capitalisé de votre application, et qui sera préféré à `name` par Electron.

### `format@@0 app.userAgentFallback`

Une `String` qui est la chaîne d'agent utilisateur que Electron utilisera comme solution de repli global.

C'est l'agent utilisateur qui sera utilisé quand aucun agent utilisateur n'est défini au niveau `webContents` ou `session`.  Il est utile pour s'assurer que l'ensemble de votre application a le même agent utilisateur.  Définissez une valeur personnalisée dès que possible dans l'initialisation de votre application pour vous assurer que votre valeur remplacée est utilisée.

### `allowRenderererProcessRuse`

Un `Booléen` qui, lorsque `true` désactive les remplacements qu'Electron a en place pour s'assurer que les processus de rendu sont redémarrés à chaque navigation.  The current default value for this property is `true`.

L'intention est que ces dérogations soient désactivées par défaut, puis à un point dans le futur cette propriété sera supprimée.  Cette propriété impacte les modules natifs que vous pouvez utiliser dans le processus de rendu.  Pour plus d'informations sur la direction vers laquelle Electron va avec le redémarrage du processus de rendu et l'utilisation de modules natifs dans le processus de rendu veuillez consulter ce [Problème de suivi](https://github.com/electron/electron/issues/18397).

### `app.runningUnderRosettaTranslation` _macOS_ _Readonly_

A `Boolean` which when `true` indicates that the app is currently running under the [Rosetta Translator Environment](https://en.wikipedia.org/wiki/Rosetta_(software)).

You can use this property to prompt users to download the arm64 version of your application when they are running the x64 version under Rosetta incorrectly.

[tasks]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[LSCopyDefaultHandlerForURLScheme]: https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[activity-type]: https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType
[unity-requirement]: ../tutorial/desktop-environment-integration.md#unity-launcher
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[JumpListBeginListMSDN]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx
[about-panel-options]: https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc
