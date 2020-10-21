---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

Electron团队很高兴地宣布，Electron 3的第一次稳定版本现在是 可从 [electrjs 获得。 rg](https://electronjs.org/) 并且通过 `npm 安装电子@later`！ 它装有升级、修复和新功能，我们不能等着看看你用它们来构建什么。 下面是这次发布的详细信息，我们欢迎您在探索时的反馈。

---

## 发布进程

当我们开始开发 `v3.0 时。`, 我们试图通过正式确定渐进测试版的反馈进度来更多地以经验为基础界定稳定发布的标准。 `v3.0 如果没有我们的 <a href="https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md">App反馈方案</a> 合作伙伴，` 本来是不可能的。 在测试周期内提供早期测试和反馈。 感谢Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code和其他程序成员所做的工作。 If you'd like to participate in future betas, please mail us at [info@electronjs.org](mailto:info@electronjs.org).

## 更改/新功能

Electron工具链的几个重要部分的主要块，包括Chrome `v66.0.3359.181`, Node `v10.2.0`, 和 V8 `v6.6.346.23。`

* [[#12656](https://github.com/electron/electron/pull/12656)] 功能： `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] 功能： `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] 功能： `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] 功能： `win.moveTop()` 将窗口z-顺序移动到顶端
* [[#13110](https://github.com/electron/electron/pull/13110)] 功能: TextField and Button API
* [[#13068](https://github.com/electron/electron/pull/13068)] 功能: netLogAPI 用于动态日志控制
* [[#13539](https://github.com/electron/electron/pull/13539)] 功能：在沙盒渲染器中启用 `webview`
* [[#14118](https://github.com/electron/electron/pull/14118)] 功能： `fs.readSync` 现在可以使用大量文件
* [[#14031](https://github.com/electron/electron/pull/14031)] 功能：节点 `fs` 封装程序以做 `fs.realpathSync.norigin` 和 `fs.realpath.norigin` 可用

## 打破API更改

* [[#12362](https://github.com/electron/electron/pull/12362)] 功能：更新到菜单项订单控制
* [[#13050](https://github.com/electron/electron/pull/13050)] 重置: 已删除已被记录废弃的 API
  * 更多详情请访问 [docs](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30)
* [[#12477](https://github.com/electron/electron/pull/12477)] 重置: `did-get-response-details` 和 `did-get-redirect-request` 事件
* [[#12655](https://github.com/electron/electron/pull/12655)] 功能：默认禁用在拖放时导航。
* [[#12993](https://github.com/electron/electron/pull/12993)] 功能：Node `v4.x` 或更多，需要使用 `electron` npm 模块
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) </a> [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactor: `NativeWind`
* [[#11968](https://github.com/electron/electron/pull/11968)] 重因子: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] 功能：不再使用 JSON 发送 `ipcRender.sendSync 的结果`
* [[#13039](https://github.com/electron/electron/pull/13039)] 功能：默认忽略跟随URL的命令行参数
* [[#12004](https://github.com/electron/electron/pull/12004)] 重定因素：重命名 `api::window` 到 `api::BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] 功能：视觉缩放已默认关闭
* [[#12408](https://github.com/electron/electron/pull/12408)] 重定因素: 重命名应用程序命令 `media-play_pause` 到 `媒体-播放暂停`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] 功能：支持工作区通知
* [[#12496](https://github.com/electron/electron/pull/12496)] 功能： `tray.setIgnoreeDoubleClickEvents(忽略)` 忽略托盘双击事件。
* [[#12281](https://github.com/electron/electron/pull/12281)] 功能：在macOS 上鼠标前进功能
* [[#12714](https://github.com/electron/electron/pull/12714)] 功能：屏幕锁定/解锁事件

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] 功能：将DIP 添加到/从屏幕坐标转换为

**注福利：** 在运行此版本后切换到旧版本的 Electron 将要求您清除您的用户数据目录，以避免旧版本崩溃。 您可以通过运行 `console.log(app.getPath("userData")) 获取用户数据目录` 或查看 [文档](https://electronjs.org/docs/api/app#appgetpathname) 了解更多详情。

## Bug 修复

* [[#13397](https://github.com/electron/electron/pull/13397)] 修复：问题 `fs.statSyncNoException` 丢弃异常
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] 修复：使用 jquery 装入网站时崩溃了
* [[#14092](https://github.com/electron/electron/pull/14092)] 修复: 崩溃于 `net::ClientSocketHandle` 销毁器
* [[#14453](https://github.com/electron/electron/pull/14453)] 修正：立即通知焦点更改而不是下一个刻度

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] 修复：允许在 `中选择捆绑包的问题<input file="type">` 打开文件对话框
* [[#12404](https://github.com/electron/electron/pull/12404)] 修复：在使用异步对话框时阻止主进程时出现问题
* [[#12043](https://github.com/electron/electron/pull/12043)] 修正：上下文菜单单击回调
* [[#12527](https://github.com/electron/electron/pull/12527)] 修复：重新使用触摸条项目时发生事件泄漏。
* [[#12352](https://github.com/electron/electron/pull/12352)] 修复：托盘标题故障
* [[#12327](https://github.com/electron/electron/pull/12327)] 修正：不可拖动区域
* [[#12809](https://github.com/electron/electron/pull/12809)] 修复：防止菜单在打开时更新
* [[#13162](https://github.com/electron/electron/pull/13162)] 修复：托盘图标界面不允许负值
* [[#13085](https://github.com/electron/electron/pull/13085)] 修正：高亮时托盘标题不会反转
* [[#12196](https://github.com/electron/electron/pull/12196)] 修复: Mac building when `enable_run_as_node=false`
* [[#12157](https://github.com/electron/electron/pull/12157)] 修正：有活力的帧面窗口上的额外问题
* [[#13326](https://github.com/electron/electron/pull/13326)] 修正：调用 `app.removeAsDefaultProtocol客户端` 后将 mac 协议设置为无
* [[#13530](https://github.com/electron/electron/pull/13530)] 修正：在 MAS 构建中私人API使用不正确
* [[#13517](https://github.com/electron/electron/pull/13517)] 修复： `托雷.setextMension` 故障
* [[#14205](https://github.com/electron/electron/pull/14205)] 修复：在对话框中按下转义即使设置了 `默认ID` 也会关闭它。

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] 修正： `BrowserWindow.focus()` 用于离屏窗口

## 其他说明

* PDF 查看器目前不工作，但正在运行，将很快重新运行
* `TextField` and `按钮` API是实验性的，因此默认关闭
  * 可以使用 `enable_view_api` 构建标志启用这些功能

# 下一步

Electron团队继续致力于确定我们的流程，以便更加迅速和顺利地升级，同时我们将努力最终保持与Chromium发展干部的对等。 节点和 V8。
