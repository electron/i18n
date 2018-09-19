# 安全性，原生能力和你的责任

Web开发人员通常享有浏览器强大的网络安全特性，而自己的代码风险相对较小。 我们的网站从沙箱获得有限权限。我们坚信用户可以享受一个大的工程师团队构建的浏览器，因为他们能够快速响应新发现的安全威胁。

当使用 Electron 时，很重要的一点是要理解 Electron 不是一个 Web 浏览器。 它允许您使用熟悉的 Web 技术构建功能丰富的桌面应用程序，但是您的代码具有更强大的功能。 JavaScript 可以访问文件系统，用户 shell 等。 这允许您构建更高质量的本机应用程序，但是内在的安全风险会随着授予您的代码的额外权力而增加。

考虑到这一点，请注意，展示任意来自不受信任源的内容都将会带来严重的安全风险，而这种风险Electron也没打算处理。 事实上，最流行的 Electron 应用程序(Atom，Slack，Visual Studio Code 等) 主要显示本地内容(即使有远程内容也是无 Node 的、受信任的、安全的内容) - 如果您的应用程序要运行在线的源代码，那么您需要确保源代码不是恶意的。

## 报告安全问题

有关如何正确上报 Electron 漏洞的信息，参阅 [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium 安全问题和升级

尽管 Electron 努力尽快支持新版本的 Chromium，但开发人员应该意识到，升级是一项严肃的工作 - 涉及手动编辑几十个甚至几百个文件。 受限于当前可用的资源与贡献，Electron 通常不能保持使用最新版本的 Chromium，可能落后几周或几个月。

我们认为，我们当前的更新 Chromium 组件的系统在我们可用的资源和构建在框架之上的大多数应用程序的需求之间取得了适当的平衡。 我们绝对有兴趣听听更多关于在 Electron 上构建事物的人的具体用例。 非常欢迎提出请求并且捐助支持我们的努力。

## 除了以上建议

每当您从远程目标收到代码并在本地执行它时，就会存在安全问题。 例如在[`BrowserWindow`](../api/browser-window.md)中显示一个远程网站. 如果攻击者有办法改变网站的内容(可能是直接攻击来源，也可能是作为你的应用和真实服务器的中间人)，他们就可以在用户的机器上执行原生代码。

> :warning:无论如何，在启用Node.js集成的情况下，你都不该加载并执行远程代码。 相反，只使用本地文件（和您的应用打包在一起）来执行Node.js代码 要显示远程内容，请使用 [`<webview>`](../api/webview-tag.md) 标签并确保禁用了 `nodeIntegration `。

## Electron 安全警告

从Electron 2.0版本开始，开发者将会在开发者控制台看到打印的警告和建议。 这些警告仅在可执行文件名为 Electron 时才会为开发者显示。

你可以通过在`process.env` 或 `window`对象上配置`ELECTRON_ENABLE_SECURITY_WARNINGS` 或`ELECTRON_DISABLE_SECURITY_WARNINGS`来强制开启或关闭这些警告。

## 清单：安全建议

这并不能完美的防御黑客的攻击，但至少，你应该遵循以下步骤来提升项目的安全性

1. [只加载安全的内容](#1-only-load-secure-content)
2. [禁止在所有渲染器中使用Node.js集成显示远程内容](#2-disable-nodejs-integration-for-remote-content)
3. [做所有显示远程内容的渲染器中启用上下文隔离。](#3-enable-context-isolation-for-remote-content)
4. [在所有加载远程内容的会话中使用 `ses.setPermissionRequestHandler()`.](#4-handle-session-permission-requests-from-remote-content)
5. [不要禁用 ` webSecurity `](#5-do-not-disable-websecurity)
6. [定义一个`Content-Security-Policy`](#6-define-a-content-security-policy)并设置限制规则(如：`script-src 'self'`)
7. [通过重写禁用`eval`](#7-override-and-disable-eval)，防止通过字符串执行代码。
8. [不要设置 ` allowRunningInsecureContent ` 为 true.](#8-do-not-set-allowrunninginsecurecontent-to-true)
9. [不要开启实验性功能](#9-do-not-enable-experimental-features)
10. [不要使用`enableBlinkFeatures`](#10-do-not-use-enableblinkfeatures)
11. [`<webview>`：不要使用 `allowpopups `](#11-do-not-use-allowpopups)
12. [`<webview>`：验证选项与参数](#12-verify-webview-options-before-creation)
13. [禁用或限制网页跳转](#13-disable-or-limit-navigation)
14. [禁用或限制新窗口创建](#14-disable-or-limit-creation-of-new-windows)

## 1) 仅加载安全内容

任何不属于你的应用的资源都应该使用像`HTTPS`这样的安全协议来加载。 换言之， 不要使用不安全的协议 （如 ` HTTP `）。 同理，我们建议使用`WSS`，避免使用`WS`，建议使用`FTPS` ，避免使用`FTP`，等等诸如此类的协议。

### 为什么？

` HTTPS ` 有三个主要好处：

1) 它对远程服务器进行身份验证, 确保您的应用程序连接到正确的主机而不是模仿器。 2) 确保数据完整性, 断言数据在应用程序和主机之间传输时未被修改。 3) 它对用户和目标主机之间的通信进行加密, 从而更难窃听应用程序和主机之间发送的信息。

### 怎么做？

```js
// 不推荐
browserWindow.loadURL ('http://my-website.com')
// 推荐 
browserWindow.loadURL ('https://my-website.com')
```

```html
<!-- 不推荐 -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- 推荐 -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) 禁止Node.js集成远程内容

加载远程内容时，不论是使用[`BrowserWindow`](../api/browser-window.md)，[`BrowserView`](../api/browser-view.md) 还是 [`<webview>`](../api/webview-tag.md)，首要任务都是禁用 Node.js 集成。 其目的是限制您授予远程内容的权限, 从而使攻击者在您的网站上执行 JavaScript 时更难伤害您的用户。

在此之后，你可以为指定的主机授予附加权限。 举例来说，如果你正在打开一个指向 "https://my-website.com/" 的 BrowserWindow，你可以给它正好所需的权限，无需再多。

### 为什么？

如果攻击者跳过渲染进程并在用户电脑上执行恶意代码，那么这种跨站脚本(XSS) 攻击的危害是非常大的。 跨站脚本攻击很常见，通常情况下，威力仅限于执行代码的网站。 禁用Node.js集成有助于防止XSS攻击升级为“远程代码执行” (RCE) 攻击。

### 怎么做？

```js
// 不推荐
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// 推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
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

### 为什么？

上下文隔离使得每个运行在渲染器上的脚本无需担心改变JavaScript环境变量而与ElectronAPI或预加载脚本发生冲突。

做为一个仍为实验性质的Electron特性，内容隔离为安全性多加了一层保障。它为Electron API和预加载脚本创造了一个崭新的JavaScript世界。

同时，预加载脚本依然能访问`document`和`window`对象。换个角度，就像你以很小的投入却得到双倍回报一样。

### 怎么做？

```js
// 主进程
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
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
      // 通过许可请求
      callback(true)
    }

    if (!url.startsWith('https://my-website.com')) {
      // 拒绝许可请求
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

CSP允许Electron通过服务端内容对指定页面的资源加载进行约束与控制。 如果你定义`https://your-page.com`这个源，所属这个源的脚本都允许被加载，反之`https://evil.attacker.com`不会被允许加载运行。 对于提升你的应用安全性，设置CSP是个很方便的办法。

下面的CSP设置使得Electron只能执行自身站点和来自`apis.mydomain.com`的脚本。

```txt
// 不推荐
Content-Security-Policy: '*'

// 推荐
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

### CSP HTTP头

Electron 会处理 [`Content-Security-Policy` HTTP 标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)，它可以在 [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) 中进行设置：

```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({ responseHeaders: `default-src 'none'` })
})
```

### CSP元标签

CSP 建议的传送机制是通过 HTTP 标头。但也可以在页面上直接使用 `<meta>` 标签来设置内容安全策略：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

#### `webRequest.onHeadersReceived([filter, ]listener)`

## 7) 通过重写禁用`eval`

`eval()` 是JavaScript的一个核心方法，它允许通过字符串直接执行JavaScript。禁用它相当于禁止你的应用执行不可知的JavaScript代码。

### 为什么？

`eval()`的功能很明确： 将一系列字符串转化为JavaScript代码并执行。 不管你是否想转换执行那些未知代码，这个函数都是存在的。 就像其他代码生成器一样，`eval()`很难分辨哪些调用是合法的。

通常来说，完全禁用`eval()`比各处设防要更容易。所以，如果你不是特别需要，禁用它是个不错的办法。

### 怎么做？

```js
// ESLint 对任何形式的 eval() 引用都会产生警告，甚至包括以下代码
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## 8) 不要设置`allowRunningInsecureContent`为`true`

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

## 9) 不要开启实验室特性

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

## 10) 不要使用`enableBlinkFeatures`

*Electron的默认值即是建议值。*

Blink是Chromium里的渲染引擎名称。 就像`experimentalFeatures`一样，`enableBlinkFeatures`属性将使开发者启用被默认禁用的特性。

### 为什么？

通常来说，某个特性默认不被开启肯定有其合理的原因。 针对特定特性的合理使用场景是存在的。 作为开发者，你应该非常明白你为何要开启它，有什么后果，以及对你应用安全性的影响。 在任何情况下都不应该推测性的开启特性。

### 怎么做？

```js
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// 推荐
const mainWindow = new BrowserWindow()
```

## 11) 不要使用`allowpopups`

*Electron的默认值即是建议值。*

If you are using [`<webview>`](../api/webview-tag.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. 开启`allowpopups`属性将使得[`BrowserWindows`](../api/browser-window.md)可以通过`window.open()`方法创建。 `<webview>` tags are otherwise not allowed to create new windows.

### 为什么？

如果你不需要弹窗，最好使用默认值以关闭新[`BrowserWindows`](../api/browser-window.md)的创建。 以下是最低的权限要求原则：若非必要，不要再网站中创建新窗口。

### 怎么做？

```html
<!-- 不推荐 -->
<webview allowpopups src="page.html"></webview>

<!-- 推荐 -->
<webview src="page.html"></webview>
```

## 12) 创建WebView前确认其选项

通过渲染进程创建的WebView是不开启Node.js集成的，且也不能由自身开启。 但是，WebView可以通过其`webPreferences`属性创建一个独立的渲染进程。

It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.

### 为什么？

Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron 可以让开发者关闭各种控制渲染进程的安全特性。 In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.

### 怎么做？

Before a [`<webview>`](../api/webview-tag.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

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

强调一下，这份列表只是将风险降到最低，并不会完全屏蔽风险。 如果您的目的是展示一个网站，浏览器将是一个更安全的选择。

## 13) Disable or limit navigation

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.

### 为什么？

Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.

### 怎么做？

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`](../api/web-contents.md#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://google.com')` test would let `https://google.com.attacker.com` through.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://my-own-server.com') {
      event.preventDefault()
    }
  })
})
```

## 14) Disable or limit creation of new windows

If you have a known set of windows, it's a good idea to limit the creation of additional windows in your app.

### 为什么？

Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.

### 怎么做？

[`webContents`](../api/web-contents.md) will emit the [`new-window`](../api/web-contents.md#event-new-window) event before creating new windows. That event will be passed, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you use the event to scrutinize the creation of windows, limiting it to only what you need.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    event.preventDefault()

    shell.openExternal(navigationUrl)
  })
})
```