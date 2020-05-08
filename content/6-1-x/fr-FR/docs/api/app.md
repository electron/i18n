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

* `launchInfo` Object _macOS_

Émis lorsqu'Electron a terminé l’initialisation. Sur macOs, `launchInfo` détient le `userInfo` de `NSUserNotification` qui a été utilisé pour ouvrir l'application si elle a été lancée depuis le centre de notification. Vous pouvez appeler `app.isReady()` pour vérifier si cet événement a déjà été déclenché.

### Événement : 'window-all-closed'

Émis lorsque toutes les fenêtres ont été fermées.

Si vous n'être pas abonné à cet événement et que toutes les fenêtres sont fermées, le comportement par défaut consiste à quitter l'application. Toutefois, si vous vous abonnez, vous pouvez contrôler le fait que l'application se ferme ou non. Si l'utilisateur appuie sur `Cmd + Q`, ou le développeur appelle `app.quit()`, Electron essaie d'abord de fermer toutes les fenêtres et puis émet l'événement `will-quit` et dans ce cas, l'événement `window-all-closed` ne sera pas émis.

### Événement : 'before-quit'

Renvoie :

* `event` Événement

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Note:** Sous Windows, cet événement ne sera pas émit si l'application est fermée à cause d'un extinction du système/re-démarrage ou une déconnexion de l'utilisateur.

### Événement : 'will-quit'

Retourne :

* `event` Événement

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

Consultez la description de l’événement `window-all-closed` pour voir les différences entre les événements `will-quit` et `window-all-closed`.

**Note:** Sous Windows, cet événement ne sera pas émit si l'application est fermée à cause d'un extinction du système/re-démarrage ou une déconnexion de l'utilisateur.

### Événement : 'quit'

Retourne :

* `event` Event
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

Émis lorsque l’utilisateur souhaite ouvrir une URL avec l’application. Le fichier `Info.plist` de votre application doit définir le schéma d'URL dans la clé `CFBundleURLTypes`, et définir la valeur `AtomApplication` dans `NSPrincipaleClass`.

Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

### Événement : 'activate' _macOS_

Retourne :

* `event` Événement
* `hasVisibleWindows` Boolean

Émis lorsque l'application est activée. Différentes actions peuvent déclencher cet événement, comme le lancement de l’application pour la première fois, essayer de relancer l’application lorsqu’elle est déjà en cours d’exécution, ou en cliquant sur l'icône du dock de l’application ou de l’icône de la barre des tâches.

### Événement : 'continue-activity' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contient l'état d'app spécifique stocké par l'activité sur un autre périphérique.

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quand une activité depuis un périphérique différent veut reprendre. Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

Une activité d'utilisateur peut être poursuivie seulement dans une application qui a le même identifiant d'équipe développeur que l'application d'origine de la source d'activité et qui prend en charge le type d'activité. La prise en charge d’activité types est spécifiée dans le `Info.plist` de l'application sous la clé `NSUserActivityType`.

### Événement: 'wil-continue-activity' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quand une activité depuis un périphérique différent veut reprendre. Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

### Événement : 'continue-activity-error' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Une chaîne de caractères avec la description localisée de l'erreur.

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quand une activité depuis un périphérique différent n'arrive pas à reprendre.

### Événement : 'activity-was-continued' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contient l'état spécifique à l'application stocké par l'activité.

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)après qu'une activité depuis un périphérique différent a bien repris.

### Événement : 'update-activity-state' _macOS_

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contient l'état spécifique à l'application stocké par l'activité.

Émis lorsque la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) va être repris par un autre appareil. Si vous avez besoin de mettre à jour l'état à transférer, vous devez appeler `event.preventDefault()` immédiatement, construire un nouveau dictionnaire `userInfo` et appeler `app.updateCurrentActiviy()` en suivant. Sinon, l'opération échouera et `continue-activity-error` sera appelée.

### Événement : 'new-window-for-tab' _macOS_

Retourne :

* `event` Événement

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

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
* `request` Object
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String
  * `password` String

Émis lorsque `webContents` veut faire une authentification normale.

Le comportement par défaut est d'annuler toutes les authentifications. Pour remplacer cela vous devez empêcher le comportement par défaut avec `event.preventDefault()` et appeler `callback(username, password)` avec les identifiants.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Événement : 'gpu-process-crashed'

Retourne :

* `event` Événement
* `killed` Boolean

Émis lorsque le processus gpu crash ou est interrompu.

### Événement : 'renderer-process-crashed'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Émis lorsque le processus de rendu de `webContents` plante ou est tué.

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

app.on('session-created', (event, session) => {
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

Cet évènement est garanti d'être émis après que l'évènement `ready` de `app` soit émis.

**Remarque :** Des arguments supplémentaires en ligne de commande peuvent être ajoutés par Chromium, tels que `--original-process-start-time`.

### Événement : 'desktop-capturer-get-sources'

Retourne :

* `event` Événement
* `webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

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

Exits immediately with `exitCode`. `exitCode` defaults to 0.

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

Retourne `Boolean` - `true` si Electron a fini de s'initialiser, `false` sinon.

### `app.whenReady()`

Returns `Promise&lt;void&gt;` - Remplie quand Electron est initialisé. Peut astucieusement remplacer la vérification de `app.isReady()` et l'abonnement à l'événement `ready` si l'application n'est pas encore prête.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` _macOS_

Masque toutes les fenêtres de l'application sans les minimiser.

### `app.show()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `chemin app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Définit ou crée un répertoire qui peut être manipulé par `app.getPath()` ou `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

Retourne `String` - Répertoire courant de l'application.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

Vous pouvez demander les chemins suivants sous le nom :

* `home` Répertoire d'accueil de l'utilisateur.
* `appData` Per-user application data directory, which by default points to:
  * `%APPDATA%` sur Windows
  * `$XDG_CONFIG_HOME` ou `~/.config` sur Linux
  * `~/Library/Application Support` sur macOS
* `userData` Le dossier pour stocker les fichiers de configuration de votre application, qui par défaut est le dossier `appData` avec le nom de votre application.
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

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
* `callback` Function
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Récupère une icône associée à un chemin.

On _Windows_, there are 2 kinds of icons:

* Icônes associées à certaines extensions de fichier, comme `.mp3`, `.png`, etc.
* Icônes à l’intérieur du fichier lui-même, comme les `.exe`, `.dll`, `.ico`.

Sur _Linux_ et _macOS_, les icônes dépendent de l'application associée au type Mime de fichier.

**[Deprecated Soon](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

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

Généralement, le champ `name` du fichier `package.json` est un nom court écrit en lettres minuscules, comme recommandé dans la spécification des modules npm. Vous devriez dans la plupart des cas renseigner également un champ `productName`, qui contient le nom complet et capitalisé de votre application, et qui sera préféré à `name` par Electron.

### `app.setName(name)`

* `name` String

Remplace le nom de l'application actuelle.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

Pour définir la localisation, utilisez un paramètre de ligne de commande au démarrage de l'application, que vous trouverez [ici](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Remarque :** À la distribution de votre application empaquetée, vous devrez également inclure le dossier `locales`.

**Remarque :** Sous Windows, vous devez l'appeler après que les événements `prêts` soient émis.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** Quand il est impossible de détecter le code du pays de la localisation, il renvoie une chaîne vide.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Ajoute le `path` à la liste des documents récents.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Efface la liste des documents récents.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`. Si vous voulez que votre application gère les liens `electron://`, appelez cette méthode avec `electron` comme paramètre.
* `path` String (facultatif) _Windows_ - `process.execPath` par défaut
* `args` String[] (facultatif) _Windows_ - Un tableau vide par défaut

Returns `Boolean` - Si l'appel a réussi.

Cette méthode définit l'exécutable courant comme gestionnaire par défaut pour un protocole. (par exemple le modèle URI). Il vous permet d'intégrer votre application plus en profondeur dans le système d'exploitation. Une fois enregistré, tous les liens avec `votre-protocole://` seront ouverts avec l'exécutable courant. L'ensemble du lien, y compris le protocole, sera transmis en paramètre à votre application.

Sous Windows, vous pouvez fournir un chemin optionnel de paramètres, le chemin vers votre exécutable, et args, une table d'arguments à passer à votre exécutable lors de son lancement.

**Remarque:** Sur macOS, vous ne pouvez enregistrer que les protocoles qui ont été ajoutés à votre application `info.plist`, qui ne peut pas être modifié au moment de l'exécution. Vous pouvez cependant changer le fichier avec un simple éditeur de texte ou un script pendant la compilation. Veuillez vous référer à la [documentation d'Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) pour plus de détails.

**Remarque :** Dans un environnement Windows Store (lorsque empaqueté en tant qu'`appx`) cette API retournera `true` pour tous les appels, mais la clé de registre qu'elle définit ne sera pas accessible par d'autres applications.  Afin d'enregistrer votre application Windows Store comme gestionnaire de protocole par défaut, vous devez [déclarer le protocole dans votre manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

L'API utilise en interne le registre de Windows ainsi que LSSetDefaultHandlerForURLScheme.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`.
* `path` String (facultatif) _Windows_ - `process.execPath` par défaut
* `args` String[] (facultatif) _Windows_ - Un tableau vide par défaut

Returns `Boolean` - Si l'appel a réussi.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`.
* `path` String (facultatif) _Windows_ - `process.execPath` par défaut
* `args` String[] (facultatif) _Windows_ - Un tableau vide par défaut

Retourne `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Remarque:** Sur macOS, vous pouvez utiliser cette méthode pour vérifier si l'application a bien été enregistré comme gestionnaire de protocole par défaut pour un protocole. Vous pouvez également confirmer cela en vérifiant `~/Library/Preferences/com.apple.LaunchServices.plist` sur votre machine macOS. Veuillez vous référer à la [documentation d'Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) pour plus de détails.

L'API utilise en interne le registre de Windows ainsi que LSCopyDefaultHandlerForURLScheme.

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Tableau d'objets `Task`

Ajoute `tasks` dans la catégorie [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) de la JumpList sur Windows.

`tasks` est un tableau d’objets [`Task`](structures/task.md).

Returns `Boolean` - Si l'appel a réussi.

**Remarque :** Si vous souhaitez personnaliser encore plus la JumpList, utilisez `app.setJumpList(categories)` à la place.

### `app.getJumpListSettings()` _Windows_

Retourne `Object`:

* `minItems` Integer - Le nombre minimum d'éléments qui seront affichés dans la JumpList (pour une description plus détaillée de cette valeur, voir les [documentations MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Tableau d'objets `JumpListItem` qui correspondent à des éléments que l'utilisateur a explicitement retirés des catégories personnalisées de la JumpList. Ces éléments ne doivent pas être ajoutés de nouveau à la JumpList dans l'appel **suivant** à `app.setJumpList()`, Windows n'affichera aucune catégorie personnalisée qui contient les éléments supprimés.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) ou `null` - Tableau d'objets `JumpListCategory`.

Définit ou supprime une JumpList personnalisée pour l'application et renvoie l'une des chaînes de caractères suivantes :

* `ok` - Tout s'est bien passé.
* `error` - Une ou plusieurs erreurs se sont produites, activez la journalisation de la durée d'exécution pour déterminer la cause probable.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - Tentative d'ajout d'un lien de fichier dans la JumpList pour un type de fichier que l'application n'est pas enregistrée pour gérer.
* `customCategoryAccessDeniedError` - Les catégories personnalisées ne peuvent pas être ajoutées à la JumpList en raison de la confidentialité de l'utilisateur ou des paramètres de politique de groupe.

Si `cetagories` est `null`, la JumpList personnalisée précédemment définie (si existante) sera remplacée par la JumpList standard de l'application (gérée par Windows).

**Remarque :** Si un objet `JumpListCategory` n'a ni de `type` ni de propriété `name` de défini, alors le `type` est assumé être `tasks`. Si la propriété `name` est définie mais que le `type` est omis, alors le `type` est assumé être `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Toute tentative de réajouter un élément supprimé à une catégorie personnalisée plus tôt, cela entraînera l'omission de toute la catégorie personnalisée dans la JumpList. La liste des éléments supprimés peut être obtenue à l'aide de `app.getJumpListSettings()`.

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

Par exemple : cette méthode renvoie `true` si votre process est l'instance principale de votre application, et votre application doit continuer de charger.  Elle renvoie `false` si votre process devrait quitter immédiatement, puisqu'il a envoyé ses paramètres à une instance qui possède déjà le verrou.

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

Cette méthode retourne un booléen indiquant si cette instance de votre application détient actuellement le verrou d'instance unique.  Vous pouvez demander le verrou avec `app.requestSingleInstanceLock()` et le débloquer avec `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - État spécifique de l'application à stocker pour une utilisation par un autre périphérique.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Créée un `NSUserActivity` et le défini en tant qu'activité courante. Après cela, l'activité devient éligible à la fonction [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sur l'autre périphérique.

### `app.getCurrentActivityType()` _macOS_

Retourne `String` - le type de l’activité en cours d’exécution.

### `app.invalidateCurrentActivity()` _macOS_

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalide l'activité [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) courante de l'utilisateur.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - État spécifique de l'application à stocker pour une utilisation par un autre périphérique.

Modifie l'activité en cours si son type correspond à `type`, en fusionnant les entrées de `userInfo` dans son dictionnaire `userInfo` courant.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

Change le [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) à `id`.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `certificate` String - Chemin pour le fichier pkcs12.
  * `password` String - La Passphrase pour le certificat.
* `callback` Function
  * `result` Integer - Résultat de l'importation.

Importe le certificat au format pkcs12 dans l'entrepôt de certificats de la plateforme. `callback` est appelé avec le retour `result` de l'opération d'import, une valeur `0` indique un succès alors que toute autre valeur signale un problème, telle que décrite par la [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) de Chromium.

### `app.disableHardwareAcceleration()`

Désactive l'accélération matérielle pour l'application courante.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.getAppMetrics()`

Retourne [`ProcessMetric[]`](structures/process-metric.md): un tableau d'objets `ProcessMetric` qui correspondent aux statistiques d'usage de la mémoire et du processeur par chacun des processus associé à l'application.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - L'état des fonctions graphiques de `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Peut prendre la valeur `basic` pour des infos basiques ou `complete` pour avoir toutes les informations.

Retourne `Promise`

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

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Integer

Returns `Boolean` - Si l'appel a réussi.

Définit le badge du compteur pour l'application courante. Régler le compte à `0>0` masquera le badge.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` _Linux_ _macOS_

Retourne `Integer` - La valeur actuelle affichée sur le badge du compteur.

### `app.isUnityRunning()` _Linux_

Retourne `Boolean` - Si l'environnement de bureau actuel est Unity launcher.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

Si vous avez fourni des options `path` et `args` à `app.setLoginItemSettings`, vous devez passer les mêmes arguments ici pour que `openAtLogin` soit défini correctement.

Retourne `Object`:

* `openAtLogin` Boolean - `true` si l'application est configurée pour démarrer à l'ouverture de session.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. Cela indique que l'application ne devrait pas ouvrir la moindre fenêtre au démarrage. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. Cela indique que l'application devrait restaurer les fenêtres qui étaient ouvertes lorsque celle-ci a été précédemment fermée. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Par défaut, `faux`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. `false` par défaut. L'utilisateur peut éditer ce paramètre depuis les Préférences Système, alors `app.getLoginItemSettings().wasOpenedAsHidden` va être vérifié lorsque l'app sera ouverte pour connaître la valeur actuelle. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Configurer les paramètres de l'application lors de l'ouverture de session.

Pour fonctionner avec `autoUpdater` d'Electron sur Windows, qui utilise [Squirrel](https://github.com/Squirrel/Squirrel.Windows), vous aurez besoin de configurer le chemin de démarrage de Update.exe et de lui passer les arguments qui définissent le nom de votre application. Par exemple :

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

**[Deprecated Soon](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Active ou désactive le rendu de [l'arbre d'accessibilité](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Active manuellement le support de l'accessibilité de Chrome, permettant de mettre à disposition des utilisateurs les commutateurs d'accessibilité dans les paramètres de l'application. Consultez les [documents d'accessibilité de Chromium](https://www.chromium.org/developers/design-documents/accessibility) pour plus de détails. Désactivé par défaut.

Cette API doit être appelée après l'émission de l'événement `ready` .

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `applicationName` String (optional) - Nom de l'application.
  * `applicationVersion` String (optional) - Version de l'application.
  * `copyright` String (optional) - Information copyright.
  * `version` String (optional) - Numéro de version de l'application. _macOS_
  * `credits` String (optional) - Information crédit. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

Configure les options de la fenêtre À propos de. Cela remplacera les valeurs définies dans le fichier `.plist` de l'application sur MacOS. Voir [la documentation Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) pour de plus amples informations. Sous Linux, les valeurs doivent être définies pour être affichées ; il n'y a pas de valeurs par défaut.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. Le premier fichier trouvé est utilisé, et si aucun n'est trouvé, la zone info est laissée vide. Consultez la [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) Apple pour plus d'informations.

### `app.isEmojiPanelSupported`

Retourne `Boolean` - que la version actuelle de l'OS autorise ou non les sélecteurs natifs d'émojis.

### `app.showEmojiPanel` _macOS_ _Windows_

Montrer le sélecteur d'émoji natif de la plateforme.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS_

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

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** Ceci n'affecte pas `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.appendArgument(value)`

* `value` String - L'argument à ajouter à la ligne de commande

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Note:** Ceci n'affecte pas `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - A command-line switch

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - A command-line switch

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

### `app.enableSandbox()` _Expérimental_

Active le mode "full sandbox" dans l'application.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** Cette méthode renvoie des erreurs si quelque chose d'autre qu'une erreur utilisateur fait échouer le déplacement. Par exemple, si l'utilisateur annule la boîte de dialogue d'autorisation, cette méthode renvoie false. Si nous ne réussissons pas à effectuer la copie, alors cette méthode lancera une erreur. Le message contenu dans l'erreur devrait être suffisamment informatif pour que vous puissiez déterminer précisément quel est le problème

### `app.dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Retourne `Integer` un ID représentant la requête.

Lorsque la `critical` est passé, l’icône du dock rebondira jusqu'à ce que l’application redevienne active ou que la requête est annulée.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

### `app.dock.cancelBounce(id)` _macOS_

* `id` Integer

Annule le rebond de l'`id`.

### `app.dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Fait rebondir la pile de téléchargements si le chemin d'accès se trouve le dossier Téléchargements.

### `app.dock.setBadge(text)` _macOS_

* `text` String

Définit la chaîne de caractères à afficher dans la zone du badge du dock.

### `app.dock.getBadge()` _macOS_

Retourne `String` - Le texte du badge du dock.

### `app.dock.hide()` _macOS_

Masque l’icône du dock.

### `app.dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

### `app.dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

### `app.dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.getMenu()` _macOS_

Returns `Menu | null` - The application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Définit l’`image` associée à l'icône du dock.

## Propriétés

### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Les utilisateurs peuvent passer un [Menu](menu.md) pour définir cette propriété.

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

Une propriété `Booléen` qui est `vraie` si le support d'accessibilité de Chrome est activé, `faux` sinon. Cette propriété sera `true` si l'utilisation de technologies d'assistance, telles que les lecteurs d'écran, a été détectée. Définir cette propriété à `true` active manuellement la prise en charge de l'accessibilité de Chrome, permettant aux développeurs d'exposer le basculement d'accessibilité aux utilisateurs dans les paramètres de l'application.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Désactivé par défaut.

Cette API doit être appelée après l'émission de l'événement `ready` .

**Note:** Le rendu de l'arbre d'accessibilité peut affecter de manière significative les performances de votre application. Il ne devrait pas être activé par défaut.

### `format@@0 app.userAgentFallback`

Une `String` qui est la chaîne d'agent utilisateur que Electron utilisera comme solution de repli global.

C'est l'agent utilisateur qui sera utilisé quand aucun agent utilisateur n'est défini au niveau `webContents` ou `session`.  Useful for ensuring your entire app has the same user agent.  Set to a custom value as early as possible in your apps initialization to ensure that your overridden value is used.

### `app.isPackaged`

Une propriété `Boolean` qui renvoie `true` si l'application est packagée, `false` sinon. Pour de nombreuses applications, cette propriété peut être utilisée pour distinguer les environnements de développement et de production.

### `allowRenderererProcessRuse`

Un `Booléen` qui, lorsque `true` désactive les remplacements qu'Electron a en place pour s'assurer que les processus de rendu sont redémarrés à chaque navigation.  La valeur par défaut actuelle pour cette propriété est `false`.

L'intention est que ces dérogations soient désactivées par défaut, puis à un point dans le futur cette propriété sera supprimée.  Cette propriété impacte les modules natifs que vous pouvez utiliser dans le processus de rendu.  Pour plus d'informations sur la direction vers laquelle Electron va avec le redémarrage du processus de rendu et l'utilisation de modules natifs dans le processus de rendu veuillez consulter ce [Problème de suivi](https://github.com/electron/electron/issues/18397).
