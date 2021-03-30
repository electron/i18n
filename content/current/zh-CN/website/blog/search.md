---
title: 搜索
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

Electron网站有一个新的搜索引擎，为 API 文档、教程、与Electron相关的 npm 软件包等发送即时结果。

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Electron 搜索屏幕截图">
  </a>
</figure>

---

学习像Electron这样的新技术或框架可能会引起恐惧。 Once you get past the [quick-start][] phase, it can be difficult to learn best practices, find the right APIs, or discover the tools that will help you build the app of your dreams. 我们希望Electron网站 成为一个更好的工具来寻找您更快地构建应用程序所需要的资源和更容易的 。

访问 [electronjs.org](https://electronjs.org) 上的任何页面, 你会在页面顶部找到 新的搜索输入.

## 搜索引擎

当我们首次设定将搜索添加到网站时，我们使用GraphQL作为后端，滚动了我们自己的 搜索引擎。 GraphQL很有趣， 搜索引擎正在运行， 但我们很快就认识到，构建搜索 引擎不是一项微不足道的任务。 像多字搜索和打字检测 这样的事情需要大量的工作才能正确进行。 Rather than reinventing the wheel, we decided to use an existing search solution: [Algolia][].

Algolia是一个托管搜索服务，它已经很快成为热门的开源项目如 React的 搜索引擎。 Vue, Bootstrap, Yarn, and [其他许多](https://community.algolia.com/docsearch/)

以下是使Algolia适合Electron项目的一些功能：

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) 提供了您类型的结果，通常是大约1毫秒。
- [Typo tolerance](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) means you'll still get results even when you type [`widnow`][].
- [高级查询语法](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) 可以启用 `"确切引用的匹配"` 和 `-exclusion`。
- [API 客户端](https://www.algolia.com/doc/api-client/javascript/getting-started/) 是开源的，并有大量文档。
- [分析](https://www.algolia.com/doc/guides/analytics/analytics-overview/) 告诉我们人们正在搜索什么以及他们正在搜索什么，但找不到什么。 这将使我们深入了解如何改进Electron的文档。
- Algolia 对开源项目 [免费](https://www.algolia.com/for-open-source)。

## API Docs

有时你知道 *你想要完成什么* , 但你不完全知道 *如何做* Electron 拥有超过 750 API 的方法、事件和属性。 没有人能够轻易地记住所有这些，但计算机在这件事上是很好的。 使用 Electron 的 [JSON API 文档](https://electronjs.org/blog/api-docs-json-schema), 我们将所有这些数据编入了Algolia 。 现在你可以轻松地找到 你正在寻找的准确的 API。

尝试调整窗口大小？ Search for [`resize`][] and jump straight to the method you need.

## 教程

Electron 有越来越多的教程来补充它的 API 文档。 现在你可以更容易地找到关于某个主题的教程。 与相关的 API 文档一起找到教程。

寻找安全方面的最佳做法？ Search for [`security`][].

## npm 包

There are now over 700,000 packages in the npm registry and it's not always easy to find the one you need. To make it easier to discover these modules, we've created [`electron-npm-packages`][], a collection of the 3400+ modules in the registry that are built specifically for use with Electron.

The folks at [Libraries.io][] have created [SourceRank][], a system for scoring software projects based on a combination of metrics like code, community, documentation, and usage. We created a [`sourceranks`][] module that includes the score of every module in the npm registry, and we use these scores to sort the package results.

想要替代Electron的内置IPC模块吗？ Search for [`is:package ipc`][].

## Electron 应用

它是 [轻松的 Algolia](https://github.com/electron/algolia-indices)。 所以我们从 [电子/应用](https://github.com/electron/apps) 添加了现有的应用列表。

Try a search for [`music`][] or [`homebrew`][].

## 过滤结果

如果您在此之前使用过GitHub的 [代码搜索](https://github.com/search) 你很可能知道它与colon分离的密钥值过滤器，比如 `extension:js` 或 `user:defunkt` We think this filtering technique is pretty powerful, so we've added an `is:` keyword to Electron's search that lets you filter results to only show a single type:

- [`is:api thumbnail`][]
- [`is:tutorial security`][]
- [`is:package ipc`][]
- [`is:app graphql`][]

## 键盘导航

人们喜欢键盘快捷键！ 新的搜索可以在不带 您的手指离开键盘的情况下进行：

- <kbd>/</kbd> 聚焦于搜索输入
- <kbd>esc</kbd> 聚焦于搜索输入并清除它
- <kbd>向下</kbd> 移动到下一个结果
- <kbd>up</kbd> 移动到之前的结果，或搜索输入
- <kbd>输入</kbd> 打开一个结果

我们还打开了 [模块](https://github.com/electron/search-with-your-keyboard/) 的源码来启用此键盘交互。 它是为了与 Algolia InstantSearch, 一起使用的，但是为了与不同的搜索实现兼容。

## 我们希望您的反馈

如果你遇到新搜索工具的任何问题，我们想要听到关于它的信息！

提交您的反馈意见的最佳方式是在 合适的仓库中在 GitHub 上提交问题：

- [electron/electronjs.org](https://github.com/electron/electronjs.org) 是Electron 网站。 如果你不知道要在哪里提交问题，这是你最好的。
- [electron/algolia-index](https://github.com/electron/algolia-indices) 是所有可搜索的电子数据都被编译的地方。
- [使用您的键盘进行电子/搜索](https://github.com/electron/search-with-your-keyboard) 使搜索界面可以通过键盘进行导航。
- [Algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) 是浏览器一侧的客户端，它允许进行搜索即时搜索。
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) 是上传数据到Algolia服务器的Node.js客户端。

## 谢谢！

Special thanks to [Emily Jordan](https://github.com/echjordan) and [Vanessa Yuen](https://github.com/vanessayuenn) for building these new search capabilities, to [Libraries.io][] for providing [SourceRank][] scores, and to the team at Algolia for helping us get started. 🍹

[`electron-npm-packages`]: https://ghub.io/electron-npm-packages
[`homebrew`]: https://electronjs.org/?query=homebrew
[`is:api thumbnail`]: https://electronjs.org/?query=is%3Aapi%20thumbnail
[`is:app graphql`]: https://electronjs.org/?query=is%3Aapp%20graphql
[`is:package ipc`]: https://electronjs.org/?query=is%3Apackage%20ipc
[`is:tutorial security`]: https://electronjs.org/?query=is%3Atutorial%20security
[`music`]: https://electronjs.org/?query=music
[`resize`]: https://electronjs.org/?query=resize
[`security`]: https://electronjs.org/?query=security
[`sourceranks`]: https://github.com/nice-registry/sourceranks
[`widnow`]: https://electronjs.org/?query=widnow
[Algolia]: https://algolia.com
[Libraries.io]: https://libraries.io
[quick-start]: https://github.com/electron/electron-quick-start
[SourceRank]: https://docs.libraries.io/overview.html#sourcerank