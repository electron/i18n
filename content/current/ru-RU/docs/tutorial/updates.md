# Updating Applications

Существует несколько способов по обновлению Electron приложений. Самый простой и официально поддерживаемый - воспользоваться встроенным [Squirrel](https://github.com/Squirrel) фреймворком и модулем Electron [autoUpdater](../api/auto-updater.md).

## Используя `update.electronjs.org`

The Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. Сервис разработан для приложений Electron, отвечающих следующим критериям:

- Приложение работает на macOS или Windows
- Приложение имеет публичный GitHub репозиторий
- Сборки публикуются в GitHub Releases
- Сборки с кодовой подписью

Самый простой способ использовать этот сервис - установить [update-electron-app](https://github.com/electron/update-electron-app), модуль Node.js, сконфигурированный для использования с update.electronjs.org.

Установить модуль:

```sh
npm install update-electron-app
```

Вызвать обновление из основного файла процесса вашего приложения:

```js
require('update-electron-app')()
```

По умолчанию этот модуль будет проверять наличие обновлений при запуске приложения, а затем каждые десять минут. При обнаружении обновления оно будет автоматически загружено в фоновом режиме. Когда загрузка завершится, будет отображено диалоговое окно, позволяющее пользователю перезапустить приложение.

Если вам нужно настроить конфигурацию, вы можете [передать параметры в `update-electron-app`](https://github.com/electron/update-electron-app) или [использовать службу обновления напрямую](https://github.com/electron/update.electronjs.org).

## Развертывание сервера обновлений

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

Depending on your needs, you can choose from one of these:

- [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

## Внедрение обновлений в Ваше приложение

Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

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

## Применение обновлений

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
  console.error('There was a problem updating the application')
  console.error(message)
})
```

## Handing Updates Manually

Because the requests made by Auto Update aren't under your direct control, you may find situations that are difficult to handle (such as if the update server is behind authentication). The `url` field does support files, which means that with some effort, you can sidestep the server-communication aspect of the process. [Here's an example of how this could work](https://github.com/electron/electron/issues/5020#issuecomment-477636990).
