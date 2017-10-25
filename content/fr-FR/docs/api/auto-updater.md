# autoUpdater

> Permet aux application de se mettre à jour automatiquement d'elles-mêmes.

Processus : [Main](../glossary.md#main-process)

Le module `autoUpdater` fournit une interface pour le framework [Squirrel](https://github.com/Squirrel).

Vous pouvez lancer rapidement un serveur multi-plateforme de publication pour distribuer votre application en utilisant l'un de ces projets :

* [nuts](https://github.com/GitbookIO/nuts) : *Un serveur simple pur vos applications, utilisant GitHub comme backend. Mise à jour automatique avec Squirrel (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server) : *Un serveur complet et auto-hébergé pour les applications Electron, compatible avec auto-updater*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server) : *Un simple serveur node.js pour Squirrel.Mac et Squirrel.Windows utilisant les versions publiées sur GitHub*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server) : *Une simple application PHP pour Squirrel.Windows qui lit les mises à jour depuis un dossier. Prend en charge les mies à jour delta.*

## Avertissement sur les plateformes

Bien que `autoUpdater` fournit une API uniforme pour différentes plateformes, il y a encore quelques différences subtiles sur chaque plateforme.

### macOS

Sur macOS, le module `autoUpdater` repose sur [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), ce qui signifie que vous n'avez pas besoin d'une installation spécifique pour le faire fonctionner. Pour les besoins du côté serveur, vous pouvez lire [Le support du serveur](https://github.com/Squirrel/Squirrel.Mac#server-support). Notez que l'[App Transport Securité](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) s'applique à toutes les demandes formulées dans le cadre du processus de mise à jour. Les applications qui ont besoin de désactiver l'ATS peut ajouter la clé `NSAllowsArbitraryLoads` à leur fichier plist.

**Remarque :** Votre application doit être signée pour pouvoir se mettre à jour automatiquement sur macOS. Il s'agit d'une exigence de `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) or the [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) package to generate a Windows installer.

When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. You have to use the same ID for your app with `app.setAppUserModelId` API, otherwise Windows will not be able to pin your app properly in task bar.

Unlike Squirrel.Mac, Windows can host updates on S3 or any other static file host. You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.

### Linux

There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

## Événements

The `autoUpdater` object emits the following events:

### Événement : 'error'

Retourne :

* `error` Error

Emitted when there is an error while updating.

### Événement : 'checking-for-update'

Emitted when checking if an update has started.

### Événement : 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Événement : 'update-not-available'

Emitted when there is no available update.

### Événement : 'update-downloaded'

Retourne :

* `event` Event
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