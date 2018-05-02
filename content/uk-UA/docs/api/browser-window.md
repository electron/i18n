# BrowserWindow

> Створіть та керуйте вікнами браузера.

Процес: [Main](../glossary.md#main-process)

```javascript
// В головному процесі.
const {BrowserWindow} = require('electron')

// Чи використовуйте `remote` з процесу рендеринга.
// const {BrowserWindow} = require('electron').remote

let win = new BrowserWindow({width: 800, height: 600})
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
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

Ця подія зазвичай викликається після події `did-finish-load`, але для сторінок з віддаленими ресурсами, вона може бути викликана перед `did-finish-load`.

### Встановлення кольору фону (`backgroundColor`)

Для складного застосунку, подія `ready-to-show` може бути викликана занадто пізно, роблячи застосунок помітно повільним. В такому випадку рекомендовано показувати вікно негайно і використовувати `backgroundColor` для встановлення кольору фону застосунку:

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

Зауважте, що для застосунків, які використовують подію `ready-to-show`, також рекомендовано встановлювати `backgroundColor`, щоб зробити застосунок більш нативним.

## Батьківські та дочірні вікна

Використовуючи параметр `parent`, ви можете створити дочірні вікна:

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

Дочірнє (`child`) вікно завжди відображається поверх верхнього (`top`) вікна.

### Модальні вікна

Модальне вікно - це дочірнє вікно, що відключає батьківське вікно. Щоб створити модельне вікно, ви повинні встановити `parent` та `modal` параметри:

```javascript
const {BrowserWindow} = require('electron')

let child = new BrowserWindow({parent: top, modal: true, show: false})
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
* На Windows не підтримується динамічна зміна батьківського вікна.
* На Linux тип модального вікна буде змінено на `dialog`.
* На Linux багато середовищ робочого столу не підтримують приховування модального вікна.

## Клас: BrowserWindow

> Створіть та керуйте вікнами браузера.

Процес: [Main](../glossary.md#main-process)

`BrowserWindow` це [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Він створює нове `BrowserWindow` з нативними властивостями, визначеними в `options`.

### `new BrowserWindow([options])`

* `options` Object (опціонально) 
  * `width` Integer (опціонально) - Ширина вікна в пікселях. За замовчуванням `800`.
  * `height` Integer (опціонально) - Висота вікна в пікселях. За замовчуванням `600`.
  * `x` Integer (опціонально) (**обов'язково** якщо використовується y) - Ліве зміщення вікна від екрану. За замовчуванням вікно центрується.
  * `y` Integer (опціонально) (**обов'язково** якщо використовується x) - Зміщення вікна від верху екрану. За замовчуванням вікно центрується.
  * `useContentSize` Boolean (опціонально) - `width` та `height` будуть використовуватися як розміри веб-сторінки, що означає що фактичні розміри вікна будуть включати розміри рамки і будуть трошки більшими. За замовчуванням `false`.
  * `center` Boolean (опціонально) - Показати вікно в центрі екрану.
  * `minWidth` Integer (опціонально) - Мінімальна ширина вікна. За замовчуванням ``.
  * `minHeight` Integer (опціонально) - Мінімальна висота вікна. За замовчуванням ``.
  * `maxWidth` Integer (опціонально) - Максимальна ширина вікна. За замовчуванням немає обмежень.
  * `maxHeight` Integer (опціонально) - Максимальна висота вікна. За замовчуванням немає обмежень.
  * `resizable` Boolean (опціонально) - Чи дозволяти змінювати розміри вікна. За замовчуванням `true`.
  * `movable` Boolean (опціонально) - Чи дозволяти пересувати вікно. Не реалізовано на Linux. За замовчуванням `true`.
  * `minimizable` Boolean (опціонально) - Чи дозволяти згортати вікно. Не реалізовано на Linux. За замовчуванням `true`.
  * `maximizable` Boolean (опціонально) - Чи дозволяти розгортати вікно. Не реалізовано на Linux. За замовчуванням `true`.
  * `closable` Boolean (опціонально) - Чи дозволяти закривати вікно. Не реалізовано на Linux. За замовчуванням `true`.
  * `focusable` Boolean (опціонально) - Чи можна передати фокус вікну. За замовчуванням `true`. На Windows встановлення `focusable: false` також передбачає встановлення `skipTaskbar: true`. На Linux встановлення `focusable: false` припиняє взаємодію вікна з середовищем, так що вікно завжди буде залишатися поверх всіх робочих областей.
  * `alwaysOnTop` Boolean (опціонально) - Чи вікно завжди має залишатися поверх всіх вікон. За замовчуванням `false`.
  * `fullscreen` Boolean (опціонально) - Чи вікно має відображатися в повноекранному режимі. Коли явно встановлено в `false` кнопка повноекранного режиму буде прихована чи недоступна на macOS. За замовчуванням `false`.
  * `fullscreenable` Boolean (опціонально) - Чи вікно можна перевести в повноекранний режим. На macOS, також показує чи кнопка розгортання/збільшення має перемикати повноекранний режим чи розгортати вікно. За замовчуванням `true`.
  * `simpleFullscreen` Boolean (опціонально) - Використовувати повноекранний режим pre-Lion на macOS. За замовчуванням `false`.
  * `skipTaskbar` Boolean (опціонально) - Чи показувати вікно на панелі завдань. За замовчуванням `false`.
  * `kiosk` Boolean (опціонально) - Повноекранний режим браузера. За замовчуванням `false`.
  * `title` String (опціонально) - Заголовок вікна за замовчуванням. За замовчуванням `"Electron"`.
  * `icon` ([NativeImage](native-image.md) | String) (опціонально) - Піктограма вікна. На Windows рекомендовано використовувати `ICO` піктограми, щоб отримати найкращі візуальні ефекти, ви також можете залишити її невизначеною, тоді використається піктограма виконуваного файлу.
  * `show` Boolean (опціонально) - Чи показувати вікно після створення. За замовчуванням `true`.
  * `frame` Boolean (опціонально) - Вкажіть `false` для створення [Вікна без Рамки](frameless-window.md). За замовчуванням `true`.
  * `parent` BrowserWindow (опціонально) - Вкажіть батьківське вікно. За замовчуванням `null`.
  * `modal` Boolean (опціонально) - Чи вікно є модальним. Працює тільки якщо вікно є дочірнім. За замовчуванням `false`.
  * `acceptFirstMouse` Boolean (опціонально) - Чи веб-вигляд приймає подію кліку мишки, яка активує вікно. За замовчуванням `false`.
  * `disableAutoHideCursor` Boolean (опціонально) - Чи ховати курсор під час вводу. За замовчуванням `false`.
  * `autoHideMenuBar` Boolean (опціонально) - Автоматично ховати панель меню, якщо кнопка `Alt` натиснута. За замовчуванням `false`.
  * `enableLargerThanScreen` Boolean (опціонально) - Дозволяти робити вікно більшим за екран. За замовчуванням `false`.
  * `backgroundColor` String (опціонально) - колір фону вікна, як шістнадцяткове значення, як `#66CD00` чи `#FFF` чи `#80FFFFFF` (альфа підтримується). За замовчуванням `#FFF` (білий).
  * `hasShadow` Boolean (опціонально) - Чи має вікно мати тінь. Реалізовано тільки на macOS. За замовчуванням `true`.
  * `opacity` Number (опціонально) - Встановити початкову непрозорість вікна, між 0.0 (повність прозоре) та 1.0 (повністю непрозоре). Реалізовано тільки на Windows та macOS.
  * `darkTheme` Boolean (опціонально) - Примусово використовувати темну тему для вікна, працює тільки на деяких середовищах GTK+3. За замовчуванням `false`.
  * `transparent` Boolean (опціонально) - Робить вікно [прозорим](frameless-window.md). За замовчуванням `false`.
  * `type` String (опціонально) - Тип вікна, за замовчуванням нормальне вікно. Дивись детальніше нижче.
  * `titleBarStyle` String (опціонально) - Стиль панелі заголовка вікна. За замовчуванням `default`. Можливі значення: 
    * `default` - Стандартна непрозора Mac панель заголовків.
    * `hidden` - Прихована панель заголовків і контент на розмір вікна, поки панель заголовків досі має стандартні кнопки керування ("світлофори") вгорі зліва.
    * `hiddenInset` - Прихована панель заголовків з альтернативним виглядом, де кнопки керування трохи більш віддалені від краю вікна.
    * `customButtonsOnHover` Boolean (опціонально) - Малювати кастомізовані кнопки керування на безрамковому вікні macOS. Ці кнопки не будуть відображатися, якщо на не наводити на верхній лівий край вікна. Ці кастомізовані кнопки запобігають проблемам з подіями мишки, які виникають з стандартними кнопками вікна. **Примітка:** Ця властивість поки тестується.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (опціонально) - Використовувати стиль `WS_THICKFRAME` для безрамкових вікон на Windows, який додає стандартну рамку вікну. Встановіть в `false`, щоб видалити тінь та анімацію вікна. За замовчуванням `true`.
  * `vibrancy` String (опціонально) - Додати тип ефекту вібрації вікна, тільки на macOS. Може бути `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` чи `ultra-dark`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
  * `zoomToPageWidth` Boolean (опціонально) - Контролює поведінку на macOS при кліку на зелену кнопку на панелі чи при кліку на Window > Zoom елемент меню. Якщо `true`, вікно виросте до обраної ширини веб-сторінки при масштабуванні, `false` спричинить масштабування до ширини екрану. Це також вплине на поведінку при виклиці безпосередньо `maximize()`. За замовчуванням `false`.
  * `tabbingIdentifier` String (опціонально) - Назва групи вкладок, дозволяє відкривати вікно як нативну вкладку на macOS 10.12+. Вікна з такими самими ідентифікаторами вкладок будуть згруповані разом. Це такоє додає нативну кнопку нової вкладки до панель вкладок вашого вікна та дозволяє вашому `app` та вікну отримувати подію `new-window-for-tab`.
  * `webPreferences` Object (опціонально) - Налаштування особливостей веб-сторінки. 
    * `devTools` Boolean (опціонально) - Чи вмикати DevTools. Якщо встановлено в `false`, не можна використовувати `BrowserWindow.webContents.openDevTools()` для відкриття DevTools. За замовчуванням `true`.
    * `nodeIntegration` Boolean (опціонально) - Чи ввімкнена Node.js інтеграція. За замовчуванням `true`.
    * `nodeIntegrationInWorker` Boolean (опціонально) - Чи Node.js інтеграція увімкнена в веб-воркерах. За замовчуванням `false`. Більше інформації можна знайти в [Багатопоточності](../tutorial/multithreading.md).
    * `preload` String (опціонально) - Визначає скрипт, який буде завантажено перед запуском інших скриптів на сторінці. Цей скрипт завжди буде мати доступ до Node.js API, в незалежності чи Node.js інтеграція увімкнена чи ні. Значенням має бути абсолютний шлях до скрипта. Коли Node.js інтеграція вимкнена, скрипт може представити глобальні символи Node назад в глобальне середовище. Дивись приклад [тут](process.md#event-loaded).
    * `sandbox` Boolean (опціонально) - Якщо встановлено, це запустить рендерер, який асоціюється з вікном, у тестовому режимі, роблячи його сумісним з тестуванням Chromium рівня ОС і вимикаючи движок Node.js. Це не те саме що і опція `nodeIntegration` і API, доступне для попередньої підгрузки скриптів, є більш обмеженим. Читайте більше про опцію [тут](sandbox-option.md). **Примітка:** Ця опція наразі екпериментальна і може бути змінена чи видалена в майбутніх релізах Electron.
    * `session` [Session](session.md#class-session) (опціонально) - Встановлює сесію, яку використовує сторінка. Замість того щоб передавати об'єкт Session напряму, ви можете також використовувати опцію `partition`, яка приймає стрічку розділу. Коли передається і `session` і `partition`, `session` буде мати перевагу. За замовчуванням звичайна сесія.
    * `partition` String (опціонально) - Встановлює сесію, яка використовується сторінкою відповідно до стрічок розділу сесії. Якщо `partition` починається з `persist:`, сторінка буде використовувати стійку сесію доступну всім сторінкам застосунку з однаковим `partition`. Якщо префікс `persist:` відсутній, сторінка буде використовувати сесію пам'яті. Призначаючи однаковий `partition`, декілька сторінок можуть спільно використовувати однакову сесію. За замовчуванням звичайна сесія.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`.
    * `zoomFactor` Number (опціонально) - Коефіцієнт масштабуванням за замовчуванням, `3.0` відповідає `300%`. За замовчуванням `1.0`.
    * `javascript` Boolean (опціонально) - Вмикає підтримку JavaScript. За замовчуванням `true`.
    * `webSecurity` Boolean (опціонально) - Коли `false`, вимикається політику походження з того ж джерела (зазвичай використовується тестуванням веб-сайтів людьми), і встановить `allowRunningInsecureContent` в `true` якщо ця опція не була встановлена користувачем. За замовчуванням `true`.
    * `allowRunningInsecureContent` Boolean (опціонально) - Дозволяє HTTPS сторінці виконувати JavaScript, CSS чи плагіни з HTTP URLів. За замовчуванням `false`.
    * `images` Boolean (опціонально) - Вмикає підтримку картинок. За замовчуванням `true`.
    * `textAreasAreResizable` Boolean (опціонально) - Дозволяє змінювати розміри елемента TextArea. За замовчуванням `true`.
    * `webgl` Boolean (опціонально) - Вмикає пітримку WebGL. За замовчуванням `true`.
    * `webaudio` Boolean (опціонально) - Вмикає підтримку WebAudio. За замовчуванням `true`.
    * `plugins` Boolean (опціонально) - Чи вмикати плагіни. За замовчуванням `false`.
    * `experimentalFeatures` Boolean (опціонально) - Вмикає експериментальні властивості Chromium. За замовчуванням `false`.
    * `experimentalCanvasFeatures` Boolean (опціонально) - Вмикає експериментальні особливості полотна Chromium. За замовчуванням `false`.
    * `scrollBounce` Boolean (опціонально) - Вмикає стрибаючий ефект прокрутки (ефект гумки) на macOS. За замовчуванням `false`.
    * `blinkFeatures` String (опціонально) - Список особливостей, розділений за допомогою `,`, таких як `CSSVariables,KeyboardEventKey`, доступних для вмикання. Повний список особливостей, що пітримуються, можна знайти в файлі [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70).
    * `disableBlinkFeatures` String (опціонально) - Список особливостей, розділений за допомогою `,`, таких як `CSSVariables,KeyboardEventKey`, доступних для вимикання. Повний список особливостей, що пітримуються, можна знайти в файлі [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70).
    * `defaultFontFamily` Object (опціонально) - Встановлює шрифт за замовчуванням для сімейства шрифтів. 
      * `standard` String (опціонально) - За замовчуванням `Times New Roman`.
      * `serif` String (опціонально) -За замовчуванням `Times New Roman`.
      * `sansSerif` String (опціонально) - За замовчуванням `Arial`.
      * `monospace` String (опціонально) - За замовчуванням `Courier New`.
      * `cursive` String (опціонально) - За замовчуванням `Script`.
      * `fantasy` String (опціонально) - За замовчуванням `Impact`.
    * `defaultFontSize` Integer (опціонально) - За замовчуванням `16`.
    * `defaultMonospaceFontSize` Integer (опціонально) - За замовчуванням `13`.
    * `minimumFontSize` Integer (опціонально) - За замовчуванням ``.
    * `defaultEncoding` String (опціонально) - За замовчуванням `ISO-8859-1`.
    * `backgroundThrottling` Boolean (опціонально) - Чи забороняти анімацію і таймери, коли сторінка стає фоновою. Це також впливає на [Page Visibility API](#page-visibility). За замовчуванням `true`.
    * `offscreen` Boolean (опціонально) - Чи вмикати позаекранний рендеринг вікна браузера. За замовчуванням `false`. Дивіться [інструкцію позаекранного рендерингу](../tutorial/offscreen-rendering.md) для детальнішої інформації.
    * `contextIsolation` Boolean (опціонально) - Чи запускати API Electron і визначені `preload` скрипти в окремому контексті JavaScript. За замовчуванням `false`. Контекст, в якому будуть запускатися `preload` скрипти, все ще буде мати повний доступ до глобальних `document` і `window`, але буде використовувати власні визначені JavaScript вбудовані конструкції (`Array`, `Object`, `JSON`, тощо) і буде ізольований від змін глобального середовища під час завантаження сторінки. API Electron буде доступне тільки в `preload` скрипті, аое не на завантаженій сторінці. Цю поцію слід використовувати, коли підвантажується потенційно ненадійний контент віддалений, щоб переконатися, що вміст не зможе втрутитися в `preload` скрипт і API Electron не буде використане. Ця опція використовує таку саму техніку як і [Контент Скрипти Chrome](https://developer.chrome.com/extensions/content_scripts#execution-environment). Цей контекст доступний в інтрументах розробника при виборі пункту 'Ізольований Контекст Electron' в полі зі списком вгорі вкладки Консоль. **Примітка:** Ця опція наразі екпериментальна і може бути змінена чи видалена в майбутніх релізах Electron.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (опціонально) - Чи вмикати [`<webview>` тег](webview-tag.md). За замовчуванням відповідає значенню опції `nodeIntegration`. **Примітка:** `preload` скрипт, сконфігурований для `<webview>` буде мати ввімкнену інтеграцію з Node.js, коли він буде виконуватися, тому ви маєте впевнитися, що віддалений/ненадійний контент не може створювати `<webview>` тег з потенційно зловмисним `preload` скриптом. Ви можете використовуват подію `will-attach-webview` на [webContents](web-contents.md), щоб стерти `preload` скрипт і провалідувати чи змінити початкові налаштування `<webview>`.
    * `additionArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.

Коли встановлюються мінімальні та максимальні розміри вікна `minWidth`/`maxWidth`/`minHeight`/`maxHeight`, це лише обмежує користувачів. Це не перешкодить вам передати розмір, який не відповідає обмеженням в `setBounds`/`setSize` чи конструкторі `BrowserWindow`.

Можливі значення та поведінки опції `type` залежать від платформи. Домустимими є:

* На Linux, допустимі значення `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* На macOS, допустимі типи є `desktop`, `textured`. 
  * Тип `textured` додає вигляд металевого градієнта (`NSTexturedBackgroundWindowMask`).
  * Тип `desktop` розміщує вікно на рівні фону робочого столу (`kCGDesktopWindowLevel - 1`). Зауважте, що вікно робочого столу не отримає фокус, події клавіаутри чи мишки, але ви можете використати `globalShortcut`, щоб отримати бідний ввід.
* На Windows, допустимим типом є `toolbar`.

### Події екземпляру

Об'єкти створені за допомогою `new BrowserWindow` викликають наступні події:

**Примітка:** Деякі події доступні тільки на певних операційних системах і відповідно позначені як такі.

#### Подія: 'page-title-updated'

Повертає:

* `event` Event
* `title` String

Викликається коли документ змінює заголовок, виклик `event.preventDefault()` буде запобігати зміні нативного заголовку вікна.

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

***Примітка**: Є тонка різниця між поведінками `window.onbeforeunload = handler` та `window.addEventListener('beforeunload', handler)`. Рекомендується завжди встановлювати `event.returnValue` явно, замість того, щоб просто повертати значення, так як перше працює більш постійно з Electron.*

#### Подія: 'closed'

Викликаєтсья коли вікно закрите. Після того як ви отримали цю подію, ви маєте видалити посилання вікна і більшк його не використовувати.

#### Подія: 'session-end' *Windows*

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

#### Подія: 'resize'

Викликається коли вікно змінює розмір.

#### Подія: 'move'

Викликається коли вікно переміщується в нове місце.

**Примітка**: На macOS ця подія є іншою назвою `moved`.

#### Подія: 'moved' *macOS*

Викликається один раз коли вікно переміщується в нове місце.

#### Подія: 'enter-full-screen'

Викликається коли вікно входить в повноекранний режим.

#### Подія: 'leave-full-screen'

Викликається коли вікно виходить з повноекранного режиму.

#### Подія: 'enter-html-full-screen'

Викрикається коли вікно входить в повноекранний режим через HTML API.

#### Подія: 'leave-html-full-screen'

Викликається коли вікно виходить з повноекранного режиму через HTML API.

#### Подія: 'app-command' *Windows*

Повертає:

* `event` Event
* `command` String

Відбувається коли викликається [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx). Це зазвичай пов'язано з медіа клавішами чи браузерними командами, такими як кнопка "Назад" вбудованими в деякі мишки на Windows.

Команди пишуться маленькими буквами, підчерки замінені на дефіси і пропускається префікс `APPCOMMAND_`. Наприклад, `APPCOMMAND_BROWSER_BACKWARD` викликається як `browser-backward`.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Переходить назад коли юзер натискає кнопку назад
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

#### Подія: 'scroll-touch-begin' *macOS*

Викликається коли колесо починає крутитися.

#### Подія: 'scroll-touch-end' *macOS*

Викликається коли колесо закінчує крутитися.

#### Подія: 'scroll-touch-edge' *macOS*

Викликається коли при прокручуванні досягається край елемента.

#### Подія: 'swipe' *macOS*

Повертає:

* `event` Event
* `direction` String

Викликаєтсья відбувається жест трома пальцями. Можливі напрямки: `up`, `right`, `down`, `left`.

#### Подія: 'sheet-begin' *macOS*

Викликаєтсья коли вікно відкриває сторінку.

#### Подія: 'sheet-end' *macOS*

Викликається коли вікно закриває сторінку.

#### Подія: 'new-window-for-tab' *macOS*

Викликається коли під час натискання нативної кнопки створення нової вкладки.

### Статичні Методи

Клас `BrowserWindow` має наступні статичні методи:

#### `BrowserWindow.getAllWindows()`

Повертає `BrowserWindow[]` - Масив всіх відкритих браузерних вікон.

#### `BrowserWindow.getFocusedWindow()`

Повертає `BrowserWindow` - Вікно, яке має фокус, в іншому випадку повертає `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Повертає `BrowserWindow` - Вікно, яке володіє переданим `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Повертає `BrowserWindow | null` - Вікно, яке володіє переданим `browserView`. Якщо переданий вигляд не прикріплений ні до якого вікна, повертається `null`.

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
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

### Властивості Екземпляра

Об'єкт створений за допомогою `new BrowserWindow` має наступні властивості:

```javascript
const {BrowserWindow} = require('electron')
// В цьому прикладі `win` наш екземпляр
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

Об'єкт `WebContents`, який належить даному вікну. Всі пов'язані з веб-сторінкою події та операції будуть виконуватися через нього.

Дивись [документацію `webContents`](web-contents.md) для інформації про методи та події.

#### `win.id`

`Integer`, яке представляє унікальний ID вікна.

### Методи Екземпляра

Об'єкт створений за допомогою `new BrowserWindow` має наступні методи:

**Примітка:** Деякі методи доступні тільки на певних операціїних системах і позначені як такі.

#### `win.destroy()`

Примусово закриває вікно, події `unload` та `beforeunload` для веб-сторінки не будуть викликані і подія `close` також не буде викликана для вікна, але гарантовано викличеться подія `closed`.

#### `win.close()`

Спробує закрити вікно. Має такий самий ефект, ніби користувач вручну натисне на кнопку закривання вікна. Хоча веб-сторінка може скасувати закривання. Дивись [подію close](#event-close).

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

Розгортає вікно. Це також покаже (але не надасть фокус) вікно, якщо воно ще не відображається.

#### `win.unmaximize()`

Виводить вікно з максимізованого режиму.

#### `win.isMaximized()`

Повертає `Boolean` - Чи вікно знаходить в максимізованому режимі.

#### `win.minimize()`

Згортає вікно. На деяких платформах згорнуте вікно буде показане на панелі задач.

#### `win.restore()`

Відновлює згорнуті вікна до попереднього стану.

#### `win.isMinimized()`

Повертає `Boolean` - Чи вікно згорнуте.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Встановлює чи вікно повинне бути в повноекранному режимі.

#### `win.isFullScreen()`

Повертає `Boolean` - Чи вікно в повноекранному режимі.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Входить в чи виходить з простого повноекранного режиму.

Простий повноекранний режим емулює нативну поведінку повноекранного режиму до версії Mac OS X Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Повертає `Boolean` - Чи вікно в простому повноекранному режимі.

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - Співвідношення сторін для певної частини контенту.
* `extraSize` [Size](structures/size.md) - Додатковий розмір, який не повинен включатися при збереженні співвідношення сторін.

Це примусить вікна зберігати співвідношення сторін. Додатковий розмір дозволить розробнику мати простір, визнайчений в пікселях, не включений розрахунки пропорцій. Це API вже бере до уваги різницю між розміром вікна та розміром контенту.

Розглянемо звичайне вікно з HD відеоплеєром та елементами його керування. Нехай є 15 пікселів елементів керування на лівому краї, 25 пікселів на правому та 50 пікселів під плеєром. Щоб підтримувати пропорції 16:9 (стандарт для HD @1920x1080) з самим плеєром, потрібно викликати функцію за параметрами 16/9 та [ 40, 50 ]. Другому параметру не цікаво де додаткові ширина та висота розміщені, важливо, що вони є. Просто додайте будь-які додаткові ширину та висоту, які ви маєте в межах загального вмісту.

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - Абсолютний шлях до файлу, який потрібно переглянути за допомогою QuickLook. Це вадливо, тому що Quick Look використовує назву файлу і його розширення з шляху, щоб визначити тип контенту.
* `displayName` String (опціонально) - Назва файлу для відображення на Quick Look. Має суто візуальний ефект та не впливає на вміст файлу. За замовчуванням `path`.

Використовує [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) для перегляду файлу по заданому шляху.

#### `win.closeFilePreview()` *macOS*

Закриває поточну панель [Швидкого Перегляду](https://en.wikipedia.org/wiki/Quick_Look).

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (опціонально) *macOS*

Змінює розмір і переміщує вікно до переданої межі

#### `win.getBounds()`

Повертає [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (опціонально) *macOS*

Змінює розмір і переміщує клієнтську область (наприклад веб-сторінку) до переданої межі.

#### `win.getContentBounds()`

Повертає [`Rectangle`](structures/rectangle.md)

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (опціонально) *macOS*

Змінює розміри вікна на `width` і `height`.

#### `win.getSize()`

Повертає `Integer[]` - Містить ширину і висоту вікна.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (опціонально) *macOS*

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

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Встановлює чи користувач може переміщувати вікно. На Linux не робить нічого.

#### `win.isMovable()` *macOS* *Windows*

Повертає `Boolean` - Чи користувач може переміщувати вікно.

На Linux завжди повертає `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Встановлює чи користувач може вручну згортати вікно. На Linux не робить нічого.

#### `win.isMinimizable()` *macOS* *Windows*

Повертає `Boolean` - Чи користувач може вручну згортати вікно

На Linux завжди повертає `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Встановлює чи користувач може вручну максимізувати вікно. На Linux не робить нічого.

#### `win.isMaximizable()` *macOS* *Windows*

Повертає `Boolean` - Чи користувач може вручну максимізувати вікно.

На Linux завжди повертає `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Встановлює чи кнопка розгорнути/масштабувати перемикає повноекранний режим чи максимізує вікно.

#### `win.isFullScreenable()`

Повертає `Boolean` - Чи кнопка розгорнути/масштабувати перемикає повноекранний режим чи максимізує вікно.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Встановлює чи користувач може вручну закривати вікно. На Linux не робить нічого.

#### `win.isClosable()` *macOS* *Windows*

Повертає `Boolean` - Чи користувач може вручну закривати вікно.

На Linux завжди повертає `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (опціонально) *macOS* - Включає значення `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, та ~~`dock`~~ (Застаріло). За замовчуванням `floating`. Дивіться [документацію macOS ](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) для деталей.
* `relativeLevel` Integer (опціонально) *macOS* - Кількість шарів, на яку потрібно підняти вікно в порівнянні з `level`. За замовчуванням ``. Зверніть увагу, що Apple не рекомендує налаштування шарів вище за 1 над `screen-saver`.

Встановлює чи вікно повинно завжди бути поверх інших вікон. Після встановлення цього, вікно все ще звичайне вікно, не вікно-інструмент, на яке не можна встановити фокус.

#### `win.isAlwaysOnTop()`

Повертає `Boolean` - Чи вікно завжди поверх інших вікон.

#### `win.center()`

Переміщує вікно в центр екрану.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (опціонально) *macOS*

Переміщує вікно до `x` та `y`.

#### `win.getPosition()`

Повертає `Integer[]` - Містить поточну позицію вікна.

#### `win.setTitle(title)`

* `title` String

Змінює заголовок нативного вікна на `title`.

#### `win.getTitle()`

Повертає `String` - Заголовок нативного вікна.

**Примітка:** Заголовок веб-сторінки може відрізнятися від заголовку нативного вікна.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (опціонально)

Змінює точку кріплення для сторінок на macOS. За замовчуванням сторінки кріпляться під панеллю віконної рами, але ви можете захотіти відображати їх під розміченою HTML панеллю інструментів. Наприклад:

```javascript
const {BrowserWindow} = require('electron')
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

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Чіпає повідомлення вікна. `callback` викликається коли повідомлення отримане в WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Повертає `Boolean` - `true` чи `false` в залежності чи повідомлення причіплене.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Знімає повідомлення вікна.

#### `win.unhookAllWindowMessages()` *Windows*

Знімає всі повідомлення вікна.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Встановлює шлях до файлу, який представлений вікном, та піктограма файлу ьуде показана в панелі заголовку вікна.

#### `win.getRepresentedFilename()` *macOS*

Повертає `String` - Шлях до файлу, який представлений вікном.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Визначає чи документ вікна був редагований і піктограма на панелі заголовків стане сірою, якщо встановлено в `true`.

#### `win.isDocumentEdited()` *macOS*

Повертає `Boolean` - Чи документ вікна був редагований.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (опціонально) - Межі для захоплення
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Те саме що і `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (опціонально) 
  * `httpReferrer` String (опціонально) - HTTP URL вІдправника.
  * `userAgent` String (опціонально) - User agent відправника запиту.
  * `extraHeaders` String (опціонально) - Додаткові заголовки, розділені "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (опціонально) - Основне URL (з розділювачем шляху) для файлів, які мають бути завантажені. Це необхідно, лише якщо вказане `url` є посилання на дані і потребує завантаження інших файлів.

Те саме що і `webContents.loadURL(url[, options])`.

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

#### `win.loadFile(filePath)`

* `filePath` String

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Те саме що і `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Встановлює `menu` як рядок меню вікна, встановлення його в `null` буде видалити рядок меню.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (опціонально) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Встановлює прогрес в рядок прогресу. Допустимий діапазон [0, 1.0].

Видаляє рядок прогресу, якщо прогрес < 0; Змінюється в невизначений режим, якщо прогрес > 1.

На Linux, пітримується тільки середовищем Unity, потрібно визначити назву файлу `*.desktop` для поля `desktopName` в `package.json`. За промовчанням, визначиться в `app.getName().desktop`.

На Windows можна передавати режими. Допустимими значеннями є `none`, `normal`, `indeterminate`, `error`, та `paused`. Якщо викликати `setProgressBar` без режиму (але з допустимим значенням), буде застосовано `normal`.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Встановлює чи вікно повинно мати тінь. На Windows і Linux не робить нічого.

#### `win.hasShadow()` *macOS*

Повертає `Boolean` - Чи вікно має тінь.

На Windows та Linux завжди повертає `true`.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - між 0.0 (повністю прозоре) та 1.0 (повністю непрозоре)

Задає непрозорість вікна. На Linux не робить нічого.

#### `win.getOpacity()` *Windows* *macOS*

Повертає `Number` - між 0.0 (повністю прозоре) та 1.0 (повністю непрозоре)

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Повертає `Boolean` - Якщо кнопки були додані успішно

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

`buttons` масив об'єктів `Button`:

* `Button` Object 
  * `icon` [NativeImage](native-image.md) - Піктограма для показу на палені мініатюр.
  * `click` Function
  * `tooltip` String (опціонально) - Текст для підказки кнопки.
  * `flags` String[] (опціонально) - Контроль станів та поведінки кнопки. За замовчуванням `['enabled']`.

`flags` це масив, що може містити наступні `String`:

* `enabled` - Кнопка активна та доступна юзеру.
* `disabled` - Кнопка відключена. Врна присутня, але має вигляд, такої, що не буде реагувати на дії користувача.
* `dismissonclick` - Коли на кнопку натискають, панель мініатюр негайно закривається.
* `nobackground` - Не малювати границі кнопки, використовувати тільки зображення.
* `hidden` - Кнопка не відображається користувачу.
* `noninteractive` - Кнопка увумкнена але не інтерактивна; при натисканні вигляд не міняється. Це значення для кнопок в сповіщеннях.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Область вікна

Встановлює область вікна яке відображатиметься як мініатюра при наведенні на вікно в панелі задач. Ви можете змінити мініатюру на ціле вікно, вказавши порожню область: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Встановлює спливаючу підказку яка відображається при наведенні на мініатюру вікна в панелі задач.

#### `win.setAppDetails(options)` *Windows*

* `options` Object 
  * `appId` String (опціонально) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Має бути встановленим, інакше інші параметри не матимуть ефекту.
  * `appIconPath` String (опціонально) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (опціонально) - Індекс іконки в `appIconPath`. Ігнорується, якщо `appIconPath` не встановлено. За умовчанням ``.
  * `relaunchCommand` String (опціонально) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (опціонально) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Встановлює властивості кнопки панелі завдань вікна.

**Примітка:** `relaunchCommand` та `relaunchDisplayName` повинні завжди встановлюватись разом. Якщо одна з цих властивостей не встановлена, тоді жожна не буде застосована.

#### `win.showDefinitionForSelection()` *macOS*

Те саме що і `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Змінити піктограму вікна.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Встановлює чи слід автоматично приховувати панель меню. Після встановлення, панель меню відображатиметься тільки коли користувач натисне кнопку `Alt`.

Якщо панель меню вже відображається, виклик `setAutoHideMenuBar(true)` не приховає її негайно.

#### `win.isMenuBarAutoHide()`

Повертає `Boolean` - Якщо панель меню автоматично приховується.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Встановлює чи слід відображати панель меню. Якщо панель меню автоматично приховується, користувач все ще може відкрити панель, натиснувши кнопку `Alt`.

#### `win.isMenuBarVisible()`

Повертає `Boolean` - Якщо панель меню видима.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Примітка:** Цей API не працює на Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Примітка:** Цей API завжди повертає false на Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (опціонально) 
  * `forward` Boolean (опціонально) *Windows* - Якщо true, передають повідомлення про рухи мишки в Chromium, в тому числі пов'язані з мишкою події такими як `mouseleave`. Використовується тільки якщо `ignore` дорівнює true. Якщо `ignore` дорівнює false, передавання завжди вимкнене незважаючи на поточне значення.

Примушує вікно ігнорувати всі події мишки.

Всі події мишки будуть передані вікну нижче, але якщо вікно має фокус, події клавіатури все ще будуть отримуватися.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Забороняє захоплювати контент вікна іншими застосунками.

На macOS встановлює sharingType NSWindow в NSWindowSharingNone. На Windows викликає SetWindowDisplayAffinity з `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Змінює чи вікно може мати фокус.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Повертає `BrowserWindow` - Батьківське вікно.

#### `win.getChildWindows()`

Повертає `BrowserWindow[]` - Всі дочірні вікна.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Вказує чи приховувати курсор під час друку.

#### `win.selectPreviousTab()` *macOS*

Вибирає попередню вкладку, якщо ввімкнено нативні вкладки та існують інші вкладки у вікні.

#### `win.selectNextTab()` *macOS*

Вибирає наступну вкладку, якщо ввімкнено нативні вкладки та існують інші вкладки у вікні.

#### `win.mergeAllWindows()` *macOS*

Об'єднує всі вікна в одне вікно з вкладками, якщо ввімкнено нативні вкладки та існує більш ніж одне відкрите вікно.

#### `win.moveTabToNewWindow()` *macOS*

Переміщує поточну вкладку в нове вікно, якщо ввімкнено нативні вкладки і існує більш ніж одна вкладка в поточному вікні.

#### `win.toggleTabBar()` *macOS*

Показує чи ховає панелі вкладок, якщо ввімкнено нативні вкладки, і є тільки одна вкладка в поточному вікні.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Додає вікно як вкладку на цьому вікні, після вкладки вікна екземпляра.

#### `win.setVibrancy(type)` *macOS*

* `type` String - Може бути `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` чи `ultra-dark`. Дивіться [документацію macOS ](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) для деталей.

Додає ефект вібрації до вікна браузера. При передаванні `null` або пустого рядка буде видалено ефект.

#### `win.setTouchBar(touchBar)` *macOS* *Експериментальний*

* `touchBar` TouchBar

Встановлює шаблон touchBar для почотного вікна. Зазначення `null` чи `undefined` очищує панель дотиків. Цей метод має ефект тільки, якщо машина має панель дотиків та запущена на macOS 10.12.1+.

**Примітка:** TouchBar API наразі експериментальне і може бути видалене в майбутніх версіях Electron.

#### `win.setBrowserView(browserView)` *Експериментальний*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Експериментальний*

Повертає `BrowserView | null` - прикріплений BrowserView. Повертає `null`, якщо немає прикіпленого.

**Примітка:** BrowserView API наразі є експериментальним і може бути зміненим чи видаленим з майбутніх версій Electron.