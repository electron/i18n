---
title: 更容易自动更新开源应用
author: zeke
date: '2018-05-01'
---

今天，我们将发布一个免费的，开源的，托管的 [更新网络服务][update.electronjs.org] 和配套 [npm包][update-electron-app] ，以便开源电子应用程序的简单自动更新。 This is a step toward empowering app developers to think less about deployment and more about developing high-quality experiences for their users.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="更新程序截图">
    <figcaption>正在执行中的新更新器模块</figcaption>
  </a>
</figure>

## 使生活更加容易。

Electron 具有 [自动更新器][] API，使应用能够从远程端点 消耗元数据以检查更新、在后台 下载元数据并自动安装它们。

启用这些更新对许多Electron应用开发者来说是部署过程 中一个繁琐的步骤，因为它需要部署一个 web 服务器 并且只是为了服务于应用版本历史元数据。

今天我们将宣布一个新的自动应用程序更新的投递解决方案。 如果您的 Electron 应用程序位于一个公共的 GitHub 仓库中，并且您正在使用 GitHub 发布版本发布版本， 您可以使用此服务向您的用户发送 持续的应用程序更新。

## 使用新模块

为了最大限度地减少您的配置，我们创建了 [更新电子应用][]， 一个npm模块，与新的 [update.electronjs.org][] 网络服务集成。

安装模块

```sh
npm install update-electron-app
```

从应用 [主要流程的任何地方调用它][]：

```js
require('update-electron-app')()
```

就是这样！ 模块将在应用程序启动时检查更新，然后 每十分钟。 当找到更新时，它将会在后台自动下载 ，当更新准备就绪时将显示对话框。

## 迁移现有应用

已经使用Electron的自动更新器 API 的应用也可以使用此服务。 为此，您可以 [自定义 `update-electron-app`][update-electron-app] 模块 或 [直接与 update.electronjs.org][update.electronjs.org]集成。

## 替代办法

如果您使用 [电子构建器][] 来包装您的应用，您可以使用其 内置更新器。 详情见 [electron.build/auto-update](https://www.electron.build/auto-update)。

如果您的应用是私密的，您可能需要运行自己的更新服务器。 有许多开源工具 ，包括Zeit的 [黑兹尔][] 和 阿特拉斯的 [核][]。 有关更多 信息，请参阅部署更新服务器</a> 教程

。</p> 



## 谢谢！

感谢 [朱利安·格鲁伯][] 帮助设计和构建这种简单和可扩展的 网络服务。 感谢 [Zeit][] 的开源 [黑兹尔][] 服务，我们从中汲取了设计灵感。 感谢 [塞缪尔·阿塔德][] 代码审查。 感谢Electron社区帮助测试此 服务。

:evergreen_tre：Electron应用的绿色未来！

[自动更新器]: https://electronjs.org/docs/tutorial/updates
[电子构建器]: https://github.com/electron-userland/electron-builder
[黑兹尔]: https://github.com/zeit/hazel
[朱利安·格鲁伯]: http://juliangruber.com/
[主要流程的任何地方调用它]: https://electronjs.org/docs/glossary#main-process
[核]: https://github.com/atlassian/nucleus
[塞缪尔·阿塔德]: https://www.samuelattard.com/
[update-electron-app]: https://github.com/electron/update-electron-app
[更新电子应用]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[Zeit]: https://zeit.co