---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Electron 团队很高兴宣布Electron 5.0.0的发布！ 您可以通过 `npm 安装 electronic @later` 或从 [我们的发布页面](https://github.com/electron/electron/releases/tag/v5.0.0) 下载tarballs 。 发行版装有升级、修复和新功能。 我们不能等待看到你与他们建立了什么关系！ 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

---

## 有什么新鲜事？

Electron的大部分功能由Chromium、Node.js和V8的核心组件提供。 Electron随时更新这些项目，为我们的用户提供新的 JavaScript 功能、性能改进和安全修复。 在Electron 5中，每个软件包都有一个主要的版本块：

- Chromium `73.0.3683.119`
  - [新建于70](https://developers.google.com/web/updates/2018/10/nic70)
  - [新建于71](https://developers.google.com/web/updates/2018/12/nic71)
  - [新建72个](https://developers.google.com/web/updates/2019/01/nic72)
  - [新增73个](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [节点 12 博客文章](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`。
  - [新 JS 功能](https://twitter.com/mathias/status/1120700101637353473)

Electron 5还包括对特定Electron API的改进。 以下是主要更改的摘要；对于全部更改的列表，请参阅 [Electron v5.0.0 版本说明](https://github.com/electron/electron/releases/tag/v5.0.0)。

### Promisification

Electron 5继续 [Promisation倡议](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) 倡议将Electron的回调API转换为使用Promis。 这些API已转换为 Electron 5：
* `app.getFileIcon`
* `contentTracking.get类别`
* `开始录制`
* `停止记录`
* `debugger.sendCommand`
* Cookie API
* `对外打开`
* `文件`
* `载入网址`
* `缩放级别`
* `缩放因子`
* `捕获页面`

### macOS 的系统颜色访问权限

这些函数被更改或添加到 `systemPreferences` 以访问macOS 系统的颜色：
* `systemPreferences.getAccent颜色`
* `getColor`
* `systemPetSystem彩色`

### 进程内存信息

函数 `process.getProcessMemoryInfo` 已被添加，以获取当前进程的内存使用情况统计。

### 为远程 API 添加筛选器

为了提高 `远程` API的安全性，已经添加了新的远程事件，以便 `远程事件。 etBuiltin`, `远程. etCurrentwindow`, `remote.getCurrentWebcontent` and `<webview>.getWebcontent` can be [filed](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows)

### 浏览窗口上的多个浏览器视图

浏览窗口现在支持在同一浏览窗口中管理多个浏览器视图。

## 重大更改

### 封装应用的默认值

封装应用现在的行为与默认应用相同：除非应用有一个，否则将创建默认应用菜单，除非应用处理事件，否则将自动处理 `窗口全部闭结的` 事件。

### 混合沙箱

混合沙盒模式已默认启用。 用 `sandbox启动的渲染器：true` 现在实际上将会被沙盒化，以前如果同时启用混合沙盒模式，他们只会被沙盒。

### 安保改进
`节点集成` and `webviewTag` 的默认值现在是 `false` 以提高安全性。

### 拼写检查器正在异步同步

拼写检查 API 已被更改以提供 [异步结果](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider)。

## 废弃的

下面的 API 在 Electron 5.0.0 中新近被废弃，计划在 6.0.0 中被移除：

### Mksnapshot 二进制武器64
Native binaries of mksnapshot for arm and arm64 are deprecated and will be removed in 6.0.0. Snapshots can be created for arm and arm64 using the x64 binaries.

### Webcontent上的ServiceeWorker APIs
已废弃的 Webcontent上的ServiceWorker API，为其移除做准备。
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### 带沙盒网页内容的自动模块
为了改善安全状况， 以下模块正在废弃，可通过 `直接使用` ，反而需要通过 `远程来包含。 在 sandbox 网页内容中等于`：
* `屏幕`
* `child_process`
* `fs`
* `os`
* `path`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFramework.setIsolatedWorldReadableName`, `webFrame.setIsolatedWorldSecurityorin` 已被弃置为 `webFrame.setIsolatedWorldInfo`

### 混合沙箱
`启用 MixedSandbox` and `--enable-mixed-sandbox` 命令行开关仍然存在以获取兼容性，但已废弃且没有效果。

## 2.0.x 支持结束

每个我们支持的 [版本策略](https://electronjs.org/docs/tutorial/support#supported-versions), 2.0.x 已经到达生命终点。

## 应用反馈项目

我们继续使用我们的 [应用反馈程序](https://electronjs.org/blog/app-feedback-program) 进行测试。 参与此程序测试的项目 Electron 测试他们的应用; 反过来，他们发现的新的 bug 也是稳定释放的优先事项。 如果您想要参与或了解更多信息， [请查看我们有关程序](https://electronjs.org/blog/app-feedback-program) 的博客文章。

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 尽管我们注意不要就释放日期作出许诺， 我们的计划大约每季度发布新的Electron版本的新版本。 [暂定的 6.0.0 时间表](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) 映射出了 Electron 6 开发生命周期中的关键日期。 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)。
