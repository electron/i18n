---
title: 'Electron 内部&#58; 使用节点作为库'
author: zcbenz
date: '2016-08-08'
---

这是正在进行的解释 Electron内部的第二个职位。 Check out the [first post](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) about event loop integration if you haven't already.

大多数人使用服务器端应用程序的 [节点](https://nodejs.org) 但由于节点有丰富的 API 设置和欣欣向荣的社区，它也是一个内嵌库的适合点。 此帖解释了节点如何在 Electron 中被用作图书馆。

---

## 构建系统

节点和 Electron 都使用 [`GYP`](https://gyp.gsrc.io) 作为他们的构建系统。 如果你想把 个节点嵌入到你的应用中，你也必须把它用作你的构建系统。

新建 `GYP`? Read [this guide](https://gyp.gsrc.io/docs/UserDocumentation.md) before you continue further in this post.

## 节点标志

[`个节点。 yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) 节点源代码目录中的文件描述节点 是如何构建的， 加上许多 [`GYP`](https://gyp.gsrc.io) 变量来控制 节点的哪些部分已启用以及是否打开某些配置。

To change the build flags, you need to set the variables in the `.gypi` file of your project. 节点中的 `配置` 脚本可以为您生成一些常见的 配置，例如运行 `。 配置 --shared` 将生成 一个 `config.gyi` 其中包含指示节点作为共享库构建的变量。

Electron 不使用 `配置` 脚本，因为它有自己的构建脚本。 节点配置在 [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) 文件 中定义了 Electron的根源代码目录。

## 与 Electron 链接节点

在 Electron 节点正通过设置 `GYP` 变量 `node_shared` 到 `true`so 节点的构建类型将从 `可执行文件` 更改为 `shared_bull`和包含节点的源代码 `主要` 入口点将不会被编译。

Since Electron uses the V8 library shipped with Chromium, the V8 library included in Node's source code is not used. 通过设置 `node_use_v8_platform` 和 `node_use_bundled_v8` 到 `false` 来做到这一点。

## 共享库或静态库

当与节点链接时，有两个选项：您可以构建节点作为 静态库，并将其包含在最终可执行文件中。 或者你可以构建它作为一个 共享库，并且将它与最终可执行文件一起运送。

Electron，节点是作为静态库长期构建的。 This made the build simple, enabled the best compiler optimizations, and allowed Electron to be distributed without an extra `node.dll` file.

然而，Chrome切换到使用 [BoringSSL](https://boringssl.googlesource.com/boringssl) 后改变了这种情况。 BoringSSL is a fork of [OpenSSL](https://www.openssl.org) that removes several unused APIs and changes many existing interfaces. 因为节点仍在使用 OpenSSL，编译器会产生无数的 链接错误，如果它们是相互冲突的符号连接在一起的话。

Electron 无法在节点中使用 BoringSSL 或在 Chromium 中使用 OpenSSL 所以唯一的 选项是切换到构建节点作为共享库， 和 [隐藏每个组件中的 BoringSSL 和 OpenSSL 符号](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218)

这种变化给Electron带来了一些正面的副作用。 在此 改变之前， 如果您使用 本机模块，您无法重命名Windows上的 Electron 可执行文件，因为可执行文件的名称在 导入库中是硬编码的。 当节点作为共享的库构建后，此限制就会变得 ，因为所有原生模块都连接到 `节点。 ll`其名称不需要 更改.

## 支持本机模块

[节点工作中的原生模块](https://nodejs.org/api/addons.html) ，定义节点加载的条目函数。 然后从节点中搜索V8和libuv 的符号。 这是嵌入器的 个故障，因为默认情况下，在构建节点作为库时，V8 和 libuv 的符号 将被隐藏，本地模块将无法加载 ，因为它们找不到符号。

因此，为了使本地模块发挥作用，V8和libuv 符号 在Electron中暴露。 对于V8，这是通过 [迫使Chromium配置文件中的所有 个符号曝光](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122) 来完成的。 For libuv, it is achieved by [setting the `BUILDING_UV_SHARED=1` definition](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228).

## 在您的应用中启动节点

在与节点建立和链接的所有工作完成后，最后一步是在您的应用中运行 节点。

节点不提供许多用于嵌入到其他应用中的公有API。 通常您只能调用 [`节点：start` 和 `节点：:Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) 开始 新的节点实例。 然而，如果您正在基于节点构建一个复杂的应用程序， 您必须使用 API 就像是 `节点：:CreateEnvironment` 来精确控制每 步骤。

在 Electron 中，节点是以两种方式开始的： 主要过程中运行的独立模式。 这类似于官方节点二进制以及嵌入式模式 ，将节点插入网页中。 这个详细信息将在未来的帖子中解释 。

