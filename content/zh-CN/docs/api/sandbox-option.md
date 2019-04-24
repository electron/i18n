# `sandbox` 沙盒选项

> 创建一个可在Chromiun OS 沙盒中运行的浏览器窗口。 在该模式可用情况下，渲染器为了使用node APIs必须通过IPC与主进程通讯。 但是，为了开启Chromiun OS的沙盒，Electron必须在启动的时候，附上命令行参数`--enable=sandbox`。

Chromium主要的安全特征之一便是所有的blink渲染或者JavaScript代码都在sandbox内运行。 该sandbox使用OS特定特征来保障运行在渲染器内的进程不会损害系统。

也就是说，在sandbox模式下，渲染器只能通过IPC委派任务给主进程来对操作系统进行更改。 [下述](https://www.chromium.org/developers/design-documents/sandbox)是有关sandbox更多的信息。

Electron的一个主要特性就是能在渲染进程中运行Node.js（使用web技术能让我们更加便捷的构建一个桌面应用），但是在渲染进程中沙箱是不可用的。 这是因为大多数Node.js 的API都需要系统权限。 比如 ，没有文件系统权限的情况下`require()`是不可用的，而该文件系统权限在沙箱环境下是不可用的。

通常，对于桌面应用来说这些都不是问题，因为应用的代码都是可信的；但是显示一些不是那么受信任的网站会使得Electron相比Chromium而言安全性下降。 因为应用程序需要更多的安全性，`sandbox` 标记将使electron产生一个与沙箱兼容的经典chromium渲染器。

一个沙箱环境下的渲染器没有node.js运行环境，并且不会将Node.js 的 JavaScript APIs 暴露给客户端代码。 唯一的例外是预加载脚本, 它可以访问electron渲染器 API 的一个子集(subset)。

另一个区别是沙箱渲染器不修改任何默认的 JavaScript API。 因此, 某些 api ，（比如 `window.open`）将像在chromium中一样工作 (即它们不返回  BrowserWindowProxy `)。</p>

<h2>示例</h2>

<p>创建沙盒窗口, 只需将 <code> sandbox: true ` 传递到 ` webPreferences `:</p> 

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

需要注意的是，这个选项本身不会启用操作系统强制的沙箱。 要启用此功能，必须在命令行参数里加上 `--enable-sandbox` 传递给 electron, 这将会使所有的 `BrowserWindow` 实例强制使用 `sandbox: true`.

```js
let win
app.on('ready', () => {
  // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

Note that it is not enough to call `app.commandLine.appendSwitch('--enable-sandbox')`, as electron/node startup code runs after it is possible to make changes to Chromium sandbox settings. The switch must be passed to Electron on the command-line:

```sh
electron --enable-sandbox app.js
```

It is not possible to have the OS sandbox active only for some renderers, if `--enable-sandbox` is enabled, normal Electron windows cannot be created.

If you need to mix sandboxed and non-sandboxed renderers in one application, omit the `--enable-sandbox` argument. Without this argument, windows created with `sandbox: true` will still have Node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

## 预加载

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  win.loadURL('http://google.com')
})
```

and preload.js:

```js
// 一旦javascript上下文创建，这个文件就会被自动加载 它在一个
//私有环境内运行, 可以访问 electron 渲染器的 api的子集 。 我们必须小心, 
//不要泄漏任何对象到全局范围!
const fs = require('fs')
const { ipcRenderer } = require('electron')

// 使用 `fs` 模块读取配置文件
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

Important things to notice in the preload script:

- 尽管沙盒渲染器没有运行 node. js, 但它仍然可以访问受限制的类似于节点的环境: ` Buffer `、` process `、` setImmediate ` 和 ` require ` 这些依然可用可用。
- 预加载脚本可以通过 ` remote ` 和 ` ipcRenderer ` 模块间接访问主进程中的所有 api。 这是 ` fs ` (上面使用的) 和其他模块的实现方式: 它们是主进程中的 remote 对象的代理。
- 预加载脚本必须包含在单个脚本中, 但可以使用像 browserify 这样的工具, 将多个模块组成复杂的预加载代码, 如下所述。 事实上, electron用browserify来提供一个类Node环境以便于预加载脚本。

To create a browserify bundle and use it as a preload script, something like the following should be used:

```sh
  browserify preload/index.js \
    -x electron \
    -x fs \
    --insert-global-vars=__filename,__dirname -o preload.js
```

The `-x` flag should be used with any required module that is already exposed in the preload scope, and tells browserify to use the enclosing `require` function for it. `--insert-global-vars` will ensure that `process`, `Buffer` and `setImmediate` are also taken from the enclosing scope(normally browserify injects code for those).

Currently the `require` function provided in the preload scope exposes the following modules:

- `child_process`
- `electron` 
  - `crashReporter`
  - `remote`
  - `ipcRenderer`
  - `webFrame`
- `fs`
- `os`
- `timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## 状态

Please use the `sandbox` option with care, as it is still an experimental feature. We are still not aware of the security implications of exposing some Electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- 某个预加载脚本可能会意外把私有 API 暴露给不可信的代码。
- V8 引擎中的某些 bug 可能允许恶意代码访问渲染器预加载 api, 从而有效地通过 ` remote ` 模块授予对系统的完全访问权限。

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.

One planned enhancement that should greatly increase security is to block IPC messages from sandboxed renderers by default, allowing the main process to explicitly define a set of messages the renderer is allowed to send.