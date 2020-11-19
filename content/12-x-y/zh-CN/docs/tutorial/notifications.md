# 通知 (Windows, Linux, macOS)

## 概览

所有三个操作系统为应用程序向用户发送 通知提供了手段。 在主程序和渲染程序中，显示通知的技术不同的 。

为了渲染程序，Electron方便地允许开发者使用 [HTML5 通知 API 发送 通知](https://notifications.spec.whatwg.org/)， 使用当前运行中的系统的原生通知 API 以显示它。

要在主进程中显示通知，您需要使用 [通知](../api/notification.md) 模块。

## 示例

### 在渲染过程中显示通知

假定您有 的 Electron 应用程序[快速启动指南](quick-start.md)， 添加以下行到 `索引。 结束前的tml` 文件 `</body>` 标签：

```html
<script src="renderer.js"></script>
```

并添加 `渲染器.js` 文件：

```js
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

启动 Electron 应用程序后，您应该看到通知：

![渲染过程中的通知](../images/notification-renderer.png)

如果您打开控制台，然后单击通知。 您将看到触发 `onclick` 事件后生成的 消息：

![在通知上点击消息](../images/message-notification-renderer.png)

### 在主进程中显示通知

从 的工作应用程序开始[快速启动指南](quick-start.md), 更新 `main.js` 文件中包含以下行：

```js
const { Notification } = require('electron')

function showNotification ()
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

启动 Electron 应用程序后，您应该看到通知：

![主要过程中的通知](../images/notification-main.png)

## 补充资料

虽然操作系统的代码和用户体验相似，但依然存在微妙的差异。

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. 这可能会在开发过程中被过度杀死，因此将 `node_modules\electron\dist\electron.exe` 添加到您的开始菜单中也做到了 的技巧。 在Explorer, 右键单击和“Pin 开始菜单”中导航到文件。 然后您需要添加第 `个应用。setAppUserModelId(process.execPath)` 到 您的主要进程才能看到通知。
* 在 Windows 8.1 和 Windows 8 上，带有 [ 应用程序用户模型ID（Application User Model ID）][app-user-model-id] 的应用程序快捷方式必须被添加到开始屏幕上。 但是请注意，它不需要被固定到开始屏幕。
* 在 Windows 7 上, 通知通过视觉上类似于较新系统原生的一个自定义的实现来工作。

Electron尝试将应用程序用户模型 ID 的相关工作自动化。 Electron在和安装和更新框架 Squirrel 协同使用的时候，[快捷方式将被自动正确的配置好][squirrel-events]。 更棒的是，Electron 会自动检测 Squirrel 的存在，并且使用正确的值来自动调用`app.setAppUserModelId()`。 在开发的过程中, 你可能需要自己调用[`app.setAppUserModelld()`][set-app-user-model-id]

此外，在Windows 8中，通知正文的最大长度为250个字符，Windows团队建议将通知保留为200个字符。 然而，Windows 10中已经删除了这个限制，但是Windows团队要求开发人员合理使用。 尝试将大量文本发送到API(数千个字符) 可能会导致不稳定。

#### 高级通知

Windows 的更高版本允许高级通知，自定义模板，图像和其他灵活元素。 要发送这些通知(来自主进程或渲染器进程)，请使用用户区模块 [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications) 来用原生节点附件发送 `ToastNotification` 和 `TileNotification` 对象。

当包括按钮在内的通知使用 `electron-windows-notifications`, 时, 处理回复需要使用 [`电子窗口-互动通知`](https://github.com/felixrieseberg/electron-windows-interactive-notifications) 帮助注册所需的 COM 组件并调用您的 Electron 应用程序和输入的用户数据。

#### 免打扰模式 / 演示模式

要检测是否允许您发送通知，请使用 用户土地模块 [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state)

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

### macOS

MacOS上的通知是最直接的，但你应该注意[苹果关于通知的人机接口指南（Apple's Human Interface guidelines regarding notifications）][apple-notification-guidelines].

请注意，通知的大小限制为256个字节，如果超过该限制，则会被截断。

#### 高级通知

后来的 macOS 版本允许有一个输入字段的通知，允许用户快速回复通知。 为了通过输入字段发送通知，请使用用户区模块[node-mac-notifier][node-mac-notifier]。

#### 勿扰 / 会话状态

要检测是否允许发送通知，请使用用户区模块 [electron-notification-state][electron-notification-state]。

这样可以提前检测是否显示通知。

### Linux

通知是通过`libnotify`发送的，libnotify可以在任何实现了[桌面通知规范（Desktop Notifications Specification）][notification-spec]的桌面环境中发送通知，包括Cinnamon、Enlightenment、Unity、GNOME、KDE

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[node-mac-notifier]: https://github.com/CharlieHess/node-mac-notifier

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
