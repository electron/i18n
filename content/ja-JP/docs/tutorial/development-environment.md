# 開発環境

Electron の開発は基本的に Node.js 開発です。 オペレーティング システムを、Electron のデスクトップ アプリケーション開発環境に変えるには、Node.js、npm、好みのコード エディター、オペレーティング システムのコマンド ライン クライアントへの初歩的な理解が必要です。

## macOS でセット アップ

> Electron は Mac OS X 10.9 (および macOS のすべてのバージョン) 以降をサポートしています。 Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)).

First, install a recent version of Node.js. We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `macOS Installer`. While Homebrew is an offered option, but we recommend against it - many tools will be incompatible with the way Homebrew installs Node.js.

Once downloaded, execute the installer and let the installation wizard guide you through the installation.

Once installed, confirm that everything works as expected. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by simply search for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Windows でセット アップ

> Electron は Windows 7 とそれ以降のバージョンをサポートし、それ以前の Windows で Electron アプリケーションを開発しようとしても動作しません。 Microsoft は開発者のための無料の [Windows 10 仮想マシン イメージ](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) を提供しています。

まず、最新バージョンの Node.js をインストールします。 利用可能な最新の `LTS` もしくは `Current` バージョンのいずれかをインストールすることをお勧めします。 [Node.js のダウンロード ページ](https://nodejs.org/en/download/)にアクセスし `Windows Installer` を選択します。 Once downloaded, execute the installer and let the installation wizard guide you through the installation.

インストール構成の場面では、`Node.js runtime`、`npm package manager`、`Add to PATH` オプションを選択してください。

インストールを完了したら、すべて正常に動作することを確認します。 スタート メニューを開き `PowerShell` を入力して Windows PowerShell を検索します。 `PowerShell` か別のお好みのコマンド ライン クライアントを起動して、`node` と `npm` が利用できることを確認します:

```powershell
# コノコマンドで Node.js のバージョンが印刷される必要があります
node -v

# このコマンドで npm のバージョンが印刷される必要があります
npm -v
```

両方のコマンドがバージョン番号を印刷すれば、準備完了です! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Setting up Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

First, install a recent version of Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

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