# Mettre à jour l'application

Il y a plusieurs méthodes pour mettre à jour une application Electron. La plus simple, et celle qui est officiellement supportée, tire parti de l'intégration du framework [Squirrel](https://github.com/Squirrel) et du module [autoUpdater](../api/auto-updater.md) d'Electron.

## Déploiement d’un serveur de mise à jour

Pour commencer, vous devez d'abord déployer un serveur sur lequel le module [autoUpdater](../api/auto-updater.md) ira télécharger les nouvelles mises à jour.

Selon vos besoins, vous pouvez choisir parmi l'un d'entre eux :

- [Hazel](https://github.com/zeit/hazel) – Serveur de mise à jour pour des applications privées ou open-source qui peuvent être déployées gratuitement sur [Now](https://zeit.co/now). Cela récupère les [releases GitHub](https://help.github.com/articles/creating-releases/) et exploite la puissance du CDN de GitHub.
- [Nuts](https://github.com/GitbookIO/nuts) – Utilise aussi les [releases GitHub](https://help.github.com/articles/creating-releases/), mais met en cache les mises à jour des applications sur le disque et prend en charge les dépôts privés.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Fournit un tableau de bord pour la gestion des releases et n'exige pas que les releases soient créés sur GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

If your app is packaged with [`electron-builder`](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

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

Comme dernière étape, vérifiez les mises à jour. L'exemple ci-dessous vérifie chaque minute:

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

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

Veillez également à ce que les erreurs soient [traitées](../api/auto-updater.md#event-error). Voila un exemple de ce qu'il se passe dans vous les entrez dans `stderr` :

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```