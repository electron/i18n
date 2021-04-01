---
title: Electron 7.0.0
author:
  - 索菲亚格文
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 已发布！ 它包括升级Chromium 78, V8 7.8和Node.js 12.8.1。 我们已经添加了一个窗口到Arm 64版本，更快的 IPC 方法，一个新的 `本地主题` API，还有更多！

---

Electron 团队很高兴发布Electron 7.0.0！ 您可以通过 `npm 安装electron@later` 或者从我们的 [发布网站](https://electronjs.org/releases/stable) 下载它。 发行版装有升级、修复和新功能。 我们不能等待看到你与他们建立了什么关系！ 继续阅读此版本的详细信息，请分享您拥有的任何反馈！

## 显著更改
 * 堆栈升级：

   | 堆栈...    | Electron 6版本  | Electron 7 中的版本 | 新功能                                                                                                                                                                                                                                                                       |
   |:-------- |:------------- |:--------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Chromium | 76.0.3809.146 | **78.0.3905.1** | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8       | 7.6           | **7.8**         | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js  | 12.4.0        | **12.8.1**      | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * 在 Arm (64 位) 上添加Windows。 [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * 添加 `ipcRender.invoke()` and `ipcMain.handle()` for asynchronous request/response风格IPC 在 `远程` 模块上强烈推荐使用这些内容。 查看”[Electron的“remote”模块认为有害的](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)"博客文章以获取更多信息。 [#18449](https://github.com/electron/electron/pull/18449)
 * 添加 `原生主题` API 来读取并响应OS的主题和颜色方案中的变化。 [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * 已切换到新的 TypeScript 定义 [生成器](https://github.com/electron/docs-parser)。 由此产生的定义更精确；所以如果你的 TypeScript 构建失败，这可能是原因。 [#18103](https://github.com/electron/electron/pull/18103)

更长的更改列表请参阅 [7.0.0 版本备注](https://github.com/electron/electron/releases/tag/v7.0.0)。

## 重大更改

有关这些和未来更改的更多信息可在 [计划打破更改](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md) 页面找到。

 * 已删除废弃的 API：
     * 现在使用Promises的基于回调的函数版本。 [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()` , ,
     * `app.setApplicationMenu()` , ,
     * `powerMonitor.querySystemIdleState()` , ,
     * `powerMonitor.querySystemIdleTime()` , ,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFramework.setIsolatedWorldSecurity源()` [#18159](https://github.com/electron/electron/pull/18159)
 * `session.clearAuthCache()` 不再允许过滤已清除的缓存条目。 [#17970](https://github.com/electron/electron/pull/17970)
 * 在 macOS 上的本地接口 (菜单、对话框等) 现在自动匹配用户机器上的暗色模式设置。 [#19226](https://github.com/electron/electron/pull/19226)
 * 更新 `electron` 模块以使用 `@electron/get`。  最少支持的节点版本现在是 Node 8。 [#18413](https://github.com/electron/electron/pull/18413)
 * 文件 `electron.asar` 不再存在。 任何依赖于它存在的软件包脚本都应该更新。 [#18577](https://github.com/electron/electron/pull/18577)

## 4.x.y 支持结束

Electron 4.x.y 已经按照项目的 [支持政策](https://electronjs.org/docs/tutorial/support#supported-versions) 达到了支持结束。 鼓励开发者和应用程序升级到 Electron 的较新版本。

## 应用反馈项目

我们继续使用我们的 [应用反馈程序](https://electronjs.org/blog/app-feedback-program) 进行测试。 参与此程序测试的 Electron 测试的项目 在他们的应用上； 反过来，他们发现的新的 bug 会被优先排序为 的稳定释放。 如果您想要参与或了解更多信息， [查看我们有关程序的博客文章](https://electronjs.org/blog/app-feedback-program)

## 下一步

短期内， 您可以期待团队继续专注于跟上Electron主要组件的开发工作。 包括Chromium, Node和V8。 尽管我们注意不要就释放日期作出许诺， 我们的计划大约每季度发布新的Electron版本的新版本。 [暂定的 8.0.0 时间表](https://electronjs.org/docs/tutorial/electron-timelines) 映射出了 Electron 8 开发生命周期中的关键日期。 另外， [查看我们的版本化文档](https://electronjs.org/docs/tutorial/electron-versioning) 以获取更多关于Electron版本化的详细信息。

关于 Electron 的预定中断更改的信息， [请参阅我们计划的打破更改。](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)。
