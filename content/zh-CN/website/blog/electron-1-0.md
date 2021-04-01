---
title: Electron 1.0
author: 吉尔福德
date: '2016-05-11'
---

过去两年来，Electron帮助开发人员使用 HTML、CSS 和 JavaScript 构建交叉平台 桌面应用。 现在我们很高兴为我们的框架和创建它的社区分享一个重要的 里程碑。 Electron 1.0 的版本 现在可从 [electrjs.org](https://electronjs.org) 获得。

---

![Electron 1.0](https://cloud.githubusercontent.com/assets/378023/15007352/315f5eea-1213-11e6-984e-21f5dab31267.png)

Electron 1.0是API稳定性和成熟性的一个重要里程碑。 此 版本允许您构建能够在Windows Mac和Linux 上起作用并真正感觉到本机的应用。 构建Electron应用程序比以往任何时候都更容易，新文档有 个新工具和一个新应用程序来穿过你的 Electron API。

如果您已经准备好构建您的第一个Electron应用程序，这里有一个 [快速启动指南](https://electronjs.org/docs/tutorial/quick-start) 来帮助您启动程序。

我们很高兴看到你使用Electron构建的下一个项目。

## Electron 路径

我们在两年多前启动了 [Atom](https://atom.io) 时发布了Electron。 Electron，后来称为Atom Shell，是我们在上面建造Atom的框架。 在那些日子里， Atom是Electron提供的功能和功能 的驱动力，当我们推出最初的Atom释放的时候。

现在驾车的 Electron 是一个不断增长的开发者社区和公司构建 来自 [email](https://nylas.com)的所有东西， [聊天](https://slack.com)和 [Git 应用](https://www.gitkraken.com) 到 [SQL 分析工具](https://www.wagonhq.com), [种子客户端](https://webtorrent.io/desktop)和 [机器人](https://www.jibo.com)。

在过去两年里，我们看到了两个公司和开源项目 选择Electron作为他们应用的基础。 就在过去一年里，Electron 已经下载120多万次。 [参加一些惊人的 Electron 应用程序的 的游览](https://electronjs.org/apps) ，如果它还不存在，请自己添加。

![Electron 下载](https://cloud.githubusercontent.com/assets/378023/15037731/af7e87e0-12d8-11e6-94e2-117c360d0ac9.png)

## Electron API Demos

连同1。 发布， 我们正在释放一个新的应用程序来帮助您探索 Electron API，并且了解更多关于如何使您的 Electron 应用程序感觉正常的信息。 [Electron API Demos](https://github.com/electron/electron-api-demos) 应用程序包含代码片段以帮助 你启动你的应用程序，并且提示如何有效地使用 Electron API。

[![Electron API Demos](https://cloud.githubusercontent.com/assets/378023/15138216/590acba4-16c9-11e6-863c-bdb0d3ef3eaa.png)][electron-api-demos]

## Devtron

我们还添加了一个新的扩展来帮助您调试您的 Electron 应用。 [Devtron](https://electronjs.org/devtron) 是一个开放源码扩展到 [Chrome 开发者工具](https://developer.chrome.com/devtools) 旨在帮助您查看， 调试和疑难解答您的 Electron 应用。

[![Devtron](https://cloud.githubusercontent.com/assets/378023/15138217/590c8b06-16c9-11e6-8af6-ef96299e85bc.png)][devtron]

### 功能

  * **需要图** 来帮助您在主进程和渲染器进程中可视化应用的内部和外部 库依赖关系
  * **IPC 监视** 可以跟踪和显示您应用中发送和接收的消息
  * **Event inspector** that shows you the events and listeners that are registered in your app on the core Electron APIs such as the window, app, and processes
  * **用于检查您的应用程序有常见错误和缺少 功能的App Linter**

## Spectron

最后，我们正在发布一个新版本的 [Spectron](https://electronjs.org/spectron)，Electron 应用程序的集成 测试框架。

[![Spectron](https://cloud.githubusercontent.com/assets/378023/15138218/590d50c2-16c9-11e6-9b54-2d73729fe189.png)][spectron]

Spectron 3.0 has comprehensive support for the entire Electron API allowing you to more quickly write tests that verify your application's behavior in various scenarios and environments. Spectron 基于 [铬刀][chromedriver] 和 [WebDriverIO][webdriver] ，因此它还具有用于页面导航、用户 输入和 JavaScript 执行的完整 API。

## 社区

Electron 1.0 是数以百计的开发者的社区努力的结果。 在核心框架之外，已经有数百个库和工具 发布，以使构建、包装和部署Electron应用程序更容易。

现在有一个新的 [社区](https://electronjs.org/community) 页面列出了正在开发的许多超棒的 Electron 工具、应用、库和框架。 您也可以 查看 [Electron](https://github.com/electron) 和 [Electron Userland](https://github.com/electron-userland) 组织来查看一些这些奇妙的项目。

Electron新建？ 查看 Electron 1.0 介绍视频：

<div class="video"><iframe src="https://www.youtube.com/embed/8YP_nOCO-4Q?rel=0" frameborder="0" allowfullscreen></iframe></div>
[chromedriver]: https://sites.google.com/a/chromium.org/chromedriver
[devtron]: https://electronjs.org/devtron
[electron-api-demos]: https://github.com/electron/electron-api-demos
[spectron]: https://electronjs.org/spectron
[webdriver]: http://webdriver.io

