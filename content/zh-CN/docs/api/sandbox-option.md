# `sandbox` 沙盒选项

> 创建一个可在Chromiun OS 沙盒中运行的浏览器窗口。 在该模式可用情况下，渲染器为了使用node APIs必须通过IPC与主进程通讯。 然而，为了使Chromium OS sandbox模式可用，electron必须使用`--enable-sandbox`命令行参数启动。

Chromium主要的安全特征之一便是所有的blink渲染或者JavaScript代码都在sandbox内运行。 该sandbox使用OS特定特征来保障运行在渲染器内的进程不会损害系统。

也就是说，在sandbox模式下，渲染器只能通过IPC委派任务给主进程来对操作系统进行更改。 [下述](https://www.chromium.org/developers/design-documents/sandbox)是有关sandbox更多的信息。

自从在渲染进程中运行node.js成为electron的一个重要特性（可以更容易地使用Web技术创建桌面应用），沙箱在默认情况下被禁用。 这是因为大多数node.js API需要访问操作系统。 比如 ，要使用`require()`不可能没有文件系统权限，而该权限在沙箱环境下不是有效的。

通常, 对于桌面应用程序来说, 这不是问题, 因为代码始终是受信任的, 但它使electron在显示Web内容时安全性不如chromium。 如果应用程序需要更多的安全性，`sandbox` 标记将使electron产生一个与沙箱兼容的经典chromium渲染器。

一个沙箱环境下的渲染器没有node.js运行环境，并且没有对客户端代码暴露node.js JavaScript APIs。 唯一的例外是预加载脚本, 它可以访问electron渲染器 API 的一个子集。

另一个区别是沙箱渲染器不修改任何默认的 JavaScript api。 因此, 某些 api （比如 `window.open`）将像在chromium中一样工作 (即它们不返回 ` BrowserWindowProxy `)。

## 示例

要创建沙盒窗口, 只需将 ` 沙盒: true ` 传递到 ` webPreferences `:

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

以上代码创建了一个禁用了node.js同时只能通过IPC通信的`BrowserWindow` 。 使用这个选项阻止electron在渲染器中创建一个node.js运行时环境。 同样，创建窗口使用`window.open`将遵从native行为（默认情况下electron创建一个`BrowserWindow`然后返回一个通过`window.open`的代理）

需要注意的是，这个选项本身不会启用操作系统强制的沙箱。 要启用此功能，必须在命令行参数里加上 `--enable-sandbox` 传递给 electron, 这将会使所有的 `BrowserWindow` 实例强制使用 `sandbox: true`.

如果要在 ` BrowserWindow ` 或 ` webview ` 进程中启用 ` sandbox:true ` 而不想让整个应用程序处于沙盒中, 请在命令行中使用 `--enable-mixed-sandbox ` 传递给 electron。 此选项当前仅在 macOS 和 Windows 上支持。

```js
let win
app.on('ready', () => {
  // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

请注意, 只调用 ` app.commandLine.appendSwitch('--enable-sandbox')` 是不够的, 因为 electron/node 会在 chromium 改变沙箱设置后才运行代码。 参数必须在命令行里传递给 electron:

```sh
electron --enable-sandbox app.js
```

如果启用了 `--enable-sandbox`, 则无法创建正常的电子窗口, 因此不能只为某些渲染激活 OS 沙盒。

如果需要在一个应用程序中混合使用沙箱和非沙箱渲染, 只需省略 `-enable-sandbox ` 参数即可。 如果没有此参数, 使用 ` sandbox: true ` 创建的窗口仍将禁用 node. js 并仅能通过 IPC 进行通信, 这本身已经从安全视角获得了好处。

## 预加载

一个App可以使用预加载脚本自定义沙箱渲染器。 这里有一个例子：

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

和 preload.js:

```js
只要创建 javascript , 就会加载此文件。 它在一个
//私有范围内运行, 可以访问 electron 渲染器的 api 。 我们必须小心, 
//不要泄漏任何对象到全局范围!
const fs = require('fs')
const {ipcRenderer} = require('electron')

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

- 尽管沙盒渲染器没有运行 node. js , 但它仍然可以访问受限制的类似于节点的环境: ` Buffer `、` process `、` setImmediate ` 和 ` require ` 可用。
- 预加载脚本可以通过 ` remote ` 和 ` ipcRenderer ` 模块间接访问主进程中的所有 api。 这是 ` fs ` (上面使用的) 和其他模块的实现方式: 它们是主进程中的 remote 对象的代理。
- 预加载脚本必须包含在单个脚本中, 但可以使用像 browserify 这样的工具, 将多个模块组成复杂的预加载代码, 如下所述。 事实上, browserify 已经被 electron 用来为预加载脚本提供类似于节点的环境。

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

More may be added as needed to expose more electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## 状态

请小心使用`sandbox`选项，它仍是一个实验性特性。 We are still not aware of the security implications of exposing some electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentaly leak privileged APIs to untrusted code.
- Some bug in V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module.

Since rendering untrusted content in electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of electron APIs, and may have breaking changes to fix security issues.

One planned enhancement that should greatly increase security is to block IPC messages from sandboxed renderers by default, allowing the main process to explicitly define a set of messages the renderer is allowed to send.