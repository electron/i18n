# 通知 (Windows, Linux, macOS)

## 概览

All three operating systems provide means for applications to send notifications to the user. The technique of showing notifications is different for the Main and Renderer processes.

For the Renderer process, Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

To show notifications in the Main process, you need to use the [Notification](../api/notification.md) module.

## 示例

### Show notifications in the Renderer process

Assuming you have a working Electron application from the [Quick Start Guide](quick-start.md), add the following line to the `index.html` file before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

and add the `renderer.js` file:

```js
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

After launching the Electron application, you should see the notification:

![Notification in the Renderer process](../images/notification-renderer.png)

If you open the Console and then click the notification, you will see the message that was generated after triggering the `onclick` event:

![Onclick message for the notification](../images/message-notification-renderer.png)

### Show notifications in the Main process

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```js
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

After launching the Electron application, you should see the notification:

![Notification in the Main process](../images/notification-main.png)

## Additional information

虽然操作系统的代码和用户体验相似，但依然存在微妙的差异。

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
* 在 Windows 8.1 和 Windows 8 上，带有 [ 应用程序用户模型ID（Application User Model ID）](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) 的应用程序快捷方式必须被添加到开始屏幕上。 但是请注意，它不需要被固定到开始屏幕。
* 在 Windows 7 上, 通知通过视觉上类似于较新系统原生的一个自定义的实现来工作。

Electron尝试将应用程序用户模型 ID 的相关工作自动化。 Electron在和安装和更新框架 Squirrel 协同使用的时候，[快捷方式将被自动正确的配置好](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events)。 更棒的是，Electron 会自动检测 Squirrel 的存在，并且使用正确的值来自动调用`app.setAppUserModelId()`。 在开发的过程中, 你可能需要自己调用[`app.setAppUserModelld()`](../api/app.md#appsetappusermodelidid-windows)

此外，在Windows 8中，通知正文的最大长度为250个字符，Windows团队建议将通知保留为200个字符。 然而，Windows 10中已经删除了这个限制，但是Windows团队要求开发人员合理使用。 尝试将大量文本发送到API(数千个字符) 可能会导致不稳定。

#### 高级通知

Windows 的更高版本允许高级通知，自定义模板，图像和其他灵活元素。 要发送这些通知(来自主进程或渲染器进程)，请使用用户区模块 [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications) 来用原生节点附件发送 `ToastNotification` 和 `TileNotification` 对象。

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### 免打扰模式 / 演示模式

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

### macOS

MacOS上的通知是最直接的，但你应该注意[苹果关于通知的人机接口指南（Apple's Human Interface guidelines regarding notifications）](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

请注意，通知的大小限制为256个字节，如果超过该限制，则会被截断。

#### 高级通知

后来的 macOS 版本允许有一个输入字段的通知，允许用户快速回复通知。 为了通过输入字段发送通知，请使用用户区模块[node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier)。

#### 勿扰 / 会话状态

要检测是否允许发送通知，请使用用户区模块 [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state)。

这样可以提前检测是否显示通知。

### Linux

通知是通过`libnotify`发送的，libnotify可以在任何实现了[桌面通知规范（Desktop Notifications Specification）](https://developer.gnome.org/notification-spec/)的桌面环境中发送通知，包括Cinnamon、Enlightenment、Unity、GNOME、KDE
