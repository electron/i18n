# 官方指南

请确认你所使用的文档与你的 Electron 版本匹配。 版本号应该是页面URL的一部分。 如果没有，你可能正在使用开发版本分支里的文档，这个分支可能包含了一些与你的 Electron 版本不兼容的 API。 如果想要访问旧版本的文档，你可以[浏览标签](https://github.com/electron/electron/tree/v1.4.0)： 通过在 GitHub 中打开下拉菜单“Switch branches/tags”中选择与你的版本匹配的分支。

## 常见问题 (FAQ)

有些问题经常被问到。 在新建问题之前请先查看：

* [Electron 常见问题 (FAQ)](faq.md)

## 指南和教程

### 入门指南

* [简介](tutorial/introduction.md)
* [快速入门](tutorial/quick-start.md)
* [流程模型](tutorial/process-model.md)

### 学习基础知识

* 为你的应用添加功能
  * [通知（Notifications）](tutorial/notifications.md)
  * [最近文档](tutorial/recent-documents.md)
  * [应用程序进程](tutorial/progress-bar.md)
  * [自定义 Dock 菜单](tutorial/macos-dock.md)
  * [自定义 Windows 任务栏](tutorial/windows-taskbar.md)
  * [自定义 Linux 桌面动作](tutorial/linux-desktop-actions.md)
  * [键盘快捷键](tutorial/keyboard-shortcuts.md)
  * [离线/在线 侦测](tutorial/online-offline-events.md)
  * [macOS BrowserWindows 的代表文件](tutorial/represented-file.md)
  * [原生文件拖放](tutorial/native-file-drag-drop.md)
  * [离屏渲染](tutorial/offscreen-rendering.md)
  * [暗黑模式](tutorial/dark-mode.md)
  * [语言](tutorial/web-embeds.md)
* [模板和命令行界面](tutorial/boilerplates-and-clis.md)
  * [模板与命令行界面](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [其它工具和模板](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### 高级步骤

* 应用架构
  * [使用原生 Node.js 模块](tutorial/using-native-node-modules.md)
  * [性能策略](tutorial/performance.md)
  * [安全策略](tutorial/security.md)
  * [进程沙盒化](tutorial/sandbox.md)
* [辅助功能](tutorial/accessibility.md)
  * [手动启用辅助功能](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [测试和调试](tutorial/application-debugging.md)
  * [调试主进程](tutorial/debugging-main-process.md)
  * [使用Visual Studio Code调试](tutorial/debugging-vscode.md)
  * [使用 Selenium 和 WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [使用自动化持续集成系统 (CI) 进行测试 (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [开发者工具扩展](tutorial/devtools-extension.md)
  * [使用自定义驱动程序进行自动化测试](tutorial/automated-testing-with-a-custom-driver.md)
  * [交互式解释器 (REPL)](tutorial/repl.md)
* [分发](tutorial/application-distribution.md)
  * [支持平台](tutorial/support.md#supported-platforms)
  * [代码签名](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [更新](tutorial/updates.md)
  * [部署更新服务器](tutorial/updates.md#deploying-an-update-server)
  * [在你的应用中实施更新](tutorial/updates.md#implementing-updates-in-your-app)
  * [应用更新](tutorial/updates.md#applying-updates)
* [获得支持](tutorial/support.md)

## 详细教程

这些独立教程扩展了上面指南中所讨论的主题。

* [安装 Electron](tutorial/installation.md)
  * [代理](tutorial/installation.md#proxies)
  * [自定义镜像和缓存](tutorial/installation.md#custom-mirrors-and-caches)
  * [故障排查](tutorial/installation.md#troubleshooting)
* Electron发布 & 开发者反馈
  * [版本规则](tutorial/electron-versioning.md)
  * [发布时间线](tutorial/electron-timelines.md)
* [测试 Widevine CDM](tutorial/testing-widevine-cdm.md)

---

* [术语表](glossary.md)

## API 参考

* [简介](api/synopsis.md)
* [进程对象](api/process.md)
* [支持的命令行开关](api/command-line-switches.md)
* [环境变量](api/environment-variables.md)
* [Chrome 扩展支持](api/extensions.md)
* [重要的API变更](breaking-changes.md)

### 自定义 DOM 元素:

* [`File` 对象](api/file-object.md)
* [`<webview>`标签](api/webview-tag.md)
* [`window.open` 函数](api/window-open.md)
* [`BrowserWindowProProxy` 对象](api/browser-window-proxy.md)

### 主进程可用的模块:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [对话框](api/dialog.md)
* [系统快捷键](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [MessageChannelMain](api/message-channel-main.md)
* [MessagePortMain](api/message-port-main.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [本地主题](api/native-theme.md)
* [通知](api/notification.md)
* [电源监视器](api/power-monitor.md)
* [省电拦截器 | powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [ShareMenu](api/share-menu.md)
* [systemPreferences](api/system-preferences.md)
* [触控板](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### 渲染进程（网页）可用的模块:

* [contextBridge](api/context-bridge.md)
* [ipcRenderer](api/ipc-renderer.md)
* [webFrame](api/web-frame.md)

### 两种进程都可用的模块:

* [剪贴板](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [desktopCapturer](api/desktop-capturer.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## 开发

请查看[development/README.md](development/README.md)
