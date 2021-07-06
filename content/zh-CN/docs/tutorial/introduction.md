# 简介

欢迎来到electron文档中心。 如果你第一次开发electron应用，可以阅读入门部分了解开发基础， 此外，你也可以直接浏览API文档

## Electron是什么？

Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 [Chromium][chromium] 和 [Node.js][node] 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux——不需要本地开发 经验。

## 前提条件

熟悉该文档之前，需要你有Node.js和web开发经验。 如果您需要了解这两个方面的开发知识，我们推荐您使用以下学习资源：

* [来自Mozilla开发社区(Mozilla Developer Network)的web入门教程][mdn-guide]
* [NodeJS官方入门指南][node-guide]

此外，如果您熟悉Chromium进程模型，您将更好了解 Electron 的工作原理。 You can get a brief overview of Chrome architecture with the [Chrome comic][comic], which was released alongside Chrome's launch back in 2008. 尽管Chrome发布十多年了，【Chrome comic】漫画中介绍的核心原理仍然有助于理解Electron。

## Electron Fiddle运行实例

[Electron Fiddle][fiddle]是由Electron开发并由其维护者支持的沙盒程序。 我们强烈建议将其作为一个学习工具来安装，以便在开发过程中对Electron的api进行实验或对特性进行原型化。

Fiddle also integrates nicely with our documentation. When browsing through examples in our tutorials, you'll frequently see an "Open in Electron Fiddle" button underneath a code block. If you have Fiddle installed, this button will open a `fiddle.electronjs.org` link that will automatically load the example into Fiddle, no copy-pasting required.

## 寻求帮助

Are you getting stuck anywhere? Here are a few links to places to look:

* If you need help with developing your app, our [community Discord server][discord] is a great place to get advice from other Electron app developers.
* If you suspect you're running into a bug with the `electron` package, please check the [GitHub issue tracker][issue-tracker] to see if any existing issues match your problem. If not, feel free to fill out our bug report template and submit a new issue.

[chromium]: https://www.chromium.org/
[node]: https://nodejs.org/
[mdn-guide]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[node-guide]: https://nodejs.dev/learn
[comic]: https://www.google.com/googlebooks/chrome/
[fiddle]: https://electronjs.org/fiddle
[issue-tracker]: https://github.com/electron/electron/issues
[discord]: https://discord.gg/electron
