---
title: "Electron 2中新建：应用内购买"
author: zeke
date: '2018-04-04'
---
  
新的 Electron 2.0 发行线是 [包装了](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) 个新功能和修复。 这个新的主要版本的高亮点之一是一个新的 [`inApp购买` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) Apple's [Mac App Store](https://support.apple.com/en-us/HT202023)

---

应用内购买可以直接从 内购买内容或订阅。 这使开发人员能够轻松地拥抱 [freemium business model](https://developer.apple.com/app-store/freemium-business-model/), 用户无需付费下载应用程序，并可选择 购买高级功能、额外内容或订阅。

新的 API 被社区贡献者添加到 Electron [Adrien Fery](https://github.com/AdrienFery) 以启用应用内购买 [Amanote](https://amanote.com/)用于讲座和 会议的 Electron 应用。 Amanote可以免费下载，并允许清晰和结构化的笔记 被添加到 PDF中 具有数学公式、绘图、音频 录制等功能。

在为 Amanote 的 Mac 版本添加应用内购买支持后，Adrien 已注意到 **%的销售量增加了**！

## 入门指南

新的 [`inAppPacking`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API 已经登陆到最新的 Electron 测试版本：

```sh
npm i -D electron@beta
```

API 文档可以在 GitHub</a>上找到

 Adrien已经很好地编写了如何使用 API 的教程。 若要 开始为您的应用添加应用内购买， [请查看教学](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md)</p> 

更多 [的 API](https://github.com/electron/electron/pull/12464) 正在工作中，不久将登陆即将发布的 Electron 测试版中。



## Windows可以是下一个

下一步，Adrien希望通过添加 支持Electron微软商店应用内购买来为Amanote打开一个新的收入通道。 随时关注 个关于这个问题的发展！