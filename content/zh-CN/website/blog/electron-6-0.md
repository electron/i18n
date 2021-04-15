---
title: Electron 6.0.0
author:
  - 索菲亚格文
  - ckerr
  - codebytere
date: '2019-07-30'
---

Electron 团队很高兴宣布Electron 6.0.0的发布！ 您可以通过 `npm 安装electron@later` 或者从我们的 [发布网站](https://electronjs.org/releases/stable) 下载它。 发行版装有升级、修复和新功能。 我们不能等待看到你与他们建立了什么关系！ 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

---

## 新功能

今天是Electron项目的第一个项目: 这是我们第一次在同一天</strong> 与对应的 [Chrome 稳定版本](https://www.chromestatus.com/features/schedule) 发布稳定的 Electron 版本 **的时候！ 🎉</p>

Electron的大部分功能由Chromium、Node.js和V8的核心组件提供。 Electron随时更新这些项目，为我们的用户提供新的 JavaScript 功能、性能改进和安全修复。 在Electron 6中，每个软件包都有一个主要的版本桶：

- Chromium `76.0.3809.8`
  - [新建于74](https://developers.google.com/web/updates/2019/04/nic74)
  - [新增75个](https://developers.google.com/web/updates/2019/06/nic75)
  - [76年新建的](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [节点 12.4.0 博客文章](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [V8 7.6 博客文章](https://v8.dev/blog/v8-release-76)

该版本还包括改进Electron的API。 [版本备注](https://github.com/electron/electron/releases/tag/v6.0.0) 有一个更完整的列表，但这里是高亮：

### Promisification

Electron 6.0 continues the modernization [initiative](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) started in 5.0 to improve [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) support.

这些函数现在返回承诺并且仍然支持旧的回调：
 * `contentTracking.getcategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracking.getcategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracking.getTraceBufferUs()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppAppase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppAppase.handeProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clear. AuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearhostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearclearStorageData` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  </code>  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

这些功能现在有两种形式，即同步和基于允诺的异步：
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

这些功能现在返回承诺：
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Render).app`, `Electron Helper (GPU).app` and `Electron Helper (Plugin).app`

为了启用 [加固的运行时](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc)， 它限制了像 可写可执行的内存和加载代码，由不同的团队 ID， 需要给予帮助者特殊代码签名权限。

将这些应享权利的范围扩大到需要它们的过程类型， Chromium [添加了](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) 三个新的帮助程序变体：一个用于渲染程序(`Electron Helper (Renderer). pp`, 一个 GPU 进程(`Electron Helper (GPU). pp`) 和 One for plugins (`Electron Helper (Plugin).app`).

使用 `electron-osx-signe` 设计其Electron 应用程序的民俗不应需要对其构建逻辑做任何更改。 如果你用自定义脚本来设计你的应用，你应该确认 这三个新的帮助程序已经被正确地编译。

为了用这些新的助手正确地打包您的应用程序，您需要使用 `electron-packer@14.0.4` 或更高版本。  如果您正在使用 `电子生成器` ，您应该关注 [这个问题](https://github.com/electron-userland/electron-builder/issues/4104) 来跟踪这些新的助手的支持。

## 重大更改

 * 这个版本开始为未来的要求奠定基础，即在渲染器进程中装入本地节点模块必须是 [N-API](https://nodejs.org/api/n-api.html) 或 [Context 意识](https://nodejs.org/api/addons.html#addons_context_aware_addons)。 造成这种变化的原因是业绩更快、安全性更强、维持工作负荷减少。 阅读详细信息，包括 [此问题](https://github.com/electron/electron/issues/18397) 中的拟议时间线 预计此更改将在 Electron v11 中完成。

 * `net.IncomingMessage` headers have [changed slightly](https://github.com/electron/electron/pull/17517#issue-263752903) to more closely match [Node.js behavior](https://nodejs.org/api/http.html#http_message_headers), particularly with the value of `set-cookie` and how duplicate headers are handled. [#1717](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInfolder()` 现在返回无效并且是异步通话。 [#17121](https://github.com/electron/electron/pull/17121)

 * 应用程序现在必须通过调用新函数 `app.setAppLogPath()` 来明确设置日志路径，然后才能使用 `app.getPath('log')` [#17841](https://github.com/electron/electron/pull/17841)

## 3.x.y的支持结束

每我们的 [支持政策](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y 已经到达生命终点。 鼓励开发者和应用程序升级到 Electron 的较新版本。

## 应用反馈项目

我们继续使用我们的 [应用反馈程序](https://electronjs.org/blog/app-feedback-program) 进行测试。 参与此程序测试的项目 Electron 测试他们的应用; 反过来，他们发现的新的 bug 也是稳定释放的优先事项。 如果您想要参与或了解更多信息， [请查看我们有关程序](https://electronjs.org/blog/app-feedback-program) 的博客文章。

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 尽管我们注意不要就释放日期作出许诺， 我们的计划大约每季度发布新的Electron版本的新版本。 [暂定的 7.0.0 时间表](https://electronjs.org/docs/tutorial/electron-timelines) 映射出了 Electron 7 开发生命周期中的关键日期。 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)。
