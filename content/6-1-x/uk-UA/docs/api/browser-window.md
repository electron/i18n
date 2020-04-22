# BrowserWindow

> Створіть та керуйте вікнами браузера.

Процес: [Main](../glossary.md#main-process)

```javascript
// В головному процесі.
const { BrowserWindow } = require('electron')

// Чи використовуйте `remote` з процесу рендеринга.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

// Завантажити зовнішнє URL
win.loadURL('https://github.com')

// Чи завантажити локальний HTML файл
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Вікно без рамки

Щоб створити вікно без chrome, чи прозоре вікно потрібної фігури, ви можете використати API [Вікна без рамки](frameless-window.md).

## Показати вікно витончено

Коли сторінка завантажується прямо у вікні, користувач може бачити її поступово, що не є гарною практикою для нативного застосунку. Щоб відобразити вікно без візуального спалаху, є два рішення для різних ситуацій.

### Використання події `ready-to-show`

Під час завантаження сторінки, подія `ready-to-show` буде викликана, коли процес рендерингу перший раз збере сторінку, якщо вікно ще не показано. Відображення вікна після цієї події не буде мати візуального спалаху:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Ця подія зазвичай викликається після події `did-finish-load`, але для сторінок з віддаленими ресурсами, вона може бути викликана перед `did-finish-load`.

### Встановлення кольору фону (`backgroundColor`)

Для складного застосунку, подія `ready-to-show` може бути викликана занадто пізно, роблячи застосунок помітно повільним. В такому випадку рекомендовано показувати вікно негайно і використовувати `backgroundColor` для встановлення кольору фону застосунку:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Зауважте, що для застосунків, які використовують подію `ready-to-show`, також рекомендовано встановлювати `backgroundColor`, щоб зробити застосунок більш нативним.

## Батьківські та дочірні вікна

Використовуючи параметр `parent`, ви можете створити дочірні вікна:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

Дочірнє (`child`) вікно завжди відображається поверх верхнього (`top`) вікна.

### Модальні вікна

Модальне вікно - це дочірнє вікно, що відключає батьківське вікно. Щоб створити модельне вікно, ви повинні встановити `parent` та `modal` параметри:

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

### Видимість сторінки

[Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) працює наступним чином:

* На всіх платформах, стан видимості показує чи вікно приховане/згорнуте чи ні.
* Додатково на macOS, стан видимості також показує перекрите іншим. Якщо вікно повністю перекрите іншим, стан видимості буде `hidden`. На інших платформах, стан видимості буде `hidden` тільки коли вікно згорнуте чи явно приховане за допомогою `win.hide()`.
* Якщо `BrowserWindow` створено з `show: false`, початковий стан видимості буде `visible`, незважаючи на те, що вікно буде приховане.
* Якщо `backgroundThrottling` вимкнено, стан видимості буде залишатися `visible` навіть, якщо вікно згорнуте, перекрите іншим чи приховане.

Рекомендовано призупиняти складні операції, коли стан видимості є `hidden` для зменшення споживання енергії.

### Зауваження

* На macOS модальні вікна будуть відображені як сторінки прикріплені до батьківського вікна.
* На macOS дочірні вікна будуть зберігати відносну позицію до батьківського вікна. якщо воно рухається, тоді як на Windows та Linux дочірнє вікно не рухається.
* На Linux тип модального вікна буде змінено на `dialog`.
* На Linux багато середовищ робочого столу не підтримують приховування модального вікна.

## Клас: BrowserWindow

> Створіть та керуйте вікнами браузера.

Процес: [Main](../glossary.md#main-process)

`BrowserWindow` це [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Він створює нове `BrowserWindow` з нативними властивостями, визначеними в `options`.

### `new BrowserWindow([options])`

* `options` Object (optional)
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) (**required** if y is used) - Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) (**required** if x is used) - Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (опціонально) - `width` та `height` будуть використовуватися як розміри веб-сторінки, що означає що фактичні розміри вікна будуть включати розміри рамки і будуть трошки більшими. За замовчуванням `false`.
  * `center` Boolean (опціонально) - Показати вікно в центрі екрану.
  * `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. За замовчуванням `true`.
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. За замовчуванням `true`.
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. За замовчуванням `true`.
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. За замовчуванням `true`.
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. За замовчуванням `true`.
  * `focusable` Boolean (опціонально) - Чи можна передати фокус вікну. За замовчуванням `true`. На Windows встановлення `focusable: false` також передбачає встановлення `skipTaskbar: true`. На Linux встановлення `focusable: false` припиняє взаємодію вікна з середовищем, так що вікно завжди буде залишатися поверх всіх робочих областей.
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. За замовчуванням `false`.
  * `fullscreen` Boolean (опціонально) - Чи вікно має відображатися в повноекранному режимі. Коли явно встановлено в `false` кнопка повноекранного режиму буде прихована чи недоступна на macOS. За замовчуванням `false`.
  * `fullscreenable` Boolean (опціонально) - Чи вікно можна перевести в повноекранний режим. На macOS, також показує чи кнопка розгортання/збільшення має перемикати повноекранний режим чи розгортати вікно. За замовчуванням `true`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. За замовчуванням `false`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. За замовчуванням `false`.
  * `title` String (опціонально) - Заголовок вікна за замовчуванням. За зімовчуванням `"Electron"`. Якщо визначений HTML тег `<title>` в файлі HTML, який завантажено за допомогою `loadURL()`, ця властивість буде проігнорована.
  * `icon` ([NativeImage](native-image.md) | String) (опціонально) - Піктограма вікна. На Windows рекомендовано використовувати `ICO` піктограми, щоб отримати найкращі візуальні ефекти, ви також можете залишити її невизначеною, тоді використається піктограма виконуваного файлу.
  * `show` Boolean (optional) - Whether window should be shown when created. За замовчуванням `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). За замовчуванням `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. За замовчуванням `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. За замовчуванням `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. За замовчуванням `false`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. За замовчуванням `false`.
  * `backgroundColor` String (опціонально) - Колір фону вікна, як шістнадцяткове значення, як `#66CD00` чи `#FFF` чи `#80FFFFFF` (альфа в форматі #AARRGGBB підтримується якщо `transparent` встановлено в `true`). За замовчуванням `#FFF` (білий).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. За замовчуванням `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. За замовчуванням `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). За замовчуванням `false`.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Можливі значення:
    * `default` - Стандартна непрозора Mac панель заголовків.
    * `hidden` - Прихована панель заголовків і контент на розмір вікна, поки панель заголовків досі має стандартні кнопки керування ("світлофори") вгорі зліва.
    * `hiddenInset` - Прихована панель заголовків з альтернативним виглядом, де кнопки керування трохи більш віддалені від краю вікна.
    * `customButtonsOnHover` Boolean (опціонально) - Малювати кастомізовані кнопки керування на безрамковому вікні macOS. Ці кнопки не будуть відображатися, якщо на не наводити на верхній лівий край вікна. Ці кастомізовані кнопки запобігають проблемам з подіями мишки, які виникають з стандартними кнопками вікна. **Примітка:** Ця властивість поки тестується.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. За замовчуванням `false`.
  * `thickFrame` Boolean (опціонально) - Використовувати стиль `WS_THICKFRAME` для безрамкових вікон на Windows, який додає стандартну рамку вікну. Встановіть в `false`, щоб видалити тінь та анімацію вікна. За замовчуванням `true`.
  * `vibrancy` String (опціонально) - Додати тип ефекту вібрації вікна, тільки на macOS. Може бути `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` чи `ultra-dark`.  Майте на увазі, що використання `frame: false` в поєднанні з значенням вібрації також вимагає використання не звичайних `titleBarStyle`.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. Якщо `true`, вікно виросте до обраної ширини веб-сторінки при масштабуванні, `false` спричинить масштабування до ширини екрану. Це також вплине на поведінку при виклиці безпосередньо `maximize()`. За замовчуванням `false`.
  * `tabbingIdentifier` String (опціонально) - Назва групи вкладок, дозволяє відкривати вікно як нативну вкладку на macOS 10.12+. Вікна з такими самими ідентифікаторами вкладок будуть згруповані разом. Це такоє додає нативну кнопку нової вкладки до панель вкладок вашого вікна та дозволяє вашому `app` та вікну отримувати подію `new-window-for-tab`.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (опціонально) - Чи вмикати DevTools. Якщо встановлено в `false`, не можна використовувати `BrowserWindow.webContents.openDevTools()` для відкриття DevTools. За замовчуванням `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. За замовчуванням `false`.
    * `nodeIntegrationInWorker` Boolean (опціонально) - Чи Node.js інтеграція увімкнена в веб-воркерах. За замовчуванням `false`. Більше інформації можна знайти в [Багатопоточності](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (опціонально) - Експериментальна опція для вмикання підтримки Node.js в підфреймах таких як iframe та дочірні вікна. Всі передзавантаження будуть завантажуватися для кожного iframe, ви можете використовувати `process.isMainFrame` для визначення чи ви в головному фреймі чи ні.
    * `preload` String (опціонально) - Визначає скрипт, який буде завантажено перед запуском інших скриптів на сторінці. Цей скрипт завжди буде мати доступ до Node.js API, в незалежності чи Node.js інтеграція увімкнена чи ні. Значенням має бути абсолютний шлях до скрипта. Коли Node.js інтеграція вимкнена, скрипт може представити глобальні символи Node назад в глобальне середовище. Дивись приклад [тут](process.md#event-loaded).
    * `sandbox` Boolean (опціонально) - Якщо встановлено, це запустить рендерер, який асоціюється з вікном, у тестовому режимі, роблячи його сумісним з тестуванням Chromium рівня ОС і вимикаючи движок Node.js. Це не те саме що і опція `nodeIntegration` і API, доступне для попередньої підгрузки скриптів, є більш обмеженим. Читайте більше про опцію [тут](sandbox-option.md). **Примітка:** Ця опція наразі екпериментальна і може бути змінена чи видалена в майбутніх релізах Electron.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. За замовчуванням `true`.
    * `session` [Session](session.md#class-session) (опціонально) - Встановлює сесію, яку використовує сторінка. Замість того щоб передавати об'єкт Session напряму, ви можете також використовувати опцію `partition`, яка приймає стрічку розділу. Коли передається і `session` і `partition`, `session` буде мати перевагу. За замовчуванням звичайна сесія.
    * `partition` String (опціонально) - Встановлює сесію, яка використовується сторінкою відповідно до стрічок розділу сесії. Якщо `partition` починається з `persist:`, сторінка буде використовувати стійку сесію доступну всім сторінкам застосунку з однаковим `partition`. Якщо префікс `persist:` відсутній, сторінка буде використовувати сесію пам'яті. Призначаючи однаковий `partition`, декілька сторінок можуть спільно використовувати однакову сесію. За замовчуванням звичайна сесія.
    * `affinity` String (опціонально) - Коли визначено, веб сторінки з однаковою `affinity` будуть запускатися в одному рендер процесі. Зауважте що через повторне використання рендер процесу певні опції `webPreferences` також будуть поширюватися між веб сторінками, навіть якщо ви вказали різні значення для них, включаючи але не обмежуючись `preload`, `sandbox` і `nodeIntegration`. Тому рекомендується використовувати ті самі `webPreferences` для веб сторінок з однаковою `affinity`. _Ця властивість експериментальна_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. За замовчуванням `true`.
    * `webSecurity` Boolean (опціонально) - Коли `false`, вимикається політику походження з того ж джерела (зазвичай використовується тестуванням веб-сайтів людьми), і встановить `allowRunningInsecureContent` в `true` якщо ця опція не була встановлена користувачем. За замовчуванням `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. За замовчуванням `false`.
    * `images` Boolean (optional) - Enables image support. За замовчуванням `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. За замовчуванням `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. За замовчуванням `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. За замовчуванням `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. За замовчуванням `false`.
    * `enableBlinkFeatures` String (опціонально) - Список особливостей, розділений за допомогою `,`, таких як `CSSVariables,KeyboardEventKey`, доступних для вмикання. Повний список особливостей, що пітримуються, можна знайти в файлі [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `disableBlinkFeatures` String (опціонально) - Список особливостей, розділений за допомогою `,`, таких як `CSSVariables,KeyboardEventKey`, доступних для вимикання. Повний список особливостей, що пітримуються, можна знайти в файлі [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
      * `standard` String (опціонально) - За замовчуванням `Times New Roman`.
      * `serif` String (опціонально) -За замовчуванням `Times New Roman`.
      * `sansSerif` String (опціонально) - За замовчуванням `Arial`.
      * `monospace` String (опціонально) - За замовчуванням `Courier New`.
      * `cursive` String (опціонально) - За замовчуванням `Script`.
      * `fantasy` String (опціонально) - За замовчуванням `Impact`.
    * `defaultFontSize` Integer (опціонально) - За замовчуванням `16`.
    * `defaultMonospaceFontSize` Integer (опціонально) - За замовчуванням `13`.
    * `minimumFontSize` Integer (опціонально) - За замовчуванням `0`.
    * `defaultEncoding` String (опціонально) - За замовчуванням `ISO-8859-1`.
    * `backgroundThrottling` Boolean (опціонально) - Чи забороняти анімацію і таймери, коли сторінка стає фоновою. Це також впливає на [Page Visibility API](#page-visibility). За замовчуванням `true`.
    * `offscreen` Boolean (опціонально) - Чи вмикати позаекранний рендеринг вікна браузера. За замовчуванням `false`. Дивіться [інструкцію позаекранного рендерингу](../tutorial/offscreen-rendering.md) для детальнішої інформації.
    * `contextIsolation` Boolean (опціонально) - Чи запускати API Electron і визначені `preload` скрипти в окремому контексті JavaScript. За замовчуванням `false`. Контекст, в якому будуть запускатися `preload` скрипти, все ще буде мати повний доступ до глобальних `document` і `window`, але буде використовувати власні визначені JavaScript вбудовані конструкції (`Array`, `Object`, `JSON`, тощо) і буде ізольований від змін глобального середовища під час завантаження сторінки. API Electron буде доступне тільки в `preload` скрипті, аое не на завантаженій сторінці. Цю поцію слід використовувати, коли підвантажується потенційно ненадійний контент віддалений, щоб переконатися, що вміст не зможе втрутитися в `preload` скрипт і API Electron не буде використане. Ця опція використовує таку саму техніку як і [Контент Скрипти Chrome](https://developer.chrome.com/extensions/content_scripts#execution-environment). Цей контекст доступний в інтрументах розробника при виборі пункту 'Ізольований Контекст Electron' в полі зі списком вгорі вкладки Консоль.
    * `nativeWindowOpen` Boolean (опціонально) - Чи використовувати нативну `window.open()`. За замовчуванням `false`. Дочірні вікна завжди будуть мати вимкнену інтеграцію з Node.js, якщо тільки не `nodeIntegrationInSubFrames` є true. **Примітка:** Ця опція наразі експериментальна.
    * `webviewTag` Boolean (опціонально) - Чи вмикати [`<webview>` тег](webview-tag.md). За замовчуванням `false`. **Примітка:** `preload` скрипт, сконфігурований для `<webview>` буде мати ввімкнену інтеграцію з Node.js, коли він буде виконуватися, тому ви маєте впевнитися, що віддалений/ненадійний контент не може створювати `<webview>` тег з потенційно зловмисним `preload` скриптом. Ви можете використовуват подію `will-attach-webview` на [webContents](web-contents.md), щоб стерти `preload` скрипт і провалідувати чи змінити початкові налаштування `<webview>`.
    * `additionalArguments` String[] (опціонально) - Список стрічок, які будуть додані до `process.argv` в рендер процесі застосунку. Корисно для передачі маленьких шматків інформації в скрипти передзавантаження рендер процесу.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. За замовчуванням `false`.
    * `safeDialogsMessage` String (опціонально) - Повідомлення для відображення коли увімкнено захист послідовного діалогу. Якщо не визначено, буде використано повідомлення за замовчуванням, зауважте, що наразі повідомлення за замовчуванням на англійській і не локалізується.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. За замовчуванням `false`.
    * `autoplayPolicy` String (опціонально) - Політика автовідтворення для застосування до вмісту вікна, може бути `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. За замовчуванням `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.

Коли встановлюються мінімальні та максимальні розміри вікна `minWidth`/`maxWidth`/`minHeight`/`maxHeight`, це лише обмежує користувачів. Це не перешкодить вам передати розмір, який не відповідає обмеженням в `setBounds`/`setSize` чи конструкторі `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Можливі значення:

* На Linux, допустимі значення `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`.
  * Тип `textured` додає вигляд металевого градієнта (`NSTexturedBackgroundWindowMask`).
  * Тип `desktop` розміщує вікно на рівні фону робочого столу (`kCGDesktopWindowLevel - 1`). Зауважте, що вікно робочого столу не отримає фокус, події клавіаутри чи мишки, але ви можете використати `globalShortcut`, щоб отримати бідний ввід.
* На Windows, допустимим типом є `toolbar`.

### Події Екземпляру

Об'єкти створені за допомогою `new BrowserWindow` викликають наступні події:

**Примітка:** Деякі події доступні тільки на певних операційних системах і відповідно позначені як такі.

#### Подія: 'page-title-updated'

Повертає:

* `event` Event
* `title` String
* `explicitSet` Boolean

Викликається коли документ змінює заголовок, виклик `event.preventDefault()` буде запобігати зміні нативного заголовку вікна. `explicitSet` дорівнює false коли заголовок синтезовано з посилання.

#### Подія: 'close'

Повертає:

* `event` Event

Викликається коли вікно збирається закриватися. Викликається перед подія `beforeunload` і `unload` DOMу. Виклик `event.preventDefault()` буде скасовувати закриття вікна.

Зазвичай ви захочете використати обробник `beforeunload`, щоб вирішити чи закривати вікно, який також викликається коли вікно перезавантажується. В Electron, повернення будь-якого значення відмінного від `undefined` буде скасовувати закриття. Наприклад:

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // На відміну від звичайного браузера це повідомлення буде відображене користувачу, повернення
  // будь-якого значення буде мовчки скасовувати закриття вікна.
  // Рекомендується використати API діалогу, щоб дозволити користувачу підтвердити закриття
  // застосунку.
  e.returnValue = false // аналогічно до `return false` але не рекомендовано
}
```
_**Примітка**: Є тонка різниця між поведінками `window.onbeforeunload = handler` та `window.addEventListener('beforeunload', handler)`. Рекомендується завжди встановлювати `event.returnValue` явно, замість того, щоб просто повертати значення, так як перше працює більш постійно з Electron._

#### Подія: 'closed'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Подія: 'session-end' _Windows_

Викликається коли вікно збирається закритися через примусове вимкнення чи перезавантаження машини чи вилогінюваня.

#### Подія: 'unresponsive'

Викликається коли сторінка не відповідає.

#### Подія: 'responsive'

Викликається коли сторінка знову починає відповідати.

#### Подія: 'blur'

Викликається коли вікно втрачає фокус.

#### Подія: 'focus'

Викликається коли вікно отримує фокус.

#### Подія: 'show'

Викликається коли вікно показується.

#### Подія: 'hide'

Викликається коли вікно приховується.

#### Подія: 'ready-to-show'

Викликається коли веб-сторінка зрендерена (поки не показується) і може бути відображена без візуального спалаху.

#### Подія: 'maximize'

Викликається коли вікно максимізується.

#### Подія: 'unmaximize'

Викликається коли вікно виходить з максимізованого режиму.

#### Подія: 'minimize'

Викликається коли вікно згортається.

#### Подія: 'restore'

Викликається коли вікно розгортається.

#### Подія: 'will-resize' _macOS_ _Windows_

Повертає:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - Розмір до якого буде змінено розмір вікна.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Подія: 'resize'

Викликається коли вікно змінює розмір.

#### Подія: 'will-move' _Windows_

Повертає:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - Позиція куди буде пересуното вікно.

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Подія: 'move'

Викликається коли вікно переміщується в нове місце.

__Примітка__: На macOS ця подія є іншою назвою `moved`.

#### Подія: 'moved' _macOS_

Викликається один раз коли вікно переміщується в нове місце.

#### Подія: 'enter-full-screen'

Викликається коли вікно входить в повноекранний режим.

#### Подія: 'leave-full-screen'

Викликається коли вікно виходить з повноекранного режиму.

#### Подія: 'enter-html-full-screen'

Викрикається коли вікно входить в повноекранний режим через HTML API.

#### Подія: 'leave-html-full-screen'

Викликається коли вікно виходить з повноекранного режиму через HTML API.

#### Подія: 'always-on-top-changed'

Повертає:

* `event` Event
* `isAlwaysOnTop` Boolean

Викликається при вмиканні чи вимиканні опції завжди показувати вікно поверх інших вікон.

#### Подія: 'app-command' _Windows_ _Linux_

Повертає:

* `event` Event
* `command` String

Відбувається коли викликається [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx). Це зазвичай пов'язано з медіа клавішами чи браузерними командами, такими як кнопка "Назад" вбудованими в деякі мишки на Windows.

Команди пишуться маленькими буквами, підчерки замінені на дефіси і пропускається префікс `APPCOMMAND_`. Наприклад, `APPCOMMAND_BROWSER_BACKWARD` викликається як `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Переходить назад коли юзер натискає кнопку назад
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

Наступні команди явно підтримуються на Linux:

* `browser-backward`
* `browser-forward`

#### Подія: 'scroll-touch-begin' _macOS_

Викликається коли колесо починає крутитися.

#### Подія: 'scroll-touch-end' _macOS_

Викликається коли колесо закінчує крутитися.

#### Подія: 'scroll-touch-edge' _macOS_

Викликається коли при прокручуванні досягається край елемента.

#### Подія: 'swipe' _macOS_

Повертає:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Подія: 'sheet-begin' _macOS_

Викликаєтсья коли вікно відкриває сторінку.

#### Подія: 'sheet-end' _macOS_

Викликається коли вікно закриває сторінку.

#### Подія: 'new-window-for-tab' _macOS_

Викликається коли під час натискання нативної кнопки створення нової вкладки.

### Статичні Методи

Клас `BrowserWindow` має наступні статичні методи:

#### `BrowserWindow.getAllWindows()`

Повертає `BrowserWindow[]` - Масив всіх відкритих браузерних вікон.

#### `BrowserWindow.getFocusedWindow()`

Повертає `BrowserWindow | null` - Вікно, яке має фокус, в іншому випадку повертає `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Повертає `BrowserWindow` - Вікно, яке володіє переданим `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Повертає `BrowserWindow` - Вікно з переданим `id`.

#### `BrowserWindow.addExtension(path)`

* `path` String

Додає розширення Chrome розміщене по `path`, і повертає назву розширення.

Метод не поверне нічого, якщо маніфест розширення втрачено чи незавершено.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Видалити розширення Chrome по імені.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.getExtensions()`

Повертає `Object` - Ключами є назви розширень і кожне значення є об'єктом, що містить властивості `name` і `version`.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Додає розширення для розробника, яке знаходиться в `path` і повертає його ім'я.

Розширення буде запам'ятоване, тому ви можете викликати це API тільки один раз, це API не для програмного використання. Якщо ви спробуєте додати розширення, яке вже було завантажене, цей метод не виконається і залогує попередження в консоль.

Метод не поверне нічого, якщо маніфест розширення втрачено чи незавершено.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Видалити розширення для розробника по імені.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.getDevToolsExtensions()`

Повертає `Object` - Ключами є назви розширень і кожне значення є об'єктом, що містить властивості `name` і `version`.

Щоб перевірити чи розширення DevTools встановлено, ви можете виконати наступне:

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

### Властивості Екземпляра

Об'єкт створений за допомогою `new BrowserWindow` має наступні властивості:

```javascript
const { BrowserWindow } = require('electron')
// В цьому прикладі `win` наш екземпляр
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

Дивись [документацію `webContents`](web-contents.md) для інформації про методи та події.

#### `win.id`

`Integer`, яке представляє унікальний ID вікна.

### Методи Екземпляра

Об'єкт створений за допомогою `new BrowserWindow` має наступні методи:

**Примітка:** Деякі методи доступні тільки на певних операціїних системах і позначені як такі.

#### `win.destroy()`

Примусово закриває вікно, події `unload` та `beforeunload` для веб-сторінки не будуть викликані і подія `close` також не буде викликана для вікна, але гарантовано викличеться подія `closed`.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Надає фокус вікну.

#### `win.blur()`

Забирає фокус з вікна.

#### `win.isFocused()`

Повертає `Boolean` - Чи вікно має фокус.

#### `win.isDestroyed()`

Повертає `Boolean` - Чи вікно знищено.

#### `win.show()`

Показує і дає фокус вікну.

#### `win.showInactive()`

Показує вікно, але не дає йому фокус.

#### `win.hide()`

Приховує вікно.

#### `win.isVisible()`

Повертає `Boolean` - Чи вікно видиме користувачу.

#### `win.isModal()`

Повертає `Boolean` - Чи поточне вікно є модальним.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Виводить вікно з максимізованого режиму.

#### `win.isMaximized()`

Повертає `Boolean` - Чи вікно знаходить в максимізованому режимі.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Відновлює згорнуті вікна до попереднього стану.

#### `win.isMinimized()`

Повертає `Boolean` - Чи вікно згорнуте.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Встановлює чи вікно повинне бути в повноекранному режимі.

#### `win.isFullScreen()`

Повертає `Boolean` - Чи вікно в повноекранному режимі.

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

Входить в чи виходить з простого повноекранного режиму.

Простий повноекранний режим емулює нативну поведінку повноекранного режиму до версії Mac OS X Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Повертає `Boolean` - Чи вікно в простому повноекранному режимі.

#### `win.isNormal()`

Повертає `Boolean` - Чи вікно в нормальному стані (не максимізоване, не мінімізоване, не в режимі на повний екран).

#### `win.setAspectRatio(aspectRatio[, extraSize])` _macOS_

* `aspectRatio` Float - Співвідношення сторін для певної частини контенту.
* `extraSize` [Size](structures/size.md) - Додатковий розмір, який не повинен включатися при збереженні співвідношення сторін.

Це примусить вікна зберігати співвідношення сторін. Додатковий розмір дозволить розробнику мати простір, визнайчений в пікселях, не включений розрахунки пропорцій. Це API вже бере до уваги різницю між розміром вікна та розміром контенту.

Розглянемо звичайне вікно з HD відеоплеєром та елементами його керування. Нехай є 15 пікселів елементів керування на лівому краї, 25 пікселів на правому та 50 пікселів під плеєром. Щоб підтримувати пропорції 16:9 (стандарт для HD @1920x1080) з самим плеєром, потрібно викликати функцію за параметрами 16/9 та [ 40, 50 ]. Другому параметру не цікаво де додаткові ширина та висота розміщені, важливо, що вони є. Додайте будь-які додаткові ширину та висоту, які ви маєте в межах загального вмісту.

Виклик цієї функції з значенням `0` видалить всі попередньо встановлені співвідношення.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Колір фону вікна, як шістнадцяткове значення, як `#66CD00` чи `#FFF` чи `#80FFFFFF` (альфа підтримується якщо `transparent` встановлено в `true`). За замовчуванням `#FFF` (білий).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String - Абсолютний шлях до файлу, який потрібно переглянути за допомогою QuickLook. Це вадливо, тому що Quick Look використовує назву файлу і його розширення з шляху, щоб визначити тип контенту.
* `displayName` String (опціонально) - Назва файлу для відображення на Quick Look. Має суто візуальний ефект та не впливає на вміст файлу. За замовчуванням `path`.

Використовує [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) для перегляду файлу по заданому шляху.

#### `win.closeFilePreview()` _macOS_

Закриває поточну панель [Швидкого Перегляду](https://en.wikipedia.org/wiki/Quick_Look).

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (опціонально) _macOS_

Змінює розмір і переміщує вікно до переданої межі. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// встановлює всі властивості
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// встановлює одну властивість
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

Повертає [`Rectangle`](structures/rectangle.md) - `bounds` вікна як `Object`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (опціонально) _macOS_

Змінює розмір і переміщує клієнтську область (наприклад веб-сторінку) до переданої межі.

#### `win.getContentBounds()`

Повертає [`Rectangle`](structures/rectangle.md) - `bounds` зони клієнта вікна як `Object`.

#### `win.getNormalBounds()`

Повертає [`Rectangle`](structures/rectangle.md) - Містить границі вікна в нормальному стані

**Примітка:** який би не був поточний стан вікна: розгорнутий, згорнутий чи повноекранний, ця функція завжди поверне позицію і розмір вікна в нормальному стані. В нормальному стані, getBounds та getNormalBounds повертають однакові [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Блокує чи розблоковує вікно.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (опціонально) _macOS_

Змінює розміри вікна на `width` і `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Повертає `Integer[]` - Містить ширину і висоту вікна.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (опціонально) _macOS_

Змінює розмір клієнтської області (наприклад веб-сторінки) до `width` та `height`.

#### `win.getContentSize()`

Повертає `Integer[]` - Містить ширину і висоту клієнтської області.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Встановлює мінімальні розміри вікна в `width` і `height`.

#### `win.getMinimumSize()`

Повертає `Integer[]` - Містить мінімальні ширину і висоту вікна.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Встановлює максимальні розміри вікна в `width` і `height`.

#### `win.getMaximumSize()`

Повертає `Integer[]` - Містить максимальні ширину і висоту вікна.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Встановлює чи користувач може вручну змінювати розміри вікна.

#### `win.isResizable()`

Повертає `Boolean` - Чи користувач може вручну змінювати розміри вікна.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` _macOS_ _Windows_

Повертає `Boolean` - Чи користувач може переміщувати вікно.

На Linux завжди повертає `true`.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` _macOS_ _Windows_

Повертає `Boolean` - Чи користувач може вручну згортати вікно

На Linux завжди повертає `true`.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` _macOS_ _Windows_

Повертає `Boolean` - Чи користувач може вручну максимізувати вікно.

На Linux завжди повертає `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Встановлює чи кнопка розгорнути/масштабувати перемикає повноекранний режим чи максимізує вікно.

#### `win.isFullScreenable()`

Повертає `Boolean` - Чи кнопка розгорнути/масштабувати перемикає повноекранний режим чи максимізує вікно.

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` _macOS_ _Windows_

Повертає `Boolean` - Чи користувач може вручну закривати вікно.

На Linux завжди повертає `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (опціонально) _macOS_ - Включає значення `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, та ~~`dock`~~ (Застаріло). За замовчуванням `floating`. Дивіться [документацію macOS ](https://developer.apple.com/documentation/appkit/nswindow/level) для деталей.
* `relativeLevel` Integer (опціонально) _macOS_ - Кількість шарів, на яку потрібно підняти вікно в порівнянні з `level`. За замовчуванням `0`. Зверніть увагу, що Apple не рекомендує налаштування шарів вище за 1 над `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Повертає `Boolean` - Чи вікно завжди поверх інших вікон.

#### `win.moveTop()`

Переміщує вікно наверх (z-вимір) незалежно від фокусування

#### `win.center()`

Переміщує вікно в центр екрану.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (опціонально) _macOS_

Переміщує вікно до `x` та `y`.

#### `win.getPosition()`

Повертає `Integer[]` - Містить поточну позицію вікна.

#### `win.setTitle(title)`

* `title` String

Змінює заголовок нативного вікна на `title`.

#### `win.getTitle()`

Повертає `String` - Заголовок нативного вікна.

**Примітка:** Заголовок веб-сторінки може відрізнятися від заголовку нативного вікна.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (опціонально)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Наприклад:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Стартує чи зупиняє миготіння вікна для залучення уваги користувача.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Не показує вікно на панелі завдань.

#### `win.setKiosk(flag)`

* `flag` Boolean

Заходить в чи виходить з повноекранного режиму браузера.

#### `win.isKiosk()`

Повертає `Boolean` - Чи вікно в повноекранному режимі браузера.

#### `win.getNativeWindowHandle()`

Повертає `Buffer` - Хендлер вікна, в залежності від платформи.

Еативний тип хендлера `HWND` на Windows, `NSView*` на macOS, і `Window` (`unsigned long`) на Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Повертає `Boolean` - `true` чи `false` в залежності чи повідомлення причіплене.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Знімає повідомлення вікна.

#### `win.unhookAllWindowMessages()` _Windows_

Знімає всі повідомлення вікна.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

Встановлює шлях до файлу, який представлений вікном, та піктограма файлу ьуде показана в панелі заголовку вікна.

#### `win.getRepresentedFilename()` _macOS_

Повертає `String` - Шлях до файлу, який представлений вікном.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Визначає чи документ вікна був редагований і піктограма на панелі заголовків стане сірою, якщо встановлено в `true`.

#### `win.isDocumentEdited()` _macOS_

Повертає `Boolean` - Чи документ вікна був редагований.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (опціонально) - Межі для захоплення
* `callback` Function
  * `image` [NativeImage](native-image.md)

Захоплює знімок сторінки в межах `rect`. Після цього буде викликано `callback` з `callback(image)`. `image` екземпляр [NativeImage](native-image.md), який зберігає дані змінку. Якщо не передати `rect`, буде захоплено всю видиму сторінку.

**[Незабаром застаріє](modernization/promisification.md)**

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (опціонально) - Межі для захоплення

Повертає `Promise<NativeImage>` - Виконуєтсья з [NativeImage](native-image.md)

Захоплює знімок сторінки в межах `rect`. Якщо не передати `rect`, буде захоплено всю видиму сторінку.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (опціонально) - HTTP Referrer посилання.
  * `userAgent` String (опціонально) - User agent відправника запиту.
  * `extraHeaders` String (опціонально) - Додаткові заголовки, розділені "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (опціонально)
  * `baseURLForDataURL` String (опціонально) - Основне URL (з розділювачем шляху) для файлів, які мають бути завантажені. Це необхідно, лише якщо вказане `url` є посилання на дані і потребує завантаження інших файлів.

Повертає `Promise<void>` - проміс буде виконано коли сторінка завершить завантаження (дивись [`did-finish-load`](web-contents.md#event-did-finish-load)), якщо завантаження не успішне проміс буде проігноровано (дивись [`did-fail-load`](web-contents.md#event-did-fail-load)).

Так само як [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

`url` може бути віддаленою адресою (наприклад, `http://`) чи шляхом до локального HTML файлу, за допомогою протоколу `file://`.

Щоб переконатися, що посилання на файли правильно відформатовані, рекомендовано використовувати метод Node [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject):

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

Ви можете завантажити посилання за допомогою `POST` запиту з кодованими для посилання даними, роблячи наступне:

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
* `options` Object (optional)
  * `query` Object (опціонально) - Передається в `url.format()`.
  * `search` String (опціонально) - Передається в `url.format()`.
  * `hash` String (опціонально) - Передається в `url.format()`.

Повертає `Promise<void>` - проміс буде виконано коли сторінка завершить завантаження (дивись [`did-finish-load`](web-contents.md#event-did-finish-load)), якщо завантаження не успішне проміс буде проігноровано (дивись [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

Те саме що і `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Встановлює `menu` як панель меню вікна.

#### `win.removeMenu()` _Linux_ _Windows_

Забирає панель меню вікна.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (optional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Видаляє рядок прогресу, якщо прогрес < 0; Змінюється в невизначений режим, якщо прогрес > 1.

На Linux, пітримується тільки середовищем Unity, потрібно визначити назву файлу `*.desktop` для поля `desktopName` в `package.json`. За промовчанням, визначиться в `app.getName().desktop`.

На Windows можна передавати режими. Допустимими значеннями є `none`, `normal`, `indeterminate`, `error`, та `paused`. Якщо викликати `setProgressBar` без режиму (але з допустимим значенням), буде застосовано `normal`.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - піктограма для відображення в правому нижньому куті панелі задач. Якщо цей параметр `null`, маску буде очищено
* `description` String - опис, який буде надано в читач екрану

Встановлює 16 x 16 піксельну маску на поточну піктограму панелі задач, зазвичай використовується для передачі якогось статусу застосунку чи пасивного сповіщення користувача.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Встановлює чи вікно має мати тінь.

#### `win.hasShadow()`

Повертає `Boolean` - Чи вікно має тінь.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - між 0.0 (повністю прозоре) та 1.0 (повністю непрозоре)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` _Windows_ _macOS_

Повертає `Number` - між 0.0 (повністю прозоре) та 1.0 (повністю непрозоре)

#### `win.setShape(rects)` _Windows_ _Linux_ _Експериментальний_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Встановлення форми фікна визначає зону де система дозволяє рендер та взаємодію користувача. За межеми даної області, не будуть промальовуватися пікселі та не реєструватимуться події миші. Події миші за межами області не будуть отримані вікном, але будуть передані нижче, щоб не було за вікном.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Повертає `Boolean` - Якщо кнопки були додані успішно

Додає панель з визначеним набором кнопок в мініатюру піктограми панелі задач вікна. Повертає `Boolean` об'єкт, який показує чи мініатюра була додана успішно.

Число кнопок на панелі мініатюри не має бути більшим за 7 через обмежений простір. Коли ви налаштували панель мініатюри, її не можна буде забрати через обмеження платформи. Але ви можете викликати API з пустим масивом для очищення кнопок.

`buttons` масив об'єктів `Button`:

* `Button` Object
  * `icon` [NativeImage](native-image.md) - Піктограма для показу на палені мініатюр.
  * `click` Function
  * `tooltip` String (опціонально) - Текст для підказки кнопки.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags` це масив, що може містити наступні `String`:

* `enabled` - Кнопка активна та доступна юзеру.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Коли на кнопку натискають, панель мініатюр негайно закривається.
* `nobackground` - Не малювати границі кнопки, використовувати тільки зображення.
* `hidden` - Кнопка не відображається користувачу.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - Область вікна

Встановлює область вікна яке відображатиметься як мініатюра при наведенні на вікно в панелі задач. Ви можете змінити мініатюру на ціле вікно, вказавши порожню область: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Встановлює спливаючу підказку яка відображається при наведенні на мініатюру вікна в панелі задач.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (опціонально) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Має бути встановленим, інакше інші параметри не матимуть ефекту.
  * `appIconPath` String (опціонально) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (опціонально) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (опціонально) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Встановлює властивості кнопки панелі завдань вікна.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

Те саме що і `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md)

Змінити піктограму вікна.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Встановлює чи мають бути видимі кнопки контролю вікна.

Метод не можна викликати якщо `titleBarStyle` встановлено в `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

Якщо панель меню вже відображається, виклик `setAutoHideMenuBar(true)` не приховає її негайно.

#### `win.isMenuBarAutoHide()`

Повертає `Boolean` - Якщо панель меню автоматично приховується.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Повертає `Boolean` - Якщо панель меню видима.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (optional)
  * `visibleOnFullScreen` Boolean (опціонально) _macOS_ - Встановлює чи вікно має бути видиме над іншими повноекранними вікнами

Встановлює чи вікно вікно має бути видиме на всіх робочих областях.

**Примітка:** Цей API не працює на Windows.

#### `win.isVisibleOnAllWorkspaces()`

Повертає `Boolean` - Чи вікно видиме на всіх робочих областях.

**Примітка:** Цей API завжди повертає false на Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (optional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Використовується тільки якщо `ignore` дорівнює true. Якщо `ignore` дорівнює false, передавання завжди вимкнене незважаючи на поточне значення.

Примушує вікно ігнорувати всі події мишки.

Всі події мишки будуть передані вікну нижче, але якщо вікно має фокус, події клавіатури все ще будуть отримуватися.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Забороняє захоплювати контент вікна іншими застосунками.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` _Windows_

* `focusable` Boolean

Змінює чи вікно може мати фокус.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow

Встановлює `parent` як батьківське вікно поточного, передавання `null` перетворить поточне в вікно верхнього рівня.

#### `win.getParentWindow()`

Повертає `BrowserWindow` - Батьківське вікно.

#### `win.getChildWindows()`

Повертає `BrowserWindow[]` - Всі дочірні вікна.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Вказує чи приховувати курсор під час друку.

#### `win.selectPreviousTab()` _macOS_

Вибирає попередню вкладку, якщо ввімкнено нативні вкладки та існують інші вкладки у вікні.

#### `win.selectNextTab()` _macOS_

Вибирає наступну вкладку, якщо ввімкнено нативні вкладки та існують інші вкладки у вікні.

#### `win.mergeAllWindows()` _macOS_

Об'єднує всі вікна в одне вікно з вкладками, якщо ввімкнено нативні вкладки та існує більш ніж одне відкрите вікно.

#### `win.moveTabToNewWindow()` _macOS_

Переміщує поточну вкладку в нове вікно, якщо ввімкнено нативні вкладки і існує більш ніж одна вкладка в поточному вікні.

#### `win.toggleTabBar()` _macOS_

Показує чи ховає панелі вкладок, якщо ввімкнено нативні вкладки, і є тільки одна вкладка в поточному вікні.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Додає вікно як вкладку на цьому вікні, після вкладки вікна екземпляра.

#### `win.setVibrancy(type)` _macOS_

* `type` String - Може бути `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` чи `ultra-dark`. Дивіться [документацію macOS ](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) для деталей.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` _macOS_ _Експериментальний_

* `touchBar` TouchBar

Встановлює шаблон touchBar для почотного вікна. Зазначення `null` чи `undefined` очищує панель дотиків. Цей метод має ефект тільки, якщо машина має панель дотиків та запущена на macOS 10.12.1+.

**Примітка:** TouchBar API наразі експериментальне і може бути видалене в майбутніх версіях Electron.

#### `win.setBrowserView(browserView)` _Експериментальний_

* `browserView` [BrowserView](browser-view.md). Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` _Експериментальний_

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` _Експериментальний_

* `browserView` [BrowserView](browser-view.md)

Заміна API для setBrowserView, підтримує роботу з декількома виглядами.

#### `win.removeBrowserView(browserView)` _Експериментальний_

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` _Експериментальний_

Повертає масив `BrowserView`, які було прикліплено за допомогою addBrowserView чи setBrowserView.

**Примітка:** BrowserView API наразі є експериментальним і може бути зміненим чи видаленим з майбутніх версій Electron.

### Властивості (Properties)

#### `win.excludedFromShownWindowsMenu` _macOS_

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.

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
