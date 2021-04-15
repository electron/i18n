---
title: Node.js 原生附加组件和 Electron 5.0
author: BinaryMuse
date: '2019-02-01'
---

如果你在使用 Electron 5 添加本地Node.js 时遇到麻烦。 ，它需要更新以配合最新版本的 V8。

---

## 再见 `v8:::Handle`, 你好 `v8:::本地`

2014年，V8团队已弃用 `v8:::Handle` 代理 `v8::本地` 代理本地句柄。 Electron 5.0 包含最终删除 `v8:::处理好的` 和本机节点。 s 仍然使用它的插件需要更新后才能使用 Electron 5.0 使用。

要求的代码更改是最小的 但 *仍然使用 `v8::Handle` 的* 本机节点模块将无法使用 Electron 5 构建。 并且需要修改。 The good news is that Node.js v12 will also include this V8 change, so any modules that use `v8::Handle` will need to be updated *anyway* to work with the upcoming version of Node.

## 我保留一个本地插件，我怎么能帮忙？

如果您为 Node.js 保留本机插件，请确保您替换所有 `v8:::处理` `v8:::局部` 前者只是后者的一个别名，因此不需要为解决这一具体问题作出其他改变。

您也可能有兴趣查看 [N-API](https://nodejs.org/api/n-api.html)，它是作为节点一部分而与V8分开保存的。 s 本身，旨在使本地插件免受底层JavaScript引擎变化的影响。 您可以在 Node.js 网站</a> N-API 文档中找到更多信息

。</p> 



## 帮助! 我在我的应用中使用一个本地插件，但它不会起作用！

如果您正在消耗一个本地添加到节点中。 s 在您的应用中，本机插件不会因为这个问题而构建。 检查附加组件的作者以查看他们是否发布了一个新版本来解决问题。 如果不是，请联系作者 (或 [正在打开合并请求！](https://help.github.com/articles/about-pull-requests/)) 可能是你最好的。
