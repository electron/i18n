# 开发环境

你可以使用原生的Node.js开发环境来开发Electron应用。 为了打造一个Electron桌面程序的开发环境，你只需要安装好的Node.js、npm、一个顺手的代码编辑器以及对你的操作系统命令行客户端的基本了解。

## MacOS开发环境配置

> Electron 支持 Mac OS X 10.9及其以上版本和macOS所有版本。 目前Apple不允许在非Apple电脑上运行macOS虚拟机，所以，如果你需要一台Mac的话，可以考虑租用Mac云服务（比如[MacInCloud](https://www.macincloud.com/)或者 [xcloud](https://xcloud.me)）。

第一步，安装最新版本的Node.js 。 我们推荐您安装最新的 `长期支持版本` 或者 `当前发行版本` 。 访问[Node.js下载页面](https://nodejs.org/en/download/)选择 `macOS Installer` 。 当然，你也可以使用Homebrew安装Node.js，但我们不推荐你这么做，因为许多工具并不兼容Homebrew安装Node.js的方式。

下载完成后， 执行安装程序，根据引导完成安装即可。

安装完成后，我们需要来确认Node.js是不是可以正常工作。 在`/Applications/Utilities`文件夹中找到macOS的`Terminal` 程序(或者直接使用Spotlight直接搜索关键词`Terminal`) 。 打开`Terminal`或其他你喜欢的命令行客户端后，通过以下命令来确认 `node` 和 `npm`已经安装成功：

```sh
# 下面这行的命令会打印出Node.js的版本信息
node -v

# 下面这行的命令会打印出npm的版本信息
npm -v
```

如果上述命令均打印出一个版本号，就说明Node.js已经安装好了！ 然后，你只需要安装一个适合JavaScript开发的[代码编辑器](#a-good-editor)就可以开始开发工作了。

## Winodws开发环境配置

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

第一步，安装最新版本的Node.js 。 我们推荐您安装最新的 `长期支持版本` 或者 `当前发行版本` 。 Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. 下载完成后， 执行安装程序，根据引导完成安装即可。

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

安装完成后，我们需要来确认Node.js是不是可以正常工作。 Find the Windows PowerShell by simply opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# 下面这行的命令会打印出Node.js的版本信息
node -v

# 下面这行的命令会打印出npm的版本信息
npm -v
```

如果上述命令均打印出一个版本号，就说明Node.js已经安装好了！ 然后，你只需要安装一个适合JavaScript开发的[代码编辑器](#a-good-editor)就可以开始开发工作了。

## Setting up Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

第一步，安装最新版本的Node.js 。 Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# 下面这行的命令会打印出Node.js的版本信息
node -v

# 下面这行的命令会打印出npm的版本信息
npm -v
```

如果上述命令均打印出一个版本号，就说明Node.js已经安装好了！ 然后，你只需要安装一个适合JavaScript开发的[代码编辑器](#a-good-editor)就可以开始开发工作了。

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.