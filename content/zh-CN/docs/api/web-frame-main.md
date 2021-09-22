# webFrameMain

> 控制页面和内联框架(iframes)。

进程：[主进程](../glossary.md#main-process)

`webFramework` 模块可以用来查找现有的 [`WebContents`](web-contents.md) 实例。 通常在导航事件中使用。

```javascript
const { BrowserWindow, webFrameMain } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://twitter.com')

win.webContents.on(
  'did-frame-navigate',
  (event, url, isMainFrame, frameProcessId, frameRoutingId) => {
    const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
    if (frame) {
      const code = 'document.body.innerHTML = document.body.innerHTML.replaceAll("heck", "h*ck")'
      frame.executeJavaScript(code)
    }
  }
)
```

您还可以通过使用 [`WebContents`](web-contents.md)的 `mainFrame` 属性 访问现有页面的框架。

```javascript
const { BrowserWindow } = require('electron')

async function main () {
  const win = new BrowserWindow({ width: 800, height: 600 })
  await win.loadURL('https://reddit.com')

  const youtubeEmbeds = win.webContents.mainFrame.frames.filter((frame) => {
    try {
      const url = new URL(frame.url)
      return url.host === 'www.youtube.com'
    } catch {
      return false
    }
  })

  console.log(youtubeEmbeds)
}

main()
```

## 方法

通过`webFrameMain`模块可以访问以下方法：

### `webFrameMain.fromId(processId, routingId)`

* `processId` Integer - 表示拥有此框架的进程的内部 ID。
* `routingId` Integer - 表示当前渲染器进程中唯一框架的 ID 。 Routing IDs can be retrieved from `WebFrameMain` instances (`frame.routingId`) and are also passed by frame specific `WebContents` navigation events (e.g. `did-frame-navigate`).

Returns `WebFrameMain | undefined` - A frame with the given process and routing IDs, or `undefined` if there is no WebFrameMain associated with the given IDs.

## Class: WebFrameMain

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

### 实例事件

#### 事件: 'dom-ready'

Emitted when the document is loaded.

### 实例方法

#### `frame.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.

Returns `Promise<unknown>` - A promise that resolves with the result of the executed code or is rejected if execution throws or results in a rejected promise.

在页面中执行 `code`。

在浏览器窗口中，一些HTML API（如` requestFullScreen `）只能是 由来自用户的手势调用。 将 ` userGesture ` 设置为 ` true ` 将删除此限制。

#### `frame.reload()`

Returns `boolean` - Whether the reload was initiated successfully. Only results in `false` when the frame has no history.

#### `frame.send(channel, ...args)`

* `channel` String
* `...args` any[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the \[Structured Clone Algorithm\]\[SCA\], just like [`postMessage`][], so prototype chains will not be included. 发送 Functions, Promises, Symbols, WeakMaps, 或 WeakSets 将抛出异常

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

#### `frame.postMessage(channel, message, [transfer])`

* `channel` String
* `message` any
* `transfer` MessagePortMain[] (可选)

Send a message to the renderer process, optionally transferring ownership of zero or more [`MessagePortMain`][] objects.

The transferred `MessagePortMain` objects will be available in the renderer process by accessing the `ports` property of the emitted event. When they arrive in the renderer, they will be native DOM `MessagePort` objects.

例如：

```js
// Main process
const { port1, port2 } = new MessageChannelMain()
webContents.mainFrame.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

### 实例属性

#### `frame.url` _Readonly_

A `string` representing the current URL of the frame.

#### `frame.top` _Readonly_

A `WebFrameMain | null` representing top frame in the frame hierarchy to which `frame` belongs.

#### `frame.parent` _Readonly_

A `WebFrameMain | null` representing parent frame of `frame`, the property would be `null` if `frame` is the top frame in the frame hierarchy.

#### `frame.frames` _Readonly_

A `WebFrameMain[]` collection containing the direct descendents of `frame`.

#### `frame.framesInSubtree` _Readonly_

A `WebFrameMain[]` collection containing every frame in the subtree of `frame`, including itself. This can be useful when traversing through all frames.

#### `frame.frameTreeNodeId` _Readonly_

An `Integer` representing the id of the frame's internal FrameTreeNode instance. This id is browser-global and uniquely identifies a frame that hosts content. The identifier is fixed at the creation of the frame and stays constant for the lifetime of the frame. When the frame is removed, the id is not used again.

#### `frame.name` _Readonly_

A `String` representing the frame name.

#### `frame.osProcessId` _Readonly_

An `Integer` representing the operating system `pid` of the process which owns this frame.

#### `frame.processId` _Readonly_

An `Integer` representing the Chromium internal `pid` of the process which owns this frame. This is not the same as the OS process ID; to read that use `frame.osProcessId`.

#### `frame.routingId` _Readonly_

An `Integer` representing the unique frame id in the current renderer process. Distinct `WebFrameMain` instances that refer to the same underlying frame will have the same `routingId`.

#### `frame.visibilityState` _只读_

A `string` representing the [visibility state](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState) of the frame.

See also how the [Page Visibility API](browser-window.md#page-visibility) is affected by other Electron APIs.
