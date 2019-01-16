# ビルド手順 (Windows)

Windows 版 Electron のビルドについては、以下のガイドラインに従ってください。

## 必要な環境

* Windows 10 / Server 2012 R2 以上
* Visual Studio 2017 15.7.2 以上 - [VS 2017 Community Edition 無料ダウンロード](https://www.visualstudio.com/vs/)
* [Python 2.7.10 以上](http://www.python.org/download/releases/2.7/) 
  * 以下にリンクされている `depot_tools` の設定手順とは異なり、ローカルにインストールされた Python を少なくとも 2.7.10 (TLS 1.2 サポート) で使用する必要があります。 これをするには、**PATH** 内で、ローカルにインストールされた Python が `depot_tools`のフォルダより前に来るように指定してください。 現在、`depot_tools` にはまだ Python 2.7.6 が付属しているため、`gclient` コマンドが失敗します (https://crbug.com/868864 を参照)。
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) もビルドプロセスを実行するために必要です。
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* 完全なディストリビューションを作成する予定がある場合は、Windows SDK 10.0.15063.468 の Windows 用デバッグツールを使用してください。 `symstore.exe` が `.pdb` ファイルからシンボルストアを作成するために使用します。 
  * 異なるバージョンのSDKを並行してインストールできます。 SDK をインストールするには、Visual Studio Installer を開いて `変更` → `個別のコンポーネント` を選択し、スクロールしてインストールする適切な Windows SDK を選択します。 他に、[Windows SDK とエミュレータのアーカイブ](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) を見て、SDK のスタンドアロン版をそれぞれダウンロードすることでもできます。
  * The SDK Debugging Tools must also be installed. If the Windows 10 SDK was installed via the Visual Studio installer, then they can be installed by going to: `Control Panel` → `Programs` → `Programs and Features` → Select the "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Or, you can download the standalone SDK installer and use it to install the Debugging Tools.

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