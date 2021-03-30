---
title: API Electron как структурные данные
author: zeke
date: '2016-09-27'
---

Сегодня мы объявляем о некоторых улучшениях в документации Electron. Каждый новый релиз теперь включает в себя [JSON файл](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) , подробно описывающий все публичные API Electron. Мы создали этот файл, чтобы позволить разработчикам использовать документацию API Electron новыми интересными способами.

---

## Обзор схемы

Каждый API это объект с такими свойствами, как имя, описание, тип и т.д. Классы, такие как `BrowserWindow` и `Menu` имеют дополнительные свойства, описывающие их методы экземпляра, свойства экземпляров, события экземпляров и т.д.

Вот отрывок из схемы, описывающий класс `BrowserWindow`:

```js
{
  name: 'BrowserWindow',
  description: 'Create and control browser windows.',
  process: {
    main: true,
    renderer: false
  },
  type: 'Class',
  instanceName: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs.org/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window.md',
  staticMethods: [...],
  instanceMethods: [...],
  instanceProperties: [...],
  instanceEvents: [...]
}
```

And here's an example of a method description, in this case the `apis.BrowserWindow.instanceMethods.setMaximumSize` instance method:

```js
{
  имя: 'setMaximumSize',
  подпись: '(ширина, высота)',
  описание: 'Устанавливает максимальный размер окна в ширину и высоту. ,
  параметров: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Использование новых данных

Чтобы облегчить использование разработчиками этих структурированных данных в своих проектах, мы создали [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), небольшой npm пакет, который автоматически публикуется всякий раз, когда появляется новый Electron релиз.

```sh
npm установить electron-api-docs --save
```

Для мгновенного благодарения попробуйте модуль в ваш REPL:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Как собираются данные

Документация по API Electron придерживается [Electron Coding Style](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) и [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), так что его содержание может быть обработано программно.

[Электрон-docs-linter](https://github.com/electron/electron-docs-linter) - новая зависимость от разработки репозитория `электронного/электронного` хранилища. Это инструмент командной строки, который объединяет все файлы markdown и вводит в действие правила styleguide. Если ошибки найдены, они перечислены и выпуск процесса будет остановлен. Если API-документация верна, то `-json. pi` файл создан и [загружен в GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) как часть релиза Electron.

## Стандартные Javascript и стандартный Markdown

В начале этого года код Electron был обновлен для использования [`стандарт`](http://standardjs.com/) линтер для всех JavaScript. Стандартный README подводит обоснования этого выбора:

> Принятие стандартного стиля означает ранжирование важности кодовой ясности и конвенций сообщества выше, чем в личном стиле. Это может не иметь смысла для 100% проектов и культур развития, однако открытый исходный код может быть враждебным местом для новичков. Создание четких и автоматизированных ожиданий участников делает проект более здоровым.

Недавно мы также создали [standard-markdown](https://github.com/zeke/standard-markdown) , чтобы убедиться, что все сниппеты кода JavaScript в нашей документации действительны и соответствуют стилю в самой кодировке.

Together these tools help us use continuous integration (CI) to automatically find errors in pull requests. Это снижает нагрузку на людей, проводящих обзор кода и дает нам больше уверенности в точности нашей документации.

### Деятельность сообщества

Документация Electron постоянно совершенствуется, и у нас есть наше замечательное сообщество с открытым исходным кодом, чтобы поблагодарить за это. As of this writing, nearly 300 people have contributed to the docs.

Мы рады видеть то, что люди делают с этими новыми структурированными данными. Возможные виды использования включают в себя:

- Улучшения в [https://electronjs.org/docs/](https://electronjs.org/docs/)
- [Файл определения TypeScript](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) для более упорядоченной разработки Electron в проектах с использованием TypeScript.
- Можно искать документацию для таких инструментов, как [Dash.app](https://kapeli.com/dash) и [devdocs.io](http://devdocs.io/)

