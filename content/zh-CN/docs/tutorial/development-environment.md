# 开发环境

你可以使用原生的Node.js开发环境来开发Electron应用。 为了打造一个Electron桌面程序的开发环境，你只需要安装好的Node.js、npm、一个顺手的代码编辑器以及对你的操作系统命令行客户端的基本了解。

## 配置 macOS

> Electron supports OS X Yosemite (version 10.10) and up. 目前Apple不允许在非Apple电脑上运行macOS虚拟机，所以，如果你需要一台Mac的话，可以考虑租用Mac云服务（比如[MacInCloud](https://www.macincloud.com/)或者 [xcloud](https://xcloud.me)）。

首先，安装最新版本的Node.js 。 我们推荐您安装最新的 `长期支持版本` 或者 `当前发行版本` 。 访问[Node.js下载页面](https://nodejs.org/en/download/)选择 `macOS Installer` 。 当然，你也可以使用Homebrew安装Node.js，但我们不推荐你这么做，因为许多工具并不兼容Homebrew安装Node.js的方式。

下载完成后， 执行安装程序，根据引导完成安装即可。

安装完成后，我们需要来确认Node.js是不是可以正常工作。 在`/Applications/Utilities`文件夹中找到macOS的`Terminal` 程序(或者直接使用Spotlight直接搜索关键词`Terminal`) 。 打开`Terminal`或其他你喜欢的命令行客户端后，通过以下命令来确认 `node` 和 `npm`已经安装成功：

```sh
# 下面这行的命令会打印出Node.js的版本信息
node -v

# 下面这行的命令会打印出npm的版本信息
npm -v
```

如果上述命令均打印出一个版本号，就说明Node.js已经安装好了！ 然后，你只需要安装一个适合JavaScript开发的[代码编辑器](#a-good-editor)就可以开始开发工作了。

## 配置 Windows

> Electron 支持Windows 7 及以上版本\---任何在低版本Windows上开发Electron的尝试都将是徒劳无功的。 您可以使用微软向开发者免费提供的[Windows 10虚拟机镜像](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines)。

首先，安装最新版本的Node.js 。 我们推荐您安装最新的 `长期支持版本` 或者 `当前发行版本` 。 访问[Node.js下载页面](https://nodejs.org/en/download/)，选择`Windows Installer`。 下载完成后， 执行安装程序，根据引导完成安装即可。

在安装过程中的配置界面, 请勾选`Node.js runtime`、`npm package manager`和`Add to PATH`这三个选项。

安装完成后，我们需要来确认Node.js是不是可以正常工作。 Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. 打开`PowerShell`或其他你喜欢的命令行客户端后，通过以下命令来确认 `node` 和 `npm`已经安装成功：

```powershell
# 下面这行的命令会打印出Node.js的版本信息
node -v

# 下面这行的命令会打印出npm的版本信息
npm -v
```

如果上述命令均打印出一个版本号，就说明Node.js已经安装好了！ 然后，你只需要安装一个适合JavaScript开发的[代码编辑器](#a-good-editor)就可以开始开发工作了。

## 配置 Linux

> 一般来说，Electron支持Ubuntu 12.04、Fedora 21、Debian 8 及其以上版本。

首先，安装最新版本的Node.js 。 对于不同linux分支，安装步骤会有所差异。 假如你使用系统自带的包管理器，比如： `apt` 或者 `pacman`，请使用[Node.js 官方Linux安装指引](https://nodejs.org/en/download/package-manager/)。

作为一个Linux用户，关于命令行的使用就无需我赘述了。 打开你喜欢的命令行工具，通过以下命令来确认`node` 和 `npm` 在全局可用：

```sh
# 下面这行的命令会打印出Node.js的版本信息
node -v

# 下面这行的命令会打印出npm的版本信息
npm -v
```

如果上述命令均打印出一个版本号，就说明Node.js已经安装好了！ 然后，你只需要安装一个适合JavaScript开发的[代码编辑器](#a-good-editor)就可以开始开发工作了。

## 合适的代码编辑器

我们建议你使用GitHub 的 [Atom](https://atom.io/) 或者微软的 [Visual Studio Code](https://code.visualstudio.com/)，这两款当下热门的编辑器都是使用Electron开发的。 而且对JavaScript的支持也都很棒。

如果您是众多开发人员中的一员，您应知道几乎所有的代码编辑器和IDE都是支持JavaScript的。