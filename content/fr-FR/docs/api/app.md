# application

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

Émis lorsque l'application a terminé son démarrage de base. Sur Windows et Linux, l'événement `will-finish-launching` est le même que l'événement `ready`. Sur macOS, cet événement représente la notification `applicationWillFinishLaunching` de `NSApplication`. Vous allez habituellement mettre en place des écouteurs pour les événements `open-file` et `open-url` ici, et lancer le reporteur d'incident et la mise à jour automatique.

Dans la plupart des cas, vous devriez tout faire dans le contrôleur de l'événement `ready`.

### Événement : 'ready'

Retourne :

* `launchInfo` Object *macOS*

Émis lorsqu'Electron a terminé l’initialisation. Sur macOs, `launchInfo` détient le `userInfo` de `NSUserNotification` qui a été utilisé pour ouvrir l'application si elle a été lancée depuis le centre de notification. Vous pouvez appeler `app.isReady()` pour vérifier si cet événement a déjà été déclenchée.

### Événement : 'window-all-closed'

Émis lorsque toutes les fenêtres ont été fermées.

Si vous n'être pas abonné à cet événement et que toutes les fenêtres sont fermées, le comportement par défaut consiste à quitter l'application. Toutefois, si vous vous abonnez, vous pouvez contrôler le fait que l'application se ferme ou non. Si l'utilisateur appuie sur `Cmd + Q`, ou le développeur appelle `app.quit()`, Electron essaie d'abord de fermer toutes les fenêtres et puis émet l'événement `will-quit` et dans ce cas, l'événement `window-all-closed` ne sera pas émit.

### Événement : 'before-quit'

Retourne :

* `event` Event

Émis avant que l'application ferme ses fenêtres. Appeler `event.preventDefault()` permet de stopper le comportement par défaut, qui quitte l'application.

**Remarque :** Si l'interruption de l'application a été initié par `autoUpdater.quitAndInstall()`, alors l'événement `before-quit` est émis *après* avoir émis l'événement `close` sur toutes les fenêtres et leur fermeture.

### Événement : 'will-quit'

Retourne :

* `event` Event

Émis quand toutes les fenêtres ont été fermées et que l'application va se fermer. Appeler `event.prevendDefault()` permet de stopper le comportement par défaut, qui quitte l'application.

Consultez la description de l’événement `window-all-closed` pour voir les différences entre les événements `will-quit` et `window-all-closed`.

### Événement : 'quit'

Retourne :

* `event` Event
* `exitCode` Integer

Émis lorsque l'application se quitte.

### Événement : 'open-file' *macOS*

Retourne :

* `event` Event
* `path` String

Émis lorsque l’utilisateur souhaite ouvrir un fichier avec l’application. L’événement `open-file` est habituellement émis lorsque l’application est déjà ouvert et le système d’exploitation souhaite réutiliser l’application pour ouvrir le fichier. `open-file` est également émis lorsqu’un fichier est déposé sur le dock et l’application n’est pas encore en cours d’exécution. Assurez-vous d’écouter l’événement `open-file` très tôt dans le démarrage votre l’application pour gérer ce cas (même avant que l’événement `ready` soit émis).

Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

Sur Windows, vous devrez analyser `process.argv` (dans le main process) pour obtenir le chemin d'accès.

### Événement : 'open-url' *macOS*

Retourne :

* `event` Event
* `url` String

Émis lorsque l’utilisateur souhaite ouvrir une URL avec l’application. Le fichier `Info.plist` de votre application doit définir le schéma d'URL dans la clé `CFBundleURLTypes`, et définir la valeur `AtomApplication` dans `NSPrincipaleClass`.

Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

### Événement : 'activate' *macOS*

Retourne :

* `event` Event
* `hasVisibleWindows` Boolean

Émis lorsque l'application est activée. Différentes actions peuvent déclencher cet événement, comme le lancement de l’application pour la première fois, essayer de relancer l’application lorsqu’elle est déjà en cours d’exécution, ou en cliquant sur l'icône du dock de l’application ou de l’icône de la barre des tâches.

### Événement : 'continue-activity' *macOS*

Retourne :

* `event` Event
* `type` String - Une chaîne de caractère identifiant l'activité. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contient l'état d'app spécifique stocké par l'activité sur un autre périphérique.

Émis au cours de la [procédure de transfert](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quand une activité depuis un périphérique différent veut reprendre. Vous devrez appeler `event.preventDefault()` si vous souhaitez gérer cet événement.

Une activité d'utilisateur peut être poursuivie seulement dans une application qui a le même identifiant d'équipe développeur que l'application d'origine de la source d'activité et qui prend en charge le type d'activité. La prise en charge d’activité types est spécifiée dans le `Info.plist` de l'application sous la clé `NSUserActivityType`.

### Événement : 'new-window-for-tab' *macOS*

Retourne :

* `event` Event

Émis lorsque l’utilisateur clique sur le bouton nouvel onglet native macOS. Le bouton nouvel onglet n’est visible que si l'actuel `BrowserWindow` a un `tabbingIdentifier`

### Événement : 'browser-window-blur'

Retourne :

* `event` Event
* `window` BrowserWindow

Émis lorsqu'un [browserWindow](browser-window.md) perd le focus.

### Événement : 'browser-window-focus'

Retourne :

* `event` Event
* `window` BrowserWindow

Émis lorsqu'un [browserWindow](browser-window.md) gagne le focus.

### Événement : 'browser-window-created'

Retourne :

* `event` Event
* `window` BrowserWindow

Émis lorsqu'un nouveau [browserWindow](browser-window.md) est créé.

### Événement : 'web-contents-created'

Retourne :

* `event` Event
* `webContents` WebContents

Émis lorsqu'un nouveau [webContents](web-contents.md) est créé.

### Événement 'certificate-error'

Retourne :

* `event` Event
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

* `event` Event
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

## Méthodes

L'objet `app` dispose des méthodes suivantes :

**Remarque :** Certaines méthodes sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

### `app.quit()`

Essayez de fermer toutes les fenêtres. L’événement `before-quit` sera émis d’abord. Si toutes les fenêtres sont fermées avec succès, l’événement `will-quit` sera émis et mettra fin à l’application par défaut.

Cette méthode garantit que tous les écouteurs d’événements de `beforeunload` et `unload` seront correctement exécutées. Il est possible qu’une fenêtre annule la fermeture en retournant `false` dans l'écouteur d’événement `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (facultatif)

Ferme immédiatement avec `exitCode`. `exitCode` est 0 par défaut.

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

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` *macOS*

Masque toutes les fenêtres de l'application sans les minimiser.

### `app.show()` *macOS*

Shows application windows after they were hidden. Does not automatically focus them.

### `app.getAppPath()`

Retourne `String` - Répertoire courant de l'application.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure an `Error` is thrown.

You can request the following paths by the name:

* `home` User's home directory.
* `appData` Per-user application data directory, which by default points to: 
  * `%APPDATA%` sur Windows
  * `$XDG_CONFIG_HOME` ou `~/.config` sur Linux
  * `~/Library/Application Support` on macOS
* `userData` The directory for storing your app's configuration files, which by default it is the `appData` directory appended with your app's name.
* `temp` Temporary directory.
* `exe` The current executable file.
* `module` The `libchromiumcontent` library.
* `desktop` The current user's Desktop directory.
* `documents` Directory for a user's "My Documents".
* `downloads` Directory for a user's downloads.
* `music` Directory for a user's music.
* `pictures` Directory for a user's pictures.
* `videos` Directory for a user's videos.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

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

Fetches a path's associated icon.

On *Windows*, there a 2 kinds of icons:

* Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
* Icons inside the file itself, like `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String
* `path` String

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, the directory will be created by this method. On failure an `Error` is thrown.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.setName(name)`

* `name` String

Remplace le nom de l'application actuelle.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows you have to call it after the `ready` events gets emitted.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows you can visit the list from the task bar, and on macOS you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Efface la liste des documents récents.

### `app.setAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Si l'appel a réussi.

This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

On Windows you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Si l'appel a réussi.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Retourne `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Tableau d'objets `Task`

Adds `tasks` to the [Tasks](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

Returns `Boolean` - Si l'appel a réussi.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` *Windows*

Retourne `Object`:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Nothing went wrong.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

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

### `app.makeSingleInstance(callback)`

* `callback` Function 
  * `argv` String[] - An array of the second instance's command line arguments
  * `workingDirectory` String - The second instance's working directory

Retourne `Boolean`.

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

`callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

The `callback` is guaranteed to be executed after the `ready` event of `app` gets emitted.

This method returns `false` if your process is the primary instance of the application and your app should continue loading. And returns `true` if your process has sent its parameters to another instance, and you should immediately quit.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Create myWindow, load the rest of the app, etc...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. Mappé sur [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Retourne `String` - le type de l’activité en cours d’exécution.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Object 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Function 
  * `result` Integer - Résultat de l'importation.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMemoryInfo()` *Deprecated*

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app. **Note:** This method is deprecated, use `app.getAppMetrics()` instead.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGpuFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Returns `Boolean` - Si l'appel a réussi.

Sets the counter badge for current app. Setting the count to `` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (facultatif) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Retourne `Object`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean - `true` if the app is set to open as hidden at login. This setting is only supported on macOS.
* `wasOpenedAtLogin` Boolean - `true` if the app was opened at login automatically. This setting is only supported on macOS.
* `wasOpenedAsHidden` Boolean - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is only supported on macOS.
* `restoreState` Boolean - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is only supported on macOS.

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is only supported on macOS.
  * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Par exemple :

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

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAboutPanelOptions(options)` *macOS*

* `options` Object 
  * `applicationName` String (optional) - Nom de l'application.
  * `applicationVersion` String (optional) - Version de l'application.
  * `copyright` String (optional) - Information copyright.
  * `credits` String (optional) - Information crédit.
  * `version` String (optional) - Numéro de version de l'application.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

This method can only be called before app is ready.

### `app.dock.bounce([type])` *macOS*

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

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

Définit le [menu du dock](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103) de l'application.

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Définit l’`image` associée à l'icône du dock.