---
title: '每周的项目：Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

本周我们会见了 [Jasper](https://jasperapp.io)的创建者，这是一个基于 Electron 的 管理GitHub 通知的工具。

---

## 你好！ 您是谁？

我是 [Ryo Maruyama](https://github.com/h13i32maru), 日本的软件开发商。 我正在开发 [Jasper](https://jasperapp.io) 和 [ESDoc](https://esdoc.org)。

## Jasper 是什么？

[Jasper](https://jasperapp.io) 是 GitHub 灵活而强大的问题阅读器。 它支持github.com和GitHub Enterprise的问题和请求。

[![Jasper 应用截图](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## 你为什么要这样做？

当人们在工作或开放源码软件活动中使用GitHub 时，他们往往每天收到许多通知。 作为订阅通知的一种方式，GitHub 提供电子邮件和 [网页通知](https://github.com/notifications)。 我用了几年的时间，但我面临以下问题：

- 很容易忽略我提到的问题，我评论过，或者我在观看。
- 我把一些问题放在我头部的角落，稍后检查，但我有时忘记了这些问题。
- 为了不忘记问题，我在浏览器中保留许多标签。
- 很难检查与我有关的所有问题。
- 很难抓住我的团队的所有活动。

我正在花费大量时间和精力来防止这些问题。 所以我决定为 GitHub 提供一个问题阅读器，以有效地解决这些问题，并开始开发Jasper。

## 谁在使用Jasper？

Jasper 被正在使用GitHub 的几家公司的开发者、设计者和经理使用。 当然，一些开放源码软件开发商也在使用它。 而且它也被GitHub 的一些人使用！

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Jasper 是如何工作的？

一旦配置了Jasper，屏幕就会显示。 从左到右，您可以看到“串流列表”、“问题列表”和“问题正文”。

[![Jasper 开始屏幕](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

这个“串流”是Jasper的核心特征。 例如，如果你想看到“在电子/电子存储库中分配给@zeke的问题”，你创建以下流：

```
repo:electron/electron transnee:zeke is:issue
```

[![Jasper 开始屏幕 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

在创建流并等待几秒钟后，您可以看到符合条件的问题。

[![Jasper 开始屏幕 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## 我们能够对流做什么？

我将介绍一下可以用什么样的条件来进行流浪。

### 用户和团队

| 流                                             | 问题                         |
| --------------------------------------------- | -------------------------- |
| `提及：cat 提及：dog`                               | 提及用户 `cat` 或 `狗` 的问题       |
| `作者：cat author:dog`                           | 用户 `cat` 或 `狗` 创建的问题       |
| `转让人：cat 转让人：dog`                             | 分配给 `cat` 或 `狗` 的问题        |
| `评论员:cat commentter:dog`                      | `cat` 或 `dog` 评论的问题        |
| `参与者:cat involves:dog`                        | "包含" `cat` 或 `bob` 的问题     |
| `team:animal/white-cat team:animal/black-dog` | `动物/白猫` 或 `动物/黑狗` 在里面提到的问题 |

`involves` means `referred`, `author`, `assigner` or `commenter`

### 仓库和组织

| 流                              | 问题                      |
| ------------------------------ | ----------------------- |
| `repo:cat/jump repo:dog/run`   | `猫/跳跃` 或 `狗/运行` 中的问题    |
| `org:electron 用户:cat user:dog` | `electron`, `cat` 或 `狗` |

`org` 与 `用户` 相同

### 属性

| 流                                       | 问题                                     |
| --------------------------------------- | -------------------------------------- |
| `仓库：cat/跳跃里程碑:v1.0.0 里程碑:v1.0.1`        | `v1.0.0` 或 `v1.0.1` 在 `cat/jump`       |
| `repo:cat/jump label:bug label:blocker` | 附加 `bug` **和** `blocker` in `cat/jump` |
| `电源或原子shell`                            | 包含 `electron` 或 `atomshell` 的问题        |

### 审核状态

| 流                            | 问题                                      |
| ---------------------------- | --------------------------------------- |
| `是：pr 审核：必填项`                | `cat/jump` 需要审核的问题                      |
| `is:pr review-requested:cat` | 由 `cat` 请求审核的问题。 <br/> 但这些还没有被审核。 |
| `is:pr reviewed by :cat`     | 由 `cat` 审查的问题                           |

<br/>

您可能已经注意到这些，流可以使用 GitHub 的搜索查询。 关于如何使用流和搜索查询的详细信息，请参阅以下URL。

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper 还拥有未读问题管理、未读评论管理、标记星、通知更新、过滤问题、键盘快捷键等功能。

## Jasper 是一种付费产品吗？ 花费多少钱？

Jasper 是12美元。 然而，您可以使用 [免费试用版](https://jasperapp.io/) 30天。

## 您为什么选择在Electron上构建Jasper？

我喜欢Electron的以下方面：

- 可以使用 JavaScript/CSS/HTML开发应用程序。
- 应用程序可以为 Windows, Mac和Linux 平台构建。
- Electron正在积极发展，拥有一个大社区。

这些功能能够快速简单地开发桌面应用程序。 太棒了！ 如果你有任何产品想法，你应该考虑以一切方式使用 Electron。

## 你在开发 Jasper 时面临什么挑战？

我很难找到“流”概念。 首先，我考虑使用 GitHub 的 [通知 API](https://developer.github.com/v3/activity/notifications/)。 然而，我注意到它不支持某些使用案例。 此后，除了通知API外，我考虑使用 [问题 API](https://developer.github.com/v3/issues/) 和 [合并请求 API](https://developer.github.com/v3/pulls/)。 但这从来没有成为我想要的。 然后在思考各种方法时，我认识到轮询GitHub的 [搜索 API](https://developer.github.com/v3/search/) 将提供最大的灵活性。 达到这一点需要大约一个月的实验。 然后我在两天内用流概念执行了Jasper原型。

注：投票最多每十秒钟一次。 这足够限制GitHub API。

## 接下来是什么？

我计划开发以下功能：

- **一个过滤流**: 一个流有一些过滤流，可以过滤流中的问题。 它类似于SQL的视图。
- **多个账户**: 您将能同时使用 github.com 和 GHE
- **提高性能**: 现在在 WebView 中加载一个问题的速度低于正常浏览器。

在 Twitter 上关注 [@jasperappio](https://twitter.com/jasperappio) 以获取更新。

