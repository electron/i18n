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

Emitted when window session is going to end due to force shutdown or machine restart or session log off.

#### Подія: 'unresponsive'

Emitted when the web page becomes unresponsive.

#### Подія: 'responsive'

Emitted when the unresponsive web page becomes responsive again.

#### Подія: 'blur'

Emitted when the window loses focus.

#### Подія: 'focus'

Emitted when the window gains focus.

#### Подія: 'show'

Emitted when the window is shown.

#### Подія: 'hide'

Emitted when the window is hidden.

#### Подія: 'ready-to-show'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

#### Подія: 'maximize'

Emitted when window is maximized.

#### Подія: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Подія: 'minimize'

Emitted when the window is minimized.

#### Подія: 'restore'

Emitted when the window is restored from a minimized state.

#### Подія: 'resize'

Emitted when the window is being resized.

#### Подія: 'move'

Emitted when the window is being moved to a new position.

**Note**: On macOS this event is just an alias of `moved`.

#### Подія: 'moved' *macOS*

Emitted once when the window is moved to a new position.

#### Подія: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Подія: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Подія: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Подія: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Подія: 'app-command' *Windows*

Повертає:

* `event` Event
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

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

Emitted when scroll wheel event phase has begun.

#### Подія: 'scroll-touch-end' *macOS*

Emitted when scroll wheel event phase has ended.

#### Подія: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Подія: 'swipe' *macOS*

Повертає:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Подія: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Подія: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### Подія: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### Статичні Методи

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Returns `BrowserWindow` - The window with the given `id`.

#### `BrowserWindow.addExtension(path)`

* `path` String

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Remove a Chrome extension by name.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.getExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

The method will also not return if the extension's manifest is missing or incomplete.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Remove a DevTools extension by name.

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Примітка:** Це API не може бути викликане перед викликом події `ready` модуля `app`.

### Властивості Екземпляра

Objects created with `new BrowserWindow` have the following properties:

```javascript
const {BrowserWindow} = require('electron')
// В цьому прикладі `win` наш екземпляр
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

#### `win.id`

A `Integer` representing the unique ID of the window.

### Методи Екземпляра

Objects created with `new BrowserWindow` have the following instance methods:

**Примітка:** Деякі методи доступні тільки на певних операціїних системах і позначені як такі.

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

Hides the window.

#### `win.isVisible()`

Returns `Boolean` - Whether the window is visible to the user.

#### `win.isModal()`

Returns `Boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Unmaximizes the window.

#### `win.isMaximized()`

Returns `Boolean` - Whether the window is maximized.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restores the window from minimized state to its previous state.

#### `win.isMinimized()`

Returns `Boolean` - Whether the window is minimized.

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

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Just sum any extra width and height areas you have within the overall content view.

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Resizes and moves the window to the supplied bounds

#### `win.getBounds()`

Повертає [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

Повертає [`Rectangle`](structures/rectangle.md)

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window to `width` and `height`.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window's client area (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Sets whether the window can be manually resized by user.

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

На Linux завжди повертає `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

На Linux завжди повертає `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

На Linux завжди повертає `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

На Linux завжди повертає `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) *macOS* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is ``. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (optional) *macOS*

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const {BrowserWindow} = require('electron')
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
* `callback` Функція

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

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (опціонально) 
  * `httpReferrer` String (опціонально) - HTTP URL вІдправника.
  * `userAgent` String (опціонально) - User agent відправника запиту.
  * `extraHeaders` String (опціонально) - Додаткові заголовки, розділені "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (опціонально) - Основне URL (з розділювачем шляху) для файлів, які мають бути завантажені. Це необхідно, лише якщо вказане `url` є посилання на дані і потребує завантаження інших файлів.

Same as `webContents.loadURL(url[, options])`.

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

#### `win.loadFile(filePath)`

* `filePath` String

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (опціонально) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Об'єкт 
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
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

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `options` Об'єкт 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is ``.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Changes window icon.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (опціонально) 
  * `forward` Boolean (optional) *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

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

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Примітка:** TouchBar API наразі експериментальне і може бути видалене в майбутніх версіях Electron.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**Примітка:** BrowserView API наразі є експериментальним і може бути зміненим чи видаленим з майбутніх версій Electron.