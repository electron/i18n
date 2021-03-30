---
title: Легкий автообновление приложений с открытым исходным кодом
author: zeke
date: '2018-05-01'
---

Сегодня мы выпускаем бесплатный открытый исходный код, hosted [updates webservice](https://github.com/electron/update.electronjs.org) and companion [npm package](https://github.com/electron/update-electron-app) to enable easy automatic updates for open-source Electron apps. Это шаг к тому, чтобы разработчики приложений могли думать меньше о установке и развитии качественного опыта для своих пользователей.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Скриншот обновления">
    <figcaption>Новый модуль обновления в действии</figcaption>
  </a>
</figure>

## Упростить жизнь

Electron has an [autoUpdater](https://electronjs.org/docs/tutorial/updates) API that gives apps the ability to consume metadata from a remote endpoint to check for updates, download them in the background, and install them automatically.

Включение этих обновлений было громоздким шагом в процессе установки для многих разработчиков приложений Electron, потому что для этого требуется разработка веб-сервера и поддержка только для обслуживания метаданных истории версий.

Сегодня мы объявляем о создании нового решения для автоматического обновления приложений. Если ваше приложение Electron находится в общедоступном GitHub репозитории и вы используете GitHub Releases, чтобы публиковать сборки, вы можете использовать этот сервис для предоставления непрерывных обновлений приложений своим пользователям.

## Использование нового модуля

Чтобы свести к минимуму конфигурацию вашей части, мы создали [update-electron-app](https://github.com/electron/update-electron-app), модуль npm, который интегрируется с новыми [update.electronjs.org](https://github.com/electron/update.electronjs.org) webservice.

Установить модуль:

```sh
npm install update-electron-app
```

Вызовите его из любого места в [главном процессе вашего приложения](https://electronjs.org/docs/glossary#main-process):

```js
require('update-electron-app')()
```

Вот и все! Модуль будет проверять наличие обновлений при запуске приложения, а затем каждые десять минут. Когда обнаружено обновление, оно загрузится автоматически, в фоновом режиме, и появится диалоговое окно, когда обновление будет готово.

## Миграция существующих приложений

Приложения уже используют API autoUpdater Electron и могут использовать этот сервис. Если вы используете [встроенный](https://github.com/electron-userland/electron-builder) для пакетирования вашего приложения, вы можете использовать его встроенное обновление.

## Альтернативы

Приложения уже используют API autoUpdater Electron и могут использовать этот сервис. Подробнее см. [electron.build/auto-update](https://www.electron.build/auto-update).

Если ваше приложение является приватным, вам может потребоваться запустить свой собственный сервер обновлений. Есть ряд инструментов с открытым исходным кодом, включая Zeit [Hazel](https://github.com/zeit/hazel) и Atlassian's [Nucleus](https://github.com/atlassian/nucleus). Смотрите учебник [Установка сервера обновления](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) для получения дополнительной информации .

## Спасибо

Спасибо [Julian Gruber](http://juliangruber.com/) за помощь в разработке и построении этого простого и масштабируемого веб-сервиса. Спасибо ребятам на [Zeit](https://zeit.co) за их открытый исходный код [Hazel](https://github.com/zeit/hazel) , из которого мы вдохновили дизайн. Спасибо [Samuel Attard](https://www.samuelattard.com/) за отзывов кода. Спасибо сообществу Electron за помощь в тестировании сервиса .

🌲 Будущее для приложений Electron вечнозеленое!