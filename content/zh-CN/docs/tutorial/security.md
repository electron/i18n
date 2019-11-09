# 安全性，原生能力和你的责任

Web开发人员通常享有浏览器强大的网络安全特性，而自己的代码风险相对较小。 我们的网站从沙箱获得有限权限。我们坚信用户可以享受一个大的工程师团队构建的浏览器，因为他们能够快速响应新发现的安全威胁。

当使用 Electron 时，很重要的一点是要理解 Electron 不是一个 Web 浏览器。 它允许您使用熟悉的 Web 技术构建功能丰富的桌面应用程序，但是您的代码具有更强大的功能。 JavaScript 可以访问文件系统，用户 shell 等。 这允许您构建更高质量的本机应用程序，但是内在的安全风险会随着授予您的代码的额外权力而增加。

考虑到这一点，请注意，展示任意来自不受信任源的内容都将会带来严重的安全风险，而这种风险Electron也没打算处理。 事实上，最流行的 Electron 应用程序(Atom，Slack，Visual Studio Code 等) 主要显示本地内容(即使有远程内容也是无 Node 的、受信任的、安全的内容) - 如果您的应用程序要运行在线的源代码，那么您需要确保源代码不是恶意的。

## 报告安全问题

有关如何正确上报 Electron 漏洞的信息，参阅 [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium 安全问题和升级

Electron 保持与 Chromium 同步更新迭代。更多信息参见 [Electron 博客发布文章](https://electronjs.org/blog/12-week-cadence)。

## 安全是所有人的共同责任

需要牢记的是，你的 Electron 程序安全性除了依赖于整个框架基础（*Chromium*、*Node.js*）、Electron 本身和所有相关 NPM 库的安全性，还依赖于你自己的代码安全性。 因此，你有责任遵循下列安全守则：

* **使用最新版的 Electron 框架搭建你的程序。**你最终发行的产品中会包含 Electron、Chromium 共享库和 Node.js 的组件。 这些组件存在的安全问题也可能影响你的程序安全性。 你可以通过更新Electron到最新版本来确保像是*nodeIntegration绕过攻击*一类的严重漏洞已经被修复因而不会影响到你的程序。 请参阅“[使用当前版本的Electron](#17-use-a-current-version-of-electron)”以获取更多信息。

* **评估你的依赖项目**NPM提供了五百万可重用的软件包，而你应当承担起选择可信任的第三方库。 如果你使用了受已知漏洞的过时的库，或是依赖于维护的很糟糕的代码，你的程序安全就可能面临威胁。

* **遵循安全编码实践**你的代码是你的程序安全的第一道防线。 一般的网络漏洞，例如跨站脚本攻击(Cross-Site Scripting, XSS)，对Electron将造成更大的影响，因此非常建议你遵循安全软件开发最佳实践并进行安全性测试。

## 隔离不信任的内容

每当你从不被信任的来源(如一个远程服务器)获取代码并在本地执行，其中就存在安全性问题。 例如在默认的 [`BrowserWindow`](../api/browser-window.md)中显示一个远程网站. If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :warning:无论如何，在启用Node.js集成的情况下，你都不该加载并执行远程代码。 相反，只使用本地文件（和您的应用打包在一起）来执行Node.js代码 To display remote content, use the [`<webview>`](../api/webview-tag.md) tag or [`BrowserView`](../api/browser-view.md), make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Electron 安全警告

从Electron 2.0版本开始，开发者将会在开发者控制台看到打印的警告和建议。 这些警告仅在可执行文件名为 Electron 时才会为开发者显示。

你可以通过在`process.env` 或 `window`对象上配置`ELECTRON_ENABLE_SECURITY_WARNINGS` 或`ELECTRON_DISABLE_SECURITY_WARNINGS`来强制开启或关闭这些警告。

## 清单：安全建议

为加强程序安全性，你至少应当遵循下列规则：

1. [只加载安全的内容](#1-only-load-secure-content)
2. [禁止在所有渲染器中使用Node.js集成显示远程内容](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [做所有显示远程内容的渲染器中启用上下文隔离。](#3-enable-context-isolation-for-remote-content)
4. [在所有加载远程内容的会话中使用 `ses.setPermissionRequestHandler()`.](#4-handle-session-permission-requests-from-remote-content)
5. [不要禁用 ` webSecurity `](#5-do-not-disable-websecurity)
6. [定义一个`Content-Security-Policy`](#6-define-a-content-security-policy)并设置限制规则(如：`script-src 'self'`)
7. [不要设置 ` allowRunningInsecureContent ` 为 true.](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [不要开启实验性功能](#8-do-not-enable-experimental-features)
9. [不要使用`enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`：不要使用 `allowpopups `](#10-do-not-use-allowpopups)
11. [`<webview>`：验证选项与参数](#11-verify-webview-options-before-creation)
12. [禁用或限制网页跳转](#12-disable-or-limit-navigation)
13. [禁用或限制新窗口创建](#13-disable-or-limit-creation-of-new-windows)
14. [不要对不可信的内容使用 `openExternal`](#14-do-not-use-openexternal-with-untrusted-content)
15. [禁用 `remote` 模块](#15-disable-the-remote-module)
16. [限制 `remote` 模块](#16-filter-the-remote-module)
17. [使用当前版本的 Electron](#17-use-a-current-version-of-electron)

To automate the detection of misconfigurations and insecure patterns, it is possible to use [electronegativity](https://github.com/doyensec/electronegativity). For additional details on potential weaknesses and implementation bugs when developing applications using Electron, please refer to this [guide for developers and auditors](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) 仅加载安全内容

任何不属于你的应用的资源都应该使用像`HTTPS`这样的安全协议来加载。 换言之， 不要使用不安全的协议 （如 ` HTTP `）。 同理，我们建议使用`WSS`，避免使用`WS`，建议使用`FTPS` ，避免使用`FTP`，等等诸如此类的协议。

### 为什么？

` HTTPS ` 有三个主要好处：

1) 它对远程服务器进行身份验证, 确保您的应用程序连接到正确的主机而不是模仿器。 2) 确保数据完整性, 断言数据在应用程序和主机之间传输时未被修改。 3) 它对用户和目标主机之间的通信进行加密, 从而更难窃听应用程序和主机之间发送的信息。

### 怎么做？

```js
// 不推荐
browserWindow.loadURL ('http://example.com')
// 推荐 
browserWindow.loadURL ('https://example.com')
```

```html
<!-- 不推荐 -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- 推荐 -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Do not enable Node.js Integration for Remote Content

*This recommendation is the default behavior in Electron since 5.0.0.*

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) that loads remote content. 其目的是限制您授予远程内容的权限, 从而使攻击者在您的网站上执行 JavaScript 时更难伤害您的用户。

在此之后，你可以为指定的主机授予附加权限。 For example, if you are opening a BrowserWindow pointed at `https://example.com/`, you can give that website exactly the abilities it needs, but no more.

### 为什么？

如果攻击者跳过渲染进程并在用户电脑上执行恶意代码，那么这种跨站脚本(XSS) 攻击的危害是非常大的。 跨站脚本攻击很常见，通常情况下，威力仅限于执行代码的网站。 禁用Node.js集成有助于防止XSS攻击升级为“远程代码执行” (RCE) 攻击。

### 怎么做？

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!-- 不推荐 -->
<webview nodeIntegration src="page.html"></webview>

<!-- 推荐 -->
<webview src="page.html"></webview>
```

当禁用Node.js集成时，你依然可以暴露API给你的站点以使用Node.js的模块功能或特性。 预加载脚本依然可以使用`require`等Node.js特性， 以使开发者可以暴露自定义API给远程加载内容。

在下面的预加载脚本例子中，后加载的网站内容可以使用`window.readConfig()`方法，但不能使用Node.js特性。

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) 为远程内容开启上下文隔离

上下文隔离是Electron的一个特性，它允许开发者在预加载脚本里运行代码，里面包含Electron API和专用的JavaScript上下文。 实际上，这意味全局对象如 `Array.prototype.push` 或 `JSON.parse`等无法被渲染进程里的运行脚本修改。

Electron使用了和Chromium相同的[Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment)技术来开启这个行为。

Even when you use `nodeIntegration: false` to enforce strong isolation and prevent the use of Node primitives, `contextIsolation` must also be used.

### 为什么？

上下文隔离使得每个运行在渲染器上的脚本无需担心改变JavaScript环境变量而与ElectronAPI或预加载脚本发生冲突。

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts, which mitigates so-called "Prototype Pollution" attacks.

同时，预加载脚本依然能访问`document`和`window`对象。换个角度，就像你以很小的投入却得到双倍回报一样。

### 怎么做？

```js
// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})
```

```js
// 预加载脚本

// 在页面加载前设置变量
webFrame.executeJavaScript('window.foo = "foo";')

// 这个变量仅限于当前上下文，被加载的页面将无权访问
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // 结果为 'undefined'，因为 window.foo 仅在主上下文中可用
  console.log(window.foo)

  // 结果为 'bar'，因为 window.bar 定义在本上下文中
  console.log(window.bar)
})
```

## 4) 处理来自远程内容的会话许可请求

当你使用Chromes时，也许见过这种许可请求：每当网站尝试使用某个特性时，就会弹出让用户手动确认(如网站通知)

此API基于[Chromium permissions API](https://developer.chrome.com/extensions/permissions)，并已实现对应的许可类型。

### 为什么？

默认情况下，Electron将自动批准所有的许可请求，除非开发者手动配置一个自定义处理函数。 尽管默认如此，有安全意识的开发者可能希望默认反着来。

### 怎么做？

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

    // Verify URL
    if (!url.startsWith('https://example.com/')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) 不要禁用WebSecurity

*Electron的默认值即是建议值。*

在渲染进程（[`BrowserWindow`](../api/browser-window.md)、[`BrowserView`](../api/browser-view.md) 和 [`<webview>`](../api/webview-tag.md)）中禁用 `webSecurity` 将导致至关重要的安全性功能被关闭。

不要在生产环境中禁用`webSecurity`。

### 为什么？

禁用 `webSecurity` 将会禁止同源策略并且将 `allowRunningInsecureContent` 属性置 `true`。 换句话说，这将使得来自其他站点的非安全代码被执行。

### 怎么做？

```js
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// 推荐
const mainWindow = new BrowserWindow()
```

```html
<!-- 不推荐 -->
<webview disablewebsecurity src="page.html"></webview>

<!-- 推荐 -->
<webview src="page.html"></webview>
```

## 6) 定义一个内容安全策略

内容安全策略(CSP) 是应对跨站脚本攻击和数据注入攻击的又一层保护措施。 我们建议任何载入到Electron的站点都要开启。

### 为什么？

CSP允许Electron通过服务端内容对指定页面的资源加载进行约束与控制。 如果你定义`https://example.com`这个源，所属这个源的脚本都允许被加载，反之`https://evil.attacker.com`不会被允许加载运行。 对于提升你的应用安全性，设置CSP是个很方便的办法。

下面的CSP设置使得Electron只能执行自身站点和来自`apis.example.com`的脚本。

```plaintext
// 不推荐
Content-Security-Policy: '*'

// 推荐
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### CSP HTTP头

Electron 会处理 [`Content-Security-Policy` HTTP 标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)，它可以在 [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) 中进行设置：

```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP元标签

CSP的首选传递机制是HTTP报头，但是在使用`file://`协议加载资源时，不可能使用此方法。 It can be useful in some cases, such as using the `file://` protocol, to set a policy on a page directly in the markup using a `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

#### `webRequest.onHeadersReceived([filter, ]listener)`

## 7) 不要设置`allowRunningInsecureContent`为`true`

*Electron的默认值即是建议值。*

默认情况下，Electron不允许网站在`HTTPS`中加载或执行非安全源(`HTTP`) 中的脚本代码、CSS或插件。 将`allowRunningInsecureContent`属性设为`true`将禁用这种保护。

当网站的初始内容通过`HTTPS`加载并尝试在子请求中加载`HTTP`的资源时，这被称为"混合内容"。

### 为什么？

通过`HTTPS`加载会将该资源进行加密传输，以保证其真实性和完整性。 参看[只显示安全内容](#1-only-load-secure-content)这节以获得更多信息。

### 怎么做？

```js
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// 推荐
const mainWindow = new BrowserWindow({})
```

## 8) 不要开启实验室特性

*Electron的默认值即是建议值。*

Electron 的熟练用户可以通过 ` experimentalFeatures` 属性来启用 Chromium 实验性功能。

### 为什么？

实验室特性，恰如其名，是实验性质且不对所有Chromium用户开启。更进一步说，这些特性对Electron的整体影响可能没有测试。

尽管存在合理的使用场景，但是除非你知道你自己在干什么，否则你不应该开启这个属性。

### 怎么做？

```js
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// 推荐
const mainWindow = new BrowserWindow({})
```

## 9) 不要使用`enableBlinkFeatures`

*Electron的默认值即是建议值。*

Blink是Chromium里的渲染引擎名称。 就像`experimentalFeatures`一样，`enableBlinkFeatures`属性将使开发者启用被默认禁用的特性。

### 为什么？

通常来说，某个特性默认不被开启肯定有其合理的原因。 针对特定特性的合理使用场景是存在的。 作为开发者，你应该非常明白你为何要开启它，有什么后果，以及对你应用安全性的影响。 在任何情况下都不应该推测性的开启特性。

### 怎么做？

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// 推荐
const mainWindow = new BrowserWindow()
```

## 10) 不要使用`allowpopups`

*Electron的默认值即是建议值。*

如果您正在使用 [`<webview>`](../api/webview-tag.md) ，您可能需要页面和脚本加载进您的 `<webview>` 标签以打开新窗口。 开启`allowpopups`属性将使得[`BrowserWindows`](../api/browser-window.md)可以通过`window.open()`方法创建。 否则， `<webview>` 标签内不允许创建新窗口。

### 为什么？

如果你不需要弹窗，最好使用默认值以关闭新[`BrowserWindows`](../api/browser-window.md)的创建。 以下是最低的权限要求原则：若非必要，不要再网站中创建新窗口。

### 怎么做？

```html
<!-- 不推荐 -->
<webview allowpopups src="page.html"></webview>

<!-- 推荐 -->
<webview src="page.html"></webview>
```

## 11) 创建WebView前确认其选项

通过渲染进程创建的WebView是不开启Node.js集成的，且也不能由自身开启。 但是，WebView可以通过其`webPreferences`属性创建一个独立的渲染进程。

It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.

### 为什么？

Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron 可以让开发者关闭各种控制渲染进程的安全特性。 In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.

### 怎么做？

Before a [`<webview>`](../api/webview-tag.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. 利用这个事件来阻止可能含有不安全选项的 `webViews` 创建。

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

强调一下，这份列表只是将风险降到最低，并不会完全屏蔽风险。 如果您的目的是展示一个网站，浏览器将是一个更安全的选择。

## 12) Disable or limit navigation

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.

### 为什么？

Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.

### 怎么做？

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`](../api/web-contents.md#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://example.com')` test would let `https://example.com.attacker.com` through.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) 禁用或限制新窗口的创建

If you have a known set of windows, it's a good idea to limit the creation of additional windows in your app.

### 为什么？

Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.

### 怎么做？

[`webContents`](../api/web-contents.md) will emit the [`new-window`](../api/web-contents.md#event-new-window) event before creating new windows. That event will be passed, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you use the event to scrutinize the creation of windows, limiting it to only what you need.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', async (event, navigationUrl) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    event.preventDefault()

    await shell.openExternal(navigationUrl)
  })
})
```

## 14) Do not use `openExternal` with untrusted content

Shell's [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

### 为什么？

Improper use of [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) can be leveraged to compromise the user's host. When openExternal is used with untrusted content, it can be leveraged to execute arbitrary commands.

### 怎么做？

```js
//  Bad
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
//  Good
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Disable the `remote` module

The `remote` module provides a way for the renderer processes to access APIs normally only available in the main process. Using it, a renderer can invoke methods of a main process object without explicitly sending inter-process messages. If your desktop application does not run untrusted content, this can be a useful way to have your renderer processes access and work with modules that are only available to the main process, such as GUI-related modules (dialogs, menus, etc.).

However, if your app can run untrusted content and even if you [sandbox](../api/sandbox-option.md) your renderer processes accordingly, the `remote` module makes it easy for malicious code to escape the sandbox and have access to system resources via the higher privileges of the main process. Therefore, it should be disabled in such circumstances.

### 为什么？

`remote` uses an internal IPC channel to communicate with the main process. "Prototype pollution" attacks can grant malicious code access to the internal IPC channel, which can then be used to escape the sandbox by mimicking `remote` IPC messages and getting access to main process modules running with higher privileges.

Additionally, it's possible for preload scripts to accidentally leak modules to a sandboxed renderer. Leaking `remote` arms malicious code with a multitude of main process modules with which to perform an attack.

Disabling the `remote` module eliminates these attack vectors. Enabling context isolation also prevents the "prototype pollution" attacks from succeeding.

### 怎么做？

```js
// Bad if the renderer can run untrusted content
const mainWindow = new BrowserWindow({})
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- Bad if the renderer can run untrusted content  -->
<webview src="page.html"></webview>

<!-- Good -->
<webview enableremotemodule="false" src="page.html"></webview>
```

## 16) Filter the `remote` module

If you cannot disable the `remote` module, you should filter the globals, Node, and Electron modules (so-called built-ins) accessible via `remote` that your application does not require. This can be done by blocking certain modules entirely and by replacing others with proxies that expose only the functionality that your app needs.

### 为什么？

Due to the system access privileges of the main process, functionality provided by the main process modules may be dangerous in the hands of malicious code running in a compromised renderer process. By limiting the set of accessible modules to the minimum that your app needs and filtering out the others, you reduce the toolset that malicious code can use to attack the system.

Note that the safest option is to [fully disable the remote module](#15-disable-the-remote-module). If you choose to filter access rather than completely disable the module, you must be very careful to ensure that no escalation of privilege is possible through the modules you allow past the filter.

### 怎么做？

```js
const readOnlyFsProxy = require(/* ... */) // exposes only file read functionality

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()

app.on('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules.get(moduleName)
  }
  if (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals.has(globalName)) {
    event.preventDefault()
  }
})

app.on('remote-get-current-window', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})
```

## 17) 使用当前版本的 Electron

您应该努力使用最新的 Electron 版本。当新版本发布时，您应尽快更新您的应用。

### 为什么？

An application built with an older version of Electron, Chromium, and Node.js is an easier target than an application that is using more recent versions of those components. Generally speaking, security issues and exploits for older versions of Chromium and Node.js are more widely available.

Both Chromium and Node.js are impressive feats of engineering built by thousands of talented developers. Given their popularity, their security is carefully tested and analyzed by equally skilled security researchers. Many of those researchers [disclose vulnerabilities responsibly](https://en.wikipedia.org/wiki/Responsible_disclosure), which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. Your application will be more secure if it is running a recent version of Electron (and thus, Chromium and Node.js) for which potential security issues are not as widely known.