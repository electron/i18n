---
title: "Electron的新国际化网站"
author: zeke
date: '2017-11-13'
---

Electron 有一个新网站在 [electronjs.org](https://electronjs.org)！ 我们已经用节点.js网络服务器取代了 静态的 Jekyll 网站，使我们能够灵活地 网站国际化，并为更令人兴奋的新功能铺平道路。

---

## 🌍 翻译

我们已经开始了网站国际化的进程，目标是 使Electron应用程序开发能够为全球的 开发者所访问。 我们正在使用一个名为 [Crowdin](https://crowdin.com/project/electron) 的本地化平台，它与GitHub集成了 当内容被翻译成不同语言时，打开和更新拉取请求。

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="简体中文的 Electron 导航">
    <figcaption>简体中文的电子导航</figcaption>
  </a>
</figure>

尽管我们迄今一直在静默地开展这项努力， 超过 75 个Electron 社区成员已经有机地发现了项目 个项目，并参与了网站国际化的努力，以及 将Electron的文档翻译为20多种语言。 我们看到 [每天 来自世界各地的人们](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) 捐款，法语、越南语、印度尼西亚语和汉语等 语言的翻译引领潮流。

要选择您的语言并查看翻译进度，请访问 [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="在 Crowdin 上当前目标语言">
    <figcaption>正在 Crowdin 上进行翻译</figcaption>
  </a>
</figure>

如果你想要帮助翻译Electron的文档 和网站，请访问 [electron/electron-i18n](https://github.com/electron/electron-i18n#readme) repo， 或向右跳转到 翻译于 [Crowdin](https://crowdin.com/project/electron), 您可以在那里登录使用您的 GitHub 帐户。

目前在 Crowdin 上的 Electron 项目启用了21种语言。 添加对更多语言的支持是很容易的，所以如果您对 的帮助翻译感兴趣，但您看不到您的语言列表， [让我们知道](https://github.com/electron/electronjs.org/issues/new) 和 我们会启用它。

## 原始翻译文档

如果您喜欢阅读原始标记文件中的文档，您现在 可以使用任何语言阅读文档：

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## 应用页面

截至今天，任何Electron应用都可以轻松地在 Electron 网站上有自己的页面。 关于一些示例，请查看 [Etcher](https://electronjs.org/apps/etcher), [1剪贴板](https://electronjs.org/apps/1clipboard), 或者 [GraphQL Playfield](https://electronjs.org/apps/graphql-playground), 照片 在日文版的网站上：

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL 游乐场">
  </a>
</figure>

这里有一些令人难以置信的 Electron 应用，但它们并非总是容易找到 ， 而不是每个开发者都有时间或资源来构建一个合适的 网站来推销和分发他们的应用。

仅使用 [PNG 图标文件和少量应用元数据](https://github.com/electron/electron-apps/blob/master/contributing.md)， 我们能够收集很多关于某个应用的信息。 使用从 GitHub 收集的数据，应用程序页面现在可以显示屏幕截图， 下载链接， 有公共仓库的每个应用程序的版本、发布笔记和README。 使用从每个应用图标中提取的调色板 我们可以生成 [粗胆和可访问的颜色](https://github.com/zeke/pick-a-good-color) 给每个应用页面一些可视化的特性。

[应用程序索引页面](https://electronjs.org/apps) 现在也有类别 和关键字过滤器来查找有趣的应用，如 [GraphQL GUIs](https://electronjs.org/apps?q=graphql) 和 [p2p 工具](https://electronjs.org/apps?q=graphql)。

如果您有一个您喜欢在网站上推荐的 Electron 应用程序，请在 [electron/electron-apps](https://github.com/electron/electron-apps) 仓库中打开一个 拉取请求。

## Homebrew 的一行安装

macOS 的 [Homebrew](https://brew.sh) 软件包管理器有一个叫做 [cask](https://caskroom.github.io) 的子命令，这使得在您的 终端中使用单个命令安装桌面应用程序变得容易， 像 `酿造箱安装原子`。

我们已经开始为热门的 Electron 应用程序收集Homebrew 卡片名，并且现在 在有卡片的每个应用程序页 上显示安装命令(对于macOS 访客)：

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>适合您的平台的安装选项：macOS, Windows, Linux</figcaption>
  </a>
</figure>

要查看具有自制程序卡片名称的所有应用，请访问 [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew) 如果 您知道我们尚未索引的其他应用。 [请添加这些应用！](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 一个新域

我们已经将站点从electron.atom.io移动到一个新域： [electronjs.org](https://electronjs.org)。

Electron 项目生于 [Atom](https://atom.io), GitHub的开源文本编辑器 建立在网页技术上。 Electron 原来叫做 `atom-shell`。 Atom 是第一个使用它的应用。 但民间并不需要很长时间才能认识到 这个神奇的 Chromium + 节点运行时间可以用于各种不同的 应用程序。 当像Microsoft 和 Slack这样的公司开始使用 `atom-shell`, 项目显然需要一个新名称。

所以“电子”诞生了。 2016 年初，GitHub 组建了一个新的团队，将 重点放在电子开发和维护上，除了 Atom。 自那时以来的 段时间里，Electron 已被成千上万的应用开发人员所采用，现在许多大公司都依赖电子 ，其中许多公司都有电子团队 自己的团队。

支持 GitHub 的 Electron 项目，例如Atom 和 [GitHub 桌面](https://desktop.github.com) 仍然是我们团队的 优先事项。 但通过移到一个新域，我们希望帮助澄清 Atom和 Electron之间的技术区别。

## 🐢:ro火箭: Node.js

上一个 Electron 网站是使用 [Jekyll](https://jekyllrb.com)、流行的 静态网站生成器构建的。 Jekyl是建立静态网站的一个伟大工具，但 网站已经开始扩展。 我们想要更多的动态能力，如正确的重定向和动态内容渲染，所以 [Node.js](https://nodejs.org) 服务器是一个明显的选择。

Electron 生态系统包括组件用许多 不同编程语言编写的项目，从Python到C++到Bash。 但JavaScript是Electron的基础，而它是我们社区中使用最多的语言。

通过将网站从Ruby迁移到Node.js，我们的目标是降低想要为网站做贡献的人的 条目。

## :hig_voltage: 更容易打开源代码的参与

如果你有 [个节点。 s](https://nodejs.org) (8或更高)和 [git](https://git-scm.org) 安装在您的系统上 您可以轻松获取本地运行的 站点：

```sh
git clone https://github.com/electron/electronijs.org
cd electronjs.org
npm install
npm rune dev
```

新网站位于Heroku。 我们使用部署管道和 [审查应用程序](https://devcenter.heroku.com/articles/github-integration-review-apps) 功能， 它自动为每个拉取的请求创建运行中的应用程序复制 这使得审核者很容易在站点的实时副本上查看 拉取请求的实际效果。

## 🙏 感谢贡献者

我们要特别感谢世界各地所有有 贡献了自己时间和精力来帮助改进Electron的民俗。 开放源码社区 的激情极大地帮助了Electron的成功。 谢谢！

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>