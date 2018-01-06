# 更新应用程序

有多种方法可以更新Electron应用. 最简单并且官方支持的是一个利用内置的[Squirrel](https://github.com/Squirrel)框架和Electron的[autoUpdater](../api/auto-updater.md)模块.

## 部署更新服务器

开始前, 你首先需要部署一个服务器用来自动更新下载[autoUpdater](../api/auto-updater.md)模块.

根据你的需要，你可以从下方选择：

- [Hazel](https://github.com/zeit/hazel)为私有或开源应用程序更新服务器 可以用[Now](https://zeit.co/now)免费部署(使用单个命令), 先从[GitHub Releases](https://help.github.com/articles/creating-releases/)拉取然后利用 GitHub's CDN 的强大能力.
- [Nuts](https://github.com/GitbookIO/nuts)－同样使用[GitHub Releases](https://help.github.com/articles/creating-releases/), 但得在磁盘上缓存应用程序更新并支持私有存储库.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) –提供用于处理发布的仪表板
- [Nucleus](https://github.com/atlassian/nucleus) – 一个由Atlassian维护的 Electron 应用程序的完整更新服务器。 支持多种应用程序和渠道; 使用静态文件存储来降低服务器成本.

如果你的app是通过[electron-builder](https://github.com/electron-userland/electron-builder)打包那么你可以使用[electron-updater](https://www.electron.build/auto-update)模块, 它不依赖任何服务器并且可以从S3, GitHub或者任何其它静态文件存储更新.

## 实施更新你的应用程序

一旦你部署了更新服务器, 继续导入你所需要的代码模块. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

```js
const {app, autoUpdater, dialog} = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```js
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

As the final step, check for updates. The example below will check every minute:

```js
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Applying updates

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

```js
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

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```js
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```