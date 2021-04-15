---
title: Electron 用户名
author: zeke
date: '2016-12-20'
---

我们已经在 Electron 网站上添加了一个新的 [用户](https://electronjs.org/userland) 部分，以帮助用户发现他人。 我们正在蓬勃发展的开放源码生态系统的软件包和组成 的应用。

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## 使用土地的来源

使用土地是软件界的人聚集在一起分享工具和想法的地方。 该词源自Unix社区。 当它提到 时，它会在内核之外运行的任何程序，但今天它意味着更多。 当今天的 Javascript 社区的人提到用户时，他们通常是 讨论的 [npm 软件包注册表](http://npm.im)。 This is where the majority of experimentation and innovation happens, while Node and the JavaScript language (like the Unix kernel) retain a relatively small and stable set of core features.

## 节点和 Electron

像节点一样，Electron拥有一组少量的核心API。 这些提供了开发多平台桌面应用程序所需的 基本功能。 这个设计理念让 Electron 能够保持灵活而不被过多的规定有关于如何应该被使用。

用户名是“核心”对应的，使用户能够 创建和分享扩展Electron功能的工具。

## 收集数据

为了更好地了解我们生态系统中的趋势，我们 分析了15个元数据。 00 公开的 GitHub 仓库 依赖 `electron` 或 `electron-prebuilded`

我们使用了 [GitHub API](https://developer.github.com/v3/), [库。 o API](https://libraries.io/api), 和 npm 注册表来收集依赖信息, 开发依赖关系, 依赖者、软件包作者、 Repo 贡献者、下载计数、叉计数、stergazer 计数等。

然后我们使用此数据生成以下报告：

- [应用开发依赖关系](https://electronjs.org/userland/dev_dependencies): 在Electron应用中最常被列为 `依赖关系` 的包裹。
- [GitHub 贡献者](https://electronjs.org/userland/github_contributors): GitHub 用户已经为许多与 Electron 相关的 GitHub 仓库贡献了力量。
- [软件包依赖于](https://electronjs.org/userland/package_dependencies): 与Electron 相关的 npm 软件包，这些软件包常常依赖于其他 npm 软件包。
- [星标应用](https://electronjs.org/userland/starred_apps): 拥有众多星星星的 Electron 应用 (不是npm 软件包)
- [大多数下载的软件包](https://electronjs.org/userland/most_downloaded_packages): 与Electron-related npm 软件包已经下载了很多.
- [应用程序依赖关系](https://electronjs.org/userland/dependencies): 在 Electron 应用程序中最常列为 `依赖关系` 的包。
- [软件包作者](https://electronjs.org/userland/package_authors): 与Electron相关的 npm 软件包最丰富的作者。

## 过滤结果

报告如 [应用程序依赖性](https://electronjs.org/userland/dependencies) 和 [已加星标应用](https://electronjs.org/userland/starred_apps) 列出包， 应用程序和仓库有一个可以用于 过滤结果的文本输入.

当您输入此输入时，页面的 URL 将被动态更新。 这个 允许您复制一个代表特定分割的用户群数据的 URL。 然后与他人共享。

[![巴别尔](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## 更多更多

第一套报告只是开始。 我们将继续收集关于社区如何构建Electron的 个数据，并将向网站添加 个新报告。

所有用于收集和显示此数据的工具都是开放源码：

- [electron/electronjs.org](https://github.com/electron/electron.atom): Electron 网站。
- [electron/electron-userland-reports](https://github.com/electron/electron-userland-reports): Slices of data about packages, repos, and users in Electron userland.
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): GitHub 上所有依赖 `electron` 或 `electron-prebuilded`
- [electron-npm-packages](https://github.com/zeke/electron-npm-packages): 提到 `electron` 的所有npm packages in their `package.json` files.

如果你有关于如何改进这些报告的想法， 请告诉我们 [在网站存储库](https://github.com/electron/electronjs.org/issues/new) 或上述任何一个仓库中打开一个问题。

感谢您，Electron社区让用户土地成为今天的用户！

