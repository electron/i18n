## 类: BrowserWindowProxy

> 操纵子浏览器窗口

进程: [ Renderer](../glossary.md#renderer-process)

使用 `window.open` 创建一个新窗口时会返回一个 `BrowserWindowProxy`对象，并提供一个有限功能的子窗口.

### 实例方法

`BrowserWindowProxy` 对象具有以下实例方法:

#### `win.blur()`

将焦点从子窗口中移除.

#### `win.close()`

不调用卸载事件，便关闭了子窗口。

#### `win.eval(code)`

* `code` String

Eval子窗口中的代码

#### `win.focus()`

聚焦子窗口(即窗口置顶)

#### `win.print()`

调用子窗口上的打印对话框

#### `win.postMessage(message, targetOrigin)`

* `message` any
* `targetOrigin` String

调通过指定位置或用`*`来代替不明位置，向子窗口发送信息

除了这些方法,子窗口还可以无特性和使用单一方法来实现 `window.opener` 对象.

### 实例属性

` BrowserWindowProxy ` 对象具有以下实例属性:

#### `win.closed`

在子窗口关闭后设置为 true 的 ` Boolean `。
