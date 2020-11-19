# Оновлення Додатків

Існує кілька способів оновити Electron додаток. Найпростіший та офіційно підтримувані можуть скористатися вбудованим модулем [Squirrel](https://github.com/Squirrel) фреймворком Electron [autoUpdater](../api/auto-updater.md).

## Використання `update.electronjs.org`

Команда Electron підтримує [update.electronjs.org][], безкоштовний та open-source веб-сервіс, який застосунки Electron можуть використовувати для самооновлення. Служба створена для застосунків Electron, які відповідають наступним критеріям:

- Додаток працює на macOS або Windows
- Додаток має публічний репозиторій GitHub
- Збірки публікуються в релізи GitHub
- Склади - це підписані

Найлегшим способом використання цієї служби є встановлення [update-electron-app][], модуль Node.js попередньо налаштований для використання з update.electronjs.org.

Встановити модуль:

```sh
npm встановити update-electron-app
```

Викликати оновлювача в основному процесі ваших програм:

```js
require('update-electron-app')()
```

За замовчуванням, цей модуль буде перевіряти наявність оновлень при запуску програми, потім кожні десять хвилин. При знайденні оновлення він буде завантажений у фоновому режимі. Коли завантаження закінчиться, відображається діалогове вікно , що дозволяє користувачеві перезапустити додаток.

Якщо вам потрібно налаштувати конфігурацію, ви можете [передати варіанти `update-electron-app`][update-electron-app] або [використовуючи службу оновлення безпосередньо][update.electronjs.org].

## Розгортання на Сервері для Оновлень

Якщо ви розробляєте приватний застосунок Electron, або ви не публікуєте релізи на GitHub реліз, можливо необхідно запустити власний сервер оновлення.

Залежно від ваших потреб, ви можете вибрати один з цих:

- [Hazel][hazel] – Оновлення сервера для особистих або відкритих програм з відкритим вихідним кодом, які можуть бути розгорнуті безкоштовно на [Тепер][now]. Вона тягне з [вивільнення GitHub][gh-releases] і використовує силу CDN-коду GitHub.
- [горіхи][nuts] - також використовує [GitHub Releases][gh-releases], але кешує оновлення на диску та підтримує приватні репозиторії.
- [electron-release-server][electron-release-server] - надає головну панель для релізів і не вимагає вивільнення релізів для походження на GitHub.
- [Нуклеус][nucleus] - Сервер повного оновлення для застосунків, які підтримуються Atlassian. Підтримує декілька застосунків та каналів; використовує статичний магазин файлів для мінімізації вартості сервера.

## Реалізація Оновлення в Вашому Застосунку

Після розгортання сервера оновлень, продовжуйте імпортувати обов'язкові модулі у коді. Даний код може відрізнятися в іншому сервері програмному забезпеченні, але він працює так, як описано при використанні [Hazel](https://github.com/zeit/hazel).

**Важливо:** Будь ласка, переконайтеся, що нижче код буде виконаний лише в встановленому застосунку, а не в розробці. Можна використовувати [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) для перевірки середовища.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
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

## Оновлення обробки вручну

Оскільки запити, зроблені авто-оновленням, не знаходяться під вашим безпосереднім контролем, ви можете знайти ситуації, які важко впоратися (наприклад, якщо сервер оновлення стоїть за автентифікацією). Поле `url` підтримує файли, а це означає що з деякими зусиллями, ви можете стати стороною аспекту зв'язку серверу. [Ось приклад того, як це може працювати](https://github.com/electron/electron/issues/5020#issuecomment-477636990).

[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
