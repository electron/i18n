# Actualización de aplicaciones

Hay muchas manera de actualizar la aplicación Electron. La manera más fácil y apoyada oficialmente es tomando ventaja del marco integrado [Squirrel](https://github.com/Squirrel) y del modulo de Electron [autoUpdater](../api/auto-updater.md).

## Implementar un servidor de actualización

Para empezar, primero necesita implementar un servidor de [autoUpdater](../api/auto-updater.md) de donde el modulo descargará nuevas actualizaciones.

Dependiendo de sus necesidades, puede escoger una de esta:

- [Hazel](https://github.com/zeit/hazel) – Servidor de actualización para aplicaciones de código abierto privadas. Puede utilizarse gratis en [Now](https://zeit.co/now) (usando un solo comando), va desde [GitHub Releases](https://help.github.com/articles/creating-releases/) y aprovecha el poder del CDN de GitHub
- [Nuts](https://github.com/GitbookIO/nuts) – También usa [GitHub Releases](https://help.github.com/articles/creating-releases/), pero almacena actualizaciones de aplicaciones en disco y apoya repositorios privados.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Proporciona un tablero para manejar versiones
- [Nucleus](https://github.com/atlassian/nucleus) – Un servidor de actualizaciones completo para aplicaciones de Electron mantenido por Atlassian. Apoya varias aplicaciones y canales; utiliza un almacén de archivos estático para disminuir costos de servidor.

Si su aplicación está empaquetada con [electron-builder](https://github.com/electron-userland/electron-builder) usted puede usar el modulo [electron-updater](https://www.electron.build/auto-update), que n quiere un servidor y permite actualizar desde S3, GitHub o cualquier otro host de archivos estático.

## Implementación de actualizaciones en su aplicación

Una vez ya ha utilizado su servidor de actualizaciones, continúe importando los modulos requeridos en su código. El siguiente código podría variar para diferente servidores de software, pero funciona como está descrito cuando se usa [Hazel](https://github.com/zeit/hazel).

**Importante:** por favor asegúrese de que el código abajo solo sea ejecutado en su paquete de aplicaciones, y no en desarrollo. Puede usar [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) para verificar el entorno.

```js
const {app, autoUpdater, dialog} = require('electron')
```

Luego, construya el URL de uno de los servidores de actualizaciones y contarlo [autoUpdater](../api/auto-updater.md):

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

Una vez que su aplicación esté [empaquetada](../tutorial/application-distribution.md), esta recibirá una actualización por cada nuevo [Lanzamiento en GitHub](https://help.github.com/articles/creating-releases/) que usted realice.

## Aplicando actualizaciones

Ahora que ha configurado los mecanismos básicos de actualización para su aplicación, tiene que asegurarse que el usuario será notificado cuando haya una actualización. Esto puede ser conseguido usando el Actualizador automático API [events](../api/auto-updater.md#events):

```js
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Reiniciar la aplicación para aplicar las actualizaciones .'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

También asegúrese de que los errores estén [siendo manejados](../api/auto-updater.md#event-error). Aquí hay un ejemplo para cargarlos al `stderr`:

```js
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```