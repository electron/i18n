# Actualización de aplicaciones

Hay muchas manera de actualizar la aplicación Electron. La manera más fácil y apoyada oficialmente es aprovechar el marco de trabajo incorporado [Squirrel](https://github.com/Squirrel) y el módulo [autoUpdater](../api/auto-updater.md) de Electron.

## Usando `update.electronjs.org`

El equipo de Electron mantiene [update.electronjs.org][], un webservice gratis y open-source que las aplicaciones Electron puede usar para auto-actualizarse. El servicio está diseñado para aplicaciones de Electron que cumplen con los siguientes criterios:

- Aplicaciones que se ejecuten en macOS o Windows
- La Aplicación tiene un repositorio público en GitHub
- Todas las compilaciones se publicarán en GitHub
- Todas las compilaciones tienen verificación de código

La forma más fácil de usar este servicio es instalando [update-electron-app][], un módulo de Node.js preconfigurado para usarse con update.electronjs.org.

Instala el módulo:

```sh
npm install update-electron-app
```

Invoque el actualizador de archivos de los principales procesos de su aplicacion Electrón:

```js
require('update-electron-app')()
```

De manera predeterminada, este módulo verificará si existen actualizaciones en el inicio de la aplicación y luego cada diez minutos. Cuando se encuentra una actualización, esta se descargará automáticamente en segundo plano. Cuando se completa la descarga, se muestra un cuadro de diálogo que le permite al usuario reiniciar su aplicación.

Si necesita personalizar su configuración, puede [usar la opción de `update-electron-app`][update-electron-app] o [usar el servicio de actualización directo][update.electronjs.org].

## Implementar un servidor de actualización

Si está desarrollando una aplicación privada de Electrón, o si no está publicando lanzamientos en GitHub, tal vez pueda considerar poseer su propio servidor de actualizaciones.

Dependiendo de sus necesidades, puede escoger una de esta:

- [Hazel][hazel] – Servidor de actualizaciones para aplicaciones privadas o de código abierto que pueden ser desplegadas de forma gratuita. [Now][now]. Es tomado de los [Lanzamientos de GitHub][gh-releases] y aprovecha al maximo el poder de las CDN's de GitHub.
- [Nuts][nuts] – También usa los [Lanzamientos de GitHub][gh-releases], pero almacena la aplicación, actualiza en el Disco Duro y también soporta repositorios privados.
- [electron-release-server][electron-release-server] – proporciona un panel para administrar los lanzamientos y no es necesarios que los lanzamientos se originen desde GitHub.
- [Nucleus][nucleus] – Un servidor de actualizaciones completo para aplicaciones de Electrón y es mantenido gracias a Atlassian. Soporta múltiples aplicaciones y canales, y utiliza un almacén de archivos estáticos para minimizar el coste del servidor.

## Implementación de actualizaciones en su aplicación

Una vez que haya implementado su servidor de actualización, continúe con la importación de los módulos requeridos en su código. El siguiente código podría variar en diferentes servidores de software, pero funciona como está descrito cuando se utiliza [Hazel](https://github.com/zeit/hazel).

**Importantante:** por favor asegurate de que el siguiente código solo se ejecutara en su paquete de aplicaciones, y no en desarrollo. Puedes usar [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) para chequear el tipo de ambiente.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

A continuación, construya la URL de uno de los servidores de actualizaciones, de la siguiente manera: [autoUpdater](../api/auto-updater.md):

```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

Como paso final, compruebe si hay actualizaciones. El siguiente ejemplo comprobará cada minuto:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Una vez que su aplicacion es [empaquetada](../tutorial/application-distribution.md), usted recibirá una actualización para cada nuevo [Lanzamiento de GitHub](https://help.github.com/articles/creating-releases/) que usted publique.

## Aplicar actualizaciones

Ahora que ha configurado el mecanismo de actualización básico para su aplicación, debe asegurarse de que el usuario reciba una notificación cuando haya una actualización. Esto se puede lograr utilzando la API de autoUpdater [events](../api/auto-updater.md#events):

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

También asegúrate de que los errores están [siendo manejados](../api/auto-updater.md#event-error). Aquí hay un ejemplo para registrarlos en `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```

## Administrando actualizaciones manualmente

Porque las solicitudes realizadas por Auto Update no están bajo su control directo, puede encontrar situaciones difíciles de manejar (como si el servidor de actualizaciones está detrás de la autenticación). El campo `url` soporta archivos, lo que significa que con un poco de esfuerzo puedes evadir el aspecto de comunicación del servidor del proceso. [Aquí hay un ejemplo de cómo podría funcionar esto](https://github.com/electron/electron/issues/5020#issuecomment-477636990).

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
