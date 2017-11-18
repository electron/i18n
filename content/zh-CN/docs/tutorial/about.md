# 关于 Electron

[Electron](https://electron.atom.io)是用HTML，CSS和JavaScript来构建跨平台桌面应用程序的开源库，它通过Github开发。 Electron通过结合[Chromium](https://www.chromium.org/Home)和[Node.js](https://nodejs.org)到一个runtime中然后把应用打包为Mac，Windows和Linux来实现。

Electron始于2013年，一开始作为构建Github上的[Atom](https://atom.io)文本编译器的框架。这两个项目在2014春季开源。

到现在，它已成为开源开发者、初创企业和老牌公司常用的工具。[ 看看谁在用Electron ](https://electron.atom.io/apps/)。

接着读来看Electron的贡献者们和Electron的发行版本，或者在[快速开始指引](quick-start.md)里学习用Electron来构建应用。

## 核心团队和贡献者

Electron is maintained by a team at GitHub as well as a group of [active contributors](https://github.com/electron/electron/graphs/contributors) from the community. Some of the contributors are individuals and some work at larger companies who are developing on Electron. We're happy to add frequent contributors to the project as maintainers. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## 版本发布

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### 更新依赖

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### 版本

Due to the hard dependency on Node.js and Chromium, Electron is in a tricky versioning position and [does not follow `semver`](http://semver.org). You should therefore always reference a specific version of Electron. [Read more about Electron's versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) or see the [versions currently in use](https://electron.atom.io/#electron-versions).

### 长期支持

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## 核心理念

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

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