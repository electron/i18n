# 在线/离线事件探测

## 概览

在渲染进程中，[在线/离线事件](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) 的探测，是通过标准 HTML5 API 中 [` navigator.onLine `](http://html5index.org/Offline%20-%20NavigatorOnLine.html) 属性来实现的。

`navigator.onLine` 属性返回值：

* `false`：如果所有网络请求都失败(例如，断开网络)。
* `true`: 在其他情况下都返回 true

由于许多情况都会返回 `true`，你应该小心对待误报的情况， 因为我们不能总是假设 `true` 值意味着 Electron 可以访问互联网。 例如，当计算机运行的虚拟化软件时，虚拟以太网适配器处于 "always connected" 状态。 因此，如果您想要确定 Electron 的互联网访问状态，您应该为此检查进行额外的开发。

## 示例

### 渲染进程中的事件探测

从 [Quick Start Guide](quick-start.md) 中的应用开始，根据以下内容更新 `main.js`。

```javascript
康斯特 { app, BrowserWindow } =要求（'电子'）

让在线统计窗口

应用程序。当准备（然后）=> =
  在线统计窗口=新的浏览器窗口（{ width: 0, height: 0, show: false }）
  在线统计窗口。loadURL（"文件：//${__dirname}/索引.html"）
}）
```

在 `index.html` 文件中，闭合`</body>`标签前添加以下内容：

```html
<script src="renderer.js"></script>
```

并添加 `renderer.js` 文件：

```javascript fiddle='docs/fiddles/features/online-detection/renderer'
康斯特警报在线状态=（）=> {窗口。警报（navigator.onLine？ "在线"： "离线"） =

窗口. add 事件听者 （"在线"， 提醒在线状态）
窗口

。
```

启动 Electron 应用程序后，您应该能看到通知：

![在线/离线事件探测](../images/online-event-detection.png)

### 主进程中的事件探测

在某些情况下，您可能还希望响应主进程中的在线/离线事件探测 但是，主进程没有 `navigator` 对象，无法直接检测这些事件。 在这种情况下，你需要使用 Electron's interprocess communication (IPC) 将事件转发到主进程。

从 [Quick Start Guide](quick-start.md) 中的应用开始，根据以下内容更新 `main.js`。

```javascript
康斯特 { app, BrowserWindow, ipcMain } =要求（'电子'）
让在线统计窗口

应用程序。当准备好。然后）=> {
  在线统计窗口=新的浏览器窗口（{宽度：0， 高度： 0， 显示： 假， webPrepres： { nodeIntegration: true } [）
  在线统计窗口. loadurl （"文件//${__dirname}/索引.html"）
[）

ipcmain.on （"在线状态更改"， （事件， 状态） => =
  控制台.log （状态）
[）
```

在 `index.html` 文件中，闭合`</body>`标签前添加以下内容：

```html
<script src="renderer.js"></script>
```

并添加 `renderer.js` 文件：

```javascript fiddle='docs/fiddles/features/online-detection/main'
康斯特 { ipcRenderer } =需要（"电子"）
续线状态=（）=> {ipcRenderer.发送（"在线状态更改"，navigator.onLine？ "在线"："离线"）}

窗口。add事件听者（"在线"，更新在线状态）
窗口。add事件听者（"离线"，更新在线状态）

更新在线状态（）
```

启动 Electron 应用程序后，您应该在控制台看到以下通知：

```sh
npm 开始

> electron@1.0.0 启动/电子
> 电子。

在线
```
