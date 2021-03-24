---
title: Electron 的 Mac App Store 和 Windows 自动更新器
author: 吉尔福德
date: '2015-11-05'
---

最近Electron添加了两个令人兴奋的功能：Mac App Store兼容构建和一个内置Windows自动更新。

---

## Mac App Store 支持

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

从 `v0.34.0` 开始，每次Electron 发布都包含一个与 Mac App Store 兼容的构建。 之前基于 Electron 的应用程序将不符合苹果在 Mac App Store 上的要求。 这些要求大多与私人API的使用有关。 为了使Electron符合要求，需要删除两个模块：

- `崩溃报告`
- `自动更新`

此外，在检测DNS变化、视频捕获和访问功能方面，一些行为也发生了变化。 您可以阅读更多关于更改的信息， [将您的应用程序提交到文档中的 Mac App 商店](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide)。 分布情况可在 [Electron 发布页面](https://github.com/electron/electron/releases)上查找，前缀为 `质量-`。

相关的合并请求： [electron/electrony#3108](https://github.com/electron/electron/pull/3108), [electron/electrony#2920](https://github.com/electron/electron/pull/2920)

## Windows 自动更新

在 Electron `v0.34.1` 中， `自动更新器` 模块得到了改进，以便与 [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows) 一起工作。 这意味着易于在OS X 和 Windows 上自动更新您的应用的Electron 船舶。 您可以阅读更多关于 [设置您的应用在文档中自动更新Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) 的信息。

相关合并请求： [electron/electrony#1984](https://github.com/electron/electron/pull/1984)

