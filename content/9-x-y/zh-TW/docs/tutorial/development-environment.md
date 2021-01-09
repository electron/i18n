# 開發環境

Electron 開發環境為Node.js。 使你的作業系統能開始建立Electron桌面應用程式，你需要Node.js，npm，你選擇的代碼編輯器，和對作業系統的命令列用戶端的基本理解。

## macOS 設定

> Electron 支援 macOS 10.10(Yosemite) 和之後的版本 Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud][macincloud] or [xcloud](https://xcloud.me)).

首先，安裝最新版本的 Node.js。 We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page][node-download] and select the `macOS Installer`. While Homebrew is an offered option, but we recommend against it - many tools will be incompatible with the way Homebrew installs Node.js.

Once downloaded, execute the installer and let the installation wizard guide you through the installation.

安裝後，確認一切按預期工作。 Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# 這個指令應該會印出 Node.js 版本
node -v

# 這個指令應該會印出 npm 版本
npm -v
```

如果兩個命令都列印了版本號，則全部設置好！ Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Windows 設定

> Electron 支援 Windows 7 和以後版本 – 嘗試開發 早期版本的 Windows 上的  Electron 應用程式將不起作用。 Microsoft provides free [virtual machine images with Windows 10][windows-vm] for developers.

首先，安裝最新版本的 Node.js。 We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page][node-download] and select the `Windows Installer`. Once downloaded, execute the installer and let the installation wizard guide you through the installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

安裝後，確認一切按預期工作。 Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# 這個指令應該會印出 Node.js 版本
node -v

# 這個指令應該會印出 npm 版本
npm -v
```

如果兩個命令都列印了版本號，則全部設置好！ Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Linux設定

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

首先，安裝最新版本的 Node.js。 Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux][node-package].

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# 這個指令應該會印出 Node.js 版本
node -v

# 這個指令應該會印出 npm 版本
npm -v
```

如果兩個命令都列印了版本號，則全部設置好！ Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## 好的編輯器

我們推薦兩款熱門的編輯器來開發 Electron: GitHub 的 [Atom][atom] 和微軟的 [Visual Studio Code][code] 他們兩者都有出色的JavaScript支援。

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.

[macincloud]: https://www.macincloud.com/
[node-download]: https://nodejs.org/en/download/
[node-package]: https://nodejs.org/en/download/package-manager/
[atom]: https://atom.io/
[code]: https://code.visualstudio.com/
[windows-vm]: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
