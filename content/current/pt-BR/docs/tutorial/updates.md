# Atualizando Aplicativos

Existem várias maneiras de atualizar uma aplicação em Electron. A maneira mais fácil, suportada oficialmente é utilizando o framework embutido [Squirrel](https://github.com/Squirrel) e o módulo de [autoUpdater](../api/auto-updater.md) do Electron.

## Usando `update.electronjs.org`

The Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. The service is designed for Electron apps that meet the following criteria:

- O app roda no macOS ou no Windows
- O app tem um repositório GitHub público
- As Builds são publicadas no GitHub Releases
- Builds são code-signed

A forma mais fácil de usar este serviço é instalando o [update-electron-app](https://github.com/electron/update-electron-app), um módulo Node.js pre-configurado para ser usado com update.electronjs.org.

Instalando o módulo:

```sh
npm install update-electron-app
```

Invoke the updater from your app's main process file:

```js
require('update-electron-app')()
```

By default, this module will check for updates at app startup, then every ten minutes. When an update is found, it will automatically be downloaded in the background. When the download completes, a dialog is displayed allowing the user to restart the app.

If you need to customize your configuration, you can [pass options to `update-electron-app`](https://github.com/electron/update-electron-app) or [use the update service directly](https://github.com/electron/update.electronjs.org).

## Implementando um Servidor de Atualizações

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

Dependendo de suas necessidades, você pode escolher um destes:

- [Hazel](https://github.com/zeit/hazel) - Um servidor de atualizações para aplicativos de código aberto ou privado, e pode ser implantado gratuitamente no [Now](https://zeit.co/now). Ele puxa do [GitHub Releases](https://help.github.com/articles/creating-releases/) e utiliza o poder dos GitHub CDN.
- [Nuts](https://github.com/GitbookIO/nuts) - Também usar [GitHub Releases](https://help.github.com/articles/creating-releases/), mas armazena em cache as atualizações do app no disco e suporta repositórios.
- [electron-resease-server](https://github.com/ArekSredzki/electron-release-server) - Fornece um painel para a manipulação de versões e não requer lançamentos que se originam do GitHub.

.</p></li> 
  
  - [Nucleus](https://github.com/atlassian/nucleus) - Um servidor de atualização completo para Electron apps mantido pela Atlassian. Suporta múltiplas aplicações e canais; usar um armazenamento de arquivo estático para diminuir o custo do servidor.</ul> 



## Implementando Atualizações em Seu App

Uma vez que implantou em seu servidor de atualização, continue com a importação dos módulos em seu código. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.



```javascript
const { app, autoUpdater, dialog } = require('electron')
```


Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:



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


Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.



## Aplicando Atualizações

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):



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


Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:



```javascript
autoUpdater.on('error', message => {
  console.error('Erro ao atualizar o aplicativo')
  console.error(message)
})
```




## Handing Updates Manually

Because the requests made by Auto Update aren't under your direct control, you may find situations that are difficult to handle (such as if the update server is behind authentication). The `url` field does support files, which means that with some effort, you can sidestep the server-communication aspect of the process. [Here's an example of how this could work](https://github.com/electron/electron/issues/5020#issuecomment-477636990).
