---
title: 'Electron 内部：构建Chromium 作为库'
author: zcbenz
date: '2017-03-03'
---

Electron基于谷歌的开放源码Chromium，这个项目不一定被其他项目使用 。 这篇文章介绍了 如何构建Chromium 作为Electron使用的库，以及构建 系统多年来的演变。

---

## 使用 CEF

Chromium 嵌入式框架 (CEF) 是一个将Chromium 转换成 个库的项目，并且提供基于Chromium的代码库的稳定API。 非常 Atom编辑器和 NW.js 的早期版本使用了CEF。

为了保持稳定的 API，CEF 隐藏了Chromium 的所有详细信息，并将Chromium的API用自己的接口包裹。 所以当我们需要 访问基础Chromium API，如将Node.js集成到网页时，CEF 的 优势就会变成拦截器。

所以在末尾，Electron和NW.js都切换到使用 Chromium 的 API， 直接使用。

## 建造成Chromium

即使Chromium没有正式支持外部项目。 编解码器 是模块化的，很容易构建一个基于 Chromium 的最小浏览器。 提供浏览器接口的核心 模块叫做内容模块。

要开发一个包含内容模块的项目，最简单的方法是构建 个项目作为Chromium的一部分。 这可以先检查 Chromium 的 源代码，然后将项目添加到 Chromium 的 `DEPS` 文件。

NW.js和Electron很早的版本正在使用这种方式建造。

下方是 Chromium 是一个非常大的代码库，需要非常强大的 机器才能建造。 对于普通膝上型计算机，这可能需要超过5个小时。 因此，这会对能够为 项目贡献的开发者的数量产生很大影响，同时也会使开发速度放慢。

## 将Chromium构建为一个共享库

作为内容模块的用户，Electron在大多数情况下不需要修改 Chromium 的代码 这样一个改进Electron构建的明显方法是 构建Chromium作为一个共享的库， 然后在 Electron 中链接它。 在这种 的方式下，开发者在为 Electron 贡献时不再需要构建全部的Chromium。

[libchromiumcontent](https://github.com/electron/libchromiumcontent) 项目是由 [@aroben](https://github.com/aroben) 为此目的创建的。 它构建Chromium的内容 模块作为共享的库，然后提供Chromium的标题 并预建二进制二进制文件供下载。 它构建Chromium的内容 模块作为共享的库，然后提供Chromium的标题 并预建二进制二进制文件供下载。

[亮度](https://github.com/electron/brightray) 项目也是作为libchromiumcontent的一部分生来的， 它提供了内容模块周围的薄层。

通过一起使用氦气和亮光，开发人员可以 快速构建浏览器，而无需了解构建 Chromium 的细节。 它取消了建造 项目的快速网络和强大机器的要求。

Apart from Electron, there were also other Chromium-based projects built in this way, like the [Breach browser](https://www.quora.com/Is-Breach-Browser-still-in-development).

## 过滤导出的符号

在 Windows 上，共享库可以 导出的符号数量是有限制的。 随着Chromium代码库的增加，在 libchromiumcontext 中导出的符号数量很快就超过了限制。

解决方案是在生成 DLL 文件时过滤不需要的符号。 由 [提供一个 `来工作。 f` 链接文件](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b), 然后使用 脚本到 [判断是否应该导出命名空间下的符号 ](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd)

虽然Chromium一直在添加新的导出符号， libchromiumcontent 仍然可以通过拆除更多 个符号来生成共享的库文件。

## 构建组件

在讨论在 libchromiumcontents 中采取的下一步步骤之前，重要的是 首先引入组件构建在Chromium 中的概念。

作为一个大型项目，在Chromium建造时，连接步骤需要很长时间。 当开发者做出小改动时，通常需要10分钟才能看到 最终输出。 为了解决这个问题，Chromium引入了组件构建，它在Chromium中构建了 个模块，作为分离的共享库； 因此在第 最后连接步骤中花费的时间变得不那么引人注目。

## 送货原始二进制文件

Chromium继续成长， Chromium中导出了如此多的符号，甚至内容模块和Webkit的符号也超过了 的限制。 只需要 擦除符号就不可能生成可用的共享库。

最后，我们必须 [运送原始二进制的 Chromium](https://github.com/electron/libchromiumcontent/pull/98) 而不是 生成一个单一的共享库。

如前所述，Chromium有两种构建模式。 由于 配送原始二进制件，我们不得不在libchromiumcontent中运送两种不同的二进制品分布 。 其中一个叫做 `static_bull` build, 其中包括 每个模块的所有静态库，由正常构建Chromium生成的。 另一个是 `shared_Library`, 它包括组件构建生成的每个 模块的所有共享库。

在 Electron 中，Debug 版本与 `shared_library` 版本的 氦气质连接在一起，因为它下载量小，在链接最终可执行文件时 的时间也很少。 电子的释放版本 与 `static_library` 版本的libromiumcontent链接，因此编译器 可以生成对调试很重要的完整符号，链接器 可以做得更好的优化，因为它知道哪些对象文件 需要，哪些不是。

所以对于正常的开发，开发者只需要构建调试版本， 不需要一个良好的网络或强大的机器。 虽然发布 版本需要更好的硬件才能生成，但它可以产生更好的 优化二进制文件。

## `gn` 更新

作为世界上最大的项目之一，大多数正常系统 不适合建造铬，铬团队开发自己的构建 工具。

较早版本的Chromium正在使用 `gyp` 作为构建系统，但它受到了 的减缓， 复杂的 项目很难理解它的配置文件。 经过多年的开发，Chromium 切换到 `gn` 作为 构建系统，构建速度快得多，结构清晰。

`gn` 的一个改进是介绍 `source_set`, 这代表了 组对象文件。 在 `gyp`, 每个模块都由 `static_bollution` 或 `shared_bollution`对于Chromium的正常构建， 每个模块生成一个静态库，它们被链接在 最终可执行文件中。 通过使用 `gn`, 每个模块现在只生成一堆 对象文件, 和最终可执行文件只是将所有对象文件连接在一起， 因此中间静态库文件不再生成。

然而，这种改进在 libchromiumcontents 上造成了很大的麻烦，因为 中间静态库文件实际上是 libchromiumcontents 所需要的。

第一次尝试解决这个问题是 [补丁 `gn` 来生成静态库 文件](https://github.com/electron/libchromiumcontent/pull/239), 它解决了问题，但远远不是一个体面的 解决办法。

第二次尝试由 [@alespergll](https://github.com/alespergl) 到 [从对象文件列表中生成自定义静态库](https://github.com/electron/libchromiumcontent/pull/249)。 它使用了一个技巧来先运行一个虚拟构建来收集生成的 对象文件列表， 然后通过喂入 `gn` 来实际构建静态库。 它只对Chromium源代码 进行了最小的更改，并且保持了Electron的建筑结构。

## 摘要

正如你可以看到的那样，与建造Electron作为Chromium的一部分相比， 建造 Chromium 作为一个库需要更大的精力并需要持续的 维护。 然而，后者取消了构建Electron的强大硬件 的要求。 这样可以让更多的开发者构建和 贡献Electron。 这项努力是完全值得的。

