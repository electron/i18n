# 開発環境

Electron の開発は、基本的に Node.js で行われます。 オペレーティング システムを、Electron のデスクトップ アプリケーション開発環境に変えるには、Node.js、npm、好みのコード エディタ、オペレーティング システムのコマンドライン クライアントへの初歩的な理解が必要です。

## macOS をセット アップ

> Electron は macOS 10.10 (Yosemite) 以降をサポートしています。 ホストコンピュータがすでに Apple コンピュータでないときだけ、Apple は仮想マシンでの macOS の実行を許可していません。そのため、Mac が必要な場合は、Mac へのアクセスをレンタルする ([MacInCloud](https://www.macincloud.com/) や [xcloud](https://xcloud.me) のような) クラウドサービスの使用を検討してください。

まず、最新バージョンの Node.js をインストールします。 利用可能な最新の `LTS` もしくは `Current` バージョンのいずれかをインストールすることをお勧めします。 [Node.js のダウンロードページ](https://nodejs.org/en/download/)にアクセスし `macOS Installer` を選択します。 Homebrew は一つの提供された選択肢ですが、私たちはそれを推奨します。Homebrew で Node.js をインストールすることに対して、他の多くのツールでは互換性がないでしょう。

ダウンロードが完了したら、インストーラを実行してインストールウィザードに従ってインストールを進めます。

インストールを完了したら、すべて正常に動作することを確認します。 `/アプリケーション/ユーティリティ` フォルダ (または Spotlight で `ターミナル` という単語を検索して) で macOS `ターミナル` アプリケーションを検索します。 `ターミナル` か別のお好みのコマンドラインクライアントを起動して、`node` と `npm` が利用できることを以下のように確認します。

```sh
# このコマンドで Node.js のバージョンが出力されなければいけません
node -v

# このコマンドで npm のバージョンが出力されなければいけません
npm -v
```

両方のコマンドがバージョン番号を出力すれば、準備完了です! 始める前に、JavaScript 開発に適した [コードエディタ](#a-good-editor) をインストールするとよいでしょう。

## Windows のセットアップ

> Electron は Windows 7 とそれ以降のバージョンをサポートし、それ以前の Windows で Electron アプリケーションを開発しようとしても動作しません。 Microsoft は開発者のための無料の [Windows 10 仮想マシン イメージ](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) を提供しています。

まず、最新バージョンの Node.js をインストールします。 利用可能な最新の `LTS` もしくは `Current` バージョンのいずれかをインストールすることをお勧めします。 [Node.js のダウンロードページ](https://nodejs.org/en/download/)にアクセスし `Windows Installer` を選択します。 ダウンロードが完了したら、インストーラを実行してインストールウィザードに従ってインストールを進めます。

インストール構成の場面では、`Node.js runtime`、`npm package manager`、`Add to PATH` オプションを選択してください。

インストールを完了したら、すべて正常に動作することを確認します。 スタートメニューを開き、`PowerShell` を入力して Windows PowerShell を検索します。 `PowerShell` か別のお好みのコマンドラインクライアントを起動して、`node` と `npm` が利用できることを以下のように確認します。

```powershell
# このコマンドで Node.js のバージョンが出力されなければいけません
node -v

# このコマンドで npm のバージョンが出力されなければいけません
npm -v
```

両方のコマンドがバージョン番号を出力すれば、準備完了です! 始める前に、JavaScript 開発に適した [コードエディタ](#a-good-editor) をインストールするとよいでしょう。

## Linux のセットアップ

> 一般的に、Electron は Ubuntu 12.04、Fedora 21、Debian 8 以降をサポートしています。

まず、最新バージョンの Node.js をインストールします。 あなたの Linux ディストリビューション次第で、インストール手順が異なる場合があります。 `apt`または `pacman` のようなパッケージマネージャを使用してソフトウェアを普通にインストールすることを想定している、Linux へのインストールに関する公式の [Node.js ガイダンス](https://nodejs.org/en/download/package-manager/) を利用してください。

Linux を実行しているので、コマンドラインクライアントの操作方法はすでにご存知でしょう。 お好みのクライアントを起動して `node` と `npm` がグローバルに利用できることを以下のように確認します。

```sh
# このコマンドで Node.js のバージョンが出力されなければいけません
node -v

# このコマンドで npm のバージョンが出力されなければいけません
npm -v
```

両方のコマンドがバージョン番号を出力すれば、準備完了です! 始める前に、JavaScript 開発に適した [コードエディタ](#a-good-editor) をインストールするといいでしょう。

## 優良なエディタ

私たちは Electron で構築された 2 つの無料の人気エディタをお勧めするでしょう。 GitHub の [Atom](https://atom.io/) と Microsoft の [Visual Studio Code](https://code.visualstudio.com/) です。 どちらも優れた JavaScript サポートを備えています。

あなたが多くの多趣味な開発者の一人なら、今日ではほとんどすべてのコードエディタと IDE が JavaScript をサポートしていることは知っているでしょう。
