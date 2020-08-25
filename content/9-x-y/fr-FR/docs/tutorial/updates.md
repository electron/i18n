# Mise à jour d'une application

Il y a plusieurs méthodes pour mettre à jour une application Electron. La plus simple, et celle qui est officiellement supportée, tire parti de l'intégration du framework [Squirrel](https://github.com/Squirrel) et du module [autoUpdater](../api/auto-updater.md) d'Electron.

## Utilisation de `update.electronjs.org`

L'équipe GitHub d'Electron maintiens [update.electronjs.org][], un service web gratuit et open-source que les applications Electron peuvent utiliser pour se mettre à jour. Ce service est conçu pour les applications Electron répondant aux critères suivant:

- L'application tourne sous macOs ou Windows
- L'application a un répertoire GitHub public
- Les livrables sont publiés en tant que release sous Github
- Les livrables sont signés

La façon la plus simple d'utiliser ce service est d'installer [update-electron-app][], un module Node.js pré-configuré pour être utilisé avec update.electronjs.org.

Installer le module:

```sh
npm install update-electron-app
```

Déclenchez la mise à jour à partir du processus principal de votre application :

```js
require('update-electron-app')()
```

Par défaut, ce module vérifiera les mises à jour au démarrage de l'application, toutes les dix- minutes. Lorsqu’une mise à jour est trouvée, elle sera automatiquement téléchargée en arrière-plan. Une fois le téléchargement terminé, une boîte de dialogue s’affiche permettant à l’utilisateur de redémarrer l’application.

Si vous avez besoin personnaliser votre configuration, vous pouvez [passer des paramètres à `update-electron-app`][update-electron-app] ou [utiliser le service de mise à jour directement][update.electronjs.org].

## Utilisation de `electron-builder`

Si votre application est empaquetée avec [`electron-builder`][electron-builder-lib], vous pouvez utiliser le module [electron-updater][] qui ne nécessite pas de serveur et permet les mises à jour depuis S3, GitHub ou tout autre hôte de fichiers statiques. Ceci évite le mécanisme de mise à jour intégré d'Electron, ce qui signifie que le reste de cette documentation ne s'appliquera pas à la mise à jour de `electron-builder`.

## Déploiement d’un serveur de mise à jour

Si vous développez une application Electron privée, ou si vous ne publiez pas votre application sous GitHub, il peut être nécessaire de mettre en place votre propre serveur de mise à jour.

Selon vos besoins, vous pouvez choisir parmi l'un d'entre eux :

- [Hazel][hazel] – Serveur de mise à jour pour des applications privées ou open-source qui peuvent être déployées gratuitement sur [Now][now]. Cela récupère les [releases GitHub][gh-releases] et exploite la puissance du CDN de GitHub.
- [Nuts][nuts] – Utilise aussi les [releases GitHub][gh-releases], mais met en cache les mises à jour des applications sur le disque et prend en charge les dépôts privés.
- [electron-release-server][electron-release-server] – Fournit un tableau de bord pour la gestion des releases et n'exige pas que les releases soient créés sur GitHub.
- [Nucleus][nucleus] – Un serveur de mise à jour complet pour les applications Electron maintenues par Atlassian. Prend en charge plusieurs applications et canaux; utilise un magasin de fichiers statique pour minimiser le coût du serveur.

## Implémentation des mises à jour dans votre application

Une fois que vous avez déployé votre serveur de mise à jour, continuez d'importer les modules requis dans votre code. Le code suivant peut varier pour les différents serveurs, mais il fonctionne comme décrit lors de l'utilisation de [Hazel](https://github.com/zeit/hazel).

**Important :** Veuillez vous assurer que le code ci-dessous sera exécuté uniquement dans votre application empaquetée, et non dans la version en développement. Vous pouvez utiliser [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) pour vérifier l'environnement.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Ensuite, construisez l'URL du serveur de mise à jour et informez-en [autoUpdater](../api/auto-updater.md):

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Comme dernière étape, vérifiez les mises à jour. L'exemple ci-dessous vérifiera chaque minute:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Une fois que votre application est [empaquetée](../tutorial/application-distribution.md), elle recevra une mise à jour pour chaque nouvelle [version GitHub](https://help.github.com/articles/creating-releases/) que vous publierez.

## Application des mises à jour

Maintenant que vous avez configuré le mécanisme de mise à jour de base de votre application, vous devez vous assurer que l’utilisateur sera notifié quand il y a une mise à jour. Cela peut être réalisé avec les [événements](../api/auto-updater.md#events) de l'API autoUpdater:

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Assurez-vous également que les erreurs sont [gérées](../api/auto-updater.md#event-error). Voici un exemple pour les renvoyer sur `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```

[electron-builder-lib]: https://github.com/electron-userland/electron-builder
[electron-updater]: https://www.electron.build/auto-update
[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
