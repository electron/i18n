# 通知 (Windows, Linux, macOS)

所有三个操作系统都提供了应用程序向用户发送通知的手段。 Electron允许开发者使用 [HTML5 Notification API](https://notifications.spec.whatwg.org/) 发送通知，并使用当前运行的操作系统的本地通知 API 来显示它。

**注意:** 由于这是一个 HTML5 API，它只能在渲染器进程中使用。 如果你想在主进程中显示通知，请查看 [Notification](../api/notification.md) 模块.

```javascript
let myNotification = new Notification('标题', {
  body: '通知正文内容'
})

myNotification.onclick = () => {
  console.log('通知被点击')
}
```

虽然操作系统的代码和用户体验相似，但依然存在微妙的差异。

## Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. 但是请注意，它不需要被固定到开始屏幕。
* 在 Windows 7 上, 通知通过视觉上类似于较新系统原生的一个自定义的实现来工作。

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][[set-app-user-model-id](../api/app.md#appsetappusermodelidid-windows)] yourself.

此外，在Windows 8中，通知正文的最大长度为250个字符，Windows团队建议将通知保留为200个字符。 然而，Windows 10中已经删除了这个限制，但是Windows团队要求开发人员合理使用。 尝试将大量文本发送到API(数千个字符) 可能会导致不稳定。

### 高级通知

Windows 的更高版本允许高级通知，自定义模板，图像和其他灵活元素。 要发送这些通知(来自主进程或渲染器进程)，请使用用户区模块 [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications) 来用原生节点附件发送 `ToastNotification` 和 `TileNotification` 对象。

虽然包含按钮的通知可以使用 `electron-windows-notifications`，但处理回复则需要使用[`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications)，这有助于注册所需的COM组件，并使用输入的用户数据调用Electron应用程序。

### 免打扰模式 / 演示模式

要检测是否允许发送通知，请使用用户区模块 [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state)。

这样，您可以提前确定 Windows 是否会将通知忽略。

## macOS

MacOS上的通知是最直接的，但你应该注意[苹果关于通知的人机接口指南（Apple's Human Interface guidelines regarding notifications）](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

请注意，通知的大小限制为256个字节，如果超过该限制，则会被截断。

### 高级通知

后来的 macOS 版本允许有一个输入字段的通知，允许用户快速回复通知。 为了通过输入字段发送通知，请使用用户区模块[node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier)。

### 勿扰 / 会话状态

要检测是否允许发送通知，请使用用户区模块 [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state)。

这样可以提前检测是否显示通知。

## Linux

通知是通过`libnotify`发送的，libnotify可以在任何实现了[桌面通知规范（Desktop Notifications Specification）](https://developer.gnome.org/notification-spec/)的桌面环境中发送通知，包括Cinnamon、Enlightenment、Unity、GNOME、KDE