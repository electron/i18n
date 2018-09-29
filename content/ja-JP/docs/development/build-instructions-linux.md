# ビルド手順 (Linux)

Linux 版 Electron のビルドについては、以下のガイドラインに従ってください。

## 必要な環境

* 最低 25 GB のストレージ空き容量と 8 GB以上の RAM。
* Python 2.7.x。CentOS 6.xのようないくつかのディストリビューションでは Python 2.6.x を採用しています。そのため、`python -V`などでPythonのバージョンを確認してください。
    
    あなたのシステムと Python が少くとも TLS 1.2をサポートしていることを確認してください。 確認するには、次のスクリプトを実行します。:
    
    ```sh
    $ npm run check-tls
    ```
    
    あなたの設定が時代遅れのセキュリティプロトコルを使用していると、このスクリプトが返した場合、あなたのシステムパッケージマネージャでPythonを2.7.xブランチまで更新してください。 または、https://www.python.org/downloads/ を参照して、詳細な情報を入手してください。

* Node.js. Node はいろいろな方法でインストールできます。 [nodejs.org](https://nodejs.org)からソースコードをダウンロードしてコンパイルできます。 一般ユーザーのホームディレクトリに Node をインストールできます。 または[NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories)のようなリポジトリを試してください。

* [clang](https://clang.llvm.org/get_started.html) 3.4 またはそれ以降。
* GTK+ と libnotify の開発ヘッダ

Ubuntu では、以下のライブラリをインストールしてください

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

RHEL / CentOS では、以下のライブラリをインストールしてください

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Fedora では、以下のライブラリをインストールしてください

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

その他のディストリビューションも、例えば pacmanのようなパッケージマネージャーで同様のパッケージをインストールできるでしょう、またはソースコードからコンパイルする必要があるかもしれません。

### クロスコンパイル

`arm` ターゲットに向けてビルドする場合、次の依存パッケージをインストールしてください。:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

同様に `arm64` の場合以下をインストールします。:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

`arm` または `ia32` ターゲット向けにクロスコンパイルする場合、`target_cpu` パラメーターで `gn gen`に情報を渡します。:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## ビルド

[ビルド指示: GN](build-instructions-gn.md)を参照してください。

## トラブルシューティング

### Error While Loading Shared Libraries: libtinfo.so.5

プレビルドの`clang` は `libtinfo.so.5` へリンクしようとします。ホストのアーキテクチャにしたがって、適切な`libncurses`にシンボリックリンクしてください。:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 高度なトピック

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### システムの`clang`をダウンロードした`clang`バイナリの代りに使う

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

例えば `clang` が `/usr/local/bin/clang`にインストールされている場合：

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### `clang`以外のコンパイラの使用

`clang`以外のコンパイラを用いたElectronのビルドはサポートされていません。