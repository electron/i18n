# Actualización de aplicaciones

Hay muchas manera de actualizar la aplicación Electron. The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](../api/auto-updater.md) module.

## Implementar un servidor de actualización

To get started, you first need to deploy a server that the [autoUpdater](../api/auto-updater.md) module will download new updates from.

Dependiendo de sus necesidades, puede escoger una de esta:

- [Hazel](https://github.com/zeit/hazel) – Servidor de actualización para aplicaciones de código abierto privadas. Puede utilizarse gratis en [Now](https://zeit.co/now) (usando un solo comando), va desde [GitHub Releases](https://help.github.com/articles/creating-releases/) y aprovecha el poder del CDN de GitHub
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Proporciona un tablero para manejar versiones
- [Nucleus](https://github.com/atlassian/nucleus) – Un servidor de actualizaciones completo para aplicaciones de Electron mantenido por Atlassian. Apoya varias aplicaciones y canales; utiliza un almacén de archivos estático para disminuir costos de servidor.

If your app is packaged with [electron-builder](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host.

## Implementación de actualizaciones en su aplicación

Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

```js
const {app, autoUpdater, dialog} = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```js
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Como último paso, chequee por actualizaciones. El ejemplo abajo lo verificará cada minuto:

```js
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Aplicando actualizaciones

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

```js
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'información',
    buttons: ['Reiniciar', 'Despues'],
    title: 'Actualización de aplicación',
    message: process.platform === 'win32' ? lanzamiento de notas: Lanzamiento de nombre
Detalles: Una nueva versión ha sido descargada. Reiniciar la aplicación para aplicar las actualizaciones .'
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