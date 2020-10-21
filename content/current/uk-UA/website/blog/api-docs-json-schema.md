---
title: Документація API в Electron як структуровані дані
author: zeke
date: '2016-09-27'
---

Сьогодні ми оголошуємо деякі покращення документації Electron. Кожен новий випуск тепер включає [файл JSON](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) , який детально описує всі публічні API Electron. Ми створили цей файл дозволити розробникам використовувати API документацію Electron по-новому.

---

## Огляд схеми

Кожен API - це об'єкт з такими властивостями, як ім'я, опис, тип і т.д. Такі класи, як `BrowserWindow` та `Menu` мають додаткові параметри, що описують їх методи, екземпляри властивостей, екземпляр події, тощо.

Ось фрагмент з схеми, яка описує клас `BrowserWindow`:

```js
{
  ім'я: 'BrowserWindow',
  опис: 'Створити та керувати вікнами браузера. ,
  процес: {
    main: true,
    renderer: false
  },
  тип: 'Клас',
  екземпляр: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs. rg/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window. d',
  Методів: [...],
  екземплярні методи: [...],
  instanceProperties: [...],
  екземплярів: [...]
}
```

And here's an example of a method description, in this case the `apis.BrowserWindow.instanceMethods.setMaximumSize` instance method:

```js
{
  ім'я: 'setMaximumSize',
  підпис: '(ширина, висота)',
  опис: 'Встановлює максимальний розмір вікна в ширину і висоту. ,
  параметри: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Використання нових даних

Для того, щоб розробникам легко використовувати ці структуровані дані в своїх проектах, ми створили [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), маленький npm пакет який автоматично публікується, коли вийде новий реліз Electron .

```sh
npm встановити electron-api-docs - зберегти
```

Для миттєвого задоволення спробуйте скористатись рекомендованим модулем у вашому Node.js REPL:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Як збираються дані

API документація Electron наслідується
[ Стиль Electron Coding](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) та [Стиль Electron](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), , тому його вміст може бути програмно проаналізований.</p> 

[electron-docs-linter](https://github.com/electron/electron-docs-linter) є новою залежністю від розвитку `електронового <code> репозиторію`. Це інструмент командного рядка, який виводить всі файли markdown і виконує правила стилю. Якщо помилки виявлено, вони перераховані і процес зупинено. Якщо API документація дійсна, `electron-json. файл pi` створений і [завантажується на GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) як частина релізу Electron.



## Стандартний Javascript і Standard Markdown

Earlier this year, Electron's codebase was updated to use the [`standard`](http://standardjs.com/) linter for all JavaScript. Стандартна README сумує причини цього вибору:



> Прийняття стандартного стилю означає рейтинг важливості кодової чіткості та конвенцій спільноти вище, ніж особистий стиль. Це може не мати сенсу для 100% проектів та культур розвитку, однак відкритим вихідним кодом може стати ворожим місцем для новин. Встановлення чітких, автоматизованих очікувань сприяють розвитку проекту.

Ми також створили [стандартну розмітку](https://github.com/zeke/standard-markdown) для того, щоб переконатися, що всі фрагменти коду JavaScript в нашій документації дійсні та відповідній зі стилем в самій базі коду.

Разом ці інструменти допоможуть нам використовувати безперервну інтеграцію (ЦI), щоб автоматично знайти помилки в pull requests. Це зменшує навантаження на людей, які проводять код і дає нам більше впевненості у точності нашої документації.



### Спільнота

Документація з Electron постійно вдосконалюється, і ми маємо чудову спільноту з відкритим вихідним кодом, щоб подякувати за це. Станом на написання, майже 300 людей зробили внесок у документацію.

Ми раді, що люди роблять з цією новою структурованою інформацією. Можливе використання включати:

- Вдосконалення на [https://electronjs.org/docs/](https://electronjs.org/docs/)
- [Файл визначення TypeScript](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) для більш впорядкованого розробки Electron в проектах за допомогою TypeScript.
- Пошукова документація для таких інструментів, як [Dash.app](https://kapeli.com/dash) і [devdocs.io](http://devdocs.io/)

