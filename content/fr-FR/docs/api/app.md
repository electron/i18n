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

* `launchInfo` inconnu *macOS*

Émis lorsqu'Electron a terminé l’initialisation. Sur macOs, `launchInfo` détient le `userInfo` de `NSUserNotification` qui a été utilisé pour ouvrir l'application si elle a été lancée depuis le centre de notification. Vous pouvez appeler `app.isReady()` pour vérifier si cet événement a déjà été déclenché.

### Événement : 'window-all-closed'

Émis lorsque toutes les fenêtres ont été fermées.

Si vous n'être pas abonné à cet événement et que toutes les fenêtres sont fermées, le comportement par défaut consiste à quitter l'application. Toutefois, si vous vous abonnez, vous pouvez contrôler le fait que l'application se ferme ou non. Si l'utilisateur appuie sur `Cmd + Q`, ou le développeur appelle `app.quit()`, Electron essaie d'abord de fermer toutes les fenêtres et puis émet l'événement `will-quit` et dans ce cas, l'événement `window-all-closed` ne sera pas émis.

### Événement : 'before-quit'

Renvoie :

* `event` Événement

Émis avant que l'application ne commence à fermer ses fenêtres. Appeler `event.preventDefault()` empêchera le comportement par défaut, qui est de terminer l'application.

**Remarque :** Si l'application a été quittée par `autoUpdater.quitAndInstall()`, puis `before-quit` est émise *après* émettant un événement `close` sur toutes les fenêtres et les fermant.

**Note:** Sous Windows, cet événement ne sera pas émit si l'application est fermée à cause d'un extinction du système/re-démarrage ou une déconnexion de l'utilisateur.

### Événement : 'will-quit'

Retourne :

* `event` Événement

Émis quand toutes les fenêtres ont été fermées et que l'application va se fermer. Appeler `event.prevendDefault()` permet de stopper le comportement par défaut, qui quitte l'application.

Consultez la description de l’événement `window-all-closed` pour voir les différences entre les événements `will-quit` et `window-all-closed`.

**Note:** Sous Windows, cet événement ne sera pas émit si l'application est fermée à cause d'un extinction du système/re-démarrage ou une déconnexion de l'utilisateur.

### Événement : 'quit'

Retourne :

* `event` Event
* `exitCode` Integer

Émis lorsque l'application se quitte.

**Note:** Sous Windows, cet événement ne sera pas émit si l'application est fermée à cause d'un extinction du système/re-démarrage ou une déconnexion de l'utilisateur.

### Événement : 'open-file' *macOS*

Retourne :

* `event` Événement
* `path` String

Émis lorsque l’utilisateur souhaite ouvrir un fichier avec l’application. L’événement `open-file` est habituellement émis lorsque l’application est déjà ouvert et le système d’exploitation souhaite réutiliser l’application pour ouvrir le fichier. `open-file` est également émis lorsqu’un fichier est déposé sur le dock et l’application n’est pas encore en cours d’exécution. Assurez-vous d’écouter l’événement `open-file` très tôt dans le démarrage votre l’application pour gérer ce cas (même avant que l’événement `ready` soit émis).

Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

Sur Windows, vous devrez analyser `process.argv` (dans le main process) pour obtenir le chemin d'accès.

### Événement : 'open-url' *macOS*

Retourne :

* `event` Événement
* `url` String

Émis lorsque l’utilisateur souhaite ouvrir une URL avec l’application. Le fichier de votre application `Info.plist` doit définir le schéma d'URL dans la touche `CFBundleURLTypes` et définir `NSPrincipalClass` à `AtomApplication`.

Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

### Événement : 'activate' *macOS*

Retourne :

* `event` Événement
* `hasVisibleWindows` Boolean

Émis lorsque l'application est activée. Différentes actions peuvent déclencher cet événement, comme le lancement de l’application pour la première fois, essayer de relancer l’application lorsqu’elle est déjà en cours d’exécution, ou en cliquant sur l'icône du dock de l’application ou de l’icône de la barre des tâches.

### Événement : 'continue-activity' *macOS*

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` inconnu - Contient l'état spécifique de l'application stocké par l'activité sur un autre appareil.

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quand une activité depuis un périphérique différent veut reprendre. Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

Une activité d'utilisateur peut être poursuivie seulement dans une application qui a le même identifiant d'équipe développeur que l'application d'origine de la source d'activité et qui prend en charge le type d'activité. La prise en charge d’activité types est spécifiée dans le `Info.plist` de l'application sous la clé `NSUserActivityType`.

### Événement: 'wil-continue-activity' *macOS*

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quand une activité depuis un périphérique différent veut reprendre. Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

### Événement : 'continue-activity-error' *macOS*

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Une chaîne de caractères avec la description localisée de l'erreur.

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quand une activité depuis un périphérique différent n'arrive pas à reprendre.

### Événement : 'activity-was-continued' *macOS*

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` inconnu - Contient l'état spécifique de l'application stocké par l'activité.

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)après qu'une activité depuis un périphérique différent a bien repris.

### Événement : 'update-activity-state' *macOS*

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` inconnu - Contient l'état spécifique de l'application stocké par l'activité.

Émis lorsque la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) va être repris par un autre appareil. Si vous avez besoin de mettre à jour l'état à transférer, vous devez appeler `event.preventDefault()` immédiatement, construire un nouveau dictionnaire `userInfo` et appeler `app.updateCurrentActiviy()` en suivant. Sinon, l'opération échouera et `continue-activity-error` sera appelée.

### Événement : 'new-window-for-tab' *macOS*

Retourne :

* `event` Événement

Émis lorsque l’utilisateur clique sur le bouton nouvel onglet native macOS. Le bouton nouvel onglet n’est visible que si l'actuel `BrowserWindow` a un `tabbingIdentifier`

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

* `event` Event
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
* `description de la réponse à l'authentification` Objet 
  * `url` URL
* `authInfo` Objet 
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

### Événement : 'gpu-process-crashed'

Retourne :

* `event` Event
* `killed` Boolean

Émis lorsque le processus GPU plante ou est tué.

### Événement : 'renderer-process-crashed'

Retourne :

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Émis lorsque le processus de rendu de `webContents` plante ou est tué.

### Événement : 'accessibility-support-changed' *macOS* *Windows*

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

* `event` Event
* `argv` String[] - un tableau d’arguments de la deuxième instance de la ligne de commande
* `workingDirectory` String - Le répertoire de travail de la deuxième instance

Cet événement sera émis dans l'instance principale de votre application quand une seconde instance a été exécutée et appelle `app.requestSingleInstanceLock()`.

`argv` est un tableau des arguments de la ligne de commande de la seconde instance, et `workingDirectory` est son répertoire de travail actuel. Les applications répondent habituellement à cela en faisant de leur fenêtre principale, une fenêtre centrée et non réduite au minimum.

Cet évènement est garanti d'être émis après que l'évènement `ready` de `app` soit émis.

**Remarque :** Des arguments supplémentaires en ligne de commande peuvent être ajoutés par Chromium, tels que `--original-process-start-time`.

### Événement : 'desktop-capturer-get-sources'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)

Émis lorsque `desktopCapturer.getSources()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` le fera retourner des sources vides.

### Événement : 'remote-require'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `module` String

Émis lorsque `remote.require()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Évènement : 'remote-get-global'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Émis lorsque `remote.getGlobal()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Événement : 'remote-get-builtin'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `module` String

Émis lorsque `remote.getBuiltin()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Événement : 'remote-get-current-window'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)

Émis lorsque `remote.getCurrentWindow()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Événement : 'remote-get-current-web-contents'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)

Émis lorsque `remote.getCurrentWebContents()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

### Événement : 'remote-get-guest-web-contents'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Émis lorsque `<webview>.getWebContents()` est appelé dans le processus de rendu de `webContents`. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

## Méthodes

L'objet `app` dispose des méthodes suivantes :

**Remarque :** Certaines méthodes sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

### `app.quit()`

Essayez de fermer toutes les fenêtres. L’événement `before-quit` sera émis d’abord. Si toutes les fenêtres sont fermées avec succès, l’événement `will-quit` sera émis et mettra fin à l’application par défaut.

Cette méthode garantit que tous les écouteurs d’événements de `beforeunload` et `unload` seront correctement exécutées. Il est possible qu’une fenêtre annule la fermeture en retournant `false` dans l'écouteur d’événement `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (facultatif)

Termine immédiatement avec `exitCode`. `exitCode` par défaut vaut 0.

Toutes les fenêtres seront fermées immédiatement sans demander à l'utilisateur, et les événements `before-quit` et `will-quit` ne seront pas émis.

### `app.relaunch([options])`

* `options` Object (facultatif) 
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

Retourne `Boolean` - `true` si Electron a fini de s'initialiser, `false` sinon.

### `app.whenReady()`

Returns `Promise&lt;void&gt;` - Remplie quand Electron est initialisé. Peut astucieusement remplacer la vérification de `app.isReady()` et l'abonnement à l'événement `ready` si l'application n'est pas encore prête.

### `app.focus()`

Sur Linux, met le focus sur la première fenêtre visible. Sur MacOS, rend l'application active. Sur windows met le focus sur la première fenêtre de l'application.

### `app.hide()` *macOS*

Masque toutes les fenêtres de l'application sans les minimiser.

### `app.show()` *macOS*

Montre les fenêtres de l'application après qu'elles aient été cachées. Ne met pas automatiquement le focus sur ces dernières.

### `chemin app.setAppLogsPath([path])`

* `path` String (facultatif) - Un chemin personnalisé pour vos logs. Doit être absolu.

Définit ou crée un répertoire qui peut être manipulé par `app.getPath()` ou `app.setPath(pathName, newPath)`.

Appeler `app. etAppLogsPath()` sans paramètre `path` fera que ce répertoire sera réglé sur `~/Library/Logs/YourAppName` sur *macOS*, et dans le répertoire `userData` sur *Linux* et *Windows*.

### `app.getAppPath()`

Retourne `String` - Répertoire courant de l'application.

### `app.getPath(name)`

* `nom` String - Vous pouvez demander les chemins suivants par le nom: 
  * `home` Répertoire d'accueil de l'utilisateur.
  * `appData` Dossiers de donnée des applications pour chaque utilisateur, qui pointe par défaut vers: 
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
  * `logs` Répertoire du dossier de log de votre application.
  * `pepperFlashSystemPlugin` Chemin d’accès complet à la version du système du plugin Pepper Flash.

Retourne `String` - Un chemin vers un répertoire ou un fichier spécial associé à `name`. En cas d'échec de , une `Erreur` est levée.

Si `app.getPath('logs')` est appelé sans que `app.setAppLogsPath()` soit appelé en premier, un répertoire de logs par défaut sera créé équivalent à un appel `app.setAppLogsPath()` sans paramètre `path`.

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (facultatif) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 sur *Linux*, 32x32 sur *Windows*, non pris en charge sur *macOS*.

Retourne `Promise<NativeImage>` - rempli avec l'icône de l'application, qui est une [NativeImage](native-image.md).

Récupère une icône associée à un chemin.

Sous *Windows*, il y a 2 sortes d’icônes :

* Icônes associées à certaines extensions de fichier, comme `.mp3`, `.png`, etc.
* Icônes à l’intérieur du fichier lui-même, comme les `.exe`, `.dll`, `.ico`.

Sur *Linux* et *macOS*, les icônes dépendent de l'application associée au type Mime de fichier.

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

**[Déprécié ](modernization/property-updates.md)**

### `app.setName(name)`

* `name` String

Remplace le nom de l'application actuelle.

**Note:** This function overrides the name used internally by Electron; it does not affect the name that the OS uses.

**[Déprécié ](modernization/property-updates.md)**

### `app.getLocale()`

Retourne `String` - La localisation actuelle de l'application. Les valeurs possibles retournées sont documentées [ici](locales.md).

Pour définir la localisation, utilisez un paramètre de ligne de commande au démarrage de l'application, que vous trouverez [ici](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md).

**Remarque :** À la distribution de votre application empaquetée, vous devrez également inclure le dossier `locales`.

**Remarque :** Sous Windows, vous devez l'appeler après que les événements `prêts` soient émis.

### `app.getLocaleCountryCode()`

Retourne `String` - Code pays [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) de la langue du système d'exploitation de l'utilisateur. La valeur est prise à partir des API natives d'OS.

**Note:** Quand il est impossible de détecter le code du pays de la localisation, il renvoie une chaîne vide.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Ajoute le `path` à la liste des documents récents.

Cette liste est gérée par l'OS. Sous Windows, vous pouvez visiter la liste à partir de la barre des tâches et sur macOS, vous pouvez la visiter à partir du menu du dock.

### `app.clearRecentDocuments()` *macOS* *Windows*

Efface la liste des documents récents.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`. For example, if you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) *Windows* - The path to the Electron executable. Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Arguments passed to the executable. Defaults to an empty array

Returns `Boolean` - Si l'appel a réussi.

Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which cannot be modified at runtime. However, you can change the file during build time via [Electron Forge](https://www.electronforge.io/), [Electron Packager](https://github.com/electron/electron-packager), or by editing `info.plist` with a text editor. Veuillez vous référer à la [documentation d'Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) pour plus de détails.

**Remarque :** Dans un environnement Windows Store (lorsque empaqueté en tant qu'`appx`) cette API retournera `true` pour tous les appels, mais la clé de registre qu'elle définit ne sera pas accessible par d'autres applications. Afin d'enregistrer votre application Windows Store comme gestionnaire de protocole par défaut, vous devez [déclarer le protocole dans votre manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and `LSSetDefaultHandlerForURLScheme` internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`.
* `path` String (facultatif) *Windows* - `process.execPath` par défaut
* `args` String[] (facultatif) *Windows* - Un tableau vide par défaut

Returns `Boolean` - Si l'appel a réussi.

Cette méthode vérifie si l'application actuel est l'application par défaut pour un protocole (par exemple le modèle URI). Si c'est le cas, il retirera l’application comme application par défaut.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`.
* `path` String (facultatif) *Windows* - `process.execPath` par défaut
* `args` String[] (facultatif) *Windows* - Un tableau vide par défaut

Returns `Boolean` - Whether the current executable is the default handler for a protocol (aka URI scheme).

**Remarque:** Sur macOS, vous pouvez utiliser cette méthode pour vérifier si l'application a bien été enregistré comme gestionnaire de protocole par défaut pour un protocole. Vous pouvez également confirmer cela en vérifiant `~/Library/Preferences/com.apple.LaunchServices.plist` sur votre machine macOS. Veuillez vous référer à la [documentation d'Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) pour plus de détails.

The API uses the Windows Registry and `LSCopyDefaultHandlerForURLScheme` internally.

### `app.getApplicationNameForProtocol(url)`

* `url` String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`).

Returns `String` - Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be `Electron` on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a `.desktop` suffix.

This method returns the application name of the default handler for the protocol (aka URI scheme) of a URL.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Tableau d'objets `Task`

Ajoute `tâches` à la catégorie [Tâches](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) de la liste de sauts sur Windows.

`tasks` est un tableau d’objets [`Task`](structures/task.md).

Returns `Boolean` - Si l'appel a réussi.

**Remarque :** Si vous souhaitez personnaliser encore plus la JumpList, utilisez `app.setJumpList(categories)` à la place.

### `app.getJumpListSettings()` *Windows*

Retourne `Object`:

* `minItems` Integer - Le nombre minimum d'éléments qui seront affichés dans la JumpList (pour une description plus détaillée de cette valeur, voir les [documentations MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Tableau des objets `JumpListItem` qui correspondent aux éléments que l'utilisateur a explicitement retirés des catégories personnalisées dans la liste de saut de . Ces éléments ne doivent pas être ajoutés de nouveau à la JumpList dans l'appel **suivant** à `app.setJumpList()`, Windows n'affichera aucune catégorie personnalisée qui contient les éléments supprimés.

### `app.setJumpList(categories)` *Windows*

* `catégories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Tableau d'objets `JumpListCategory`.

Définit ou supprime une JumpList personnalisée pour l'application et renvoie l'une des chaînes de caractères suivantes :

* `ok` - Tout s'est bien passé.
* `error` - Une ou plusieurs erreurs se sont produites, activez la journalisation de la durée d'exécution pour déterminer la cause probable.
* `invalidSeparatorError` - Une tentative d'ajout d'un séparateur à une catégorie personnalisée dans la JumpList. Les séparateurs ne sont autorisés que dans la catégorie standard `Tasks`.
* `fileTypeRegistrationError` - Tentative d'ajout d'un lien de fichier dans la JumpList pour un type de fichier que l'application n'est pas enregistrée pour gérer.
* `customCategoryAccessDeniedError` - Les catégories personnalisées ne peuvent pas être ajoutées à la JumpList en raison de la confidentialité de l'utilisateur ou des paramètres de politique de groupe.

Si `cetagories` est `null`, la JumpList personnalisée précédemment définie (si existante) sera remplacée par la JumpList standard de l'application (gérée par Windows).

**Remarque :** Si un objet `JumpListCategory` n'a ni de `type` ni de propriété `name` de défini, alors le `type` est assumé être `tasks`. Si la propriété `name` est définie mais que le `type` est omis, alors le `type` est assumé être `custom`.

**Remarque :** Les utilisateurs peuvent supprimer des éléments des catégories personnalisées, et Windows n'autorisera pas l'ajout d'un élément supprimé dans une catégorie personnalisée avant le **prochain** appel réussi à `app.setJumpList(categories)`. Toute tentative de réajouter un élément supprimé à une catégorie personnalisée plus tôt, cela entraînera l'omission de toute la catégorie personnalisée dans la JumpList. La liste des éléments supprimés peut être obtenue à l'aide de `app.getJumpListSettings()`.

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

La valeur renvoyée par cette méthode indique si cette instance de votre application a obtenu le verrou ou non. S'il n'a pas réussi à obtenir le verrou vous pouvez supposer qu'une autre instance de votre application est déjà en cours d'exécution avec le verrou et quitter immédiatement.

Par exemple : cette méthode renvoie `true` si votre process est l'instance principale de votre application, et votre application doit continuer de charger. Elle renvoie `false` si votre process devrait quitter immédiatement, puisqu'il a envoyé ses paramètres à une instance qui possède déjà le verrou.

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
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Retourne `Boolean`

Cette méthode retourne un booléen indiquant si cette instance de votre application détient actuellement le verrou d'instance unique. Vous pouvez demander le verrou avec `app.requestSingleInstanceLock()` et le débloquer avec `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Libère tous les verrous qui ont été créés par `requestSingleInstanceLock`. Cela permettra à plusieurs instances de l'application de s'exécuter en même temps.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` n'importe quel - état spécifique à l'application à stocker pour utilisation par un autre appareil.
* `webpageURL` String (facultatif) - La page web à charger dans un navigateur si aucune application appropriée n'est installée sur l'autre périphérique de reprise. Le protocole doit être `http` ou `https`.

Créée un `NSUserActivity` et le défini en tant qu'activité courante. Après cela, l'activité devient éligible à la fonction [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sur l'autre périphérique.

### `app.getCurrentActivityType()` *macOS*

Retourne `String` - le type de l’activité en cours d’exécution.

### `app.invalidateCurrentActivity()` *macOS*

Invalide l'activité [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) courante de l'utilisateur.

### `app.resignCurrentActivity()` *macOS*

Marque l'activité actuelle de l'utilisateur [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) comme inactive sans l'invalider.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` n'importe quel - état spécifique à l'application à stocker pour utilisation par un autre appareil.

Modifie l'activité en cours si son type correspond à `type`, en fusionnant les entrées de `userInfo` dans son dictionnaire `userInfo` courant.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Change le [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) à `id`.

### `app.importCertificate(options, callback)` *Linux*

* `options` Objet 
  * `certificate` String - Chemin pour le fichier pkcs12.
  * `password` String - La Passphrase pour le certificat.
* `callback` Function 
  * `result` Integer - Résultat de l'importation.

Importe le certificat au format pkcs12 dans l'entrepôt de certificats de la plateforme. `callback` est appelé avec le retour `result` de l'opération d'import, une valeur `0` indique un succès alors que toute autre valeur signale un problème, telle que décrite par la [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) de Chromium.

### `app.disableHardwareAcceleration()`

Désactive l'accélération matérielle pour l'application courante.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.disableDomainBlockingFor3DAPIs()`

Par défaut, Chromium désactive, jusqu'au prochain démarrage, les APIs 3D (comme WebGL) par domaine si les processus GPU plantent trop souvent. Cette fonction désactive ce comportement.

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
{ auxAttributes:
   { amdSwitchable: true,
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
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```

`basic` devrait être priorisé si vous n'avez besoin que d'informations basiques telles que `vendorId` ou `driverId`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Returns `Boolean` - Si l'appel a réussi.

Définit le badge du compteur pour l'application courante. Régler le compte à `0>0` masquera le badge.

Sur macOS, il apparaît sur l'icône du dock. Sous Linux, il ne fonctionne que pour le lanceur Unity.

**Note :** le launcher Unity requiert la présence d'un fichier `.desktop` pour fonctionner, pour de plus amples informations, lisez le document [Intégration de l'environnement de bureau](../tutorial/desktop-environment-integration.md#unity-launcher).

**[Déprécié ](modernization/property-updates.md)**

### `app.getBadgeCount()` *Linux* *macOS*

Retourne `Integer` - La valeur actuelle affichée sur le badge du compteur.

**[Déprécié ](modernization/property-updates.md)**

### `app.isUnityRunning()` *Linux*

Retourne `Boolean` - Si l'environnement de bureau actuel est Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (facultatif) 
  * `path` String (facultatif) *Windows* - Le chemin de l'exécutable à comparer. `process.execPath` par défaut.
  * `args` String[] (facultatif) *Windows* - Les arguments de la ligne de commandes à comparer. Un tableau vide par défaut.

Si vous avez fourni des options `path` et `args` à `app.setLoginItemSettings`, vous devez passer les mêmes arguments ici pour que `openAtLogin` soit défini correctement.

Retourne `Object`:

* `openAtLogin` Boolean - `true` si l'application est configurée pour démarrer à l'ouverture de session.
* `openAsHidden` Boolean *macOS* - `true` si l'application est configurée pour s'ouvrir comme cachée à l'ouverture de session. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` si l'application est automatiquement ouverte à l'ouverture de session. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` si l'application est ouverte comme un programme caché à l'ouverture de session. Cela indique que l'application ne devrait pas ouvrir la moindre fenêtre au démarrage. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` si l'application est ouverte comme un programme qui devrait restaurer l'état de la session précédente à l'ouverture de session. Cela indique que l'application devrait restaurer les fenêtres qui étaient ouvertes lorsque celle-ci a été précédemment fermée. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Objet 
  * `openAtLogin` Boolean (facultatif) - `true` pour ouvrir l'application à l'ouverture de session, `false` pour retirer l'application de la liste des programmes démarrés à l'ouverture de session. `false` par défaut.
  * `openAsHidden` Boolean (facultatif) *macOS* - `true` pour ouvrir l’application comme cachée. `false` par défaut. L'utilisateur peut éditer ce paramètre depuis les Préférences Système, alors `app.getLoginItemSettings().wasOpenedAsHidden` va être vérifié lorsque l'app sera ouverte pour connaître la valeur actuelle. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) *Windows* - L'exécutable à lancer à l'ouverture de session. `process.execPath` par défaut.
  * `args` String[] (facultatif) *Windows* - Les arguments de la ligne de commandes à passer à l'exécutable. Un tableau vide par défaut. Veillez à protéger les chemins par des guillemets.

Configurer les paramètres de l'application lors de l'ouverture de session.

Pour fonctionner avec `autoUpdater` d'Electron sur Windows, qui utilise [Squirrel](https://github.com/Squirrel/Squirrel.Windows), vous aurez besoin de configurer le chemin de démarrage de Update.exe et de lui passer les arguments qui définissent le nom de votre application. Par exemple :

```javascript
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

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Retourne `Boolean` - `true` si le support des fonctionnalités d'accessibilité de Chrome est activé, `false` sinon. Cette API retournera `true` si les technologies d'assistance, comme les lecteurs d'écran, sont détectées. Voir https://www.chromium.org/developers/design-documents/accessibility pour de plus amples informations.

**[Déprécié ](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Active ou désactive le rendu de [l'arbre d'accessibilité](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Active manuellement le support de l'accessibilité de Chrome, permettant de mettre à disposition des utilisateurs les commutateurs d'accessibilité dans les paramètres de l'application. Consultez les [documents d'accessibilité de Chromium](https://www.chromium.org/developers/design-documents/accessibility) pour plus de détails. Désactivé par défaut.

Cette API doit être appelée après l'émission de l'événement `ready` .

**Note:** Le rendu de l'arbre d'accessibilité peut affecter de manière significative les performances de votre application. Il ne devrait pas être activé par défaut.

**[Déprécié ](modernization/property-updates.md)**

### `app.showAboutPanel()`

Affiche les options du panneau à propos de l'application. Ces options peuvent être remplacées par `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)`

* `options` Objet 
  * `applicationName` String (optional) - Nom de l'application.
  * `applicationVersion` String (optional) - Version de l'application.
  * `copyright` String (optional) - Information copyright.
  * `version` String (facultatif) *macOS* - Le numéro de version de l'application.
  * `credits` String (optional) *macOS* *Windows* - Credit information.
  * `auteurs` String[] (facultatif) *Linux* - Liste des auteurs d'applications.
  * `site web` String (facultatif) *Linux* - Le site web de l'application.
  * `iconPath` String (optional) *Linux* *Windows* - Path to the app's icon. On Linux, will be shown as 64x64 pixels while retaining aspect ratio.

Configure les options de la fenêtre À propos de. Cela remplacera les valeurs définies dans le fichier `.plist` de l'application sur MacOS. Voir [la documentation Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) pour de plus amples informations. Sous Linux, les valeurs doivent être définies pour être affichées ; il n'y a pas de valeurs par défaut.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. Le premier fichier trouvé est utilisé, et si aucun n'est trouvé, la zone info est laissée vide. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported()`

Retourne `Boolean` - que la version actuelle de l'OS autorise ou non les sélecteurs natifs d'émojis.

### `app.showEmojiPanel()` *macOS* *Windows*

Montrer le sélecteur d'émoji natif de la plateforme.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *mas*

* `bookmarkData` String - Les données de marque-page encodées en base64 renvoyées par les méthodes `dialog.showOpenDialog` où `dialog.showSaveDialog`.

Retourne `Fonction` - Cette fonction **doit** être appelée une fois que vous avez fini d'accéder au fichier de sécurité utilisé. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Commence à accéder au fichier.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Commencez à accéder à une ressource périmée de sécurité. Avec cette méthode, les applications Electron qui sont empaquetées pour le Mac App Store peuvent atteindre en dehors de leur sandbox pour accéder aux fichiers choisis par l'utilisateur. Voir la documentation de [Apple](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) pour une description du fonctionnement de ce système.

### `app.enableSandbox()` *Expérimental*

Active le mode "full sandbox" dans l'application.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.isInApplicationsFolder()` *macOS*

Renvoie un `Boolean` - Vérifie si l'application est actuellement exécutée depuis le dossier Application du système. A utiliser avec `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` *macOS*

* `options` Object (facultatif) 
  * `conflictHandler` Function<boolean> (optional) - A handler for potential conflict in move failure. 
    * `conflictType` String - Le type de conflit de déplacement rencontré par le gestionnaire ; peut être `exists` ou `existsAndRunning`, où `existe` signifie qu'une application du même nom est présente dans le répertoire Applications et `existsAndRunning` signifie à la fois qu'elle existe et qu'elle est actuellement en cours d'exécution.

Retourne `Boolean` - Si le mouvement a réussi. Veuillez noter que si le mouvement est réussi, votre application se quittera et se relancera.

Aucune boîte de dialogue de confirmation ne sera présentée par défaut. Si vous souhaitez autoriser l'utilisateur à confirmer l'opération, vous pouvez le faire en utilisant l'API [`dialogue`](dialog.md).

**NOTE:** Cette méthode renvoie des erreurs si quelque chose d'autre qu'une erreur utilisateur fait échouer le déplacement. Par exemple, si l'utilisateur annule la boîte de dialogue d'autorisation, cette méthode renvoie false. Si nous ne réussissons pas à effectuer la copie, alors cette méthode lancera une erreur. Le message contenu dans l'erreur devrait être suffisamment informatif pour que vous puissiez déterminer précisément quel est le problème.

Par défaut, si une application du même nom que celle qui a été déplacée existe dans le répertoire Applications et est *pas* en cours d'exécution, l'application existante sera mise à la corbeille et l'application active sera déplacée à sa place. Si *est en cours d'exécution*, l'application en cours préexistante prendra le focus et l'application précédemment active se fermera. Ce comportement peut être modifié en fournissant le gestionnaire de conflits facultatif, où le booléen retourné par le gestionnaire détermine si le conflit de déplacement est résolu avec le comportement par défaut. c'est-à-dire que retourner `false` ne garantira aucune action supplémentaire, retourner `true` entraînera le comportement par défaut et la méthode continuera.

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

## Propriétés

### `app.accessibilitySupportEnabled` *macOS* *Windows*

Une propriété `Booléen` qui est `vraie` si le support d'accessibilité de Chrome est activé, `faux` sinon. Cette propriété sera `true` si l'utilisation de technologies d'assistance, telles que les lecteurs d'écran, a été détectée. Définir cette propriété à `true` active manuellement la prise en charge de l'accessibilité de Chrome, permettant aux développeurs d'exposer le basculement d'accessibilité aux utilisateurs dans les paramètres de l'application.

Voir [Documentation d'accessibilité de Chromium](https://www.chromium.org/developers/design-documents/accessibility) pour plus de détails. Désactivé par défaut.

Cette API doit être appelée après l'émission de l'événement `ready` .

**Note:** Le rendu de l'arbre d'accessibilité peut affecter de manière significative les performances de votre application. Il ne devrait pas être activé par défaut.

### `app.applicationMenu`

Une propriété `Menu | null` qui renvoie [`Menu`](menu.md) si on a été défini et `null` autrement. Les utilisateurs peuvent passer un [Menu](menu.md) pour définir cette propriété.

### `app.badgeCount` *Linux* *macOS*

Une propriété `Integer` qui retourne le nombre de badges pour l'application courante. Si vous définissez le nombre de badges à `0` masquera le badge.

Sur macOS, le paramétrage avec n'importe quel entier non zéro apparaît sur l'icône du dock. Sous Linux, cette propriété ne fonctionne que pour le lanceur Unity.

**Note :** le launcher Unity requiert la présence d'un fichier `.desktop` pour fonctionner, pour de plus amples informations, lisez le document [Intégration de l'environnement de bureau](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.commandLine` *Readonly*

Un objet [`CommandLine`](./command-line.md) qui vous permet de lire et de manipuler les arguments de ligne de commande que Chromium utilise.

### `app.dock` *macOS* *Readonly*

Un objet [`Dock`](./dock.md) qui vous permet d'effectuer des actions sur l'icône de votre application dans le dock de l'utilisateur sur macOS.

### `app.isPackaged` *Readonly*

Une propriété `Boolean` qui renvoie `true` si l'application est packagée, `false` sinon. Pour de nombreuses applications, cette propriété peut être utilisée pour distinguer les environnements de développement et de production.

### `nom de l'application`

Une propriété `String` qui indique le nom de l'application courante, qui est le nom dans le fichier `package.json` de l'application.

Habituellement, le champ `name` de `package.json` est un nom court en minuscule, selon la spécification des modules npm. Vous devriez dans la plupart des cas renseigner également un champ `productName`, qui contient le nom complet et capitalisé de votre application, et qui sera préféré à `name` par Electron.

### `format@@0 app.userAgentFallback`

Une `String` qui est la chaîne d'agent utilisateur que Electron utilisera comme solution de repli global.

C'est l'agent utilisateur qui sera utilisé quand aucun agent utilisateur n'est défini au niveau `webContents` ou `session`. Il est utile pour s'assurer que l'ensemble de votre application a le même agent utilisateur. Définissez une valeur personnalisée dès que possible dans l'initialisation de votre application pour vous assurer que votre valeur remplacée est utilisée.

### `allowRenderererProcessRuse`

Un `Booléen` qui, lorsque `true` désactive les remplacements qu'Electron a en place pour s'assurer que les processus de rendu sont redémarrés à chaque navigation. La valeur par défaut actuelle pour cette propriété est `false`.

L'intention est que ces dérogations soient désactivées par défaut, puis à un point dans le futur cette propriété sera supprimée. Cette propriété impacte les modules natifs que vous pouvez utiliser dans le processus de rendu. Pour plus d'informations sur la direction vers laquelle Electron va avec le redémarrage du processus de rendu et l'utilisation de modules natifs dans le processus de rendu veuillez consulter ce [Problème de suivi](https://github.com/electron/electron/issues/18397).