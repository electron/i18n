---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '2016-08-08'
---

这是正在进行的解释 Electron内部的第二个职位。 查看 [关于事件循环集成的第一个帖子][event-loop] 如果您还没有。

大多数人使用服务器端应用程序的 [节点](https://nodejs.org) 但由于节点有丰富的 API 设置和欣欣向荣的社区，它也是一个内嵌库的适合点。 此帖解释了节点如何在 Electron 中被用作图书馆。

---

## 构建系统

节点和电子都使用 [`GYP`][gyp] 作为构建系统。 如果你想把 个节点嵌入到你的应用中，你也必须把它用作你的构建系统。

新建 `GYP`? 在继续本文之前，请阅读本指南 [][gyp-docs] 。

## 节点标志

Node 源代码目录中的 [`node.gyp`][nodegyp] 文件描述了节点 是如何构建的，以及控制启用 节点哪些部分以及是否打开某些配置的大量 [`GYP`][gyp] 变量。

To change the build flags, you need to set the variables in the `.gypi` file of your project. 节点中的 `配置` 脚本可以为您生成一些常见的 配置，例如运行 `。 配置 --shared` 将生成 一个 `config.gyi` 其中包含指示节点作为共享库构建的变量。

Electron 不使用 `配置` 脚本，因为它有自己的构建脚本。 节点的配置在电子根源代码目录 [`common.gypi`][commongypi] 文件中定义。

## 与 Electron 链接节点

在 Electron 节点正通过设置 `GYP` 变量 `node_shared` 到 `true`so 节点的构建类型将从 `可执行文件` 更改为 `shared_bull`和包含节点的源代码 `主要` 入口点将不会被编译。

Since Electron uses the V8 library shipped with Chromium, the V8 library included in Node's source code is not used. 通过设置 `node_use_v8_platform` 和 `node_use_bundled_v8` 到 `false` 来做到这一点。

## 共享库或静态库

当与节点链接时，有两个选项：您可以构建节点作为 静态库，并将其包含在最终可执行文件中。 或者你可以构建它作为一个 共享库，并且将它与最终可执行文件一起运送。

Electron，节点是作为静态库长期构建的。 This made the build simple, enabled the best compiler optimizations, and allowed Electron to be distributed without an extra `node.dll` file.

然而，这改变了后，铬切换到使用 [无聊SL][boringssl]。 BoringSL 是 [OpenSL][openssl] 的 叉，可删除多个未使用的 ABI 并更改许多现有的 界面。 因为节点仍在使用 OpenSSL，编译器会产生无数的 链接错误，如果它们是相互冲突的符号连接在一起的话。

电子不能在节点中使用 BoringSSL，也不能在铬中使用 OpenSSL，因此唯一 选项是切换到将节点构建为共享库，并且 [将 BoringSL 和 OpenSSL 符号隐藏在每个组件中][openssl-hide] 。

这种变化给Electron带来了一些正面的副作用。 在此 改变之前， 如果您使用 本机模块，您无法重命名Windows上的 Electron 可执行文件，因为可执行文件的名称在 导入库中是硬编码的。 当节点作为共享的库构建后，此限制就会变得 ，因为所有原生模块都连接到 `节点。 ll`其名称不需要 更改.

## 支持本机模块

[在节点中][native-modules] 的原生模块通过定义节点加载的条目功能， 然后从节点搜索 V8 和 libuv 的符号来工作。 这是嵌入器的 个故障，因为默认情况下，在构建节点作为库时，V8 和 libuv 的符号 将被隐藏，本地模块将无法加载 ，因为它们找不到符号。

因此，为了使本地模块发挥作用，V8和libuv 符号 在Electron中暴露。 对于 V8，这是由 [强制所有 符号在 Chromium 的配置文件中暴露][v8-expose]。 对于libuv来说， 它是通过 [设定 `BUILDING_UV_SHARED=1` 定义][libuv-expose]来实现的。

## 在您的应用中启动节点

在与节点建立和链接的所有工作完成后，最后一步是在您的应用中运行 节点。

节点不提供许多用于嵌入到其他应用中的公有API。 通常，您可以致电 [`node::Start` ， `node::Init`][node-start] 开始 节点的新实例。 然而，如果您正在基于节点构建一个复杂的应用程序， 您必须使用 API 就像是 `节点：:CreateEnvironment` 来精确控制每 步骤。

在 Electron 中，节点是以两种方式开始的： 主要过程中运行的独立模式。 这类似于官方节点二进制以及嵌入式模式 ，将节点插入网页中。 这个详细信息将在未来的帖子中解释 。

[gyp]: https://gyp.gsrc.io
[nodegyp]: https://github.com/nodejs/node/blob/v6.3.1/node.gyp
[commongypi]: https://github.com/electron/electron/blob/master/common.gypi
[openssl-hide]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218
[v8-expose]: https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122
[libuv-expose]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228
[node-start]: https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191
[event-loop]: https://electronjs.org/blog/2016/07/28/electron-internals-node-integration
[gyp-docs]: https://gyp.gsrc.io/docs/UserDocumentation.md
[gyp-docs]: https://gyp.gsrc.io/docs/UserDocumentation.md
[native-modules]: https://nodejs.org/api/addons.html
[boringssl]: https://boringssl.googlesource.com/boringssl
[openssl]: https://www.openssl.org

