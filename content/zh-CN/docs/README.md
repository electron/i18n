请确认你的使用的文档匹配你的 Electron 版本。 你可以在页面的 URL 中找到版本号。 如果没有，你可能在使用开发版本分支里的文档，这个分支可能包含了一些与你的 Electron 版本不兼容的 API。 如果想要访问旧版本的文档，你可以[browse by tag](https://github.com/electron/electron/tree/v1.4.0)： 通过在GitHub 中打开下拉菜单“Switch branches/tags”中选择与你的版本匹配的分支。

## 常见问题

这里是一些被经常问到的问题，在提 issue 之前请先看一下这里。

* [Electron 常见问题](faq.md)

## 指南

* [术语表](glossary.md)
* [支持的平台](tutorial/supported-platforms.md)
* [安全](tutorial/security.md)
* [版本](tutorial/electron-versioning.md)
* [应用程序的分发](tutorial/application-distribution.md)
* [Mac App Store 应用程序提交指南](tutorial/mac-app-store-submission-guide.md)
* [Windows 商店指南](tutorial/windows-store-guide.md)
* [应用程序打包](tutorial/application-packaging.md)
* [使用原生 Node 模块](tutorial/using-native-node-modules.md)
* [主进程调试](tutorial/debugging-main-process.md)
* [使用 Selenium 和 WebDriver](tutorial/using-selenium-and-webdriver.md)
* [开发者工具拓展](tutorial/devtools-extension.md)
* [使用 Pepper Flash 插件](tutorial/using-pepper-flash-plugin.md)
* [使用 Widevine CDM 插件](tutorial/using-widevine-cdm-plugin.md)
* [使用自动化持续集成系统 (CI) 进行测试 (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [离屏渲染](tutorial/offscreen-rendering.md)
* [键盘快捷键](tutorial/keyboard-shortcuts.md)
* [更新应用程序](tutorial/updates.md)

## 教程

* [快速入门](tutorial/quick-start.md)
* [桌面环境集成](tutorial/desktop-environment-integration.md)
* [在线/离线事件探测](tutorial/online-offline-events.md)
* [交互式解释器 (REPL)](tutorial/repl.md)
* [使用原生通知](tutorial/notifications.md)

## API 参考

* [简介](api/synopsis.md)
* [进程对象](api/process.md)
* [支持的 Chrome 命令行开关](api/chrome-command-line-switches.md)
* [环境变量](api/environment-variables.md)

### 自定义的 DOM 元素:

* [`File` 对象](api/file-object.md)
* [`<webview>`标签](api/webview-tag.md)
* [`window.open` 函数](api/window-open.md)

### 在主进程内可用的模块:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### 在渲染进程（网页）内可用的模块:

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### 在两种进程中都可用的模块:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## 开发

* [编码风格](development/coding-style.md)
* [在 C++ 代码中使用clang-format](development/clang-format.md)
* [源代码的目录结构](development/source-code-directory-structure.md)
* [与 NW.js（原 node-webkit）在技术上的差异](development/atom-shell-vs-node-webkit.md)
* [建立系统概述](development/build-system-overview.md)
* [构建步骤 (macOS)](development/build-instructions-osx.md)
* [构建介绍(Windows)](development/build-instructions-windows.md)
* [构建介绍(Linux)](development/build-instructions-linux.md)
* [调试步骤 (macOS)](development/debugging-instructions-macos.md)
* [调试步骤 (Windows)](development/debug-instructions-windows.md)
* [在调试中使用 Symbol Server](development/setting-up-symbol-server.md)
* [文档风格指南](styleguide.md)
* [升级 Chrome](development/upgrading-chrome.md)
* [Chromium 开发](development/chromium-development.md)
* [V8 开发](development/v8-development.md)