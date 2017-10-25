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

Sur Windows, vous devrez installer votre application sur la machine de l'utilisateur avant de pouvoir utiliser `autoUpdater`. Il est donc recommandé d'utiliser [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) ou le package [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) pour générer un installateur Windows.

En utilisant [electron-winstaller](https://github.com/electron/windows-installer) ou [electron-forge](https://github.com/electron-userland/electron-forge), assurez-vous de ne pas essayer de mettre à jour votre application [à sa première exécution](https://github.com/electron/windows-installer#handling-squirrel-events) (voir aussi [cette question pour plus d'information](https://github.com/electron/electron/issues/7155)). Il est également recommandé d'utiliser [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) pour avoir les raccourcis bureau pour votre application.

L'installateur généré avec Squirrel va créer une icône de raccourci avec un [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) dans le format `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`. Voici deux exemples : `com.squirrel.slack.Slack` et `com.squirrel.code.Code`. Vous devez utiliser le même ID pour votre application qu'avec l'API `app.setAppUserModelId`, sinon Windows ne sera pas en mesure d'épingler correctement votre application dans la barre des tâches.

Contrairement à Squirrel.Mac, Windows peut héberger des mises à jour sur S3 ou tout autre hôte de fichiers statiques. Vous pouvez lire les documents de [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) pour obtenir plus de détails sur le fonctionnement de Squirrel.Windows.

### Linux

Il n'existe pas de prise en charge pour les mises à jours automatique sur Linux, il est donc recommandé d'utiliser le gestionnaire de paquets de distribution pour mettre à jour votre application.

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

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Émis lorsqu'une mise à jour a été téléchargée.

Sur Windows, seulement `releaseName` est disponible.

## Méthodes

L'objet `autoUpdater` dispose des méthodes suivantes :

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders` Object *macOS* (facultatif) - En-têtes de requête HTTP.

Définit l'`url` et initialise l'auto updater.

### `autoUpdater.getFeedURL()`

Retourne `String` - L'URL de flux des mises à jour.

### `autoUpdater.checkForUpdates()`

Demande au serveur s’il y a une mise à jour. Vous devez appeler `setFeedURL` avant d’utiliser cette API.

### `autoUpdater.quitAndInstall()`

Redémarre l'application et installe la mise à jour après qu'elle soit téléchargée. Cette méthode doit être appelé seulement après que `update-downloaded` soit émis.

**Remarque :** `autoUpdater.quitAndInstall()` va d'abord fermer toutes les fenêtres de l'application et émettre seulement après ça l'événement `before-quit` sur `app`. Ceci est différent de la séquence de fermeture habituelle.