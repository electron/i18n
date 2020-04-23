# `sandbox` 沙盒选项

> Create a browser window with a sandboxed renderer. 在该模式可用情况下，渲染器为了使用node APIs必须通过IPC与主进程通讯。

Chromium主要的安全特征之一便是所有的blink渲染或者JavaScript代码都在sandbox内运行。 该sandbox使用OS特定特征来保障运行在渲染器内的进程不会损害系统。

也就是说，在sandbox模式下，渲染器只能通过IPC委派任务给主进程来对操作系统进行更改。 [下述](https://www.chromium.org/developers/design-documents/sandbox)是有关sandbox更多的信息。

Electron的一个主要特性就是能在渲染进程中运行Node.js（使用web技术能让我们更加便捷的构建一个桌面应用），但是在渲染进程中沙箱是不可用的。 这是因为大多数Node.js 的API都需要系统权限。 比如 ，没有文件系统权限的情况下`require()`是不可用的，而该文件系统权限在沙箱环境下是不可用的。

通常，对于桌面应用来说这些都不是问题，因为应用的代码都是可信的；但是显示一些不是那么受信任的网站会使得Electron相比Chromium而言安全性下降。 因为应用程序需要更多的安全性，`sandbox` 标记将使electron产生一个与沙箱兼容的经典chromium渲染器。

一个沙箱环境下的渲染器没有node.js运行环境，并且不会将Node.js 的 JavaScript APIs 暴露给客户端代码。 唯一的例外是预加载脚本, 它可以访问electron渲染器 API 的一个子集(subset)。

另一个区别是沙箱渲染器不修改任何默认的 JavaScript API。 因此, 某些 api ，（比如 `window.open`）将像在chromium中一样工作 (即它们不返回

 BrowserWindowProxy `)。</p>

<h2 spaces-before="0">示例</h2>

<p spaces-before="0">创建沙盒窗口, 只需将 <code> sandbox: true ` 传递到 ` webPreferences `:</p> 



```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```


以上代码中被创建的[`BrowserWindow`](browser-window.md)禁用了node.js，并且只能使用IPC通信。 这个选项的设置阻止electron在渲染器中创建一个node.js运行环境。 同时，在这个新窗口内`window.open`将按原生方式工作（默认情况下electron会创建一个[`BrowserWindow`](browser-window.md)并通过`window.open`向它返回一个代理）

[`app.enableSandbox`](app.md#appenablesandbox-experimental) can be used to force `sandbox: true` for all `BrowserWindow` instances.



```js
let win
app.enableSandbox()
app.on('ready', () => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```




## 预加载

An app can make customizations to sandboxed renderers using a preload script. Here's an example:



```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```


和 preload.js:



```js
// 一旦javascript上下文创建，这个文件就会被自动加载 它在一个
//私有环境内运行, 可以访问 electron 渲染器的 api的子集 。 我们必须小心, 
//不要泄漏任何对象到全局范围!
const { ipcRenderer, remote } = require('electron')
const fs = remote.require('fs')

// read a configuration file using the `fs` module
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```


在预加载脚本中要注意的重要事项:

- 尽管沙盒渲染器没有运行 node. js, 但它仍然可以访问受限制的类似于节点的环境: ` Buffer `、` process `、` setImmediate ` 和 ` require ` 这些依然可用可用。

- 预加载脚本可以通过 ` remote ` 和 ` ipcRenderer ` 模块间接访问主进程中的所有 api。

- 预加载脚本必须包含在单个脚本中, 但可以使用像 browserify 这样的工具, 将多个模块组成复杂的预加载代码, 如下所述。 事实上, electron用browserify来提供一个类Node环境以便于预加载脚本。

要创建 browserify 包并将其用作预加载脚本, 应使用类似下面的内容:



```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```


`-x ` 标志应该和已经在预加载作用域中公开的所有引用到的模块一起使用, 并通知 browserify 使用封闭的 ` require ` 函数。 `--insert-global-vars ` 将确保 ` process `、` Buffer ` 和 ` setImmediate ` 也从封闭作用域 (通常 browserify 为这些代码注入代码) 中获取。

当前预加载作用域中提供的 ` require ` 函数公开了以下模块:

- `electron` 
    - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `remote`
  - `webFrame`
- `事件`
- `timers`
- `url`

可以根据需要添加更多的electron api 以在沙箱中使用, 但主进程中的任何模块都可以通过 ` electron.remote.require ` 使用。



## 状态

请小心使用`sandbox`选项，它仍是一个实验性特性。 我们仍然不知道将某些 electron api 暴露给预加载脚本的安全性问题, 但在显示不受信任的内容之前, 需要考虑以下一些事项:

- 某个预加载脚本可能会意外把私有 API 暴露给不可信的代码。
- V8 引擎中的某些 bug 可能允许恶意代码访问渲染器预加载 api, 从而有效地通过 ` remote ` 模块授予对系统的完全访问权限。

由于在 electron 中渲染不受信任的内容仍然是未知的领域, 因此暴露给沙盒预加载脚本中的 api 应被认为比其他 electron api 更不稳定, 并且这些API可能会更改以修复安全问题。

一个应该大大提高安全性的方法，是阻止 IPC 默认情况下来自沙盒渲染器的消息，允许主进程显式定义允许渲染器发送的一组消息。
