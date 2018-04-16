# 开发环境

你可以使用原生的Node.js开发环境来开发Electron应用。 为了打造一个Electron桌面程序的开发环境，你只需要安装好的Node.js、npm、一个顺手的代码编辑器以及对你的操作系统命令行客户端的基本了解。

## MacOS开发环境配置

> Electron 支持 Mac OS X 10.9及其以上版本和macOS所有版本。 目前Apple不允许在非Apple电脑上运行macOS虚拟机，所以，如果你需要一台Mac的话，可以考虑租用Mac云服务（比如[MacInCloud](https://www.macincloud.com/)或者 [xcloud](https://xcloud.me)）。

第一步，安装最新版本的Node.js 。 我们推荐您安装最新的 `长期支持版本` 或者 `当前发行版本` 。 访问[Node.js下载页面](https://nodejs.org/en/download/)选择 `macOS Installer` 。 当然，你也可以使用Homebrew安装Node.js，但我们不推荐你这么做，因为许多工具并不兼容Homebrew安装Node.js的方式。

下载完成后， 执行安装程序，根据引导完成安装即可。

Once installed, confirm that everything works as expected. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by simply search for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Winodws开发环境配置

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

第一步，安装最新版本的Node.js 。 我们推荐您安装最新的 `长期支持版本` 或者 `当前发行版本` 。 Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. 下载完成后， 执行安装程序，根据引导完成安装即可。

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Once installed, confirm that everything works as expected. Find the Windows PowerShell by simply opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Setting up Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

第一步，安装最新版本的Node.js 。 Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.