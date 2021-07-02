# Безопасность, нативные возможности и ваша ответственность

Как веб-разработчики, мы заботимся о безопасности браузера и риски, связанные с кодом, который мы пишем, достаточно небольшие. Наши веб-сайты имеют ограниченные полномочия в песочнице, и мы верим, что пользователи довольны браузером, созданным большой командой инженеров, которая может быстро реагировать на последние обнаруженные угрозы безопасности.

Когда вы работаете в среде Электрон, важно понимать, что это не веб браузер. Электрон позволяет создавать функционально развитые приложения для настольных компьютеров с помощью веб технологий, но ваш код обладает большими возможностями. JavaScript имеет доступ к файловой системе, пользовательским скриптам и т. д. Благодаря этим возможностям вы можете создавать высококачественные нативные приложения, но это так же множит риски увеличивающиеся с дополнительными полномочиями вашего кода.

Учтите что показ произвольного содержимого от недоверенных источников влечет за собой риски безопасности, которые Электрон не предназначен купировать. К сведению, наиболее популярные приложения Электрон (Atom, Slack, Visual Studio Code, etc) предназначены для локальной работы (или с доверенными удаленными узлами, без Node интеграции). Если ваше приложение выполняет код из онлайн источника, вы обязаны обеспечить безопасность кода.

## Отчеты по безопасности

Для получения информации о том, как правильно устранять уязвимости Electron, загляни в [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Вопросы и обновления безопасности Chromium

Electron обновляется с чередованием релизов Chromium. Для получения дополнительной информации, смотрите [пост в блоге Электронной версии](https://electronjs.org/blog/12-week-cadence).

## Безопасность - это ответственность каждого

Важно помнить, что безопасность вашего Electron приложения является результатом общей безопасности основы платформы (*Chromium*, *Node.js*), самого Electron, всех NPM-зависимостей и вашего кода. Поэтому вы обязаны следовать нескольким важным рекомендациям:

* **Будьте в курсе последних выпусков Electron.** При выпуске вашего продукта, вы также можете отправить пакет из Electron, разделяемой библиотеки Chromium и Node.js. Уязвимости, влияющие на эти компоненты могут повлиять на безопасность вашего приложения. Обновив Electron до последней версии , вы гарантируете, что критические уязвимости (такие как *nodeIntegration bypasses*) уже пропатчены и не могут быть использованы в вашем приложении. For more information, see "[Use a current version of Electron](#15-use-a-current-version-of-electron)".

* **Оценить зависимости.** Хотя Музей предоставляет полмиллиона повторно используемых пакетов, он несет ответственность за выбор доверенных сторонних библиотек. Если вы используете устаревшие библиотеки, затронутые известными уязвимостями, или полагаетесь на плохо поддерживаемый код, ваша безопасность приложения может быть поставлена под угрозу.

* **Принять безопасные методы программирования** Первая линия защиты вашей заявки — ваш собственный код. Общие веб-уязвимости, такие как Cross-Site Scripting (XSS), имеют повышенное влияние на безопасность приложений Electron, поэтому настоятельно рекомендуется применять передовые методы разработки безопасного программного обеспечения и проводить тестирование безопасности.

## Изоляция ненадежного контента

Проблемы безопасности возникают всякий раз, когда вы получаете код из ненадежного источника (напр., удаленный сервер) и выполняете его локально. As an example, consider a remote website being displayed inside a default [`BrowserWindow`][browser-window]. Если злоумышленник каким-то образом удается изменить указанное содержимое (либо напрямую атакуя исходный код, или сидя между вашим приложением и фактическим пунктом назначения), они смогут выполнить родной код на машине пользователя.

> :warning:  ни при каких обстоятельствах не следует загружать и выполнять удаленный код с Node.js integration enabled. Вместо этого используйте только локальные файлы (упакованные вместе с вашим приложением), для выполнения Node.js кода. To display remote content, use the [`<webview>`][webview-tag] tag or [`BrowserView`][browser-view], make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Предупреждение безопасности Electron

Электрон 2.0 показывает разработчикам предупреждения и рекомендации в консоли. Они показываются только тогда, когда имя исполняемого файла - Electron.

Вы можете принудительно включить или выключить эти предупреждения в настройках `ELECTRON_ENABLE_SECURITY_WARNINGS` или `ELECTRON_DISABLE_SECURITY_WARNINGS` на любом `process.env` или объекте `window`.

## Чеклист: рекомендации по безопасности

По крайней мере выполните эти шаги для повышения безопасности вашего приложения:

1. [Загружайте только безопасный контент](#1-only-load-secure-content)
2. [Выключите Node.js интеграцию во всех видах (renderers) показывающих удаленный контент](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Включите контекстную изоляцию для всех видов (renders) с удаленным контентом](#3-enable-context-isolation-for-remote-content)
4. [Используйте `ses.setPermissionRequestHandler()` в сессиях с загрузкой удаленного контента](#4-handle-session-permission-requests-from-remote-content)
5. [Не выключайте `webSecurity`](#5-do-not-disable-websecurity)
6. [Определите `Content-Security-Policy`](#6-define-a-content-security-policy) и используйте ограничительные правила (i.e. `script-src 'self'`)
7. [Не устанавливайте `allowRunningInsecureContent` в `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Не включайте экспериментальные функции](#8-do-not-enable-experimental-features)
9. [Не используйте `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Не используйте `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Проверьте параметры и параметры](#11-verify-webview-options-before-creation)
12. [Отключить или ограничить навигацию](#12-disable-or-limit-navigation)
13. [Отключить или ограничить создание новых окон](#13-disable-or-limit-creation-of-new-windows)
14. [Не используйте `openExternal` с ненадежным содержимым](#14-do-not-use-openexternal-with-untrusted-content)
15. [Использовать текущую версию Electron](#15-use-a-current-version-of-electron)

Для автоматизации определения неправильных конфигураций и небезопасных шаблонов можно использовать [электронное выражение](https://github.com/doyensec/electronegativity). для дополнительной информации о потенциальных недостатках и ошибках реализации при разработке приложений с помощью Electron, пожалуйста, обратитесь к этому [руководству для разработчиков и аудиторов](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Загружать только безопасный контент

Все ресурсы не включенные в ваше приложение должны быть загружены с использованием безопасного протокола `HTTPS`. Откажитесь от не безопасных протоколов, таких как `HTTP`. Так же мы рекомендуем `WSS` over `WS`, `FTPS` over `FTP`, и т. п.

### Почему?

`HTTPS` имеет 3 главных преимущества:

1) Он аутентифицирует удаленный сервер, обеспечивая подключение приложения к правильному хосту вместо имперсатора. 2) Обеспечивает целостность данных, утверждая, что данные не были изменены во время транзита между вашим приложением и узлом. 3) Он шифрует трафик между вашим пользователем и хостом назначения, что усложняет перехват информации, отправленную между вашим приложением и хостом.

### Как?

```js
// Плохо
browserWindow.loadURL('http://example.com') 

// Хорошо
browserWindow.loadURL('https://example.com')
```

```html
<!-- Плохо -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Хорошо -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Не включать интеграцию Node.js для удаленного контента

_Эта рекомендация является поведением по умолчанию в Electron начиная с 5.0.0._

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) that loads remote content. Цель - ограничить полномочия на удаленное содержимое, таким образом значительно сложнее нанести вред вашим пользователям, если они получат возможность выполнить JavaScript на вашем сайте.

После этого вы можете предоставить дополнительные права доступа для определенных узлов. Например, , если вы открываете браузер (BrowserWindow), указанный в `https://example. om/`, вы можете дать этому сайту точно необходимые ему возможности, но не больше.

### Почему?

Атака перекрёстного сценария (XSS) является более опасной, если нападающий может прыгнуть из процесса рендерера и выполнить код на компьютере пользователя. Атаки между сайтами и скриптами довольно распространены - и хотя бы один вопрос, их сила в обычно ограничивается сообщением с сайтом, на котором они выполняются. Отключение интеграции Node.js помогает предотвратить перерастание XSS в так называемую атаку "Удаленное выполнение кода" (RCE).

### Как?

```js
// Плохое
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Хороший
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

При отключении интеграции с Node.js, можно по-прежнему использовать API на вашем сайте, которые используют модули или функции Node.js. Предозагрузка скриптов продолжает иметь доступ к `, требуется` и другой узел. , позволяя разработчикам раскрыть пользовательский API для удаленно загруженного контента.

In the following example preload script, the later loaded website will have access to a `window.readConfig()` method, but no Node.js features.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) Включите контекстную изоляцию для удаленного содержимого

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

Even when `nodeIntegration: false` is used, to truly enforce strong isolation and prevent the use of Node primitives `contextIsolation` **must** also be used.

### Почему & Как?

Для получения дополнительной информации о том, какие `контекстные` и как их включить, пожалуйста, смотрите наш специальный [Изоляция контекста](context-isolation.md) документ.

## 4) Handle Session Permission Requests From Remote Content

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### Почему?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### Как?

```js
const { session } = require('electron')

сеанс
  .fromPartition('some-partition')
  . etPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents. etURL()

    if (permission === 'notifications') {
      // Одобряет запрос разрешений
      callback(true)
    }

    // Проверьте URL
    if (! rl. tartsWith('https://example. om/')) {
      // Отменяет запрос разрешений
      return callback(false)
    }
})
```

## 5) Do Not Disable WebSecurity

_Recommendation is Electron's default_

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`&lt;webview&gt;`][webview-tag]) disables crucial security features.

Do not disable `webSecurity` in production applications.

### Почему?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### Как?

```js
// Плохая
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

```html
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 6) Define a Content Security Policy

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

### Почему?

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://example.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your application's security.

The following CSP will allow Electron to execute scripts from the current website and from `apis.example.com`.

```plaintext
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### CSP HTTP заголовок

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest. nHeadersReceived(details, callback) => {
  callback({
    responseHeaders: {
      . .details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

CSP's preferred delivery mechanism is an HTTP header, however it is not possible to use this method when loading a resource using the `file://` protocol. It can be useful in some cases, such as using the `file://` protocol, to set a policy on a page directly in the markup using a `&lt;meta&gt;` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7) Do Not Set `allowRunningInsecureContent` to `true`

_Recommendation is Electron's default_

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Почему?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

### Как?

```js
// Плохая
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 8) Do Not Enable Experimental Features

_Recommendation is Electron's default_

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.

### Почему?

Экспериментальные функции, как предлагает название, экспериментальные и не были включены для всех пользователей Chromium. Кроме того, их влияние на Electron в целом скорее всего не было протестировано.

Легитимные варианты использования существуют, но если вы не знаете, что вы делаете, вы должны не включать это свойство.

### Как?

```js
// Плохая
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 9) Не использовать `enableBlinkFeatures`

_Recommendation is Electron's default_

Blink - это имя движка рендеринга за Chromium. Как и в `experimentalFeatures`, свойство `enableBlinkFeatures` позволяет разработчикам включать функции, которые были отключены по умолчанию.

### Почему?

Как правило, есть веские причины, если функция по умолчанию не включена . Есть законные варианты использования для включения определенных функций. Как разработчик, вы должны точно знать, почему вам нужно включить функцию, что такое последствия и как они влияют на безопасность вашего приложения. При ни при каких обстоятельствах вы не должны включать возможности спекулятивно.

### Как?

```js
// Плохая
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

## 10) Не использовать `разрешать всплывающие окна`

_Recommendation is Electron's default_

If you are using [`<webview>`][webview-tag], you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`][browser-window] using the `window.open()` method. `<webview>` тэги в противном случае не могут создавать новые окна.

### Почему?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`][browser-window] by default. Это следует принципу минимально необходимого доступа: Не позволяйте веб-сайту создавать новые всплывающие окна, если вы знаете, что он нуждается в этой функции.

### Как?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 11) Проверьте настройки WebView перед созданием

WebView, созданный в процессе визуализации, который не имеет включенной интеграции Node.js не сможет включить интеграцию самостоятельно. Тем не менее, WebView всегда будет создавать независимый процесс визуализации с собственными `настройками`.

It is a good idea to control the creation of new [`<webview>`][webview-tag] tags from the main process and to verify that their webPreferences do not disable security features.

### Почему?

Поскольку `<webview>` живут в DOM, они могут быть созданы скриптом, запущенным на вашем веб-сайте, даже если Node. s интеграция в противном случае отключена.

Electron позволяет разработчикам отключать различные функции безопасности, которые контролируют процесс визуализации. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`][webview-tag] tags.

### Как?

Before a [`<webview>`][webview-tag] tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Используйте событие , чтобы предотвратить создание `веб-просмотров` с возможными небезопасными опциями.

```js
app.on('web-contents-created', (event, contents) => {
  содержание. n('will-attach-webview', (событие, веб-настройки, params) => {
    // Выход из предустановленных скриптов, если неиспользованные или проверять их местоположение законно
    удалять webPreferences. перезагрузить
    удалять настройки веб страниц. reloadURL

    // Отключить интеграцию Node.js
    webPreferences. odeIntegration = false

    // Проверьте URL загружаемый
    if (!params. rc.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Опять же, этот список лишь сводит к минимуму риск, он не удаляет его. Если ваша цель - отображать сайт, браузер будет более безопасным.

## 12) Выключить или ограничить навигацию

Если у вашего приложения нет необходимости перемещаться или только для перехода на известные страницы, хорошая идея прямо ограничить навигацию до известного охвата, запрещая любые другие виды навигации.

### Почему?

Навигация - обычный вектор атаки. Если злоумышленник может убедить ваше приложение уйти от его текущей страницы, они могут заставить ваше приложение открыть веб-сайтов в Интернете. Даже если ваш `веб-контент` настроен на более безопасный (например, если `узлы` отключено </code> или `контекстное значение` включено), заставить ваше приложение открыть случайный веб-сайт значительно упростит работу над вашим приложением .

Обычный шаблон атаки заключается в том, что злоумышленник побуждает пользователей вашего приложения к взаимодействовать с приложением таким образом, чтобы он перешел к одной из страниц нападающего. Обычно это делается с помощью ссылок, плагинов или другого контента, созданного пользователем.

### Как?

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`][will-navigate] handler. Если вы знаете, какие страницы ваше приложение может перейти, проверьте URL в обработчике событий и пусть навигация возникает, только если она соответствует URL, которые вы ожидаете.

Мы рекомендуем вам использовать парсер узла для URL-адресов. Простые строковые сравнения могут иногда быть смущены - `startsWith('https://example.com')` тест позволил бы `example.com.attacker.com` сквозь.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  содержимое. n('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl. rigin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Отключить или ограничить создание новых окон

Если у вас есть известный набор окон, то лучше ограничить создание дополнительных окон в вашем приложении.

### Почему?

Так же, как навигация, создание нового `веб-контента` является общей атакой вектора. Атакующие пытаются убедить ваше приложение в создании новых окон, фреймов, или других процессов визуализации с большими правами, чем раньше; или с открытыми страницами, которые они не смогли открыть раньше.

Если вам не нужно создавать окна в дополнение к тем, которые вы знаете, нужно создать, отключение от создания покупает вам немного дополнительной безопасности без каких-либо затрат. Это обычно относится к приложениям, которые открывают один `BrowserWindow` и не требуют открытия произвольного числа дополнительных окон во время выполнения.

### Как?

[`webContents`][web-contents] will delegate to its [window open handler][window-open-handler] before creating new windows. The handler will receive, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you register a handler to monitor the creation of windows, and deny any unexpected window creation.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```

## 14) Не используйте `openExternal` с ненадежным содержимым

Shell's [`openExternal`][open-external] allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

### Почему?

Improper use of [`openExternal`][open-external] can be leveraged to compromise the user's host. Когда openExternal используется с ненадежным содержимым, его можно использовать для выполнения произвольных команд.

### Как?

```js
// Некорректный
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
// Хороший
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Use a current version of Electron

Вы должны стремиться всегда использовать последнюю доступную версию Electron. Всякий раз, когда будет выпущена новая основная версия, вы должны попытаться обновить ваше приложение как можно скорее.

### Почему?

Приложение, созданное с более старой версией Electron, Chromium и Node. s — это более легкая цель, чем приложение, использующее более свежие версии этих компонентов. Вообще проблемы безопасности и эксплойты для старых версий Chromium и Node.js более широко доступны.

И Chromium, и Node.js являются впечатляющими подвигами инженерии, построенной тысячами талантливых разработчиков. С учетом их популярности, их безопасность тщательно тестируется и анализируется одинаково опытными исследователями в области безопасности. Many of those researchers [disclose vulnerabilities responsibly][responsible-disclosure], which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. Ваше приложение будет более безопасным, если будет запущена последняя версия Electron (и таким образом, Chromium и Node. s) для , какие потенциальные проблемы безопасности не известны.

[browser-window]: ../api/browser-window.md

[browser-window]: ../api/browser-window.md
[browser-view]: ../api/browser-view.md
[webview-tag]: ../api/webview-tag.md
[webview-tag]: ../api/webview-tag.md
[web-contents]: ../api/web-contents.md
[window-open-handler]: ../api/web-contents.md#contentssetwindowopenhandlerhandler
[will-navigate]: ../api/web-contents.md#event-will-navigate
[open-external]: ../api/shell.md#shellopenexternalurl-options
[responsible-disclosure]: https://en.wikipedia.org/wiki/Responsible_disclosure
