# Безопасность, нативные возможности и ваша ответственность

Как веб-разработчики, мы заботимся о безопасности браузера и риски, связанные с кодом, который мы пишем, достаточно небольшие. Наши веб-сайты имеют ограниченные полномочия в песочнице, и мы верим, что пользователи довольны браузером, созданным большой командой инженеров, которая может быстро реагировать на последние обнаруженные угрозы безопасности.

Когда вы работаете в среде Электрон, важно понимать, что это не веб браузер. Электрон позволяет создавать функционально развитые приложения для настольных компьютеров с помощью веб технологий, но ваш код обладает большими возможностями. JavaScript имеет доступ к файловой системе, пользовательским скриптам и т. д. Благодаря этим возможностям вы можете создавать высококачественные нативные приложения, но это так же множит риски увеличивающиеся с дополнительными полномочиями вашего кода.

Учтите что показ произвольного содержимого от недоверенных источников влечет за собой риски безопасности, которые Электрон не предназначен купировать. К сведению, наиболее популярные приложения Электрон (Atom, Slack, Visual Studio Code, etc) предназначены для локальной работы (или с доверенными удаленными узлами, без Node интеграции). Если ваше приложение выполняет код из онлайн источника, вы обязаны обеспечить безопасность кода.

## Отчеты по безопасности

Для получения информации о том, как правильно устранять уязвимости Electron, загляни в [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Вопросы и обновления безопасности Chromium

Команда Электрона стремится поддерживать новые версии Chromium как можно быстрее, разработчики должны быть в курсе, что модернизация важное мероприятие с пересмотром и исправлением не одной дюжины или даже сотни файлов. Из за ограниченности ресурсов, Электрон часто отстает от последних версий Chromium, на несколько недель.

Мы понимаем, что наша текущая система обновления компонента Chromiumнарушает баланс между имеющимися у нас ресурсами и потребностями большинство приложений, построенных на его основе. Мы, безусловно, заинтересованы в получении дополнительной информации о работе с Электроном, от людей которые создают приложения на его основе. Мы будем очень благодарны за pull requests и поддержку проекта.

## Игнорирование вышеперечисленных советов

Вопрос безопасности существует всегда, когда вы получаете код из удаленных источников и выполняете его на локальной машине. Для примера рассмотри удаленный сайт показываемый в [`BrowserWindow`](../api/browser-window.md). Если злоумышленник каким-то образом модифицирует код (путем атаки напрямую или находясь между вашим приложением и удаленным источником), он будут в состоянии выполнить код на компьютере пользователя.

> :warning: ни при каких обстоятельствах не следует загружать и выполнять удаленный код с Node.js integration enabled. Вместо этого используйте только локальные файлы (упакованные вместе с вашим приложением), для выполнения Node.js кода. Показывайте удаленный контент используя [`webview`](../api/web-view.md) тэг и убедитесь что выключена `nodeIntegration`.

## Предупреждение безопасности Electron

Электрон 2.0 показывает разработчикам предупреждения и рекомендации в консоли. Они показываются только тогда, когда имя исполняемого файла - Electron.

Вы можете принудительно включить или выключить эти предупреждения в настройках `ELECTRON_ENABLE_SECURITY_WARNINGS` или `ELECTRON_DISABLE_SECURITY_WARNINGS` на любом `process.env` или объекте `window`.

## Чеклист: рекомендации по безопасности

Они не идеальны, но по крайней мере следуя им вы улучшите безопасность вашего приложения.

1. [Загружайте только безопасный контент](#1-only-load-secure-content)
2. [Выключите Node.js интеграцию во всех видах (renderers) показывающих удаленный контент](#2-disable-nodejs-integration-for-remote-content)
3. [Включите контекстную изоляцию для всех видов (renders) с удаленным контентом](#3-enable-context-isolation-for-remote-content)
4. [Используйте `ses.setPermissionRequestHandler()` в сессиях с загрузкой удаленного контента](#4-handle-session-permission-requests-from-remote-content)
5. [Не выключайте `webSecurity`](#5-do-not-disable-websecurity)
6. [Определите `Content-Security-Policy`](#6-define-a-content-security-policy) и используйте ограничительные правила (i.e. `script-src 'self'`)
7. [Откажитесь от `eval`](#7-override-and-disable-eval), которая позволяет строкам выполняться как код.
8. [Не устанавливайте `allowRunningInsecureContent` в `true`](#8-do-not-set-allowrunninginsecurecontent-to-true)
9. [Do not enable experimental features](#9-do-not-enable-experimental-features)
10. [Не испольхуйте `blinkFeatures`](#10-do-not-use-blinkfeatures)
11. [WebViews: Не используйте `allowpopups`](#11-do-not-use-allowpopups)
12. [WebViews: Проверьте параметры всех`<webview>` тэгов](#12-verify-webview-options-before-creation)

## 1) Загружать только безопасный контент

Все ресурсы не включенные в ваше приложение должны быть загружены с использованием безопасного протокола `HTTPS`. Откажитесь от не безопасных протоколов, таких как `HTTP`. Так же мы рекомендуем `WSS` over `WS`, `FTPS` over `FTP`, и т. п.

### Почему?

`HTTPS` имеет 3 главных преимущества:

1) It authenticates the remote server, ensuring your app connects to the correct host instead of an impersonator. 2) It ensures data integrity, asserting that the data was not modified while in transit between your application and the host. 3) It encrypts the traffic between your user and the destination host, making it more difficult to eavesdrop on the information sent between your app and the host.

### Как?

```js
// Плохо
browserWindow.loadURL('http://my-website.com') 

// Хорошо
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- Плохо -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- Хорошо -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) Выключите интеграцию с Node.js для удаленного содержимого

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) that loads remote content. The goal is to limit the powers you grant to remote content, thus making it dramatically more difficult for an attacker to harm your users should they gain the ability to execute JavaScript on your website.

After this, you can grant additional permissions for specific hosts. For example, if you are opening a BrowserWindow pointed at `https://my-website.com/", you can give that website exactly the abilities it needs, but no more.

### Почему?

A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

### Как?

```js
// Плохо 
const mainWindow = new BrowserWindow() 
mainWindow.loadURL('https://my-website.com')
```

```js
// Good 
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
   }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

При отключении интеграции с Node.js, можно по-прежнему использовать API на вашем сайте, которые используют модули или функции Node.js. Preload scripts continue to have access to `require` and other Node.js features, allowing developers to expose a custom API to remotely loaded content.

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

### Почему?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### Как?

```js
// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
```

```js
// Preload script

// Set a variable in the page before it loads
webFrame.executeJavaScript('window.foo = "foo";')

// The loaded page will not be able to access this, it is only available
// in this context
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // Will log out 'undefined' since window.foo is only available in the main
  // context
  console.log(window.foo)

  // Will log out 'bar' since window.bar is available in this context
  console.log(window.bar)
})
```

## 4) Handle Session Permission Requests From Remote Content

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### Почему?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### Как?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    if (!url.startsWith('https://my-website.com')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) Do Not Disable WebSecurity

*Recommendation is Electron's default*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### Почему?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### Как?

```js
// Bad
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

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your applications security.

### Как?

Electron respects [the `Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) and the respective `<meta>` tag.

The following CSP will allow Electron to execute scripts from the current website and from `apis.mydomain.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## 7) Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### Почему?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### Как?

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## 8) Do Not Set `allowRunningInsecureContent` to `true`

*Recommendation is Electron's default*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Почему?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

### Как?

```js
// Bad
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

## 9) Do Not Enable Experimental Features

*Recommendation is Electron's default*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` and `experimentalCanvasFeatures` properties.

### Почему?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### Как?

```js
// Bad
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

## 10) Do Not Use `blinkFeatures`

*Recommendation is Electron's default*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `blinkFeatures` property allows developers to enable features that have been disabled by default.

### Почему?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### Как?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    blinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

## 11) Do Not Use `allowpopups`

*Recommendation is Electron's default*

If you are using [`WebViews`](../api/web-view.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### Почему?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](../api/browser-window.md) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### Как?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 12) Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](../api/web-view.md) from the main process and to verify that their webPreferences do not disable security features.

### Почему?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](../api/web-view.md) tags.

### Как?

Before a [`<WebView>`](../api/web-view.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of WebViews with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.