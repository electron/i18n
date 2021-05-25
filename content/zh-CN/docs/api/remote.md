# remote

> 在渲染进程中使用主进程模块。

进程: [渲染进程](../glossary.md#renderer-process)

> ⚠️ WARNING ⚠️ The `remote` module is [deprecated](https://github.com/electron/electron/issues/21408). Instead of `remote`, use [`ipcRenderer`](ipc-renderer.md) and [`ipcMain`](ipc-main.md).
> 
> Read more about why the `remote` module is deprecated [here](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).
> 
> If you still want to use `remote` despite the performance and security concerns, see [@electron/remote](https://github.com/electron/remote).

` remote ` 模块为渲染进程（web页面）和主进程通信（IPC）提供了一种简单方法。

在Electron中, GUI 相关的模块 (如 ` dialog`、` menu ` 等) 仅在主进程中可用, 在渲染进程中不可用。 为了在渲染进程中使用它们, ` ipc ` 模块是向主进程发送进程间消息所必需的。 使用 ` remote ` 模块, 你可以调用 main 进程对象的方法, 而不必显式发送进程间消息, 类似于 Java 的 [ RMI ][rmi]。 <br>例如：从渲染进程创建浏览器窗口

```javascript
const { BrowserWindow } = require('electron').remote
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

** 注意: **反过来（如果需要从主进程访问渲染进程），可以使用 [ webContents. executeJavascript ](web-contents.md#contentsexecutejavascriptcode-usergesture)。

**注意事项：** 因为安全原因，remote 模块能在以下几种情况下被禁用：

* [`BrowserWindow`](browser-window.md) - 通过设置 `enableRemoteModule` 选项为 `false`。
* [`<webview>`](webview-tag.md) - 通过把 ` enableremotemodule`属性设置成 `false`。

## 远程对象（Remote Objects）

` remote ` 模块返回的每个对象 (包括函数) 表示主进程中的一个对象 (我们称它为远程对象或远程函数)。 当调用远程对象的方法时, 调用远程函数, 或者使用远程构造函数 (函数) 创建新对象时, 实际上是在发送同步进程消息。

在上面的示例中, [ BrowserWindow ` 和 ` win ](browser-window. md) 都是远程对象, ` new BrowserWindow ` 在渲染过程中没有创建 ` BrowserWindow ` 对象。 取而代之的是，它在主进程中创建了一个 `BrowserWindow`对象，并且在渲染进程中返回相应的远程对象，即` win </ 0>对象。</p>

<p spaces-before="0"><strong x-id="1">注意： </strong>当远程对象被第一次引用时，只有<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties" f-id="enumerable-properties" fo="2">可枚举的属性</a>可以通过远程访问。</p>

<p spaces-before="0"><strong x-id="1">注意：</strong> 当通过<code> remote `模块访问时，数组和缓冲区在IPC上复制。 在渲染进程中修改它们不会在主进程中修改它们，反之亦然。

## 远程对象的生命周期

Electron 确保只要渲染进程中的远程对象一直存在（换句话说，没有被回收），主进程中的相应对象就不会被释放。 当远程对象被垃圾回收后，主进程中的相应对象将被解除引用。

如果远程对象在渲染进程中泄露（例如存储在映射中，但从未释放），则主进程中的相应对象也将被泄漏，所以您应该非常小心，不要泄漏远程对象。

但是，字符串和数字等主要值的类型是通过复制发送的。

## 将回调传递给主进程

主进程中的代码可以接受来自渲染进程的回调 - 例如`remote`模块 - 但使用此功能时应该非常小心。

First, in order to avoid deadlocks, the callbacks passed to the main process are called asynchronously. You should not expect the main process to get the return value of the passed callbacks.

例如，您不能在主进程中调用的` Array.map `中使用来自渲染器进程的函数：

```javascript
// 主进程 mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// 渲染进程
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [undefined, undefined, undefined], [2, 3, 4]
```

如您所见，渲染器回调的同步返回值不是预期的，而且在主进程中也与相同回调的返回值不符。

其次，传递给主进程的回调将持续到主进程垃圾回收。

For example, the following code seems innocent at first glance. It installs a callback for the `close` event on a remote object:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // window was closed...
})
```

但请记住, 回调是由主进程引用的, 直到你显式卸载它。 如果不这样做, 每次重新加载窗口时这个回调将再次被安装, 每次重启时都会泄漏一个回调。

更糟的是, 由于以前安装的回调的上下文已释放, 因此在发出 ` close ` 事件时, 将在主进程中引发异常。

为了避免这个问题，请确保清除对传递给主进程的渲染器回调的引用。 这涉及到清理事件处理程序, 或者确保主进程被明确告知取消引用来自正在退出的渲染程序的回调。

## 访问主进程中的内置模块

主过程中的内置模块被添加为 `remote` 模块中的获取器，因此可以像 `electron` 模块一样直接使用它们。

```javascript
const app = require('electron').remote.app
console.log(app)
```

## 方法

`remote ` 模块具有以下方法:

### `remote.getCurrentWindow()`

返回 [`BrowserWindow`](browser-window.md) - 此网页所属的窗口

**注意事项：** 请勿在[` BrowserWindow`](browser-window.md)上使用 `removeAllListeners`。 使用这个可导致移除 [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) 监听，禁用点击触控按钮的事件，或者其它意外的后果。

### `remote.getCurrentWebContents()`

返回 [`WebContents`](web-contents.md) - 此网页的 web 内容

### `remote.getGlobal(name)`

* `name` String

返回 ` any `-主进程中 ` name ` (例如 ` global[name]`) 的全局变量。

## Properties

### `需要`

A `NodeJS.Require` function equivalent to `require(module)` in the main process. 由其相对路径指定的模块将相对于主进程的入口点来解析。

例如:

```sh
project/
├── main
│   ├── foo.js
│   └── index.js
├── package.json
└── renderer
    └── index.js
```

```js
// main process: main/index.js
const { app } = require('electron')
app.whenReady().then(() => { /* ... */ })
```

```js
// some relative module: main/foo.js
module.exports = 'bar'
```

```js
// renderer process: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.process` _只读_

A `NodeJS.Process` object.  The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.

[rmi]: https://en.wikipedia.org/wiki/Java_remote_method_invocation
