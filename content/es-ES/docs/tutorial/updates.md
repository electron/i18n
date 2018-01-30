# Actualización de aplicaciones

Hay muchas manera de actualizar la aplicación Electron. La manera más fácil y apoyada oficialmente es aprovechar el marco de trabajo incorporado [Squirrel](https://github.com/Squirrel) y el módulo [autoUpdater](../api/auto-updater.md) de Electron.

## Implementar un servidor de actualización

Para empezar, primero se necesita implementar un servidor [autoUpdater](../api/auto-updater.md) de desde donde el módulo descargará nuevas actualizaciones.

Dependiendo de sus necesidades, puede escoger una de esta:

- [Hazel](https://github.com/zeit/hazel) – Servidor de actualización para aplicaciones de código abierto privadas. Puede utilizarse gratis en [Now](https://zeit.co/now) (usando un solo comando), va desde [GitHub Releases](https://help.github.com/articles/creating-releases/) y aprovecha el poder del CDN de GitHub
- [Nuts](https://github.com/GitbookIO/nuts) – También utiliza [GitHub Releases](https://help.github.com/articles/creating-releases/), pero almacena las actualizaciones de la aplicación en el disco y es compatible con repositorios privados.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Proporciona un tablero para manejar versiones
- [Nucleus](https://github.com/atlassian/nucleus) – Un servidor de actualizaciones completo para aplicaciones de Electron mantenido por Atlassian. Apoya varias aplicaciones y canales; utiliza un almacén de archivos estático para disminuir costos de servidor.

Si la aplicación esta empaquetada con [electron-builder](https://github.com/electron-userland/electron-builder) puede utilizarse el módulo [electron-updater](https://www.electron.build/auto-update), la cual no requiere un servidor y permite actualizaciones desde S3, GitHub o cualquier otro host de archivos estáticos.

## Implementación de actualizaciones en su aplicación

Una vez que haya implementado su servidor de actualización, continúe con la importación de los módulos requeridos en su código. El siguiente código podría variar en diferentes servidores de software, pero funciona como está descrito cuando se utiliza [Hazel](https://github.com/zeit/hazel).

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

Ahora que ha configurado el mecanismo de actualización básico para su aplicación, debe asegurarse de que el usuario reciba una notificación cuando haya una actualización. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

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