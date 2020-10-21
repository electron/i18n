---
title: npm install electron
author: zeke
date: '2016-08-16'
---

在 Electron 版本 1.3.1 中，您可以在 `npm 安装electron --save-dev` 到 安装最新的Electron 版本的您的应用程序。

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## 预置的 Electron 二进制文件

如果你以前曾经在Electron应用上工作，你很可能会遇到 `电子预建` npm 软件包。 这个软件包是几乎所有的 Electron 项目不可或缺的一部分。 安装后，它会检测到您的操作系统 并下载一个预设的二进制文件，编译成你系统的 架构。

## 新名称

Electron安装过程常常是新开发者的绊脚石。 许多勇敢的人试图通过运行 `npm 安装electron` 而不是 `npm 安装electron-prebuilded`来开始开发一个 Electron 只要发现(往往是在非常混乱的情况下)他们所寻找的不是 `电子`

这是因为在 npm 上存在一个 `电子` 项目， 是在 GitHub 的 Electron 项目存在之前创建的。 To help make Electron development easier and more intuitive for new developers, we reached out to the owner of the existing `electron` npm package to ask if he'd be willing to let us use the name. 幸运的是，他是我们项目的粉丝，同意帮助我们重新调整名字 。

## 预设生命于

到版本 1.3.1，我们已经开始发布 [`electron`](https://www.npmjs.com/package/electron) 和 `electron-prebuilded` packages to npm in tandem. 这两个软件包是相同的。 我们选择继续在这两个名称下发布 软件包，以免给当前正在他们的项目中使用 `电子预制` 的 成千上万的开发者带来不便。 我们建议更新您的 `包。 要使用新的 <code>electron` 依赖关系的</code> 文件。 但我们将继续发布新版本的 `电子预建` 直到2016 年末 期。

[electron-userland/electron-prebuilded](https://github.com/electron-userland/electron-prebuilt) 仓库将仍然是 `electron` npm 软件包的标准家中。

## 多谢谢！

我们特别感谢 [@mafindosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), 和其他许多 [贡献者](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) 创建和维护 `电子预编`, 并感谢他们对JavaScript、节点的不知疲倦的服务 s 和 Electron 社区。

感谢 [@logicalparadox](https://github.com/logicalparadox) 允许 我们接管 `npm 上的` 包。

## 更新您的项目

我们已经与社区一起努力更新受这个变化影响的 的受欢迎软件包。 诸如 [electron-packer](https://github.com/electron-userland/electron-packager), [electron-reconstruction](https://github.com/electron/electron-rebuild), 和 [电子生成器](https://github.com/electron-userland/electron-builder) 已经更新，使用新的名字，同时继续支持 旧名字。

如果您遇到安装这个新包的任何问题 请通过 告诉我们在 [electron-userland/electron-prebuilded](https://github.com/electron-userland/electron-prebuilt/issues) 仓库中打开一个问题。

对于Electron上的任何其他问题， 请使用 [electron/electron](https://github.com/electron/electron/issues) 版本库。

