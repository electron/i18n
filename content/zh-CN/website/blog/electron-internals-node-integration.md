---
title: 'Electron Internals: Message Loop Integration'
author: zcbenz
date: '2016-07-28'
---

这是解释Electron内部设置的一系列职位中的第一个。 此 介绍了节点事件循环如何在 Electron 中与 Chromium 集成。

---

像 [node-gui](https://github.com/zcbenz/node-gui) for GTK+ bindings, and [node-qt](https://github.com/arturadib/node-qt) for QT bindings. 但其中没有一个在生产中工作，因为图形界面工具包有自己的消息 循环，而诺德则在自己的事件循环中使用 libuv ， 并且主线程只能同时运行 个循环。 但其中没有一个在生产中工作，因为图形界面工具包有自己的消息 循环，而诺德则在自己的事件循环中使用 libuv ， 并且主线程只能同时运行 个循环。 所以在 节点中运行图形界面消息循环的常见技巧是在非常短的时间内抽取消息循环。 这 使得界面响应缓慢，并且占用了大量的 CPU 资源。

在开发Electron期间，我们遇到了同样的问题。 不过，以 逆向方式：我们必须将诺德的事件循环整合到Chromium的消息 循环中。

## 主要进程和渲染过程

在我们深入到消息循环集成细节之前，我将首先解释 Chromium的多进程结构。

Electron 有两种类型的进程：主进程和渲染器 进程(这实际上是非常简化的, 完整的视图请查看 [多进程架构](http://dev.chromium.org/developers/design-documents/multi-process-architecture)。 主进程负责 GUI 工作像创建窗口，而渲染器进程只处理 运行和渲染网页。

Electron 允许使用 JavaScript 控制主进程和渲染器 进程，这意味着我们必须将节点并入两个进程。

## 使用 libuv 替换Chromium 的消息循环

我的第一次尝试是通过 libuv 重新实现Chromium 的消息循环。

它对渲染器过程很容易，因为它的消息循环只听取了 个文件描述符和计时器。 并且我只需要实现与 libuv 的接口。

然而，主要进程要困难得多。 每个平台 都有自己类型的 GUI 消息循环。 macOS Chromium 使用 `NSRunLoop`, ，而Linux 使用 glib。 我尝试了大量黑客，从本地GUI消息循环中提取 个底层文件描述符， 然后喂养 它们以进行迭代，但我仍然遇到了一些不起作用的边缘情况。

因此，我最后添加了一个计时器来投票一个图形界面消息循环。 As a result the process took a constant CPU usage, and certain operations had long delays.

## 在一个单独的线程中投票节点的事件循环

随着Libuv 成熟，就有可能采取另一种办法。

后端fd 的概念被引入到libuv中，它是一个文件描述符 (或handle)，是它的事件循环的 libuv 调查。 因此，通过轮询后端可以在 libuv 中出现新事件时获得通知 。

所以我在 Electron 中创建了一个单独的线程来调查后端， 并且既然我 正在使用系统呼叫进行投票而不是libuv API，它是线程 安全的。 And whenever there was a new event in libuv's event loop, a message would be posted to Chromium's message loop, and the events of libuv would then be processed in the main thread.

这样，我避免了对 Chromium 和 Node进行补丁，在 主进程和渲染进程中使用了相同的代码。

## 代码

您可以在 [ `electron/atom/common/` ][node-bindings]目录下`node_bindings` 文件中找到消息循环集成的实现方式。 It can be easily reused for projects that want to integrate Node.

*Update: Implementation moved to [`electron/shell/common/node_bindings.cc`](https://github.com/electron/electron/blob/master/shell/common/node_bindings.cc).*

[node-bindings]: https://github.com/electron/electron/tree/main/atom/common
