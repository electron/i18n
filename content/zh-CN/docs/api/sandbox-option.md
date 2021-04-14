# `sandbox` 沙盒选项

> 使用沙盒渲染器创建浏览器窗口。 在该模式可用情况下，渲染器为了使用node APIs必须通过IPC与主进程通讯。

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
让我们赢得
应用程序。当准备好时。然后）=> {
  赢=新的浏览器窗口（{
    网络预测： {
      sandbox: true
    }
  }）
  赢。loadURL（"#/google.com"）
}）
```


以上代码中被创建的[`BrowserWindow`](browser-window.md)禁用了node.js，并且只能使用IPC通信。 这个选项的设置阻止electron在渲染器中创建一个node.js运行环境。 此外， 在此新窗口内 `window.open` 遵循本机行为（默认情况下，Electron 创建 [`BrowserWindow`](browser-window.md) 并通过 `window.open`返回代理）。

[`app.enableSandbox`](app.md#appenablesandbox) 可用于强制 `sandbox: true` 所有 `BrowserWindow` 实例。



```js
让赢
应用程序。启用和框（）
应用程序。当准备好时。然后）=> {
  //不需要通过"沙盒：真实"，因为"应用程序。启用和框"被称为。
  赢=新的浏览器窗口（）
  赢
.com。
```




## 预加载

应用可以使用预加载脚本对沙盒渲染器进行自定义。 例如：



```js
让我们赢得
应用程序。当准备好时=> {
  赢=新的浏览器窗口（{
    网络预测：{
      沙盒：真的，
      预加载： 路径. join （应用程序. getApp 路径 （）， "预加载.js"）
    [
  [）
  赢
.com。
```


和 preload.js:



```js
// 一旦javascript上下文创建，这个文件就会被自动加载 它在一个
//私有环境内运行, 可以访问 electron 渲染器的 api的子集 。 如果不启用
//上下文隔离，可能会意外地将特权
//像 ipcRenderer 这样的全球性设备泄露到 Web 内容中。
康斯特 { ipcRenderer } =要求（"电子"）

默认窗口打开=窗口。打开

窗口。打开=功能自定义窗口打开（url，...args） [
  ipcrenderer. 发送 （"报告窗口打开"， 位置. 起源， 网址， args）
  返回默认窗口打开 （url + "？ from_electron = 1"， ...阿格斯）
}
```


在预加载脚本中要注意的重要事项:

- 即使沙盒渲染器没有节点.js运行，它仍然 访问一个有限的节点般的环境： `Buffer`， `process`， `setImmediate`， `clearImmediate` 和 `require` 可用。

- 预加载脚本必须包含在单个脚本中，但可以通过使用 Webpack 或浏览器 等工具将 复杂的预加载代码与多个模块组成。 下面是使用浏览器的示例。

要创建 browserify 包并将其用作预加载脚本, 应使用类似下面的内容:



```sh
  浏览预加载/索引.js [
    - x 电子 ]
    - 插入全球 vars= __filename，__dirname - o 预加载.js
```


`-x ` 标志应该和已经在预加载作用域中公开的所有引用到的模块一起使用, 并通知 browserify 使用封闭的 ` require ` 函数。 `--insert-global-vars ` 将确保 ` process `、` Buffer ` 和 ` setImmediate ` 也从封闭作用域 (通常 browserify 为这些代码注入代码) 中获取。

当前预加载作用域中提供的 ` require ` 函数公开了以下模块:

- `electron` 
    - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `webFrame`
- `事件`
- `timers`
- `url`

可能会根据需要添加更多内容，以在沙盒中暴露更多电子 ABI。



## 渲染不受信任的内容

在 Electron 中渲染不受信任的内容仍然有些未知， 尽管某些应用正在取得成功（例如 Beaker 浏览器）。 我们的目标是让 尽可能接近Chrome，在沙盒内容的安全性方面，但 最终，我们将永远落后，由于几个基本问题：

1. 我们没有铬必须 适用于其产品安全的专用资源或专业知识。 我们尽最大努力利用我们所拥有的 ，从铬中继承我们所能继承的一切，并迅速应对 安全问题，但是，如果没有铬能够奉献的 资源，电子就不可能像铬那样安全。

2. Chrome 中的某些安全功能（如安全浏览和证书 透明度）需要集中的权限和专用服务器，这两种 都与 Electron 项目的目标背道而驰。 因此，我们禁用了 Electron 中的这些功能 ，但代价是它们 本来会带来的相关安全性。

3. 只有一个铬，而有成千上万的应用程序内置 电子，所有这些行为略有不同。 考虑这些 差异可能会产生巨大的可能性空间，并使得 在异常使用情况下确保平台的安全性变得具有挑战性。

4. 我们不能将安全更新直接推给用户，因此我们依靠应用供应商 升级其应用背后的 Electron 版本，以便 安全更新以覆盖用户。

在渲染不信任的内容之前，需要考虑的事项如下：

- 预加载脚本可能会意外地将特权 ABI 泄露到不受信任的代码，除非还启用 [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) ，否则 。

- V8 引擎中的某些错误可能允许恶意代码访问渲染器 预加载 ABI，从而有效地通过 `remote` 模块对系统进行完全访问。 因此，强烈建议 [禁用 `remote` 模块](../tutorial/security.md#15-disable-the-remote-module)。 如果禁用不可行，应选择性地 [筛选](../tutorial/security.md#16-filter-the-remote-module)`remote` 模块。

- 虽然我们尽最大努力将铬安全修复后港到旧版本的 电子，但我们并不保证每个修复都将 后端。 您保持安全的最佳机会是在最新的稳定 版本的电子。
