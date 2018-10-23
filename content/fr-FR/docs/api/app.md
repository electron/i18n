# app

> Contrôle le cycle de vie des événements de votre application.

Processus : [Main](../glossary.md#main-process)

L’exemple suivant montre comment quitter l’application lorsque la dernière fenêtre est fermée :

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Événements

L'objet `app` émet les événements suivants :

### Événement : 'will-finish-launching'

Émis lorsque l'application a terminé son démarrage de base. Sur Windows et Linux, l'événement `will-finish-launching` est le même que l'événement `ready`. Sur macOS, cet événement représente la notification `applicationWillFinishLaunching` de `NSApplication`. Vous allez habituellement mettre en place des listeners pour les événements `open-file` et `open-url` ici, et lancer le reporteur d'incident et la mise à jour automatique.

In most cases, you should do everything in the `ready` event handler.

### Événement : 'ready'

Retourne :

* `launchInfo` Object *macOS*

Émis lorsqu'Electron a terminé l’initialisation. Sur macOs, `launchInfo` détient le `userInfo` de `NSUserNotification` qui a été utilisé pour ouvrir l'application si elle a été lancée depuis le centre de notification. Vous pouvez appeler `app.isReady()` pour vérifier si cet événement a déjà été déclenché.

### Événement : 'window-all-closed'

Émis lorsque toutes les fenêtres ont été fermées.

Si vous n'être pas abonné à cet événement et que toutes les fenêtres sont fermées, le comportement par défaut consiste à quitter l'application. Toutefois, si vous vous abonnez, vous pouvez contrôler le fait que l'application se ferme ou non. Si l'utilisateur appuie sur `Cmd + Q`, ou le développeur appelle `app.quit()`, Electron essaie d'abord de fermer toutes les fenêtres et puis émet l'événement `will-quit` et dans ce cas, l'événement `window-all-closed` ne sera pas émis.

### Événement : 'before-quit'

Renvoie :

* `event` Événement

Émis avant que l'application ferme ses fenêtres. Appeler `event.preventDefault()` permet de stopper le comportement par défaut, qui quitte l'application.

**Remarque :** Si l'interruption de l'application a été initié par `autoUpdater.quitAndInstall()`, alors l'événement `before-quit` est émis *après* avoir émis l'événement `close` sur toutes les fenêtres et leur fermeture.

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

Émis lorsque l’utilisateur souhaite ouvrir une URL avec l’application. Le fichier `Info.plist` de votre application doit définir le schéma d'URL dans la clé `CFBundleURLTypes`, et définir la valeur `AtomApplication` dans `NSPrincipaleClass`.

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
* `userInfo` Object - Contient l'état d'app spécifique stocké par l'activité sur un autre périphérique.

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
* `userInfo` Object - Contient l'état spécifique à l'application stocké par l'activité.

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)après qu'une activité depuis un périphérique différent a bien repris.

### Événement : 'update-activity-state' *macOS*

Retourne :

* `event` Événement
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contient l'état spécifique à l'application stocké par l'activité.

Émis lorsque la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) va être repris par un autre appareil. Si vous avez besoin de mettre à jour l'état à transférer, vous devez appeler `event.preventDefault()` immédiatement, construire un nouveau dictionnaire `userInfo` et appeler `app.updateCurrentActiviy()` en suivant. Dans le cas contraire, l'opération échouera et `continue-activity-error` sera appelée.

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
const {app} = require('electron')

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
const {app} = require('electron')

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

Le comportement par défaut consiste à annuler toutes les authentifications, pour remplacer cela vous devez empêcher le comportement par défaut avec `event.preventDefault()` et appelez le `callback(username, password)` avec les informations d’identification.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Événement : 'gpu-process-crashed'

Retourne :

* `event` Event
* `killed` Boolean

Émis lorsque le processus gpu crash ou est interrompu.

### Événement : 'accessibility-support-changed' *macOS* *Windows*

Retourne :

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` quand le support de l'accessibilité de Chrome est activé, sinon `false`.

Émis lorsque le support de l’accessibilité du Chrome change. Cet événement se déclenche lorsque les technologies d’assistance, tels que les lecteurs d’écran sont activés ou désactivés. Voir https://www.chromium.org/developers/design-documents/accessibility pour plus de détails.

### Event: 'session-created'

Retourne :

* `event` Événement
* `session` [Session](session.md)

Émis lorsque Electron vient de créer une nouvelle `session`.

```javascript
const {app} = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Retourne :

* `event` Event
* `argv` String[] - un tableau d’arguments de la deuxième instance de la ligne de commande
* `workingDirectory` String - Le répertoire de travail de la deuxième instance

This event will be emitted inside the primary instance of your application when a second instance has been executed. `argv` est un tableau d’arguments de ligne de commande de la deuxième instance, et `workingDirectory` est son répertoire de travail courant. Les applications répondent habituellement à cela en faisant de leur fenêtre principale, une fenêtre centrée et non réduite au minimum.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

## Méthodes

L'objet `app` dispose des méthodes suivantes :

**Remarque :** Certaines méthodes sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

### `app.quit()`

Essayez de fermer toutes les fenêtres. L’événement `before-quit` sera émis d’abord. Si toutes les fenêtres sont fermées avec succès, l’événement `will-quit` sera émis et mettra fin à l’application par défaut.

Cette méthode garantit que tous les écouteurs d’événements de `beforeunload` et `unload` seront correctement exécutées. Il est possible qu’une fenêtre annule la fermeture en retournant `false` dans l'écouteur d’événement `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (facultatif)

Termine immédiatement avec `exitCode`. `exitCode` par défaut vaut 0.

Toutes les fenêtres se ferment immédiatement sans prévenir l’utilisateur et les événements `before-quit` et `will-quit` ne seront pas émis.

### `app.relaunch([options])`

* `options` Object (facultatif) 
  * `args` String[] - (facultatif)
  * `execPath` String (facultatif)

Relance l’application lorsque l’instance en cours se termine.

Par défaut, la nouvelle instance utilisera le même répertoire de travail et les arguments de ligne de commande avec l’instance actuelle. Si `args` est spécifié, `args` sera passé comme argument de ligne de commande à la place. Lorsque `execPath` est spécifié, `execPath` sera exécuté pour redémarrer à la de l’application actuelle.

Notez bien que cette méthode ne ferme pas l'application, vous devez appeler `app.quit` ou `app.exit` après avoir appelé `app.relaunch` pour faire redémarrer votre application.

Quand `app.relaunch` est appelé plusieurs fois, plusieurs instances vont être appelées après que l'instance actuelle soit fermée.

Voici un exemple qui redémarre une nouvelle instance immédiatement en ajoutant un nouvel argument de ligne de commande à la nouvelle instance :

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Retourne `Boolean` - `true` si Electron a fini de s'initialiser, `false` sinon.

### `app.whenReady()`

Returns `Promise` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

Sur Linux, met le focus sur la première fenêtre visible. Sur MacOS, rend l'application active. Sur windows met le focus sur la première fenêtre de l'application.

### `app.hide()` *macOS*

Masque toutes les fenêtres de l'application sans les minimiser.

### `app.show()` *macOS*

Montre les fenêtres de l'application après qu'elles aient été cachées. Ne met pas automatiquement le focus sur ces dernières.

### `app.getAppPath()`

Retourne `String` - Répertoire courant de l'application.

### `app.getPath(name)`

* `name` String

Retourne `String` - Un chemin vers un répertoire spécial ou un fichier associé au `nom`. En cas d’échec, une `Erreur` est générée.

Vous pouvez demander les chemins suivants sous le nom :

* `home` Répertoire d'accueil de l'utilisateur.
* `appData` Dossiers de donnée des applications pour chaque utilisateur, qui pointe par défaut vers: 
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
* `options` Object (facultatif) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 sur *Linux*, 32x32 sur *Windows*, non pris en charge sur *macOS*.
* `callback` Function 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Récupère une icône associée à un chemin.

Sous *Windows*, il y a 2 sortes d’icônes :

* Icônes associées à certaines extensions de fichier, comme `.mp3`, `.png`, etc.
* Icônes à l’intérieur du fichier lui-même, comme les `.exe`, `.dll`, `.ico`.

Sur *Linux* et *macOS*, les icônes dépendent de l'application associée au type MIME du fichier.

### `app.setPath(name, path)`

* `name` String
* `path` String

Remplace le chemin `path` par un répertoire spécial ou un fichier associé à `name`. Si le chemin spécifie un répertoire qui n'existe pas, le répertoire sera créé par cette méthode. En cas d'échec, une `Error` sera levée.

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

Retourne `String` - La localisation actuelle de l'application. Les valeurs possibles retournées sont documentées [ici](locales.md).

Pour définir la localisation, utilisez un paramètre de ligne de commande au démarrage de l'application, que vous trouverez [ici](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Remarque :** À la distribution de votre application empaquetée, vous devrez également inclure le dossier `locales`.

**Remarque :** Sous Windows, vous devrez l’appeler après que l'événement `prêt` soit émit.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Ajoute le `path` à la liste des documents récents.

Cette liste est contrôlée par le système d'exploitation. Sous Windows, vous pouvez consulter la liste à partir de la barre des tâches et sous macOS, vous pouvez la consulter à partir du menu dans le dock.

### `app.clearRecentDocuments()` *macOS* *Windows*

Efface la liste des documents récents.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Le nom de votre protocole, sans le préfixe `://`. Si vous voulez que votre application gère les liens `electron://`, appelez cette méthode avec `electron` comme paramètre.
* `path` String (facultatif) *Windows* - `process.execPath` par défaut
* `args` String[] (facultatif) *Windows* - Un tableau vide par défaut

Returns `Boolean` - Si l'appel a réussi.

Cette méthode définit l'exécutable courant comme gestionnaire par défaut pour un protocole. (par exemple le modèle URI). Il vous permet d'intégrer votre application plus en profondeur dans le système d'exploitation. Une fois enregistré, tous les liens avec `votre-protocole://` seront ouverts avec l'exécutable courant. L'ensemble du lien, y compris le protocole, sera transmis en paramètre à votre application.

Sous Windows, vous pouvez fournir des paramètres optionnels, le chemin d'accès à votre exécutable, et args, un tableau d'arguments à passer à votre exécutable lorsqu'il se lance.

**Remarque:** Sur macOS, vous ne pouvez enregistrer que les protocoles qui ont été ajoutés à votre application `info.plist`, qui ne peut pas être modifié au moment de l'exécution. Vous pouvez cependant changer le fichier avec un simple éditeur de texte ou un script pendant la compilation. Veuillez vous référer à la [documentation d'Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) pour plus de détails.

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

Ajoute `tasks` dans la catégorie [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) de la JumpList sur Windows.

`tasks` est un tableau d’objets [`Task`](structures/task.md).

Returns `Boolean` - Si l'appel a réussi.

**Remarque :** Si vous souhaitez personnaliser encore plus la JumpList, utilisez `app.setJumpList(categories)` à la place.

### `app.getJumpListSettings()` *Windows*

Retourne `Object`:

* `minItems` Integer - Le nombre minimum d'éléments qui seront affichés dans la JumpList (pour une description plus détaillée de cette valeur, voir les [documentations MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Tableau d'objets `JumpListItem` qui correspondent à des éléments que l'utilisateur a explicitement retirés des catégories personnalisées de la JumpList. Ces éléments ne doivent pas être ajoutés de nouveau à la JumpList dans l'appel **suivant** à `app.setJumpList()`, Windows n'affichera aucune catégorie personnalisée qui contient les éléments supprimés.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) ou `null` - Tableau d'objets `JumpListCategory`.

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
const {app} = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // A un nom, donc `type` est mis par défaut en "custom"
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
  { // Pas de nom et pas de type, donc `type` est mis par défaut en "tasks"
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

### `app.requestSingleInstanceLock()`

Retourne `Boolean`

Cette méthode fait de votre application une Application à Instance Unique : au lieu d'autoriser plusieurs instances parallèles de votre application, cela permet de s'assurer qu'une seule est active, et les autres instances envoient un signal à celle-ci puis se terminent.

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

Sur macOS, dans Finder, le système impose automatiquement l'unicité de l'instance de votre application lorsqu'un utilisateur tente d'en ouvrir une deuxième, et les événements `open-file` et `open-url` sont ainsi émis. Cependant, quand l'utilisateur démarre votre application en ligne de commandes, le mécanisme d'unicité d'instance est contourné et vous devez alors utiliser cette méthode pour l'imposer.

Un exemple d'activation de la fenêtre de l'instance primaire lorsqu'une seconde instance démarre :

```javascript
const {app} = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Retourne `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - État spécifique de l'application à stocker pour une utilisation par un autre périphérique.
* `webpageURL` String (facultatif) - La page web à charger dans un navigateur si aucune application appropriée n'est installée sur l'autre périphérique de reprise. Le protocole doit être `http` ou `https`.

Créée un `NSUserActivity` et le défini en tant qu'activité courante. Après cela, l'activité devient éligible à la fonction [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sur l'autre périphérique.

### `app.getCurrentActivityType()` *macOS*

Retourne `String` - le type de l’activité en cours d’exécution.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalide l'activité [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) courante de l'utilisateur.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Identifie de façon unique l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - État spécifique de l'application à stocker pour une utilisation par un autre périphérique.

Modifie l'activité en cours si son type correspond à `type`, en fusionnant les entrées de `userInfo` dans son dictionnaire `userInfo` courant.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Change le [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) à `id`.

### `app.importCertificate(options, callback)` *LINUX*

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

Retourne [`ProcessMetric[]`](structures/process-metric.md): un tableau d'objets `ProcessMetric` qui correspondent aux statistiques d'usage de la mémoire et du processeur par chacun des processus associé à l'application.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - L'état des fonctions graphiques de `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Returns `Boolean` - Si l'appel a réussi.

Définit le badge du compteur pour l'application courante. Régler le compte à `0>0` masquera le badge.

Sous macOS, il apparaît sur l'icône du dock. Sous Linux, il ne fonctionne que pour le launcher Unity.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Retourne `Integer` - La valeur actuelle affichée sur le badge du compteur.

### `app.isUnityRunning()` *Linux*

Retourne `Boolean` - Si l'environnement de bureau actuel est Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (facultatif) 
  * `path` String (facultatif) *Windows* - Le chemin de l'exécutable à comparer. `process.execPath` par défaut.
  * `args` String[] (facultatif) *Windows* - Les arguments de la ligne de commandes à comparer. Un tableau vide par défaut.

Si les options `path` et `args` sont fournies à `app.setLoginItemSettings` alors les mêmes arguments doivent être passés à `openAtLogin` pour être correctement initialisés.

Retourne `Object`:

* `openAtLogin` Boolean - `true` si l'application est configurée pour démarrer à l'ouverture de session.
* `openAsHidden` Boolean *macOS* - `true` si l'application est configurée pour s'ouvrir comme cachée à l'ouverture de session. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` si l'application est automatiquement ouverte à l'ouverture de session. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` si l'application est ouverte comme un programme caché à l'ouverture de session. Cela indique que l'application ne devrait pas ouvrir la moindre fenêtre au démarrage. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` si l'application est ouverte comme un programme qui devrait restaurer l'état de la session précédente à l'ouverture de session. Cela indique que l'application devrait restaurer les fenêtres qui étaient ouvertes lorsque celle-ci a été précédemment fermée. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Objet 
  * `openAtLogin` Boolean (facultatif) - `true` pour ouvrir l'application à l'ouverture de session, `false` pour retirer l'application de la liste des programmes démarrés à l'ouverture de session. `false` par défaut.
  * `openAsHidden` Boolean (facultatif) *macOS* - `true` pour ouvrir l’application comme cachée. `false` par défaut. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. Ce paramètre n'est pas disponible sur les [MAS builds](../tutorial/mac-app-store-submission-guide.md).
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

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Active ou désactive le rendu de [l'arbre d'accessibilité](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Active manuellement le support de l'accessibilité de Chrome, permettant de mettre à disposition des utilisateurs les commutateurs d'accessibilité dans les paramètres de l'application. Voir https://www.chromium.org/developers/design-documents/accessibility pour de plus amples informations. Désactivé par défaut.

**Note:** Le rendu de l'arbre d'accessibilité peut affecter de manière significative les performances de votre application. Il ne devrait pas être activé par défaut.

### `app.setAboutPanelOptions(options)` *macOS*

* `options` Objet 
  * `applicationName` String (optional) - Nom de l'application.
  * `applicationVersion` String (optional) - Version de l'application.
  * `copyright` String (optional) - Information copyright.
  * `credits` String (optional) - Information crédit.
  * `version` String (optional) - Numéro de version de l'application.

Configure les options de la fenêtre À propos de. Cela surchargera les valeurs définies dans le fichier `.plist` de l'application. Voir [la documentation Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) pour de plus amples informations.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS*

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - L'argument à ajouter à la ligne de commande

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** Ceci n'affecte pas `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

Cette méthode peut seulement être appelée avant que app soit prêt.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` *macOS*

* `type` String (facultatif) - Peut être `critical` ou `informational`. Par défaut : `informational`

Lorsque la `critical` est passé, l’icône du dock rebondira jusqu'à ce que l’application redevienne active ou que la requête est annulée.

Lorsque `informationnal` est passé, l’icône du dock rebondira pendant une seconde. Toutefois, la requête reste active jusqu'à ce que l’application redevienne active ou que la demande est annulée.

Retourne `Integer` un ID représentant la requête.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Annule le rebond de l'`id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Fait rebondir la pile de téléchargements si le chemin d'accès se trouve le dossier Téléchargements.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Définit la chaîne de caractères à afficher dans la zone du badge du dock.

### `app.dock.getBadge()` *macOS*

Retourne `String` - Le texte du badge du dock.

### `app.dock.hide()` *macOS*

Masque l’icône du dock.

### `app.dock.show()` *macOS*

Affiche l’icône du dock.

### `app.dock.isVisible()` *macOS*

Retourne `Boolean` - Si l'icône du dock est visible. L'appel `app.dock.show()` est asynchrone, donc cette méthode peut ne pas retourner true immédiatement après cet appel.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Définit l’`image` associée à l'icône du dock.

## Propriétés

### `app.isPackaged`

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.