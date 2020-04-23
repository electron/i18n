# 官方指南

请确认你所使用的文档与你的 Electron 版本匹配。 你可以在页面的 URL 中找到对应的版本号。 如果没有，你可能正在使用开发版本分支里的文档，这个分支可能包含了一些与你的 Electron 版本不兼容的 API。 如果想要访问旧版本的文档，你可以[浏览标签](https://github.com/electron/electron/tree/v1.4.0)： 通过在 GitHub 中打开下拉菜单“Switch branches/tags”中选择与你的版本匹配的分支。

## 常见问题 (FAQ)

There are questions that are asked quite often. Check this out before creating an issue:

* [Electron 常见问题 (FAQ)](faq.md)

## 指南和教程

* [配置开发环境](tutorial/development-environment.md)
  * [macOS 开发环境配置](tutorial/development-environment.md#setting-up-macos)
  * [Windows 开发环境配置](tutorial/development-environment.md#setting-up-windows)
  * [Linux 开发环境配置](tutorial/development-environment.md#setting-up-linux)
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
  * [主进程和渲染器进程](tutorial/application-architecture.md#main-and-renderer-processes)
  * [使用 Electron 的 API](tutorial/application-architecture.md#using-electron-apis)
  * [使用 Node.js 的API](tutorial/application-architecture.md#using-nodejs-apis)
  * [使用原生 Node.js 模块](tutorial/using-native-node-modules.md)
  * [性能策略](tutorial/performance.md)
* 为你的应用添加功能
  * [通知](tutorial/notifications.md)
  * [最近的文件](tutorial/recent-documents.md)
  * [应用程序进程](tutorial/progress-bar.md)
  * [自定义 Dock 菜单](tutorial/macos-dock.md)
  * [自定义 Windows 任务栏](tutorial/windows-taskbar.md)
  * [自定义 Linux 桌面动作](tutorial/linux-desktop-actions.md)
  * [键盘快捷键](tutorial/keyboard-shortcuts.md)
  * [离线/在线 侦测](tutorial/online-offline-events.md)
  * [针对 macOS 系统 BrowserWindows 的展示文件](tutorial/represented-file.md)
  * [原生文件拖 & 放](tutorial/native-file-drag-drop.md)
  * [离屏渲染](tutorial/offscreen-rendering.md)
  * [支持 macOS 深色模式](tutorial/mojave-dark-mode-guide.md)
  * [语言](tutorial/web-embeds.md)
* [辅助功能](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [启用辅助功能](tutorial/accessibility.md#enabling-accessibility)
* [测试和调试](tutorial/application-debugging.md)
  * [调试主进程](tutorial/debugging-main-process.md)
  * [Débogguer le Main Process avec Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [使用 Selenium 和 WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [使用自动化持续集成系统 (CI) 进行测试 (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [开发者工具拓展](tutorial/devtools-extension.md)
  * [使用自定义驱动程序进行自动化测试](tutorial/automated-testing-with-a-custom-driver.md)
* [分发](tutorial/application-distribution.md)
  * [支持平台](tutorial/support.md#supported-platforms)
  * [代码签名](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
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
  * [应用反馈项目](tutorial/app-feedback-program.md)
* [用 asar 打包 App 源代码](tutorial/application-packaging.md)
  * [生成 asar 档案](tutorial/application-packaging.md#generating-asar-archives)
  * [使用 asar 档案文件](tutorial/application-packaging.md#using-asar-archives)
  * [局限性](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [添加未打包的文件到 asar 档案](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [测试 Widevine CDM](tutorial/testing-widevine-cdm.md)
* [使用 Pepper Flash 插件](tutorial/using-pepper-flash-plugin.md)

---

* [术语表](glossary.md)

## API 参考

* [简介](api/synopsis.md)
* [进程对象](api/process.md)
* [支持的命令行开关](api/command-line-switches.md)
* [环境变量](api/environment-variables.md)
* [Chrome Extensions Support](api/extensions.md)
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
* [网络](api/net.md)
* [netLog](api/net-log.md)
* [通知](api/notification.md)
* [电源监视器](api/power-monitor.md)
* [省电拦截器 | powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [触控板](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### 渲染进程（网页）可用的模块:

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### 两种进程都可用的模块:

* [剪贴板](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## 开发

请查看[development/README.md](development/README.md)
