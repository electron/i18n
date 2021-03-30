---
title: '每周项目：Kap'
author:
  - skllcrn
  - 休眠之手
  - zeke
date: '2017-01-31'
---

Electron社区正在迅速增长，人们正在以惊人的速度创建强大的 新应用和工具。 庆祝这个创造性的势头 并随时向社区通报其中一些新项目的情况。 我们决定 启动一个每周博客系列，介绍值得注意的 Electron 项目。

---

这个帖子是系列中的第一个帖子，功能 [Kap](https://getkap.co/), 一个开放源码屏幕录制应用由 [Wulkano](https://wulkano.com/)构建， 一个由自由职业设计师和开发者组成的地理分布式团队.

[![捕获屏幕截图](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## 什么是Kap？

[Kap 是一个开放源码屏幕录像机](https://getkap.co) 主要是为设计人员和开发人员制作的，可以轻松地捕捉他们的工作。 人们使用它来分享动画的原型，文档错误，无声创建 GIF 和之间的一切。

我们已经看到所有年龄和背景的人使用它在教育设置，截屏，教程。。。列表继续。 甚至创建生产资产！ 我们被我们的小边项目收到的好东西完全炸掉了。

## 你为什么要构建它？

这是一个很好的问题，不喜欢缺少屏幕记录器！ 我们认为，替代办法要么过于复杂、过于昂贵，要么过于有限。 Nothing felt *just right* for our everyday needs. 我们还认为，如果我们用来开展工作的工具是开诚布公的，那么每个人都能够帮助塑造这些工具。 [Building Kap 的结果与我们没有做到的](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38) 一样多。 这一切都是详细的，是小改进的积聚，成为我们想要使用的工具的轮廓。

然而，也许最重要的是，。 Kap已经成为我们把担心留在门上的场所，只是为自己和像我们这样的人创造乐趣的东西。 创建一个您刚刚通风的环境非常重要，尝试新的细胞并享受您的手工艺。 没有要求、没有压力、没有期望。 设计者和开发者是否应该旁边项目？ 为什么，是。 是的，他们应该这样做。

## 您为什么选择在 Electron上建造Kap？

有若干原因：

* 网络技术
* 团队大多是网络开发者
* 我们投资在 JavaScript
* 它为更多的人做出贡献打开了大门。
* Electron 本身是开源的
* `node_modules 的能量和容易维护的模块`
* 跨平台可能性

我们认为应用的未来是在浏览器中，但我们还不存在。 Electron是走向这一未来的重要一步。 它不仅使应用本身更容易访问，而且也使它们能够与之建立起来的代码。 一个有趣的想法是想象一个未来的操作系统是一个浏览器，而标签基本上是Electron应用程序。

此外，我们主要是网页开发者，是JavaScript异构体无主性质的大粉丝。 你可以在客户端、服务器以及现在的桌面上运行JS。 使用 web tech(HTML、CSS 和 JS)，许多东西比本地简单得多：更快的原型、更少的代码、flexbox > 自动布局(macOS/iOS)。

## 构建Kap时您面临的挑战是什么？

使用 Electron 可以录制屏幕是最大的挑战。 它们的表现不足以满足我们的要求，并使项目在我们眼中失败。 虽然Electron本身并非过错，但本机开发与构建桌面应用程序之间仍然存在差距。

我们花了大量时间试图围绕 `getUserMedia` API的不良性能工作，这是一个源于Chromium的问题。 当我们打算制造Kap时，我们的主要目标之一是使用网络技术构建整个应用程序。 在尝试尽一切努力使它发挥作用（至少需要在视网膜屏幕上30个FPS）， 我们最终不得不找到另一个解决办法。

## 我在仓库中看到一些Swift代码。 这是什么呢？

我们被迫寻找 `getUserMedia`的替代品，我们开始试用 `ffmpeg`。 除了是音频和视频转换的最佳工具之一外，它还有在几乎任何操作系统中录制屏幕的功能。 并且我们能够在视网膜屏幕上录制出至少30台FPS的视频。 问题? 性能是:weary:", CPU 使用率正在线. 因此，我们回到了绘图板上，讨论了我们的备选办法，并认识到我们必须作出妥协。 这导致 [Aperture](https://github.com/wulkano/aperture), 我们自己的屏幕录制库在 Swift 中写入 macOS 。

## 应在哪些领域改进Electron？

我们都知道，Electron应用可以使用RAM，但这也是一件真正是Chromium的事情。 它是如何运作的一部分，它真正取决于你正在运行的内容， 例如，Kap 和 Hyper通常使用少于100MB 的内存。

我们认为最大的改进领域之一是有效载荷，尤其是Electron如何分布Chromium。 一个想法是拥有一个共享的 Electron 核心，让应用安装者检查它是否已经存在于系统中。

创建跨平台的 Electron 应用程序可能是更好的体验。 现在，平台之间存在太多不一致、特定平台的 API 以及缺少的功能，使您的代码库与其他if语句混合。 例如，活力只在 macOS上被支持，自动更新器在 macOS 和 Windows上的工作不同，甚至在 Linux 上也不支持。 透明度是对Linux的打击或失误，通常错过。

也应该更容易呼叫本地系统 API。 Electron 带有非常好的 API，但有时您需要它不提供的功能。 创建一个原生的 Node.js 插件是一个选项，但是很痛苦地工作。 最好是 Electron 的配送好的 [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) API，如 [`快速调用`](https://github.com/cmake-js/fastcall)。 这将使我们能够在 JavaScript 中写入 Swift 部件。

## 您最喜欢的 Electron？

我们最喜欢的是，任何人如具备为网络创建的知识，都可以建立和促进多平台本地经验。 更不用说在这个问题上发展起来的容易和喜悦、出色的记录和蓬勃发展的生态系统。

从前端的角度来看，Building Kap与使用浏览器 API 构建一个简单的网站没有什么不同。 Electron 在使应用开发类似于网页开发方面做了非常出色的工作(基本相同)。 这样简单的事实是，不需要框架或类似的框架来帮助我们，只需要干净和模块化的联合服务系统和CSS。

我们也是团队建设的巨大推动者，他们的奉献精神和支持，以及他们所保持的积极友好社区。 你们大家都知道这个问题！

## Kap的下一步是什么？

我们的下一步是在为我们的2.0做准备时审查应用程序。 里程碑，除支持插件外，还包括React重写，允许开发者扩展Kap的功能！ 我们邀请大家关注我们的 [GitHub 仓库](https://github.com/wulkano/kap) 项目并做出贡献。 我们正在听取你们尽可能多的人的意见。 [让我们知道我们如何使Kap成为它能够为您提供的最好的工具](https://wulkano.typeform.com/to/BIvJKz)！

## Wulkano是什么？

[Wulkano](https://wulkano.com) 是一个设计演播室和数字集体。 一组遥远的技术人员，他们热爱在客户的吉吉和我们自己的项目上合作。 我们是来自不同地点和背景、分享知识、想法和经验、经验的分散但紧凑的一群人。 但最重要的是，在我们的虚拟办事处(恰好是基于 Electron 的Slack!)中隐性的 GIF 和备注。

## 任何可能对其他开发者有用的 Electron 提示？

利用并参与奇异的 [社区](https://discuss.atom.io/c/electron), 查看 [非常棒的电子](https://github.com/sindresorhus/awesome-electron), 查看 [示例](https://github.com/electron/electron-api-demos) 并利用伟大的 [docs](https://electronjs.org/docs/)！

