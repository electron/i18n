---
title: Спрощене автооновлення для відкритих програм
author: zeke
date: '2018-05-01'
---

Сьогодні ми випускаємо безкоштовне відкриття, хостинг [оновити веб-сервіс](https://github.com/electron/update.electronjs.org) та компанію [npm package](https://github.com/electron/update-electron-app) , щоб дозволити легкі оновлення для додатків з відкритим вихідним кодом Electron. Це крок у напрямку надання можливості розробникам програми менше думати про розгортання та багато іншого про розробку високоякісного досвіду для своїх користувачів.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Знімок екрану оновлення">
    <figcaption>Новий модуль оновлення в дії</figcaption>
  </a>
</figure>

## Простіше життя

У Electron є [autoUpdater](https://electronjs.org/docs/tutorial/updates) API, який надає програмам можливість споживати метадані від вихідної кінцевої точки для перевірки оновлень, завантажте їх у фоновому режимі і встановіть їх автоматично.

Включення цих оновлень є тимчасовим кроком в процесі розгортання для багатьох розробників Electron, оскільки це вимагає бути розгорнутий веб-сервер і він підтримується лише для обслуговування історії версій.

Сьогодні ми оголошуємо нове випадаюче рішення для автоматичного оновлення програм. Якщо ваш застосунок Electron знаходиться в публічному репозиторії GitHub, і ви використовуєте Релізи GitHub для публікації збігів, ви можете використати цей сервіс для доставки постійних оновлень програм до своїх користувачів.

## Використання нового модуля

Щоб мінімізувати конфігурацію вашої частини, ми створили [update-electron-app](https://github.com/electron/update-electron-app), даний npm модуль, який інтегрується з новим [оновленням.electronjs.org](https://github.com/electron/update.electronjs.org) webservice.

Встановити модуль:

```sh
npm встановити update-electron-app
```

Назвіть це з будь-якого місця у Вашому додатку [головному процесі](https://electronjs.org/docs/glossary#main-process):

```js
require('update-electron-app')()
```

Ось і все! Модуль перевірятиме наявність оновлень при запуску програми, кожні 10 хвилин. Коли буде знайдено оновлення, він буде автоматично завантажуватися у фоновому режимі, і відображатиметься діалогове вікно при готовому оновленні.

## Міграція існуючих програм

Програми вже використовують автооновлення API Electron, можуть також використовувати цю послугу. Для цього ви можете [налаштувати `update-electron-app`](https://github.com/electron/update-electron-app) модуль або [інтегрувати безпосередньо з update.electronjs.org](https://github.com/electron/update.electronjs.org).

## Альтернативи

Якщо ви користуєтесь [electron-builder](https://github.com/electron-userland/electron-builder) щоб упакувати ваші програми, ви можете скористатись вбудованим оновленням. Для деталей, дивіться [electron.build/auto-update](https://www.electron.build/auto-update).

Якщо ваш додаток приватний, можливо, вам доведеться запустити свій власний сервер оновлень. There are a number of open-source tools for this, including Zeit's [Hazel](https://github.com/zeit/hazel) and Atlassian's [Nucleus](https://github.com/atlassian/nucleus). Дивіться [Розгортання посібника з Update Server](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) для додаткової інформації .

## Подяка

Завдяки [Джуліан Грубер](http://juliangruber.com/) за те, що він допомагає розробляти і будувати простий і масштабований веб-сервіс. Завдяки жителям [Zeit](https://zeit.co) за своїм робочим кодом [Hazel](https://github.com/zeit/hazel) , з якого ми намалювали натхнення для розробки. Завдяки [Семюел Аттард](https://www.samuelattard.com/) за залишки коду. Завдяки спільноті Electron за допомогу перевірити цю послугу.

🌲 Для постійно зеленого майбутнього для застосунків Electron!