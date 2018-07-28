# 安全性，原生能力和你的责任

作为 web 开发人员，我们通常喜欢网络安全性更强大的浏览器 - 与我们编写的代码相关的风险相对较小。 我们的网站在沙箱中获得有限的权限，我们相信我们的用户可以享受由大量工程师团队构建的浏览器，能够快速响应新发现的安全威胁。

当使用 Electron 时，很重要的一点是要理解 Electron 不是一个 Web 浏览器。 它允许您使用熟悉的 Web 技术构建功能丰富的桌面应用程序，但是您的代码具有更强大的功能。 JavaScript 可以访问文件系统，用户 shell 等。 这允许您构建更高质量的本机应用程序，但是内在的安全风险会随着授予您的代码的额外权力而增加。

考虑到这一点，请注意，展示任意来自不受信任源的内容都将会带来严重的安全风险，而这种风险Electron也没打算处理。 事实上，最流行的 Electron 应用程序(Atom，Slack，Visual Studio Code 等) 主要显示本地内容(或没有 Node 集成的可信安全远程内容) - 如果您的应用程序从在线源执行代码，那么您有责任确保代码不是恶意的。

## 报告安全问题

有关如何正确上报 Electron 漏洞的信息，参阅 [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium 安全问题和升级

尽管 Electron 努力尽快支持新版本的 Chromium，但开发人员应该意识到，升级是一项严肃的工作 - 涉及手动编辑几十个甚至几百个文件。 考虑到当前的资源和贡献，Electron 通常不会是最新版本的 Chromium，总是落后于一两天或几周。

我们认为，我们当前的更新 Chromium 组件的系统在我们可用的资源和构建在框架之上的大多数应用程序的需求之间取得了适当的平衡。 我们绝对有兴趣听听更多关于在 Electron 上构建事物的人的具体用例。 非常欢迎提出请求并且捐助支持我们的努力。

## 除了以上建议

每当您从远程目标收到代码并在本地执行它时，就会存在安全问题。 例如在[`BrowserWindow`](../api/browser-window.md)中显示一个远程网站. 如果攻击者有办法改变网站的内容(可能是直接攻击来源，也可能是作为你的应用和真实服务器的中间人)，他们就可以在用户的机器上执行原生代码。

> :warning:无论如何，在启用Node.js集成的情况下，你都不该加载并执行远程代码。 相反，只使用本地文件（和您的应用打包在一起）来执行Node.js代码 要显示远程内容, 请使用 [` web 视图 `](../api/web-view.md) 标记, 并确保禁用 ` nodeIntegration `。

## Electron 安全警告

从Electron 2.0版本开始，开发者将会在开发者控制台看到打印的警告和建议。 当你正在查看控制台时，二进制名为Electron的警告才会出现

你可以通过在`process.env` 或 `window`对象上配置`ELECTRON_ENABLE_SECURITY_WARNINGS` 或`ELECTRON_DISABLE_SECURITY_WARNINGS`来强制开启或关闭这些警告。

## 清单：安全建议

这并不能完美的防御黑客的攻击，但至少，你应该遵循以下步骤来提升项目的安全性

1. [只加载安全的内容](#1-only-load-secure-content)
2. [禁止在所有渲染器中使用Node.js集成显示远程内容](#2-disable-nodejs-integration-for-remote-content)
3. [Enable context isolation in all renderers that display remote content](#3-enable-context-isolation-for-remote-content)
4. [在所有加载远程内容的会话中使用 `ses.setPermissionRequestHandler()`.](#4-handle-session-permission-requests-from-remote-content)
5. [不要禁用 ` webSecurity `](#5-do-not-disable-websecurity)
6. [定义一个`Content-Security-Policy`](#6-define-a-content-security-policy)并设置限制规则(如：`script-src 'self'`)
7. [通过重写禁用`eval`](#7-override-and-disable-eval)，防止通过字符串执行代码。
8. [不要设置 ` allowRunningInsecureContent ` 为 true.](#8-do-not-set-allowrunninginsecurecontent-to-true)
9. [不要开启实验性功能](#9-do-not-enable-experimental-features)
10. [不要使用`enableBlinkFeatures`](#10-do-not-use-enableblinkfeatures)
11. [WebViews: 不要使用 `allowpopups`](#11-do-not-use-allowpopups)
12. [WebViews: 验证所有 `<webview>` 标记的选项和参数](#12-verify-webview-options-before-creation)

## 1) 仅加载安全内容

应使用像 ` HTTPS ` 这样的安全协议加载应用程序中不包含的任何资源。 换言之， 不要使用不安全的协议 （如 ` HTTP `）。 同理，我们建议使用`WSS`，避免使用`WS`，建议使用`FTPS` ，避免使用`FTP`，等等诸如此类的协议。

### 为什么？

` HTTPS ` 有三个主要好处：

1) 它对远程服务器进行身份验证, 确保您的应用程序连接到正确的主机而不是模仿器。 2) 确保数据完整性, 断言数据在应用程序和主机之间传输时未被修改。 3) 它对用户和目标主机之间的通信进行加密, 从而更难窃听应用程序和主机之间发送的信息。

### 怎么做？

```js
// 不推荐
browserWindow loadURL (' http://我的网站. com ')
// 推荐 
browserWindow. loadURL (' https://我的网站. com ')
```

```html
<!-- Bad -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- Good -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) 禁止Node.js集成远程内容

在各种渲染器 ([`BrowserWindow`](../api/browser-window.md)、[`BrowserView`](../api/browser-view.md)、或 [`WebView`](../api/web-view.md)) 中禁止Node.js集成远程内容是极为重要的。 其目的是限制您授予远程内容的权限, 从而使攻击者在您的网站上执行 JavaScript 时更难伤害您的用户。

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

## 4) 处理来自远程内容的会话许可请求

当你使用Chromes时，也许见过许可请求：每当网站尝试使用某个特性时，就会弹出让用户手动确认(如网站通知)

此API基于[Chromium permissions API](https://developer.chrome.com/extensions/permissions)，并已实现对应的许可类型。

### 为什么？

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

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

*Electron的默认值就是建议值。*

你也需已经猜到在渲染进程([`BrowserWindow`](../api/browser-window.md)，[`BrowserView`](../api/browser-view.md)，[`WebView`](../api/web-view.md)) 禁用`webSecurity`属性相当于禁用了至关重要的安全特性。

不要再生产环境中禁用`webSecurity`

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

CSP允许Electron通过服务端内容对指定页面的资源加载进行约束与控制。 如果你定义`https://your-page.com`这个源，所属这个源的脚本都允许被加载，反之`https://evil.attacker.com`不会被允许加载运行。 Defining a CSP is an easy way to improve your application's security.

The following CSP will allow Electron to execute scripts from the current website and from `apis.mydomain.com`.

```txt
// 不推荐
Content-Security-Policy: '*'

// 推荐
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

### CSP HTTP Header

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const {session} = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({responseHeaders: `default-src 'none'`})
})
```

### CSP Meta Tag

CSP's preferred delivery mechanism is an HTTP header. It can be useful, however, to set a policy on a page directly in the markup using a `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

#### `webRequest.onHeadersReceived([filter, ]listener)`

## 7) Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### 为什么？

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### 怎么做？

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## 8) Do Not Set `allowRunningInsecureContent` to `true`

*Electron的默认值就是建议值。*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### 为什么？

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

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

## 9) Do Not Enable Experimental Features

*Electron的默认值就是建议值。*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` and `experimentalCanvasFeatures` properties.

### 为什么？

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### 怎么做？

```js
// Bad
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

## 10) Do Not Use `enableBlinkFeatures`

*Electron的默认值就是建议值。*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### 为什么？

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

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

## 11) Do Not Use `allowpopups`

*Electron的默认值就是建议值。*

If you are using [`WebViews`](../api/web-view.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### 为什么？

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](../api/browser-window.md) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### 怎么做？

```html
<!-- 不推荐 -->
<webview allowpopups src="page.html"></webview>

<!-- 推荐 -->
<webview src="page.html"></webview>
```

## 12) Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](../api/web-view.md) from the main process and to verify that their webPreferences do not disable security features.

### 为什么？

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](../api/web-view.md) tags.

### 怎么做？

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

强调一下，这份列表只是将风险降到最低，并不会完全屏蔽风险。 如果您的目的是展示一个网站，浏览器将是一个更安全的选择。