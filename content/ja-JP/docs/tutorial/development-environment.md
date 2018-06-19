# 開発環境

Electron の開発は基本的に Node.js 開発です。 オペレーティング システムを、Electron のデスクトップ アプリケーション開発環境に変えるには、Node.js、npm、好みのコード エディター、オペレーティング システムのコマンド ライン クライアントへの初歩的な理解が必要です。

## macOS のセットアップ

> Electron supports OS X Yosemite (version 10.10) and up. Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)).

まず、最新バージョンの Node.js をインストールします。 利用可能な最新の `LTS` もしくは `Current` バージョンのいずれかをインストールすることをお勧めします。 Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `macOS Installer`. While Homebrew is an offered option, but we recommend against it - many tools will be incompatible with the way Homebrew installs Node.js.

Once downloaded, execute the installer and let the installation wizard guide you through the installation.

インストールを完了したら、すべて正常に動作することを確認します。 Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# このコマンドで Node.js のバージョンが印刷される必要があります
node -v

# このコマンドで npm のバージョンが印刷される必要があります
npm -v
```

両方のコマンドがバージョン番号を印刷すれば、準備完了です! 始める前に、JavaScript 開発に適した [コード エディター](#a-good-editor) をインストールするといいでしょう。

## Windows のセットアップ

> Electron は Windows 7 とそれ以降のバージョンをサポートし、それ以前の Windows で Electron アプリケーションを開発しようとしても動作しません。 Microsoft は開発者のための無料の [Windows 10 仮想マシン イメージ](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) を提供しています。

まず、最新バージョンの Node.js をインストールします。 利用可能な最新の `LTS` もしくは `Current` バージョンのいずれかをインストールすることをお勧めします。 [Node.js のダウンロード ページ](https://nodejs.org/en/download/)にアクセスし `Windows Installer` を選択します。 Once downloaded, execute the installer and let the installation wizard guide you through the installation.

インストール構成の場面では、`Node.js runtime`、`npm package manager`、`Add to PATH` オプションを選択してください。

インストールを完了したら、すべて正常に動作することを確認します。 Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. `PowerShell` か別のお好みのコマンド ライン クライアントを起動して、`node` と `npm` が利用できることを確認します:

```powershell
# このコマンドで Node.js のバージョンが印刷される必要があります
node -v

# このコマンドで npm のバージョンが印刷される必要があります
npm -v
```

両方のコマンドがバージョン番号を印刷すれば、準備完了です! 始める前に、JavaScript 開発に適した [コード エディター](#a-good-editor) をインストールするといいでしょう。

## Linux のセットアップ

> 一般的に Electron は Ubuntu 12.04、Fedora 21、Debian 8 とそれ以降をサポートします。

まず、最新バージョンの Node.js をインストールします。 あなたの Linux ディストリビューション次第で、インストール手順が異なる場合があります。 `apt` や `pacman` のようなパッケージ マネージャーを使用し通常通りにソフトウェアをインストールすると想定して、公式の [Linux 上の Node.js インストール ガイダンス](https://nodejs.org/en/download/package-manager/) を利用します。

Linux を実行しているので、コマンド ライン クライアントの操作方法はすでにご存知でしょう。 お好みのクライアントを起動して `node` と `npm` がグローバルに利用できることを確認します:

```sh
# このコマンドで Node.js のバージョンが印刷される必要があります
node -v

# このコマンドで npm のバージョンが印刷される必要があります
npm -v
```

両方のコマンドがバージョン番号を印刷すれば、準備完了です! 始める前に、JavaScript 開発に適した [コード エディター](#a-good-editor) をインストールするといいでしょう。

## 好ましいエディター

私たちは Electron で構築された 2 つの無料の人気エディターをお勧めするでしょう。 GitHub の [Atom](https://atom.io/) と Microsoft の [Visual Studio Code](https://code.visualstudio.com/) です。 どちらも優れた JavaScript サポートを備えています。

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.