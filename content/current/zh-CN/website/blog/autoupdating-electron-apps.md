---
title: 更容易自动更新开源应用
author: zeke
date: '2018-05-01'
---

Today we're releasing a free, open-source, hosted [updates webservice][update.electronjs.org] and companion [npm package][update-electron-app] to enable easy automatic updates for open-source Electron apps. This is a step toward empowering app developers to think less about deployment and more about developing high-quality experiences for their users.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="更新程序截图">
    <figcaption>正在执行中的新更新器模块</figcaption>
  </a>
</figure>

## 使生活更加容易。

Electron has an [autoUpdater][] API that gives apps the ability to consume metadata from a remote endpoint to check for updates, download them in the background, and install them automatically.

启用这些更新对许多Electron应用开发者来说是部署过程 中一个繁琐的步骤，因为它需要部署一个 web 服务器 并且只是为了服务于应用版本历史元数据。

今天我们将宣布一个新的自动应用程序更新的投递解决方案。 如果您的 Electron 应用程序位于一个公共的 GitHub 仓库中，并且您正在使用 GitHub 发布版本发布版本， 您可以使用此服务向您的用户发送 持续的应用程序更新。

## 使用新模块

To minimize configuration on your part, we've created [update-electron-app][], an npm module which integrates with the new [update.electronjs.org][] webservice.

安装模块

```sh
npm install update-electron-app
```

Call it from anywhere in your app's [main process][]:

```js
require('update-electron-app')()
```

就是这样！ 模块将在应用程序启动时检查更新，然后 每十分钟。 当找到更新时，它将会在后台自动下载 ，当更新准备就绪时将显示对话框。

## 迁移现有应用

已经使用Electron的自动更新器 API 的应用也可以使用此服务。 To do so, you can [customize the `update-electron-app`][update-electron-app] module or [integrate directly with update.electronjs.org][update.electronjs.org].

## 替代办法

If you're using [electron-builder][] to package your app, you can use its built-in updater. 详情见 [electron.build/auto-update](https://www.electron.build/auto-update)。

如果您的应用是私密的，您可能需要运行自己的更新服务器。 There are a number of open-source tools for this, including Zeit's [Hazel][] and Atlassian's [Nucleus][]. See the [Deploying an Update Server][] tutorial for more info.

## 谢谢！

Thanks to [Julian Gruber][] for helping design and build this simple and scalable web service. Thanks to the folks at [Zeit][] for their open-source [Hazel][] service, from which we drew design inspiration. Thanks to [Samuel Attard][] for the code reviews. 感谢Electron社区帮助测试此 服务。

:evergreen_tre：Electron应用的绿色未来！

[autoUpdater]: https://electronjs.org/docs/tutorial/updates
[electron-builder]: https://github.com/electron-userland/electron-builder
[Hazel]: https://github.com/zeit/hazel
[Julian Gruber]: http://juliangruber.com/
[main process]: https://electronjs.org/docs/glossary#main-process
[Deploying an Update Server]: https://electronjs.org/docs/tutorial/updates#deploying-an-update-server
[Nucleus]: https://github.com/atlassian/nucleus
[Samuel Attard]: https://www.samuelattard.com/
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[Zeit]: https://zeit.co