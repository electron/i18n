---
title: "Electron的新国际化网站"
author: zeke
date: '2017-11-13'
---

Electron has a new website at [electronjs.org][]! We've replaced our static Jekyll site with a Node.js webserver, giving us flexibility to internationalize the site and paving the way for more exciting new features.

---

## 🌍 翻译

我们已经开始了网站国际化的进程，目标是 使Electron应用程序开发能够为全球的 开发者所访问。 We're using a localization platform called [Crowdin][] that integrates with GitHub, opening and updating pull requests automatically as content is translated into different languages.

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

If you're multilingual and interested in helping translate Electron's docs and website, visit the [electron/electron-i18n][] repo, or jump right into translating on [Crowdin][], where you can sign in using your GitHub account.

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

Using just a [PNG icon file and a small amount of app metadata](https://github.com/electron/electron-apps/blob/master/contributing.md), we're able to collect a lot of information about a given app. Using data collected from GitHub, app pages can now display screenshots, download links, versions, release notes, and READMEs for every app that has a public repository. 使用从每个应用图标中提取的调色板 我们可以生成 [粗胆和可访问的颜色](https://github.com/zeke/pick-a-good-color) 给每个应用页面一些可视化的特性。

[应用程序索引页面](https://electronjs.org/apps) 现在也有类别 和关键字过滤器来查找有趣的应用，如 [GraphQL GUIs](https://electronjs.org/apps?q=graphql) 和 [p2p 工具](https://electronjs.org/apps?q=graphql)。

If you've got an Electron app that you'd like featured on the site, open a pull request on the [electron/electron-apps][] repository.

## Homebrew 的一行安装

The [Homebrew][] package manager for macOS has a subcommand called [cask][] that makes it easy to install desktop apps using a single command in your terminal, like `brew cask install atom`.

我们已经开始为热门的 Electron 应用程序收集Homebrew 卡片名，并且现在 在有卡片的每个应用程序页 上显示安装命令(对于macOS 访客)：

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>适合您的平台的安装选项：macOS, Windows, Linux</figcaption>
  </a>
</figure>

要查看具有自制程序卡片名称的所有应用，请访问 [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew) 如果 您知道我们尚未索引的其他应用。 [请添加这些应用！](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 一个新域

We've moved the site from electron.atom.io to a new domain: [electronjs.org][].

The Electron project was born inside [Atom][], GitHub's open-source text editor built on web technologies. Electron 原来叫做 `atom-shell`。 Atom 是第一个使用它的应用。 但民间并不需要很长时间才能认识到 这个神奇的 Chromium + 节点运行时间可以用于各种不同的 应用程序。 当像Microsoft 和 Slack这样的公司开始使用 `atom-shell`, 项目显然需要一个新名称。

所以“电子”诞生了。 In early 2016, GitHub assembled a new team to focus specifically on Electron development and maintenance, apart from Atom. In the time since, Electron has been adopted by thousands of app developers, and is now depended on by many large companies, many of which have Electron teams of their own.

Supporting GitHub's Electron projects like Atom and [GitHub Desktop][] is still a priority for our team, but by moving to a new domain we hope to help clarify the technical distinction between Atom and Electron.

## 🐢:ro火箭: Node.js

The previous Electron website was built with [Jekyll][], the popular Ruby-based static site generator. Jekyl是建立静态网站的一个伟大工具，但 网站已经开始扩展。 We wanted more dynamic capabilities like proper redirects and dynamic content rendering, so a [Node.js][] server was the obvious choice.

Electron 生态系统包括组件用许多 不同编程语言编写的项目，从Python到C++到Bash。 但JavaScript是Electron的基础，而它是我们社区中使用最多的语言。

通过将网站从Ruby迁移到Node.js，我们的目标是降低想要为网站做贡献的人的 条目。

## :hig_voltage: 更容易打开源代码的参与

If you've got [Node.js][] (8 or higher) and [git](https://git-scm.org) installed on your system, you can easily get the site running locally:

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
[Atom]: https://atom.io
[cask]: https://caskroom.github.io
[Crowdin]: https://crowdin.com/project/electron
[electron/electron-apps]: https://github.com/electron/electron-apps
[electron/electron-i18n]: https://github.com/electron/electron-i18n#readme
[electronjs.org]: https://electronjs.org
[GitHub Desktop]: https://desktop.github.com
[Homebrew]: https://brew.sh
[Jekyll]: https://jekyllrb.com
[Node.js]: https://nodejs.org