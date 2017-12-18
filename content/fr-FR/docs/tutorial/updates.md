# Mettre à jour l'application

Il y a plusieurs méthodes pour mettre à jour une application Electron. La plus simple et officielle profite de l'intégration du framework [Squirrel](https://github.com/Squirrel) et du module [autoUpdater](../api/auto-updater.md) d'Electron.

## Déploiement d’un serveur de mise à jour

Pour commencer, vous devez d'abord déployer un serveur dont le module [autoUpdater](../api/auto-updater.md) ira télécharger les nouvelles mises à jour.

Selon vos besoins, vous pouvez choisir parmi l'un d'entre eux :

- [Hazel](https://github.com/zeit/hazel) - Simple serveur de mise à jour pour les applications open sources. Récupère les [versions GitHub](https://help.github.com/articles/creating-releases/) et peuvent être déployées gratuitement sur [Now](https://zeit.co/now).
- [Nuts](https://github.com/GitbookIO/nuts) - Utilise également les [versions GitHub](https://help.github.com/articles/creating-releases/), mais met en cache les mises à jour sur le disque et prend en charge les dépôts privés.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Fournit un tableau de bord pour le traitement des versions
- [Nucleus](https://github.com/atlassian/nucleus) - Un serveur de mise à jour complet pour les applications Electron, maintenu par Atlassian. Prend en charge plusieurs applications et canaux; utilise un magasin de fichier statiques pour rapetisser le coût serveur.

Si votre application est empaquetée avec [electron-builder](https://github.com/electron-userland/electron-builder), vous pouvez utiliser le module [electron-updater](https://www.electron.build/auto-update) qui ne nécessite pas de serveur et permet les mises à jour depuis S3, GitHub ou tout autre hôte de fichiers statiques.

## Implémentation des mises à jour dans votre application

Une fois que vous avez déployé votre serveur de mise à jour, continuez à importer les modules requis dans votre code. Le code suivant peut varier pour les différents serveurs, mais il fonctionne comme décrit lors de l'utilisation de [Hazel](https://github.com/zeit/hazel).

**Important :** Veuillez vous assurer que le code ci-dessous sera exécuté uniquement dans votre application empaqueté et non en développement. Vous pouvez utiliser [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) pour vérifier l'environnement.

```js
const {app, autoUpdater, dialog} = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```js
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

As the final step, check for updates. The example below will check every minute:

```js
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Applying updates

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

```js
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

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```js
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```