# 官方指南

请确认你所使用的文档与你的 Electron 版本匹配。 你可以在页面的 URL 中找到对应的版本号。 如果没有，你可能正在使用开发版本分支里的文档，这个分支可能包含了一些与你的 Electron 版本不兼容的 API。 如果想要访问旧版本的文档，你可以[浏览标签](https://github.com/electron/electron/tree/v1.4.0)： 通过在GitHub 中打开下拉菜单“Switch branches/tags”中选择与你的版本匹配的分支。

## 常见问题 (FAQ)

这里是一些被经常问到的问题，在创建 issue 之前请先看一下这里。

* [Electron 常见问题 (FAQ)](faq.md)

## 指南和教程

* [配置开发环境](tutorial/development-environment.md) 
  * [MacOS开发环境配置](tutorial/development-environment.md#setting-up-macos)
  * [Winodws开发环境配置](tutorial/development-environment.md#setting-up-windows)
  * [Linux开发环境配置](tutorial/development-environment.md#setting-up-linux)
  * [选择一款编辑器](tutorial/development-environment.md#a-good-editor)
* [创建你的第一个应用](tutorial/first-app.md) 
  * [安装 Electron](tutorial/first-app.md#installing-electron)
  * [开发一个简易的 Electron](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [启动你的应用](tutorial/first-app.md#running-your-app)
* [模板和命令行界面](tutorial/boilerplates-and-clis.md) 
  * [模板与命令行界面](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [其它工具和模板](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [应用架构](tutorial/application-architecture.md) 
  * [主进程和渲染进程](tutorial/application-architecture.md#main-and-renderer-processes)
  * [使用 Electron 的 API](tutorial/application-architecture.md#using-electron-apis)
  * [使用Node.js的API](tutorial/application-architecture.md#using-nodejs-apis)
  * [使用原生 Node.js 模块](tutorial/using-native-node-modules.md)
* 为你的应用添加功能 
  * [通知（Notifications）](tutorial/notifications.md)
  * [最近文档（Recent Documents）](tutorial/desktop-environment-integration.md#recent-documents)
  * [应用程序进程](tutorial/progress-bar.md)
  * [自定义 Dock 菜单](tutorial/macos-dock.md)
  * [自定义 Windows 任务栏](tutorial/windows-taskbar.md)
  * [自定义 Linux 桌面动作](tutorial/linux-desktop-actions.md)
  * [键盘快捷键](tutorial/keyboard-shortcuts.md)
  * [离线/在线 侦测](tutorial/online-offline-events.md)
  * [针对 macOS系统 BrowserWindows的展示文件](tutorial/represented-file.md)
  * [原生文件拖放](tutorial/native-file-drag-drop.md)
* [辅助功能](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [启用辅助功能](tutorial/accessibility.md#enabling-accessibility)
* [测试和调试](tutorial/application-debugging.md) 
  * [调试主进程](tutorial/debugging-main-process.md)
  * [使用 Selenium 和 WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [使用自动化持续集成系统 (CI) 进行测试 (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [开发者工具扩展](tutorial/devtools-extension.md)
  * [使用自定义驱动程序进行自动化测试](tutorial/automated-testing-with-a-custom-driver.md)
* 打包 
  * [代码签名](tutorial/code-signing.md)
* [分发](tutorial/application-distribution.md) 
  * [支持](tutorial/support.md)
  * [Mac 应用程序商店](tutorial/mac-app-store-submission-guide.md)
  * [Windows 应用商店](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [安全](tutorial/security.md) 
  * [报告安全问题](tutorial/security.md#reporting-security-issues)
  * [Chromium 安全问题和升级](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron 安全警告](tutorial/security.md#electron-security-warnings)
  * [安全性检查列表](tutorial/security.md#checklist-security-recommendations)
* [更新](tutorial/updates.md) 
  * [部署更新服务器](tutorial/updates.md#deploying-an-update-server)
  * [在你的应用中实施更新](tutorial/updates.md#implementing-updates-in-your-app)
  * [应用更新](tutorial/updates.md#applying-updates)

## 详细教程

这些独立教程扩展了上面指南中所讨论的主题。

* [深入: 安装 Electron](tutorial/installation.md) 
  * [代理](tutorial/installation.md#proxies)
  * [自定义镜像和缓存](tutorial/installation.md#custom-mirrors-and-caches)
  * [故障排查](tutorial/installation.md#troubleshooting)
* [深入: Electron 的版本控制方案](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [稳定分支](tutorial/electron-versioning.md#stabilization-branches)
  * [测试版和Bug修复](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [深入: 用 asar 打包 App 源代码](tutorial/application-packaging.md) 
  * [生成 asar 档案](tutorial/application-packaging.md#generating-asar-archives)
  * [使用 asar 档案文件](tutorial/application-packaging.md#using-asar-archives)
  * [局限性](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [添加未打包的文件到 asar 档案](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [深入: 使用 Pepper Flash 插件](tutorial/using-pepper-flash-plugin.md)
* [深入: 使用 Widevine CDM 插件](tutorial/using-widevine-cdm-plugin.md)
* [离屏渲染](tutorial/offscreen-rendering.md)

* * *

* [术语表](glossary.md)

## API 参考

* [简介](api/synopsis.md)
* [进程对象](api/process.md)
* [支持的 Chrome 命令行开关](api/chrome-command-line-switches.md)
* [环境变量](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

### 自定义 DOM 元素:

* [`File` 对象](api/file-object.md)
* [`<webview>`标签](api/webview-tag.md)
* [`window.open` 函数](api/window-open.md)

### 主进程可用的模块:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
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

### 渲染进程（网页）可用的模块:

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### 两种进程都可用的模块:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## 开发

请查看<development/README.md>