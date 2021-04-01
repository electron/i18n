---
title: "使用 GN 构建Electron"
author: nornagon
date: '2018-09-05'
---

Electron 现在使用GN来构建自己。 这里是为什么要讨论的。

---

# GYP 和 GN

当Electron于2013年首次发布时，Chromium的构建配置是用 [GYP](https://gyp.gsrc.io/)编写的，短于“生成你的项目”。

2014年， Chromium项目引入了一个新的构建配置工具，叫做 [GN](https://gn.googlesource.com/gn/) (简称“生成 [Ninja](https://ninja-build.org/)”)，Chromium的构建文件被迁移到GN ，GYP 被从源代码中删除。

Electron 历史上一直保持主 [Electron 代码](https://github.com/electron/electron) 和 [libchromiumcontent](https://github.com/electron/libchromiumcontent)之间的分离， 对 Chromium 的 'content' 子模块的 Electron 部分。 Electron 已经继续使用 GYP, 而libchromiumcontent -- 作为Chromium 的子集--则在Chromium 的确切时间切换到GN

像不很网格的渔具一样，使用两种构建系统之间存在摩擦。 维护兼容性是错误的，来自编译器的标志和 `#定义了需要仔细保持Chromium、节点、V8和Electron之间同步的`

为了解决这个问题，Electron团队一直在努力将一切移动到GN。 今天， [提交](https://github.com/electron/electron/pull/14097) 从Electron中移除最后一个 GYP 代码已经登陆大师。

# 这对您意味着什么

如果您正在对 Electron 本身做出贡献，请先从 `master` 或 4 查看和构建Electron 的过程。 0 与 3.0.0 及更早的版本非常不同。 详情请参阅 [GN build指令](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md)。

如果您正在使用 Electron 开发一个应用程序，您可能会在新的 Electron 4 中注意到一些小的更改。 每晚0次；但很可能，Electron对构建系统的改变将对您完全透明。

# 这对 Electron 意味着什么

GN is [faster](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) than GYP and its files are more readable and maintainable. 此外，我们希望使用单一的构建配置系统将减少Electron升级到新版本Chromium所需的工作。

 * 它已经有助于在 Electron 4.0.0 上的开发，因为Chromium 67 已经移除了对 MSVC 的支持，并且已经切换到 Clang 在 Windows 上的建筑。 通过 GN 构建，我们直接继承了Chromium 的所有编译器命令，所以我们可以免费在 Windows 上的 Clang 构建！

 * 它也使Electron更容易在整个Electron的一个统一构建中使用 [BoringSSL](https://boringssl.googlesource.com/boringssl/) 。 Chromium, and Node -</a> 之前有问题
