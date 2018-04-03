# 关于 Electron

[Electron](https://electronjs.org)是由Github开发，用HTML，CSS和JavaScript来构建跨平台桌面应用程序的一个开源库。 Electron通过将[Chromium](https://www.chromium.org/Home)和[Node.js](https://nodejs.org)合并到同一个运行时环境中，并将其打包为Mac，Windows和Linux系统下的应用来实现这一目的。

Electron于2013年作为构建Github上可编程的文本编辑器[Atom](https://atom.io)的框架而被开发出来。这两个项目在2014春季开源。

目前它已成为开源开发者、初创企业和老牌公司常用的开发工具。[ 看看谁在使用Electron ](https://electronjs.org/apps)。

继续往下阅读可以了解Electron的贡献者们和已经发布的版本，或者直接阅读[快速开始指引](quick-start.md)来开始用Electron来构建应用。

## 核心团队和贡献者

Electron由Github上的一支团队和一群[活跃的贡献者](https://github.com/electron/electron/graphs/contributors)维护。 有些贡献者是独立开发者，有些则在用Electron构建应用的大型公司里工作。 我们很乐意把贡献频繁的人加入到项目维护者队伍中。 阅读有关[为Electron作贡献](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)的更多信息。

## 版本发布

Electron的[版本发布](https://github.com/electron/electron/releases)相当频繁。每当Chromium、Node.js有重要的bug修复，新API或是版本更新时我们就会发布新版本。

### 更新依赖项

Electron中Chromium的版本通常会在Chromium发行新的稳定版后的一到两周之内更新，具体时间根据升级所需的工作量而定。

为了使版本更加稳定，Electron通常会在Node.js发布了新版本的一个月之后再更新。

在Electron里，Node.js和Chromium共享同一个V8实例--通常是Chromium在用的版本。大多数情况下这能*正常工作*但有时候还是需要为Node.js打补丁。

### 版本

从版本2.0开始Electron会 [ 遵循 ` semver ` 标准](https://semver.org)。 对于大多数应用来说, 在使用最新版本的npm情况下, 运行 ` $ npm install electron ` 都将会正常工作 。

版本更新过程已明确并详细地描述在我们的 [ 版本控制文档 ](electron-versioning.md) 中。

### 长期支持

当前并不存在对Electron旧版本的长期支持。 如果现在你使用的Electron版本跑得不错，你就可以一直使用这个版本。 如果你想使用新发布的特性，那就升级到更新的版本。

版本`v1.0.0`发布了重大的更新。 如果你现在没有在用这个版本，你应该[了解更多关于`v1.0.0`的改变](https://electronjs.org/blog/electron-1-0)。

## 核心理念

为了保持Electron的小巧 (文件体积) 和可持续性开发 (以防依赖库和API的泛滥) ，Electron限制了所使用的核心项目的数量。

比如Electron只用了Chromium的渲染库而不是其全部组件。 这使得升级Chromium更加容易，但也意味着Electron缺少了Google Chrome里的一些浏览器相关的特性。

添加到Electron的新功能应该主要是原生 API。 如果可以的话，一个功能应该尽可能的成为一个Node.js模块。 参见[社区构建的Electron工具](https://electronjs.org/community)。

## 历史

下面是 Electron 发展历程中的里程碑。

| :calendar:  | :tada:                                                                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| **2013年4月** | [Atom Shell 项目启动](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45)。 |
| **2014年5月** | [Atom Shell 被开源](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html)。                          |
| **2015年4月** | [Atom Shell 被重命名为 Electron](https://github.com/electron/electron/pull/1389)。                             |
| **2016年5月** | [Electron 发布了 `v1.0.0` 版本](https://electronjs.org/blog/electron-1-0)。                                    |
| **2016年5月** | [Electron 构建的应用程序可上架 Mac App Store](mac-app-store-submission-guide.md)。                                  |
| **2016年8月** | [Windows Store 支持 Electron 构建的应用程序](windows-store-guide.md)。                                             |