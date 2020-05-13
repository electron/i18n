# Mise à jour d'une application

Il y a plusieurs méthodes pour mettre à jour une application Electron. La plus simple, et celle qui est officiellement supportée, tire parti de l'intégration du framework [Squirrel](https://github.com/Squirrel) et du module [autoUpdater](../api/auto-updater.md) d'Electron.

## Utilisation de `update.electronjs.org`

The Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. Ce service est conçu pour les applications Electron répondant aux critères suivant:

- L'application tourne sous macOs ou Windows
- L'application a un répertoire GitHub public
- Les livrables sont publiés en tant que release sous Github
- Les livrables sont signés

La façon la plus simple d'utiliser ce service est d'installer [update-electron-app](https://github.com/electron/update-electron-app), un module Node.js pré-configuré pour être utilisé avec update.electronjs.org.

Installer le module:

```sh
npm install update-electron-app
```

Déclenchez la mise à jour à partir du processus principal de votre application :

```js
require('update-electron-app')()
```

Par défaut, ce module vérifiera les mises à jour au démarrage de l'application, toutes les dix- minutes. Lorsqu’une mise à jour est trouvée, elle sera automatiquement téléchargée en arrière-plan. Une fois le téléchargement terminé, une boîte de dialogue s’affiche permettant à l’utilisateur de redémarrer l’application.

Si vous avez besoin personnaliser votre configuration, vous pouvez [passer des paramètres à `update-electron-app`](https://github.com/electron/update-electron-app) ou [utiliser le service de mise à jour directement](https://github.com/electron/update.electronjs.org).

## Déploiement d’un serveur de mise à jour

Si vous développez une application Electron privée, ou si vous ne publiez pas votre application sous GitHub, il peut être nécessaire de mettre en place votre propre serveur de mise à jour.

Selon vos besoins, vous pouvez choisir parmi l'un d'entre eux :

- [Hazel](https://github.com/zeit/hazel) – Serveur de mise à jour pour des applications privées ou open-source qui peuvent être déployées gratuitement sur [Now](https://zeit.co/now). Cela récupère les [releases GitHub](https://help.github.com/articles/creating-releases/) et exploite la puissance du CDN de GitHub.
- [Nuts](https://github.com/GitbookIO/nuts) – Utilise aussi les [releases GitHub](https://help.github.com/articles/creating-releases/), mais met en cache les mises à jour des applications sur le disque et prend en charge les dépôts privés.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Fournit un tableau de bord pour la gestion des releases et n'exige pas que les releases soient créés sur GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – Un serveur de mise à jour complet pour les applications Electron maintenues par Atlassian. Prend en charge plusieurs applications et canaux; utilise un magasin de fichiers statique pour minimiser le coût du serveur.

## Implémentation des mises à jour dans votre application

Une fois que vous avez déployé votre serveur de mise à jour, continuez d'importer les modules requis dans votre code. Le code suivant peut varier pour les différents serveurs, mais il fonctionne comme décrit lors de l'utilisation de [Hazel](https://github.com/zeit/hazel).

**Important :** Veuillez vous assurer que le code ci-dessous sera exécuté uniquement dans votre application empaquetée, et non dans la version en développement. Vous pouvez utiliser [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) pour vérifier l'environnement.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Ensuite, construisez l'URL du serveur de mise à jour et informez-en [autoUpdater](../api/auto-updater.md):

```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

As the final step, check for updates. The example below will check every minute:

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
    detail: 'A new version has been downloaded. Redémarrez l'application pour appliquer les mises à jour.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```

## Handing Updates Manually

Because the requests made by Auto Update aren't under your direct control, you may find situations that are difficult to handle (such as if the update server is behind authentication). The `url` field does support files, which means that with some effort, you can sidestep the server-communication aspect of the process. [Here's an example of how this could work](https://github.com/electron/electron/issues/5020#issuecomment-477636990).
