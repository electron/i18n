# 关于 Electron

[Electron](https://electron.atom.io)是一个由Github开发，用HTML，CSS和JavaScript来构建跨平台桌面应用程序的开源库。 Electron通过结合[Chromium](https://www.chromium.org/Home)和[Node.js](https://nodejs.org)到一个运行时环境中，并将其打包为Mac，Windows和Linux应用来实现这一目的。

Electron始于2013年，一开始作为构建Github上的[Atom](https://atom.io)文本编译器的框架。这两个项目在2014春季开源。

到现在，它已成为开源开发者、初创企业和老牌公司常用的工具。[ 看看谁在用Electron ](https://electron.atom.io/apps/)。

接着读来看Electron的贡献者们和Electron的发行版本，或者在[快速开始指引](quick-start.md)里学习用Electron来构建应用。

## 核心团队和贡献者

Electron由Github上的一支团队和一群[活跃的贡献者](https://github.com/electron/electron/graphs/contributors)维护。 有些贡献者是独立开发者，有些则在用Electron构建应用的大型公司里工作。 我们很乐意把贡献频繁的人作为维护者列入到项目中。 了解更多[为Electron作贡献](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)。

## 版本发布

Electron[发行版本](https://github.com/electron/electron/releases)相当频繁。每当有重要的bug修复，新API或是有Chromium、Node.js的更新时我们就会发行。

### 更新依赖

Electron中Chromium的版本通常在Chromium发行新的稳定版后的一到两周之内更新，具体要根据更新里涉及到的东西。

当Node.js发行新版本的时候，为了一个更稳定的版本，Electron通常会在更新前等一个月。

在Electron里，Node.js和Chromium共享同一个V8实例--通常是Chromium在用的版本。大多数情况下这能*正常工作*但有时候需要修补Node.js。

### 版本

因为对Node.js和Chromium有很强的依赖性，Electron所发行的版本[不遵循`semver`](http://semver.org) 因此你需要经常参考Electron的特定版本。 [了解更多关于Electron版本](https://electron.atom.io/docs/tutorial/electron-versioning/)或者看看[当前所用版本](https://electron.atom.io/#electron-versions)。

### 长期支持

当前并不存在对Electron旧版本的长期支持。 如果你当前的Electron版本跑的不错，你可以停留在这版本上任意时长。 如果你想用发布的新特性，那就升级到更新的版本。

版本`v1.0.0`发布了重大的更新。 如果你现在没有在用这个版本，你应该[了解更多关于`v1.0.0`的改变](https://electron.atom.io/blog/2016/05/11/electron-1-0)。

## 核心理念

为了保持Electron的小 (文件体积) 和可持续性 (依赖和API的扩展) ，Electron限制了使用的核心项目的范围。

比如Electron只用了Chromium的渲染库而不是全部。 这使得容易升级Chromium，但也意味着Electron缺少Google Chrome里的一些浏览器特性。

Electron所添加的的新特性应主要用于原生API。 如果一个特性能够成为一个Node.js模块，那它就应该成为。 参见[社区构建的Electron工具](https://electron.atom.io/community)。

## 历史

下面是 Electron 发展历程中的里程碑。

| :calendar:  | :tada:                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| **2013年4月** | [Atom Shell 项目启动](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45)。    |
| **2014年5月** | [Atom Shell 被开源](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html)。                              |
| **2015年4月** | [Atom Shell 被重命名为 Electron](https://github.com/electron/electron/pull/1389)。                                |
| **2016年5月** | [Electron 发布了 `v1.0.0` 版本](https://electron.atom.io/blog/2016/05/11/electron-1-0)。                          |
| **2016年5月** | [Electron 构建的应用程序可上架 Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide)。 |
| **2016年8月** | [Windows Store 支持 Electron 构建的应用程序](https://electron.atom.io/docs/tutorial/windows-store-guide)。            |