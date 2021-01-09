# Оновлення Додатків

Існує кілька способів оновити Electron додаток. Найпростіший та офіційно підтримувані можуть скористатися вбудованим модулем [Squirrel](https://github.com/Squirrel) фреймворком Electron [autoUpdater](../api/auto-updater.md).

## Використання `update.electronjs.org`

GitHub's Electron team maintains [update.electronjs.org][], a free and open-source webservice that Electron apps can use to self-update. Служба створена для застосунків Electron, які відповідають наступним критеріям:

- Додаток працює на macOS або Windows
- Додаток має публічний репозиторій GitHub
- Збірки публікуються в релізи GitHub
- Склади - це підписані

The easiest way to use this service is by installing [update-electron-app][], a Node.js module preconfigured for use with update.electronjs.org.

Встановити модуль:

```sh
npm встановити update-electron-app
```

Викликати оновлювача в основному процесі ваших програм:

```js
require('update-electron-app')()
```

За замовчуванням, цей модуль буде перевіряти наявність оновлень при запуску програми, потім кожні десять хвилин. При знайденні оновлення він буде завантажений у фоновому режимі. Коли завантаження закінчиться, відображається діалогове вікно , що дозволяє користувачеві перезапустити додаток.

If you need to customize your configuration, you can [pass options to `update-electron-app`][update-electron-app] or [use the update service directly][update.electronjs.org].

## Використання `electron-builder`

If your app is packaged with [`electron-builder`][electron-builder-lib] you can use the [electron-updater][] module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Розгортання на Сервері для Оновлень

Якщо ви розробляєте приватний застосунок Electron, або ви не публікуєте релізи на GitHub реліз, можливо необхідно запустити власний сервер оновлення.

Залежно від ваших потреб, ви можете вибрати один з цих:

- [Hazel][hazel] – Update server for private or open-source apps which can be deployed for free on [Now][now]. It pulls from [GitHub Releases][gh-releases] and leverages the power of GitHub's CDN.
- [Nuts][nuts] – Also uses [GitHub Releases][gh-releases], but caches app updates on disk and supports private repositories.
- [electron-release-server][electron-release-server] – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus][nucleus] – A complete update server for Electron apps maintained by Atlassian. Підтримує декілька застосунків та каналів; використовує статичний магазин файлів для мінімізації вартості сервера.

## Реалізація Оновлення в Вашому Застосунку

Після розгортання сервера оновлень, продовжуйте імпортувати обов'язкові модулі у коді. Даний код може відрізнятися в іншому сервері програмному забезпеченні, але він працює так, як описано при використанні [Hazel](https://github.com/zeit/hazel).

**Важливо:** Будь ласка, переконайтеся, що нижче код буде виконаний лише в встановленому застосунку, а не в розробці. Можна використовувати [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) для перевірки середовища.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Як останній крок, перевірте оновлення. Приклад нижче перевірятиме кожну хвилину:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Як тільки ваша програма [запакована](../tutorial/application-distribution.md), він буде отримувати оновлення для кожного нового [GitHub Релізу](https://help.github.com/articles/creating-releases/) який ви публікуєте.

## Застосування Оновлень

Тепер, коли ви налаштували основний механізм оновлення для вашого додатку, ви повинні переконатися, що користувач буде повідомлений про необхідність оновлення. Цей можна досягти за допомогою автооновлення API [подій](../api/auto-updater.md#events):

```javascript
autoUpdater. n('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    кнопки: ['Реставра', 'Later'],
    title: 'Application Update',
    повідомлення: процес. latform === 'win32' ? releaseNotes : releaseName,
    detail: 'Нова версія було завантажено. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Також переконайтеся, що помилки [обробляються](../api/auto-updater.md#event-error). Ось приклад для журналювання на `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('Виникла помилка оновлення застосунку')
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
