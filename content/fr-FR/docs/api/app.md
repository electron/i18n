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

* `launchInfo` unknown *macOS*

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

Émis lorsque l’utilisateur souhaite ouvrir une URL avec l’application. Your application's `Info.plist` file must define the URL scheme within the `CFBundleURLTypes` key, and set `NSPrincipalClass` to `AtomApplication`.

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
* `userInfo` unknown - Contains app-specific state stored by the activity on another device.

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
* `userInfo` unknown - Contains app-specific state stored by the activity.

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)après qu'une activité depuis un périphérique différent a bien repris.

### Événement : 'update-activity-state' *macOS*

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` unknown - Contains app-specific state stored by the activity.

Émis lorsque la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) va être repris par un autre appareil. Si vous avez besoin de mettre à jour l'état à transférer, vous devez appeler `event.preventDefault()` immédiatement, construire un nouveau dictionnaire `userInfo` et appeler `app.updateCurrentActiviy()` en suivant. Otherwise, the operation will fail and `continue-activity-error` will be called.

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
* `request` Objet 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Objet 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

Émis lorsque `webContents` veut faire une authentification normale.

The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Event: 'gpu-info-update'

Emitted whenever there is a GPU info update.

### Événement : 'gpu-process-crashed'

Retourne :

* `event` Event
* `killed` Boolean

Emitted when the GPU process crashes or is killed.

### Event: 'renderer-process-crashed'

Retourne :

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Emitted when the renderer process of `webContents` crashes or is killed.

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

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Évènement : 'second-instance'

Retourne :

* `event` Event
* `argv` String[] - un tableau d’arguments de la deuxième instance de la ligne de commande
* `workingDirectory` String - Le répertoire de travail de la deuxième instance

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Les applications répondent habituellement à cela en faisant de leur fenêtre principale, une fenêtre centrée et non réduite au minimum.

Cet évènement est garanti d'être émis après que l'évènement `ready` de `app` soit émis.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

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

Termine immédiatement avec `exitCode`. `exitCode` par défaut vaut 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `options` Object (facultatif) 
  * `args` String[] - (facultatif)
  * `execPath` String (facultatif)

Relance l’application lorsque l’instance en cours se termine.

By default, the new instance will use the same working directory and command line arguments with current instance. Si `args` est spécifié, `args` sera passé comme argument de ligne de commande à la place. Lorsque `execPath` est spécifié, `execPath` sera exécuté pour redémarrer à la de l’application actuelle.

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

### `app.setAppLogsPath([path])`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `~/Library/Logs/YourAppName` on *macOS*, and inside the `userData` directory on *Linux* and *Windows*.

### `app.getAppPath()`

Retourne `String` - Répertoire courant de l'application.

### `app.getPath(name)`

* `name` String - You can request the following paths by the name: 
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

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

If `app.getPath('logs')` is called without called `app.setAppLogsPath()` being called first, a default log directory will be created equivalent to calling `app.setAppLogsPath()` without a `path` parameter.

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (facultatif) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 sur *Linux*, 32x32 sur *Windows*, non pris en charge sur *macOS*.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Récupère une icône associée à un chemin.

Sous *Windows*, il y a 2 sortes d’icônes :

* Icônes associées à certaines extensions de fichier, comme `.mp3`, `.png`, etc.
* Icônes à l’intérieur du fichier lui-même, comme les `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String
* `path` String

Remplace le chemin `path` par un répertoire spécial ou un fichier associé à `name`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

Vous pouvez remplacer uniquement les chemins d’un `name` défini dans `app.getPath`.

Par défaut, les cookies et la cache des pages web seront stockés dans le répertoire `userData`. Si vous voulez changer cet emplacement, vous devez remplacer le chemin `userData` avant que l'événement `ready` du module `app` soit émis.

### `app.getVersion()`

Retourne `String` - La version de l'application chargée. Si aucune version n'est trouvée dans le fichier `package.json` de l'application, la version du bundle courant ou de l'exécutable est renvoyée.

### `app.getName()`

Retourne `String` - Le nom de l'application, qui est écrit dans le fichier `package.json` .

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Vous devriez dans la plupart des cas renseigner également un champ `productName`, qui contient le nom complet et capitalisé de votre application, et qui sera préféré à `name` par Electron.

**[Déprécié ](modernization/property-updates.md)**

### `app.setName(name)`

* `name` String

Remplace le nom de l'application actuelle.

**[Déprécié ](modernization/property-updates.md)**

### `app.getLocale()`

Retourne `String` - La localisation actuelle de l'application. Les valeurs possibles retournées sont documentées [ici](locales.md).

Pour définir la localisation, utilisez un paramètre de ligne de commande au démarrage de l'application, que vous trouverez [ici](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Remarque :** À la distribution de votre application empaquetée, vous devrez également inclure le dossier `locales`.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `String` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Ajoute le `path` à la liste des documents récents.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Efface la liste des documents récents.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`. Si vous voulez que votre application gère les liens `electron://`, appelez cette méthode avec `electron` comme paramètre.
* `path` String (facultatif) *Windows* - `process.execPath` par défaut
* `args` String[] (facultatif) *Windows* - Un tableau vide par défaut

Returns `Boolean` - Si l'appel a réussi.

Cette méthode définit l'exécutable courant comme gestionnaire par défaut pour un protocole. (par exemple le modèle URI). Il vous permet d'intégrer votre application plus en profondeur dans le système d'exploitation. Une fois enregistré, tous les liens avec `votre-protocole://` seront ouverts avec l'exécutable courant. L'ensemble du lien, y compris le protocole, sera transmis en paramètre à votre application.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Remarque:** Sur macOS, vous ne pouvez enregistrer que les protocoles qui ont été ajoutés à votre application `info.plist`, qui ne peut pas être modifié au moment de l'exécution. Vous pouvez cependant changer le fichier avec un simple éditeur de texte ou un script pendant la compilation. Veuillez vous référer à la [documentation d'Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) pour plus de détails.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications. In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

L'API utilise en interne le registre de Windows ainsi que LSSetDefaultHandlerForURLScheme.

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

Retourne `Boolean`

Cette méthode vérifie si l'exécutable courant est le gestionnaire par défaut d'un protocole (par exemple le modèle URI). Si c'est le cas, il retournera true. Sinon, il retournera false.

**Remarque:** Sur macOS, vous pouvez utiliser cette méthode pour vérifier si l'application a bien été enregistré comme gestionnaire de protocole par défaut pour un protocole. Vous pouvez également confirmer cela en vérifiant `~/Library/Preferences/com.apple.LaunchServices.plist` sur votre machine macOS. Veuillez vous référer à la [documentation d'Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) pour plus de détails.

L'API utilise en interne le registre de Windows ainsi que LSCopyDefaultHandlerForURLScheme.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Tableau d'objets `Task`

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the Jump List on Windows.

`tasks` est un tableau d’objets [`Task`](structures/task.md).

Returns `Boolean` - Si l'appel a réussi.

**Remarque :** Si vous souhaitez personnaliser encore plus la JumpList, utilisez `app.setJumpList(categories)` à la place.

### `app.getJumpListSettings()` *Windows*

Retourne `Object`:

* `minItems` Integer - Le nombre minimum d'éléments qui seront affichés dans la JumpList (pour une description plus détaillée de cette valeur, voir les [documentations MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. Ces éléments ne doivent pas être ajoutés de nouveau à la JumpList dans l'appel **suivant** à `app.setJumpList()`, Windows n'affichera aucune catégorie personnalisée qui contient les éléments supprimés.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array of `JumpListCategory` objects.

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

La valeur renvoyée par cette méthode indique si cette instance de votre application a obtenu le verrou ou non. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

Par exemple : cette méthode renvoie `true` si votre process est l'instance principale de votre application, et votre application doit continuer de charger. Elle renvoie `false` si votre process devrait quitter immédiatement, puisqu'il a envoyé ses paramètres à une instance qui possède déjà le verrou.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

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
* `userInfo` any - App-specific state to store for use by another device.
* `webpageURL` String (facultatif) - La page web à charger dans un navigateur si aucune application appropriée n'est installée sur l'autre périphérique de reprise. Le protocole doit être `http` ou `https`.

Créée un `NSUserActivity` et le défini en tant qu'activité courante. Après cela, l'activité devient éligible à la fonction [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sur l'autre périphérique.

### `app.getCurrentActivityType()` *macOS*

Retourne `String` - le type de l’activité en cours d’exécution.

### `app.invalidateCurrentActivity()` *macOS*

Invalide l'activité [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) courante de l'utilisateur.

### `app.resignCurrentActivity()` *macOS*

Marks the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity as inactive without invalidating it.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` any - App-specific state to store for use by another device.

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

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - L'état des fonctions graphiques de `chrome://gpu/`.

**Note:** This information is only usable after the `gpu-info-update` event is emitted.

### `app.getGPUInfo(infoType)`

* `infoType` String - Can be `basic` or `complete`.

Returns `Promise<unknown>`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). Cela inclut les informations de version et driver montrées sur la page `chrome://gpu`.

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

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

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

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

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

### `app.showAboutPanel()` *macOS* *Linux*

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` *macOS* *Linux*

* `options` Objet 
  * `applicationName` String (optional) - Nom de l'application.
  * `applicationVersion` String (optional) - Version de l'application.
  * `copyright` String (optional) - Information copyright.
  * `version` String (optional) *macOS* - The app's build version number.
  * `credits` String (optional) *macOS* - Credit information.
  * `authors` String[] (optional) *Linux* - List of app authors.
  * `website` String (optional) *Linux* - The app's website.
  * `iconPath` String (optional) *Linux* - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio.

Configure les options de la fenêtre À propos de. This will override the values defined in the app's `.plist` file on MacOS. Voir [la documentation Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) pour de plus amples informations. On Linux, values must be set in order to be shown; there are no defaults.

### `app.isEmojiPanelSupported()`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel()` *macOS* *Windows*

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *mas*

* `bookmarkData` String - Les données de marque-page encodées en base64 renvoyées par les méthodes `dialog.showOpenDialog` où `dialog.showSaveDialog`.

Retourne `Fonction` - Cette fonction **doit** être appelée une fois que vous avez fini d'accéder au fichier de sécurité utilisé. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Commence à accéder au fichier.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Commencez à accéder à une ressource périmée de sécurité. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.enableSandbox()` *Expérimental*

Active le mode "full sandbox" dans l'application.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.isInApplicationsFolder()` *macOS*

Renvoie un `Boolean` - Vérifie si l'application est actuellement exécutée depuis le dossier Application du système. A utiliser avec `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder([options])` *macOS*

* `options` Object (facultatif) 
  * `conflictHandler` Function<boolean> (optional) - A handler for potential conflict in move failure. 
    * `conflictType` String - The type of move conflict encountered by the handler; can be `exists` or `existsAndRunning`, where `exists` means that an app of the same name is present in the Applications directory and `existsAndRunning` means both that it exists and that it's presently running.

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** Cette méthode renvoie des erreurs si quelque chose d'autre qu'une erreur utilisateur fait échouer le déplacement. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. Le message contenu dans l'erreur devrait être suffisamment informatif pour que vous puissiez déterminer précisément quel est le problème.

By default, if an app of the same name as the one being moved exists in the Applications directory and is *not* running, the existing app will be trashed and the active app moved into its place. If it *is* running, the pre-existing running app will assume focus and the the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior. i.e. returning `false` will ensure no further action is taken, returning `true` will result in the default behavior and the method continuing.

Par exemple :

```js
app.moveToApplicationsFolder({
  conflictHandler: (conflictType) => {
    if (conflictType === 'exists') {
      return dialog.showMessageBoxSync({
        type: 'question',
        buttons: ['Halt Move', 'Continue Move'],
        defaultId: 0,
        message: 'An app of this name already exists'
      }) === 1
    }
  }
})
```

Would mean that if an app already exists in the user directory, if the user chooses to 'Continue Move' then the function would continue with its default behavior and the existing app will be trashed and the active app moved into its place.

## Propriétés

### `app.accessibilitySupportEnabled` *macOS* *Windows*

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

Cette API doit être appelée après l'émission de l'événement `ready` .

**Note:** Le rendu de l'arbre d'accessibilité peut affecter de manière significative les performances de votre application. Il ne devrait pas être activé par défaut.

### `app.applicationMenu`

A `Menu | null` property that returns [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.badgeCount` *Linux* *macOS*

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

**Note :** le launcher Unity requiert la présence d'un fichier `.desktop` pour fonctionner, pour de plus amples informations, lisez le document [Intégration de l'environnement de bureau](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.commandLine` *Readonly*

A [`CommandLine`](./command-line.md) object that allows you to read and manipulate the command line arguments that Chromium uses.

### `app.dock` *macOS* *Readonly*

A [`Dock`](./dock.md) object that allows you to perform actions on your app icon in the user's dock on macOS.

### `app.isPackaged` *Readonly*

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.

### `app.name`

A `String` property that indicates the current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercase name, according to the npm modules spec. Vous devriez dans la plupart des cas renseigner également un champ `productName`, qui contient le nom complet et capitalisé de votre application, et qui sera préféré à `name` par Electron.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level. It is useful for ensuring that your entire app has the same user agent. Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation. The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed. This property impacts which native modules you can use in the renderer process. For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).