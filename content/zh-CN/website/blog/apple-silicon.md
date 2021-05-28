---
title: Apple 芯片支持
author: Marshall OfSound
date: '2020-10-15'
---

今年晚些时候发行苹果硅硬件， 您想要让您的 Electron 应用在新的硬件上运行哪个路径？

---

通过 Electron 11.0.0-beta 发布。 ，Electron团队现在正在装运Electron构建，这是苹果计划今年晚些时候装运的新苹果硅硬件。 您可以使用 `npm install electron@beta` 获取最新测试版，或直接从我们的 [发布网站](https://electronjs.org/releases/stable) 下载。

## 它是如何工作的？

从Electron 11开始，我们将为Intel Mac和Apple Silicon Mac分别配送Electron版本。 在这个更改之前，我们已经运输了两件工艺品， `darwin-x64` and `mas-x64`, 后者为 Mac App Store 兼容性使用。 我们现在正在运输另外两件艺术品， `darwin-arm64` and `mas-arm64`, 它们是上述艺术品的苹果硅。

## 我需要做什么？

您将需要发货两个版本的应用：一个版本用于x64(Intel Mac)，另一个版本用于arm64(Apple Silicon)。 好消息是 [`electron-packer`](https://github.com/electron/electron-packager/), [`电子重建`](https://github.com/electron/electron-rebuild/) 和 [`电子机枪`](https://github.com/electron-userland/electron-forge/) 已经支持瞄准 `arm64` 架构。 只要您正在运行这些软件包的最新版本， 一旦你将目标架构更新为 `arm64` ，你的应用就应该正常工作。

将来， 我们将发布一个软件包，允许您“合并”您的 `arm64` 和 `x64` 应用到一个单一的通用二进制二进制程序， 但值得注意的是，这个二进制文件将是 _巨大的_ ，而且可能不适合发送给用户。

## 潜在问题

### 原生模块

当您正在针对一个新的架构时，您需要更新几个依赖关系，这可能会导致构建问题。 下面包含某些依赖关系的最低版本以供您参考。

| 依赖关系                | 版本要求          |
| ------------------- | ------------- |
| Xcode               | `>=12.2`   |
| `节点健身房`             | `>=7.1.0`  |
| `电子重建`              | `>=1.12.0` |
| `electron-packager` | `>=15.1.0` |

由于这些依赖版本要求，您可能必须修复/更新某些本机模块。  值得注意的是，Xcode 升级将引入新版本的 macOS SDK。 这可能会导致您本机模块的构建失败。


## 如何测试？

目前，Apple Silicon 应用程序只在 Apple Silicon 硬件上运行，在撰写这篇博文时没有商业用途。 如果你有 [开发者过渡套件](https://developer.apple.com/programs/universal/)，你可以测试你的应用程序。 否则，您将不得不等待生产苹果硅硬件的释放，以测试您的应用是否正常。

## Rosetta 2怎么样？

Rosetta 2 是苹果最近一次对他们的 [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) 技术的迭代。 允许您在新的 arm64 苹果硅硬件上运行 x64 Intel 应用。 尽管我们认为x64 Electron应用将在Rosetta 2下运行， 有一些重要的事情需要注意(以及你为什么要运送一只土生长的装甲64)。

* 您的应用的性能将大大降低。 Electron / V8 为 JavaScript 使用 [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) 编译，因为Rosetta 是如何工作的。 您将有效地运行两次JIT (一次在 V8 中，一次在 Rosetta)。
* 您失去了苹果Silicon新技术的好处，例如内存页面大小的增加。
* 我们是否提到性能将**显著** 降级？
