# 安全性，原生能力和你的责任

Web开发人员通常享有浏览器强大的网络安全特性，而自己的代码风险相对较小。 Our websites are granted limited powers in a sandbox, and we trust that our users enjoy a browser built by a large team of engineers that is able to quickly respond to newly discovered security threats.

当使用 Electron 时，很重要的一点是要理解 Electron 不是一个 Web 浏览器。 它允许您使用熟悉的 Web 技术构建功能丰富的桌面应用程序，但是您的代码具有更强大的功能。 JavaScript 可以访问文件系统，用户 shell 等。 这允许您构建更高质量的本机应用程序，但是内在的安全风险会随着授予您的代码的额外权力而增加。

考虑到这一点，请注意，展示任意来自不受信任源的内容都将会带来严重的安全风险，而这种风险Electron也没打算处理。 事实上，最流行的 Electron 应用程序(Atom，Slack，Visual Studio Code 等) 主要显示本地内容(即使有远程内容也是无 Node 的、受信任的、安全的内容) - 如果您的应用程序要运行在线的源代码，那么您需要确保源代码不是恶意的。

## 报告安全问题

有关如何正确上报 Electron 漏洞的信息，参阅 [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium 安全问题和升级

Electron随时更新交替释放Chromium。 欲了解更多信息， 请查看 [Electron 发布博客](https://electronjs.org/blog/12-week-cadence)。

## 安全是所有人的共同责任

需要牢记的是，你的 Electron 程序安全性除了依赖于整个框架基础（*Chromium*、*Node.js*）、Electron 本身和所有相关 NPM 库的安全性，还依赖于你自己的代码安全性。 因此，你有责任遵循下列安全守则：

* **使用最新版的 Electron 框架搭建你的程序。**你最终发行的产品中会包含 Electron、Chromium 共享库和 Node.js 的组件。 这些组件存在的安全问题也可能影响你的程序安全性。 你可以通过更新Electron到最新版本来确保像是*nodeIntegration绕过攻击*一类的严重漏洞已经被修复因而不会影响到你的程序。 请参阅“[使用当前版本的Electron](#17-use-a-current-version-of-electron)”以获取更多信息。

* **评估你的依赖项目**NPM提供了五百万可重用的软件包，而你应当承担起选择可信任的第三方库。 如果你使用了受已知漏洞的过时的库，或是依赖于维护的很糟糕的代码，你的程序安全就可能面临威胁。

* **遵循安全编码实践**你的代码是你的程序安全的第一道防线。 一般的网络漏洞，例如跨站脚本攻击(Cross-Site Scripting, XSS)，对Electron将造成更大的影响，因此非常建议你遵循安全软件开发最佳实践并进行安全性测试。


## 隔离不信任的内容

每当你从不被信任的来源(如一个远程服务器)获取代码并在本地执行，其中就存在安全性问题。 例如在默认的 [`BrowserWindow`][browser-window]中显示一个远程网站. 如果攻击者以某种方式设法改变所述内容 (通过直接攻击源或者通过在应用和实际目的地之间进行攻击) ，他们将能够在用户的机器上执行本地代码。

> :warning:无论如何，在启用Node.js集成的情况下，你都不该加载并执行远程代码。 相反，只使用本地文件（和您的应用打包在一起）来执行Node.js代码 如果你想要显示远程内容，请使用 [`<webview>`][webview-tag] Tag或者 [`BrowserView`][browser-view]，并确保禁用 `nodeIntegration` 并启用 `contextIsolation`

## Electron 安全警告

从Electron 2.0版本开始，开发者将会在开发者控制台看到打印的警告和建议。 这些警告仅在可执行文件名为 Electron 时才会为开发者显示。

你可以通过在`process.env` 或 `window`对象上配置`ELECTRON_ENABLE_SECURITY_WARNINGS` 或`ELECTRON_DISABLE_SECURITY_WARNINGS`来强制开启或关闭这些警告。

## 清单：安全建议

为加强程序安全性，你至少应当遵循下列规则：

1. [只加载安全的内容](#1-only-load-secure-content)
2. [禁止在所有渲染器中使用Node.js集成显示远程内容](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [在所有显示远程内容的渲染器中启用上下文隔离。](#3-enable-context-isolation-for-remote-content)
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

如果你想要自动检测错误的配置或是不安全的模式，可以使用[electronegativity](https://github.com/doyensec/electronegativity) 关于在使用Electron进行应用程序开发中的潜在薄弱点或者bug，您可以参考[开发者与审核人员指南](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

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

```html<!-- 不推荐 --><script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css"><!-- 推荐 --><script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```


## 2) 不要为远程内容启用 Node.js 集成

_此建议是 Electron 从 5.0.0 开始的默认行为。_

加载远程内容时，不论使用的是哪一种渲染器（[`BrowserWindow`][browser-window]，[`BrowserView`][browser-view] 或者 [`<webview>`][webview-tag]），最重要的就是绝对不要启用 Node.js 集成。 其目的是限制您授予远程内容的权限, 从而使攻击者在您的网站上执行 JavaScript 时更难伤害您的用户。

在此之后，你可以为指定的主机授予附加权限。 举例来说，如果你正在打开一个指向 `https://example.com/` 的 BrowserWindow，那么你可以给他刚刚好足够的权限，但是绝对不要超出这个范围。

### 为什么？

如果攻击者跳过渲染进程并在用户电脑上执行恶意代码，那么这种跨站脚本(XSS) 攻击的危害是非常大的。 跨站脚本攻击很常见，通常情况下，威力仅限于执行代码的网站。 禁用Node.js集成有助于防止XSS攻击升级为“远程代码执行” (RCE) 攻击。

### 怎么做？

```js
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// 推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html<!-- 不推荐 --><webview nodeIntegration src="page.html"></webview><!-- 推荐 --><webview src="page.html"></webview>
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

即使您使用选项 `nodeIntegration: false` 进行强制隔离并防止其使用Node原语，`contextIsolation` 也必须被启用。

### 为什么 & 如何?

欲了解更多关于 `上下文隔离` 以及如何启用它的信息，请 查看我们专用的 [上下文隔离](context-isolation.md) 文档。


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

    // Verify URL
    if (!url.startsWith('https://example.com/')) {
      // 拒绝许可请求
      return callback(false)
    }
  })
```


## 5) 不要禁用WebSecurity

_Electron的默认值即是建议值。_

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) disables crucial security features.

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

```html<!-- 不推荐 --><webview disablewebsecurity src="page.html"></webview><!-- 推荐 --><webview src="page.html"></webview>
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


## 7) 不要设置`allowRunningInsecureContent`为`true`

_Electron的默认值即是建议值。_

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

_Electron的默认值即是建议值。_

Electron 的熟练用户可以通过 ` experimentalFeatures` 属性来启用 Chromium 实验性功能。

### 为什么？

如名称所示，实验性功能是实验性的，尚未对所有 Chromium 用户启用。 此外，它们对整个 Electron 的影响很可能没有经过测试。

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

_Electron的默认值即是建议值。_

Blink是Chromium里的渲染引擎名称。 就像`experimentalFeatures`一样，`enableBlinkFeatures`属性将使开发者启用被默认禁用的特性。

### 为什么？

通常来说，某个特性默认不被开启肯定有其合理的原因。 针对特定特性的合理使用场景是存在的。 作为开发者，你应该非常明白你为何要开启它，有什么后果，以及对你应用安全性的影响。 在任何情况下都不应该推测性的开启特性。

### 怎么做？
```js
// 不推荐
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

_Electron的默认值即是建议值。_

如果您正在使用 [`<webview>`][webview-tag] ，您可能需要页面和脚本加载进您的 `<webview>` 标签以打开新窗口。 The `allowpopups` attribute enables them to create new [`BrowserWindows`][browser-window] using the `window.open()` method. 否则， `<webview>` 标签内不允许创建新窗口。

### 为什么？

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`][browser-window] by default. 以下是最低的权限要求原则：若非必要，不要再网站中创建新窗口。

### 怎么做？

```html<!-- 不推荐 --><webview allowpopups src="page.html"></webview><!-- 推荐 --><webview src="page.html"></webview>
```


## 11) 创建WebView前确认其选项

通过渲染进程创建的WebView是不开启Node.js集成的，且也不能由自身开启。 但是，WebView可以通过其`webPreferences`属性创建一个独立的渲染进程。

It is a good idea to control the creation of new [`<webview>`][webview-tag] tags from the main process and to verify that their webPreferences do not disable security features.

### 为什么？

从 `<webview>` 生活在DOM中 即使是节点也可以通过运行在您的 网站上的脚本创建它们。 s 集成被禁用。

Electron 可以让开发者关闭各种控制渲染进程的安全特性。 通常情况下，开发者并不需要关闭他们中的任何一种 - 因此你不应该允许创建不同配置的[`<webview>`][webview-tag]标签

### 怎么做？

在 [`<webview>`][webview-tag]标签生效前，Electron将产生一个`will-attach-webview`事件到`webContents`中。 利用这个事件来阻止可能含有不安全选项的 `webViews` 创建。

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

不过，这个清单只是将风险降低到最低限度，但没有将其消除。 如果您的目标是展示一个网站，浏览器将是一个更安全的选择。

## 12) 禁用或限制导航

如果您的应用不需要导航或只需要导航到已知的页面， 将导航直接限制在已知范围内是一个好主意，将不允许 其他类型的导航。

### 为什么？

导航是一个常见的攻击矢量。 如果攻击者可以说服你的应用走出当前页面 他们可能会迫使您的应用在互联网上打开 个网站。 即使您的 `webcontent` 被配置为更多的 安全性(类似于 `节点集成` 已禁用或 `上下文隔离` 已启用)， 让您的应用打开一个随机的网站将使开发您的 应用的工作更加容易。

一种常见的攻击模式是，攻击者让你的应用用户相信你的应用可以与应用程序交互 ，它可以导航到攻击者的一个 页面。 这通常是通过链接、插件或其他用户生成的内容来完成。

### 怎么做？

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`][will-navigate] handler. 如果您知道您的应用程序 可能导航到的页面 在事件处理程序中检查URL，并且只允许导航 与您想要的URL匹配。

我们建议您使用 Node的 URL 解析器。 Simple string comparisons can sometimes be fooled - a `startsWith('https://example.com')` test would let `https://example.com.attacker.com` through.

```js
const URL = require('url').URL

app.on('web-contents-created', (evidences, contents) => format@@
  contents. n('will-navigate', (event, navigationUrl) => }
    const parsedUrl = new URL(navigationUrl)

    if (aparsedUrl) rigin !== 'https://example.com') *
      event.preventDefault()
    }
  }
})
```

## 13) 禁用或限制新窗口的创建

如果您有一组已知的窗口，最好是在您的应用程序中限制 个附加窗口的创建。

### 为什么？

就像导航一样，新的 `webContent` 是一个常见的攻击 矢量。 攻击者试图说服您的应用创建新的窗口、框架、 或其他渲染过程，拥有比以前更多的权限； 或 打开之前无法打开的页面。

如果您除了知道您需要创建窗口之外不需要创建窗口， 需要创建窗口， 禁用创建将免费购买额外的 安全性。 对于打开一个 `Browserwindow` 并且不需要在运行时打开任意数量的 窗口的应用来说，情况通常如此。

### 怎么做？

[`webContents`][web-contents] will emit the [`new-window`][new-window] event before creating new windows. 该事件将会通过，其中包括 个参数， `url` 请求打开窗口和用于 创建它的选项。 我们建议您使用该事件来检查 窗口的创建，将其限制在您需要的范围内。

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', async (event, navigationUrl) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    event.preventDefault()

    等待 shell.openExternal(navigationUrl)
  })
})
```

## 14) 不要使用含有不可信任内容的 `openExterne`

Shell's [`openExternal`][open-external] allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

### 为什么？

Improper use of [`openExternal`][open-external] can be leveraged to compromise the user's host. 当OpenExtern使用内容不受信任时，它可以使用 来执行任意命令。

### 怎么做？

```js
// 错误
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```
```js
/ 好
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) 禁用 `远程` 模块

`远程` 模块为渲染器访问 的 API 提供了一种途径，通常只能在主流程中使用。 使用 渲染器可以调用一个主进程对象的方法，而不会明确发送 进程间信息。 如果您的桌面应用程序没有运行不信任的 内容 这可以是一个有用的方式，让您的渲染器进程访问和 只适用于主进程的模块。 例如： GUI相关模块(对话框、菜单等)。

However, if your app can run untrusted content and even if you [sandbox][sandbox] your renderer processes accordingly, the `remote` module makes it easy for malicious code to escape the sandbox and have access to system resources via the higher privileges of the main process. 因此， 应该在这种情况下禁用。

### 为什么？

`远程` 使用内部IPC 通道与主进程进行通信。 “原型污染”攻击可以让恶意代码访问内部 IPC 通道， 然后可以通过模仿 `远程`来逃避沙盒。 IPC 消息并访问运行更高的 权限的主要流程模块。

此外，预加载脚本可能意外泄露模块到 沙盒渲染器。 跳跃 `遥控` 武器恶意代码，包含大量 的主进程模块来进行攻击。

禁用 `remote` 模块会消除这些攻击向量。 启用上下文隔离也会阻止 “prototype pollution” 攻击成功。

### 怎么做？

```js
// 如果渲染器可以运行不信任的内容
const mainwindow = 新的 BrowserWindow({})
```

```js
// 良好
const mainwindow = new BrowserWindow(
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<！-- 如果渲染器能够运行不可信任的内容错误-->
<webview src="page.html"></webview><!-- 良好--><webview enableremotemodule="false" src="page.html"></webview>
```

## 16) 筛选 `远程` 模块

如果您不能禁用 `远程` 模块，您应该筛选全局， 节点， 和 Electron 模块 (所谓内置) 可以通过 `远程` 访问您的应用程序不需要的。 This can be done by blocking certain modules entirely and by replacing others with proxies that expose only the functionality that your app needs.

### 为什么？

由于主要过程的系统访问权限， 主流程模块提供的功能 可能在渲染过程中运行的 恶意代码手中具有危险性。 限制您的应用程序所需的 套可访问的模块以及 过滤其他模块。 您可以减少恶意代码 用于攻击系统的工具集。

请注意，最安全的选项是 [完全禁用远程模块](#15-disable-the-remote-module)。 If you choose to filter access rather than completely disable the module, you must be very careful to ensure that no escalation of privilege is possible through the modules you allow past the filter.

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

您应该努力始终使用最新版本的 Electron。 每当发布新的主要版本时，您应该尝试尽快更新您的应用。

### 为什么？

使用旧版本Electron、Chromium和节点构建的应用程序。 s 比使用较新版本的 这些组件的应用程序更容易成为目标。 一般来说，较旧的 版本的 Chromium 和 Node.js 的安全问题和开发范围更广。

Chromium和Node.js都是 数千名有才华的开发者建造的令人印象深刻的工程精英。 Given their popularity, their security is carefully tested and analyzed by equally skilled security researchers. Many of those researchers [disclose vulnerabilities responsibly][responsible-disclosure], which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. 如果 运行最新版本的 Electron (因而，Chromium 和 Node)，您的应用程序将更加安全。 对于那些潜在的安全问题不那么广为人知的 来说也是如此。


[browser-window]: ../api/browser-window.md


[browser-window]: ../api/browser-window.md
[browser-view]: ../api/browser-view.md
[webview-tag]: ../api/webview-tag.md
[web-contents]: ../api/web-contents.md
[new-window]: ../api/web-contents.md#event-new-window
[will-navigate]: ../api/web-contents.md#event-will-navigate
[open-external]: ../api/shell.md#shellopenexternalurl-options-callback
[sandbox]: ../api/sandbox-option.md
[responsible-disclosure]: https://en.wikipedia.org/wiki/Responsible_disclosure
