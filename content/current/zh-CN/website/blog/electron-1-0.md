---
title: Electron 1.0
author: 吉尔福德
date: '2016-05-11'
---

过去两年来，Electron帮助开发人员使用 HTML、CSS 和 JavaScript 构建交叉平台 桌面应用。 现在我们很高兴为我们的框架和创建它的社区分享一个重要的 里程碑。 The release of Electron 1.0 is now available from [electronjs.org][electronjs.org].

---

![Electron 1.0](https://cloud.githubusercontent.com/assets/378023/15007352/315f5eea-1213-11e6-984e-21f5dab31267.png)

Electron 1.0是API稳定性和成熟性的一个重要里程碑。 此 版本允许您构建能够在Windows Mac和Linux 上起作用并真正感觉到本机的应用。 构建Electron应用程序比以往任何时候都更容易，新文档有 个新工具和一个新应用程序来穿过你的 Electron API。

If you're ready to build your very first Electron app, here's a [quick start guide][quick-start] to help you get started.

我们很高兴看到你使用Electron构建的下一个项目。

## Electron 路径

We released Electron when we launched [Atom][atom] a little over two years ago. Electron，后来称为Atom Shell，是我们在上面建造Atom的框架。 在那些日子里， Atom是Electron提供的功能和功能 的驱动力，当我们推出最初的Atom释放的时候。

Now driving Electron is a growing community of developers and companies building everything from [email][nylas], [chat][slack], and [Git apps][gitkraken] to [SQL analytics tools][wagon], [torrent clients][webtorrent], and [robots][jibo].

在过去两年里，我们看到了两个公司和开源项目 选择Electron作为他们应用的基础。 就在过去一年里，Electron 已经下载120多万次。 [Take a tour][apps] of some of the amazing Electron apps and add your own if it isn't already there.

![Electron 下载](https://cloud.githubusercontent.com/assets/378023/15037731/af7e87e0-12d8-11e6-94e2-117c360d0ac9.png)

## Electron API Demos

连同1。 发布， 我们正在释放一个新的应用程序来帮助您探索 Electron API，并且了解更多关于如何使您的 Electron 应用程序感觉正常的信息。 The [Electron API Demos][electron-api-demos] app contains code snippets to help you get your app started and tips on effectively using the Electron APIs.

[![Electron API Demos](https://cloud.githubusercontent.com/assets/378023/15138216/590acba4-16c9-11e6-863c-bdb0d3ef3eaa.png)][electron-api-demos]

## Devtron

我们还添加了一个新的扩展来帮助您调试您的 Electron 应用。 [Devtron][devtron] is an open-source extension to the [Chrome Developer Tools][devtools] designed to help you inspect, debug, and troubleshoot your Electron app.

[![Devtron](https://cloud.githubusercontent.com/assets/378023/15138217/590c8b06-16c9-11e6-8af6-ef96299e85bc.png)][devtron]

### 功能

  * **需要图** 来帮助您在主进程和渲染器进程中可视化应用的内部和外部 库依赖关系
  * **IPC 监视** 可以跟踪和显示您应用中发送和接收的消息
  * **Event inspector** that shows you the events and listeners that are registered in your app on the core Electron APIs such as the window, app, and processes
  * **用于检查您的应用程序有常见错误和缺少 功能的App Linter**

## Spectron

Finally, we're releasing a new version of [Spectron][spectron], the integration testing framework for Electron apps.

[![Spectron](https://cloud.githubusercontent.com/assets/378023/15138218/590d50c2-16c9-11e6-9b54-2d73729fe189.png)][spectron]

Spectron 3.0 has comprehensive support for the entire Electron API allowing you to more quickly write tests that verify your application's behavior in various scenarios and environments. Spectron is based on [ChromeDriver][chromedriver] and [WebDriverIO][webdriver] so it also has full APIs for page navigation, user input, and JavaScript execution.

## 社区

Electron 1.0 是数以百计的开发者的社区努力的结果。 在核心框架之外，已经有数百个库和工具 发布，以使构建、包装和部署Electron应用程序更容易。

There is now a new [community][community] page that lists many of the awesome Electron tools, apps, libraries, and frameworks being developed. You can also check out the [Electron][electron-org] and [Electron Userland][electron-userland] organizations to see some of these fantastic projects.

Electron新建？ 查看 Electron 1.0 介绍视频：

<div class="video"><iframe src="https://www.youtube.com/embed/8YP_nOCO-4Q?rel=0" frameborder="0" allowfullscreen></iframe></div>
[apps]: https://electronjs.org/apps
[atom]: https://atom.io
[chromedriver]: https://sites.google.com/a/chromium.org/chromedriver
[community]: https://electronjs.org/community
[devtools]: https://developer.chrome.com/devtools
[devtron]: https://electronjs.org/devtron
[devtron]: https://electronjs.org/devtron
[electronjs.org]: https://electronjs.org
[electron-api-demos]: https://github.com/electron/electron-api-demos
[electron-api-demos]: https://github.com/electron/electron-api-demos
[electron-org]: https://github.com/electron
[electron-userland]: https://github.com/electron-userland
[gitkraken]: https://www.gitkraken.com
[jibo]: https://www.jibo.com
[nylas]: https://nylas.com
[quick-start]: https://electronjs.org/docs/tutorial/quick-start
[slack]: https://slack.com
[spectron]: https://electronjs.org/spectron
[spectron]: https://electronjs.org/spectron
[wagon]: https://www.wagonhq.com
[webtorrent]: https://webtorrent.io/desktop
[webdriver]: http://webdriver.io

