# Updating Applications

Существует несколько способов по обновлению Electron приложений. Самый простой и официально поддерживаемый - воспользоваться встроенным [Squirrel](https://github.com/Squirrel) фреймворком и модулем Electron [autoUpdater](../api/auto-updater.md).

## Используя `update.electronjs.org`

Команда GitHub's Electron поддерживает [update.electronjs.org][], бесплатный веб-сервис с открытым исходным кодом, который Electron приложения могут использовать для самообновления. Сервис разработан для приложений Electron, отвечающих следующим критериям:

- Приложение работает на macOS или Windows
- Приложение имеет публичный GitHub репозиторий
- Сборки публикуются в GitHub Releases
- Сборки с кодовой подписью

Самый простой способ использовать этот сервис - установить [update-electron-app][], модуль Node.js, сконфигурированный для использования с update.electronjs.org.

Установить модуль:

```sh
npm install update-electron-app
```

Вызвать обновление из основного файла процесса вашего приложения:

```js
require('update-electron-app')()
```

По умолчанию этот модуль будет проверять наличие обновлений при запуске приложения, а затем каждые десять минут. При обнаружении обновления оно будет автоматически загружено в фоновом режиме. Когда загрузка завершится, будет отображено диалоговое окно, позволяющее пользователю перезапустить приложение.

Если вам нужно настроить конфигурацию, вы можете [передать параметры в `update-electron-app`][update-electron-app] или [использовать службу обновления напрямую][update.electronjs.org].

## Using `electron-builder`

If your app is packaged with [`electron-builder`][electron-builder-lib] you can use the [electron-updater][] module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Deploying an Update Server

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

Depending on your needs, you can choose from one of these:

- [Hazel][hazel] – Update server for private or open-source apps which can be deployed for free on [Now][now]. It pulls from [GitHub Releases][gh-releases] and leverages the power of GitHub's CDN.
- [Nuts][nuts] – Also uses [GitHub Releases][gh-releases], but caches app updates on disk and supports private repositories.
- [electron-release-server][electron-release-server] – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus][nucleus] – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

## Implementing Updates in Your App

Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Далее постройте URL сервера обновлений и скажите [autoUpdater](../api/auto-updater.md) об этом:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

В качестве последнего шага проверьте наличие обновлений. Пример ниже проверяется каждую минуту:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

После того, как ваша заявка [упакована](../tutorial/application-distribution.md), он получит обновление для каждого нового [GitHub релиза](https://help.github.com/articles/creating-releases/) , который вы публикуете.

## Применение обновлений

Теперь, когда вы настроили базовый механизм обновления для вашего приложения, необходимо убедиться, что пользователь будет получать уведомления о появлении обновления. Это может быть достигнуто с помощью autoUpdater API [событий](../api/auto-updater.md#events):

```javascript
autoUpdater. n('update-downloaded', (событие, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    кнопки: ['Перезапустить', 'Позже'],
    название: 'Application Update',
    сообщение: процесс. latform === 'win32' ? releaseNotes : releaseName,
    detail: 'Новая версия была загружена. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

Также убедитесь, что ошибки [обрабатываются](../api/auto-updater.md#event-error). Вот пример для записи в `stderr`:

```javascript
autoUpdater.on('error', сообщение => {
  console.error('При обновлении приложения')
  console.error(message)
})
```

[electron-builder-lib]: https://github.com/electron-userland/electron-builder
[electron-updater]: https://www.electron.build/auto-update
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
