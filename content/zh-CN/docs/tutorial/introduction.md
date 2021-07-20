# 简介

欢迎来到electron文档中心。 如果你第一次开发electron应用，可以阅读入门部分了解开发基础， 此外，你也可以直接浏览API文档

## Electron是什么？

Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 [Chromium][chromium] 和 [Node.js][node] 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux——不需要本地开发 经验。

## Prerequisites

熟悉该文档之前，需要你有Node.js和web开发经验。 如果您需要了解这两个方面的开发知识，我们推荐您使用以下学习资源：

* [来自Mozilla开发社区(Mozilla Developer Network)的web入门教程][mdn-guide]
* [NodeJS官方入门指南][node-guide]

此外，如果您熟悉Chromium进程模型，您将更好了解 Electron 的工作原理。 You can get a brief overview of Chrome architecture with the [Chrome comic][comic], which was released alongside Chrome's launch back in 2008. 尽管Chrome发布十多年了，【Chrome comic】漫画中介绍的核心原理仍然有助于理解Electron。

## Electron Fiddle运行实例

[Electron Fiddle][fiddle]是由Electron开发并由其维护者支持的沙盒程序。 我们强烈建议将其作为一个学习工具来安装，以便在开发过程中对Electron的api进行实验或对特性进行原型化。

Fiddle 已经完美的集成到我们的帮助文档之中。 当你浏览我们tutorial中的例子的时候，你会发现有个"Open In Electron Fiddler" 按钮在代码示例中。 如果你已经安装了Fiddle, “Open In Electron Fiddle" 按钮回打开一个`fiddle.electronjs.org`链接并加载示例。

## 寻求帮助

还是有疑问？ 请参考一下例子

* 开发过程中如果你需要帮助，我们的 [community Discord server][discord]将是绝佳讨论的地方。
* 如果在开发过程中遇到 `electron` package里的疑难杂症，你可以去 [GitHub issue tracker][issue-tracker] 查看是否有人已经遇到相同的问题。 如果你很幸运的找到bug，欢迎提交issue到github。

[chromium]: https://www.chromium.org/
[node]: https://nodejs.org/
[mdn-guide]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[node-guide]: https://nodejs.dev/learn
[comic]: https://www.google.com/googlebooks/chrome/
[fiddle]: https://electronjs.org/fiddle
[issue-tracker]: https://github.com/electron/electron/issues
[discord]: https://discord.gg/electron
