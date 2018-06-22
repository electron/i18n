# 更新应用程序

有多种方法可以更新Electron应用. 最简单并且获得官方支持的方法是利用内置的[Squirrel](https://github.com/Squirrel)框架和Electron的[autoUpdater](../api/auto-updater.md)模块。

## Using `update.electronjs.org`

GitHub's Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. The service is designed for Electron apps that meet the following criteria:

- App runs on macOS or Windows
- App has a public GitHub repository
- Builds are published to GitHub Releases
- Builds are code-signed

The easiest way to use this service is by installing [update-electron-app](https://github.com/electron/update-electron-app), a Node.js module preconfigured for use with update.electronjs.org.

安装模块

```sh
npm install update-electron-app
```

Invoke the updater from your app's main process file:

```js
require('update-electron-app')()
```

By default, this module will check for updates at app startup, then every ten minutes. When an update is found, it will automatically be downloaded in the background. When the download completes, a dialog is displayed allowing the user to restart the app.

If you need to customize your configuration, you can [pass options to `update-electron-app`](https://github.com/electron/update-electron-app) or [use the update service directly](https://github.com/electron/update.electronjs.org).

## Using `electron-builder`

如果你的app是通过[`electron-builder`](https://github.com/electron-userland/electron-builder)打包那么你可以使用[electron-updater](https://www.electron.build/auto-update)模块, 它不依赖任何服务器并且可以从S3, GitHub或者任何其它静态文件存储更新. 这避开了 Electron 内置的更新机制，这意味着本文档的其余部分不适用于此 ` electron-builder `的更新程序。

## 部署更新服务器

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

根据你的需要，你可以从下方选择：

- [Hazel](https://github.com/zeit/hazel) – 用于私人或开源应用的更新服务器，可以在 [Now](https://zeit.co/now) 上免费部署。 它从[GitHub Releases](https://help.github.com/articles/creating-releases/)中拉取更新文件，并且利用 GitHub CDN 的强大性能。
- [Nuts](https://github.com/GitbookIO/nuts)－同样使用[GitHub Releases](https://help.github.com/articles/creating-releases/), 但得在磁盘上缓存应用程序更新并支持私有存储库.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – 提供一个用于处理发布的仪表板，并且不需要在GitHub上发布发布。
- [Nucleus](https://github.com/atlassian/nucleus) – 一个由Atlassian维护的 Electron 应用程序的完整更新服务器。 支持多种应用程序和渠道; 使用静态文件存储来降低服务器成本.

## 在你的应用中实施更新

一旦你部署了更新服务器, 继续导入你所需要的代码模块. 下列代码可能因不同的服务器软件而变化, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**重要:** 请确保下面的代码只在打包的应用程序, 而不是开发中. 你可以使用[electron-is-dev](https://github.com/sindresorhus/electron-is-dev)检查当前环境.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

下一步, 构建更新服务器的URL并且通知[autoUpdater](../api/auto-updater.md):

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

最后一步, 检查更新. 下面的例子将每分钟检查一次:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

应用程序被[packaged](../tutorial/application-distribution.md)后, 它将接收你每次发布在[GitHub Release](https://help.github.com/articles/creating-releases/)上的的更新。

## 应用更新

现在您已经为应用程序配置了基本的更新机制, 您需要确保在更新时通知用户. 这可以使用autoUpdater API [events](../api/auto-updater.md#events)来实现:

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

同时要确保错误被[being handled](../api/auto-updater.md#event-error). 这是一个例子它将记录到`stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```