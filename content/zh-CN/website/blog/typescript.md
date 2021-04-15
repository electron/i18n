---
title: "在 Electron 中宣布TypeScript 支持"
author: zeke
date: '2017-06-01'
---

`electron` npm 包现在包含一个 TypeScript 定义文件，它提供了整个Electron API 的详细注释。 这些注释可以改进您的 Electron 开发 感受 **，即使您正在编写原版JavaScript** 只需要 `npm install安装electron` 来获取您项目中最新的 Electron 键入。

---

TypeScript 是一种由Microsoft创建的开源编程语言。 它是 个通过添加对 静态类型的支持来扩展语言的 JavaScript 叠加集。 TypeScript 社区近年来迅速增长。 和 TypeScript 在 [最爱的编程语言](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) 中最近的堆栈溢出开发者调查。  TypeScript 被描述为 "JavaScript 缩放", 团队位于 [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), 和 [Microsoft](https://github.com/Microsoft/vscode) 都用它来写成可缩放的 Electron 应用，由数以百万计的人使用 。

TypeScript 支持 JavaScript 中的许多较新的语言功能，如 类，对象毁灭。 异步/等待，但其真正的解析 功能是 **类型注释**。 Declaring the input and output datatypes expected by your program can [reduce bugs](https://slack.engineering/typescript-at-slack-a81307fa288d) by helping you find errors at compile time, and the annotations can also serve as a formal declaration of [how your program works](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

当库写入原版 Javascript时，类型常常很模糊 定义为写文档时的事后思考。 函数通常可以 接受更多的类型，而不是文件记录的类型， 或者函数可能有隐藏的 约束，未被记录，因此可能导致运行时错误。

TypeScript 用 **定义文件** 解决了这个问题。 TypeScript 定义文件描述了库的所有函数和它的 预期输入和输出类型。 当库作者将一个 TypeScript 定义文件与其已发布的库捆绑在一起时， 该库的消费者可以 [在他们的编辑器](https://code.visualstudio.com/docs/editor/intellisense) 中探索它的API，并立即开始使用它。 常常不需要查阅图书馆的 文档。

很多受欢迎的项目，例如 [角](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (现在是 Electron! 编译他们自己的定义文件并将它与他们的 已发布的 npm 软件包捆绑在一起。 对于那些不将自己的定义文件捆绑在一起的项目， 有 [定型](https://github.com/DefinitelyTyped/DefinitelyTyped), 社区维护定义文件的第三方生态系统。

## 安装

从 1.6.10版本开始，Electron 的每次版本都包含它自己的 TypeScript 定义文件。 当您从 npm 安装 `electron` 软件包时， `electron.d.ts` 文件自动与 已安装的软件包捆绑在一起。

[最安全的安装 Electron 的](https://electronjs.org/docs/tutorial/electron-versioning/) 方式是使用准确的版本号：

```sh
npm install electron --save-dev --save-determine
```

或者如果您正在使用 [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison)：

```sh
yarn 添加 electron --dev --quiry
```

如果您已经使用了第三方定义，例如 `@types/electron` 和 `@types/node`, 您应该将它们从您的 Electron 项目中删除，以防止任何碰撞

定义文件来自我们的 [结构化的 API 文档](https://electronjs.org/blog/2016/09/27/api-docs-json-schema)， 因此它将始终与 [Electron 的 API 文档](https://electronjs.org/docs/api/) 一致。 只需安装 `electron` 并且您总是会获得 最新的 Electron 版本的 TypeScript 定义。

## 用法

关于如何安装和使用Electron新的 TypeScript 注释的概要， 观看这个简短的演示屏幕： <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

如果您正在使用 [Visual Studio 代码](https://code.visualstudio.com/)，您已经有 得到了 TypeScript 支持。 还有社区维护的 插件用于 [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), 和 [其他编辑](https://www.typescriptlang.org/index.html#download-links)

一旦您的编辑器为 TypeScript 配置，您将开始看到更多的 个了解上下文的行为，例如自动完成建议： 内嵌方法引用， 参数检查等等。

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="自动补全方法">
  <figcaption>方法自动补全</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="方法参考">
  <figcaption>内联方法引用</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="参数检查">
  <figcaption>检查参数</figcaption>
</figure>

## 开始使用 TypeScript

如果你是新的 TypeScript 并想了解更多信息, 此 [来自Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4)介绍性视频 提供了关于为何创建语言的很好的概述。 如何工作, 如何使用它, 以及它的头部。

还有一个 [手册](https://www.typescriptlang.org/docs/handbook/basic-types.html) 和 [游戏场](https://www.typescriptlang.org/play/index.html) 在官方的 TypeScript 网站上。

因为TypeScript 是 JavaScript 的超级集，您现有的 JavaScript 代码 已经是有效的 TypeScript。 这意味着您可以根据需要逐步将现有的 JavaScript 项目转换为 TypeScript, sprinkling 的新语言功能。

## 谢谢！

没有Electron的 开放源码维护者的帮助，这个项目是不可能的。 感谢 [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak), [Brendan Forster](https://github.com/shiftkey), 和许多其他人的错误修复、文件改进、 和技术指导。

## 支持

如果您在使用 Electron's new TypeScript 定义文件时遇到任何问题， 请在 [electron-typescript-definition-](https://github.com/electron/electron-typescript-definitions/issues) 仓库中提交一个问题。

快乐的类型脚本！
