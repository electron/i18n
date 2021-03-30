---
title: Изменения API в Electron 1.0
author: zcbenz
date: '2015-11-17'
---

С самого начала Electron, начинающий путь назад, когда он назывался Atom-Shell, мы экспериментировали с предоставлением хорошего кросс-платформенного JavaScript API для модуля контента Chromium и родных GUI компонентов. API начинаются очень организованно, и с течением времени мы внесли несколько изменений, чтобы улучшить исходные проекты.

---

Теперь с появлением версии 1.0 Electron мы хотели бы воспользоваться возможностью изменения, рассмотрев последнюю деталь API niggling. Описанные ниже изменения включены в **0.35.**, со старыми предупреждениями об устаревании API, чтобы вы могли получать актуальную информацию о будущих версиях 1.0. Electron 1.0 не будет работать в течение нескольких месяцев, так что у вас есть время до того, как эти изменения станут перерывом.

## Предупреждение о задержке

По умолчанию предупреждения покажут если вы используете устаревшие API. Чтобы отключить их, вы можете установить `process.noDeprecation` на `true`. Чтобы отслеживать исходные тексты использования устаревших API, вы можете установить процесс `. hrowDeprecation` to `true` to throw exceptions instead of printing wars, or set `process. raceDeprecation` to `true` to print the traces of the deprecations.

## Новый способ использования встроенных модулей

Built-in modules are now grouped into one module, instead of being separated into independent modules, so you can use them [without conflicts with other modules][issue-387]:

```javascript
var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

Старый способ `require('app')` по-прежнему поддерживается для обратной совместимости, но вы также можете выключить, если выключить:

```javascript
require('electron').hideInternalModules()
require('app') // выдаёт ошибку.
```

## An easier way to use the `remote` module

Из-за того, что использование встроенных модулей изменилось, мы упростили использование модулей main-process-side в процессе визуализации. Вы можете получить доступ к `удаленным атрибутам`для их использования:

```javascript
// Новый путь.
var app = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

Вместо использования длинной цепочки требуется следующее:

```javascript
// Старый путь.
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Разделение модуля `ipc`

Модуль `ipc` существовал как на основном процессе, так и в процессе визуализации, и API отличался с каждой стороны, , что довольно запутанно для новых пользователей. Мы переименовали модуль в `ipcMain` в основной процесс, и `ipcRenderer` в процессе визуализации, чтобы избежать путаницы:

```javascript
// В main процессе.
var ipcMain = требуется('electron').ipcMain
```

```javascript
// В графическом процессе.
var ipcRenderer = require('electron').ipcRenderer
```

И для модуля `ipcRenderer` при получении сообщений был добавлен дополнительный `объект` события, чтобы сопоставить обработку сообщений в модулях `ipcMain`:

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## Стандартизация `BrowserWindow` опции

Опции `BrowserWindow` имеют различные стили, основанные на опциях других API, и было трудно использовать в JavaScript из-за `-` в именах. В настоящее время они стандартизированы для традиционных имен JavaScript:

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Следовать конвенциям DOM по названиям API

Имена API в Electron предпочитают camelCase для всех имен API, как `Url` по `URL`, но DOM имеет свои собственные конвенции, и они предпочитают `URL` в `Url`, в процессе использования `Id` вместо `ID`. Мы выполнили следующие переименования API в соответствии со стилями DOM:

* `URL-адрес` переименован в `URL`
* `Csp` переименован в `CSP`

Вы заметите много устаревших версий при использовании Electron v0.35.0 для вашего приложения из-за этих изменений. Простой способ их исправления - заменить все экземпляры `Url` на `URL`.

## Изменяет названия событий `лота`

Стиль `Tray` названий событий немного отличается от других модулей, так что было сделано переименование, чтобы он соответствовал другим.

* `нажат` переименован в `нажмите`
* `двойной щелчок` переименован в `двойной щелчок`
* `правый клик` переименован в `правый клик`

[issue-387]: https://github.com/electron/electron/issues/387

