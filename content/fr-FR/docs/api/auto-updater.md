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

L’installateur généré avec Squirrel créera une icône raccourcie avec un</a> d’identification de modèle utilisateur d’application

dans le format de `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, des exemples sont `com.squirrel.slack.Slack` et `com.squirrel.code.Code`. Vous devez utiliser le même ID pour votre application qu'avec l'API `app.setAppUserModelId`, sinon Windows ne sera pas en mesure d'épingler correctement votre application dans la barre des tâches.</p> 

Contrairement à Squirrel.Mac, Windows peut héberger des mises à jour sur S3 ou tout autre hôte de fichiers statiques. Vous pouvez lire les documents de [Squirrel.Windows][squirrel-windows] plus de détails sur fonctionnement de Squirrel.Windows.



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

**Note:** Il n’est pas strictement nécessaire de gérer cet événement. Une mise à téléchargée avec succès sera toujours appliquée la prochaine fois que l’application démarre.



### Événement : 'before-quit-for-update'

Cet événement est émis après qu'un utilisateur appelle `quitAndInstall()`.

Quand cette API est appelée, l'événement `before-quit` n'est pas émis avant que toutes les fenêtres soient fermées. Ainsi vous devriez écouter cet évènement si vous voulez effectuer des actions avant que les fenêtres soient fermées et qu'un processus est entrain d'être arrêté, est écouter aussi `before-quit`.



## Méthodes

L'objet `autoUpdater` dispose des méthodes suivantes :



### `autoUpdater.setFeedURL(options)`

* `options` objet 
    * `url` String
  * `en-têtes` Enregistrement<String, String> (facultatif) _macOS_ - En-têtes de requête HTTP.
  * `serverType` String (facultatif) _macOS_ - Peut être `json` ou `default`, voir le [Squirrel.Mac][squirrel-mac] README pour plus d’informations.

Définit l'`url` et initialise l'auto updater.



### `autoUpdater.getFeedURL()`

Retourne `String` - L'URL de flux des mises à jour.



### `autoUpdater.checkForUpdates()`

Demande au serveur s’il y a une mise à jour. Vous devez appeler `setFeedURL` avant d utiliser cette API.



### `autoUpdater.quitAndInstall()`

Redémarre l’application et installe la mise à jour après son téléchargement. Il ne doit être appelé qu’après `update-downloaded` a été émis.

Derrière l'appel de `autoUpdater.quitAndInstall()` fermera toutes les applications windows en premier, appellera automatiquement `app.quit()` après que toutes les fenêtres aient été fermées.

**Note:** Il n'est pas strictement nécessaire d'appeler cette fonction pour appliquer une mise à jour, en tant que mise à jour téléchargée avec succès sera toujours appliquée au prochain démarrage de l'application .

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
