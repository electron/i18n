## 类: Debugger

> An alternate transport for Chrome's remote debugging protocol.

进程：[主进程](../glossary.md#main-process)

Chrome Developer Tools 在 JavaScript 运行时提供了一个 [ special binding ][rdp], 允许与页面进行交互和检测。

```javascript
康斯特 { BrowserWindow } =要求（"电子"）
持续赢=新的浏览器窗口（）

尝试{
  赢。webContents.调试器.附件（'1.1'）
}捕获（呃）{
  控制台.log（"窃听器连接失败：'， 错误）
=

赢。网络控制器.debugger.on（'分离'，（事件，原因）=> {
  控制台.log（"由于：'， 原因）
[）

win.web控制.调试器。on（"消息"，（事件，方法，参数）=> {
  如果（方法=="网络。请求将发送"）=
    （参数请求） .url == "https://www.github.com"） [
      赢. web 康滕茨. 德布格. 分离 （）
    [
  ]
[ ）

赢。
```

### 实例事件

#### Event: 'detach'

返回:

* `event` Event
* `reason` String - 分离调试器的原因

调试会话终止时发出。 当 `webContents` 关闭或为附加的 `webContents`调用开发人员时，就会发生这种情况。

#### Event: 'message'

返回:

* `event` Event
* `method` String - 方法名.
* `params` 远程调试协议中由"参数" 属性定义的任何事件参数。
* `sessionId` 字符串 - 附加调试会话的独特标识符， 将匹配从 `debugger.sendCommand`发送的值。

每当调试目标发出仪器事件时，都会发出。

### 实例方法

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (optional) - 需要调试的协议的版本

添加调试器到 `webContents` 。

#### `debugger.isAttached()`

Returns `Boolean` - 表示调试器是否成功添加到 `webContents` 。

#### `debugger.detach()`

从 `webContents` 里分离调试器.

#### `引款器。发送通信（方法[，命令帕拉姆斯，会话Id]）`

* `method` 字符串-方法名称，应是 [远程调试协议][rdp]定义的方法之一。
* `commandParams` 任何（可选的）-具有请求参数的JSON对象。
* `sessionId` 字符串（可选） - 将命令发送到带有关联 调试会话 ID 的目标。 初始值可以通过发送 [目标.附加目标][attachToTarget] 消息来获得。

返回 `Promise<any>` - 一个 promise，远程调试协议中的命令描述的“returns”属性定义的响应，或者显示命令失败的错误消息。

向调试目标发送给定的命令。

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
