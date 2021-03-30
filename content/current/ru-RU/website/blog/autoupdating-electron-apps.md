---
title: Легкий автообновление приложений с открытым исходным кодом
author: zeke
date: '2018-05-01'
---

Today we're releasing a free, open-source, hosted [updates webservice][update.electronjs.org] and companion [npm package][update-electron-app] to enable easy automatic updates for open-source Electron apps. Это шаг к тому, чтобы разработчики приложений могли думать меньше о установке и развитии качественного опыта для своих пользователей.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Скриншот обновления">
    <figcaption>Новый модуль обновления в действии</figcaption>
  </a>
</figure>

## Упростить жизнь

Electron has an [autoUpdater][] API that gives apps the ability to consume metadata from a remote endpoint to check for updates, download them in the background, and install them automatically.

Включение этих обновлений было громоздким шагом в процессе установки для многих разработчиков приложений Electron, потому что для этого требуется разработка веб-сервера и поддержка только для обслуживания метаданных истории версий.

Сегодня мы объявляем о создании нового решения для автоматического обновления приложений. Если ваше приложение Electron находится в общедоступном GitHub репозитории и вы используете GitHub Releases, чтобы публиковать сборки, вы можете использовать этот сервис для предоставления непрерывных обновлений приложений своим пользователям.

## Использование нового модуля

To minimize configuration on your part, we've created [update-electron-app][], an npm module which integrates with the new [update.electronjs.org][] webservice.

Установить модуль:

```sh
npm install update-electron-app
```

Call it from anywhere in your app's [main process][]:

```js
require('update-electron-app')()
```

Вот и все! Модуль будет проверять наличие обновлений при запуске приложения, а затем каждые десять минут. Когда обнаружено обновление, оно загрузится автоматически, в фоновом режиме, и появится диалоговое окно, когда обновление будет готово.

## Миграция существующих приложений

Приложения уже используют API autoUpdater Electron и могут использовать этот сервис. To do so, you can [customize the `update-electron-app`][update-electron-app] module or [integrate directly with update.electronjs.org][update.electronjs.org].

## Альтернативы

If you're using [electron-builder][] to package your app, you can use its built-in updater. Подробнее см. [electron.build/auto-update](https://www.electron.build/auto-update).

Если ваше приложение является приватным, вам может потребоваться запустить свой собственный сервер обновлений. There are a number of open-source tools for this, including Zeit's [Hazel][] and Atlassian's [Nucleus][]. See the [Deploying an Update Server][] tutorial for more info.

## Спасибо

Thanks to [Julian Gruber][] for helping design and build this simple and scalable web service. Thanks to the folks at [Zeit][] for their open-source [Hazel][] service, from which we drew design inspiration. Thanks to [Samuel Attard][] for the code reviews. Спасибо сообществу Electron за помощь в тестировании сервиса .

🌲 Будущее для приложений Electron вечнозеленое!

[autoUpdater]: https://electronjs.org/docs/tutorial/updates
[electron-builder]: https://github.com/electron-userland/electron-builder
[Hazel]: https://github.com/zeit/hazel
[Julian Gruber]: http://juliangruber.com/
[main process]: https://electronjs.org/docs/glossary#main-process
[Deploying an Update Server]: https://electronjs.org/docs/tutorial/updates#deploying-an-update-server
[Nucleus]: https://github.com/atlassian/nucleus
[Samuel Attard]: https://www.samuelattard.com/
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[Zeit]: https://zeit.co