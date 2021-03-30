---
title: '每周的项目：WebTorrent'
author:
  - 铁水
  - zeke
date: '2017-03-14'
---

本周我们抓住了 [@feross](https://github.com/feross) and [@dcposch](https://github.com/dcposch) 来讨论WebTorrent, 网络驱动的 Torrent 客户端，将用户连接在一起，形成一个分布式的、分散的浏览器至浏览器网络。

---

## 什么是 WebTorren？

[WebTorrent](https://webtorrent.io) 是在浏览器中工作的第一个种子客户端。 它完全以 JavaScript 写成，它可以使用 WebRTC 进行对等传输。 无需浏览器插件、扩展或安装。

使用 打开的 Web 标准，WebTorrent 连接网站用户，形成一个分散的浏览器至浏览器网络，以高效传输文件。

您可以在这里看到一个 WebTorrent 演示： [webtorrent.io](https://webtorrent.io/)。

<a href="https://webtorrent.io/">
  <img alt="webTorrent 主页" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## 为什么这个冷却？

想象一个像YouTube这样的视频站点，但访客可以在那里帮助托管网站的内容。 使用 WebTorrent 驱动的网站的人越多，它就会变得更快和更具复原力。

浏览器对浏览器通信会切断中间人的功能，让人们以自己的条款进行交流。 没有更多的客户端/服务器 — — 只是一个对等的同行网络。 WebTorrent 是重新分散网络的旅程中的第一步。

## Electron在哪里拍摄？

大约一年前，我们决定构建 [WebTorrent 桌面](https://webtorrent.io/desktop/)，一个作为桌面应用程序运行的 WebTorrent 版本。

[![WebTorrent 桌面播放器窗口](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

我们创建 WebTorrent 桌面有三个原因：

1. 我们想要一个清洁、轻便、无广告、开源种子应用
2. 我们想要一个支持流媒体的种子应用
3. 我们需要连接BitTorrent 和 WebTorrent 网络的“混合客户端”

## 如果我们已经可以在我的浏览器中下载种子，为什么桌面应用？

首先，关于WebTorrent设计的一些背景。

<a href="https://webtorrent.io/desktop/">
  <img alt="webTorrent 桌面标志" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

最初几天，BitTorrent 使用TCP作为其传输协议。 后来，与三年期全面政策方案相比，技术合作方案的业绩有了较好的前景，也有了较好的优势。 每个主流种子客户端最终都采用了uTP，今天您可以使用BitTorrent 来处理任一协议。 WebRTC协议是下一个合乎逻辑的步骤。 它带来了与 web 浏览器互操作性的希望——一个由所有桌面的 BitTorrent 客户端和数以百万计的 web 浏览器组成的巨型P2P 网络。

“Web 节点” (在浏览器中运行的种子节点) 通过添加数以百万计的新节点使BitTorrent 网络更强大， 并将 BitTorrent 扩展到数十个新的使用案例。 WebTorrent 尽可能密切地遵循BitTorrent 速度，以使现有的 BitTorrent 客户端更容易为WebTorrent 添加支持。

一些种子应用程序如 [Vuze](https://www.vuze.com/) 已经支持友情节点，但我们不想等到其他人添加支持。 **所以基本上，WebTorrent 桌面是我们加快通过 WebTorrent 协议的途径。** 通过制作一个人们真正想要使用的超棒的 Torrent 应用程序， 我们增加网络中可以与 Web 节点共享种子的友点数量 (i)。 . 网站上的用户。

## 除了人们已经知道可以做的事情之外，还有什么有趣的使用种子的案例？

WebTorrent 最令人兴奋的用途之一是同行协助。 [Wikipedia](https://www.wikipedia.org/) 和 [Internet Archive](https://archive.org/) 等非营利项目可以通过让访客加入芯片来减少带宽和托管费用。 热门内容可以提供浏览器对浏览器，快捷且便宜。 可通过原始服务器通过HTTP可靠地提供访问的内容。

互联网存档实际上已经更新了他们的 Torrent 文件，以便他们使用 WebTorrent 进行很好的工作。 所以，如果您想要将互联网存档内容嵌入您的网站中。 您可以降低存档的托管成本， 允许他们拿出更多钱来实际存档网络！

还有一些激动人心的商业使用案例，从CDN到通过P2P发送应用。

## 您最喜欢的一些使用 WebTorren的项目是什么？

![gaia应用截图](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

使用 WebTorrent 构建的最酷的东西，手下可能是 [Gaia 3D 星图](http://charliehoey.com/threejs-demos/gaia_dr1.html)。 这是银河的切片3D交互式模拟。 从浏览器右侧种子加载数据。 通过星系飞行，认识到人类与宇宙的广阔性相比微不足道，是一种激励人心的感觉。

你可以阅读 [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93)中如何做到这一点， 一个博客帖子，作者Charlie Hoey解释了他如何使用WebGL和WebTorrent构建星图。

<a href="https://brave.com/">
  <img alt="勇敢的徽标" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

我们也是 [勇敢的](https://brave.com/) 的巨大粉丝。 勇敢的浏览器会自动阻止广告和跟踪器使网页更快和更安全。 Brave recently added torrent support, so you can [view traditional torrents without using a separate app](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). 此功能由 WebTorrent 提供动力。

因此，就像大多数浏览器可以渲染PDF文件一样，勇敢可以渲染磁力链接和种子文件。 它们只是浏览器本机支持的另一种内容。

勇士的共同创始者之一实际上是JavaScript的创作者Brendan Eich。 我们在 WebTorrent 中写入的语言，所以我们认为勇敢的集成了 WebTorrent 的很酷。

## 您为什么选择在 Electron 上构建WebTorrent 桌面？

<a href="https://webtorrent.io/desktop/">
  <img alt="WebTorrent 桌面主窗口" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Electron应用程序“繁忙”因为在每个应用程序中包含整个Chrome内容模块。 在某些情况下，这部分是真的 (Electron 应用程序安装器通常是 ~40MB, 其中，指定的 OST 安装器通常是 ~20MB)。

然而，在 WebTorrent 桌面中，我们在正常运行过程中使用了几乎所有的 Electron 功能和几十个Chrome 功能。 如果我们想要从零开始为每个平台实现这些功能。 构建我们的应用需要几个月或几年的时间，否则我们只能释放出一个平台。

只是为了获得一个想法，我们使用 Electron 的 [停靠集成](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (以显示下载进度)， [菜单栏集成](https://electronjs.org/docs/api/menu) (在后台运行)， [协议处理程序注册](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (打开磁铁链接)， [省电屏蔽器](https://electronjs.org/docs/api/power-save-blocker/) (防止视频播放时睡眠) 和 [自动更新器](https://electronjs.org/docs/api/auto-updater)。 至于Chrome功能，我们使用了丰富的标签： `<video>` 标签(播放许多不同的视频格式)， `<track>` 标签 (用于隐藏字幕支持)， 拖放支持和WebRTC (在本地应用程序中使用的非微不足道)。

不要提及：我们的种子引擎是用JavaScript写的，并假定存在大量的节点API。 但特别是 `需要 ('net')` 和 `需要('dgram')` 支持TCP 和 UDP 套接字.

基本上，Electron只是我们所需要的东西，我们有一套确切的功能来在创记录的时间内运送一个稳固的、经过磨损的应用程序。

## 您最喜欢的 Electron？

WebTorrent图书馆作为一个开放源码侧项目已经开发了两年。 **我们在四周内制作了WebTorrent 桌面。** Electron是我们能够如此迅速地构建和运送我们的应用的主要原因。

与节点相同。 s 让一代使用 jQuery-的前端程序员可以访问服务器编程。Electron 使熟悉Web 或节点的任何人都可以访问本地应用开发。 s 开发。 电气化极大地增强了能力。

## 网站和桌面客户端共享代码吗？

是的， [`webTorrent` npm 包](https://npmjs.com/package/webtorrent) 可以在 Node.js, 浏览器和 Electron 中工作。 完全相同的代码可以在所有环境中运行 — — 这是JavaScript的美丽。 它是今天的通用运行时间。 Java Applets 答应“写入，运行随处”应用，但由于一些原因，该愿景从未真正实现。 电子比任何其他平台更多的实际上更接近这一理想的黑暗。

## 构建WebTorren时面临哪些挑战？

在应用程序的早期版本中，我们竭力使用户界面表现出来。 我们把种子引擎放在绘制主应用窗口的渲染过程中，可以预计。 当种子引擎的CPU活动频繁时(例如验证从对方收到的种子块)

我们通过将种子引擎移动到第二个隐形渲染过程来修复这个问题，我们与 [IPC](https://electronjs.org/docs/api/ipc-main/) 的通信。 这样，如果该进程简短地使用许多CPU，UI线索就不会受到影响。 黄色平滑滚动和动画非常令人满意。

注意：我们不得不将种子引擎放入渲染过程，而不是“主”过程。 因为我们需要访问 WebRTC (仅在渲染器中可用)

## 应在哪些领域改进Electron？

我们非常希望看到的一件事是更好地记录如何构建和装运准备好的应用， 尤其是围绕代码签名和自动更新等棘手主题。 我们必须通过挖掘源代码和在 Twitter 上询问了解最佳做法！

## WebTorrent 桌面已完成吗？ 如果没有，接下来是什么？

我们认为当前版本的 WebTorrent 桌面很好，但总是有改进的余地。 我们目前正在努力改进授意、性能、字幕支持和视频编解码器支持。

如果你有兴趣参与这个项目，请查看 [我们的 GitHub 页面](https://github.com/feross/webtorrent-desktop)！

## 任何可能对其他开发者有用的 Electron 开发提示？

[Feross](http://feross.org/), 是WebTorrent 桌面贡献者之一， 最近在阿根廷NodeConf 进行了一次谈话 *"真实世界的电子：使用JavaScript构建跨平台桌面应用程序"* 其中含有发布破解的 Electron 应用程序的有用提示。 如果你处于一个基本的工作应用程序的阶段，并且你正在试图将它带到一个更高水平的打造和专业水平上，这个话尤其有用。

[在这里观看](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[滑动在这里](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/)是另一个WebTorrent 贡献者，写了 [你可以做的事情的清单](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) 让你的应用感觉受磨和本土。 它带有代码示例，并涵盖诸如macOS Dock 集成、拖放、桌面通知以及确保您的应用快速加载等事项。

