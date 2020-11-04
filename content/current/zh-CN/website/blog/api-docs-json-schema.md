---
title: Electron 的 API 文档作为结构化数据
author: zeke
date: '2016-09-27'
---

今天我们正在宣布对Electron文档的一些改进。 每个新的 版本现在包含一个 [JSON 文件](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) 详细描述所有Electron的公开API。 我们创建了此文件来 让开发人员能够以有趣的新方式使用 Electron 的 API 文档。

---

## 图案概述

每个API是一个具有名称、描述、类型等属性的对象。 类如 `浏览器窗口` 和 `菜单` 有附加属性描述了 它们的实例方法、实例属性、 实例事件等。

下面是描述 `浏览窗口` 类的方案摘要：

```js
{
  name: 'BrowserWindow',
  description: 'Create and control browser windows.',
  process: {
    main: true,
    renderer: false
  },
  type: 'Class',
  instanceName: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs.org/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window.md',
  staticMethods: [...],
  instanceMethods: [...],
  instanceProperties: [...],
  instanceEvents: [...]
}
```

这里是方法描述的示例，在这种情况下， `apis.BrowserWindow.instanceMethods.setMaximumsize` 实例方法：

```js
主席:
  name: 'setMaximumSize',
  签名: '(宽度，高度) ',
  描述：“设置窗口的最大宽度和高度。 ,
  参数: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## 使用新数据

为了方便开发者在他们的项目中使用这个结构化数据， 我们创建了 [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), 一个小的 npm 软件包，每当有新的 Electron 发布时自动发布。

```sh
npm installing electron-api-docs --save
```

为了即时满足，请尝试Node.js REPL中的模块：

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## 如何收集数据

Electron的 API 文档符合 [Electron 编码样式](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) 和 [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), 这样它的内容可以被编程解析。

[electron-docs-linter](https://github.com/electron/electron-docs-linter) 是 `electron/electron` 仓库的新的开发依赖性。 它是一个命令行工具，它会连接所有Markdown文件并强制执行styleguid的 规则。 如果发现错误，则列出它们，并停止发布 进程。 如果API文档有效，则 `electron-json。 pi` 文件 已创建， [已上传到 GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) 作为Electron 版本的一部分。

## 标准 Javascript 和标准Markdown

今年早些时候，Electron的代码已经更新，以使用所有 JavaScript 的 [`标准`](http://standardjs.com/) linter。 标准 重写此选项概括了此选项背后的理由：

> 采用标准风格意味着比个人风格更高的代码清晰度和社区协议的重要性。 这对100%的项目和发展文化来说也许是没有道理的，但开放源码对新闻界可能是一个敌视的地方。 设定明确、自动的捐助方期望使项目更加健康。

We also recently created [standard-markdown](https://github.com/zeke/standard-markdown) to verify that all the JavaScript code snippets in our documentation are valid and consistent with the style in the codebase itself.

这些工具一起帮助我们使用连续集成 (CI)来自动找到 拉取请求中的错误。 这减少了人类进行代码 审核的负担，并使我们对我们文档的准确性有了更大的信心。

### 社区努力

Electron的文档正在不断改进，我们有很棒的 开放源码社区为此表示感谢。 截至撰写本文时，将近300人 已经为这些文件做出了贡献。

我们很高兴看到人们如何处理这个新的结构化数据。 可能的使用 包括：

- 改进 [https://electronjs.org/docs/](https://electronjs.org/docs/)
- 一个 [TypeScript 定义文件](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) 用于更精简的 Electron 开发使用 TypeScript 的项目。
- 可搜索离线文档的工具，例如 [Dash.app](https://kapeli.com/dash) and [devdocs.io](http://devdocs.io/)

