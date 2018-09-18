# autoUpdater

> Permet aux application de se mettre à jour automatiquement d'elles-mêmes.

Processus : [Principal](../glossary.md#main-process)

**See also: [A detailed guide about how to implement updates in your application](../tutorial/updates.md).**

## Avertissement sur les plateformes

Actuellement, seuls MacOS et Windows sont supportés. Il n' y a pas de support intégré pour la mise à jour automatique sous Linux, il est donc recommandé d'utiliser le gestionnaire de paquetages de la distribution pour mettre à jour votre application.

En outre, il y a quelques différences subtiles sur chaque plateforme :

### macOS

Sur macOS, le module `autoUpdater` repose sur [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), ce qui signifie que vous n'avez pas besoin d'une installation spécifique pour le faire fonctionner. Pour les besoins du côté serveur, vous pouvez lire [Le support du serveur](https://github.com/Squirrel/Squirrel.Mac#server-support). Notez que l'[App Transport Securité](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) s'applique à toutes les demandes formulées dans le cadre du processus de mise à jour. Les applications qui ont besoin de désactiver l'ATS peut ajouter la clé `NSAllowsArbitraryLoads` à leur fichier plist.

**Remarque :** Votre application doit être signée pour pouvoir se mettre à jour automatiquement sur macOS. Il s'agit d'une exigence de `Squirrel.Mac`.

### Windows

Sur Windows, vous devrez installer votre application sur la machine de l'utilisateur avant de pouvoir utiliser `autoUpdater`. Il est donc recommandé d'utiliser [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) ou le package [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) pour générer un installateur Windows.

En utilisant [electron-winstaller](https://github.com/electron/windows-installer) ou [electron-forge](https://github.com/electron-userland/electron-forge), assurez-vous de ne pas essayer de mettre à jour votre application [à sa première exécution](https://github.com/electron/windows-installer#handling-squirrel-events) (voir aussi [cette question pour plus d'information](https://github.com/electron/electron/issues/7155)). Il est également recommandé d'utiliser [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) pour avoir les raccourcis bureau pour votre application.

L'installateur généré avec Squirrel va créer une icône de raccourci avec un [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) dans le format `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`. Voici deux exemples : `com.squirrel.slack.Slack` et `com.squirrel.code.Code`. Vous devez utiliser le même ID pour votre application qu'avec l'API `app.setAppUserModelId`, sinon Windows ne sera pas en mesure d'épingler correctement votre application dans la barre des tâches.

Contrairement à Squirrel.Mac, Windows peut héberger des mises à jour sur S3 ou tout autre hôte de fichiers statiques. Vous pouvez lire les documents de [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) pour obtenir plus de détails sur le fonctionnement de Squirrel.Windows.

## Événements

L'objet `autoUpdater` émet les événements suivants :

### Événement : 'error'

Retourne :

* `error` Error

Émis lorsqu’il y a une erreur pendant la mise à jour.

### Événement : 'checking-for-update'

Émis lors de la vérification du commencement d'une mise à jour.

### Événement : 'update-available'

Émis lorsqu’il y a une mise à jour disponible. La mise à jour est téléchargé automatiquement.

### Événement : 'update-not-available'

Émis quand il n’y a aucune mise à jour disponible.

### Événement : 'update-downloaded'

Retourne :

* `event` Événement
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Émis lorsqu'une mise à jour a été téléchargée.

Sur Windows, seulement `releaseName` est disponible.

### Event: 'before-quit-for-update'

This event is emitted after a user calls `quitAndInstall()`.

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.

## Méthodes

L'objet `autoUpdater` dispose des méthodes suivantes :

### `autoUpdater.setFeedURL(options)`

* `options` Objet 
  * `url` String
  * `headers` Objet (facultatif) *macOS* - en-têtes de requête HTTP.
  * `serverType` String (facultatif) *macOS* - Soit `json` ou `default`, voir le README [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) pour plus d’informations.

Définit l'`url` et initialise l'auto updater.

### `autoUpdater.getFeedURL()`

Retourne `String` - L'URL de flux des mises à jour.

### `autoUpdater.checkForUpdates()`

Demande au serveur s’il y a une mise à jour. Vous devez appeler `setFeedURL` avant d’utiliser cette API.

### `autoUpdater.quitAndInstall()`

Redémarre l'application et installe la mise à jour après qu'elle soit téléchargée. Cette méthode doit être appelé seulement après que `update-downloaded` soit émis.

Derrière l'appel de `autoUpdater.quitAndInstall()` fermera toutes les applications windows en premier, appellera automatiquement `app.quit()` après que toutes les fenêtres aient été fermées.

**Remarque :** Si l’application est fermée sans que cette API soit appelée après que l’événement `update-downloaded` ait été émis, l’application sera toujours remplacée par celle mise à jour lors de la prochaine exécution.