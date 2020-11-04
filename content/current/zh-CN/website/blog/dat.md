---
title: '每周项目：Dat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

本周的精选项目是 [Dat](https://datproject.org/), a [赠款供资的](https://changelog.com/rfc/6), 开源, 分散化工具 用于发布数据集。 奶牛由一个 [地理分布式团队](https://datproject.org/team)建造和维护，其中许多人帮助 写此文章。

---

[![数据-桌面主视图的截图，显示一些共享的
秒数](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## 首先关闭什么是日期？

我们希望将同侪的最佳部分带给同侪和分布式的数据共享系统。 我们首先是分享科学数据，然后开始分成研究机构、政府、公共服务和开放源码小组。

另一种思考方法是 Dropbox 或 BitTorrent Sync 等同步和上传应用程序，但Dat 是 [开源](https://github.com/datproject)。 我们的目标是成为一个强大、开放源码、非营利的数据共享软件，用于大、中、小批和大批数据。

要使用 `dat` CLI 工具，您必须输入的只能是：

```sh
dat共享路径/到/my/文件夹
```

而且dat 会创建一个链接，您可以用来将该文件夹发送给他人—— 没有中央服务器或第三方可以访问您的数据。 与 BitTorrent不同的是，也不可能断开谁在分享什么([查看Dat Paper 草稿了解更多详情](https://github.com/datproject/docs/blob/master/papers/dat-paper.md))。

## 现在我们知道什么是Dat。 Dat 桌面如何适合？

[Dat Desktop](https://github.com/datproject/dat-desktop) 是一种让无法或不想使用命令行的人可以访问Dat的方式。 您可以在您的机器上托管多个秒，并通过您的网络提供数据。

## 您能分享一些酷的使用案例吗？

### DataRefuge + 项目 Svalbard

我们正在处理一个被编解码的 [项目 Svalbard](https://github.com/datproject/svalbard) 与 [DataRefuge](http://www.ppehlab.org/datarefuge)有关， 一个致力于备份有消失危险的政府气候数据的小组。 斯瓦尔巴德以北极的斯瓦尔巴全球种子库命名，该库有一个大型地下备份的DNA工厂库。 我们的版本是一个大型的、有控制的公共科学数据集收集。 一旦我们知道并可以信任元数据，我们就可以建立其他酷的项目，例如 [分布式志愿数据存储网络](https://github.com/datproject/datasilo/)。

### 加利福尼亚公民数据联盟

[CACivicData](http://www.californiacivicdata.org/) 是一个开放源码档，每天从加利福尼亚的CAL-ACCESS数据库中下载，追踪政治中的资金。 他们真的 [个每日版本](http://calaccess.californiacivicdata.org/downloads/0)，这意味着在他们的 zip 文件中托管大量重复的数据。 我们正在将他们的数据托管为一个Dat存储库，它将减少用于引用特定版本或更新到更新版本所需的哈希和带宽数量。

## Electron 更新

这个还不是具体的，但我们认为一个有趣的使用案例会把编译后的 Electron 应用程序放入一个Dat 仓库， 然后使用 Electron 的 Dat 客户端来拉取已建应用程序二进制的最新三角形， 节省下载时间，但也可以降低服务器的带宽成本。

## 谁应该使用 Dat 桌面？

任何想要通过p2p 网络分享和更新数据的人。 数据科学家、开放数据黑客、研究人员、开发人员。 如果任何人都有我们尚未想到的很酷的使用情况，我们完全愿意接受反馈。 你可以掉落我们的 [Gitter 聊天](https://gitter.im/datproject/discussions) 并问我们任何东西！

## Dat和Dat 桌面下一步是什么？

用户帐户和元数据发布。 我们正在开发一个 Dat 注册表网络应用，部署在 [datitproject。 rg](https://datproject.org/) 基本上是数据集的“NPM”， 除了告诫，我们只是一个元数据目录，数据可以在任何地方在线存放(而不是NPM 或 GitHub 则是在中央存放的数据) 因为源代码太小，你可以在一个系统中适应它)。 由于许多数据集是巨大的，我们需要一个联邦注册表(类似于BitTorrent 追踪器如何工作)。 我们想让人们更容易从Dat Desktop找到或发布注册表中的数据集， 使数据共享过程变得没有摩擦。

另一个功能是多作者/协作文件夹。 我们有开展协作工作流的大计划，或许与分支相似，只是围绕数据集协作设计的。 但我们仍在努力实现总体稳定并使我们的协议标准化！

## 您为什么选择在 Electron 上构建Dat 桌面？

Dat是使用Node.js建造的，所以它自然适合于我们的一体化。 除此之外，我们的用户使用各种机器 作为科学家， 研究人员和政府官员可能被迫为其机构使用某些设置——这意味着我们需要能够瞄准Windows和Linux以及Mac。 Dat Desktop 让我们很容易做到这一点。

## 建造Dat和Dat 桌面时你面临什么挑战？

图示人们想要什么。 我们从表格数据集开始， 但我们认识到，解决这个问题有点复杂，而且大多数人不使用数据库。 因此我们从零开始重新设计了所有的文件系统，并且没有回头看。

我们还遇到了一些一般的Electron基础设施问题，包括：

- 远程-如何捕获匿名使用统计
- 更新 - 设置自动更新是零星和魔法的
- 发布-XCode 签署、在 Travis上的建筑发布，做beta 构建，所有这些都是挑战。

我们也使用 Browserify 和 Dat Desktop 中的 '前端' 代码上的一些酷的 Browserify 变换(这种变异是一种怪异，因为我们仍然捆绑着，尽管我们原生的 `需要` — 但因为我们想要转换)。 为了更好地帮助管理我们的 CSS ，我们已经切换到使用 [Sheetify](https://github.com/stackcss/sheetify)。 它极大地帮助我们将我们的 CSS 模块化，并使我们更容易将我们的 UI 移动到一个具有共享依赖性的面向组件的结构。 例如， [dat-colors](https://github.com/Kriesse/dat-colors) 包含我们所有的颜色，并且共享于我们所有的项目。

我们一向是标准和最起码的抽象的很大的粉丝。 我们的整个接口是使用普通的DOM节点建立的，只有几个助手库。 我们已经开始将这些组件中的一些移动到 [基本元素](https://base.choo.io), 这是一个低级可重复使用组件的库。 如同我们大部分技术一样，我们一直在重复，直到我们做得对。 但作为一个团队，我们有一种感觉，我们正朝着正确的方向前进。

## 应在哪些领域改进Electron？

我们认为，最大的痛苦点是本土模块。 使用 npm 来重建您的 Electron 模块，使工作流程更加复杂。 我们的团队开发了一个叫做 [`prebuild`](http://npmjs.org/prebuild) 的模块，它处理预构建的二进制二进制。 对于节点来说运行良好，但Electron 工作流仍然需要安装后的自定义步骤。通常 `npm 运行重建` 这是令人烦恼的。 为了解决这个问题，我们最近转向了一个策略，将所有编译的平台都捆绑在了npm tarball中。 这意味着tarballs会变得更大(尽管可以通过 `来优化)。 o` 个文件-共享的图书馆， 此方法可以避免运行安装后脚本，同时也可以完全避免 `npm 运行重建` 模式。 这意味着 `npm install` 是第一次为 Electron 做了正确的事情。

## 您最喜欢的 Electron？

API似乎相当深思熟虑，它相对稳定。 并且它做了相当好的工作，以跟上上上游节点版本的最新版本，我们还不会有太多的其他要求！

## 任何可能对其他开发者有用的 Electron 提示？

如果你使用本机模块，给 [个预构建](https://www.npmjs.com/package/prebuild) 个shot！

## 跟随达特发展的最佳方式是什么？

在 Twitter 上关注 [@dat_project](https://twitter.com/dat_project) 或者 订阅我们的 [电子邮件通讯](https://tinyletter.com/datdata)。

