# 关于 Electron

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron通过将[Chromium](https://www.chromium.org/Home)和[Node.js](https://nodejs.org)合并到同一个运行时环境中，并将其打包为Mac，Windows和Linux应用来实现这一目的。

Electron始于2013年，一开始作为构建Github上的[Atom](https://atom.io)文本编译器的框架。这两个项目在2014春季开源。

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

继续往下读可以了解一下Electron的贡献者们和已经发布的版本，或者开始在[快速开始指引](quick-start.md)里用Electron来构建应用。

## 核心团队和贡献者

Electron由Github上的一支团队和一群[活跃的贡献者](https://github.com/electron/electron/graphs/contributors)维护。 有些贡献者是独立开发者，有些则在用Electron构建应用的大型公司里工作。 我们很乐意把贡献频繁的人加入到项目维护者队伍中。 了解更多[为Electron作贡献](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)。

## 版本发布

Electron[发行版本](https://github.com/electron/electron/releases)相当频繁。每当有重要的bug修复，新API或是有Chromium、Node.js的更新时我们就会发行。

### 更新依赖

Electron中Chromium的版本通常会在Chromium发行新的稳定版后的一到两周之内更新，具体时间根据升级所需的工作量而定。

为了版本的稳定，Electron通常会在Node.js发布了新版本的一个月后在更新。

在Electron里，Node.js和Chromium共享同一个V8实例--通常是Chromium在用的版本。大多数情况下这能*正常工作*但有时候需要修补Node.js。

### 版本

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### 长期支持

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## 核心理念

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## 历史

Below are milestones in Electron's history.

| :calendar:  | :tada:                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| **2013年4月** | [Atom Shell 项目启动](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45)。            |
| **2014年5月** | [Atom Shell 被开源](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html)。                                      |
| **2015年4月** | [Atom Shell 被重命名为 Electron](https://github.com/electron/electron/pull/1389)。                                        |
| **2016年5月** | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                             |
| **2016年5月** | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **2016年8月** | [Windows Store support for Electron apps](https://electronjs.org/docs/tutorial/windows-store-guide).                |