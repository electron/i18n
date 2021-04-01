---
title: Electron 8.0.0
author:
  - jkleinsc
  - 索菲亚格文
date: '2020-02-04'
---

Electron 8.0.0 已发布！ 它包括升级到 Chromium `80`, V8 `8.0`, 和 Node.js `12.13.0`. 我们添加了Chrome的内置拼写检查器和更多！

---

Electron 团队很高兴发布Electron 8.0.0！ 您可以通过 `npm 安装electron@later` 或者从我们的 [发布网站](https://electronjs.org/releases/stable) 下载它。 发行版装有升级、修复和新功能。 我们不能等待看到你与他们建立了什么关系！ 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

## 显著更改

### 堆栈更改
* Chromium `80.0.3987.86`
    * [Chrome 有新版本 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Chrome 有新版本 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [节点 12.13.0 博客文章](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7.9 博客文章](https://v8.dev/blog/v8-release-79)
    * [V8 8.0 博客文章](https://v8.dev/blog/v8-release-80)

### 高亮功能
* 实现使用 Chrome 内置拼写检查功能。 在 [#20692](https://github.com/electron/electron/pull/20692) and [#21266](https://github.com/electron/electron/pull/21266) 中查看更多详情。
* IPC 通信现在使用 v8 的结构克隆算法。 这比现有的逻辑更快，更具功能，也不令人惊奇，给大型缓冲区和复杂物体带来2倍性能。 小型信息的延迟没有受到重大影响。 在 [#20214](https://github.com/electron/electron/pull/20214) 中查看更多详细信息。

查看 [8.0.0 版本备注](https://github.com/electron/electron/releases/tag/v8.0.0) 查看新功能和更改的完整列表。

## 重大更改

* 在对上下文有认识的模块的废弃警告中显示模块名称。 [#21952](https://github.com/electron/electron/pull/21952)
    * 这是为了在渲染器进程中加载的本地节点模块的未来要求继续进行的工作，它要么是 [N-API](https://nodejs.org/api/n-api.html) 或者 [Context 意识](https://nodejs.org/api/addons.html#addons_context_aware_addons)。 详细信息和拟议的时间线在 [这个问题](https://github.com/electron/electron/issues/18397)。
* 通过 IPC 发送的值现在是用结构化的克隆算法序列化的。  [#20214](https://github.com/electron/electron/pull/20214)
* 由于没有维护者来处理此功能，当前禁用了屏幕渲染。  它在Chromium升级期间破裂，随后被禁用。 [#20772](https://github.com/electron/electron/issues/20772)

有关这些和未来更改的更多信息可在 [计划打破更改](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) 页面找到。

## API 更改
* `应用` API 更改：
    * 添加 `app.getApplicationNameForProtocol(url)`。 [#20399](https://github.com/electron/electron/pull/20399)
    * 添加 `app.showAboutPanel()` and `app.setAboutPanelOptions(选项)` 在 Windows 上支持 [#19420](https://github.com/electron/electron/pull/19420)
* `浏览窗口` API 更改：
    * 更新文档以便注意到浏览窗口选项 `hasShadow` 在所有平台上都可用 [#20038](https://github.com/electron/electron/pull/20038)
    * 添加 `流量LightPosition` 选项到浏览器窗口选项，以允许流量灯按钮的自定义位置。 [#21781](https://github.com/electron/electron/pull/21781)
    * 添加 `可访问标题` 选项到浏览器窗口以设置可访问窗口标题 [#1968](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` 现在可以返回 null [#19983](https://github.com/electron/electron/pull/19983)
    * 添加 `BrowserWindow.getMediaSourceId()` and `BrowserWindow.move(mediaSourceId)` [#18926](https://github.com/electron/electron/pull/18926)
    * 添加对 `的支持将在 macOS 上移动` 个事件。 [#19641](https://github.com/electron/electron/pull/19641)
* 文档中原先没有文件 `crashReporter.getCrashesDirectory()`。 [#20417](https://github.com/electron/electron/pull/20417)
* `对话框` API 更改：
    * 添加 `dontAddToRecent` 属性到 `对话框.showOpenDialog` 和 `对话框。 howOpenDialogSync` 防止在打开对话框中将文档添加到最近的文档。 [#19669](https://github.com/electron/electron/pull/19669)
    * 添加属性自定义到 `对话框.showSaveDialog` 和 `对话框.showSaveDialogSync` [#19672](https://github.com/electron/electron/pull/19672)
* `通知` API 更改：
    * 添加 `超时类型` 选项允许Linux/Window用户设置通知超时。 [#20153](https://github.com/electron/electron/pull/20153)
    * 添加 `紧急`  选项以在 Linux 通知上设置紧急性。 [#20152](https://github.com/electron/electron/pull/20152)
* `会话` API 更改：
    * 更新文档 `session.setProxy(config)` 和 `session.setCertificateVerifyProc(proc)` 以便注意可选的选项。 [#19604](https://github.com/electron/electron/pull/19604)
    * 添加 `session.downloadURL(url)` 以便在没有浏览窗口的情况下触发下载。 [#19889](https://github.com/electron/electron/pull/19889)
    * 通过 `session.preconnect(选项)` 和 `预连接` 事件添加了对 HTTP 资源提示的支持。 [#18671](http://github.com/electron/electron/pull/18671)
    * 添加 `session.addWordToSpellCheckerDictionary` 以允许字典中的自定义单词 [#21297](http://github.com/electron/electron/pull/21297)
* 在 macOS 上添加选项到 `shell.moveItemToTrash(fullPath[，deleteOnFail])` 来指定移动物品回收站失败时发生的事情。 [#19700](https://github.com/electron/electron/pull/19700)
* `系统首选项` API 更改：
    * 更新了 `systemPreferences.getColor(color)` 的 macOS 文档。 [#20611](https://github.com/electron/electron/pull/20611)
    * 添加 `屏幕` 媒体类型到 `systemPreferences.getMediaAccessStatus()`。 [#20764](https://github.com/electron/electron/pull/20764)
* 添加 `原生Theme.themeSource` 以允许应用程序覆盖 Chromium 和OS的主题选择。 [#19960](https://github.com/electron/electron/pull/19960)
* 触摸条 API 更改：
    * 将 `无障碍标签` 属性添加到 `触巴按钮` 和 `触巴标签` 以改进触巴按钮/触巴标签的无障碍性。 [#20454](https://github.com/electron/electron/pull/20454)
    * 已更新触摸条相关文档 [#19444](https://github.com/electron/electron/pull/19444)
* `托盘` API 更改：
    * 添加新选项到 `tray.displayBalloon()`: `iconType`, `largicicon`, `noSound` 和 `respectQuiettime`. [#19544](https://github.com/electron/electron/pull/19544)
    * 添加 tray.removeBalloon(), 可以移除已显示的气球通知。 [#19547](https://github.com/electron/electron/pull/19547)
    * 添加 tray.focus(), 它返回焦点到任务栏通知区域。 feate: 添加 tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `webcontent` API 更改：
    * 添加 `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` 以暴露webcontent API上的 executeJavaScriptInIsolatedWorld。 [#21190](https://github.com/electron/electron/pull/21190)
    * 添加了捕获隐藏网络内容的方法。 [#21679](https://github.com/electron/electron/pull/21679)
    * 添加选项到 `webContents.print([options], [callback])` 以启用打印页头和页脚的定制功能。 [#19688](https://github.com/electron/electron/pull/19688)
    * 通过 `webContents.getAllSharedWorkers()` and `webContents.检查SharedWorkerById(workerId)` 来检查特定共享的工人的能力。 [#20389](https://github.com/electron/electron/pull/20389)
    * 在 WebContents.printToPDF() 中添加了 `fitToPageEnabled` 和 `scaleFactor` 选项支持。 [#20436](https://github.com/electron/electron/pull/20436)
* 更新 `webview.printToPDF` 文档以显示返回类型现在是 Uint8Aray。 [#20505](https://github.com/electron/electron/pull/20505)

### 已弃用 API
以下API现已废弃：
* 在下一个主要版本中删除非功能的 `可见OnFullscreen` 选项之前，在 `BrowserWindow.setVisibleOnAllWorkspaces` 中废弃了该选项。 [#21732](https://github.com/electron/electron/pull/21732)
* 已弃用 `替代选择控制文本` on `systemPreferences.getColor(color)` 的 macOS。 [#20611](https://github.com/electron/electron/pull/20611)
* 已废弃的 `setLayoutZoomLevellimits` on `webContent`, `webFrame`, 和 `<webview> 标签` 因为Chromium 删除了此功能。 [#21296](https://github.com/electron/electron/pull/21296)
* 对于 `app.allowRenderProcessReuse` 的默认值 `false` 现已废弃。 [#21287](https://github.com/electron/electron/pull/21287)
* 已弃用 `<webview>.getWebContents()` ，因为它取决于远程模块。 [#20726](https://github.com/electron/electron/pull/20726)

## 5.x.y 支持结束

Electron 5.x.y 已经按照项目的 [支持政策](https://electronjs.org/docs/tutorial/support#supported-versions) 达到了支持结束。 鼓励开发者和应用程序升级到 Electron 的较新版本。

## 应用反馈项目

我们继续使用我们的 [应用反馈程序](https://electronjs.org/blog/app-feedback-program) 进行测试。 参与此程序测试的项目 Electron 测试他们的应用; 反过来，他们发现的新的 bug 也是稳定释放的优先事项。 如果您想要参与或了解更多信息， [请查看我们有关程序](https://electronjs.org/blog/app-feedback-program) 的博客文章。

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 尽管我们注意不要就释放日期作出许诺， 我们的计划大约每季度发布新的Electron版本的新版本。 [暂定的9.0.0 时间表](https://electronjs.org/docs/tutorial/electron-timelines) 映射出了 Electron 9 开发生命周期中的关键日期。 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### 废弃 `远程` 模块(在 Electron 9中启动)
由于严重的安全负债，我们正在开始计划废弃 [`远程` 模块](https://www.electronjs.org/docs/api/remote) 从 Electron 9 开始。 您可以阅读并关注 [这个问题](https://github.com/electron/electron/issues/21408) ，这个问题详细说明了我们这个问题的原因，并且包含了一个废弃的拟议时间线。
