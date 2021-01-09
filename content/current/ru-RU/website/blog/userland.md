---
title: Electron Userland
author: zeke
date: '2016-12-20'
---

Мы добавили новый [пользовательский раздел](https://electronjs.org/userland) в веб-сайт Electron, чтобы помочь пользователям найти людей, и приложений, которые составляют нашу процветающую экосистему с открытым исходным кодом.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Происхождение пользователя

Userland - это место, где люди в сообществе программного обеспечения собрались вместе, чтобы поделиться инструментами и идеями. Термин возник в сообществе Unix, где он ссылался на любую программу, которая запускалась вне ядра, но сегодня это значит что-нибудь еще. Когда люди в сегодняшнем сообществе Javascript ссылаются на userland, они обычно говорят о [реестре пакетов npm](http://npm.im). Именно здесь происходит большинство экспериментов и инноваций, в то время как узел и язык JavaScript (как ядро Unix) сохраняют относительно небольшой и стабильный набор основных функций.

## Узел и Electron

Как и узел, Electron имеет небольшой набор основных API. Они предоставляют основные функции, необходимые для разработки многоплатформенных настольных приложений. Такая философия позволяет Electron оставаться гибким инструментом, будучи не предписывая того как им пользоваться.

Userland является аналогичным "ядром", позволяющим пользователям создавать и делиться инструментами, расширяющими функциональность Electron.

## Сбор данных

Чтобы лучше понять тенденции в нашей экосистеме, мы проанализировали метаданные 15 00 публичных GitHub репозиториев , которые зависят от `electron` или `electron-prebuilt`

Мы использовали [GitHub API](https://developer.github.com/v3/), библиотеки [. o API](https://libraries.io/api), и npm реестр для сбора информации о зависимостях, зависимостей разработки, зависимости, авторы пакетов, помощников репозитория, количество загрузок, количество форков, число stargazer и т.д.

Затем мы использовали эти данные для создания следующих отчетов:

- [Зависимости разработки приложений](https://electronjs.org/userland/dev_dependencies): Пакеты чаще всего перечислены как `devDependencies` в приложениях Electron.
- [GitHub Contributors](https://electronjs.org/userland/github_contributors): Пользователи GitHub, которые внесли свой вклад в многочисленные GitHub репозитории.
- [Пакет Зависимости](https://electronjs.org/userland/package_dependencies): Связанные с Electron пакеты npm, которые часто зависят от других пакетов npm.
- [Помеченные приложения](https://electronjs.org/userland/starred_apps): Electron приложения (которые не являются npm пакетами) с большим количеством звёзд.
- [Наиболее загруженные пакеты](https://electronjs.org/userland/most_downloaded_packages): пакеты npm, связанные с Electron, которые загружаются много.
- [App Dependencies](https://electronjs.org/userland/dependencies): Пакеты чаще всего перечислены как `зависимости` в Electron приложениях.
- [Package Authors](https://electronjs.org/userland/package_authors): Наиболее плодотворные авторы пакетов, связанных с Electron.

## Фильтрация результатов

Reports like [app dependencies](https://electronjs.org/userland/dependencies) and [starred apps](https://electronjs.org/userland/starred_apps) which list packages, apps, and repos have a text input that can be used to filter the results.

При вводе этого ввода URL страницы обновляется динамически. Этот позволяет скопировать URL-адрес, представляющий конкретный кусочек данных пользователя, затем поделиться им с другими.

[![бабушка](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Больше прийти

Этот первый набор отчетов – только начало. Мы продолжим сбор данных о том, как сообщество строит Electron, и добавим новые отчеты на веб-сайте.

Все инструменты, используемые для сбора и отображения этих данных, являются открытыми исходными кодами:

- [Электрон/electronjs.org](https://github.com/electron/electron.atom): Веб-сайт Electron.
- [Электрон/userland-reports](https://github.com/electron/electron-userland-reports): Slices of data about packages, repos, and users in Electron.
- [Электрон/repos-using-electron](https://github.com/electron/repos-using-electron): Все публичные хранилища на GitHub, которые зависят от `электронов` или `электронов предустановленных`
- [electron/electron-npm-packages](https://github.com/zeke/electron-npm-packages): Все пакеты npm, которые упоминают `electron` в их `package.json` файле.

Если у вас есть идеи по улучшению этих отчетов, сообщите нам [об ошибке в репозитории](https://github.com/electron/electronjs.org/issues/new) или одном из вышеупомянутых репозиториев.

Спасибо вам, сообщество Electron, за то, что делали пользовательские то, что это сегодня!

