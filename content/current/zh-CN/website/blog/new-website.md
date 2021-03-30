---
title: "Electron的新国际化网站"
author: zeke
date: '2017-11-13'
---

电子有一个新的网站在 [electronjs.org][]！ We've replaced our static Jekyll site with a Node.js webserver, giving us flexibility to internationalize the site and paving the way for more exciting new features.

---

## 🌍 翻译

我们已经开始了网站国际化的进程，目标是 使Electron应用程序开发能够为全球的 开发者所访问。 我们使用的是名为 [Crowdin][] 的本地化平台，该平台将 与 GitHub 集成在一起，当内容被翻译成不同的语言时，会自动打开和更新拉拔请求。

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="简体中文的 Electron 导航">
    <figcaption>简体中文的电子导航</figcaption>
  </a>
</figure>

尽管我们迄今一直在静默地开展这项努力， 超过 75 个Electron 社区成员已经有机地发现了项目 个项目，并参与了网站国际化的努力，以及 将Electron的文档翻译为20多种语言。 We are seeing [daily contributions](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) from people all over the world, with translations for languages like French, Vietnamese, Indonesian, and Chinese leading the way.

要选择您的语言并查看翻译进度，请访问 [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="在 Crowdin 上当前目标语言">
    <figcaption>正在 Crowdin 上进行翻译</figcaption>
  </a>
</figure>

如果您是多语种的，并有兴趣帮助翻译电子的文档 和网站，访问 [电子/电子-i18n][] 回购，或跳入 翻译 [克劳丁][]，在那里你可以登录使用您的GitHub帐户。

目前在 Crowdin 上的 Electron 项目启用了21种语言。 添加对更多语言的支持是很容易的，所以如果您对 的帮助翻译感兴趣，但您看不到您的语言列表， [让我们知道](https://github.com/electron/electronjs.org/issues/new) 和 我们会启用它。

## 原始翻译文档

If you prefer to read documentation in raw markdown files, you can now do that in any language:

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

只需使用一个 [PNG图标文件和少量的应用程序元数据](https://github.com/electron/electron-apps/blob/master/contributing.md)， ，我们能够收集很多有关给定应用程序的信息。 使用从 GitHub 收集的数据，应用页面现在可以显示屏幕截图、 下载链接、版本、发布说明和 READMEs，用于 拥有公共存储库的每个应用。 使用从每个应用图标中提取的调色板 我们可以生成 [粗胆和可访问的颜色](https://github.com/zeke/pick-a-good-color) 给每个应用页面一些可视化的特性。

[应用程序索引页面](https://electronjs.org/apps) 现在也有类别 和关键字过滤器来查找有趣的应用，如 [GraphQL GUIs](https://electronjs.org/apps?q=graphql) 和 [p2p 工具](https://electronjs.org/apps?q=graphql)。

如果您有一个电子应用程序，你想在网站上特色，打开一个 拉请求 [电子/电子应用程序][] 存储库。

## Homebrew 的一行安装

macOS 的 [自制][] 包管理器有一个名为 [木桶][] 的子通信，便于在 终端中使用单个命令安装桌面应用程序，如 `brew cask install atom`。

我们已经开始为热门的 Electron 应用程序收集Homebrew 卡片名，并且现在 在有卡片的每个应用程序页 上显示安装命令(对于macOS 访客)：

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>适合您的平台的安装选项：macOS, Windows, Linux</figcaption>
  </a>
</figure>

要查看具有自制程序卡片名称的所有应用，请访问 [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew) 如果 您知道我们尚未索引的其他应用。 [请添加这些应用！](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 一个新域

我们已经将网站从 electron.atom.io 移到了一个新的领域： [electronjs.org][]。

电子项目诞生于 [原子][]，GitHub的开源文本编辑器 建立在网络技术之上。 Electron 原来叫做 `atom-shell`。 Atom 是第一个使用它的应用。 但民间并不需要很长时间才能认识到 这个神奇的 Chromium + 节点运行时间可以用于各种不同的 应用程序。 当像Microsoft 和 Slack这样的公司开始使用 `atom-shell`, 项目显然需要一个新名称。

所以“电子”诞生了。 In early 2016, GitHub assembled a new team to focus specifically on Electron development and maintenance, apart from Atom. In the time since, Electron has been adopted by thousands of app developers, and is now depended on by many large companies, many of which have Electron teams of their own.

支持 GitHub 的电子项目，如 Atom 和 [GitHub 桌面][] 仍然是我们团队 优先事项，但通过转向新领域，我们希望帮助澄清 Atom 和 Electron 之间的技术区别 。

## 🐢:ro火箭: Node.js

以前的电子网站是由 [杰基尔][]，流行的红宝石为基础的 静态网站发生器。 Jekyl是建立静态网站的一个伟大工具，但 网站已经开始扩展。 我们希望拥有更动态的功能，如适当的重定向和动态内容渲染，因此 [节点.js][] 服务器是明显的选择。

Electron 生态系统包括组件用许多 不同编程语言编写的项目，从Python到C++到Bash。 但JavaScript是Electron的基础，而它是我们社区中使用最多的语言。

通过将网站从Ruby迁移到Node.js，我们的目标是降低想要为网站做贡献的人的 条目。

## :hig_voltage: 更容易打开源代码的参与

如果您的系统上安装了 [节点.js][] （8 或更高）和 [git](https://git-scm.org) ，您可以轻松地让 站点在本地运行：

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
[原子]: https://atom.io
[木桶]: https://caskroom.github.io
[Crowdin]: https://crowdin.com/project/electron
[克劳丁]: https://crowdin.com/project/electron
[电子/电子应用程序]: https://github.com/electron/electron-apps
[电子/电子-i18n]: https://github.com/electron/electron-i18n#readme
[electronjs.org]: https://electronjs.org
[GitHub 桌面]: https://desktop.github.com
[自制]: https://brew.sh
[杰基尔]: https://jekyllrb.com
[节点.js]: https://nodejs.org