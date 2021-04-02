# webFrameMain

> 控制网页和互联网。

进程：[主进程](../glossary.md#main-process)

`webFrameMain` 模块可用于查找现有 [`WebContents`](web-contents.md) 实例中的帧。 导航事件是常用 案例。

```javascript
康斯特 { BrowserWindow, webFrameMain } = 要求 （'电子'）

缺点赢 = 新的浏览器窗口 （{ width: 800, height: 1500 }）
赢. loadurl （'https：// twitter.com'）

赢. web Contents. on （
  '做帧导航'，
  （事件， 网址， 是主框架， 帧处理Id，框架路图id）=> =
    const帧=webFrameMain.从ID（帧处理，帧路霸）
    如果（帧）=
      const代码="文档.body.内部HTML=文档.body.内HTML.替换所有（"赫克"，"h*ck"）"
      帧。 脚本（代码）
    }
  =
）
```

您也可以使用 [`WebContents`](web-contents.md)的 `mainFrame` 属性 访问现有页面的帧。

```javascript
康斯特 { BrowserWindow } = 要求 （'电子'）

不对称功能主 （） =
  缺点赢 = 新的浏览器窗口 （{ width: 800, height: 600 }）
  等待胜利

  .com。 过滤器（（帧）=> {
    尝试{
      网址=新URL（帧.url）
      返回网址。主机==="www.youtube.com"
    =捕获 {
      return false
    }
  }）

  控制台.log（youtubeEmbeds）
}

主（）
```

## 方法

这些方法可以从 `webFrameMain` 模块访问：

### `网络框架从ID（进程ID，路由ID）`

* `processId` 整数 - 代表拥有框架的过程的内部 ID 的 `Integer` 。
* `routingId` 整数 - 表示当前渲染器过程中唯一帧 ID 的 `Integer` 。 路由 ID 可以从 `WebFrameMain` 实例（`frame.routingId`）中检索，也可以通过框架 特定 `WebContents` 导航事件（例如 `did-frame-navigate`）。

返回 `WebFrameMain | undefined` - 如果没有与给定 ID 关联的 WebFrameMain，则带有给定流程和路由 ID、 或 `undefined` 的帧。

## 类： 网络框架

进程：[主进程](../glossary.md#main-process)

### 实例方法

#### `帧.执行贾瓦脚本（代码[，用户图片]）`

* `code` String
* `userGesture` 布尔（可选） - 默认是 `false`。

返回 `Promise<unknown>` - 承诺，解决与执行的 代码的结果，或被拒绝，如果执行抛出或导致拒绝的承诺。

在页面中执行 `code`。

在浏览器窗口中，一些HTML API（如` requestFullScreen `）只能是 由来自用户的手势调用。 将 ` userGesture ` 设置为 ` true ` 将删除此限制。

#### `帧。重新加载（）`

返回 `boolean` - 是否成功启动重新加载。 只有当框架没有历史记录时，才会产生 `false` 。

#### `帧。发送（通道，...阿格斯）`

* `channel` String
* `...args` any[]

通过 `channel`向渲染器进程发送异步消息，以及 参数。 参数将与\[结构克隆 算法\]\[SCA\]进行串行，就像[`postMessage`]一样，因此原型链不会 包括在内。 发送函数、承诺、符号、弱图或弱集 抛出一个例外。

渲染器过程可以通过与 [`ipcRenderer`](ipc-renderer.md) 模块一起收听 `channel` 来处理消息。

#### `帧.邮资信息（频道、消息、 [transfer]）`

* `channel` String
* `message` 任何
* `transfer` 消息端口[]（可选）

向渲染器进程发送消息，可选地转移 零或更多 [`MessagePortMain`] 对象的所有权。

传输 `MessagePortMain` 对象将通过访问发射事件的 `ports` 属性，在渲染器 过程中提供。 当他们 到达渲染器时，它们将是原生 DOM `MessagePort` 对象。

例如：

```js
主流程
持续 { port1, port2 } =新消息通道主要（）
网络主机。主机.邮资信息（"端口"， { message: 'hello' }， [port1]）

// 渲染器过程
ipcRenderer. on （'端口'， （e， msg） => {
  康斯特 [port] = e. 端口
  // 。
})
```

### 实例属性

#### `frame.url` _·里德利·_

代表框架当前网址的 `string` 。

#### `frame.top` _·里德利·_

`WebFrameMain | null` 表示 `frame` 所属的帧层次结构中的顶框。

#### `frame.parent` _·里德利·_

如果 `frame` 是框架层次结构中的顶框，则该属性将 `null` `WebFrameMain | null` 表示 `frame`父框架。

#### `frame.frames` _·里德利·_

包含 `frame`直系后裔的 `WebFrameMain[]` 收藏品。

#### `frame.framesInSubtree` _·里德利·_

包含 `frame`子树中每一帧的 `WebFrameMain[]` 集合， 包括它本身。 当穿越所有帧时，这非常有用。

#### `frame.frameTreeNodeId` _·里德利·_

实例中表示帧内部框架街道节点 ID 的 `Integer` 。 此 ID 是浏览器全局性的，可唯一识别承载 内容的帧。 标识符固定在框架的创建上，并在帧的使用寿命内保持 常数。 拆下框架时，id 不再使用。

#### `frame.name` _·里德利·_

代表框架名称的 `String` 。

#### `frame.osProcessId` _·里德利·_

代表操作系统 `pid` 拥有此框架的过程的 `Integer` 。

#### `frame.processId` _·里德利·_

代表拥有此框架的过程的铬内部 `pid` 的 `Integer` 。 这与操作系统过程 ID 不同：阅读该使用 `frame.osProcessId`。

#### `frame.routingId` _·里德利·_

表示当前渲染器过程中唯一帧 ID 的 `Integer` 。 指相同底层框架的不同 `WebFrameMain` 实例 具有相同的 `routingId`。
