# ビルド手順 (Windows)

Windows 版 Electron のビルドについては、以下のガイドラインに従ってください。

## 必要な環境

* Windows 10 / Server 2012 R2 以上
* Visual Studio 2017 15.7.2 以上 - [VS 2017 Community Edition 無料ダウンロード](https://www.visualstudio.com/vs/)
* [Python 2.7.10 以上](http://www.python.org/download/releases/2.7/) 
  * 以下にリンクされている `depot_tools` の設定手順とは異なり、ローカルにインストールされた Python を少なくとも 2.7.10 (TLS 1.2 サポート) で使用する必要があります。 To do so, make sure that in **PATH**, your locally installed Python comes before the `depot_tools` folder. Right now `depot_tools` still comes with Python 2.7.6, which will cause the `gclient` command to fail (see https://crbug.com/868864).
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) is also needed in ordner to run the build process.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files. 
  * Different versions of the SDK can be installed side by side. To install the SDK, open Visual Studio Installer, select `Change` → `Individual Components`, scroll down and select the appropriate Windows SDK to install. Another option would be to look at the [Windows SDK and emulator archive](https://developer.microsoft.com/de-de/windows/downloads/sdk-archive) and download the standalone version of the SDK respectively.

現在 Windows インストールを持っていない場合、[dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) に Electron をビルドするために使用できる Windows のバージョンがあります。

Electron のビルドは完全にコマンドラインスクリプトで行われ、Visual Studio では実行できません。 任意のエディタで Electron を開発できますが、将来 Visual Studio を使用したビルドがサポートされます。

**注釈:** Visual Studio はビルドに使用されていませんが、それが提供するビルドツールチェーンが必要なため、まだ **必要** です。

## ビルド

[ビルド指示: GN](build-instructions-gn.md)を参照してください。

## 32ビットビルド

32ビットターゲット用にビルドするには、引数として`target_cpu = "x86"` をGNに渡す必要があります。 32ビットターゲットと共に64ビットターゲットをビルドできます。それには別の引数を使って、`out/Release-x86`のような別のディレクトリに出力させられます。

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

他のビルド手順は全く同じです。

## Visual Studio プロジェクト

Visual Studio プロジェクトを生成するには、`--ide=vs2017` 引数を`gn gen`に渡します。

```powershell
$ gn gen out/Debug --ide=vs2017
```

## トラブルシューティング

### Command xxxx not found

`Command xxxx not found` のようなエラーに遭遇した場合、`開発者コマンド プロンプト for VS2015` コンソールを使用してビルドスクリプトを実行してみましょう。

### Fatal internal compiler error: C1001

最新の Visual Studio アップデートがインストールされていることを確認してください。

### LNK1181: cannot open input file 'kernel32.lib'

32ビット Node.js を再インストールしてください。

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

以下のようにディレクトリを作成すると [問題](https://stackoverflow.com/a/25095327/102704) は解決するはずです。

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

ビルドに Git Bash を使用している場合は、代わりに PowerShell または 開発者コマンド プロンプト for VS2015 を使用する必要があります。

### cannot create directory at '...': Filename too long

node.jsに[長すぎるパス名](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish)があるようです。標準では、Windows版のgitは、長いファイル名をきちんと処理できません。 この問題を解決するには以下のようにします：

```sh
$ git config --system core.longpaths true
```