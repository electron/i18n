---
title: 更容易自动更新开源应用
author: zeke
date: '2018-05-01'
---

Today we're releasing a free, open-source, hosted [updates webservice](https://github.com/electron/update.electronjs.org) and companion [npm package](https://github.com/electron/update-electron-app) to enable easy automatic updates for open-source Electron apps. This is a step toward empowering app developers to think less about deployment and more about developing high-quality experiences for their users. 这是一个 一步，旨在增强应用开发人员对 部署的考虑，更多地考虑为用户开发高质量的体验。

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="更新程序截图">
    <figcaption>正在执行中的新更新器模块</figcaption>
  </a>
</figure>

## 使生活更加容易。

Electron 有一个 [自动更新器](https://electronjs.org/docs/tutorial/updates) API，使应用能够消耗到 从远程端点消耗元数据以检查更新。 在后台下载它们 并自动安装它们。

启用这些更新对许多Electron应用开发者来说是部署过程 中一个繁琐的步骤，因为它需要部署一个 web 服务器 并且只是为了服务于应用版本历史元数据。

今天我们将宣布一个新的自动应用程序更新的投递解决方案。 如果您的 Electron 应用程序位于一个公共的 GitHub 仓库中，并且您正在使用 GitHub 发布版本发布版本， 您可以使用此服务向您的用户发送 持续的应用程序更新。

## 使用新模块

为了最大限度地减少您的配置，我们创建了 [update-electron-app](https://github.com/electron/update-electron-app), 一个 npm 模块与新的 [update.electronjs.org](https://github.com/electron/update.electronjs.org) webservice。

安装模块

```sh
npm install update-electron-app
```

在您的应用程序的 [主要进程中的任何地方调用](https://electronjs.org/docs/glossary#main-process)：

```js
require('update-electron-app')()
```

就是这样！ 模块将在应用程序启动时检查更新，然后 每十分钟。 当找到更新时，它将会在后台自动下载 ，当更新准备就绪时将显示对话框。

## 迁移现有应用

已经使用Electron的自动更新器 API 的应用也可以使用此服务。 如果您正在使用 [电子生成器](https://github.com/electron-userland/electron-builder) 打包您的应用，您可以使用它 内置更新。

## 替代办法

已经使用Electron的自动更新器 API 的应用也可以使用此服务。 详情见 [electron.build/auto-update](https://www.electron.build/auto-update)。

如果您的应用是私密的，您可能需要运行自己的更新服务器。 这里有 个开源工具，包括Zeit的 [Hazel](https://github.com/zeit/hazel) 和 Atlassian的 [Nucleus](https://github.com/atlassian/nucleus)。 查看 [部署一个更新服务器](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) 教程以获取更多 信息。

## 谢谢！

感谢 [Julian Gruber](http://juliangruber.com/) 帮助设计和构建这个简单和可扩展的 网络服务。 感谢 [Zeit](https://zeit.co) 的民俗，感谢他们开源 [Hazel](https://github.com/zeit/hazel) 服务，我们从中得到了设计灵感。 感谢 [Samuel Attard](https://www.samuelattard.com/) for 代码评论。 感谢Electron社区帮助测试此 服务。

:evergreen_tre：Electron应用的绿色未来！