# Actualización de aplicaciones

Hay muchas manera de actualizar la aplicación Electron. La manera más fácil y apoyada oficialmente es aprovechar el marco de trabajo incorporado [Squirrel](https://github.com/Squirrel) y el módulo [autoUpdater](../api/auto-updater.md) de Electron.

## Usando `update.electronjs.org`

El equipo de Electron de GitHub mantiene [update.electronjs.org](https://github.com/electron/update.electronjs.org), un servicio web gratuito y de código abierto que las aplicaciones de Electrón pueden usar para auto-actualizarse. El servicio está diseñado para aplicaciones de Electrón que cumplen con los siguientes requisitos:

- Aplicaciones que se ejecuten en macOS o Windows
- La Aplicación tiene un repositorio público en GitHub
- Todas las compilaciones se publicarán en GitHub
- Todas las compilaciones tienen verificación de código

La forma más fácil de usar este servicio es instalando [update-electron-app](https://github.com/electron/update-electron-app), un módulo de Node.js preconfigurado para usarse con update.electronjs.org.

Instala el módulo:

```sh
npm install update-electron-app
```

Invoque el actualizador de archivos de los principales procesos de su aplicacion Electrón:

```js
require('update-electron-app')()
```

Por defecto, este módulo buscara actualizaciones al iniciar la aplicacion luego de cada 10 minutos. Cuando se encuentra una actualización, esta se descargará automáticamente en segundo plano. Cuando se completa la descarga, se muestra un cuadro de diálogo que le permite al usuario reiniciar su aplicación.

Si usted necesita personalizar su configuración, usted puede [usar la opción de `update-electron-app`](https://github.com/electron/update-electron-app) o [usar el servicio de actualización directo](https://github.com/electron/update.electronjs.org).

## Usando `electron-builder`

Si su aplicación fue empaquetada con [`electron-builder`](https://github.com/electron-userland/electron-builder) usted puede usar el modulo [electron-updater](https://www.electron.build/auto-update) que no requiere de un servidor y permite actualizaciones desde Amazon S3, GitHub o cualquier otro host de archivos estáticos. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Implementar un servidor de actualización

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

Dependiendo de sus necesidades, puede escoger una de esta:

- [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

## Implementación de actualizaciones en su aplicación

Una vez que haya implementado su servidor de actualización, continúe con la importación de los módulos requeridos en su código. El siguiente código podría variar en diferentes servidores de software, pero funciona como está descrito cuando se utiliza [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Como último paso, chequee por actualizaciones. El ejemplo abajo lo verificará cada minuto:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Aplicar actualizaciones

Ahora que ha configurado el mecanismo de actualización básico para su aplicación, debe asegurarse de que el usuario reciba una notificación cuando haya una actualización. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

```javascript
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

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```