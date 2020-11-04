---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

经过四个多月的开发，八次测试版发布，世界各地的许多应用的挂起滚动 测试，Electron 2的发布。 0 现在 可从 [electronjs.org](https://electronjs.org/) 获取。

---

## 发布进程

从2.0.0开始，Electron的版本将跟随 [语义版本](https://electronjs.org/blog/electron-2-semantic-boogaloo)。 这意味着主要版本将更频繁地跳转，并且通常是Chromium的重要更新。 补丁发布应该更加稳定，因为它们只包含高度优先的错误修复。

Electron 2.0 也是对 Electron 在主要释放之前如何稳定化的一种改进。 几个大规模的 Electron 应用已经在分阶段滚动中包含了2.0.0 测试版，提供了最好的反馈循环 Electron为测试系列提供了最好的反馈。

## 更改/新功能

 * Electron工具链的几个重要部分的主要组分，包括Chrome 61，Node 8.9.3，V8 6.1.534.41，Linux的GTK+3，更新的拼写检查器和Squirel。
 * [现在在 MacOS 上支持应用内购买](https://electronjs.org/blog/in-app-purchases) [#11292](https://github.com/electron/electron/pull/11292)
 * 新的 API 以加载文件。 [#11565](https://github.com/electron/electron/pull/11565)
 * 启用/禁用窗口的新API。 [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * 新支持日志记录 IPC 消息。 [#11880](https://github.com/electron/electron/pull/11880)
 * 新的菜单事件。 [#11754](https://github.com/electron/electron/pull/11754)
 * 向 powerMonitor添加 `关闭` 事件。 [#11417](https://github.com/electron/electron/pull/11417)
 * 添加 `亲和` 选项用于将几个浏览器视窗集成到一个单一过程。 [#11501](https://github.com/electron/electron/pull/11501)
 * 添加保存对话框的能力来列出可用的扩展。 [#11873](https://github.com/electron/electron/pull/11873)
 * 支持附加通知操作 [#11647](https://github.com/electron/electron/pull/11647)
 * 设置 macOS 通知关闭按钮标题的能力。 [#11654](https://github.com/electron/electron/pull/11654)
 * 为menu.popup(window, callback)添加条件
 * 触摸条项目内存改进。 [#12527](https://github.com/electron/electron/pull/12527)
 * 改进安全建议清单。
 * 添加 App-Scoped Security scoped 书签。 [#11711](https://github.com/electron/electron/pull/11711)
 * 在渲染过程中添加任意参数的能力。 [#11850](https://github.com/electron/electron/pull/11850)
 * 为格式选择器添加配件视图。 [#11873](https://github.com/electron/electron/pull/11873)
 * 固定网络代表种族条件。 [#12053](https://github.com/electron/electron/pull/12053)
 * 在 Linux 上丢弃对 `mips64el` 参数的支持。 Electron 需要 C++14 工具链，它在 发布时不可用。 我们希望今后再增加支持。

## 打破API更改

 * 已删除 [已废弃的 API](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md)，包括：
   * 更改 `menu.popup` 签名。 [#11968](https://github.com/electron/electron/pull/11968)
   * 已删除已废弃的 `crashReporter.setExtraameter` [#11972](https://github.com/electron/electron/pull/11972)
   * 已删除已废弃的 `webContents.setZoomLevellimits` 和 `webFrame.setZoomLevelLimites`。 [#11974](https://github.com/electron/electron/pull/11974)
   * 删除了已废弃的 `剪贴板` 方法。 [#11973](https://github.com/electron/electron/pull/11973)
   * 已删除对 `tray.setHighlightMode` 布尔参数的支持。 [#11981](https://github.com/electron/electron/pull/11981)

## Bug 修复

 * 更改以确保 `webContents.isOffscreen()` 始终可用。 [#12531](https://github.com/electron/electron/pull/12531)
 * 修复 `DevTools 解锁和焦点时的 BrowserWindow.getFocusedWindow()`。 [#12554](https://github.com/electron/electron/pull/12554)
 * 修复如果预加载路径包含特殊字符未加载到沙盒渲染中。 [#12643](https://github.com/electron/electron/pull/12643)
 * 校正 allowRunningInsecureContent 的默认值 [#12629](https://github.com/electron/electron/pull/12629)
 * 修复本地图像的透明度。 [#12683](https://github.com/electron/electron/pull/12683)
 * 修复 `Menu.buildFrom模板` 的问题。 [#12703](https://github.com/electron/electron/pull/12703)
 * 已确认的菜单弹出选项是对象。 [#12330](https://github.com/electron/electron/pull/12330)
 * 删除新流程创建和环境发布之间的种族条件。 [#12361](https://github.com/electron/electron/pull/12361)
 * 更改浏览器视图时更新可拖动区域。 [#12370](https://github.com/electron/electron/pull/12370)
 * 固定菜单栏切换焦点上的替代键检测 [#12235](https://github.com/electron/electron/pull/12235)
 * 修复网站视图中的不正确警告。 [#12236](https://github.com/electron/electron/pull/12236)
 * 固定从父窗口继承“show”选项。 [#122444](https://github.com/electron/electron/pull/122444)
 * 确认 `getLastCrashReport()` 实际上是最后一次崩溃报告。 [#12255](https://github.com/electron/electron/pull/12255)
 * 修复网络共享路径上的需要。 [#12287](https://github.com/electron/electron/pull/12287)
 * 固定上下文菜单点击回调。 [#12170](https://github.com/electron/electron/pull/12170)
 * 修复弹出菜单位置。 [#12181](https://github.com/electron/electron/pull/12181)
 * 改进了 libuv 循环清理。 [#11465](https://github.com/electron/electron/pull/11465)
 * 修复 `六色彩DWORDToRGBA` 以获取透明的颜色。 [#11557](https://github.com/electron/electron/pull/11557)
 * 以getWeb首选项api修复无效指针去除引用。 [#12245](https://github.com/electron/electron/pull/12245)
 * 修复菜单代表中的循环参考。 [#11967](https://github.com/electron/electron/pull/11967)
 * 固定的 net.request 的协议过滤。 [#11657](https://github.com/electron/electron/pull/11657)
 * WebFramework.setVisualZoomLevelLimited 现在设置用户代理比例约束 [#12510](https://github.com/electron/electron/pull/12510)
 * 设置网页视图选项的适当默认值。 [#12292](https://github.com/electron/electron/pull/12292)
 * 改善自生支持。 [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * 修复单一信片灯具中的时间问题。
 * 在 NotifierSupportsActions() 中修复已损坏的生产缓存
 * 制作菜单项角色camelCase-compatible。 [#11532](https://github.com/electron/electron/pull/11532)
 * 改进的触摸条更新。 [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * 移除附加菜单分隔符。 [#11827](https://github.com/electron/electron/pull/11827)
 * 修复蓝牙选择器bug。 关闭 [#1199](https://github.com/electron/electron/pull/11399)。
 * 修复macos 全屏切换菜单项标签。 [#11633](https://github.com/electron/electron/pull/11633)
 * 当窗口停用时改进的工具提示隐藏。 [#11644](https://github.com/electron/electron/pull/11644)
 * 迁移过时的网页视图方法。 [#11798](https://github.com/electron/electron/pull/11798)
 * 修复关闭从浏览器打开的窗口。 [#11799](https://github.com/electron/electron/pull/11799)
 * 修复蓝牙选择器bug。 [#11492](https://github.com/electron/electron/pull/11492)
 * 已更新以使用 app.getFileicon API的任务调度器。 [#11595](https://github.com/electron/electron/pull/11595)
 * 即使在放出屏幕后，也会切换为闪烁 `控制台消息` 事件。 [#11921](https://github.com/electron/electron/pull/11921)
 * 修复使用 `WebContents.downloadURL` 从自定义协议下载。 [#11804](https://github.com/electron/electron/pull/11804)
 * 修复移除工具时透明窗口失去透明度。 [#11956](https://github.com/electron/electron/pull/11956)
 * 固定的 Electron 应用取消重启或关机。 [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * 修复触摸条项目重新使用时的事件泄漏。 [#12624](https://github.com/electron/electron/pull/12624)
 * 在深色模式中固定托盘高亮。 [#12398](https://github.com/electron/electron/pull/12398)
 * 修复异步对话框阻止主进程。 [#12407](https://github.com/electron/electron/pull/12407)
 * 修复 `设置标题` 托盘崩溃。 [#12356](https://github.com/electron/electron/pull/12356)
 * 修复设置基座菜单时崩溃的问题。 [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * 更好的 Linux 桌面通知。 [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * 更好的 GTK+ 主题支持菜单。 [#12331](https://github.com/electron/electron/pull/12331)
 * 在 linux 上出色退出。 [#12139](https://github.com/electron/electron/pull/12139)
 * 使用应用程序的名称作为托盘图标的默认提示。 [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * 已添加 Visual Studio 2017 支持。 [#11656](https://github.com/electron/electron/pull/11656)
 * 修复了系统崩溃处理程序的异常传递。 [#12259](https://github.com/electron/electron/pull/12259)
 * 从最小化窗口中固定隐藏工具提示。 [#11644](https://github.com/electron/electron/pull/11644)
 * 修复 `桌面捕获器` 捕获正确的屏幕。 [#11664](https://github.com/electron/electron/pull/11664)
 * 修复 `禁用硬件加速` 透明性。 [#11704](https://github.com/electron/electron/pull/11704)

# 下一步

Electron团队正在努力支持较新版本的Chromium, Node和 v8。 预计3.0.0-beta.1！
