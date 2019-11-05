# BrowserWindow

> Создавайте окна браузера и управляйте ими.

Процесс: [Основной](../glossary.md#main-process)

```javascript
// В основном процессе.
const { BrowserWindow } = require('electron')

// Или используйте 'remote' в графическом процессе.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

// Загрузить удаленный URL
win.loadURL('https://github.com')

// Или загрузить локальный HTML-файл
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Окно без рамки

Для создания окна без хрома или прозрачного окна произвольной формы, можно использовать API [окна без рамки](frameless-window.md).

## Изящный показ окон

Когда страница загружается в окно напрямую, пользователи могут видеть ступенчатую загрузку страницы, что является дурным тоном для нативного приложения. Для создания окна без ступенчатой загрузки существует два решения, которые можно использовать в различных ситуациях.

## Использование `ready-to-show` события

При загрузке страницы, после отрисовки страницы будет происходить событие `ready-to-show`, которое будет происходить первый раз, если окно до этого еще не было показано. Окно, показанное после этого события, не будет иметь визуальной ступенчатой подгрузки:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Обычно это событие происходит после события `did-finish-load`. Однако, страницы, включающие в себя удаленные ресурсы, могут продолжать подгружаться после происхождения события `did-finish-load`.

Пожалуйста, обратите внимание, что использование этого события означает, что рендерер будет считаться "видимым" и отрисуется, даже если `show` является false. Это событие никогда не сработает, если вы используете `paintWhenInitiallyHidden: false`

## Настройка `backgroundColor`

Для больших приложений событие `ready-to-show` может вызываться слишком поздно, что может замедлить приложение. В этом случае рекомендуется показать окно немедленно, и использовать `backgroundColor`, задающий цвет фона Вашего приложения:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Обратите внимание, что даже для приложений, использующих `ready-to-show` события, по-прежнему рекомендуется установить `backgroundColor`, чтобы сделать приложение более нативным.

## Родительские и дочерние окна

С помощью параметра `parent`, Вы можете создавать дочерние окна:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

Окно `child` будет всегда показано поверх окна `top`.

## Модальные окна

Модальное окно - дочернее окно, которое делает недоступным родительское окно. Чтобы создать модальное окно, Вы должны установить два параметра `parent` и `modal`:

```javascript
conts { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () = > {
  child.show()
})
```

## Видимость страниц

[API видимости страниц](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) работает следующим образом:

* На всех платформах состояние видимости отслеживает скрыто/уменьшено окно или нет.
* Кроме того, на macOS, состояние видимости также отслеживает состояние перекрытия окна. Если окно перекрыто (т.е. полностью покрыто) другим окном, состояние видимости будет `hidden`. На других платформах состояние видимости будет `hidden`, только когда окно уменьшено или явно скрыто при помощи `win.hide()`.
* Если `BrowserWindow` создано с `show: false`, первоначальное состояние видимости будет `visible`, несмотря на фактически скрытое окно.
* Если `backgroundThrottling` отключено, состояние видимости останется `visible`, даже если окно уменьшено, закрыто или скрыто.

Рекомендуется приостановить дорогостоящие операции, когда состояние видимости `hidden`, для того чтобы свести к минимуму потребление энергии.

## Платформа заметок

* На macOS модальные окна будут отображены в виде страниц, прикрепленных к родительскому окну.
* На macOS дочерние окна будут находиться относительно родительского окна, во время передвижения родительского окна, тем временем на Windows и Linux дочерние окна не будут двигаться.
* На Linux тип модального окна будет поменян на `dialog`.
* На Linux многие среды рабочего стола не поддерживают скрытие модального окна.

## Класс: BrowserWindow

> Создавайте окна браузера и управляйте ими.

Процесс: [Главный](../glossary.md#main-process)

`BrowserWindow` это[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Так создается новый экземпляр `BrowserWindow` с нативными свойствами, установленными в `options`.

### `new BrowserWindow([options])`

* `options` Object (опционально) 
  * `width` Integer (опционально) - ширина окна в пикселях. По умолчанию - `800`.
  * `height` Integer (опционально) - высота окна в пикселях. По умолчанию - `600`.
  * `x` Integer (опционально) - (**обязателен**, если используется y) отступ окна слева от экрана. Значение по умолчанию центрирует окно.
  * `y` Integer (опционально) - (**обязателен**, если используется x) отступ окна сверху от экрана. Значение по умолчанию центрирует окно.
  * `useContentSize` Boolean (опционально) - `width` и `height` могут использоваться как размеры веб-страницы, это значит, что актуальный размер окна будет включать размер фрейма и будет немного крупнее. По умолчанию - `false`.
  * `center` Boolean (опционально) - показывает окно в центре экрана.
  * `minWidth` Integer (опционально) - минимальная ширина окна. По умолчанию - `0`.
  * `minHeight` Integer (опционально) - минимальная высота окна. По умолчанию - `0`.
  * `maxWidth` Integer (опционально) - максимальная ширина окна. По умолчанию - без ограничений.
  * `maxHeight` Integer (опционально) - максимальная высота окна. По умолчанию - без ограничений.
  * `resizable` Boolean (опционально) - будет ли окно изменять размеры. По умолчанию - `true`.
  * `movable` Boolean (опционально) - будет ли окно перемещаться. Не реализовано на Linux. По умолчанию - `true`.
  * `minimizable` Boolean (опционально) - будет ли окно сворачиваться. Не реализовано на Linux. По умолчанию - `true`.
  * `maximazable` Boolean (опционально) - будет ли окно разворачиваться. Не реализовано на Linux. По умолчанию - `true`.
  * `closable` Boolean (опционально) - возможность закрывать окно. Не реализовано на Linux. По умолчанию - `true`.
  * `focusable` Boolean (опционально) - может ли быть окно в фокусе. По умолчанию - `true`. На Windows настройка `focusable: false` также подразумевает настройку `skipTaskbar: true`. На Linux настройка `focusable: false` прекращает взаимодействие окна с оконным менеджером, на Windows же всегда остается поверх всех рабочих областей.
  * `alwaysOnTop` Boolean (опционально) - будет ли окно всегда оставаться поверх других окон. По умолчанию - `false`.
  * `fullscreen` Boolean (опционально) - будет ли окно показываться во весь экран. Когда явно установлено `false`, на macOS кнопка полноэкранного режима будет скрыта или отключена. По умолчанию - `false`.
  * `fullscreenable` Boolean (опционально) - может ли окно быть в полноэкранном режиме. На macOS также кнопка увеличить/зумировать должна переключить в полноэкранный режим или увеличить окно. По умолчанию - `true`.
  * `simpleFullscreen` Boolean (опционально) - использовать полноэкранный режим на macOS в представленном до версии Lion варианте реализации. По умолчанию - `false`.
  * `skipTaskbar` Boolean (опционально) - будет ли показано окно в панели задач. По умолчанию - `false`.
  * `kiosk` Boolean (опционально) - режим киоска. По умолчанию - `false`.
  * `title` String (опционально) - заголовок окна по умолчанию. По умолчанию `"Electron"`. Если HTML-тег `<title>` определен в HTML-файле, загруженном с помощью `loadURL()`, то это свойство будет игнорироваться.
  * `icon` ([NativeImage](native-image.md) | String) (опционально) - иконка окна. На Windows рекомендуется использовать иконки `ICO`, чтобы получить лучший визуальный эффект, Вы также можете оставить неопределенным, чтобы был использован значок исполняемого файла.
  * `show` Boolean (опционально) - будет ли показано окно, когда будет создано. По умолчанию - `true`.
  * `paintWhenInitiallyHidden` Boolean (опционально) - Должен ли рендерер быть активным, когда `show` равен `false` и он только что создан. Для `document.visibilityState` для корректной работы при первой загрузке с `show: false` необходимо установить значение `false`. Установка этого в `false` приведёт к тому, что события `ready-to-show` не будут запускаться. По умолчанию - `true`.
  * `frame` Boolean (опционально) - установите `false`, чтобы создать [окно без рамки](frameless-window.md). По умолчанию - `true`.
  * `parent` BrowserWindow (опционально) - устанавливает родительское окно. По умолчанию - `null`.
  * `modal` Boolean (опционально) - будет ли окно модальным. Работает только, когда окно является дочерним окном. По умолчанию - `false`.
  * `acceptFirstMouse` Boolean (опционально) - будет ли веб-окно принимать событие одиночного нажатия мыши, которое сразу активирует окно. По умолчанию - `false`.
  * `disableAutoHideCursor` Boolean (опционально) - будет ли спрятан курсор, во время печатания. По умолчанию - `false`.
  * `autoHideMenuBar` Boolean (опционально) - автоматическое убирание полоски меню, пока клавиша `Alt` не будет нажата. По умолчанию - `false`.
  * `enableLargerThanScreen` Boolean (опционально) - позволяет окну изменять размер больше, чем экран. Относится только к macOS, так как другие ОС по умолчанию разрешают окна больше экрана. По умолчанию - `false`.
  * `backgroundColor` String (опционально) - фоновый цвет окна в HEX-формате, например `#66CD00`, `#FFF` или `#80FFFFFF` (альфа в формате #AARRGGBB поддерживается, если `transparent` установлено `true`). По умолчанию `#FFF` (белый).
  * `hasShadow` Boolean (опционально) - будет ли окно иметь тень. Реализовано только на macOS. По умолчанию - `true`.
  * `opacity` Number (опционально) - установить начальную прозрачность окна, между 0.0 (полная прозрачность) и 1.0 (полная видимость). Это реализовано только на Windows и macOS.
  * `darkTheme` Boolean (опционально) - заставляет использовать темную тему для окна, работает только на некоторых GTK+3 окружениях рабочего стола. По умолчанию - `false`.
  * `transparent` Boolean (опционально) - делает окно [прозрачным](frameless-window.md#transparent-window). По умолчанию - `false`. В Windows не работает до тех пор, пока окно не будет без фрейма.
  * `type` String (опционально) - тип окна, по умолчанию - обычное окно. См. больше об этом ниже.
  * `titleBarStyle` String (опционально) - стиль полосы заголовка окна. По умолчанию - `default`. Возможные значения: 
    * `default` - в результате стандартный, серый, непрозрачный Mac заголовок.
    * `hidden` - в результате скрытый заголовок и содержимое во все окно, но заголовок по-прежнему имеет стандартное окно контроля ("светофоры") сверху слева.
    * `hiddenInset` - В результате скрытый заголовок с альтернативным видом, где кнопки контролирования немного больше вставки от края окна.
    * `customButtonsOnHover` Boolean (опционально) - отобразить пользовательские кнопки закрыть и свернуть на macOS окнах без рамки. Эти кнопки будут отображены только при наведении на верхний левый угол окна. Эти пользовательские кнопки предотвращают проблемы с событиями мыши, которые случаются со стандартными кнопками панели инструментов. **Заметка:** Этот параметр в настоящее время экспериментален.
  * `fullscreenWindowTitle` Boolean (опционально) - показывает название в заголовке в полноэкранном режиме на macOS для всех вариантов `titleBarStyle`. По умолчанию `false`.
  * `thickFrame` Boolenan (опционально) - использовать стиль `WS_THICKFRAME` на окнах без рамок на Windows, добавляющий стандартные рамки окна. Установив значение `false`, тень окна и анимация окна будут удалены. По умолчанию - `true`.
  * `vibrancy` String (опционально) - добавить тип эффекта вибрации к окну, только на macOS. Может быть `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window` или `under-page`. Обратите внимание, что использование `frame: false` в комбинации с меняющимся значением, требует так же указывать `titleBarStyle`. Также обратите внимание, что `appearance-based`, `light`, `dark`, `medium-light` и `ultra-dark` устарела и будет удалена в следующей версии macOS.
  * `zoomToPageWidth` Boolean (опционально) - управляет поведением на macOS, при нажатии на зеленую кнопку на панели инструментов или при нажатии на пункт меню Окно > Увеличить. Если `true`, окно будет увеличиваться до предпочтительной ширины веб-страницы при увеличении, `false` приведет к увеличению масштаба до ширины экрана. Это также повлияет на поведение при вызове `maximize()` напрямую. По умолчанию - `false`.
  * `tabbingIdentifier` String (опционально) - название группы вкладок, позволяет открывать окно как нативную вкладку в macOS 10.12+. Окна с одинаковым идентификатором вкладки будут сгруппированы вместе. Это также добавляет новую нативную кнопку вкладки в панель вкладок вашего окна и позволяет Вашему `приложению` и окну получать событие `new-window-for-tab`.
  * `webPreferences` Object (опционально) - настройки веб-страниц. 
    * `devTools` Boolean (опционально) - включает инструменты разработчика. Если значение `false`, нельзя будет использовать `BrowserWindow.webContents.openDevTools()`, чтобы открыть инструменты разработчика. По умолчанию - `true`.
    * `nodeIntegration` Boolean (опционально) - включает интеграцию NodeJS. По умолчанию - `false`.
    * `nodeIntegrationInWorker` Boolean (опционально) - включает интеграцию NodeJS в веб-воркерах. По умолчанию - `false`. Больше об этом можно найти в [многопоточности](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (опционально) - экспериментальная опция для включения поддержки NodeJS в подфреймах, таких как iframes и дочерних окнах. Все Ваши предварительные загрузки будут загружены для каждого iframe, Вы можете использовать `process.isMainFrame`, чтобы определить в главном фрейме Вы или нет.
    * `preload` String (опционально) - Определяет скрипт, который будет загружен до других скриптов загружаемых в странице. Этот скрипт будет всегда иметь доступ к узлам API в не зависимости включено или выключено объединение узлов. Значение должно быть абсолютным файловым путем к скрипту. Когда интеграция узлов отключена, сценарий предварительной загрузки может повторно вводить глобальные символы узла обратно в глобальную область. Посмотреть пример [здесь](process.md#event-loaded).
    * `sandbox` Boolean (опционально) - если установлено в true, то в окне будет запущена песочница рендеринга, что делает ее совместимой с Chromium на уровне операционной системы и отключает Node.js. Это не тоже самое, что параметр `nodeIntegration`, доступные АПИ для предзагрузки более ограничены. Узнать больше об этой опции можно [здесь](sandbox-option.md). **Примечание:** Эта опция в настоящее время экспериментальная и может поменяться или быть удалена в будущих Electron релизах.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Default is `true`.
    * `session` [Сессия](session.md#class-session) (опционально) - отсылает сессию используемую на странице. Вместо передачи объекта Session напрямую, вы можете также выбрать использование `partition` опции вместо которой принимает строку раздела. Когда оба `session` и `partition` определены, `session` будет приоритентней. По умолчанию используется session по умолчанию.
    * `partition` String (опционально) - Устанавливает сеанс, используемый страницей в соответствии со строкой раздела сессии. Если `partition` начинается с `persist:`, страница будет использовать постоянную сессию доступная всем страницам в приложении с некоторыми `partition`. Если нет `persist:` префикса, страница будет использовать сеанс в памяти. При присваивании одинаковой `partition`, разные страницы могут иметь одинаковую сессию. По умолчанию используется session по умолчанию.
    * `affinity` String (опционально) - Когда определено, веб страницы с одинаковыми `affinity` будут работать в том же процессе рендеринга. Обратите внимание, что из-за повторного использования процесса рендеринга, некоторые параметры `webPreferences` также будут доступны между веб-страницами, даже если вы указали для них разные значения, включая, но не ограничиваясь, `preload`, `sandbox` и `nodeIntegration`. Поэтому рекомендуется использовать те же `webPreferences` для веб-страниц с таким же `affinity`. *Это экспериментальное свойство*
    * `zoomFactor` Number (опционально) - Коэффициент масштабирования на странице, `3.0` означает `300%`. По умолчанию `1.0`.
    * `javascript` Boolean (опционально) - Включает поддержку JavaScript. По умолчанию `true`.
    * `webSecurity` Boolean (опционально) - Когда `false`, отключается политика same-origin (обычно используется при тестировании вебсайтов людьми), и устанавливается `allowRunningInsecureContent` в `true`, если параметр не был установлен пользователем. По умолчанию - `true`.
    * `allowRunningInsecureContent` Boolean (опционально) - Позволяет https страницам запускать JavaScript, CSS или плагины из http URLs. По умолчанию `false`.
    * `images` Boolean (опционально) - Включает поддержку изображений. По умолчанию `true`.
    * `textAreasAreResizable` Boolean (опционально) - Позволяет изменять размер у TextArea элементов. По умолчанию `true`.
    * `webgl` Boolean (опционально) - Включает поддержку WebGL. По умолчанию `true`.
    * `plugins` Boolean (опционально) - Включает поддержку плагинов. По умолчанию `false`.
    * `experimentalFeatures` Boolean (опционально) - Включает экспериментальные возможности Chromium. По умолчанию `false`.
    * `scrollBounce` Boolean (опционально) - Включает эффект отскока при прокрутке в macOS. По умолчанию `false`.
    * `enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. Полный список поддерживаемых возможностей можно найти в файле [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `disableBlinkFeatures` String (опционально) - Список функциональных возможностей для выключения, разделяются `','`, например `CSSVariables,KeyboardEventKey`. Полный список поддерживаемых возможностей можно найти в файле [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `defaultFontFamily` Object (опционально) - Устанавливает шрифт по умолчанию для семейства шрифтов. 
      * `standard` String (опционально) - По умолчанию `Times New Roman`.
      * `serif` String (опционально) - По умолчанию `Times New Roman`.
      * `sansSerif` String (опционально) - По умолчанию `Arial`.
      * `monospace` String (опционально) - По умолчанию `Courier New`.
      * `cursive` String (optional) - Defaults to `Script`.
      * `fantasy` String (optional) - Defaults to `Impact`.
    * `defaultFontSize` Integer (optional) - Defaults to `16`.
    * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
    * `minimumFontSize` Integer (optional) - Defaults to `0`.
    * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. Дочерние окна всегда будут отключены для интеграции узлов, если `nodeIntegrationInSubFrames` будет true. **Примечание:** Эта опция в настоящее время экспериментальная.
    * `webviewTag` Boolean (optional) - Whether to enable the [`&lt;webview&gt;` tag](webview-tag.md). Defaults to `false`. **Note:** The `preload` script configured for the `&lt;webview&gt;` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `&lt;webview&gt;` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `&lt;webview&gt;`'s initial settings.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Default is `false`.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.
    * `autoplayPolicy` String (опционально) - политика автовоспроизведения для применения к содержимому в окне, может быть `no-user-gesture-required`, `user-gesture-required` или `document-user-activation-required`. По умолчанию `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (опционально) - Следует ли запретить изменение размера окна при вводе HTML в полноэкранном режиме. По умолчанию `false`.

Когда установлен минимальный или максимальный размер окна, при помощи `minWidth`/`maxWidth`/`minHeight`/`maxHeight`, это ограничивает только пользователей. Это не позволит Вам установить размер, который не будет следовать ограничениям размера, в `setBounds`/`setSize` или в конструкторе `BrowserWindow`.

Возможные значения и поведения опции `type` зависят от платформы. Возможные значения:

* На Linux возможны типы `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* На macOS возможны типы `desktop`, `textured`. 
  * Тип `textured` добавляет вид металлического градиента (`NSTexturedBackgroundWindowMask`).
  * Тип `desktop` размещает окно на уровень фонового окна рабочего стола (`kCGDesktopWindowLevel - 1`). Обратите внимание, что окно рабочего стола не будет получить события фокуса, клавиатуры или мыши, но Вы можете использовать `globalShortcut`, чтобы получать ввод.
* На Windows возможен тип `toolbar`.

### События экземпляра

Объекты созданные с помощью `new BrowserWindow` имеют следующие события:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

#### Событие: 'page-title-updated'

Возвращает:

* `event` Event
* `title` String
* `explicitSet` Boolean

Вызывается, когда документ меняет свой заголовок, вызов `event.preventDefault()` предотвратит изменение заголовка родного окна. `explicitSet` является false, когда заголовок синтезирован из url файла.

#### Событие: 'close'

Возвращает:

* `event` Event

Происходит при закрытии окна. Оно происходит перед событиями `beforeunload` и `unload` в DOM. Вызов `event.preventDefault()` предотвратит закрытие.

Скорее всего, Вы захотите использовать обработчик `beforeunload`, чтобы решить, когда окно должно быть закрыто, который также будет вызываться, когда окно перезагружается. В Electron возврат любого значения, отличного от `undefined`, предотвратит закрытие. Например:

```javascript
window.onbeforeunload = (e) => {
  console.log('Я не хочу быть закрыт')

  // В отличие от браузеров, пользователю будет показано окно с сообщением.
  // Возврат любого значения незаметно отменит закрытие.
  // Рекомендуется использовать dialog API, чтобы дать пользователям
  // возможность подтвердить закрытие приложения.
  e.returnValue = false // идентично `return false`, но в использовании не рекомендуется
}
```

***Примечание**: Существует тонкая разница между поведением `window.onbeforeunload = handler` и `window.addEventListener('beforeunload', handler)`. Рекомендуется всегда устанавливать `event.returnValue` явно, вместо того, чтобы просто возвращать значение, поскольку первое работает более последовательно в Electron.*

#### Событие: 'closed'

Происходит, когда окно закрыто. После того, как Вы получили это событие, Вы должны удалить ссылку на окно и больше не использовать ее.

#### Событие: 'session-end' *Windows*

Происходит, когда сеанс окна заканчивается из-за выключения, перезагрузки компьютера или отключения сеанса.

#### Событие: 'unresponsive'

Происходит, когда страница "не отвечает".

#### Событие: 'responsive'

Происходит, когда страница, которая "не отвечала", снова реагирует.

#### Событие: 'blur'

Происходит, когда окно теряет фокус.

#### Событие: 'focus'

Происходит, когда на окне фокусируются.

#### Событие: 'show'

Происходит, когда отображается окно.

#### Событие: 'hide'

Происходит, когда окно спрятано.

#### Событие: 'ready-to-show'

Происходит, когда веб-страница была отрисована (пока не отображена) и окно может быть отображено без визуального мерцания.

Пожалуйста, обратите внимание, что использование этого события означает, что рендерер будет считаться "видимым" и отрисуется, даже если `show` является false. Это событие никогда не сработает, если вы используете `paintWhenInitiallyHidden: false`

#### Событие: 'maximize'

Происходит, когда окно увеличивается до предела.

#### Событие: 'unmaximize'

Происходит, когда окно выходит из увеличенного состояния.

#### Событие: 'minimize'

Происходит, когда окно было свернуто.

#### Событие: 'restore'

Происходит, когда окно восстанавливается из свернутого состояния.

#### Событие: 'will-resize' *macOS* *Windows*

Возвращает:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - размер окна, на который будет изменено.

Происходит перед изменением размера окна. Вызов `event.preventDefault()` предотвратит изменение размера окна.

Обратите внимание, что это происходит, только когда размер окна будет изменяться вручную. Изменение размера окна с помощью `setBounds`/`setSize` не вызовет это событие.

#### Событие: 'resize'

Происходит после того, как изменился размер окна.

#### Событие: 'will-move' *Windows*

Возвращает:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - расположение, куда окно будет перемещено.

Происходит перед перемещением окна. Вызов `event.preventDefault()` предотвратит перемещение окна.

Обратите внимание, что это происходит, только когда размер окна будет изменяться вручную. Изменение размера окна с помощью `setBounds`/`setSize` не вызовет это событие.

#### Событие: 'move'

Вызывается, когда окно перемещено на новое место.

**Примечание**: На macOS это событие является псевдонимом `moved`.

#### Событие: 'moved' *macOS*

Вызывается единожды, когда окно перемещается в новое положение.

#### Событие: 'enter-full-screen'

Вызывается, когда окно переходит в полноэкранный режим.

#### Событие: 'leave-full-screen'

Вызывается, когда окно выходит из полноэкранного режима.

#### Событие: 'enter-html-full-screen'

Происходит, когда окно входит в полноэкранный режим с помощью HTML API.

#### Событие: 'leave-html-full-screen'

Происходит, когда окно выходит из полноэкранного режима с помощью HTML API.

#### Событие: 'always-on-top-changed'

Возвращает:

* `event` Event
* `isAlwaysOnTop` Boolean

Происходит, когда окно переключает режим отображения поверх всех окон.

#### Событие: 'app-command' *Windows* *Linux*

Возвращает:

* `event` Event
* `command` String

Вызывается, когда вызван [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx). Обычно это касается клавиатурных медиа-клавиш или команд браузера, а также кнопки "Назад", встроенной в некоторые мыши на Windows.

Команды в нижнем регистре, подчеркивание заменено на дефисы, а префикс `APPCOMMAND_` обрезан. например `APPCOMMAND_BROWSER_BACKWARD` происходит как `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Возврат на предыдущий экран, когда пользователь мышкой нажимает кнопку "назад"
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

Следующие команды приложения явно поддерживаются на Linux:

* `browser-backward`
* `browser-forward`

#### Событие: 'scroll-touch-begin' *macOS*

Происходит, когда начинается прокрутка колеса.

#### Событие: 'scroll-touch-end' *macOS*

Происходит, когда заканчивается прокрутка колеса.

#### Событие: 'scroll-touch-edge' *macOS*

Происходит, когда прокрутка колеса достигает края элемента.

#### Событие: 'swipe' *macOS*

Возвращает:

* `event` Event
* `direction` String

Происходит при свайпе тремя пальцами. Возможные направления: `up`, `right`, `down` и `left`.

#### Событие: 'rotate-gesture' *macOS*

Возвращает:

* `event` Event
* `rotation` Float

Генерируется жестом вращения трекпада. Непрерывно генерируется до тех пор, пока жест поворота не будет завершен. Значение `rotation` при каждом выбросе - угол поворота в градусах, отсчитанный от последнего выброса. Последнее событие на жесте вращения всегда будет иметь значение `0`. Значения вращения против часовой стрелки положительные, по часовой стрелке отрицательные.

#### Событие: 'sheet-begin' *macOS*

Происходит, когда окно открывает лист.

#### Событие: 'sheet-end' *macOS*

Происходит, когда окно закрыло лист.

#### Событие: 'new-window-for-tab' *macOS*

Происходит, когда нажимается нативная кнопка новой вкладки.

### Статические методы

Класс `BrowserWindow` имеет следующие статические методы:

#### `BrowserWindow.getAllWindows()`

Возвращает `BrowserWindow[]` - массив всех открытых окон браузера.

#### `BrowserWindow.getFocusedWindow()`

Возвращает `BrowserWindow | null` - окно, которое сфокусировано в этом приложении, иначе возвращает `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Возвращает `BrowserWindow` - окно, которое владеет указанным `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Возвращает `BrowserWindow | null` - окно, которое владеет указанным `browserView`. Если данный вид не прикреплен к любому окну, возвращает `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Возвращает `BrowserWindow` - окно с указанным `id`.

#### `BrowserWindow.addExtension(path)`

* `path` String

Добавляет расширение Chrome, расположенное в `path`, и возвращает имя расширения.

The method will also not return if the extension's manifest is missing or incomplete.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Удаляет расширение Chrome с указанным именем.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.getExtensions()`

Возвращает `Record<String, ExtensionInfo>` - ключи это имена расширений, а каждое значение это объект, содержащий свойства `name` и `version`.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

The method will also not return if the extension's manifest is missing or incomplete.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Удаляет расширение DevTools с указанным именем.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `BrowserWindow.getDevToolsExtensions()`

Возвращает `Record<string, ExtensionInfo>` - ключи это имена расширений, а каждое значение это объект, содержащий свойства `name` и `version`.

To check if a DevTools extension is installed you can run the following:

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

### Instance Properties

Objects created with `new BrowserWindow` have the following properties:

```javascript
const { BrowserWindow } = require('electron')
// В этом примере `win` это наш экземпляр
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` *Readonly*

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

#### `win.id` *Readonly*

Свойство `Integer` представляющее уникальный идентификатор окна.

#### `win.autoHideMenuBar`

Свойство `Boolean`, которое определяет, должна ли панель меню автоматически скрываться. После установки панель меню будет показываться, только когда пользователь нажмет на клавишу `Alt`.

Если панель меню уже видна, установка этого свойства в `true` не будет скрывать ее немедленно.

#### `win.minimizable`

Свойство `Boolean` определяет, может ли окно быть вручную свернуто пользователем.

В Linux setter это невозможно, хотя getter возвращает `true`.

#### `win.maximizable`

Свойство `Boolean` определяет, может ли окно быть вручную развернуто пользователем.

В Linux setter это невозможно, хотя getter возвращает `true`.

#### `win.fullScreenable`

Свойство `Boolean` которое определяет, может ли кнопка увеличить/зумировать окно переключать полноэкранный режим или увеличивать до предела окно.

#### `win.resizable`

Свойство `Boolean` определяет, может ли окно быть вручную изменено пользователем.

#### `win.closable`

Свойство `Boolean` определяет, может ли окно быть вручную закрыто пользователем.

В Linux setter это невозможно, хотя getter возвращает `true`.

#### `win.movable`

Свойство `Boolean` определяет, может ли окно перемещаться пользователем.

В Linux setter это невозможно, хотя getter возвращает `true`.

#### `win.excludedFromShownWindowsMenu` *macOS*

Свойство `Boolean` определяет, исключено ли окно из меню Windows приложения. `false` по умолчанию.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Методы экземпляра

Objects created with `new BrowserWindow` have the following instance methods:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

#### `win.destroy()`

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Focuses on the window.

#### `win.blur()`

Removes focus from the window.

#### `win.isFocused()`

Returns `Boolean` - Whether the window is focused.

#### `win.isDestroyed()`

Returns `Boolean` - Whether the window is destroyed.

#### `win.show()`

Shows and gives focus to the window.

#### `win.showInactive()`

Shows the window but doesn't focus on it.

#### `win.hide()`

Скрывает окно.

#### `win.isVisible()`

Returns `Boolean` - Whether the window is visible to the user.

#### `win.isModal()`

Returns `Boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Unmaximizes the window.

#### `win.isMaximized()`

Возвращает `Boolean` - если окно развернуто.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restores the window from minimized state to its previous state.

#### `win.isMinimized()`

Возвращает `Boolean` - если окно свернуто.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Sets whether the window should be in fullscreen mode.

#### `win.isFullScreen()`

Returns `Boolean` - Whether the window is in fullscreen mode.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) (опционально) - дополнительный размер, который не будет включен при соотношении сторон.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). По умолчанию `#FFF` (белый).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - абсолютный путь до файла, для предпросмотра в QuickLook. Это важно, так как QuickLook использует имя файла и расширение файла из пути, чтобы определить тип содержимого файла для открытия.
* `displayName` String (опционально) - имя файла, для отображения в модальном виде QuickLook. Это чисто визуально и не влияет на тип содержимого файла. По умолчанию `path`.

Использует [QuickLook](https://en.wikipedia.org/wiki/Quick_Look) для предпросмотра файла, по данному пути.

#### `win.closeFilePreview()` *macOS*

Закрывает текущую открытую панель [QuickLook](https://en.wikipedia.org/wiki/Quick_Look).

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (опционально) *macOS*

Изменяет размер и перемещает окно в заданные границы. Любые свойства, которые не заданы, будут установлены в их текущее значение.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// Установить все свойства границы
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// Установить одно свойство границы
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

Возвращает [`Rectangle`](structures/rectangle.md) - `границы` окна как `объект`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (необязательно) *macOS*

Меняет размеры и перемещает клиентскую область окна (например, веб-страницу) на заданные границы.

#### `win.getContentBounds()`

Возвращает [`Rectangle`](structures/rectangle.md) - `границы` области клиентского окна как `объект`.

#### `win.getNormalBounds()`

Возвращает [`Rectangle`](structures/rectangle.md) - содержит границы окна в нормальном состоянии

**Примечание:** Независимо от текущего состояния окна: увеличено до предела, свернуто или в полноэкранном режиме, эта функция всегда возвратит позицию и размер окна в нормальном состоянии. В нормальном состоянии, getBounds и getNormalBounds возвращают тот же [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Включает или выключает окно.

#### `win.isEnabled()`

Возвращает Boolean - включено ли окно.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (опционально) *macOS*

Меняет размер окна на `width` и `height`. Если `width` или `height` ниже любого ограничения минимального размера окна, будет зафиксировано на минимальном размере.

#### `win.getSize()`

Возвращает `Integer[]` - Содержит высоту и ширину окна.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (необязательно) *macOS*

Меняет размер клиентской области окна (например, веб-страница) на `width` и `height`.

#### `win.getContentSize()`

Возвращает `Integer[]` - содержит ширину и высоту клиентской области окна.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Устанавливает минимальный размер окна на `width` и `height`.

#### `win.getMinimumSize()`

Возвращает `Integer[]` - содержит минимальную ширину и высоту окна.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Устанавливает максимальный размер окна на `width` и `height`.

#### `win.getMaximumSize()`

Возвращает `Integer[]` - содержит максимальную ширину и высоту окна.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Устанавливает, может ли пользователь вручную изменять размер окна.

**[Устарело](modernization/property-updates.md)**

#### `win.isResizable()`

Возвращает `Boolean` - Когда окно может быть изменено пользователем вручную.

**[Устарело](modernization/property-updates.md)**

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Устанавливает, может ли пользователь перемещать окно. На Linux ничего не делает.

**[Устарело](modernization/property-updates.md)**

#### `win.isMovable()` *macOS* *Windows*

Возвращает `Boolean` - может пользователь перемещать окно или нет.

На Linux всегда возвращает `true`.

**[Устарело](modernization/property-updates.md)**

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Устанавливает, может ли пользователь вручную сворачивать окно. На Linux ничего не делает.

**[Устарело](modernization/property-updates.md)**

#### `win.isMinimizable()` *macOS* *Windows*

Возвращает `Boolean` - может пользователь вручную сворачивать окно или нет

На Linux всегда возвращает `true`.

**[Устарело](modernization/property-updates.md)**

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Устанавливает, может ли пользователь вручную увеличивать до предела окно. На Linux ничего не делает.

**[Устарело](modernization/property-updates.md)**

#### `win.isMaximizable()` *macOS* *Windows*

Возвращает `Boolean` - может пользователь вручную увеличивать до предела окно или нет.

На Linux всегда возвращает `true`.

**[Устарело](modernization/property-updates.md)**

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Устанавливает, может ли кнопка увеличить/зумировать окно переключать полноэкранный режим или увеличивать до предела окно.

**[Устарело](modernization/property-updates.md)**

#### `win.isFullScreenable()`

Возвращает `Boolean` - может ли кнопка увеличить/зумировать окно переключать полноэкранный режим или увеличивать до предела окно.

**[Устарело](modernization/property-updates.md)**

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Устанавливает, может ли пользователь вручную закрыть окно. На Linux ничего не делает.

**[Устарело](modernization/property-updates.md)**

#### `win.isClosable()` *macOS* *Windows*

Возвращает `Boolean` - может пользователь вручную закрывать окно или нет.

На Linux всегда возвращает `true`.

**[Устарело](modernization/property-updates.md)**

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (опционально) *macOS* *Windows* - Значения включают `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver` и ~~`dock`~~ (Устарело). По умолчанию `floating`, когда `flag` установлен true. `level` сбрасывается на `normal`, когда флаг устанавливается false. Обратите внимание, что от `floating` до `status` включительно, окно находится под Dock в macOS и под панелью задач в Windows. От `pop-up-menu` и выше отображается над Dock на macOS и выше панели задач на Windows. Смотрите [документацию macOS](https://developer.apple.com/documentation/appkit/nswindow/level) для подробностей.
* `relativeLevel` Integer (опционально) *macOS* - количество слоев выше, чтобы установить окно относительно заданного `level`. По умолчанию - `0`. Обратите внимание, что Apple не рекомендует устанавливать уровни выше, чем 1 верхнего `screen-saver`.

Устанавливает, должно ли окно всегда показываться поверх остальных окон. После настройки, окно все еще является нормальным, не окно панели инструментов, которое не может быть сфокусировано.

#### `win.isAlwaysOnTop()`

Возвращает `Boolean` - всегда ли окно поверх остальных окон.

#### `win.moveTop()`

Перемещает окно на верх(z-order) независимо от фокуса

#### `win.center()`

Перемещает окно в центр экрана.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (необязательно) *macOS*

Перемещает окно на `x` и `y`.

#### `win.getPosition()`

Возвращает `Integer[]` - содержит текущую позицию окна.

#### `win.setTitle(title)`

* `title` String

Изменяет название нативного окна на `title`.

#### `win.getTitle()`

Возвращает `String` - название нативного окна.

**Примечание:** Название веб-страницы может отличаться от названия нативного окна.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (опционально)

Изменяет точку прикрепления для листов на macOS. По умолчанию, листы прикреплены под рамкой окна, но Вы можете отобразить их под панелью инструментов HTML. Например:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Makes the window not show in the taskbar.

#### `win.setKiosk(flag)`

* `flag` Boolean

Enters or leaves the kiosk mode.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` *Windows*

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` *macOS*

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` *macOS*

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture

Возвращает `Promise<NativeImage>` - разрешается с [NativeImage](native-image.md)

Захватывает снимок страницы в границах `rect`. Пропустив `rect`, будет сделан захват всей видимой страницы.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (опционально) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (опционально) - HTTP Referrer.
  * `userAgent` String (опционально) - user-agent, создающий запрос.
  * `extraHeaders` String (опционально) - дополнительные заголовки, разделенные "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (опционально)
  * `baseURLForDataURL` String (опционально) - Базовый URL (с разделителем пути), для файлов, которые будут загружены по URL данных. Это необходимо, только если указанный `url` это URL данных и необходимо загрузить другие файлы.

Возвращает `Promise<void>` - промис будет разрешен, когда страница завершит загрузку (см. [`did-finish-load`](web-contents.md#event-did-finish-load)), и отклоняет, если страница не удачно загрузилась (см. [`did-fail-load`](web-contents.md#event-did-fail-load)).

Тоже, что и [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

You can load a URL using a `POST` request with URL-encoded data by doing the following:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (опционально) 
  * `query` Record<String, String> (опционально) - переданная в `url.format()`.
  * `search` String (опционально) - переданная в `url.format()`.
  * `hash` String (опционально) - переданная в `url.format()`.

Возвращает `Promise<void>` - промис будет разрешен, когда страница завершит загрузку (см. [`did-finish-load`](web-contents.md#event-did-finish-load)), и отклоняет, если страница не удачно загрузилась (см. [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Устанавливает `menu` в меню окна.

#### `win.removeMenu()` *Linux* *Windows*

Удаляет меню окна.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (опционально) 
  * `mode` String *Windows* - режим для индикатора прогресса. Может быть `none`, `normal`, `indeterminate`, `error` или `paused`.

Устанавливает значение прогресса в индикатор прогресса. Допустимый диапазон - [0, 1.0].

Удаляет индикатор прогресса, когда прогресс меньше 0; Изменяет в режим indeterminate, когда прогресс больше 1.

На платформе Linux поддерживается только рабочая среда Unity, Вам необходимо указать имя файла `*.desktop` в поле `desktopName` в `package.json`. По умолчанию будет предполагаться `{app.name}.desktop`.

На Windows режим может быть передан. Принимаемые значения: `none`, `normal`, `indeterminate`, `error` и `paused`. Если Вы вызовете `setProgressBar` без установленного режима (но со значением в пределах допустимого диапозона), будет предполагаться `normal`.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - иконка, которая будет отображаться в правом краю иконки на панели задач. Если параметр `null`, оверлей будет очищен
* `description` String - описание, которое будет представлено для доступности чтения с экрана

Устанавливает 16x16 пиксельный оверлей поверх текущей иконки в панели задач, обычно используется для передачи какого-либо статуса приложения или пассивного уведомления пользователя.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Устанавливает, будет ли окно иметь тень.

#### `win.hasShadow()`

Возвращает `Boolean` - был ли вызов успешным.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - между 0.0 (полная прозрачность) и 1.0 (полная видимость)

Устанавливает прозрачность окна. В Linux ничего не делает. Значения вне номера ограничены диапазоном [0, 1].

#### `win.getOpacity()`

Возвращает `Number` - между 0.0 (полная прозрачность) и 1.0 (полная видимость). В Linux всегда возвращает 1.

#### `win.setShape(rects)` *Windows* *Linux* *Экспериментально*

* `rects` [Rectangle[]](structures/rectangle.md) - устанавливает форму окна. Передача пустого списка возвращает окно к прямоугольной форме.

Установка формы окна, которая определяет область в окне, где система разрешает отрисовку и взаимодействие пользователя. Вне данного региона ни один пиксель не отрисуется и ни одно событие мыши не будет зарегистрировано. Вне региона события мыши не будут получены этим окном, но будет передаваться чему-либо позади окна.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Возвращает `Boolean` - успешно ли добавлены кнопки

Добавляет панель миниатюр, с определенным набором кнопок, на слой кнопок в изображении эскиза окна в панели задач. Возвращает объект `Boolean`, который указывает успешно ли добавлена панель миниатюр.

Количество кнопок в панели миниатюр не должно быть больше, чем 7, из-за ограничений. После установки панели миниатюр, панель не может быть удалена, из-за ограничений платформы. Но Вы можете вызвать метод с пустым массивом, чтобы убрать кнопки.

`buttons` является массивом объектов `Button`:

* `Button` Object 
  * `icon` [NativeImage](native-image.md) - иконка, отображаемая на панели миниатюр.
  * `click` Function
  * `tooltip` String (опционально) - текст всплывающей подсказки на кнопке.
  * `flags` String[] (опционально) - контроль определенных состояний и поведений кнопки. По умолчанию `['enabled']`.

`flags` — это массив, который может включать следующие `строки`:

* `enabled` - кнопка активна и доступна пользователю.
* `disabled` - кнопка отключена. Она присутствует, но имеет неактивное визуальное состояние и не будет реагировать на действия пользователя.
* `dismissonclick` - когда кнопка нажата, окно панели миниатюр закрывается немедленно.
* `nobackground` - не рисует границы кнопки, использует только изображение.
* `hidden` - кнопка не отображается пользователю.
* `noninteractive` - кнопка включена, но не интерактивная; рисуется не нажимаемое состояние кнопки. Это значение предназначено для экземпляров, где кнопка используется в уведомлении.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - область окна

Устанавливает область окна, которая будет показана в панели миниатюр, при наведении мыши на окно в панели задач. Вы можете сбросить панель миниатюры, чтобы показывалось окно полностью, указав пустую область: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Устанавливает всплывающую подсказку, которая будет отображена, при наведении мыши на панель миниатюры окна в панели задач.

#### `win.setAppDetails(options)` *Windows*

* `options` Object 
  * `appId` String (опционально) - [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx) окна. Это должно быть установлено, иначе остальные параметры не будут иметь никакого эффекта.
  * `appIconPath` String (опционально) - [иконка перезапуска](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx) окна.
  * `appIconIndex` Integer (опционально) - индекс иконки в `appIconPath`. Игнорируется, когда `appIconPath` не установлено. По умолчанию - `0`.
  * `relaunchCommand` String (опционально) - [команда перезапуска](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx) окна.
  * `relaunchDisplayName` String (опционально) - [отображаемое имя перезапуска](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx) окна.

Устанавливает свойства для кнопки окна на панели задач.

**Примечание:** `relaunchCommand` и `relaunchDisplayName` должны быть установлены вместе. Если одно из этого свойства не будет установлено, тогда ни одно из них не будет использоваться.

#### `win.showDefinitionForSelection()` *macOS*

Тоже, что и `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Меняет иконку окна.

#### `win.setWindowButtonVisibility(visible)` *macOS*

* `visible` Boolean

Устанавливает, должны ли быть видны кнопки контроля окна.

Этот метод невозможно вызвать, когда `titleBarStyle` установлено в `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

**[Устарело](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

**[Устарело](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (опционально) 
  * `visibleOnFullScreen` Boolean (опционально) *macOS* - устанавливает видимость панели меню в полноэкранном режиме окна

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Примечание:** Данный API всегда возвращает false в Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (опционально) 
  * `forward` Boolean (опционально) *macOS* *Windows* - Если true, перенаправляет сообщения о передвижение мыши в Chromium, включая события мыши, такие как `mouseleave`. Используется, только когда `ignore` - true. Если `ignore` - false, перенаправление всегда будет отключено, независимо от этого значения.

Включает для окна игнорирование событий от мыши.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Предотвращает захват содержимого окна другими приложениями.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *macOS* *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

На macOS он не снимает фокус с окна.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Возвращает `BrowserWindow` - родительское окно.

#### `win.getChildWindows()`

Возвращает `BrowserWindow[]` - все дочерние окна.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` *macOS*

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` *macOS*

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` *macOS*

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` *macOS*

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` *macOS*

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` *macOS*

* `type` String | null - Может быть `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window` и `under-page`. Смотрите [документацию macOS](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) для подробностей.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Обратите внимание, что `appearance-based`, `light`, `dark`, `medium-light` и `ultra-dark` устарела и будет удалена в следующей версии macOS.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Примечание:** TouchBar API в настоящее время является экспериментальным и может быть изменен или удален в будущих версиях Electron.

#### `win.setBrowserView(browserView)` *Экспериментально*

* `browserView` [BrowserView](browser-view.md) | null - Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` *Experimental*

Возвращает `BrowserView | null` - BrowserView, которое прикреплено. Возвращает `null`, если не прикреплено. Выбрасывает ошибку, если прикреплены множественные BrowserView.

#### `win.addBrowserView(browserView)` *Экспериментально*

* `browserView` [BrowserView](browser-view.md)

Заменяет метод setBrowserView, для поддержки работы с множественными видами браузера.

#### `win.removeBrowserView(browserView)` *Экспериментально*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` *Экспериментально*

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Примечание:** BrowserView API в настоящее время экспериментально и может измениться или быть удалено в будущих релизах Electron.