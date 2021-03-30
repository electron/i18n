---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Команда Electron рада сообщить, что стабильный релиз Electron 4 доступен! Вы можете установить его с [electronjs.org](https://electronjs.org/) или из npm через `npm install electron@latest`. Релиз упакован обновлениями, исправлениями и новыми функциями, и мы не можем ждать, чтобы увидеть, что вы собираетесь с ними. Подробнее об этом релизе читайте здесь . Пожалуйста, поделитесь любой обратной связью с вами!

---

## Что нового?

Большая часть функциональности Electron обеспечивается основными компонентами Chromium, Node.js и V8, которые составляют Electron. Как таковая, ключевая цель команды Electron заключается в том, чтобы как можно больше поддерживать изменения в этих проектах, предоставление разработчикам, создающим приложения Electron, доступа к новым функциям веб и JavaScript. Для этого Electron 4 включает основные версии для каждого из этих компонентов; Electron v4.0.0 включает Chromium `69. .3497.106`, Узел `10.11.0`, и V8 `6.9.427.24`.

Кроме того, Electron 4 включает изменения специфичных для Electron-API интерфейсов. Вы можете найти информацию об основных изменениях в Electron 4 ниже; для полного списка изменений, проверьте [Electron v4. Примечания к релизу .0](https://github.com/electron/electron/releases/tag/v4.0.0).

### Отключение `удаленного` модуля

You now have the ability to disable the `remote` module for security reasons. Модуль может быть отключен для `BrowserWindow`и для `webview` тегов:

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// тэг webview
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Смотрите [BrowserWindow](https://electronjs.org/docs/api/browser-window) и [`<webview>` Tag](https://electronjs.org/docs/api/webview-tag) для получения дополнительной информации.

### Фильтрация `remote.require()` / `remote.getGlobal()` Запросы

Эта функция полезна, если вы не хотите полностью отключить `удаленный` модуль в процессе визуализации или `веб-вид` но хотели бы дополнительный контроль над тем, какие модули могут потребоваться с помощью `пульта. равняется`.

Когда модуль требуется через пульт `. равняется` в процессе визуализации, a `событие удаленной необходимости` возбуждается в приложении [`` модуль](https://electronjs.org/docs/api/app). Вы можете вызвать `event.preventDefault()` в событии (первый аргумент) для предотвращения загрузки модуля. Образец [`WebContents`](https://electronjs.org/docs/api/web-contents) , в котором возникла необходимость, передается в качестве второго аргумента, и имя модуля передается в качестве третьего аргумента. Это же событие также отображается на примере `WebContents` , но в этом случае единственными аргументами являются событие и имя модуля. В обоих случаях вы можете вернуть пользовательское значение, установив значение `event.returnValue`.

```javascript
// Управление `remote.require` из всех WebContents:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// Управляем `remote.require` из определенного экземпляра веб-содержимого:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

Аналогичным образом, когда вызывается `remote.getGlobal(name)` , повышается событие `remote-get-global`. Это работает так же, как и событие `требующее удалённого доступа` : вызвать `preventDefault()` для предотвращения возврата глобального значения, и установите `событие. eturnValue` для возврата пользовательского значения.

```javascript
// Управление `remote.getGlobal` из всех WebContents:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
  // ...
})

// Управляем `remote.getGlobal` из конкретного экземпляра WebContents :
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

Для получения дополнительной информации см. следующую документацию:

* [`remote.require`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`Содержимое сайта`](https://electronjs.org/docs/api/web-contents)

### JavaScript доступ к панели информации

На macOS, теперь вы можете звонить приложению `. howAboutPanel()` , чтобы программно показать панель About (About Panel), так же как нажмите на пункт меню, созданный через `{role: 'about'}`. Смотрите [`showAboutPanel` documentation](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) для получения дополнительной информации

### Управление `WebContents` фоновым бротлингом

`WebContents` экземпляры теперь имеют метод `setBackgroundThrottling(разрешённый)` для включения или отключения записи таймеров и анимаций, когда страница в фоновом режиме.

```javascript
let win = new BrowserWindow(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

Смотрите [ `setBackgroundThrottling` документацию](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) для получения дополнительной информации.

## Критические изменения

### Нет больше macOS 10.9 поддержки

Chromium больше не поддерживает macOS 10.9 (OS X Mavericks), в результате [Electron 4.0 и более не поддерживает его](https://github.com/electron/electron/pull/15357).

### Одиночная блокировка

Ранее, чтобы ваше приложение стало разовым приложением (убедитесь, что в любое время работает только один экземпляр вашего приложения), вы можете использовать приложение `. akeSingleInstance()` метод. Начиная с Electron 4.0, вместо этого вы должны использовать `app.requestSingleInstanceLock()`. Возвращаемое значение этого метода показывает, успешно ли этот экземпляр вашего приложения получил блокировку. Если не удалось получить блокировку, вы можете предположить, что другой экземпляр вашего приложения уже запущен с замком и немедленно выйти.

Для примера использования `requestSingleInstanceLock()` и информации о нулевом поведении на различных платформах, [смотрите документацию для приложения `. equestSingleInstanceLock()` и связанные методы](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) и [событие `второго экземпляра`](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

При построении собственных модулей для окон должна быть истинная переменная `win_delay_load_hook` в модуле `binding.gyp` (значение по умолчанию). Если этот хук не присутствует, то родной модуль не загрузится в Windows, с сообщением об ошибке типа `Невозможно найти модуль`. [Смотрите руководство по родному модулю](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) для получения дополнительной информации.

## Упреки

На Electron 5.0 запланированы следующие изменения разрыва и поэтому устарели в Electron 4.0.

### Интеграция Node.js отключена для `родного WindowOpen`-ed Windows

Начиная с Electron 5.0, дочерние окна, открытые с параметром `nativeWindowOpen` , всегда будут отключены интеграции с Node.js.

### `WebPreferences` значения по умолчанию

При создании нового `браузерного окна` с настройками `webferences` , следующие `настройки веб-настроек` по умолчанию устарели в пользу новых значений по умолчанию:

<div class="table table-ruled table-full-width">

| Property | Deprecated Default | New Default |
|----------|--------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | value of `nodeIntegration` if set, otherwise `true` | `false` |

</div>

Обратите внимание: в настоящее время существует [известная ошибка (#9736)](https://github.com/electron/electron/issues/9736) , которая предотвращает работу тега `webview` при включенном `contextIsolation`. Следите за выпуском GitHub для получения актуальной информации!

Узнайте больше об изоляции контекстов, интеграции с узлами и теге `webview` в [документе безопасности Electron](https://electronjs.org/docs/tutorial/security).

Electron 4.0 все еще использует текущие значения по умолчанию, но если вы не передаете для них явное значение, то вы увидите предупреждение об устаревании. Для подготовки приложения к Electron 5.0 используйте для этих параметров явные значения. [Смотрите `BrowserWindow` docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) для получения подробной информации о каждом из этих вариантов.

### `webContents.findInPage(текст [, опции])`

Опции `medialCapitalAsWordStart` и `wordStart` устарели, поскольку они были удалены из потока.

## Программа отзывов

Программа [Обратная связь с приложением](https://electronjs.org/blog/app-feedback-program) , которую мы ввели во время разработки Electron 3. был успешным, поэтому мы продолжили его также во время разработки 4.0. Мы хотели бы выразить огромную благодарность Atlassian, Discord, MS Teams, OpenFin, Slack, Симфония, WhatsApp и другие участники программы для их участия в течение 4. бета цикл. Чтобы узнать больше о программе обратной связи и принять участие в будущих бета-тестированиях, [посмотрите наш блог о программе](https://electronjs.org/blog/app-feedback-program).

## Что дальше

В краткосрочном плане вы можете ожидать, что команда продолжит фокусироваться на поддержании разработки основных компонентов, составляющих Electron, включая Chromium, Node и V8. Хотя мы осторожны не давать обещания о датах выпуска, наш план выпускает новые версии Electron с новыми версиями этих компонентов примерно ежеквартально. [Смотрите наш документ по версии](https://electronjs.org/docs/tutorial/electron-versioning) для получения более подробной информации о версиях в Electron.

Информацию о запланированных изменениях в предстоящих версиях Electron, [см. в разделе «Планируемые изменения »](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
