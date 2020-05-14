# 更新应用程序

有多种方法可以更新Electron应用. 最简单并且获得官方支持的方法是利用内置的[Squirrel](https://github.com/Squirrel)框架和Electron的[autoUpdater](../api/auto-updater.md)模块。

## 使用 `update.electronjs.org`

The Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. 这个服务是设计给那些满足以下标准的 Electron 应用：

- 应用运行在 macOS 或者 Windows
- 应用有公开的 GitHub 仓库
- 编译的版本发布在 GitHub Releases
- 编译的版本已代码签名

使用这个服务最简单的方法是安装 [update-electron-app](https://github.com/electron/update-electron-app)，一个预配置好的 Node.js 模块来使用 update.electronjs.org。

安装模块

```sh
npm install update-electron-app
```

从你的应用的 main process 文件调用这个更新：

```js
require('update-electron-app')()
```

默认情况下，这个模块会在应用启动的时候检查更新，然后每隔十分钟再检查一次。 当发现了一个更新，它会自动在后台下载。 当下载完成后，会显示一个对话框以允许用户重启应用。

如果你需要定制化你的配置，你可以 [将配置设置传递给 `update-electron-app`](https://github.com/electron/update-electron-app) 或者 [直接使用更新服务](https://github.com/electron/update.electronjs.org)。

## 部署更新服务器

如果你开发的是一个私有的 Electron 应用程序，或者你没有在 GitHub Releases 中公开发布，你可能需要运行自己的更新服务器。

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
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

As the final step, check for updates. The example below will check every minute:

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

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```

## Handing Updates Manually

Because the requests made by Auto Update aren't under your direct control, you may find situations that are difficult to handle (such as if the update server is behind authentication). The `url` field does support files, which means that with some effort, you can sidestep the server-communication aspect of the process. [Here's an example of how this could work](https://github.com/electron/electron/issues/5020#issuecomment-477636990).
