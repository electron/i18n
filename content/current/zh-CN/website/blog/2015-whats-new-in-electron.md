---
title: Electron 中的新功能
author: 吉尔福德
date: '2015-10-15'
---

最近在Electron上进行了一些有趣的更新和谈话，下面是一次整合。

---

## 来源

Electron 现在更新了 `v0.32.0` 的 Chrome 45 。 其他更新包含...

### 更好的文档

![新文档](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

我们对文件进行了结构调整和标准化，以便更好地看待和更好地阅读。 还有社区提供的文件翻译，如日文和朝鲜文。

相关合并请求： [electron/electrony#2028](https://github.com/electron/electron/pull/2028) [electron/electrony#2533](https://github.com/electron/electron/pull/2533) [electron/electrony#2557](https://github.com/electron/electron/pull/2557) [电子/电子#2709](https://github.com/electron/electron/pull/2709) [电子/电子#2725](https://github.com/electron/electron/pull/2725) [电子/电子#2698](https://github.com/electron/electron/pull/2698) [电子/电子#2649](https://github.com/electron/electron/pull/2649)

### Node.js 4.1.0

从 `v0.33.0` 带有Node.js 4.1.0的电子船。

相关的拉取请求： [electron/electrony#2817](https://github.com/electron/electron/pull/2817)

### 节点预健身房

使用 `节点预制` 的模块现在可以在从源代码构建时根据Electron编译。

相关的拉取请求： [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175)

### ARM 支持

Electron 现在提供ARMv7上的Linux构建。 它运行在流行的平台上，如Chromebook 和 Raspberry Pi 2。

相关问题： [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electronic #2094](https://github.com/electron/electron/pull/2094), [electron/electronic #366](https://github.com/electron/electron/issues/366)

### Yosemite-style Frameless 窗口

![无帧窗口](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

由 [@jaanus](https://github.com/jaanus) 提供的补丁已被合并，类似于其他内置的 OS X 应用程序。 允许在OS X Yosemite集成的系统流光创建帧面窗。

相关的拉取请求： [electron/electrony#2776](https://github.com/electron/electron/pull/2776)

### Google 夏季代码打印支持

谷歌代码夏季后，我们合并了 [@hokein](https://github.com/hokein) 的补丁，以改进打印支持。 并添加打印页面到 PDF 文件的能力。

相关问题： [电子/电子#2677](https://github.com/electron/electron/pull/2677) [电子/电子#1935](https://github.com/electron/electron/pull/1935) [电子/电子#1532](https://github.com/electron/electron/pull/1532) [电子/电子#805](https://github.com/electron/electron/issues/805), [电子/电子#1669](https://github.com/electron/electron/pull/1669), [电子/电子#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom 现已升级到 Electron `v0.30.6` 运行 Chrome 44。 升级到 `v0.33.0` 正在进行中。 [原子/原子#8779](https://github.com/atom/atom/pull/8779)

## 对话

GitHubber [Amy Palamountain](https://github.com/ammeep) 在 [Nordic.js](https://nordicjs2015.confetti.events) 的谈话中对Electron 作了很好的介绍。 她还创建了 [电子加速器](https://github.com/ammeep/electron-accelerator) 库。

#### 由 Amy Palomountain 用 Electron 构建本地应用程序

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), 也在Atom 团队中，在 [YAPC Asia](http://yapcasia.org/2015/) 给出了一个 Electron 语音：

#### 由 Ben Ogle 使用 Web 技术构建桌面应用

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Atom 团队成员 [Kevin Sawicki](https://github.com/kevinsawicki) 和其他人在 [Bay 是Electron 用户组](http://www.meetup.com/Bay-Area-Electron-User-Group/) 最近举行会议。 [视频](http://www.wagonhq.com/blog/electron-meetup) 已发布，此处是一个对方：

#### Kevin Sawicki的 Electron 历史

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Ben Gotow 让网页应用感觉是原生的

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

