# autoUpdater

> Permet aux application de se mettre à jour automatiquement d'elles-mêmes.

Processus : [Main](../glossary.md#main-process)

**Voir aussi : [Un guide détaillé à propos de l’implémentation des mises à jour dans votre application](../tutorial/updates.md).**

`autoUpdater` est un [EventEmitter][event-emitter].

## Avertissement sur les plateformes

Pour le moment, seuls macOS et Windows sont supportés. Il n'y a aucune prise en charge de l'auto-update sur Linux, il est donc recommandé d'utiliser le gestionnaire de paquets de votre distribution afin de mettre à jour votre application.

En outre, il y a quelques différences subtiles sur chaque plateforme :

### macOS

Sur macOS, le module `autoUpdater` repose sur [Squirrel.Mac][squirrel-mac], ce qui signifie que vous n'avez pas besoin d'une installation spécifique pour le faire fonctionner. Pour les besoins du côté serveur, vous pouvez lire [Le support du serveur][server-support]. Notez que l'[App Transport Securité](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) s'applique à toutes les demandes formulées dans le cadre du processus de mise à jour. Les applications qui ont besoin de désactiver l'ATS peut ajouter la clé `NSAllowsArbitraryLoads` à leur fichier plist.

**Note:** Votre application doit-être signée pour les mises à jour automatiques sur macOS. C'est un pré-requis de `Squirrel.Mac`.

### Windows

Sur Windows, vous devrez installer votre application sur la machine d'un utilisateur avant de pouvoir utiliser `autoUpdater`. Il est donc recommandé d'utiliser [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] ou le package [grunt-electron-installer][installer] pour générer un installateur Windows.

Lorsque vous utilisez [electron-winstaller][installer-lib] ou [electron-forge][electron-forge-lib], assurez-vous de ne pas essayer de mettre à jour votre application [à sa première exécution](https://github.com/electron/windows-installer#handling-squirrel-events) (voir aussi [ce problème pour plus d'information](https://github.com/electron/electron/issues/7155)). Il est également recommandé d'utiliser [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) pour avoir les raccourcis bureau pour votre application.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID][app-user-model-id] in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. Vous devez utiliser le même ID pour votre application qu'avec l'API `app.setAppUserModelId`, sinon Windows ne sera pas en mesure d'épingler correctement votre application dans la barre des tâches.

Contrairement à Squirrel.Mac, Windows peut héberger des mises à jour sur S3 ou tout autre hôte de fichiers statiques. You can read the documents of [Squirrel.Windows][squirrel-windows] to get more details about how Squirrel.Windows works.

## Événements

L'objet `autoUpdater` émet les événements suivants :

### Événement : 'error'

Retourne :

* `error` Error

Émis lorsqu’il y a une erreur pendant la mise à jour.

### Événement : 'checking-for-update'

Émis lors de la vérification du commencement d'une mise à jour.

### Événement : 'update-available'

Émis lorsqu'une mise à jour est disponible. La mise à jour est téléchargée automatiquement.

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

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Événement : 'before-quit-for-update'

Cet événement est émis après qu'un utilisateur appelle `quitAndInstall()`.

Quand cette API est appelée, l'événement `before-quit` n'est pas émis avant que toutes les fenêtres soient fermées. Ainsi vous devriez écouter cet évènement si vous voulez effectuer des actions avant que les fenêtres soient fermées et qu'un processus est entrain d'être arrêté, est écouter aussi `before-quit`.

## Méthodes

L'objet `autoUpdater` dispose des méthodes suivantes :

### `autoUpdater.setFeedURL(options)`

* Objet `options`
  * `url` String
  * `en-têtes` Enregistrement<String, String> (facultatif) _macOS_ - En-têtes de requête HTTP.
  * `serverType` String (optional) _macOS_ - Can be `json` or `default`, see the [Squirrel.Mac][squirrel-mac] README for more information.

Définit l'`url` et initialise l'auto updater.

### `autoUpdater.getFeedURL()`

Retourne `String` - L'URL de flux des mises à jour.

### `autoUpdater.checkForUpdates()`

Demande au serveur s'il y a une mise à jour. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Redémarre l'application et installe la mise à jour après son téléchargement. It should only be called after `update-downloaded` has been emitted.

Derrière l'appel de `autoUpdater.quitAndInstall()` fermera toutes les applications windows en premier, appellera automatiquement `app.quit()` après que toutes les fenêtres aient été fermées.

**Note:** Il n'est pas strictement nécessaire d'appeler cette fonction pour appliquer une mise à jour, en tant que mise à jour téléchargée avec succès sera toujours appliquée au prochain démarrage de l'application .

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
