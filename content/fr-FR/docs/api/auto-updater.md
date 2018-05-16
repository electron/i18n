# autoUpdater

> Permet aux apps de se mettre automatiquement à jour d'elles mêmes.

Processus : [Principal](../glossary.md#main-process)

The `autoUpdater` module provides an interface for the [Squirrel](https://github.com/Squirrel) framework.

You can quickly launch a multi-platform release server for distributing your application by using one of these projects:

* [nuts](https://github.com/GitbookIO/nuts): *A smart release server for your applications, using GitHub as a backend. Auto-updates with Squirrel (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *A fully featured, self-hosted release server for electron applications, compatible with auto-updater*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *A simple node.js server for Squirrel.Mac and Squirrel.Windows which uses GitHub releases*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *A simple PHP application for Squirrel.Windows which reads updates from a folder. Supports delta updates.*

## Avertissement sur les plateformes

Though `autoUpdater` provides a uniform API for different platforms, there are still some subtle differences on each platform.

### macOS

Sur macOS, le module `autoUpdater` repose sur [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), ce qui signifie que vous n'avez pas besoin d'une installation spécifique pour le faire fonctionner. Pour les besoins du côté serveur, vous pouvez lire [Le support du serveur](https://github.com/Squirrel/Squirrel.Mac#server-support). Notez que l'[App Transport Securité](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) s'applique à toutes les demandes formulées dans le cadre du processus de mise à jour. Les applications qui ont besoin de désactiver l'ATS peut ajouter la clé `NSAllowsArbitraryLoads` à leur fichier plist.

**Remarque :** Votre application doit être signée pour pouvoir se mettre à jour automatiquement sur macOS. Il s'agit d'une exigence de `Squirrel.Mac`.

### Windows

Sur Windows, vous devrez installer votre application sur la machine de l'utilisateur avant de pouvoir utiliser `autoUpdater`. Il est donc recommandé d'utiliser [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) ou le package [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) pour générer un installateur Windows.

En utilisant [electron-winstaller](https://github.com/electron/windows-installer) ou [electron-forge](https://github.com/electron-userland/electron-forge), assurez-vous de ne pas essayer de mettre à jour votre application [à sa première exécution](https://github.com/electron/windows-installer#handling-squirrel-events) (voir aussi [cette question pour plus d'information](https://github.com/electron/electron/issues/7155)). Il est également recommandé d'utiliser [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) pour avoir les raccourcis bureau pour votre application.

L'installateur généré avec Squirrel va créer une icône de raccourci avec un [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) dans le format `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`. Voici deux exemples : `com.squirrel.slack.Slack` et `com.squirrel.code.Code`. Vous devez utiliser le même ID pour votre application qu'avec l'API `app.setAppUserModelId`, sinon Windows ne sera pas en mesure d'épingler correctement votre application dans la barre des tâches.

Contrairement à Squirrel.Mac, Windows peut héberger des mises à jour sur S3 ou tout autre hôte de fichiers statiques. Vous pouvez lire les documents de [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) pour obtenir plus de détails sur le fonctionnement de Squirrel.Windows.

### Linux

There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

## Événements

The `autoUpdater` object emits the following events:

### Événement : 'error'

Retourne :

* `error` Error

Emitted when there is an error while updating.

### Event: 'checking-for-update'

Emitted when checking if an update has started.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Event: 'update-not-available'

Emitted when there is no available update.

### Event: 'update-downloaded'

Retourne :

* `event` Événement
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Méthodes

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders` Object *macOS* (optional) - HTTP request headers.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.