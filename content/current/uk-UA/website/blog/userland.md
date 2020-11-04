---
title: Електронна користувальниця
author: zeke
date: '2016-12-20'
---

Ми додали нову секцію [користувача](https://electronjs.org/userland) на веб-сайт Electron, щоб допомогти користувачам відкрити для себе людей, пакунки та програми, що створюють нашу екосистему з відкритим кодом.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Походження користувача

Userland, це місце, де люди в програмних громадах збираються разом для обміну інструментами та ідеями. Термін появився у спільноті Unix, де це відноситься до будь-якої програми, яка міститься поза ядром, але сьогодні це означає щось більше. Коли люди із спільноти Javascript звертаються по користувачах, вони зазвичай говорять про реєстр пакетів [npm](http://npm.im). Саме тут відбувається більшість експериментів і інновацій, хоча Node і JavaScript мова (наприклад Unix ernel) зберігають відносно невеликі та стабільні функції ядра.

## Вузол та Electron

Як і Ніде - Electron має невеликий набір основних API. Вони надають основні функції необхідні для розробки багатоплатформних програм. Така філософія дизайну дозволяє Electron залишатися гнучким інструментом, не будучи надмірно визначеним у використанні.

Userland є аналогом "core", що дозволяє користувачам створити та поділитися інструментами, які розширюють функцію Electron.

## Збирання даних

Щоб краще зрозуміти тенденції в нашій екосистемі, ми проаналізовані метадані від 15, 00 публічних репозиторіїв з GitHub які залежать від `електронів` або `електронів`

Ми використали [GitHub API](https://developer.github.com/v3/), [бібліотеки. o API](https://libraries.io/api), та npm реєстр для збору інформації про залежності, розробники залежить від авторів пакетів, репо-учасників, чисельність завантажень, кількість форків, зграя рахунок, і т. д.

Тоді ми використали ці дані для створення наступних звітів:

- [Залежності розробки програми](https://electronjs.org/userland/dev_dependencies): Пакети найчастіше перераховані як `devendencies` в застосунках Electron.
- [GitHub автори](https://electronjs.org/userland/github_contributors): GitHub, які сприяли численним репозиторіям, пов'язаних з Electron-GitHub.
- [Залежності пакетів](https://electronjs.org/userland/package_dependencies): Пакети, пов'язані з Electron-npm пакети, які часто залежать від інших npm пакетів.
- [Вибрані додатки](https://electronjs.org/userland/starred_apps): Electron apps (що не є npm пакетами) з багатьма труднощами.
- [Більшість завантажених пакунків](https://electronjs.org/userland/most_downloaded_packages): електронні npm пакети, які сильно завантажуються.
- [Залежності додатків](https://electronjs.org/userland/dependencies): Пакети найчастіше перераховані як `залежності` в застосунках Electron.
- [Автори пакетів](https://electronjs.org/userland/package_authors): Найбільш розповсюджувані автори пакетів пов'язаних з Electron-npm пакетів.

## Результати фільтрації

Повідомляє про залежності додатків [](https://electronjs.org/userland/dependencies) і [запущено програми](https://electronjs.org/userland/starred_apps) , який перераховує пакети, додатки, і repos мають введення тексту, який може бути використаний для фільтрації результатів.

Як Ви вводите цей запис, посилання на сторінку оновлюється динамічно. This allows you to copy a URL representing a particular slice of userland data, then share it with others.

[![бабуся](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## І багато іншого

Цей перший набір звітів є лише початком. Ми будемо продовжувати збирати дані про те, як спільнота розробляє Electron, і додаватимуть нові звіти на сайт.

Усі інструменти, які використовуються для збору та відображення цих даних з відкритим кодом:

- [electron/electronjs.org](https://github.com/electron/electron.atom): веб-сайт Electron.
- [електрон/electron-userland-reports](https://github.com/electron/electron-userland-reports): строки даних про пакети, репозитрії та користувачі в залі Electron.
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): Усі публічні репозиторії на GitHub що залежать від `електро` або `electron-prebuil`
- [електрон/electron-npm-packages](https://github.com/zeke/electron-npm-packages): всі npm пакети, що згадують `електронний` у їхньому `пакеті` файлі.

Якщо у вас є ідеї про те, як покращити ці звіти, будь ласка, повідомте нас [про проблему на репозиторії веб-сайта](https://github.com/electron/electronjs.org/issues/new) або будь-яку вказану на репозиторій з вищезгаданого репозиторію.

Дякуємо вам, спільноті Electron, для створення користувацької землі те, що вона є сьогодні!

